const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function preflight() {
  return new Response(null, { headers: CORS });
}

// ── /api/counter ─────────────────────────────────────────────

async function handleCounter(request, env) {
  try {
    const current = parseInt((await env.HUMANOMETER_KV.get('visitor_count')) || '0');
    const count = request.method === 'POST' ? current + 1 : current;
    if (request.method === 'POST') {
      await env.HUMANOMETER_KV.put('visitor_count', String(count));
    }
    return json({ count });
  } catch (e) {
    return json({ count: 0, error: e.message }, 500);
  }
}

// ── /api/fulfil ──────────────────────────────────────────────
// Payment-gated AI generation. The client does NOT send prompts or pick a
// model — it sends { session_id, kind, profile }. We:
//   1. verify the Stripe Checkout Session is actually paid,
//   2. confirm the requested asset is included in the purchased tier,
//   3. build the prompt server-side from the (validated) profile,
//   4. cap generations per session in KV (replay guard),
//   5. then call Claude.
// This replaces the old /api/generate, which forwarded arbitrary `messages`
// from anyone — an open, unauthenticated proxy to the Anthropic API.

// Model selection. GEN_MODEL (optional Cloudflare var — set it in the dashboard
// to change the primary with no code deploy) is tried first; if it's ever
// retired, mistyped, or otherwise unavailable, we fall through to the next
// model so a *paid* generation never breaks on a dead model id. Haiku is last —
// cheap and near-always-available — as a final safety net. Fallbacks only ever
// engage when a model is genuinely gone; picking the "most appropriate" primary
// is your call via GEN_MODEL.
const DEFAULT_MODEL = 'claude-sonnet-4-6';
const MODEL_FALLBACKS = ['claude-sonnet-4-6', 'claude-haiku-4-5'];

function modelCandidates(env) {
  return [...new Set([env.GEN_MODEL, DEFAULT_MODEL, ...MODEL_FALLBACKS].filter(Boolean))];
}

// Call Claude, trying each candidate model in order. Only fall through when the
// model itself is unavailable (404 / not_found_error) — NOT on 429/500/overload,
// which are transient and shouldn't burn through the whole list. Throws with
// `.upstream = true` so the caller can distinguish an Anthropic error (502) from
// an unexpected one (500).
async function callClaude(env, max_tokens, prompt) {
  const models = modelCandidates(env);
  let lastModelError = null;
  for (const model of models) {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model, max_tokens, messages: [{ role: 'user', content: prompt }] }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (upstream.ok) {
      return (data.content || []).map(b => b.text || '').join('').trim();
    }
    if (upstream.status === 404 || data?.error?.type === 'not_found_error') {
      lastModelError = data?.error?.message || `model ${model} unavailable`;
      continue; // retired / bad id — try the next candidate
    }
    const err = new Error(data?.error?.message || 'Anthropic API error');
    err.upstream = true; // transient/auth error — surface, don't cycle models
    throw err;
  }
  const err = new Error('No model available (' + (lastModelError || 'all candidates returned 404') + ')');
  err.upstream = true;
  throw err;
}

// Which AI assets each product entitles the buyer to. Certificate and the
// full-results PDF are rendered client-side (no AI), so they're not listed.
const TIER_KINDS = {
  boost:  ['linkedin'],
  career: ['linkedin', 'qa', 'synthesis'],
  pro:    ['linkedin', 'qa', 'cover', 'plan', 'synthesis'],
};

// Max Claude calls per paid session — covers first generation of every asset
// plus a generous number of "regenerate" clicks. Stops a single valid
// session_id being replayed for unlimited generations.
const MAX_GENS_PER_SESSION = 40;

const TRAIT_NAMES = [
  ['adaptive', 'Adaptive Thinking'],
  ['ethical',  'Ethical Judgment'],
  ['creative', 'Creative Synthesis'],
  ['empathic', 'Empathic Accuracy'],
  ['critical', 'Critical Skepticism'],
];
const ARCHETYPE_NAMES = ['The Vanguard', 'The Architect', 'The Compass', 'The Connector', 'The Analyst'];

function cleanName(n) {
  return String(n || '').replace(/[^\p{L}\p{N}\s'\-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

// Validate + normalise the client-supplied profile. Returns null if malformed.
function normaliseProfile(p) {
  if (!p || typeof p !== 'object') return null;
  const scores = p.scores || {};
  const out = {};
  for (const [id] of TRAIT_NAMES) {
    const v = Math.round(Number(scores[id]));
    if (!Number.isFinite(v) || v < 0 || v > 100) return null;
    out[id] = v;
  }
  const archetype = ARCHETYPE_NAMES.includes(p.archetype) ? p.archetype : 'The Analyst';
  const tag = typeof p.archetypeTag === 'string' ? p.archetypeTag.slice(0, 120) : '';
  let overall = Math.round(Number(p.overall));
  if (!Number.isFinite(overall) || overall < 0 || overall > 100) {
    overall = Math.round(Object.values(out).reduce((a, b) => a + b, 0) / TRAIT_NAMES.length);
  }
  return { scores: out, archetype, tag, overall, name: cleanName(p.name) };
}

function profileFacts(profile) {
  const tr = TRAIT_NAMES.map(([id, name]) => `${name}: ${profile.scores[id]}/100`).join(', ');
  let strong = TRAIT_NAMES[0], weak = TRAIT_NAMES[0];
  for (const t of TRAIT_NAMES) {
    if (profile.scores[t[0]] > profile.scores[strong[0]]) strong = t;
    if (profile.scores[t[0]] < profile.scores[weak[0]]) weak = t;
  }
  return {
    tr,
    strongName: strong[1], strongVal: profile.scores[strong[0]],
    weakName: weak[1], weakVal: profile.scores[weak[0]],
  };
}

const QA_STD = [
  '"Tell me about yourself."',
  '"What\'s your greatest professional strength?"',
  '"How do you handle situations where there\'s no clear right answer?"',
  '"Tell me about a time you had to push back on something you disagreed with."',
  '"What makes you different from other candidates?"',
];
const QA_PRO_EXTRA = [
  '"Describe a time you failed and what you learned from it."',
  '"Tell me about a conflict with a colleague and how you resolved it."',
  '"How do you stay productive when priorities keep shifting?"',
  '"Give an example of a decision you made with incomplete information."',
  '"Where do you see yourself in five years — and how does this role fit?"',
];

// Returns { prompt, max_tokens } for an asset kind, or null.
function buildPrompt(kind, product, profile) {
  const f = profileFacts(profile);
  const head = `Archetype: ${profile.archetype} — "${profile.tag}"\nScores: ${f.tr}\nOverall: ${profile.overall}/100`;

  if (kind === 'linkedin') {
    return { max_tokens: 600, prompt:
`Write a LinkedIn 'About' section for a professional with this Humanometer profile:
${head}
Strongest: ${f.strongName} (${f.strongVal}/100)

Three paragraphs, ~60 words each (~180 words total).
Para 1: Who they are professionally — open with their dominant human quality. First sentence must be distinctive and make a reader stop.
Para 2: What they bring to teams — concrete, grounded in their top 2-3 traits. Specific enough it couldn't apply to anyone.
Para 3: What they're working on or looking for — forward-facing, confident. One sentence on the kind of work that gets the best from them.

Rules: First person. No clichés (no "passionate", "results-driven", "dynamic", "team player"). No emojis. No hashtags. Tone: confident, warm, real. Write as if you are them.
Output ONLY the three paragraphs separated by a blank line.` };
  }

  if (kind === 'qa') {
    const count = product === 'pro' ? 10 : 5;
    const list = (count === 10 ? [...QA_STD, ...QA_PRO_EXTRA] : QA_STD).map((q, i) => `${i + 1}. ${q}`).join('\n');
    return { max_tokens: count === 10 ? 2000 : 1200, prompt:
`Write ${count} personalized interview answers for someone with this profile:
Archetype: ${profile.archetype}, Scores: ${f.tr}, Overall: ${profile.overall}/100

Questions:
${list}

Each answer: 90-110 words. Specific to their profile. First person. Natural spoken rhythm, as if said aloud in an interview. Ground each answer in their genuine trait scores.
Return ONLY a JSON array of ${count} objects with keys "question" and "answer". No markdown, no fences, no preamble.` };
  }

  if (kind === 'cover') {
    return { max_tokens: 500, prompt:
`Write a cover-letter OPENER for someone with this Humanometer profile.
${head}
Strongest dimension: ${f.strongName} (${f.strongVal}/100)

Two short paragraphs, around 90 words total. First person. Open with a distinctive sentence that signals who they are professionally. Second paragraph: what they bring that's specific to their top dimensions. Generic enough to fit most roles but specific enough that it reads as genuinely about them.
Rules: no clichés, no "passionate", no "team player", no hashtags, no salutation, no "Dear Hiring Manager". Output ONLY the two paragraphs separated by a blank line.` };
  }

  if (kind === 'plan') {
    return { max_tokens: 900, prompt:
`Write a focused 30-day development plan for someone with this Humanometer profile.
Archetype: ${profile.archetype}. Scores: ${f.tr}. Strongest: ${f.strongName} (${f.strongVal}). Developing: ${f.weakName} (${f.weakVal}).

Structure: 4 weekly sections. Each week:
- A short heading (8 words max)
- 3 concrete actions (one short paragraph each, 2-3 sentences)
- One reflection prompt at the end

Goal: develop the user's weakest dimension while leaning into their strongest. Specific, practical, no fluff. Use plain Markdown — bold weekly headings with ** **, dash bullets for actions. No preamble or summary. Around 350 words.` };
  }

  if (kind === 'synthesis') {
    return { max_tokens: 700, prompt:
`Write a "career synthesis" for someone with this Humanometer profile.
${head}
Strongest: ${f.strongName} (${f.strongVal}/100). Developing: ${f.weakName} (${f.weakVal}/100).

Three short sections, each with a bold Markdown heading:
**How your dimensions work together** — 2-3 sentences on how their strongest dimensions interact and what that combination produces.
**Where you'll thrive** — concrete role types and work environments that fit this exact profile. Specific, not generic.
**Where to be deliberate** — one honest, practical note on their weakest dimension and how to compensate for it.

Second person ("you"). Warm, specific, grounded in the actual scores. No clichés, no emojis. Around 200 words. Plain Markdown only — no preamble.` };
  }

  return null;
}

// Confirm a Stripe Checkout Session is genuinely paid, and return its product.
async function verifyPaidSession(session_id, env) {
  if (!session_id || !/^cs_[A-Za-z0-9_]+$/.test(session_id)) return null;
  if (!env.STRIPE_SECRET_KEY) return null;
  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(session_id), {
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
    if (!r.ok) return null;
    const s = await r.json();
    if (s.payment_status !== 'paid') return null;
    const product = s.metadata && s.metadata.product;
    if (!TIER_KINDS[product]) return null;
    return { product };
  } catch (e) {
    return null;
  }
}

async function handleFulfil(request, env) {
  // Defence-in-depth: reject obvious cross-origin callers. The payment
  // verification below is the real gate; this just trims casual noise.
  const origin = request.headers.get('Origin');
  if (origin &&
      !/^https?:\/\/(www\.)?humanometer\.com$/.test(origin) &&
      !/^https?:\/\/localhost(:\d+)?$/.test(origin)) {
    return json({ error: 'Forbidden' }, 403);
  }

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Invalid JSON' }, 400); }

  const kind = String(body.kind || '');
  const session_id = String(body.session_id || '');

  const paid = await verifyPaidSession(session_id, env);
  if (!paid) return json({ error: 'Payment could not be verified' }, 402);

  if (!TIER_KINDS[paid.product].includes(kind)) {
    return json({ error: 'This asset is not included in your purchase' }, 403);
  }

  const profile = normaliseProfile(body.profile);
  if (!profile) return json({ error: 'Invalid profile' }, 400);

  // Per-session generation cap (replay / abuse guard).
  try {
    const key = 'genc:' + session_id;
    const used = parseInt((await env.HUMANOMETER_KV.get(key)) || '0');
    if (used >= MAX_GENS_PER_SESSION) {
      return json({ error: 'Generation limit reached for this purchase' }, 429);
    }
    await env.HUMANOMETER_KV.put(key, String(used + 1), { expirationTtl: 60 * 60 * 24 * 60 });
  } catch (e) { /* KV hiccup — payment is already verified, so allow through */ }

  const built = buildPrompt(kind, paid.product, profile);
  if (!built) return json({ error: 'Unknown asset' }, 400);

  try {
    const text = await callClaude(env, built.max_tokens, built.prompt);
    return json({ text });
  } catch (e) {
    return json({ error: e.message }, e.upstream ? 502 : 500);
  }
}

// ── /api/optin ───────────────────────────────────────────────
// GDPR-friendly opt-in storage. Data lives in our own Cloudflare KV
// namespace (HUMANOMETER_KV) under the key prefix `optin:<lowercased-email>`.
// Required: { email, consent: true }. Optional: { name, source }.
// Returns { success: true } on store; { error } otherwise.

function isPlausibleEmail(s) {
  if (typeof s !== 'string') return false;
  s = s.trim();
  if (s.length < 5 || s.length > 254) return false;
  // Minimal sanity check — full RFC validation is for the email provider
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function handleOptin(request, env) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Invalid JSON' }, 400); }

  const email = String(body.email || '').trim().toLowerCase();
  if (!isPlausibleEmail(email)) return json({ error: 'Invalid email' }, 400);
  if (body.consent !== true) return json({ error: 'Consent required' }, 400);

  const name = body.name ? String(body.name).trim().slice(0, 80) : '';
  const source = body.source ? String(body.source).trim().slice(0, 40) : 'results-page';

  const record = {
    email,
    name,
    source,
    optedInAt: new Date().toISOString(),
    ip: request.headers.get('CF-Connecting-IP') || '',
    country: request.headers.get('CF-IPCountry') || '',
  };

  try {
    await env.HUMANOMETER_KV.put('optin:' + email, JSON.stringify(record));
    return json({ success: true });
  } catch (e) {
    return json({ error: 'Storage failed' }, 500);
  }
}

// ── /api/unsubscribe ─────────────────────────────────────────
// GDPR right-to-erasure endpoint. POST { email }. Deletes the matching
// optin: key. Email-based delete is safe enough here: the worst-case
// outcome of an unauthorized deletion is that someone stops receiving
// emails they didn't want anyway.

async function handleUnsubscribe(request, env) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Invalid JSON' }, 400); }

  const email = String(body.email || '').trim().toLowerCase();
  if (!isPlausibleEmail(email)) return json({ error: 'Invalid email' }, 400);

  try {
    await env.HUMANOMETER_KV.delete('optin:' + email);
    return json({ success: true });
  } catch (e) {
    return json({ error: 'Failed' }, 500);
  }
}

// ── /api/admin/optins ────────────────────────────────────────
// Admin-only CSV export of the opt-in list. Auth: ?key=<ADMIN_KEY>
// (set ADMIN_KEY in the Cloudflare dashboard — Settings → Variables
// and Secrets, as a Secret). Returns text/csv suitable for download.

async function handleAdminOptins(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return new Response('Forbidden', { status: 403 });
  }

  const csvEscape = (v) => {
    const s = String(v == null ? '' : v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };

  const rows = ['email,name,opted_in_at,source,country,ip'];
  let cursor;
  do {
    const list = await env.HUMANOMETER_KV.list({ prefix: 'optin:', cursor });
    for (const k of list.keys) {
      const val = await env.HUMANOMETER_KV.get(k.name);
      if (!val) continue;
      try {
        const r = JSON.parse(val);
        rows.push([r.email, r.name, r.optedInAt, r.source, r.country, r.ip].map(csvEscape).join(','));
      } catch (e) { /* skip malformed */ }
    }
    cursor = list.list_complete ? null : list.cursor;
  } while (cursor);

  return new Response(rows.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="humanometer-optins.csv"',
      'Cache-Control': 'no-store',
    },
  });
}

// ── /api/checkout ────────────────────────────────────────────

const PRODUCTS = {
  'boost':  { name: 'Humanometer LinkedIn Boost',  amount:  499, currency: 'usd', mode: 'payment' },
  'career': { name: 'Humanometer Career Pack',     amount:  999, currency: 'usd', mode: 'payment' },
  'pro':    { name: 'Humanometer Interview Pro',   amount: 1499, currency: 'usd', mode: 'payment' },
};

async function handleCheckout(request, env) {
  let product, email, scores;
  try {
    ({ product, email, scores } = await request.json());
  } catch (e) {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const p = PRODUCTS[product];
  if (!p) return json({ error: 'Invalid product' }, 400);

  // Build Stripe form-encoded body using URLSearchParams
  const params = new URLSearchParams();
  params.set('mode', p.mode);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', p.currency);
  params.set('line_items[0][price_data][unit_amount]', String(p.amount));
  params.set('line_items[0][price_data][product_data][name]', p.name);
  if (p.mode === 'subscription') {
    params.set('line_items[0][price_data][recurring][interval]', 'year');
  }
  params.set('success_url', 'https://humanometer.com/?paid=true&session_id={CHECKOUT_SESSION_ID}');
  params.set('cancel_url', 'https://humanometer.com/#results');
  params.set('metadata[product]', product);
  params.set('metadata[scores]', JSON.stringify(scores || {}));
  if (email) params.set('customer_email', email);

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const data = await r.json();
    if (!r.ok) return json({ error: data.error?.message || 'Stripe error' }, 502);
    return json({ url: data.url });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

// ── ROUTER ───────────────────────────────────────────────────

const ROUTES = {
  '/api/counter':       handleCounter,
  '/api/fulfil':        handleFulfil,
  '/api/optin':         handleOptin,
  '/api/unsubscribe':   handleUnsubscribe,
  '/api/admin/optins':  handleAdminOptins,
  '/api/checkout':      handleCheckout,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 301 redirect www → apex, preserving path + query
    if (url.hostname === 'www.humanometer.com') {
      url.hostname = 'humanometer.com';
      return Response.redirect(url.toString(), 301);
    }

    if (request.method === 'OPTIONS') return preflight();

    const handler = ROUTES[url.pathname];
    if (handler) return handler(request, env, ctx);

    // Permalinks (/r/<code>) — serve the SPA shell; the client decodes the
    // path and renders the shared results screen. Without this, /r/* would
    // 404 because no asset exists at that path.
    if (url.pathname.startsWith('/r/')) {
      // Serve the SPA shell WITHOUT redirecting. Fetching '/index.html' makes
      // the assets layer 307 → '/', which drops the /r/<code> the client needs
      // to decode. Fetching '/' returns index.html at 200 and the browser keeps
      // the /r/<code> path, so the client can render the shared reading.
      return env.ASSETS.fetch(new Request(new URL('/', url), request));
    }

    // Fall through to static assets
    return env.ASSETS.fetch(request);
  },
};

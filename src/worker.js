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

// ── /api/generate ────────────────────────────────────────────

// Models the frontend is allowed to request. Anything else falls back to default.
const ALLOWED_MODELS = ['claude-sonnet-4-6', 'claude-haiku-4-5-20251001', 'claude-opus-4-8'];
const DEFAULT_MODEL = 'claude-sonnet-4-6';

async function handleGenerate(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'No messages' }, 400);
  }

  // Validate model against allowlist and clamp max_tokens (public endpoint — limit abuse)
  const model = ALLOWED_MODELS.includes(body.model) ? body.model : DEFAULT_MODEL;
  const max_tokens = Math.min(Math.max(parseInt(body.max_tokens) || 1024, 1), 2000);

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model, max_tokens, messages }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return json({ error: data.error?.message || 'Anthropic API error' }, 502);
    }
    // Return the raw Anthropic response — the frontend reads data.content[].text
    return json(data);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

// ── /api/email ───────────────────────────────────────────────

async function handleEmail(request, env) {
  let name, email, scores;
  try {
    ({ name, email, scores } = await request.json());
  } catch (e) {
    return json({ error: 'Invalid JSON' }, 400);
  }
  if (!email) return json({ error: 'No email' }, 400);

  const mergeFields = {};
  if (name) mergeFields.FNAME = name;
  if (scores) {
    Object.entries(scores).forEach(([t, s]) => { mergeFields[`TRAIT_${t}`] = String(s); });
  }

  try {
    const r = await fetch(
      `https://${env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed', merge_fields: mergeFields }),
      }
    );
    const data = await r.json();
    if (!r.ok && data.title !== 'Member Exists') {
      return json({ error: data.detail || 'Mailchimp error' }, 502);
    }
    return json({ success: true });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

// ── /api/checkout ────────────────────────────────────────────

const PRODUCTS = {
  'boost':  { name: 'Humanometer LinkedIn Boost',  amount:  499, currency: 'gbp', mode: 'payment' },
  'career': { name: 'Humanometer Career Pack',     amount:  999, currency: 'gbp', mode: 'payment' },
  'pro':    { name: 'Humanometer Interview Pro',   amount: 1499, currency: 'gbp', mode: 'payment' },
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
  '/api/counter':  handleCounter,
  '/api/generate': handleGenerate,
  '/api/email':    handleEmail,
  '/api/checkout': handleCheckout,
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
      const indexReq = new Request(new URL('/index.html', url), request);
      return env.ASSETS.fetch(indexReq);
    }

    // Fall through to static assets
    return env.ASSETS.fetch(request);
  },
};

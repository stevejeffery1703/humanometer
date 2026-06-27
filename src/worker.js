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

async function handleGenerate(request, env) {
  let prompt;
  try {
    ({ prompt } = await request.json());
  } catch (e) {
    return json({ error: 'Invalid JSON' }, 400);
  }
  if (!prompt) return json({ error: 'No prompt' }, 400);

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        stream: true,
        system: 'You are a professional career development expert. Write clearly and confidently. Be specific. Avoid corporate clichés.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!upstream.ok) {
      const err = await upstream.text();
      return json({ error: err }, 502);
    }

    return new Response(upstream.body, {
      headers: {
        ...CORS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
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
  'results-pack': { name: 'Humanometer Results Pack',    amount: 999, currency: 'gbp', mode: 'payment' },
  'benchmark':    { name: 'Humanometer Benchmark Access', amount: 399, currency: 'gbp', mode: 'subscription' },
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

    if (request.method === 'OPTIONS') return preflight();

    const handler = ROUTES[url.pathname];
    if (handler) return handler(request, env, ctx);

    // Fall through to static assets
    return env.ASSETS.fetch(request);
  },
};

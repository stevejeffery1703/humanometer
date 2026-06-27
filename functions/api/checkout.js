const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const PRODUCTS = {
  'results-pack': { name: 'Humanometer Results Pack', amount: 999, currency: 'gbp', mode: 'payment' },
  'benchmark':    { name: 'Humanometer Benchmark Access', amount: 399, currency: 'gbp', mode: 'subscription' },
};

// Encode nested objects as Stripe's form-encoded format
function encodeStripe(obj, prefix = '') {
  const parts = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      parts.push(...encodeStripe(v, key).split('&').filter(Boolean));
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
    }
  }
  return parts.join('&');
}

export async function onRequest({ env, request }) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let product, email, scores;
  try {
    ({ product, email, scores } = await request.json());
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }

  const p = PRODUCTS[product];
  if (!p) return new Response(JSON.stringify({ error: 'Invalid product' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });

  const origin = 'https://humanometer.com';

  const priceData = {
    currency: p.currency,
    unit_amount: p.amount,
    'product_data[name]': p.name,
  };
  if (p.mode === 'subscription') {
    priceData['recurring[interval]'] = 'year';
  }

  const params = {
    mode: p.mode,
    'line_items[0][quantity]': '1',
    'success_url': `${origin}/?paid=true&session_id={CHECKOUT_SESSION_ID}`,
    'cancel_url': `${origin}/#results`,
    'metadata[product]': product,
    'metadata[scores]': JSON.stringify(scores || {}),
  };
  if (email) params['customer_email'] = email;

  // Flatten line_items price_data
  Object.entries(priceData).forEach(([k, v]) => {
    params[`line_items[0][price_data][${k}]`] = v;
  });

  // Remove nested keys we added above — flatten directly
  delete params[`line_items[0][price_data][product_data[name]]`];
  params[`line_items[0][price_data][product_data][name]`] = p.name;
  delete params[`line_items[0][price_data][recurring[interval]]`];
  if (p.mode === 'subscription') {
    params[`line_items[0][price_data][recurring][interval]`] = 'year';
  }
  // Remove the intermediate key we used above
  delete params[`line_items[0][price_data][currency]`];
  delete params[`line_items[0][price_data][unit_amount]`];
  params[`line_items[0][price_data][currency]`] = p.currency;
  params[`line_items[0][price_data][unit_amount]`] = String(p.amount);

  const body = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const data = await r.json();
    if (!r.ok) return new Response(JSON.stringify({ error: data.error?.message || 'Stripe error' }), { status: 502, headers: { ...CORS, 'Content-Type': 'application/json' } });

    return new Response(JSON.stringify({ url: data.url }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
}

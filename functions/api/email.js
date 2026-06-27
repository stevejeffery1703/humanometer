const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequest({ env, request }) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let name, email, scores;
  try {
    ({ name, email, scores } = await request.json());
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS });
  }

  if (!email) return new Response(JSON.stringify({ error: 'No email' }), { status: 400, headers: CORS });

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
    // Member already exists is fine
    if (!r.ok && data.title !== 'Member Exists') {
      return new Response(JSON.stringify({ error: data.detail || 'Mailchimp error' }), { status: 502, headers: CORS });
    }

    return new Response(JSON.stringify({ success: true }), { headers: CORS });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: CORS });
  }
}

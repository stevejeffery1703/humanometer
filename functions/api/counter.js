const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequest({ env, request }) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

  try {
    const current = parseInt(await env.HUMANOMETER_KV.get('visitor_count') || '0');
    const count = request.method === 'POST' ? current + 1 : current;
    if (request.method === 'POST') {
      await env.HUMANOMETER_KV.put('visitor_count', String(count));
    }
    return new Response(JSON.stringify({ count }), { headers: CORS });
  } catch (e) {
    return new Response(JSON.stringify({ count: 0, error: e.message }), { status: 500, headers: CORS });
  }
}

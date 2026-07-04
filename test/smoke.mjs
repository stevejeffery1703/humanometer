// Minimal, dependency-free smoke test for the API surface. Verifies the security
// gates hold (payment-gated endpoints reject unverified calls) and the app shell
// serves. Run against a local `wrangler dev` or production:
//
//   node test/smoke.mjs                      # defaults to http://127.0.0.1:8788
//   node test/smoke.mjs http://127.0.0.1:8790
//   node test/smoke.mjs https://humanometer.com
//
// Exits non-zero if any check fails. Does NOT exercise a real paid flow (that
// needs live Stripe/Anthropic keys and a genuine Checkout Session).

const base = (process.argv[2] || 'http://127.0.0.1:8788').replace(/\/$/, '');

const checks = [
  { name: 'home 200',                method: 'GET',  path: '/',                                  want: 200 },
  { name: 'terms 200',               method: 'GET',  path: '/terms.html',                        want: 200 },
  { name: 'privacy 200',             method: 'GET',  path: '/privacy.html',                      want: 200 },
  { name: 'counter 200',             method: 'GET',  path: '/api/counter',                       want: 200 },
  { name: 'fulfil gated (402)',      method: 'POST', path: '/api/fulfil',  body: {},             want: 402 },
  { name: 'deliver gated (402)',     method: 'POST', path: '/api/deliver', body: { session_id: 'cs_x', assets: {} }, want: 402 },
  { name: 'assets gated (402)',      method: 'GET',  path: '/api/assets?session_id=cs_x',        want: 402 },
  { name: 'old proxy gone (404)',    method: 'POST', path: '/api/generate', body: { messages: [] }, want: 404 },
  // NOTE: /r/* serves the SPA shell via env.ASSETS.fetch(). That subrequest can
  // stall under `wrangler dev` (a known local-dev quirk) — this check passes
  // against production. If it times out locally, verify against prod instead.
  { name: 'permalink shell (200)',   method: 'GET',  path: '/r/aB3xY9z',                         want: 200 },
];

let failed = 0;
for (const c of checks) {
  // Follow the pretty-URL redirects the assets layer issues for .html pages,
  // and cap each request so a stuck endpoint can't hang the whole run.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(base + c.path, {
      method: c.method,
      headers: c.body ? { 'Content-Type': 'application/json' } : undefined,
      body: c.body ? JSON.stringify(c.body) : undefined,
      redirect: 'follow',
      signal: ctrl.signal,
    });
    const ok = res.status === c.want;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(24)} ${c.method} ${c.path} -> ${res.status} (want ${c.want})`);
  } catch (e) {
    failed++;
    console.log(`FAIL  ${c.name.padEnd(24)} ${c.method} ${c.path} -> ERROR ${e.message}`);
  } finally {
    clearTimeout(timer);
  }
}

console.log(`\n${failed === 0 ? 'All checks passed' : failed + ' check(s) failed'} against ${base}`);
process.exit(failed === 0 ? 0 : 1);

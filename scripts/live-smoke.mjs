const DEFAULT_URL = 'https://credence-qoder-corpsec.abelchinjh.workers' + '.dev';
const target = (process.env.CREDENCE_LIVE_URL || DEFAULT_URL).replace(/\/$/, '');
const timeoutMs = Number(process.env.CREDENCE_SMOKE_TIMEOUT_MS || 45000);

function timeoutSignal(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`Timed out after ${ms}ms`)), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
}

async function fetchWithTimeout(url, options = {}) {
  const { signal, cancel } = timeoutSignal(timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, { ...options, signal });
    const text = await response.text();
    return { response, text, ms: Date.now() - started };
  } finally {
    cancel();
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`  PASS: ${message}`);
}

console.log(`
--- Credence Live Smoke: ${target} ---
`);

const home = await fetchWithTimeout(`${target}/`, {
  headers: { accept: 'text/html,application/xhtml+xml' },
});
assert(home.response.status === 200, `home route returns HTTP 200 (${home.ms}ms)`);
assert(/<html[\s>]/i.test(home.text) || home.text.includes('id="root"'), 'home route returns app HTML shell');

const aiPayload = {
  user: { department: 'admin', role: 'admin' },
  company: { id: 'fixture-company', name: 'Smoke Test Sdn Bhd', registrationNo: '202601000001' },
  jobs: [{ id: 'fixture-job', subject: 'Annual Return Reminder', status: 'active', firstSendAt: '2026-08-05T09:00:00+08:00' }],
  logs: [{ id: 'fixture-log', status: 'simulated', providerMessageId: 'fixture-smoke', fixtureMarked: true }],
  rules: [{ id: 'fixture-rule', name: 'Annual Return Reminder', statutoryRef: 'Section 68, Companies Act 2016' }],
};

const ai = await fetchWithTimeout(`${target}/api/ai-brief`, {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'user-agent': 'CredenceLiveSmoke/1.0',
  },
  body: JSON.stringify(aiPayload),
});
assert(ai.response.status === 200, `Agnes bridge returns HTTP 200 (${ai.ms}ms)`);
let parsed;
try {
  parsed = JSON.parse(ai.text);
} catch {
  throw new Error(`Agnes bridge did not return JSON: ${ai.text.slice(0, 160)}`);
}
assert(typeof parsed === 'object' && parsed !== null, 'Agnes bridge returns a JSON object');
assert(!('AGNES_API_KEY' in parsed), 'Agnes bridge response does not expose server secret names');
assert(!JSON.stringify(parsed).includes('sk-'), 'Agnes bridge response does not expose API-key shaped values');
assert(
  typeof parsed.executiveBrief === 'string' || typeof parsed.error === 'string',
  'Agnes bridge returns either a generated brief or a clear bounded error'
);

console.log(`
Live smoke passed at ${new Date().toISOString()} for ${target}
`);

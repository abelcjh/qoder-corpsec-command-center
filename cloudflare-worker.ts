type Env = {
  ASSETS: Fetcher;
  AGNES_API_KEY?: string;
  AGNES_BASE_URL?: string;
  AGNES_MODEL?: string;
  AGNES_VISION_MODEL?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function safeArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value.slice(0, 8) : [];
}

function fallbackBrief(reason: string) {
  return json({
    mode: 'Bounded Cloudflare fallback',
    executiveBrief: 'Agnes upstream was unavailable during this request, so Credence kept the demo live with a deterministic fallback: client record → department rule → scheduled reminder → reviewer-safe proof receipt → human-reviewed next action.',
    risks: [
      'AI bridge did not complete inside the Worker timeout; do not block the demo on upstream latency.',
      'Use deterministic queue/proof records as the authority while the AI brief is degraded.',
      'Human staff must review any compliance wording before external send or legal action.',
    ],
    recommendedActions: [
      'Open the selected client record and show the owner-scoped reminder job.',
      'Open Send Logs / Evidence and point to packet ID, freshness, sender, recipient, and retained snapshot.',
      'Close with Qoder Build Ledger plus npm run build && npm run verify as rerunnable proof.',
    ],
    clientMessage: 'Hi, this is a reminder from the CLPC team. We are preparing the next compliance follow-up for your company record. Please confirm the latest responsible contact and supporting documents for the upcoming filing window.',
    proofNotes: [
      'Fallback reason: ' + reason,
      'No browser-side secret exposure and no email, WhatsApp, form, or legal-status mutation occurred.',
    ],
  });
}

async function aiBrief(request: Request, env: Env) {
  if (request.method === 'GET') return json({ ok: true, endpoint: 'Credence Agnes AI briefing' });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!env.AGNES_API_KEY) return json({ error: 'AGNES_API_KEY is not configured' }, 503);

  const body = await request.json().catch(() => ({} as any));
  const context = {
    user: body.user ?? {},
    company: body.company ?? {},
    jobs: safeArray(body.jobs),
    logs: safeArray(body.logs),
    rules: safeArray(body.rules),
  };

  const prompt = `You are an AI compliance workflow copilot inside Credence, a Malaysia-first corporate-secretarial reminder platform for CLPC-like firms. Produce JSON only with keys executiveBrief (string), risks (array of 3 concise strings), recommendedActions (array of 3 concise strings), clientMessage (string), proofNotes (array of 2 concise strings). Be practical, audit-aware, human-reviewed, and do not provide legal advice. Context: ${JSON.stringify(context).slice(0, 12000)}`;

  const base = (env.AGNES_BASE_URL || 'https://apihub.agnes-ai.com/v1').replace(/\/$/, '');
  const model = env.AGNES_MODEL || env.AGNES_VISION_MODEL || 'agnes-2.5-flash';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('upstream timeout'), 15000);
  let upstream: Response;
  try {
    upstream = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${env.AGNES_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'Return strict JSON only. No markdown.' },
          { role: 'user', content: prompt },
        ],
      }),
    });
  } catch {
    clearTimeout(timer);
    return fallbackBrief('Agnes upstream timeout or network error');
  }
  clearTimeout(timer);

  const raw = await upstream.text();
  if (!upstream.ok) return fallbackBrief(`Agnes upstream returned HTTP ${upstream.status}`);

  try {
    const payload = JSON.parse(raw);
    const content = payload.choices?.[0]?.message?.content ?? '{}';
    const match = String(content).match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : content);
    return json({ ...parsed, mode: 'Agnes AI via Cloudflare Worker' });
  } catch (error) {
    return fallbackBrief('Agnes upstream returned non-JSON or malformed JSON');
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/ai-brief') return aiBrief(request, env);
    return env.ASSETS.fetch(request);
  },
};

type Env = {
  AGNES_API_KEY: string;
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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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
  const upstream = await fetch(`${base}/chat/completions`, {
    method: 'POST',
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

  const raw = await upstream.text();
  if (!upstream.ok) return json({ error: 'Agnes upstream failed', status: upstream.status }, 502);

  try {
    const payload = JSON.parse(raw);
    const content = payload.choices?.[0]?.message?.content ?? '{}';
    const match = String(content).match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : content);
    return json({ ...parsed, mode: 'Agnes AI via Cloudflare Function' });
  } catch (error) {
    return json({ error: 'Could not parse Agnes JSON response' }, 502);
  }
};

export const onRequestGet: PagesFunction<Env> = async () => json({ ok: true, endpoint: 'Credence Agnes AI briefing' });

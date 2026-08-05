# Credence Qoder Project Instructions

Purpose: keep future Qoder CLI / Quest / Experts sessions aligned with the hackathon proof contract. Qoder static memory loads committed `AGENTS.md` and `.qoder/rules/**/*.md` as project instructions, so this file is intentionally concise and judge-readable.

## Product spine

Credence is a Malaysia-first CorpSec Command Center for corporate-secretarial teams. The winning loop is:

1. staff login and department-scoped client database;
2. deterministic statutory rule and working-day scheduled chase;
3. reviewer-safe proof row retained after deactivation;
4. bounded Agnes AI brief as advisory context only;
5. Qoder build/proof ledger plus `npm run build && npm run verify` as the rerunnable receipt.

## Non-negotiable boundaries

- Do not send real email, WhatsApp, social posts, organizer forms, or legal-status mutations from the app.
- Keep Agnes AI advisory: it can draft briefs/client wording, but deterministic records and licensed staff approval remain authoritative.
- Never commit secrets. Agnes key stays server-side in the Cloudflare Worker environment; browser code must not expose secret names or API-key-shaped values.
- Treat Gmail/WhatsApp/SSM/MBRS/MCP/AP2 integrations as fixture/future unless a real artifact exists in the repo.
- Do not overclaim Qoder: Qoder was central to the spec-driven build; Ralph/Hermes/Cloudflare/GitHub support patches are disclosed as supporting packaging/reliability work.

## Verification contract

Before committing meaningful changes, run:

```bash
npm run build && npm run verify
```

If live demo reliability is touched and credentials/env are available, also run:

```bash
npm run smoke:live
```

A change is not complete until the docs/app proof surfaces and verifier assertions agree on the same claim.

## Where to look first

- `Spec.md` — product/source-of-truth spec.
- `QODER_BUILD_LEDGER.md` — Qoder usage and workflow evidence.
- `PROOF_LEDGER.md` — claim-to-artifact proof map.
- `VIDEO_AND_SOCIAL_FINAL_PACK.md` — recording/social/form operator pack.
- `src/components/screens/SubmissionPackScreen.tsx` — judge-visible proof dashboard.
- `.qoder/rules/proof-gate.md` — deterministic proof/status rules.
- `.qoder/rules/submission-boundary.md` — no-send/no-submit/no-overclaim safety rules.

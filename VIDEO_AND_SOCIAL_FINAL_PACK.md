# Video and Social Final Pack — Credence / CorpSec Command Center

Purpose: give Abel a ready-to-record and ready-to-post package for the Aug 5 Alibaba Cloud x Qoder Hackathon Singapore 2026 submission without creating any external side effects.

## Rule-clean status

- Do not post or submit automatically from this repo.
- Use existing Supabase-seeded staff credentials only for the recording.
- Do not contact real clients from the app during the recording.
- If asked about Qoder usage, show `QODER_BUILD_LEDGER.md` and say Qoder was central to the original spec-driven build; Ralph/Hermes cron loops only strengthened packaging and proof afterward.
- If Qoder Security scan access/credits are unavailable, say: "security scan is queued as an access-dependent checkpoint; current verified proof is TypeScript strict build, deterministic verification, no committed secrets, and human review."

## 2–3 minute video run of show

Target length: 2:58. This is the recording-safe cutdown; keep the longer proof panels as pause points only if judges ask follow-up questions.

| Time | Screen/action | Exact point to make |
|---:|---|---|
| 0:00–0:20 | Login screen | "Credence is a Malaysia-first CorpSec command center. Qoder turned my spec into a working compliance cockpit for teams chasing deadlines across Gmail and spreadsheets." |
| 0:20–0:55 | Admin login + Client Database | "I start with admin / admin123, open one Sdn Bhd record, and show departments, contacts, owners, SSM details, and the source-of-truth client database." |
| 0:55–1:30 | Rules Library + Scheduled Queue | "A statutory rule becomes a working-day queue only after staff approval. The preview shows exactly what will be chased before anything becomes scheduled work." |
| 1:30–2:05 | Send Logs / Evidence + Proof | "The output is not just a reminder. It is a reviewer-safe proof row: owner, recipient, timestamp, provider field, message snapshot, freshness, and proof retained after deactivation." |
| 2:05–2:35 | AI Workbench | "Agnes drafts briefs and client wording over one bounded role-scoped context. Deterministic records remain authority; AI cannot auto-send, submit forms, or change legal status." |
| 2:35–2:58 | Submission Pack | "The final screen gives judges the Qoder workflow receipt, live smoke receipt, one-command verify path, social/video/form checklist, and the manual submission boundary." |

## Demo reliability checklist

Before recording:

```bash
npm run build && npm run verify
npm run dev
```

Live smoke receipt to mention if judges ask about deployment reliability: on the Aug 5 22:37 GMT+8 Ralph smoke check, the Cloudflare Worker home route returned HTTP 200 app HTML in 187ms and `POST /api/ai-brief` returned HTTP 200 fixture JSON in 4.2s through the server-side Agnes bridge, with no secret-name or API-key-shaped leakage.

Golden path:

1. Use `admin / admin123` first so every screen has data.
2. If Supabase is slow, pause on the login screen until staff credentials load rather than narrating over a spinner.
3. Do not create a job with a real client email during the recording; use seeded fixture data only.
4. Show `QODER_BUILD_LEDGER.md` either in the app's Qoder Build screen or in the editor for judge-visible Qoder proof.
5. On the Submission Pack screen, pause on the Official Brief Compliance Receipt: Qoder as primary build canvas, spec/Quest/Expert workflow shown as method evidence, post-event refinement kept rule-clean, and deadline stated as Aug 5 11:30 PM GMT+8.
6. Pause on the MBRS readiness packet if judges ask about real CoSec workflow depth: Credence complements downstream MBRS/XBRL tools by proving upstream client evidence, validation handoff, export receipt, and late-risk defense.
7. Pause on the AI Workbench recording packet before or after clicking Agnes: say the AI gets one bounded client context, visible role-scoped jobs/logs/rules, and no authority to auto-send, change compliance state, or provide legal advice.
8. Pause on the AI-to-staff handoff receipt if there is time: this answers Counto/Bossi-style AI-guided handoff claims by showing AI drafts only, staff approval gate, deterministic schedule, and retained proof.
9. Pause on the Enterprise trust scorecard if judges ask why this is more than a demo app: workflow compression, deterministic rules, audit-ready proof, governed AI, and pilot-ready artifacts match the enterprise-agent winner bar.
10. Pause on the Authority and provenance receipt if judges ask why the agent workflow is trustworthy: staff identity, delegated rule authority, approved intent, policy boundary, and retained proof provenance.
11. Pause on the Pilot handoff receipt if judges ask how to adopt or rerun it: live URL, one-command proof, Supabase data contract, operator-safe boundaries, and reusable Qoder workflow artifacts.
12. Pause on the Offline verifier receipt if judges ask how to trust the evidence later: deterministic proof packet ID, reviewer-safe fields, freshness recheck, and blocked-action/no-send boundary make the proof row re-derivable instead of screenshot-trusted.
13. If a judge asks “prove this row was not cherry-picked,” use the Auditor challenge drill: pick one Send Logs proof row, re-derive the packet ID and chain head, show only reviewer-safe fields, then cite `npm run build && npm run verify` for chain stability and missing-row detection.
14. Pause on the Live Worker smoke receipt if the browser or Agnes call feels slow: it proves the public URL and server-side AI bridge were checked close to submission time, while the terminal fallback remains deterministic.
15. End on the Submission Pack screen so the organizer requirements are visually obvious.

Role-switch ladder if the recording has extra time:

| Role | Credential | Use in recording |
|---|---|---|
| Admin | `admin / admin123` | Primary golden path; shows every screen and avoids role-scoping confusion. |
| Tax | `tax / tax123` | Optional 10-second proof that Credence supports CP204/Form C and tax-audit workflows, not only corporate-secretarial reminders. |
| Audit | `audit / audit123` | Optional proof of audited-financial-statement ownership and evidence review. |
| Accounts | `accounts / accounts123` | Fallback role for management-account reminders. |
| CorpSec | `corpsec / corpsec123` | Optional proof for annual return, AGM, SSM, and statutory-record workflows. |

Fallback if the live app misbehaves:

```bash
npm run build
npm run verify
```

Then record the terminal passing output plus the README/QODER_BUILD_LEDGER/PROOF_LEDGER tabs while narrating the same story. A verified proof path beats a flaky live UI.

## LinkedIn/X post draft

I built **Credence / CorpSec Command Center** for the Alibaba Cloud x Qoder Hackathon Singapore 2026.

Credence is a Malaysia-first compliance workflow cockpit for corporate-secretarial teams: staff login, department-scoped client records, reusable statutory reminder rules, working-day scheduled queues, and reviewer-safe proof logs for Gmail/provider evidence.

The key idea: compliance reminders are not enough. Corporate-secretarial teams need defensible evidence — who reminded whom, when, under which rule, with what proof, and what risk remains unresolved.

Qoder was central to the build. I used a spec-first workflow and Qoder's agentic coding flow to upgrade the project into a Supabase-backed React/Tailwind app with a reminder engine, scoped roles, verification harness, and build ledger. The repo includes the Qoder build ledger, proof ledger, and repeatable `npm run build && npm run verify` checks.

@QoderOfficial @AlibabaCloud #QoderHackathon #BuildWithQoder

## Shorter X version

Built **Credence / CorpSec Command Center** for the Alibaba Cloud x Qoder Hackathon SG 2026.

It helps Malaysia-first CorpSec teams turn client reminders into defensible proof: scoped staff login, client records, statutory rules, working-day queues, and reviewer-safe evidence logs.

Qoder drove the spec-first full-stack build: Supabase schema, React/Tailwind UI, reminder engine, role scoping, verification harness, and proof ledger.

@QoderOfficial @AlibabaCloud #QoderHackathon #BuildWithQoder

## Submission form values to paste

- Project name: Credence / CorpSec Command Center
- One-line description: Malaysia-first corporate-secretarial command center that turns statutory reminders into department-scoped workflows and defensible proof logs.
- Qoder usage: Spec-first Qoder build workflow; Qoder-generated full-stack upgrade; Qoder Build Ledger; verification harness; security checkpoint note.
- Technical proof: `npm run build && npm run verify` passes; Supabase-backed staff credentials and seeded records; no committed secrets.
- Impact proof: Targets real CLPC/Malaysia corporate-secretarial pain around missed deadlines, scattered Gmail reminders, and weak evidence retention.

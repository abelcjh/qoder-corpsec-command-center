# Video and Social Final Pack — Credence / CorpSec Command Center

Purpose: give Abel a ready-to-record and ready-to-post package for the Aug 5 Alibaba Cloud x Qoder Hackathon Singapore 2026 submission without creating any external side effects.

## Rule-clean status

- Do not post or submit automatically from this repo.
- Use existing Supabase-seeded staff credentials only for the recording.
- Do not contact real clients from the app during the recording.
- If asked about Qoder usage, show `QODER_BUILD_LEDGER.md` and say Qoder was central to the original spec-driven build; Ralph/Hermes cron loops only strengthened packaging and proof afterward.
- If Qoder Security scan access/credits are unavailable, say: "security scan is queued as an access-dependent checkpoint; current verified proof is TypeScript strict build, deterministic verification, no committed secrets, and human review."

## 2–3 minute video run of show

Target length: 2:35.

| Time | Screen/action | Exact point to make |
|---:|---|---|
| 0:00–0:15 | Login screen | "Credence is a Malaysia-first CorpSec command center for firms like CLPC, built for the Alibaba Cloud x Qoder Hackathon using Qoder's spec-driven workflow." |
| 0:15–0:35 | Admin login | "The seeded Supabase staff credentials prove this is not a static mockup. Each role enters a scoped workflow." |
| 0:35–0:55 | Dashboard | "The app centers the client database, scheduled jobs, and proof logs — not invoice status — because compliance work starts before billing." |
| 0:55–1:15 | Client Database + company drawer | "A company carries departments, contacts, directors, secretary, financial year end, and SSM details. This is the operational source of truth." |
| 1:15–1:40 | Rules Library | "Rules encode reusable compliance reminders: Annual Return, CP204/Form C, audited financial statements, AGM notice, and management accounts." |
| 1:40–2:05 | Scheduled Queue + New Send Job preview | "The working-day engine previews follow-ups and skips weekends, so staff know exactly what will happen before approving a reminder workflow." |
| 2:05–2:25 | Send Logs / Evidence | "Every reminder produces a reviewer-safe proof row: owner, recipient, timestamp, evidence type, provider/message ID field, Gmail print status, and message snapshot." |
| 2:25–2:40 | AI Workbench | "Agnes AI drafts the messy brief and client wording, but Credence keeps the deterministic client, rule, schedule, and proof records authoritative and human-reviewed." |
| 2:40–2:55 | Qoder Build Ledger + Submission Pack | "Qoder produced the full-stack upgrade: Supabase schema, React/Tailwind UI, reminder engine, scoping, verification harness, and documentation. Build plus verify passes." |
| 2:55–3:00 | Closing | "Credence turns compliance chasing into defensible reminder evidence — built with Qoder, verified, and ready for real corporate-secretarial teams." |

## Demo reliability checklist

Before recording:

```bash
npm run build && npm run verify
npm run dev
```

Golden path:

1. Use `admin / admin123` first so every screen has data.
2. If Supabase is slow, pause on the login screen until staff credentials load rather than narrating over a spinner.
3. Do not create a job with a real client email during the recording; use seeded fixture data only.
4. Show `QODER_BUILD_LEDGER.md` either in the app's Qoder Build screen or in the editor for judge-visible Qoder proof.
5. End on the Submission Pack screen so the organizer requirements are visually obvious.

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

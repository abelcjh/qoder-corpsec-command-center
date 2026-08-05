# Proof Ledger — Credence / CorpSec Command Center

Claims-to-artifacts mapping for hackathon judging. This is the judge-readable receipt for every major claim in the 2-3 minute submission video.

---

## Claim 1: Department-scoped client database is the source of truth

| Evidence | Location |
|----------|----------|
| `Company` type includes `departments[]` and `active` | `src/types.ts` |
| Department-scoped filtering helpers | `src/lib/scoping.ts` |
| Client database UI with department tags and deactivation | `src/components/screens/ClientDatabaseScreen.tsx` |
| Seed companies have department arrays | `src/data/seed.ts` |

## Claim 2: Recurring reminder engine uses working-day recurrence

| Evidence | Location |
|----------|----------|
| `isWorkingDay`, `addWorkingDays`, `buildScheduledSendJobRuns` | `src/lib/reminderEngine.ts` |
| Tests for working-day math and run generation | `scripts/verify.mts` |
| New job form previews first 10 runs | `src/components/screens/ScheduledQueueScreen.tsx` |

## Claim 3: Database-backed send logs create immutable proof records

| Evidence | Location |
|----------|----------|
| `SendLog` type with snapshot, provider ID, evidence type, sender/recipient metadata | `src/types.ts` |
| `simulateCronSend`, `recordSendProof` | `src/lib/reminderEngine.ts` |
| Send logs table and detail modal backed by Supabase rows | `src/components/screens/SendLogsScreen.tsx` |
| Evidence retention policy screen | `src/components/screens/ProofScreen.tsx` |

## Claim 4: Deactivating a company stops future jobs but retains logs

| Evidence | Location |
|----------|----------|
| `deactivateCompanyReducer` | `src/lib/reducers.ts` |
| Store action uses reducer and emits audit event | `src/lib/store.ts` |
| Deactivation test in verify script | `scripts/verify.mts` |
| Client database deactivate/reactivate buttons | `src/components/screens/ClientDatabaseScreen.tsx` |

## Claim 5: Staff auth with role/department access

| Evidence | Location |
|----------|----------|
| `StaffUser` type and seed users | `src/types.ts`, `src/data/seed.ts` |
| Login screen | `src/components/screens/LoginScreen.tsx` |
| Department-scoped dashboard and navigation | `src/App.tsx`, `src/lib/scoping.ts` |

## Claim 6: Supabase-ready adapter with fixture-backed local state

| Evidence | Location |
|----------|----------|
| Supabase schema with 8 tables and RLS notes | `supabase/schema.sql` |
| `supabase.ts` reads env vars, then uses seeded fixture-backed local state when absent | `src/lib/supabase.ts`, `src/data/seed.ts` |
| Schema verification in test suite | `scripts/verify.mts` |

## Claim 7: Modern UI with Tailwind + shadcn-style components

| Evidence | Location |
|----------|----------|
| Tailwind config with custom ink/cream/crimson tokens | `tailwind.config.js` |
| Reusable UI primitives (Button, Card, Dialog, Table, Tabs, etc.) | `src/components/ui/` |
| Global design tokens | `src/index.css` |

## Claim 8: Build and verification pass

| Evidence | Location |
|----------|----------|
| `npm run build` output | `dist/` |
| Verification script with 47 assertions | `scripts/verify.mts` |
| Package scripts | `package.json` |

## Claim 9: Qoder usage is visible, rule-clean, and reviewable

| Evidence | Location |
|----------|----------|
| Spec-first build plan and full-stack Qoder prompts | `Spec.md`, `QODER_FULLSTACK_PROMPT.md`, `QODER_TASK_PROMPT.md` |
| Qoder-generated phases and human verification receipt | `QODER_BUILD_LEDGER.md`, `scripts/verify.mts` |
| Qoder Security checkpoint documents optional L1/L2/L3 scan path and credit/access limitation | `QODER_BUILD_LEDGER.md` |
| Submission Pack screen tells judges where to look during the recording | `src/components/screens/SubmissionPackScreen.tsx`, `src/components/screens/BuildLedgerScreen.tsx` |

## Claim 10: Agnes AI assists at the edge while deterministic records stay authoritative

| Evidence | Location |
|----------|----------|
| Cloudflare Worker keeps Agnes API key server-side and exposes `/api/ai-brief` only | `cloudflare-worker.ts`, `wrangler.jsonc` |
| AI Workbench displays bounded client/job/log/rule context, advisory risks/actions/client wording, and deterministic fallback | `src/components/screens/AIWorkbenchScreen.tsx` |
| AI context-packet boundary is judge-visible: role-scoped, record-limited, secrets excluded, no auto-send | `src/components/screens/AIWorkbenchScreen.tsx` |
| Human-review and non-legal-advice boundary documented | `README.md`, `VIDEO_AND_SOCIAL_FINAL_PACK.md` |

---

## Rubric proof map for final submission

| Judging criterion | Weight | Hard proof artifact | Video / judge moment |
|---|---:|---|---|
| Use of Qoder | 30% | `QODER_BUILD_LEDGER.md`, `QODER_FULLSTACK_PROMPT.md`, `Spec.md`, `scripts/verify.mts`, Qoder Security checkpoint | Open the Qoder Build screen, then show this ledger and say Qoder produced the schema, state model, UI screens, reminder engine, and verification harness under Abel's human review. |
| Innovation and creativity | 25% | `src/lib/reminderEngine.ts`, `src/lib/scoping.ts`, `src/components/screens/SendLogsScreen.tsx`, `src/components/screens/ProofScreen.tsx` | Position Credence as a department-scoped compliance command center with evidence retention, not another generic reminder/calendar app. |
| Impact | 20% | `SUBMISSION_CHECKLIST.md` market calibration, CLPC workflow references, seeded Malaysia Sdn Bhd client records | Say the wedge is for Malaysian company-secretary/accounting firms whose work begins before invoicing, so the client database and proof trail become operational infrastructure. |
| Technical execution | 15% | `supabase/schema.sql`, `src/lib/store.ts`, `src/lib/reducers.ts`, `npm run build`, `npm run verify` | Show Supabase-backed staff login, scoped clients/jobs/logs, deactivation preserving evidence, and passing verification. |
| Presentation / UGC | 10% | `DEMO_SCRIPT.md`, `src/components/screens/SubmissionPackScreen.tsx`, `SUBMISSION_CHECKLIST.md` | End with Submission Pack screen: social post/video requirements, tags `@QoderOfficial` + `@AlibabaCloud`, hashtags `#QoderHackathon` + `#BuildWithQoder`. |

## Competitor calibration update — 2026-08-05 Ralph loop

| Source | Actionable signal | Credence response |
|---|---|---|
| ezcosec Malaysia (`https://ezcosec.com/`) | Current Malaysian CoSec positioning names missed deadlines, Excel chaos, scattered documents, manual reminders, and knowledge silos as buyer pains. | Keep the demo wedge narrow and judge-visible: client DB → owner/rule scoped reminder → retained reviewer-safe evidence row, including after company deactivation. |
| iCorpSec / BizAid AI CoSec scan (`https://icorpsec.com/`, `https://www.bizaid.my/`) | Competitors now advertise AI assistants, drafting, compliance scanners, client support, OCR/document storage, and due-date monitoring as broad-suite features. | Do not pitch Credence as “another AI assistant”; show the AI Workbench context boundary: role-scoped packet, max 8 jobs/logs/rules, server-side Agnes key, no auto-send, and deterministic proof records as authority. |
| MBRS company-secretary guide (`https://www.mbrs.com.my/mbrs-for-company-secretaries/`) | A real lodger workflow needs T-60 client chases, T-30 preparation checks, T-7 validation, same-day signing, acceptance tracking, and a written record when client delays force late filing or extensions. | Add the Submission Pack MBRS Maker/Lodger control-loop receipt: Credence is the chase/evidence ledger that proves who owned the reminder, what was missing, when it was escalated, and which acceptance/proof row survives review. |
| Officio / iCorpSec / BizAid / BPOSA360 2026 scan (`https://getofficio.today/`, `https://icorpsec.com/`, `https://www.bizaid.my/our-solutions/`, `https://bposa360.com/saas-govern-ai-business-solution-for-corporate-services/`) | Competitors already advertise automatic reminders, weekly email summaries, audit trails, AI assistants, OCR/document management, AML/CTOS/SSM reports, e-signing, and broad client portals. | Make Credence's narrower evidence packet judge-visible: entity/rule, owner/recipient, cadence status, message/provider snapshot, safety boundary, and retained proof after deactivation. |


## Current verification receipt

- Required command before shipping: `npm run build && npm run verify`
- Expected verify scope: working-day recurrence, run generation, cron simulation, department scoping, company deactivation, schema/docs checks.
- Safe-send boundary: the hackathon build records fixture-safe send/proof rows and does not contact real clients from the frontend.

## Evidence freshness receipt

| Proof status | What it proves | Where to show it |
|---|---|---|
| Current | Latest proof row is still inside the expected reminder cadence. | Send Logs / Evidence table; Proof screen; Submission Pack evidence section |
| Expiring | Reminder proof exists, but a staff owner should chase soon before unresolved risk becomes stale. | Scheduled Queue next-run date plus proof row owner/recipient |
| Stale | Missing or outdated proof is visible instead of hidden, preserving escalation accountability. | Proof screen risk note and retained send-log history |
| Reviewer-safe export | Judges can inspect owner, recipient, timestamp, evidence type, snapshot, and Gmail/provider fields without secrets or live sends. | Submission Pack screen and README reviewer-safe export table |
| Reviewer-safe export packet | Exact inspectable fields: entity/rule, owner/recipient, cadence status, evidence snapshot, safety boundary, and proof retained after company deactivation. | Submission Pack screen reviewer-safe export packet panel; proof ledger competitor calibration |
| Recording credential ladder | Seeded credentials let judges see Admin first, then optional Tax/Audit/Accounts/CorpSec role scoping without creating external side effects. | Submission Pack screen and `VIDEO_AND_SOCIAL_FINAL_PACK.md` demo reliability checklist |
| MBRS Maker/Lodger cadence | T-60 chase → T-30 prepare → T-7 validate → acceptance receipt turns one MBRS deadline into a reviewer-safe operational control loop. | Submission Pack screen MBRS control-loop panel; final video voiceover after evidence freshness |

---

## Claim 11: Qoder workflow receipt is visible inside the live app

| Evidence | Location |
|----------|----------|
| Build Ledger screen maps spec-first work, Quest-style decomposition, human review, and verification receipt to Qoder judging language | `src/components/screens/BuildLedgerScreen.tsx` |
| Official Qoder/Luma source emphasizes Spec-Driven Workflow, Quest Mode, Expert Mode, and Qoder as primary build canvas | `QODER_BUILD_LEDGER.md`, `SUBMISSION_CHECKLIST.md` |

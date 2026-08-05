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
| Reviewer-safe packet ID, freshness status, and non-secret export fields | `src/lib/proofPacket.ts`, `src/components/screens/ProofScreen.tsx`, `src/components/screens/SendLogsScreen.tsx` |

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
| Verification script with 106 assertions | `scripts/verify.mts` |
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
| IRIS INSTANT 2.0 MBRS scan (`https://irisregtech.com/blog/suptech/company-secretaries/iris-instant-20-ai-powered-mbrs-20-filing-software-for-malaysian-company-secretaries/`) | MBRS tooling now emphasizes validation engines, previous-year XML checks, reviewer PDFs, JSON exports, traceable audit trails, and manual handoff to SSM mPortal. | Position Credence as the upstream readiness packet: client evidence ready, validation handoff, export/acceptance receipt, and late-risk defense before the lodger enters downstream MBRS tooling. |
| iCorpSec / BizAid / BPOSA360 AI scan (`https://icorpsec.com/`, `https://www.bizaid.my/our-solutions/`, `https://bposa360.com/saas-govern-ai-business-solution-for-corporate-services/`) | Broad CoSec suites now market AI assistants, drafting, compliance scanners, due-date queries, OCR/document modules, and 24/7 client support as expected features. | Record the AI Workbench as a governed recording packet: one selected client, role-scoped evidence, human-reviewed output, no-secret Worker bridge, deterministic records as authority, and no chatbot overclaim. |
| Counto / Bossi Singapore AI-human handoff scan (`https://counto.sg/company-secretary/`, `https://ebos-sg.com/bossi-secretary/`) | Singapore providers now advertise AI-guided submissions, expert-team handoff, automated deadline alerts, and background audit trails. | Make Credence's handoff visible in the Submission Pack: AI drafts only, staff approval gate, deterministic schedule, and reviewer-safe proof retained after the reminder workflow. |
| Enterprise-agent winner calibration (`LinkedIn enterprise agents winner`, `ABBYY 2026 hackathon winner`, `lablab.ai AgentAudit/AuditShield`) | Recent enterprise AI winners emphasize workflow compression from weeks to minutes, audit-ready reports, deterministic governance/scoring, transparent trails, and ready-to-adopt deployment surfaces. | Add the Submission Pack enterprise trust scorecard: minutes-not-weeks loop, deterministic middle, audit-ready proof row, governed Agnes AI, and live/schema/ledger/smoke artifacts that make Credence pilotable. |
| UiPath AgentHack / ABBYY enterprise winner scan (`https://forum.uipath.com/t/here-are-the-uipath-agenthack-2025-winners/3586396`, `https://www.globenewswire.com/news-release/2026/08/04/3338139/0/en/ABBYY-2026-Hackathon-Winner-Accelerates-Mortgage-Auditing-Review-Leveraging-Document-AI-and-Large-Language-Models.html`) | Enterprise-agent winners are called out for business-ready agents, reusable/community artifacts, deployable out-of-the-box workflows, and auditable regulated-industry operations. | Add the Submission Pack pilot handoff receipt: live pilot URL, one-command proof, Supabase/data contract, operator-safe boundaries, and reusable Qoder workflow artifacts. |
| Qoder Experts Mode docs (`https://docs.qoder.com/user-guide/quest/experts-mode`) | Experts Mode emphasizes goal-first prompting, generated plans before execution, expert coordination, visible task progress, and human intervention/confirmation points. | Add a Submission Pack Qoder Experts Mode replay receipt so judges can see Qoder centrality through durable artifacts — Spec, Qoder prompts, build ledger, proof ledger, and `npm run build && npm run verify` — without overclaiming private canvas traces. |
| Trust Receipt / enterprise agent proof-layer winner scan (`https://ashah007.medium.com/we-won-at-agi-house-by-building-the-proof-layer-for-ai-agents-ebdd0f27eced`) | A recent agent-infrastructure winner frames the prize-winning trust layer as receipts for identity, authority, intent alignment, policy compliance, and provenance rather than screenshots alone. | Add the Submission Pack authority/provenance receipt: staff identity, delegated rule authority, approved intent, no-send policy boundary, and reviewer-safe provenance retained after deactivation. |
| Trust Receipt / AgentAudit verifier scan (`https://github.com/ankitshah009/TrustReceipt`, `https://lablab.ai/ai-hackathons/techex-intelligent-enterprise-solutions-hackathon/diego-ia-enterprise/agentaudit-immutable-ai-audit-trail`) | Current agent-proof winners emphasize receipts that can be independently verified from hashes, policy outcomes, and bounded evidence fields, not merely screenshot-trusted logs. | Add the Submission Pack offline verifier receipt: deterministic proof packet ID, reviewer-safe fields, freshness recheck, and blocked-action/no-send receipt so the judge can rerun the proof story from retained evidence. |


## Current verification receipt

- Required command before shipping: `npm run build && npm run verify`
- Expected verify scope: working-day recurrence, run generation, cron simulation, department scoping, company deactivation, schema/docs checks.
- Safe-send boundary: the hackathon build records fixture-safe send/proof rows and does not contact real clients from the frontend.
- Live Worker smoke receipt from Aug 5 23:36 GMT+8 Ralph loop: `/` returned HTTP 200 app HTML in 191ms and `POST /api/ai-brief` returned HTTP 200 fixture JSON in 13.0s using a browser-like smoke request; no secret-name or API-key-shaped values were exposed. Use this as the demo reliability proof before recording; if the network stalls, fall back to the build+verify terminal receipt.

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
| MBRS readiness packet | Client evidence ready → validation handoff → export receipt → late-risk defense explains how Credence complements downstream MBRS/XBRL tools instead of pretending to replace them. | Submission Pack screen MBRS readiness packet panel; final video line before AI Workbench |
| AI Workbench recording packet | Selected client only, role-scoped evidence, human-reviewed wording, no-secret bridge, deterministic authority, and competitor-trap avoidance turn Agnes into governed product AI instead of a generic assistant. | Submission Pack screen AI Workbench recording packet; AI Workbench screen; live smoke secret-shape checks |
| AI-to-staff handoff receipt | AI drafts only → staff approval gate → deterministic schedule → retained proof shows why Credence is safer than an opaque AI-guided filing assistant. | Submission Pack screen handoff receipt; final video line before the organizer checklist |
| Pilot handoff receipt | Live pilot URL → one-command proof → data contract → operator-safe boundaries → reusable workflow turns Credence from demo video into a judge-rerunnable pilot handoff. | Submission Pack screen pilot handoff receipt; final recording pause after enterprise trust scorecard |
| Authority/provenance receipt | Staff identity → delegated rule authority → approved intent snapshot → no-send policy boundary → proof provenance maps the agent-trust winner pattern onto one CorpSec chase. | Submission Pack screen authority and provenance receipt; final recording pause before pilot handoff |
| Offline verifier receipt | Hashable packet ID → reviewer-safe fields → freshness recheck → blocked-action receipt turns the proof row into a re-derivable trust artifact rather than a screenshot. | Submission Pack screen offline verifier receipt; proof packet utility; final recording pause if judges ask how the evidence can be inspected later |
| Auditor challenge drill | Skeptical judge asks “prove it” → open one Send Logs proof row → re-derive packet ID/chain head → show only safe fields → point to blocked boundaries and `npm run build && npm run verify`. | Submission Pack auditor challenge drill; `src/lib/proofPacket.ts`; verifier chain-stability and missing-row detection assertions |
| Singapore practice-suite calibration | ClientBase / VOPlus-style platforms already sell whole-practice visibility, ACRA/AGM deadline tracking, compliance dashboards, document portals, audit trails, and system-bounded AI. | Submission Pack competitor calibration now tells Abel to avoid a broad-suite claim and prove the narrow owner-specific chase → reviewer-safe proof receipt instead |
| 2–3 minute cutdown path | The required organizer video window is protected by a compressed recording path: problem/Qoder → client DB → rule/queue → proof row → governed Agnes → Submission Pack close. | Submission Pack screen cutdown panel; `VIDEO_AND_SOCIAL_FINAL_PACK.md` run-of-show |
| Final readiness receipt | Live URL works, Agnes bridge works, local build+verify is ready, and manual side-effect boundaries are visible before submission. | Submission Pack top panel; `npm run smoke:live`; final recording confidence check |
| Public/private disclosure boundary | Public receipt ID/chain/freshness/blocked status is shareable, selected message/provider/risk detail is reviewer-gated, and secrets/raw inboxes/real send controls are never exported. | Submission Pack disclosure-boundary panel; final video confidentiality pause |
| Protocol-ready receipt bridge | Action type → policy decision → hashed attachments → protocol bridge frames each CorpSec chase as a portable trust receipt without claiming live MCP/AP2/filing integrations. | Submission Pack protocol-ready bridge; final video interoperability pause |

---

## Claim 11: Qoder workflow receipt is visible inside the live app

| Evidence | Location |
|----------|----------|
| Build Ledger screen maps spec-first work, Quest-style decomposition, human review, and verification receipt to Qoder judging language | `src/components/screens/BuildLedgerScreen.tsx` |
| Official Qoder/Luma source emphasizes Spec-Driven Workflow, Quest Mode, Expert Mode, and Qoder as primary build canvas | `QODER_BUILD_LEDGER.md`, `SUBMISSION_CHECKLIST.md` |

## Claim 12: 60-second judge live check reduces demo risk

| Evidence | Location |
|----------|----------|
| Submission Pack now gives a live check order: open deployed URL, log in as admin, show golden loop, test Agnes/fallback, avoid side effects, keep build+verify receipt ready | `src/components/screens/SubmissionPackScreen.tsx` |
| Verification harness asserts the live-check panel exists so submission packaging cannot silently drop the reliability receipt | `scripts/verify.mts` |

## Claim 13: Public deploy and Agnes bridge were smoke-checked close to submission time

| Evidence | Location |
|----------|----------|
| Aug 5 23:36 GMT+8 remote smoke check returned HTTP 200 app HTML for `/` on the Cloudflare Worker | terminal smoke receipt from Ralph loop; `src/components/screens/SubmissionPackScreen.tsx` |
| Same smoke check returned HTTP 200 JSON from `POST /api/ai-brief` with fixture-only request data and browser-like headers in 13.0s, while no secret-name or API-key-shaped values were exposed | terminal smoke receipt from Ralph loop; `src/components/screens/SubmissionPackScreen.tsx` |
| If live network/AI stalls during recording, the documented fallback remains `npm run build && npm run verify` instead of unsafe external sends | `VIDEO_AND_SOCIAL_FINAL_PACK.md`, `SUBMISSION_CHECKLIST.md` |

## Claim 14: Expert Mode workflow is replayable without overclaiming hidden traces

| Evidence | Location |
|----------|----------|
| Qoder Experts Mode docs emphasize end-goal prompts, planning, expert coordination, progress visibility, and human intervention for confirmations or changes | `QODER_BUILD_LEDGER.md`, `src/components/screens/BuildLedgerScreen.tsx` |
| Build Ledger now shows an Expert Mode replay receipt: end goal first, planned phases, human intervention points, and an inspectable canvas substitute backed by build+verify | `src/components/screens/BuildLedgerScreen.tsx` |
| Submission Pack now surfaces the same replay receipt in the final judge path: goal prompt, plan-before-execution, expert coordination, human checkpoints, and durable proof artifacts | `src/components/screens/SubmissionPackScreen.tsx`, `scripts/verify.mts` |
| The receipt explicitly says it avoids overclaiming private Qoder canvas traces while still proving Qoder centrality through durable repo artifacts | `src/components/screens/SubmissionPackScreen.tsx` |

## Claim 15: Live deploy smoke command is reusable

| Evidence | Location |
|----------|----------|
| `npm run smoke:live` checks the public Cloudflare Worker home route and `/api/ai-brief` with fixture-safe data | `scripts/live-smoke.mjs`, `package.json` |
| Smoke verifies HTTP 200, app HTML shell, JSON AI route response, and no exposed Agnes secret-shaped values | `scripts/live-smoke.mjs` |
| Submission checklist now tells Abel to run build + verify + live smoke before recording/submission | `SUBMISSION_CHECKLIST.md` |

## Claim 16: AI Workbench is recorded as governed product AI, not another generic CoSec chatbot

| Evidence | Location |
|----------|----------|
| Submission Pack gives Abel a six-part recording packet: selected client only, role-scoped evidence, human-reviewed output, no-secret Worker bridge, deterministic authority, and competitor-trap avoidance | `src/components/screens/SubmissionPackScreen.tsx` |
| Live smoke script checks the Agnes bridge response for secret names and API-key-shaped values | `scripts/live-smoke.mjs` |
| Final video pack tells Abel to frame Agnes as advisory over deterministic proof records, not as legal advice or auto-send authority | `VIDEO_AND_SOCIAL_FINAL_PACK.md` |

## Claim 17: Credence has a pilot handoff receipt, not only a polished video path

| Evidence | Location |
|----------|----------|
| Submission Pack lists the live pilot URL, seeded credentials boundary, one-command proof, Supabase/data contract, operator-safe boundaries, and reusable Qoder workflow artifacts | `src/components/screens/SubmissionPackScreen.tsx` |
| Verification harness asserts the Pilot handoff receipt and Reusable workflow language cannot silently disappear | `scripts/verify.mts` |
| Final video pack tells Abel to pause on the pilot handoff receipt after the enterprise trust scorecard when judges ask if the project is adoption-ready | `VIDEO_AND_SOCIAL_FINAL_PACK.md` |

## Claim 18: Reviewer-safe evidence can be re-derived instead of screenshot-trusted

| Evidence | Location |
|----------|----------|
| Proof packet IDs are deterministic and start with `proof-`, giving judges a hashable receipt over retained send-log evidence | `src/lib/proofPacket.ts`, `scripts/verify.mts` |
| Submission Pack shows an Offline verifier receipt with hashable packet ID, reviewer-safe fields, freshness recheck, and blocked-action receipt | `src/components/screens/SubmissionPackScreen.tsx` |
| Final docs tell Abel to frame the packet as re-derivable evidence that excludes secrets and preserves the no-send / staff-approval boundary | `SUBMISSION_CHECKLIST.md`, `VIDEO_AND_SOCIAL_FINAL_PACK.md` |


## Research signal — 2026 enterprise-agent winner bar

A compact winner scan found that recent enterprise-agent winners are rewarded for acting inside real workflows and leaving inspectable evidence, not for generic chat UX. Examples include AWS/GitLab-style winners with transparent coverage decisions, MR/compliance evidence, tests, and audit trails. Credence's practical response is the reviewer-safe proof packet: the demo now shows a deterministic packet ID, freshness state, retained fields, and the no-secret export boundary for each reminder proof row.

## Research signal — Singapore AI-human handoff bar

A Singapore CorpSec scan found incumbents already advertising AI-guided submissions, expert team handoffs, automated alerts, and background audit trails. Credence's response is to make the AI-to-staff handoff a judge-visible receipt: Agnes drafts only, a human owner approves the rule/job path, deterministic working-day logic schedules the chase, and reviewer-safe proof survives for later inspection.


## Latest Ralph-loop research signal — enterprise proof bar

A compact Aug 5 scan of recent enterprise-agent hackathon winners found repeated emphasis on audit-grade receipts, policy/verdict logs, and hashable evidence trails (Ledger AI, AgentAudit, Forensa, AuditShield-style projects). Credence now answers that bar inside its narrower CorpSec workflow: proof rows keep reviewer-safe fields and the Proof screen exposes a deterministic receipt-chain head so judges can see missing or altered retained evidence would change the export receipt.

## Claim 19: Submission Pack leads with a 10-second enterprise-agent winning loop

| Evidence | Location |
|----------|----------|
| A compact winner scan found enterprise AI hackathon winners are praised when they are ready to deploy, solve daily regulated workflows, keep deterministic control in the middle, and leave auditable proof rather than only a chatbot surface | ABBYY 2026 hackathon winner coverage; enterprise-agent public submission scans |
| Submission Pack now puts a 10-second demo spine above the fold: client database → deterministic rule authority → retained proof packet → governed Agnes brief → Qoder verification receipt | `src/components/screens/SubmissionPackScreen.tsx` |
| Verification harness asserts the 10-second spine and deterministic scheduled-chase wording so the judge-visible loop cannot silently disappear before recording | `scripts/verify.mts` |

## Claim 20: Skeptical judges get an auditor challenge drill, not another proof slogan

| Evidence | Location |
|----------|----------|
| Aug 5 enterprise proof-layer scan found winners like Trust Receipt, AgentAudit, Forensa, and raucle emphasize independently checkable receipts, authority/policy boundaries, tamper-evident chains, and offline verification rather than screenshot trust | Public winner/repo scans captured in the Ralph-loop report |
| Submission Pack now gives a five-step auditor challenge: open one proof row, re-derive packet ID/chain head, inspect only reviewer-safe fields, show blocked/no-send boundary, and rerun `npm run build && npm run verify` if challenged | `src/components/screens/SubmissionPackScreen.tsx` |
| Verification harness asserts the auditor challenge drill, re-derive wording, and missing-row detection fallback so this judge-defense surface cannot disappear before recording | `scripts/verify.mts` |

## Claim 21: Receipt proof is honest about its correctness boundary

| Evidence | Location |
|----------|----------|
| Aug 5 proof-layer research found a recurring warning in agent receipt guidance: receipts prove attribution, integrity, and ordering, but they do not prove the action was correct or the policy was sound by themselves | Microsoft AI agent receipt guidance; Trust Receipt winner scan |
| Submission Pack now includes a Receipt truth boundary panel that says exactly what Credence packets prove, what they do not prove, and which deterministic controls sit beside the receipt | `src/components/screens/SubmissionPackScreen.tsx` |
| Recording line: “the receipt makes the audit trail honest; the verified rule engine and human approval make the workflow defensible” | `VIDEO_AND_SOCIAL_FINAL_PACK.md`, `SUBMISSION_CHECKLIST.md` |

## Claim 22: Receipt disclosure is privacy-preserving and operator-controlled

| Evidence | Location |
|----------|----------|
| Aug 5 agent-receipt protocol scan found the enterprise proof bar moving toward public tamper evidence with operator-gated payload disclosure, so verification should not require exposing private business data | Agent Receipts protocol scan; Trust Receipt / AgentAudit winner scans |
| Submission Pack now includes a Public/private disclosure boundary panel: public receipt ID/chain/freshness/blocked status first, reviewer-gated detail only when needed, and never-exported secrets/raw mailboxes/real send controls | `src/components/screens/SubmissionPackScreen.tsx` |
| Final video pack tells Abel how to narrate the disclosure boundary without overclaiming cryptography or leaking private client evidence | `VIDEO_AND_SOCIAL_FINAL_PACK.md`, `SUBMISSION_CHECKLIST.md` |

## Claim 25: Qoder mode choice is intentional, docs-backed, and replayable

| Evidence | Location |
|----------|----------|
| Qoder Quest docs state Agent/Experts mode is selected at task start and cannot be switched later; Credence now turns that into a judge-visible mode-choice receipt instead of vague Qoder mentions | `src/components/screens/SubmissionPackScreen.tsx`, `scripts/verify.mts` |
| Experts Mode docs position plan-before-execution, expert coordination, and intervention notifications as the workflow shape; Credence maps those to Spec.md, preserved prompts, human checkpoints, manual side-effect boundaries, and rerunnable verifier output | `Spec.md`, `QODER_FULLSTACK_PROMPT.md`, `QODER_TASK_PROMPT.md`, `QODER_BUILD_LEDGER.md` |


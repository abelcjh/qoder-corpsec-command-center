import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, ClipboardList, Film, Megaphone, Send, Trophy, CalendarDays } from 'lucide-react';

const rubric = [
  ['Use of Qoder', '30%', 'Spec-driven prompt, Qoder CLI build session, build ledger, verification logs, reusable workflow proof, and Qoder Security checkpoint.'],
  ['Innovation & Creativity', '25%', 'Malaysia-first corporate-secretarial reminder platform with department-scoped workflows and evidence retention.'],
  ['Impact', '20%', 'Social reach and engagement from LinkedIn/X post; real CLPC/industry validation angle.'],
  ['Technical Execution', '15%', 'Supabase-backed staff login, client database, scheduled jobs, proof logs, build + verify passing.'],
  ['Presentation & UGC', '10%', '2–3 minute demo video, correct tags, clear product story, screenshots.'],
];

const requirements = [
  ['Social post', 'Required', 'Post on LinkedIn or X about the project. Describe what Credence does and share the Qoder build experience.'],
  ['Tags', 'Required', 'Tag @QoderOfficial and @AlibabaCloud.'],
  ['Hashtags', 'Required', '#QoderHackathon #BuildWithQoder'],
  ['Demo video', 'Required', '2–3 minutes. Show the project in action, explain the problem, demonstrate key features. Upload to YouTube, Loom, or Vimeo.'],
  ['Submission form', 'Required', 'Submit both the social post URL and demo video link via the organizer form before Aug 5, 11:30 PM GMT+8.'],
];

const organizerSourceReceipts = [
  ['Official source', 'Luma event page says the hackathon is about building real software with Qoder as the primary build canvas.'],
  ['Workflow requirement', 'Spec-Driven Workflow plus Quest Mode / Expert Mode should be shown as the build method and proof surface, not hidden behind the finished UI.'],
  ['Post-event window', 'The public brief allows the onsite Jul 22 build day plus a two-week refinement window, so docs must distinguish Qoder-built core from Ralph/Hermes packaging polish.'],
  ['Submission deadline', 'Submit public social post and 2–3 minute demo link by Aug 5, 11:30 PM GMT+8; do not rely on private drafts.'],
  ['Qoder CLI adoption signal', 'Qoder CLI docs position terminal workflows as automation-first, scriptable, reviewable, and extensible through SDK/MCP-style agent workflows; pitch Credence as a Qoder-built app plus reusable verification workflow, not a hidden chatbot wrapper.'],
];

const marketFindings = [
  {
    source: 'Officio Malaysia',
    url: 'https://getofficio.today/',
    signal: 'Malaysian company-secretary tools already sell client portals, date tracking, and automatic statutory reminders.',
    credenceAngle: 'Lead with proof retention and department-scoped reminder operations, not another generic calendar.',
  },
  {
    source: 'ezcosec Malaysia',
    url: 'https://ezcosec.com/',
    signal: 'A current Malaysian CoSec platform frames the buyer pain as missed deadlines, Excel chaos, scattered documents, manual reminders, and knowledge silos.',
    credenceAngle: 'Use the 10-second demo to prove the narrow wedge competitors describe: one client record becomes an owner-scoped reminder, then a reviewer-safe evidence row that survives deactivation.',
  },
  {
    source: 'CA-Kompas',
    url: 'https://ca-kompas.com/',
    signal: 'Local accounting/company-secretary buyers expect client databases, 80+ fields, compliance tracking, and email/SMS notifications.',
    credenceAngle: 'Show the client database as the operational source of truth and make every reminder produce auditable evidence.',
  },
  {
    source: 'iCorpSec',
    url: 'https://icorpsec.com/',
    signal: 'Singapore/Malaysia competitors are moving toward AI drafting and compliance scanners.',
    credenceAngle: 'Differentiate as a human-approved command center where AI assists messy intake while deterministic rules create the deadline/job/proof trail.',
  },
  {
    source: 'Counto / Bossi AI-human handoff scan',
    url: 'https://counto.sg/company-secretary/',
    signal: 'Singapore CorpSec products already market AI-guided submissions, expert-team handoff, automated deadline alerts, and background audit trails.',
    credenceAngle: 'Make the handoff inspectable: Agnes drafts the brief, staff approves the reminder, deterministic rules schedule it, and the proof row records what was retained for review.',
  },
  {
    source: 'ClientBase / VOPlus Singapore scan',
    url: 'https://clientbase.pro/',
    signal: 'Singapore practice platforms already sell whole-practice visibility, ACRA/AGM deadline tracking, compliance dashboards, audit trails, document portals, and AI that stays inside the system.',
    credenceAngle: 'Do not compete as a broad suite in the recording; show the narrower judge-visible control: one owner-specific chase becomes a reviewer-safe proof receipt for Gmail/spreadsheet teams.',
  },
  {
    source: 'Agent Academy / Bizsec operational workflow scan',
    url: 'https://devblogs.microsoft.com/powerplatform/agent-academy-hackathon-winners/',
    signal: 'Enterprise-agent winners and current Singapore CoSec tools emphasize governed records, approval gates, duplicate-safe actions, audit logs, and correlation IDs rather than standalone AI answers.',
    credenceAngle: 'Show Credence as an operational control plane: each chase has a job ID, proof packet ID, staff approval boundary, freshness verdict, and safe retry/fallback path.',
  },
  {
    source: 'MBRS operational guide',
    url: 'https://www.mbrs.com.my/mbrs-for-company-secretaries/',
    signal: 'Real MBRS practice risk is not just a due date: lodgers need T-60 client chases, T-30 preparation checks, T-7 validation, same-day signing, acceptance tracking, and evidence that late inputs were the client-side blocker.',
    credenceAngle: 'Show Credence as the reviewer-safe chase ledger for the Maker/Lodger control loop: each reminder has an owner, cadence, snapshot, unresolved-risk note, and retained proof before acceptance.',
  },
  {
    source: 'IRIS INSTANT 2.0 MBRS scan',
    url: 'https://irisregtech.com/blog/suptech/company-secretaries/iris-instant-20-ai-powered-mbrs-20-filing-software-for-malaysian-company-secretaries/',
    signal: 'MBRS 2.0 tooling now sells validation engines, previous-year XML checks, reviewer PDFs, JSON exports, and traceable handoffs before SSM mPortal upload.',
    credenceAngle: 'Frame Credence as the upstream proof packet that tells the lodger whether client evidence is complete before validation/export, rather than pretending to replace MBRS filing software.',
  },
  {
    source: 'BizAid / ACE market scan',
    url: 'https://www.bizaid.my/our-solutions/',
    signal: 'Malaysia CoSec suites advertise AI assistants, OCR document storage, e-signatures, MBRS/SSM workflows, and broad client portals.',
    credenceAngle: 'Stay sharp: Credence is the lightweight accountability layer for Gmail/spreadsheet teams that need owner-specific chasers and reviewer-safe evidence quickly.',
  },
  {
    source: 'Qoder Security',
    url: 'https://docs.qoder.com/qoder-security-guide',
    signal: 'Qoder positions L1/L2/L3 security scans as staged review from coding loop to pre-push handoff.',
    credenceAngle: 'Show a rule-clean security checkpoint: Qoder-built code, human review, build+verify receipt, and scan/credit limitation noted honestly.',
  },
  {
    source: 'Trust Receipt / enterprise agent proof-layer winner scan',
    url: 'https://ashah007.medium.com/we-won-at-agi-house-by-building-the-proof-layer-for-ai-agents-ebdd0f27eced',
    signal: 'Recent agent-infrastructure winners argue that autonomous workflows need inspectable receipts for identity, authority, intent alignment, policy compliance, and provenance instead of screenshots alone.',
    credenceAngle: 'Turn every CorpSec chase into the same kind of trust moment: staff identity, delegated rule authority, approved intent, no-send policy boundary, and retained proof provenance.',
  },
  {
    source: 'Microsoft AI agent receipt guidance',
    url: 'https://microsoft.github.io/ai-agents-for-beginners/18-securing-ai-agents/',
    signal: 'Cryptographic receipts prove attribution, integrity, and ordering, but they do not prove the action was correct or that policy was sound unless separate controls enforce those claims.',
    credenceAngle: 'Keep the pitch honest: Credence proof packets make reminder evidence auditable and tamper-evident, while deterministic rules, staff approval, and verifier checks remain the correctness controls.',
  },
  {
    source: 'Agent Receipts protocol scan',
    url: 'https://agentreceipts.ai/',
    signal: 'Agent receipt systems increasingly separate public tamper evidence from sensitive payload disclosure: parameters can be hashed, operators decide what is revealed, and verification does not require dumping private business data.',
    credenceAngle: 'Make Credence\'s disclosure boundary visible: public-safe receipt ID/freshness/status proves the chase exists, while detailed client snippets stay reviewer-gated and never expose secrets or full mailboxes.',
  },
  {
    source: 'TrustProof / TrustReceipt protocol scan',
    url: 'https://github.com/ataraxia-labs-ai/trustproof-protocol',
    signal: 'Agent-receipt protocols are standardizing portable action receipts with policy decisions, hashed attachments, protocol references, and offline verification instead of app-specific screenshots.',
    credenceAngle: 'Pitch Credence proof rows as protocol-ready receipts: a CorpSec chase can later link to Gmail, MCP, AP2, or filing-system artifacts while keeping raw client payloads gated.',
  },
];

const formValues = [
  ['Team name', 'Credence'],
  ['Project title', 'Credence / CorpSec Command Center'],
  ['One-sentence description', 'Malaysia-first corporate-secretarial command center that turns statutory reminders into department-scoped workflows and defensible proof logs.'],
  ['Social post link', 'Paste public LinkedIn/X URL after posting; do not submit a draft or private link.'],
  ['Demo video link', 'Paste YouTube/Loom/Vimeo URL after the 2–3 minute recording uploads.'],
  ['Live demo link', 'https://credence-qoder-corpsec.abelchinjh.workers.dev'],
  ['Consent fields', 'Select Yes for both organizer sharing/judging consent fields if Abel approves submission.'],
];

const organizerFormGate = [
  ['Form URL', 'Use the official Alibaba Cloud survey form: https://survey.alibabacloud.com/uone/sg/survey/U-1jNntGK'],
  ['Hard deadline', 'Submit by Aug 5, 11:30 PM GMT+8; treat social/video upload time as part of the deadline, not after it.'],
  ['Required paste set', 'Team name, project title, one-sentence description, public social post URL, leader email, leader phone, and both consent yes fields.'],
  ['Optional but winning', 'Attach the 2–3 minute demo video and slide URL/upload if ready; do not block the required form on a last-minute slide polish loop.'],
  ['Manual submit boundary', 'Credence shows the form packet but never auto-posts, auto-submits, emails, WhatsApps, or mutates legal status. Abel submits only after reviewing every link.'],
];


const recordingCredentials = [
  ['Admin', 'admin / admin123', 'Start here for the complete dashboard, client database, scheduled queue, evidence logs, AI Workbench, Qoder ledger, and Submission Pack.'],
  ['Tax', 'tax / tax123', 'Use only if there is time to prove the CLPC multi-department wedge with CP204/Form C and tax-audit workflows.'],
  ['Audit', 'audit / audit123', 'Optional 10-second role switch for audited financial statement and evidence-review ownership.'],
  ['Accounts', 'accounts / accounts123', 'Fallback role to show management-account reminders without touching corpsec-only records.'],
  ['CorpSec', 'corpsec / corpsec123', 'Optional role for annual return, AGM, SSM, and statutory-record workflows.'],
];

const evidenceFreshness = [
  ['Current', 'Reminder proof exists for this rule/deadline and the latest evidence snapshot is still inside the expected cadence.'],
  ['Expiring', 'A proof row exists, but the next statutory/customer follow-up is close enough that a staff owner should chase before the risk becomes stale.'],
  ['Stale', 'The deadline/rule has no recent proof row or unresolved risk remains after the expected follow-up window.'],
  ['Reviewer-safe export', 'Judges and reviewers can inspect owner, recipient, timestamp, source type, message snapshot, and unresolved risk without exposing secrets or contacting real clients.'],
];

const reviewerExportPacket = [
  ['Entity + rule', 'Company, department, statutory rule, and deadline are visible so a reviewer knows why the chase happened.'],
  ['Owner + recipient', 'Staff owner, client contact, role, and communication channel are retained for accountability.'],
  ['Cadence status', 'Current / Expiring / Stale status turns freshness into a triage surface instead of a buried timestamp.'],
  ['Evidence snapshot', 'Message body, provider/message ID field, Gmail print-document status, and unresolved-risk note are preserved.'],
  ['Safety boundary', 'Exports show proof metadata and selected snippets only; secrets, API keys, and live client sends stay outside the demo path.'],
  ['After deactivation', 'Inactive companies stop future scheduled jobs but keep historical proof rows for audit/reviewer continuity.'],
];

const mbrsControlLoop = [
  ['T-60 chase', 'Client-facing reminder captures audit-status or signed-FS blocker before the annual-return / financial-statement cluster becomes urgent.'],
  ['T-30 prepare', 'Owner checks that preparation is underway and records the latest client response or missing-input risk.'],
  ['T-7 validate', 'Reviewer confirms the MBRS file / evidence pack is ready before lodgement-day pressure.'],
  ['Acceptance receipt', 'After signing/lodgement, the proof row keeps provider ID, snapshot, unresolved risk, and acceptance evidence for later review.'],
];

const mbrsReadinessPacket = [
  ['Client evidence ready', 'Every missing director/client/auditor input has an owner, latest chase, and unresolved-risk note before the lodger starts final validation.'],
  ['Validation handoff', 'Credence does not claim to generate XBRL; it hands a clean proof packet into MBRS tooling / reviewer workflow.'],
  ['Export receipt', 'Reviewer can see message snapshot, provider ID field, Gmail print status, and acceptance/export note without exposing secrets.'],
  ['Late-risk defense', 'If filing slips, the firm can show when the client was chased and what blocker remained, instead of relying on memory or scattered email.'],
];

const qoderWorkflowReceipts = [
  ['Spec first', 'Spec.md is the source-of-truth build brief Qoder used before implementation.'],
  ['Quest / agentic execution', 'QODER_FULLSTACK_PROMPT.md and QODER_TASK_PROMPT.md preserve delegated tasks instead of hiding them in narration.'],
  ['Human review', 'Abel reviewed scope, credentials, safety boundaries, and post-build Ralph-loop changes without overclaiming Qoder.'],
  ['Verified output', 'npm run build && npm run verify is the repeatable judge receipt for the Qoder-built engine, scoping, schema, and docs.'],
  ['Security checkpoint', 'QODER_BUILD_LEDGER.md names the Qoder L1/L2/L3 scan path and the honest access/credit fallback.'],
];

const qoderExpertsReplayReceipt = [
  ['Goal prompt', 'Qoder Experts Mode guidance starts from a clear natural-language goal; Credence keeps that goal in Spec.md and the preserved Qoder task prompts.'],
  ['Plan before execution', 'The Qoder docs emphasize generated plans before execution, so the recording should point to Spec → task phases → verifier rather than implying hidden magic.'],
  ['Expert coordination', 'Experts Mode coordinates specialist work in parallel; Credence translates that into visible artifacts: schema, reminder engine, role scoping, UI, and QA checks.'],
  ['Human checkpoints', 'Qoder allows requirement changes and confirmation points; Abel keeps scope, safety boundaries, credentials, and submission actions human-owned.'],
  ['Replayable proof', 'Because judges may not see the original Qoder canvas, the repo substitutes durable proof: build ledger, proof ledger, prompts, and npm run build && npm run verify.'],
];

const qoderModeChoiceReceipt = [
  ['Mode locked early', 'Qoder Quest docs warn that Agent/Experts mode is chosen at task start and cannot be switched later, so the build ledger should show intentional delegation rather than ad-hoc prompting.'],
  ['Experts for complexity', 'Experts Mode is documented for medium-to-large engineering work; Credence uses it as the credible fit for schema, engine, role scoping, AI bridge, UI, QA, and packaging.'],
  ['Plan review moment', 'The docs emphasize reviewing and adjusting the generated plan before execution; Abel should narrate Spec.md + preserved prompts as the human-approved plan surface.'],
  ['Notification boundary', 'Qoder surfaces confirmations/interventions when needed; Credence mirrors that safety pattern with manual sends, manual form/social submission, and no legal-status mutation.'],
  ['Replay substitute', 'If judges cannot inspect the private Qoder canvas, the public substitute is exact prompts, build/proof ledgers, verifier output, and this mode-choice receipt.'],
];

const qoderMemoryKitReceipt = [
  ['Project memory', 'AGENTS.md gives Qoder future sessions the product spine, no-send boundaries, and exact build/verify commands as committed static memory.'],
  ['Proof gate rule', '.qoder/rules/proof-gate.md keeps deterministic closure statuses, reviewer-safe fields, freshness states, and packet authority controls front-of-context.'],
  ['Submission boundary rule', '.qoder/rules/submission-boundary.md preserves rule-clean claims: no social/form/email/WhatsApp mutation and no overclaiming private Qoder traces.'],
  ['Reusable workflow proof', 'Because Qoder loads AGENTS.md plus .qoder/rules/**/*.md as project instructions, Credence is packaged as a rerunnable CorpSec evidence workflow, not only a one-off app.'],
];

const tenSecondDemoSpine = [
  ['1. Client database', 'Open Nusantara/Ace from the seeded staff login and show department owners + contacts as the source of truth.'],
  ['2. Rule authority', 'Show the statutory rule and working-day cadence that deterministically creates the scheduled chase.'],
  ['3. Proof retained', 'Open the reviewer-safe evidence packet: owner, recipient, provider field, freshness, unresolved risk, and retained snapshot after deactivation.'],
  ['4. Agnes advisory', 'Generate or show the bounded AI brief as human-reviewed context only; deterministic records remain the authority.'],
  ['5. Qoder receipt', 'Close on Spec/Qoder prompts/build ledger plus npm run build && npm run verify as the rerunnable judge proof.'],
];


const judgeLiveCheck = [
  ['Open live URL', 'Use https://credence-qoder-corpsec.abelchinjh.workers.dev and confirm the staff login loads before recording.'],
  ['Login path', 'Start with admin / admin123, then optionally switch to tax / tax123 or corpsec / corpsec123 only if it sharpens the department-scoping story.'],
  ['Golden loop', 'Client Database → Scheduled Queue → Send Logs / Evidence → Proof → AI Workbench → Qoder Build Ledger → Submission Pack.'],
  ['AI endpoint expectation', 'Click Generate Agnes briefing once; if Agnes/Cloudflare is unavailable, show the visible deterministic fallback banner as resilience proof rather than hiding it.'],
  ['No side effects', 'Do not send email, WhatsApp, social posts, or forms from the app; the demo uses fixture-safe proof rows and human-reviewed copy only.'],
  ['Final proof command', 'Keep terminal receipt ready: npm run build && npm run verify, currently covering the deterministic verifier assertions plus build output.'],
];

const liveSmokeReceipt = [
  ['Current live smoke check', 'Aug 6 14:07 GMT+8: live Worker home route returned HTTP 200 app HTML in 363ms and the Agnes bridge returned HTTP 200 JSON in 11.4s with a browser-like fixture request, plus no-secret/API-key-shape checks passed.'],
  ['Home page', 'Open the deployed Worker first; the latest smoke confirms the staff-login app shell loads from the public URL, not only from local dev.'],
  ['Agnes API route', 'POST /api/ai-brief returned HTTP 200 JSON for a safe fixture company, proving the server-side AI bridge is reachable without exposing the key.'],
  ['Recording fallback', 'If the live network stalls, narrate the saved smoke receipt plus npm run build && npm run verify instead of improvising.'],
];

const finalReadinessReceipt = [
  ['Live URL works', 'Latest smoke passed at Aug 6 14:07 GMT+8: public Worker home route HTTP 200, staff-login app shell returned in 363ms.'],
  ['Agnes bridge works', 'Fixture-safe POST /api/ai-brief returned HTTP 200 JSON in 11.4s and passed secret-name/API-key-shape checks.'],
  ['Local proof command', 'Keep npm run build && npm run verify visible as the fallback receipt; the harness covers the deterministic middle and submission-proof surfaces.'],
  ['Manual boundaries', 'Social post, organizer form, email/WhatsApp, and legal-status changes remain manual; the app demonstrates fixture-safe receipts only.'],
];

const videoCutdownPath = [
  ['0:00–0:20', 'Problem + Qoder: Malaysia CorpSec teams chase deadlines across Gmail/spreadsheets; Qoder turned the spec into a working compliance cockpit.'],
  ['0:20–0:55', 'Login + client DB: admin / admin123, open one Sdn Bhd record, show departments, contacts, owners, and source-of-truth details.'],
  ['0:55–1:30', 'Rule → queue: show one statutory rule and working-day schedule preview; staff approval happens before any reminder workflow.'],
  ['1:30–2:05', 'Proof row: Send Logs / Evidence proves owner, recipient, timestamp, provider field, snapshot, freshness, and retained proof after deactivation.'],
  ['2:05–2:35', 'Agnes + safety: bounded AI briefing drafts only; deterministic records remain authority and no external send/form/post happens automatically.'],
  ['2:35–2:58', 'Submission Pack close: Qoder workflow receipt, live smoke receipt, one-command verify, social/video/form checklist, and manual submission boundary.'],
];

const aiWorkbenchRecordingPacket = [
  ['Selected client only', 'Open one company context and show that Agnes receives a bounded packet instead of the full practice database.'],
  ['Role-scoped evidence', 'The Workbench summarizes only visible jobs, logs, rules, owners, recipients, and unresolved risks for the logged-in staff role.'],
  ['Human-reviewed output', 'Use Agnes for executive brief, risk summary, and client wording; a staff owner still approves every reminder and external message.'],
  ['No-secret bridge', 'The live smoke checks `/api/ai-brief` through the Worker and verifies the response does not expose Agnes secret names or API-key-shaped values.'],
  ['Deterministic authority', 'Client records, rules, scheduled jobs, and proof rows remain the source of truth; AI cannot change legal/compliance status by itself.'],
  ['Competitor trap avoided', 'Market scans show CoSec suites already advertise AI assistants, so the winning angle is governed AI over reviewer-safe proof, not another chatbot.'],
];

const humanHandoffReceipt = [
  ['AI drafts only', 'Agnes can summarize the selected client, risks, and suggested wording, but cannot mark compliance complete or send client messages.'],
  ['Staff approval gate', 'The recording should show a human owner choosing the rule/job path before any reminder becomes scheduled work.'],
  ['Deterministic schedule', 'Working-day recurrence and department scoping decide the queue; AI text is advisory context around that audited workflow.'],
  ['Proof retained', 'The handoff ends in reviewer-safe evidence fields — owner, recipient, cadence, snapshot, provider/message ID field, and unresolved risk.'],
];

const operationalCorrelationReceipt = [
  ['Source record', 'The client record, statutory rule, staff owner, and scheduled job ID stay connected so the proof row is traceable back to the original business reason.'],
  ['Packet correlation', 'Each retained send log derives a reviewer-safe `proof-...` packet ID and chain head; judges can match the app row to verifier output without exposing secrets.'],
  ['Duplicate-safe narrative', 'If the same client chase is revisited, Credence should update/retain the evidence trail instead of pretending every repeat reminder is a fresh untracked action.'],
  ['Approval-gated action', 'AI briefs and message drafts sit beside READY_FOR_REVIEW / no-send gates; external mutation stays behind human approval.'],
  ['Fallback receipt', 'Live Agnes or network stalls have a bounded fallback: saved smoke receipt plus npm run build && npm run verify, not an improvised unverifiable claim.'],
];

const closureApprovalCeremony = [
  ['Enforceable closure buckets', 'Every CorpSec item falls into source/status field, evidence requirement, metadata/timestamp/hash, or semantic AI advisory — so deterministic rules stay separate from Agnes wording.'],
  ['Deterministic status', 'The review outcome is BLOCK / NEEDS_REVIEW / READY_FOR_SIGNOFF before any item can be treated as closed.'],
  ['Licensed reviewer action', 'Reviewer identity, approve/decline/request-change decision, rationale, timestamp, and evidence viewed are captured as the closure ceremony.'],
  ['No-send safety', 'AI drafts the chase; deterministic authority/scope checks and licensed reviewer approval happen before any send/export/close action.'],
  ['Pitch line', 'Credence never lets AI become the company secretary of record; AI drafts and explains, licensed humans authorize closure.'],
];

const enterpriseTrustScorecard = [
  ['Minutes not weeks', 'Recent enterprise-agent winners lead with a painful manual workflow compressed into a measurable loop; Credence says one client chase becomes inspectable proof in under 60 seconds.'],
  ['Deterministic middle', 'AI can draft summaries, but department scoping, working-day recurrence, freshness status, and evidence retention are TypeScript rules verified by npm run verify.'],
  ['Audit-ready report', 'Each proof row exposes owner, recipient, timestamp, cadence state, provider/message ID field, Gmail print status, and retained snapshot without secrets.'],
  ['Governed AI', 'Agnes receives bounded role-scoped context through the Worker, cannot send externally, and the staff owner remains the approval authority.'],
  ['Ready to adopt', 'The live demo, Supabase schema, proof ledger, build ledger, and smoke script make the project look like an operational wedge a CorpSec team could pilot.'],
];

const authorityProvenanceReceipt = [
  ['Staff identity', 'The recording starts from a seeded staff login, so each chase is tied to an owner rather than an anonymous automation bot.'],
  ['Delegated authority', 'Department-scoped rules show why that staff role may act on this company, deadline, channel, and recipient.'],
  ['Intent alignment', 'The job preview and client-message snapshot prove the reminder matches the original compliance chase before it becomes evidence.'],
  ['Policy boundary', 'External sends, legal-status changes, social posts, and form submissions stay human-controlled; Agnes drafts and explains only.'],
  ['Proof provenance', 'Reviewer-safe packet IDs, provider/message fields, timestamps, freshness state, and retained snapshots make the action traceable after deactivation.'],
];

const offlineVerifierReceipt = [
  ['Hashable packet ID', 'Each proof packet gets a deterministic `proof-...` ID, so the same retained send-log evidence can be re-derived instead of trusted as a screenshot.'],
  ['Tamper-evident chain head', 'The Proof screen now links sorted reviewer-safe packets into a deterministic chain head; missing, reordered, or edited retained rows change the receipt without exposing secrets.'],
  ['Reviewer-safe fields', 'Exportable fields are limited to entity/rule, owner, recipient, cadence state, provider field, snapshot, and unresolved risk — not secrets or full mailboxes.'],
  ['Freshness recheck', 'Current / Expiring / Stale status can be recalculated from the evidence timestamp, giving judges a quick rerun path for the proof claim.'],
  ['Blocked-action receipt', 'The packet makes non-actions visible too: no external send, no legal-status mutation, no form/social posting, and staff review remains the approval boundary.'],
];

const auditorChallengeReceipt = [
  ['Auditor asks “prove it”', 'Start from one Send Logs / Evidence row and open the matching Proof packet instead of relying on narration or screenshots.'],
  ['Re-derive the receipt', 'Point to the deterministic packet ID plus chain head; if a retained proof row is missing or edited, the verifier changes the receipt.'],
  ['Open only safe fields', 'Show entity/rule, owner/recipient, cadence, provider field, snapshot, and unresolved risk while keeping secrets and raw mailboxes out.'],
  ['Show a blocked boundary', 'Say the same packet records what Credence did not do: no external send, no legal-status mutation, and no organizer/social submission.'],
  ['Fallback command', 'If challenged after the video, rerun npm run build && npm run verify to prove the packet IDs, chain stability, missing-row detection, and docs surface.'],
];

const receiptTruthBoundary = [
  ['What it proves', 'Packet ID and chain head prove attribution/order/integrity over reviewer-safe retained fields: who owned the chase, who received it, what snapshot was retained, and whether the row changed.'],
  ['What it does not prove', 'A valid receipt alone does not prove the reminder was legally sufficient, the policy was perfect, or the client actually complied. Credence keeps that boundary explicit.'],
  ['Correctness controls', 'Deterministic rules, department scoping, staff approval gates, evidence freshness, and npm run build && npm run verify sit beside the receipt so judges see more than a signed log.'],
  ['Recording line', 'Say: “the receipt makes the audit trail honest; the verified rule engine and human approval make the workflow defensible.”'],
];

const disclosureBoundaryReceipt = [
  ['Public receipt', 'Show packet ID, chain head, company/rule label, freshness state, owner role, and blocked-action status as the shareable proof layer.'],
  ['Reviewer-gated detail', 'Reveal only selected message snapshot, recipient/channel, provider field, unresolved-risk note, and acceptance evidence when a judge or auditor needs the operational context.'],
  ['Never exported', 'API keys, secret names, full Gmail/WhatsApp inboxes, raw private client documents, and real send controls stay outside the export and recording path.'],
  ['Operator-controlled disclosure', 'Staff choose the safe packet view first, then escalate to detail view intentionally; the agent cannot widen disclosure by itself.'],
];

const protocolReadyReceipt = [
  ['Action type', 'Name the proof row as a CorpSec chase action — staff owner, rule, company, recipient, and scheduled cadence — so another system can understand what happened.'],
  ['Policy decision', 'Keep the allow / review / blocked boundary explicit: fixture-safe sends are retained as evidence, while real sends and legal-status changes require staff approval.'],
  ['Hashed attachments', 'Provider IDs, Gmail print status, snapshots, and acceptance notes can be referenced by hash or safe field without exporting raw inboxes or secrets.'],
  ['Protocol bridge', 'Future pilots can map the packet to MCP/AP2/filing-system artifacts, but the hackathon demo stays honest with local deterministic receipts and no external mutation.'],
];

const pilotHandoffReceipt = [
  ['Live pilot URL', 'The Cloudflare Worker URL plus seeded staff credentials give judges a working entrypoint without needing Abel to create accounts on stage.'],
  ['One-command proof', 'npm run build && npm run verify is the repeatable adoption check for rules, scoping, deactivation, proof packets, docs, and submission surfaces.'],
  ['Data contract ready', 'Supabase schema, TypeScript types, fixture companies, and seed users show what a CLPC-style pilot would wire to real records next.'],
  ['Operator-safe boundaries', 'No external sends, social posts, form submissions, or legal-status mutations happen automatically; staff approval and proof receipts stay visible.'],
  ['Reusable workflow', 'Spec.md, Qoder prompts, build ledger, proof ledger, smoke script, and final pack turn the hackathon build into a repeatable implementation recipe.'],
];

const demoScenes = [
  'Open polished staff login; call out Supabase-seeded credentials and CLPC database connection.',
  'Login as admin; show dashboard stats, active clients, scheduled jobs, and proof logs.',
  'Switch to Client Database; open a company profile and show departments/contacts.',
  'Create or show a predefined compliance rule; explain client database is the source of truth, not invoices.',
  'Create a New Send Job with working-day recurrence and editable body preview.',
  'Show Send Logs / Evidence: provider IDs, sender/recipient, message snapshot, Gmail print-document status.',
  'Open Qoder Build Ledger: explain spec-driven Qoder workflow, CLI build, verification, Qoder Security checkpoint, and reusable artifacts.',
];

const socialDraft = `I built Credence for the Alibaba Cloud x Qoder Hackathon Singapore 2026 — a Malaysia-first corporate-secretarial compliance workflow platform for firms like CLPC.\n\nThe app turns client company records into department-scoped reminder jobs, scheduled queues, and defensible evidence logs: who reminded whom, when, under which rule, with what proof, and what remains at risk.\n\nQoder was central to the build: I used a clear spec, Qoder CLI/agentic workflow, verification loops, and a security-review checkpoint to upgrade the app into a Supabase-backed React/Tailwind platform with staff credentials, client profiles, scheduled jobs, and proof records.\n\n@QoderOfficial @AlibabaCloud #QoderHackathon #BuildWithQoder`;

export function SubmissionPackScreen() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Submission Pack</h2>
          <p className="text-sm text-brand-muted">Organizer requirements mapped directly to Credence artifacts</p>
        </div>
        <Badge variant="warning">Deadline: Aug 5</Badge>
      </div>

      <Card className="border-crimson-500/30 bg-crimson-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> 10-second winning demo spine</CardTitle>
          <CardDescription>Competitor/winner calibration: enterprise AI winners are deployment-ready, auditable, and deterministic in the middle, so the first screen should narrate this exact loop.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {tenSecondDemoSpine.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-crimson-500/20 bg-black/20 p-4">
              <div className="font-semibold text-crimson-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> Judging rubric coverage</CardTitle>
            <CardDescription>From the organizer master deck</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rubric.map(([name, weight, coverage]) => (
              <div key={name} className="grid gap-3 rounded-xl border border-brand-border bg-brand-surface/40 p-3 sm:grid-cols-[5rem_12rem_1fr]">
                <div className="text-xl font-semibold text-crimson-400">{weight}</div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-brand-muted">{coverage}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays size={18} className="text-crimson-500" /> Key dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-3"><div className="font-semibold">Jul 22</div><div className="text-brand-muted">Onsite hackathon day</div></div>
            <div className="rounded-xl border border-crimson-800/50 bg-crimson-950/30 p-3"><div className="font-semibold text-crimson-300">Aug 5</div><div className="text-crimson-100/75">UGC + submission links due</div></div>
            <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-3"><div className="font-semibold">Aug 8</div><div className="text-brand-muted">Winners announced</div></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-500/30 bg-emerald-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Final readiness receipt</CardTitle>
          <CardDescription>Use this as the first 10-second confidence panel before recording/submitting: live app, governed AI, local proof, and manual boundaries are all green.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {finalReadinessReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-black/20 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-sky-500/30 bg-sky-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-sky-400" /> Reviewer approval ceremony</CardTitle>
          <CardDescription>Fresh enterprise-compliance calibration: show the authority boundary as product behavior, not buried legal copy.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {closureApprovalCeremony.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-sky-500/20 bg-black/20 p-4">
              <div className="font-semibold text-sky-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Qoder workflow receipt</CardTitle>
          <CardDescription>Judge-visible evidence for the highest-weighted 30% criterion</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {qoderWorkflowReceipts.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Qoder Experts Mode replay receipt</CardTitle>
          <CardDescription>Docs-backed Qoder centrality: make the agentic build workflow inspectable without overclaiming private canvas traces</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {qoderExpertsReplayReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Qoder mode-choice receipt</CardTitle>
          <CardDescription>Fresh Qoder docs calibration: prove why Expert/Quest delegation was intentional, human-reviewed, and replayable</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {qoderModeChoiceReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Qoder memory kit receipt</CardTitle>
          <CardDescription>Latest Qoder CLI memory calibration: committed AGENTS.md and .qoder/rules make the proof workflow reusable by future Qoder sessions</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {qoderMemoryKitReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Official brief compliance receipt</CardTitle>
          <CardDescription>Source-backed guardrails from the Qoder SG public brief so the final recording stays rule-clean</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {organizerSourceReceipts.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> 60-second judge live check</CardTitle>
          <CardDescription>Demo reliability receipt: prove the live app, login, safe AI path, and verification command before polishing the video</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {judgeLiveCheck.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Live Worker smoke receipt</CardTitle>
          <CardDescription>Current deploy reliability proof for the recorded demo path</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {liveSmokeReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Film size={18} className="text-crimson-500" /> 2–3 minute cutdown path</CardTitle>
          <CardDescription>Submission conversion fix: stay inside the organizer video window while preserving the 10-second proof loop</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {videoCutdownPath.map(([time, detail]) => (
            <div key={time} className="rounded-xl border border-crimson-500/20 bg-crimson-950/10 p-4">
              <div className="font-mono text-sm font-semibold text-crimson-200">{time}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> AI Workbench recording packet</CardTitle>
          <CardDescription>Product-AI proof: governed Agnes assistance over bounded CorpSec evidence, not a generic chatbot</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {aiWorkbenchRecordingPacket.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> AI-to-staff handoff receipt</CardTitle>
          <CardDescription>Competitor response: AI-guided CorpSec products are common, so Credence makes the approval handoff and retained proof visible</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {humanHandoffReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-sky-400" /> Operational correlation receipt</CardTitle>
          <CardDescription>Fresh winner calibration: business agents win when every AI/workflow output ties back to records, approval gates, correlation IDs, and audit-safe fallbacks.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {operationalCorrelationReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-sky-500/20 bg-sky-950/10 p-4">
              <div className="font-semibold text-sky-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> Enterprise trust scorecard</CardTitle>
          <CardDescription>Compact winner calibration: enterprise-agent winners show measurable workflow compression, deterministic control, audit-ready receipts, and governed AI</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {enterpriseTrustScorecard.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-crimson-500/20 bg-crimson-950/10 p-4">
              <div className="font-semibold text-crimson-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Authority and provenance receipt</CardTitle>
          <CardDescription>Winner-calibration response: trust-layer agent winners prove who acted, under what authority, with which policy boundary, and what evidence survived</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {authorityProvenanceReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Offline verifier receipt</CardTitle>
          <CardDescription>Current winner calibration: agent proof layers win when receipts can be re-derived and inspected, not merely screenshot-trusted</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {offlineVerifierReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Auditor challenge drill</CardTitle>
          <CardDescription>Recording fallback for skeptical judges: convert one proof row into a re-runnable, reviewer-safe evidence challenge</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {auditorChallengeReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Receipt truth boundary</CardTitle>
          <CardDescription>Proof-layer calibration: receipts are powerful because they are honest about what they prove and what still needs deterministic controls</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {receiptTruthBoundary.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Public/private disclosure boundary</CardTitle>
          <CardDescription>Agent-receipt calibration: prove the workflow without leaking private client data, raw mailboxes, or secrets</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {disclosureBoundaryReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Protocol-ready receipt bridge</CardTitle>
          <CardDescription>Agent-receipt protocol calibration: make each CorpSec chase portable without overclaiming external integrations or leaking client payloads</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {protocolReadyReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Pilot handoff receipt</CardTitle>
          <CardDescription>Winner calibration response: enterprise-agent projects score when they are ready to deploy, reuse, and pilot — not only impressive in a video</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {pilotHandoffReceipt.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="font-semibold text-emerald-100">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Send size={18} className="text-crimson-500" /> Required submission items</CardTitle>
          <CardDescription>Submission conversion blocker reducer — keep external posting/submission manual</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {requirements.map(([item, status, detail]) => (
            <div key={item} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-3"><div className="font-medium">{item}</div><Badge variant="success">{status}</Badge></div>
              <p className="text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Paste-ready organizer form values</CardTitle>
          <CardDescription>Submission conversion blocker reducer — keep external posting/submission manual</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-2">
          {formValues.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-brand-muted">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-text">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Organizer form submission gate</CardTitle>
          <CardDescription>Deadline blocker reducer from the latest public Qoder/Luma scan: public social proof + form link must be ready before polish</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {organizerFormGate.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Recording credential ladder</CardTitle>
          <CardDescription>Use these only for the video/live demo; start with Admin and switch roles only if it strengthens the multi-department story</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-5">
          {recordingCredentials.map(([role, credential, detail]) => (
            <div key={role} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-brand-muted">{role}</div>
              <div className="mt-2 font-mono text-sm font-semibold text-crimson-200">{credential}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> Competitor calibration</CardTitle>
          <CardDescription>Why this entry is positioned beyond a standard reminder calendar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-3">
          {marketFindings.map((finding) => (
            <div key={finding.source} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <a href={finding.url} className="text-sm font-semibold text-crimson-300 underline-offset-4 hover:underline" target="_blank" rel="noreferrer">{finding.source}</a>
              <p className="mt-2 text-sm text-brand-muted">{finding.signal}</p>
              <p className="mt-3 text-sm text-brand-text"><span className="font-medium">Credence angle:</span> {finding.credenceAngle}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Evidence freshness / reviewer-safe export</CardTitle>
          <CardDescription>Judge-visible proof surface for “reminders that become defensible evidence”</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {evidenceFreshness.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> Reviewer-safe export packet</CardTitle>
          <CardDescription>Competitor scan response: broad CoSec suites advertise reminders, portals, AI, and audit trails, so Credence makes the actual evidence packet inspectable in 10 seconds</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {reviewerExportPacket.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> MBRS Maker/Lodger control loop</CardTitle>
          <CardDescription>Market-backed operational proof that Credence solves a real company-secretary deadline workflow, not just a calendar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {mbrsControlLoop.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-emerald-500" /> MBRS readiness packet</CardTitle>
          <CardDescription>Competitor scan response: validation/export tools are downstream; Credence proves the upstream client-chase evidence is ready for the lodger</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {mbrsReadinessPacket.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Film size={18} className="text-crimson-500" /> 2–3 minute video structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {demoScenes.map((scene, idx) => (
                <li key={scene} className="flex gap-3 text-sm text-brand-text"><span className="text-crimson-400">{idx + 1}</span><span>{scene}</span></li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Megaphone size={18} className="text-crimson-500" /> Social post draft</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-xl border border-brand-border bg-brand-surface/50 p-4 text-sm leading-6 text-brand-text">{socialDraft}</pre>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Final link checklist</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-brand-text sm:grid-cols-2">
          <ChecklistItem>public social post URL</ChecklistItem>
          <ChecklistItem>2–3 minute video link</ChecklistItem>
          <ChecklistItem>repository or deploy URL if form allows</ChecklistItem>
          <ChecklistItem>screenshots attached to post for engagement</ChecklistItem>
        </CardContent>
      </Card>
    </div>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface/40 p-3"><CheckCircle2 size={16} className="text-emerald-500" /> {children}</div>;
}

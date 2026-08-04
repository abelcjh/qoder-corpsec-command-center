# Proof Ledger — CorpSec Command Center

Maps hackathon claims to verifiable artifacts in the repository.

---

## Claim 1: Working MVP Web Application

| Artifact | Path | Evidence |
|----------|------|----------|
| Package manifest | `package.json` | Defines dev/build/test scripts and all dependencies |
| Vite config | `vite.config.ts` | Configures Vite with React plugin, server port 5173 |
| TypeScript config | `tsconfig.json` | Strict mode, JSX support, React bundler resolution |
| Entry HTML | `index.html` | Root HTML with Vite module script |
| React entry | `src/main.tsx` | ReactDOM.createRoot with StrictMode |
| Main app | `src/App.tsx` | Full application with state management |
| App styles | `src/App.css` | Complete dark/cream/crimson theme |
| Global styles | `src/index.css` | CSS custom properties, scrollbar, reset |

**Verification**: `npm install && npm run build` completes without errors.

---

## Claim 2: Malaysian Sdn Bhd Fixture with 12 Compliance Tasks

| Artifact | Path | Evidence |
|----------|------|----------|
| Company fixture | `src/data/company.ts` | Nusantara Digital Sdn Bhd with SSM reg no, directors, secretary |
| Compliance events | `src/data/complianceEvents.ts` | 12 tasks covering CA2016 Sections 68, 258, 340, 251, 48, 50, 56, 235 + tax/SST/EPF/SOCSO/PCB |
| Audit ledger fixture | `src/data/auditLedger.ts` | 6+ pre-populated ledger entries |
| Review summary fixture | `src/data/reviewSummary.ts` | Secretary findings with approval status |

**Verification**: `node scripts/verify.mjs` asserts task count >= 8 and all required fields present.

---

## Claim 3: Interactive Task Status and Evidence Updates

| Artifact | Path | Evidence |
|----------|------|----------|
| Task detail component | `src/components/TaskDetail.tsx` | Status buttons (pending/in_progress/completed/overdue) with click handlers |
| Evidence form | `src/components/TaskDetail.tsx` | Textarea + artifact input + Attach button |
| State management | `src/App.tsx` | `updateTaskStatus` and `addEvidence` callbacks updating state and ledger |

**Verification**: Run `npm run dev`, select a task, click status buttons, add evidence notes — UI updates visibly.

---

## Claim 4: Audit Ledger Mapping Claims to Artifacts

| Artifact | Path | Evidence |
|----------|------|----------|
| Audit ledger component | `src/components/AuditLedger.tsx` | Tabular display of all ledger entries sorted by timestamp |
| Ledger state | `src/App.tsx` | `addLedgerEntry` function appends entries on status changes and evidence additions |
| Initial ledger data | `src/data/auditLedger.ts` | Pre-populated with 6 historical entries |

**Verification**: Every status change and evidence addition generates a new timestamped ledger row in the UI.

---

## Claim 5: AI-Assisted Drafts (Clearly Marked)

| Artifact | Path | Evidence |
|----------|------|----------|
| AI draft rendering | `src/components/TaskDetail.tsx` | `ai-section` with "AI-Generated — Review Required" badge |
| Draft data | `src/data/complianceEvents.ts` | 5 tasks have `aiDraft` field with contextual summaries |
| Visual distinction | `src/App.css` | Amber left-border, warning badge, distinct background |

---

## Claim 6: Human Secretary Review Panel

| Artifact | Path | Evidence |
|----------|------|----------|
| Review component | `src/components/ReviewPanel.tsx` | Displays reviewer, findings, approval status, notes |
| Review data | `src/data/reviewSummary.ts` | 6 findings, pending approval status |
| Disclaimer | `src/components/ReviewPanel.tsx` | "Operational workflow assistance only — not legal advice" |

---

## Claim 7: Professional Dark/Cream/Crimson Theme

| Artifact | Path | Evidence |
|----------|------|----------|
| CSS variables | `src/index.css` | `--bg-dark: #1a1a2e`, `--cream: #FFF8F0`, `--crimson: #DC2626` |
| Full styles | `src/App.css` | 500+ lines of themed CSS covering all components |
| Status colors | `src/App.css` | Green, blue, amber, red status indicators |
| Category badges | `src/App.css` | Color-coded badges for statutory/governance/audit/tax/filing |

---

## Claim 8: Qoder Build Artifacts (30% of judging)

| Artifact | Path | Evidence |
|----------|------|----------|
| Build ledger | `QODER_BUILD_LEDGER.md` | Documents Qoder's role in the build process |
| This proof ledger | `PROOF_LEDGER.md` | Claims-to-artifacts mapping (this document) |
| Demo script | `DEMO_SCRIPT.md` | Step-by-step demo walkthrough |
| Submission checklist | `SUBMISSION_CHECKLIST.md` | Hackathon checklist with Qoder items |
| Verification script | `scripts/verify.mjs` | Automated fixture and doc verification |

---

## Claim 9: Deterministic Rules in Source (Not Screenshots)

| Artifact | Path | Evidence |
|----------|------|----------|
| Company data | `src/data/company.ts` | Typed Company object with SSM fields |
| Compliance data | `src/data/complianceEvents.ts` | 12 typed ComplianceTask objects with statutory references |
| Type definitions | `src/types.ts` | Full TypeScript interfaces for all data models |
| Verification | `scripts/verify.mjs` | Programmatic checks on source data |

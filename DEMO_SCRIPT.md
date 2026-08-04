# Demo Script — CorpSec Command Center

Step-by-step walkthrough for the hackathon demo presentation.

---

## Pre-Demo Setup

```bash
cd qoder-corpsec-command-center
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

---

## Scene 1: The Problem (30 seconds)

> "Malaysian SMEs face 12+ annual compliance obligations under the Companies Act 2016 — SSM filings, AGMs, tax returns, statutory register updates. Missing a deadline means compound penalties. Company secretaries manage this across dozens of clients using spreadsheets and email."

**Show**: The app header and company profile panel.

---

## Scene 2: Company Profile (30 seconds)

> "CorpSec Command Center starts with a real Sdn Bhd entity — Nusantara Digital Sdn Bhd, registered with SSM, two directors, a qualified company secretary. All data is deterministic and sourced from Malaysian statutory requirements."

**Show**: Point to registration number, directors, secretary, FY end date.

---

## Scene 3: Compliance Progress (30 seconds)

> "At a glance, the secretary sees compliance progress — 33% complete with 4 tasks done, 3 in progress, 5 pending, zero overdue. The progress bar and status counts update in real time."

**Show**: Stats bar with progress percentage and status counts.

---

## Scene 4: Task Timeline (30 seconds)

> "The timeline shows all 12 annual compliance tasks sorted by due date. Each task has a status icon, category badge, due date, and evidence count. Click any task to see details."

**Show**: Scroll through the task timeline. Click on "Annual Return (Section 68)".

---

## Scene 5: Task Detail — Completed Task (45 seconds)

> "This task is completed. It has the SSM statutory reference (Section 68, Companies Act 2016), the owner (Lee Wei Ming), and the due date. Below, there's evidence — an annual return was submitted via MyCoID with acknowledgement reference."

**Show**: Task detail with status pill, meta grid, and evidence entry.

> "Notice the AI Draft Summary section — it's clearly marked 'AI-Generated, Review Required' with a distinct amber border. It provides contextual information about the return preparation."

**Show**: AI draft section with badge and content.

---

## Scene 6: Interactive Status Update (45 seconds)

> "Let me show the interactive part. I'll select a pending task — Corporate Tax Filing — and change its status to 'In Progress'."

**Show**: Click on "Corporate Tax Filing (Form C)" in the timeline. Click the "In Progress" status button.

> "The status pill updates immediately. And if we check the Audit Ledger at the bottom..."

**Show**: Scroll to audit ledger. Point to the new "STATUS_CHANGED" entry at the top.

> "A new ledger entry was created automatically with timestamp, actor, action type, and detail. This creates an immutable audit trail."

---

## Scene 7: Evidence Entry (45 seconds)

> "Now let's add evidence. I'll write a note about the tax computation and reference the artifact."

**Show**: In the task detail, type in the evidence textarea: "Tax computation finalized. Chargeable income RM 365K verified against audited FS." Type artifact reference: "tax_computation_fy2025.xlsx". Click "Attach".

> "The evidence appears immediately in the list, and the audit ledger shows a new EVIDENCE_ADDED entry. Every action is traceable."

**Show**: New evidence item in list and new ledger entry.

---

## Scene 8: Audit Ledger (30 seconds)

> "The audit ledger is the backbone of compliance proof. It shows every status change, evidence addition, and system event with timestamps. Color-coded action tags make it scannable. This is what auditors and regulators need to see."

**Show**: Scroll through the full audit ledger, pointing out different action types.

---

## Scene 9: Human Secretary Review (30 seconds)

> "Finally, the Human Secretary Review panel. The company secretary reviews all compliance work and documents findings. Here we see 6 findings, a pending approval status, and notes prioritizing the FS sign-off and tax filing."

**Show**: Review panel with findings and notes.

> "The disclaimer at the bottom is important — this system provides operational workflow assistance only. It does not give legal advice. The qualified professional always has final approval."

---

## Scene 10: Architecture & Qoder (30 seconds)

> "The entire app was built with Qoder in a single session. React + TypeScript + Vite, no external APIs, all data deterministic. Qoder generated the full project structure, 6 React components, 4 data fixtures, 500+ lines of CSS, and a verification script."

**Show**: Point to QODER_BUILD_LEDGER.md or mention the build process.

> "The verification script confirms all 12 tasks have required fields, all components exist, and all documentation is present."

---

## Closing (15 seconds)

> "CorpSec Command Center: deterministic compliance workflows for Malaysian SMEs, with AI assistance clearly marked, human review always required, and a full audit trail. Thank you."

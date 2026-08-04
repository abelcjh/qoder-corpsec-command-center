# CorpSec Command Center

**AI-assisted compliance workflow cockpit for Malaysia-first SMEs and corporate-secretarial providers.**

Built for the **Alibaba Cloud x Qoder Hackathon Singapore 2026**.

---

## Overview

CorpSec Command Center is a deterministic compliance workflow tool that helps Malaysian Sdn Bhd companies and their company secretaries manage annual compliance obligations under the Companies Act 2016. It provides:

- **Company Profile** — SSM-registered entity details, directors, secretary
- **Task Timeline** — 12 annual compliance tasks with due dates and statutory references
- **Evidence Binder** — Attach notes and artifact references to each task
- **Audit Ledger** — Immutable log of all status changes and evidence additions
- **AI Draft Summaries** — Clearly-marked AI-generated context (review required)
- **Human Review Panel** — Company secretary findings and approval workflow

This system provides **operational workflow assistance only** — it does not constitute legal advice. A qualified company secretary or professional must review and approve all compliance actions.

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. No external APIs or credentials required.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run verification script |
| `npm run verify` | Same as test — checks fixtures and docs |

## Tech Stack

- **Vite** — Build tooling
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Lucide React** — Icon library

## Project Structure

```
src/
  components/       UI components (CompanyProfile, TaskTimeline, TaskDetail, etc.)
  data/             Deterministic fixtures (company, compliance events, audit ledger)
  types.ts          Shared TypeScript types
  App.tsx           Main application with state management
  App.css           Application styles (dark/cream/crimson theme)
  main.tsx          Entry point
  index.css         Global styles and CSS custom properties
scripts/
  verify.mjs        Fixture and documentation verification script
docs/
  README.md         This file
  Spec.md           Technical specification
  PROOF_LEDGER.md   Claims-to-artifacts mapping
  QODER_BUILD_LEDGER.md  Build process documentation
  DEMO_SCRIPT.md    Demo walkthrough
  SUBMISSION_CHECKLIST.md  Hackathon submission checklist
```

## Compliance Coverage

The fixture covers 12 annual compliance tasks for a Malaysian Sdn Bhd:

1. Annual Return (Section 68)
2. Audited Financial Statements (Section 258)
3. Annual General Meeting (Section 340)
4. Corporate Tax Filing (Form C)
5. Directors' Report (Section 251)
6. Register of Directors Update (Section 48)
7. Register of Members Update (Section 50)
8. Beneficial Ownership Declaration (Section 56)
9. SST Compliance Review
10. EPF & SOCSO Compliance Audit
11. PCB (MTD) Monthly Submission Review
12. Company Secretary Appointment Verification (Section 235)

## License

MIT

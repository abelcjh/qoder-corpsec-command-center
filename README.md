# Credence — CorpSec Command Center

**AI-assisted compliance workflow cockpit for Malaysia-first SMEs and corporate-secretarial providers.**

Built for the **Alibaba Cloud x Qoder Hackathon Singapore 2026**.

---

## Overview

Credence / CorpSec Command Center is a compliance reminder and workflow platform for corporate secretarial practices such as CLPC. It puts the **client database at the center** (not invoices), gives each department its own scoped view, and turns statutory deadlines into scheduled reminder jobs with auditable proof.

Core capabilities:

- **Staff Login & Department Scoping** — Admin, Tax, Audit, Corp Sec, Accounting roles; each sees only relevant clients, rules, jobs, and logs.
- **Client Database** — Company master records with department tags, contacts, and company-secretary details.
- **Rules Library** — Predefined reminder templates by department (Annual Return, Tax CP204/Form C, Audit FS, etc.).
- **New Send Job** — Choose company, apply a rule or write a custom body, preview working-day recurrence, and schedule.
- **Scheduled Queue** — Recurring reminder jobs with working-day recurrence until a stop date.
- **Send Logs / Evidence** — Timestamped database proof records with provider/message IDs, Gmail print-document fields, sender/recipient metadata, and message snapshots.
- **Qoder Build Ledger** — Live view of the artifacts and capabilities Qoder delivered.
- **Supabase Cloud Wired** — Staff credentials, client profiles, scheduled jobs, and proof logs load from the CLPC Supabase project via `.env.local`.

This system provides **operational workflow assistance only** — it does not constitute legal advice. A qualified company secretary or professional must review and approve all compliance actions.

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. The current CLPC build requires `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` so the seeded staff credentials and client rows come from Supabase.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run verification script (reminder engine, scoping, deactivation, fixtures) |
| `npm run verify` | Same as test |

## Tech Stack

- **Vite** — Build tooling
- **React 18** — UI framework
- **TypeScript** — Type safety (strict mode)
- **Tailwind CSS** — Utility-first styling
- **Supabase** — `@supabase/supabase-js` client adapter + SQL schema
- **Lucide React** — Icon library

## Project Structure

```
src/
  components/
    ui/             shadcn-inspired reusable components
    screens/        Login, Dashboard, Clients, Rules, Queue, Logs, Proof, Build Ledger, Submission Pack
  data/             Demo fixtures and seed data
  lib/
    supabase.ts     Supabase client configured through Vite env vars
    store.ts        Supabase-backed app state, staff auth, and actions
    reminderEngine.ts  Working-day recurrence + proof-record construction
    scoping.ts      Department-scoped filtering
    reducers.ts     Pure state reducers (e.g. deactivation)
    utils.ts        cn(), ID/date helpers
  types.ts          Shared TypeScript types
  App.tsx           Root application with navigation
  index.css         Tailwind directives + design tokens
supabase/
  schema.sql        Full PostgreSQL schema with RLS notes
scripts/
  verify.mts        Automated verification harness
docs/
  README.md
  Spec.md
  PROOF_LEDGER.md
  QODER_BUILD_LEDGER.md
  DEMO_SCRIPT.md
  SUBMISSION_CHECKLIST.md
```

## Supabase Configuration

This repo is wired to the CLPC Supabase cloud project through `.env.local` on Abel's PC. To use another project:

```bash
cp .env.example .env
# Add your project credentials:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then run `supabase/schema.sql` in the Supabase SQL Editor.

## Compliance Coverage

Predefined reminder rules cover:

1. Annual Return (Section 68, CA2016)
2. Corporate Tax Filing (CP204 / Form C, ITA1967)
3. Audited Financial Statements (Section 258, CA2016)
4. AGM Notice (Section 340, CA2016)
5. Monthly Management Accounts (Accounting)

## License

MIT

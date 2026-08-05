# Qoder Build Ledger — Credence / CorpSec Command Center

Documents how Qoder was used to build the upgraded full-stack prototype for hackathon judging (Qoder usage = 30% of score).

---

## Build Session Summary

**Date**: 2026-08-05
**Agent**: Qoder (autonomous coding assistant)
**Repository**: qoder-corpsec-command-center
**Product**: Credence — Malaysia-first corporate-secretarial compliance reminder/workflow platform

---

## Phase 1: Dependency & Configuration Upgrade

**Qoder Action**: Added Tailwind CSS, PostCSS, Supabase client, and tsx; updated Vite environment types.

Files generated/updated:
- `package.json` — Added `@supabase/supabase-js`, `tailwindcss`, `autoprefixer`, `postcss`, `clsx`, `tailwind-merge`, `tsx`
- `tailwind.config.js` — Custom ink/cream/crimson design tokens and animations
- `postcss.config.js` — Tailwind + autoprefixer pipeline
- `src/index.css` — Tailwind directives + component utility classes
- `src/vite-env.d.ts` — `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` declarations

---

## Phase 2: Supabase Schema & Client Adapter

**Qoder Action**: Designed the production PostgreSQL schema and wired the app to the CLPC Supabase cloud project through `.env.local`.

Files generated:
- `supabase/schema.sql` — 8 tables (`staff_users`, `companies`, `company_contacts`, `compliance_rules`, `scheduled_send_jobs`, `send_logs`, `proof_documents`, `audit_events`), indexes, triggers, RLS notes
- `src/lib/supabase.ts` — Reads env vars; creates client only when configured
- `src/lib/database.types.ts` — Minimal typed Supabase database wrapper

---

## Phase 3: Domain Model & Seed Data

**Qoder Action**: Expanded the TypeScript data model to cover staff auth, companies, contacts, rules, jobs, logs, proofs, and audit events. Seeded 5 staff users, 3 companies, 4 contacts, 5 rules, 2 jobs, and sample send logs.

Files generated/updated:
- `src/types.ts` — Full domain types
- `src/data/seed.ts` — Fixture-backed seed records + helper functions
- `src/data/company.ts` — Updated to new `Company` shape

Key decisions:
- Companies carry `departments[]` so each department sees only its clients.
- Send logs carry `evidenceType`, provider IDs, Gmail print-document status, and message snapshots for proof handling.
- Audit events are immutable and actor-tagged.

---

## Phase 4: Reminder Engine

**Qoder Action**: Implemented a pure TypeScript reminder engine with working-day recurrence, cron simulation, and proof recording.

Files generated:
- `src/lib/reminderEngine.ts` — `createScheduledSendJob`, `buildScheduledSendJobRuns`, `simulateDueSends`, `simulateCronSend`, `recordSendProof`

Key decisions:
- Recurrence skips weekends (Mon–Fri only).
- Run generation respects `stopDate` and caps at 500 runs for safety.
- Cron simulator deduplicates against existing logs.
- Existing cloud proof rows are loaded from Supabase and rendered as database-backed evidence.

---

## Phase 5: UI Component Library

**Qoder Action**: Built a custom shadcn-inspired component library without installing the CLI.

Files generated:
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Textarea.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Dialog.tsx`
- `src/components/ui/Tabs.tsx`
- `src/components/ui/Select.tsx`
- `src/components/ui/Table.tsx`
- `src/components/ui/Label.tsx`

---

## Phase 6: App Screens & Auth Flow

**Qoder Action**: Replaced the single-page MVP with a multi-screen authenticated application.

Files generated:
- `src/components/screens/LoginScreen.tsx`
- `src/components/screens/Layout.tsx`
- `src/components/screens/DashboardScreen.tsx`
- `src/components/screens/ClientDatabaseScreen.tsx`
- `src/components/screens/RulesLibraryScreen.tsx`
- `src/components/screens/ScheduledQueueScreen.tsx`
- `src/components/screens/SendLogsScreen.tsx`
- `src/components/screens/ProofScreen.tsx`
- `src/components/screens/BuildLedgerScreen.tsx`
- `src/App.tsx` — Navigation, login gate, screen routing

Features implemented:
- Login changes department scope.
- Create company, rule, and job locally.
- Job preview shows first 10 working-day runs.
- Run due-check or record proof preview from selected jobs.
- Deactivate company stops future jobs while retaining logs.

---

## Phase 7: State Management, Scoping & Reducers

**Qoder Action**: Built a fixture-backed local state store with department scoping and pure reducers.

Files generated:
- `src/lib/store.ts` — `useAppStore` hook with actions and audit logging
- `src/lib/scoping.ts` — Pure department-scoped filtering helpers
- `src/lib/reducers.ts` — `deactivateCompanyReducer`, `reactivateCompanyReducer`

Key decisions:
- Pure reducer functions keep business logic testable.
- Scoping helpers are reused by the store and verify script.

---

## Phase 8: Verification & Documentation

**Qoder Action**: Replaced the simple fixture verifier with a TypeScript harness that tests the reminder engine, auth scoping, deactivation, and schema.

Files generated/updated:
- `scripts/verify.mts` — 47 assertions covering working days, run generation, simulation, scoping, deactivation, files, docs, and schema
- `package.json` — Test script uses `tsx scripts/verify.mts`
- `README.md`, `Spec.md`, `PROOF_LEDGER.md`, `QODER_BUILD_LEDGER.md`, `DEMO_SCRIPT.md`, `SUBMISSION_CHECKLIST.md`

---

## Phase 9: Build Verification

**Qoder Action**: Ran `npm install`, `npm run build`, and `npm test` repeatedly; fixed all TypeScript strict-mode errors until build and verify passed.

Final result:
- `npm run build` — passes
- `npm test` — 47 passed, 0 failed

---

## Qoder Capabilities Demonstrated

1. **Full-stack project upgrade** — Added Tailwind, Supabase, and tsx to an existing Vite + React project
2. **Domain modeling** — Relational data model for staff, clients, rules, jobs, logs, proofs
3. **Pure business logic** — Reminder engine and reducers independent of UI
4. **Component architecture** — shadcn-inspired design system + screen-level composition
5. **Auth & scoping** — Department-based access control
6. **Supabase integration** — Schema design and client adapter with graceful fallback
7. **Verification engineering** — Automated tests for engine, scoping, and state mutations
8. **Documentation** — README, spec, proof ledger, build ledger, demo script, checklist

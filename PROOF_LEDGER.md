# Proof Ledger — Credence / CorpSec Command Center

Claims-to-artifacts mapping for hackathon judging.

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

## Claim 6: Supabase-ready adapter with demo fallback

| Evidence | Location |
|----------|----------|
| Supabase schema with 8 tables and RLS notes | `supabase/schema.sql` |
| `supabase.ts` reads env vars, falls back when absent | `src/lib/supabase.ts` |
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

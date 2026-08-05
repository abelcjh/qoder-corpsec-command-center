# Technical Specification — Credence / CorpSec Command Center

## 1. Purpose

A full-stack prototype of a Malaysia-first corporate-secretarial compliance reminder and workflow platform. It gives staff a department-scoped client database, turns statutory deadlines into recurring scheduled reminder jobs, records simulated send evidence, and retains proof even when clients are deactivated.

## 2. Scope

### In Scope
- Staff login with role/department scoping
- Client database with company profile and contacts
- Department-specific views: audit, tax, accounting, corp sec
- Predefined compliance rules library
- New send job creation with rule/custom body and editable preview
- Working-day recurrence engine until stop date
- Scheduled queue and send logs / evidence
- Company deactivation that stops future jobs but retains logs
- Supabase-ready schema and client adapter with seeded demo fallback
- Modern React + Tailwind + shadcn-inspired UI
- Automated verification for engine, scoping, deactivation, fixtures

### Out of Scope
- Legal advice or automated legal reasoning
- Real email/WhatsApp/SMS transmission (simulated only)
- Production Supabase RLS policies (schema includes notes/templates)
- Actual document upload/file storage (artifact references only)

## 3. Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with custom design tokens (ink/cream/crimson)
- **Custom shadcn-inspired components** under `src/components/ui/`

### State Management
- Local React state via `useAppStore()` custom hook
- Pure reducer functions for complex mutations (deactivation)
- Department-scoped selectors in `src/lib/scoping.ts`

### Backend (ready via Supabase)
- Tables: `staff_users`, `companies`, `company_contacts`, `compliance_rules`, `scheduled_send_jobs`, `send_logs`, `proof_documents`, `audit_events`
- RLS enabled with policy notes; full policies to be added per-deployment
- Demo mode seeds data when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are absent

### Reminder Engine
- Pure TypeScript module `src/lib/reminderEngine.ts`
- `createScheduledSendJob(input)` — build a job record
- `buildScheduledSendJobRuns(job)` — generate working-day recurring runs until stop date
- `simulateDueSends(...)` — cron-style simulator with deduplication
- `recordSendProof(...)` — construct a send log entry

## 4. Data Model

### StaffUser
- id, email, fullName, department (admin|audit|tax|accounting|corp_sec), role, active

### Company
- id, name, registrationNo, incorporationDate, ssmState, sicCodes, registeredAddress, directors[], companySecretary, financialYearEnd, departments[], active

### CompanyContact
- id, companyId, name, email, phone, role, preferredChannel, isPrimary

### ComplianceRule
- id, name, department, defaultSubject, defaultBody, defaultEveryNWorkingDays, variables[], statutoryRef, active

### ScheduledSendJob
- id, companyId, contactId, ruleId, department, channel, subject, body, firstSendAt, everyNWorkingDays, stopDate, status, createdBy, createdAt

### SendLog
- id, jobId, companyId, contactId, scheduledRunAt, sentAt, senderStaffId, senderEmail, recipient, channel, status, messageSnapshot, providerMessageId, evidenceType, demoMarked, createdAt

### ProofDocument
- id, sendLogId, documentType, storagePath, metadata, uploadedBy, createdAt

### AuditEvent
- id, actorStaffId, actorEmail, action, entityType, entityId, detail, createdAt

## 5. User Flow

1. Staff logs in and lands on department-scoped dashboard.
2. Staff browses the client database and views company profiles.
3. Staff selects or creates a compliance rule.
4. Staff creates a new send job from a rule or custom body.
5. System previews first 10 working-day runs.
6. Job appears in scheduled queue; future runs are generated.
7. Staff simulates cron or a single job send.
8. Send logs / evidence update live and remain when a company is deactivated.

## 6. Theme

- **Background**: Deep charcoal (#0f0f12)
- **Cards**: Slightly lifted surface (#18181b)
- **Text**: Cream (#fff8f0)
- **Accent**: Crimson (#dc2626)
- **Status Colors**: Emerald (success), Sky (info), Amber (warning), Crimson (danger)

## 7. Security & Privacy

- Demo mode requires no credentials and makes no external network calls.
- Supabase mode uses environment variables; no secrets are committed.
- All simulated sends are marked as demo evidence.
- Deactivation retains logs for audit/evidence purposes.

## 8. Verification

`scripts/verify.mts` checks:
- Working-day math and run generation
- Simulated send construction and cron deduplication
- Department scoping for companies, rules, jobs, logs
- Company deactivation stops future jobs but retains logs
- Build output and required project files
- Documentation and schema completeness

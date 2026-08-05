You are Qoder on Abel's Arch PC. Continue the existing CorpSec Command Center / Credence hackathon repo. Build a much more complete full-stack-style product prototype now.

Context from Abel/Ariel sessions:
- Product is validated: Abel has an industry cofounder / partner context in corporate secretarial services (CL Pang / CLPC). The reminder workflow is real and should be the wedge; later corp sec OS grows from it.
- Product framing: Credence / CorpSec Command Center = Malaysia-first corporate-secretarial compliance reminder/workflow platform. Do not frame as MY/SG unless explicitly asked.
- Core CLPC lesson: client database is the source of truth, not invoices. Audit/tax may do work before invoice. Departments need separate views: audit, tax, accounting, corp sec.
- Required platform architecture: staff login -> department-scoped client database/company profile/contact/deadline records -> recurring reminder jobs -> scheduled send queue -> send logs/proof evidence -> deactivate removes future jobs but retains historical logs.
- New send job flow: choose company -> choose predefined rule or custom settings -> editable body preview -> first send date/time -> every N working days -> stop date -> channel -> job appears in scheduled queue.
- Proof logs: timestamp, recipient, sender, status, message snapshot, provider/message id placeholder, evidence type. In CLPC, authoritative proof is Gmail print document later; for this hackathon prototype use simulated proof records and mark as demo.
- Staff auth: proper login for each staff user with role/department access. Supabase-ready adapter; local/demo fallback if env vars absent.
- Use of Qoder is 30% of judging, so keep Qoder build artifacts updated.

Implementation requirements:
1. Upgrade UI to modern React + Tailwind + shadcn-style component system (cards, buttons, badges, inputs, dialogs/tabs). It can be custom shadcn-inspired components in src/components/ui if installing shadcn CLI is too slow.
2. Add Tailwind config, PostCSS, global design tokens. Use premium aesthetic: deep charcoal/black, cream cards, crimson accents, clear data-dense dashboard.
3. Add Supabase integration using @supabase/supabase-js:
   - src/lib/supabase.ts reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
   - If env vars absent, app runs in seeded demo mode.
   - Include supabase/schema.sql with tables for staff_users, companies, company_contacts, compliance_rules, scheduled_send_jobs, send_logs, proof_documents, audit_events plus RLS notes/policies comments.
4. Add staff login UI and state. Seed users: Admin (all departments), Tax Staff, Audit Staff, Corp Sec Staff, Accounting Staff. Department-scoped filtering after login.
5. Build app screens/tabs:
   - Login
   - Command Dashboard
   - Client Database
   - Company Profile drawer/section
   - Rules Library
   - New Send Job modal/form
   - Scheduled Queue
   - Send Logs / Evidence
   - Qoder Proof / Build Ledger
6. Implement reminder engine in pure TypeScript module:
   - createScheduledSendJob(input)
   - buildScheduledSendJobRuns(job) with working-day recurrence until stop date
   - simulateDueSends(now) or simulateCronSend(job/run)
   - recordSendProof(...)
7. Add interactivity:
   - login changes department scope
   - create a company locally
   - create a rule locally
   - create scheduled send job from rule or custom body
   - simulate cron send for due/selected job
   - logs update live
   - deactivate company stops/marks future jobs while logs remain
8. Add tests/verify script for reminder engine, auth scoping, company deactivate retaining logs, and fixture data.
9. Update README, Spec, QODER_BUILD_LEDGER, PROOF_LEDGER, DEMO_SCRIPT, SUBMISSION_CHECKLIST to reflect full platform and Supabase integration.
10. Run npm install/build/verify and fix errors.

Constraints:
- Keep all changes inside this repo.
- Do not open Abel's browser/windows.
- No real emails/WhatsApp sends. Use simulated sends only.
- Do not require real Supabase credentials to run.
- Working product demo over perfect backend.

Please implement now, fully. Commit only if build and verify pass.

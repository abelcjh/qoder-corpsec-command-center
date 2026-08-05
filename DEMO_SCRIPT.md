# Demo Script — Credence / CorpSec Command Center

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

> "Corporate secretarial firms like CLPC manage hundreds of client deadlines — annual returns, tax filings, audited financial statements, AGMs. Work often starts before an invoice is raised, so the client database, not the invoice, must be the source of truth. Different departments need different views."

**Show**: Login screen with 5 demo staff accounts.

---

## Scene 2: Login & Department Scoping (30 seconds)

> "Staff log in with department-scoped access. Let's log in as Corp Sec Staff."

**Do**: Select "Corp Sec Staff" and click "Enter Command Center".

> "The dashboard shows only the clients, rules, jobs, and logs relevant to corporate secretarial. Tax or Audit staff would see a different slice."

**Show**: Dashboard stats and department badge.

---

## Scene 3: Client Database (30 seconds)

> "The client database is the source of truth. Each company is tagged with the departments that serve it. Let's look at Nusantara Digital Sdn Bhd."

**Do**: Navigate to "Client Database", click the eye icon on Nusantara Digital.

**Show**: Company profile drawer with registration number, directors, secretary, FY end, and contacts.

---

## Scene 4: Rules Library (30 seconds)

> "Compliance rules are reusable reminder templates by department — Annual Return under Section 68, Tax CP204/Form C, Audit FS, AGM, and more."

**Do**: Navigate to "Rules Library".

**Show**: List of predefined rules with department badges, recurrence, and template variables.

---

## Scene 5: Create a New Send Job (60 seconds)

> "Now let's schedule a reminder. I'll create a new send job for Nusantara Digital's Annual Return."

**Do**: Navigate to "Scheduled Queue", click "New Send Job".

**Show**:
1. Select company: Nusantara Digital Sdn Bhd.
2. Select rule: Annual Return Reminder (Section 68).
3. Subject and body auto-populate from the rule template.
4. Set first send date/time and stop date.
5. Click "Refresh Preview" to see the first 10 working-day runs.

> "Notice the recurrence skips weekends — every run lands on a working day."

**Do**: Click "Schedule Job".

---

## Scene 6: Scheduled Queue (30 seconds)

> "The job now appears in the scheduled queue. From here we can simulate a single send or let the cron simulator run."

**Do**: Click "Simulate" on the newly created job.

**Show**: The send count increases and the job is still active for future runs.

---

## Scene 7: Send Logs / Evidence (45 seconds)

> "Every simulated send creates an immutable log entry: timestamp, recipient, sender, status, message snapshot, and a provider message ID placeholder."

**Do**: Navigate to "Send Logs", click on the latest log row.

**Show**: Detail modal with snapshot and DEMO badge.

> "In production, authoritative proof is a Gmail print-to-PDF or provider receipt. Here we simulate sends and mark them clearly as demo evidence."

---

## Scene 8: Simulate Cron Run (30 seconds)

> "The cron simulator processes all due runs at once."

**Do**: Click "Simulate Cron Run".

**Show**: New log entries appear for every run whose scheduled time has passed.

---

## Scene 9: Deactivate a Company (45 seconds)

> "What happens when a client engagement pauses? Deactivating the company stops future jobs but keeps the history."

**Do**: Navigate to "Client Database", click "Deactivate" on Ace Logistics Sdn Bhd.

**Show**: Company status changes to Inactive.

**Do**: Navigate to "Scheduled Queue" and "Send Logs".

> "Future jobs for Ace Logistics are now deactivated, but the existing send logs remain. This is exactly what CLPC needs: the client database is the source of truth, and evidence is retained."

---

## Scene 10: Switch Departments (30 seconds)

> "Let's prove department scoping. Log out and log in as Tax Staff."

**Do**: Log out, select "Tax Staff", enter.

**Show**: Tax staff sees only tax-tagged clients and tax rules. The dashboard stats update.

---

## Scene 11: Qoder Build Ledger (30 seconds)

> "Finally, the Qoder Build Ledger shows the artifacts Qoder delivered in this session: Supabase schema, reminder engine, UI library, auth scoping, verification harness, and documentation."

**Do**: Navigate to "Qoder Build".

**Show**: Build ledger cards and metrics.

---

## Closing (15 seconds)

> "Credence / CorpSec Command Center: a Malaysia-first compliance OS prototype with department-scoped client data, working-day reminder jobs, simulated send proof, and full audit retention — built with Qoder. Thank you."

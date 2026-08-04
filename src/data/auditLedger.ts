import type { AuditLedgerEntry } from '../types';

const now = new Date().toISOString();

export const initialLedger: AuditLedgerEntry[] = [
  { timestamp: '2026-01-15T09:00:00Z', actor: 'Lee Wei Ming', action: 'EVENT_CREATED', taskId: '', detail: 'Annual Compliance Cycle 2026 initialized with 12 tasks' },
  { timestamp: '2026-03-15T10:00:00Z', actor: 'Lee Wei Ming', action: 'TASK_COMPLETED', taskId: 'task-12', evidenceId: 'ev-12-1', detail: 'Company secretary appointment verified' },
  { timestamp: '2026-04-28T11:00:00Z', actor: 'Lee Wei Ming', action: 'TASK_COMPLETED', taskId: 'task-06', evidenceId: 'ev-06-1', detail: 'Directors register verified current' },
  { timestamp: '2026-04-28T11:30:00Z', actor: 'Lee Wei Ming', action: 'TASK_COMPLETED', taskId: 'task-07', evidenceId: 'ev-07-1', detail: 'Members register verified — no changes' },
  { timestamp: '2026-05-10T09:30:00Z', actor: 'Lee Wei Ming', action: 'TASK_COMPLETED', taskId: 'task-01', evidenceId: 'ev-01-1', detail: 'Annual return lodged via MyCoID' },
  { timestamp: '2026-07-15T14:00:00Z', actor: 'Lee Wei Ming', action: 'EVIDENCE_ADDED', taskId: 'task-02', evidenceId: 'ev-02-1', detail: 'Draft FS received from Moore Malaysia' },
  { timestamp: now, actor: 'System', action: 'LEDGER_LOADED', taskId: '', detail: 'Audit ledger loaded with 6 prior entries' },
];

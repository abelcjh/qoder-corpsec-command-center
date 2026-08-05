import type {
  Channel,
  CompanyContact,
  Department,
  ScheduledSendJob,
  SendLog,
  SendRun,
  StaffUser,
} from '../types';
import { generateId } from './utils';

export interface CreateJobInput {
  companyId: string;
  contactId?: string;
  ruleId?: string;
  department: Department;
  channel: Channel;
  subject: string;
  body: string;
  firstSendAt: string;
  everyNWorkingDays: number;
  stopDate?: string;
  createdBy: string;
}

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function addWorkingDays(start: Date, days: number): Date {
  const result = new Date(start);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (isWorkingDay(result)) {
      added++;
    }
  }
  return result;
}

export function createScheduledSendJob(input: CreateJobInput): ScheduledSendJob {
  return {
    id: generateId('job'),
    ...input,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
}

export function buildScheduledSendJobRuns(job: ScheduledSendJob): SendRun[] {
  const runs: SendRun[] = [];
  const stop = job.stopDate ? new Date(job.stopDate) : null;
  let cursor = new Date(job.firstSendAt);
  const maxRuns = 500; // safety cap

  for (let i = 0; i < maxRuns; i++) {
    if (stop && cursor > stop) break;

    runs.push({
      scheduledRunAt: cursor.toISOString(),
      status: 'scheduled',
    });

    cursor = addWorkingDays(cursor, job.everyNWorkingDays);
    if (stop && cursor > stop) break;
  }

  return runs;
}

export function getNextRun(job: ScheduledSendJob, after: Date = new Date()): string | null {
  const runs = buildScheduledSendJobRuns(job);
  const next = runs.find((r) => new Date(r.scheduledRunAt) > after);
  return next ? next.scheduledRunAt : null;
}

export function interpolateTemplate(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? `{{${key}}}`);
}

export function simulateCronSend(
  job: ScheduledSendJob,
  run: SendRun,
  contact: CompanyContact | undefined,
  staff: StaffUser | undefined,
  now: Date = new Date()
): SendLog {
  const recipient = contact
    ? contact.preferredChannel === 'email'
      ? contact.email ?? 'unknown@example.com'
      : contact.phone ?? '+6000000000'
    : 'unknown@example.com';

  return {
    id: generateId('log'),
    jobId: job.id,
    companyId: job.companyId,
    contactId: job.contactId,
    scheduledRunAt: run.scheduledRunAt,
    sentAt: now.toISOString(),
    senderStaffId: staff?.id,
    senderEmail: staff?.email,
    recipient,
    channel: job.channel,
    status: 'simulated',
    messageSnapshot: `${job.subject}\n\n${job.body}`,
    providerMessageId: `demo-${generateId('msg')}`,
    evidenceType: 'simulated',
    demoMarked: true,
    createdAt: now.toISOString(),
  };
}

export function simulateDueSends(
  jobs: ScheduledSendJob[],
  contacts: CompanyContact[],
  staff: StaffUser | undefined,
  existingLogs: SendLog[],
  now: Date = new Date()
): SendLog[] {
  const newLogs: SendLog[] = [];

  for (const job of jobs) {
    if (job.status !== 'active') continue;

    const runs = buildScheduledSendJobRuns(job);
    const contact = contacts.find((c) => c.id === job.contactId);

    for (const run of runs) {
      if (new Date(run.scheduledRunAt) > now) continue;

      const alreadySent = existingLogs.some(
        (log) =>
          log.jobId === job.id &&
          log.scheduledRunAt === run.scheduledRunAt &&
          (log.status === 'sent' || log.status === 'simulated' || log.status === 'delivered')
      );

      if (alreadySent) continue;

      newLogs.push(simulateCronSend(job, run, contact, staff, now));
    }
  }

  return newLogs;
}

export function recordSendProof(
  job: ScheduledSendJob,
  run: SendRun,
  contact: CompanyContact | undefined,
  staff: StaffUser | undefined,
  overrides: Partial<SendLog> = {}
): SendLog {
  return {
    ...simulateCronSend(job, run, contact, staff),
    ...overrides,
  };
}

export function getRunsUntil(
  job: ScheduledSendJob,
  until: Date = new Date()
): { past: SendRun[]; future: SendRun[] } {
  const runs = buildScheduledSendJobRuns(job);
  return {
    past: runs.filter((r) => new Date(r.scheduledRunAt) <= until),
    future: runs.filter((r) => new Date(r.scheduledRunAt) > until),
  };
}

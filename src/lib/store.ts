import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  AppState,
  AuditEvent,
  Channel,
  Company,
  CompanyContact,
  ComplianceRule,
  Department,
  ScheduledSendJob,
  SendLog,
  StaffUser,
} from '../types';
import { seedRules } from '../data/seed';
import { generateId } from './utils';
import { createScheduledSendJob, recordSendProof, simulateDueSends } from './reminderEngine';
import {
  filterCompaniesByDepartment,
  filterJobsByDepartment,
  filterLogsByDepartment,
  filterRulesByDepartment,
} from './scoping';
import { deactivateCompanyReducer, reactivateCompanyReducer } from './reducers';
import { isSupabaseEnabled, supabase } from './supabase';

export type CreateCompanyInput = Omit<Company, 'id' | 'active' | 'createdAt'>;
export type CreateContactInput = Omit<CompanyContact, 'id' | 'createdAt'>;
export type CreateRuleInput = Omit<ComplianceRule, 'id' | 'active' | 'createdAt'>;
export type CreateJobInput = {
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
};

type CloudStaffRow = {
  id: string;
  username: string;
  display_name: string;
  role: 'admin' | 'staff';
  allowed_departments: string[];
  password_hash: string;
};

type CloudClientProfileRow = {
  id: string;
  legal_name: string;
  registration_number: string | null;
  year_end: string | null;
  status: string;
  departments: string[];
  contacts: Array<{ id?: string; name: string; email?: string; whatsapp?: string; phone?: string; role?: string; department?: string; isPrimary?: boolean; is_primary?: boolean }>;
  deadlines?: Array<{ id?: string; department?: string; name?: string; dueDate?: string }>;
  official_fields?: Record<string, string>;
  incorporation_date?: string | null;
  business_address?: string | null;
};

type CloudJobRow = {
  id: string;
  company_id: string;
  company_name?: string;
  contact_name?: string;
  department: string;
  template_name?: string;
  template?: string;
  next_send_at: string;
  every_minutes?: number | null;
  every_working_days?: number | null;
  stop_at?: string | null;
  channel: Channel;
  recipient?: string;
  sender?: string;
  status: string;
  created_at?: string;
};

type CloudSendLogRow = {
  id: string;
  job_id: string;
  run_id?: string;
  company_id: string;
  company_name?: string;
  channel: Channel;
  recipient: string;
  sender?: string;
  subject?: string;
  message_snapshot: string;
  delivery_status?: string;
  provider?: string;
  provider_message_id?: string;
  sent_at: string;
  created_at?: string;
  evidence_type?: string;
};

function buildInitialState(): AppState {
  return {
    staffUsers: [],
    currentUser: null,
    cloudReady: false,
    loading: true,
    error: undefined,
    companies: [],
    contacts: [],
    rules: seedRules,
    jobs: [],
    sendLogs: [],
    proofDocuments: [],
    auditEvents: [],
  };
}

function mapDepartment(value?: string): Department {
  if (value === 'secretarial') return 'corp_sec';
  if (value === 'corp_sec' || value === 'audit' || value === 'tax' || value === 'accounting' || value === 'admin') return value;
  return 'corp_sec';
}

function unmapDepartment(value: Department): string {
  return value === 'corp_sec' ? 'secretarial' : value;
}

function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a:${(hash >>> 0).toString(16)}`;
}

function cloudStaffToApp(row: CloudStaffRow): StaffUser {
  const allowedDepartments = row.role === 'admin'
    ? (['corp_sec', 'audit', 'tax', 'accounting'] as Department[])
    : (row.allowed_departments ?? []).map(mapDepartment);
  const department = row.role === 'admin' ? 'admin' : allowedDepartments[0] ?? 'corp_sec';
  return {
    id: row.id,
    email: row.username,
    username: row.username,
    fullName: row.display_name,
    displayName: row.display_name,
    department,
    allowedDepartments,
    role: row.role === 'admin' ? 'admin' : 'staff',
    active: true,
    passwordHash: row.password_hash,
  };
}

function cloudCompanyToApp(row: CloudClientProfileRow): { company: Company; contacts: CompanyContact[] } {
  const departments = (row.departments ?? []).map(mapDepartment).filter((d) => d !== 'admin');
  const company: Company = {
    id: row.id,
    name: row.legal_name,
    registrationNo: row.registration_number ?? row.official_fields?.registrationNumber ?? '—',
    incorporationDate: row.incorporation_date ?? row.official_fields?.incorporationDate ?? row.year_end ?? '',
    ssmState: row.official_fields?.ssmState ?? 'Malaysia',
    sicCodes: [],
    registeredAddress: row.business_address ?? row.official_fields?.businessAddress ?? '',
    directors: [],
    companySecretary: row.official_fields?.companySecretary ?? 'CLPC Secretary Desk',
    financialYearEnd: row.year_end ?? '',
    departments: departments.length ? departments : ['corp_sec'],
    active: row.status !== 'deactivated' && row.status !== 'inactive',
  };
  const contacts = (row.contacts ?? []).map((contact, index): CompanyContact => ({
    id: contact.id ?? `${row.id}-contact-${index + 1}`,
    companyId: row.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone ?? contact.whatsapp,
    role: contact.role,
    preferredChannel: contact.whatsapp ? 'whatsapp' : 'email',
    isPrimary: Boolean(contact.isPrimary ?? contact.is_primary ?? index === 0),
  }));
  return { company, contacts };
}

function cloudJobToApp(row: CloudJobRow): ScheduledSendJob {
  return {
    id: row.id,
    companyId: row.company_id,
    department: mapDepartment(row.department),
    channel: row.channel ?? 'email',
    subject: row.template_name ? `CLPC reminder: ${row.template_name}` : 'CLPC reminder',
    body: row.template ?? '',
    firstSendAt: row.next_send_at,
    everyNWorkingDays: row.every_working_days ?? 30,
    stopDate: row.stop_at ? row.stop_at.slice(0, 10) : undefined,
    status: row.status === 'active' ? 'active' : row.status === 'deactivated' ? 'deactivated' : 'paused',
    createdBy: 'cloud-staff',
    createdAt: row.created_at ?? row.next_send_at,
  };
}

function cloudLogToApp(row: CloudSendLogRow): SendLog {
  const evidence = row.evidence_type === 'gmail_print_document' ? 'gmail_print' : row.evidence_type === 'provider_receipt' ? 'provider_receipt' : 'simulated';
  return {
    id: row.id,
    jobId: row.job_id,
    companyId: row.company_id,
    scheduledRunAt: row.sent_at,
    sentAt: row.sent_at,
    senderEmail: row.sender,
    recipient: row.recipient,
    channel: row.channel ?? 'email',
    status: row.delivery_status ? 'sent' : 'simulated',
    messageSnapshot: row.message_snapshot,
    providerMessageId: row.provider_message_id,
    evidenceType: evidence,
    fixtureMarked: evidence === 'simulated',
    createdAt: row.created_at ?? row.sent_at,
  };
}

async function loadCloudState() {
  if (!isSupabaseEnabled || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.');
  }
  const [staffRes, profilesRes, jobsRes, logsRes] = await Promise.all([
    supabase.from('staff_users').select('*').order('username', { ascending: true }),
    supabase.from('client_profiles').select('*').order('legal_name', { ascending: true }),
    supabase.from('scheduled_send_jobs').select('*').order('next_send_at', { ascending: true }),
    supabase.from('send_logs').select('*').order('sent_at', { ascending: false }),
  ]);
  for (const [label, res] of Object.entries({ staff: staffRes, client_profiles: profilesRes, jobs: jobsRes, logs: logsRes })) {
    if (res.error) throw new Error(`${label}: ${res.error.message}`);
  }
  const companiesAndContacts = ((profilesRes.data ?? []) as CloudClientProfileRow[]).map(cloudCompanyToApp);
  return {
    staffUsers: ((staffRes.data ?? []) as CloudStaffRow[]).map(cloudStaffToApp),
    companies: companiesAndContacts.map((item) => item.company),
    contacts: companiesAndContacts.flatMap((item) => item.contacts),
    jobs: ((jobsRes.data ?? []) as CloudJobRow[]).map(cloudJobToApp),
    sendLogs: ((logsRes.data ?? []) as CloudSendLogRow[]).map(cloudLogToApp),
  };
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(buildInitialState);

  const refreshCloud = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    try {
      const cloud = await loadCloudState();
      setState((prev) => ({ ...prev, ...cloud, cloudReady: true, loading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, cloudReady: false, loading: false, error: error instanceof Error ? error.message : String(error) }));
    }
  }, []);

  useEffect(() => {
    void refreshCloud();
  }, [refreshCloud]);

  const audit = useCallback(
    (action: string, entityType: string, entityId: string | undefined, detail: Record<string, unknown>) => {
      const event: AuditEvent = {
        id: generateId('evt'),
        actorStaffId: state.currentUser?.id,
        actorEmail: state.currentUser?.email,
        action,
        entityType,
        entityId,
        detail,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, auditEvents: [event, ...prev.auditEvents] }));
    },
    [state.currentUser]
  );

  const login = useCallback(
    (username: string, password: string) => {
      const normalized = username.trim().toLowerCase();
      const user = state.staffUsers.find((u) => u.username === normalized && u.active);
      if (!user || !user.passwordHash || user.passwordHash !== stableHash(`${normalized}:${password}`)) return false;
      setState((prev) => ({ ...prev, currentUser: user }));
      audit('LOGIN', 'staff_user', user.id, { username: user.username, departments: user.allowedDepartments });
      return true;
    },
    [state.staffUsers, audit]
  );

  const logout = useCallback(() => {
    const userId = state.currentUser?.id;
    setState((prev) => ({ ...prev, currentUser: null }));
    if (userId) audit('LOGOUT', 'staff_user', userId, {});
  }, [state.currentUser, audit]);

  const scopedCompanies = useMemo(() => {
    if (!state.currentUser) return [];
    return filterCompaniesByDepartment(state.companies, state.currentUser.department);
  }, [state.companies, state.currentUser]);

  const scopedRules = useMemo(() => {
    if (!state.currentUser) return [];
    return filterRulesByDepartment(state.rules, state.currentUser.department);
  }, [state.rules, state.currentUser]);

  const scopedJobs = useMemo(() => {
    if (!state.currentUser) return [];
    return filterJobsByDepartment(state.jobs, state.currentUser.department);
  }, [state.jobs, state.currentUser]);

  const scopedLogs = useMemo(() => {
    if (!state.currentUser) return [];
    return filterLogsByDepartment(state.sendLogs, state.companies, state.currentUser.department);
  }, [state.sendLogs, state.companies, state.currentUser]);

  const createCompany = useCallback(
    async (input: CreateCompanyInput) => {
      const company: Company = { ...input, id: generateId('co'), active: true };
      setState((prev) => ({ ...prev, companies: [company, ...prev.companies] }));
      if (supabase) {
        const { error } = await (supabase.from('client_profiles') as any).upsert({
          id: company.id,
          legal_name: company.name,
          registration_number: company.registrationNo,
          tax_number: null,
          sst_number: null,
          year_end: company.financialYearEnd || company.incorporationDate,
          status: 'active',
          source: 'supabase',
          departments: company.departments.map(unmapDepartment),
          contacts: [],
          deadlines: [],
          official_fields: { registrationNumber: company.registrationNo, ssmState: company.ssmState, businessAddress: company.registeredAddress },
          sender_profile: { email: 'no-reply@clpc.com.my', whatsappLabel: 'CLPC Reminder Desk' },
          sync_notes: ['Created from Credence Qoder prototype'],
          incorporation_date: company.incorporationDate,
          business_address: company.registeredAddress,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (error) setState((prev) => ({ ...prev, error: error.message }));
      }
      audit('COMPANY_CREATED', 'company', company.id, { name: company.name });
      return company;
    },
    [audit]
  );

  const createContact = useCallback((input: CreateContactInput) => {
    const contact: CompanyContact = { ...input, id: generateId('contact') };
    setState((prev) => ({ ...prev, contacts: [contact, ...prev.contacts] }));
    audit('CONTACT_CREATED', 'company_contact', contact.id, { companyId: contact.companyId });
    return contact;
  }, [audit]);

  const createRule = useCallback((input: CreateRuleInput) => {
    const rule: ComplianceRule = { ...input, id: generateId('rule'), active: true };
    setState((prev) => ({ ...prev, rules: [rule, ...prev.rules] }));
    audit('RULE_CREATED', 'compliance_rule', rule.id, { name: rule.name });
    return rule;
  }, [audit]);

  const createJob = useCallback(
    async (input: CreateJobInput) => {
      const job = createScheduledSendJob({ ...input, createdBy: state.currentUser?.id ?? 'unknown' });
      setState((prev) => ({ ...prev, jobs: [job, ...prev.jobs] }));
      if (supabase) {
        const company = state.companies.find((c) => c.id === job.companyId);
        const contact = state.contacts.find((c) => c.id === job.contactId) ?? state.contacts.find((c) => c.companyId === job.companyId && c.isPrimary);
        const { error } = await (supabase.from('scheduled_send_jobs') as any).upsert({
          id: job.id,
          company_id: job.companyId,
          company_name: company?.name ?? job.companyId,
          contact_name: contact?.name ?? 'Client',
          department: unmapDepartment(job.department),
          template_name: job.subject,
          template: job.body,
          next_send_at: job.firstSendAt,
          every_minutes: null,
          every_working_days: job.everyNWorkingDays,
          stop_at: job.stopDate ? new Date(job.stopDate).toISOString() : null,
          channel: job.channel,
          recipient: contact?.email ?? contact?.phone ?? 'client@example.com',
          sender: 'CLPC Reminder Desk',
          status: 'active',
          created_at: job.createdAt,
          updated_at: new Date().toISOString(),
        });
        if (error) setState((prev) => ({ ...prev, error: error.message }));
      }
      audit('JOB_CREATED', 'scheduled_send_job', job.id, { companyId: job.companyId, department: job.department });
      return job;
    },
    [audit, state.currentUser, state.companies, state.contacts]
  );

  const simulateCron = useCallback((now = new Date()) => {
    const newLogs = simulateDueSends(state.jobs, state.contacts, state.currentUser ?? undefined, state.sendLogs, now);
    if (newLogs.length === 0) return 0;
    setState((prev) => ({ ...prev, sendLogs: [...newLogs, ...prev.sendLogs] }));
    audit('CRON_PROOF_PREVIEWED', 'system', undefined, { count: newLogs.length, at: now.toISOString() });
    return newLogs.length;
  }, [state.jobs, state.contacts, state.currentUser, state.sendLogs, audit]);

  const simulateJobNow = useCallback((job: ScheduledSendJob) => {
    const contact = state.contacts.find((c) => c.id === job.contactId);
    const log = recordSendProof(job, { scheduledRunAt: new Date().toISOString(), status: 'scheduled' }, contact, state.currentUser ?? undefined, { status: 'sent' });
    setState((prev) => ({ ...prev, sendLogs: [log, ...prev.sendLogs] }));
    audit('JOB_PROOF_PREVIEWED', 'scheduled_send_job', job.id, { companyId: job.companyId });
    return log;
  }, [state.contacts, state.currentUser, audit]);

  const deactivateCompany = useCallback((companyId: string) => {
    setState((prev) => deactivateCompanyReducer(prev, companyId));
    audit('COMPANY_DEACTIVATED', 'company', companyId, { note: 'Future jobs deactivated; logs retained.' });
  }, [audit]);

  const reactivateCompany = useCallback((companyId: string) => {
    setState((prev) => reactivateCompanyReducer(prev, companyId));
    audit('COMPANY_REACTIVATED', 'company', companyId, {});
  }, [audit]);

  return {
    state,
    login,
    logout,
    refreshCloud,
    scopedCompanies,
    scopedRules,
    scopedJobs,
    scopedLogs,
    createCompany,
    createContact,
    createRule,
    createJob,
    simulateCron,
    simulateJobNow,
    deactivateCompany,
    reactivateCompany,
  };
}

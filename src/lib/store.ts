import { useCallback, useMemo, useState } from 'react';
import type {
  AppState,
  AuditEvent,
  Channel,
  Company,
  CompanyContact,
  ComplianceRule,
  Department,
  ScheduledSendJob,
} from '../types';
import {
  seedAuditEvents,
  seedCompanies,
  seedContacts,
  seedJobs,
  seedRules,
  seedSendLogs,
  seedStaffUsers,
} from '../data/seed';
import { generateId } from './utils';
import { createScheduledSendJob, recordSendProof, simulateDueSends } from './reminderEngine';
import {
  filterCompaniesByDepartment,
  filterJobsByDepartment,
  filterLogsByDepartment,
  filterRulesByDepartment,
} from './scoping';
import { deactivateCompanyReducer, reactivateCompanyReducer } from './reducers';

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

function buildInitialState(): AppState {
  return {
    staffUsers: seedStaffUsers,
    currentUser: null,
    companies: seedCompanies,
    contacts: seedContacts,
    rules: seedRules,
    jobs: seedJobs,
    sendLogs: seedSendLogs,
    proofDocuments: [],
    auditEvents: seedAuditEvents,
  };
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(buildInitialState);

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
    (email: string) => {
      const user = state.staffUsers.find((u) => u.email === email && u.active);
      if (!user) return false;
      setState((prev) => ({ ...prev, currentUser: user }));
      audit('LOGIN', 'staff_user', user.id, { email: user.email, department: user.department });
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
    (input: CreateCompanyInput) => {
      const company: Company = {
        ...input,
        id: generateId('comp'),
        active: true,
      };
      setState((prev) => ({ ...prev, companies: [company, ...prev.companies] }));
      audit('COMPANY_CREATED', 'company', company.id, { name: company.name });
      return company;
    },
    [audit]
  );

  const createContact = useCallback(
    (input: CreateContactInput) => {
      const contact: CompanyContact = {
        ...input,
        id: generateId('contact'),
      };
      setState((prev) => ({ ...prev, contacts: [contact, ...prev.contacts] }));
      audit('CONTACT_CREATED', 'company_contact', contact.id, { companyId: contact.companyId });
      return contact;
    },
    [audit]
  );

  const createRule = useCallback(
    (input: CreateRuleInput) => {
      const rule: ComplianceRule = {
        ...input,
        id: generateId('rule'),
        active: true,
      };
      setState((prev) => ({ ...prev, rules: [rule, ...prev.rules] }));
      audit('RULE_CREATED', 'compliance_rule', rule.id, { name: rule.name });
      return rule;
    },
    [audit]
  );

  const createJob = useCallback(
    (input: CreateJobInput) => {
      const job = createScheduledSendJob({
        ...input,
        createdBy: state.currentUser?.id ?? 'unknown',
      });
      setState((prev) => ({ ...prev, jobs: [job, ...prev.jobs] }));
      audit('JOB_CREATED', 'scheduled_send_job', job.id, { companyId: job.companyId, department: job.department });
      return job;
    },
    [audit, state.currentUser]
  );

  const simulateCron = useCallback(
    (now = new Date()) => {
      const newLogs = simulateDueSends(
        state.jobs,
        state.contacts,
        state.currentUser ?? undefined,
        state.sendLogs,
        now
      );
      if (newLogs.length === 0) return 0;
      setState((prev) => ({ ...prev, sendLogs: [...newLogs, ...prev.sendLogs] }));
      audit('CRON_SIMULATED', 'system', undefined, { count: newLogs.length, at: now.toISOString() });
      return newLogs.length;
    },
    [state.jobs, state.contacts, state.currentUser, state.sendLogs, audit]
  );

  const simulateJobNow = useCallback(
    (job: ScheduledSendJob) => {
      const contact = state.contacts.find((c) => c.id === job.contactId);
      const log = recordSendProof(
        job,
        { scheduledRunAt: new Date().toISOString(), status: 'scheduled' },
        contact,
        state.currentUser ?? undefined,
        { status: 'simulated' }
      );
      setState((prev) => ({ ...prev, sendLogs: [log, ...prev.sendLogs] }));
      audit('JOB_SIMULATED', 'scheduled_send_job', job.id, { companyId: job.companyId });
      return log;
    },
    [state.contacts, state.currentUser, audit]
  );

  const deactivateCompany = useCallback(
    (companyId: string) => {
      setState((prev) => deactivateCompanyReducer(prev, companyId));
      audit('COMPANY_DEACTIVATED', 'company', companyId, { note: 'Future jobs deactivated; logs retained.' });
    },
    [audit]
  );

  const reactivateCompany = useCallback(
    (companyId: string) => {
      setState((prev) => reactivateCompanyReducer(prev, companyId));
      audit('COMPANY_REACTIVATED', 'company', companyId, {});
    },
    [audit]
  );

  return {
    state,
    login,
    logout,
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

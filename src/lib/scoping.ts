import type { Company, CompanyContact, ComplianceRule, ScheduledSendJob, SendLog, StaffUser } from '../types';

export function filterCompaniesByDepartment(
  companies: Company[],
  userDepartment: StaffUser['department']
): Company[] {
  if (userDepartment === 'admin') return companies;
  return companies.filter((c) => c.departments.includes(userDepartment));
}

export function filterRulesByDepartment(
  rules: ComplianceRule[],
  userDepartment: StaffUser['department']
): ComplianceRule[] {
  if (userDepartment === 'admin') return rules;
  return rules.filter((r) => r.department === userDepartment);
}

export function filterJobsByDepartment(
  jobs: ScheduledSendJob[],
  userDepartment: StaffUser['department']
): ScheduledSendJob[] {
  if (userDepartment === 'admin') return jobs;
  return jobs.filter((j) => j.department === userDepartment);
}

export function filterLogsByDepartment(
  logs: SendLog[],
  companies: Company[],
  userDepartment: StaffUser['department']
): SendLog[] {
  if (userDepartment === 'admin') return logs;
  const scopedCompanyIds = new Set(
    filterCompaniesByDepartment(companies, userDepartment).map((c) => c.id)
  );
  return logs.filter((l) => scopedCompanyIds.has(l.companyId));
}

export function getPrimaryContact(
  companyId: string,
  contacts: CompanyContact[]
): CompanyContact | undefined {
  return (
    contacts.find((c) => c.companyId === companyId && c.isPrimary) ??
    contacts.find((c) => c.companyId === companyId)
  );
}

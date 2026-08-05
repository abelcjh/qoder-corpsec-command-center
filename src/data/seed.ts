import type {
  StaffUser,
  Company,
  CompanyContact,
  ComplianceRule,
  ScheduledSendJob,
  SendLog,
  AuditEvent,
  Department,
} from '../types';

export const seedStaffUsers: StaffUser[] = [
  {
    id: 'staff-admin',
    email: 'admin',
    username: 'admin',
    fullName: 'CLPC Admin',
    displayName: 'CLPC Admin',
    department: 'admin',
    allowedDepartments: ['corp_sec', 'audit', 'tax', 'accounting'],
    passwordHash: 'fnv1a:2d4b23a7',
    role: 'admin',
    active: true,
  },
  {
    id: 'staff-tax',
    email: 'tax',
    username: 'tax',
    fullName: 'Tax Department',
    displayName: 'Tax Department',
    department: 'tax',
    allowedDepartments: ['tax'],
    passwordHash: 'fnv1a:2b6e6bb5',
    role: 'staff',
    active: true,
  },
  {
    id: 'staff-audit',
    email: 'audit',
    username: 'audit',
    fullName: 'Audit Department',
    displayName: 'Audit Department',
    department: 'audit',
    allowedDepartments: ['audit'],
    passwordHash: 'fnv1a:211b75d7',
    role: 'staff',
    active: true,
  },
  {
    id: 'staff-corpsec',
    email: 'corpsec',
    username: 'corpsec',
    fullName: 'Corp Sec Department',
    displayName: 'Corp Sec Department',
    department: 'corp_sec',
    allowedDepartments: ['corp_sec'],
    passwordHash: 'fnv1a:b0538de5',
    role: 'staff',
    active: true,
  },
  {
    id: 'staff-accounting',
    email: 'accounts',
    username: 'accounts',
    fullName: 'Accounting Department',
    displayName: 'Accounting Department',
    department: 'accounting',
    allowedDepartments: ['accounting'],
    passwordHash: 'fnv1a:83cf4e6',
    role: 'staff',
    active: true,
  },
];

export const seedCompanies: Company[] = [
  {
    id: 'comp-nusantara',
    name: 'Nusantara Digital Sdn Bhd',
    registrationNo: '202301012345 (1509876-K)',
    incorporationDate: '2023-04-15',
    ssmState: 'Selangor',
    sicCodes: ['62010', '62099'],
    registeredAddress: 'Unit 12-3, Tower 2, Avenue Crest, Jalan Jubli Perak 22/1, 40000 Shah Alam, Selangor',
    directors: ['Ahmad bin Ismail', 'Siti Nurhaliza binti Rahman'],
    companySecretary: 'Lee Wei Ming (MAISAC No. MA-00456)',
    financialYearEnd: '2025-12-31',
    departments: ['corp_sec', 'audit', 'tax', 'accounting'],
    active: true,
  },
  {
    id: 'comp-ace',
    name: 'Ace Logistics Sdn Bhd',
    registrationNo: '201801009876 (1245789-A)',
    incorporationDate: '2018-07-20',
    ssmState: 'Kuala Lumpur',
    sicCodes: ['49409'],
    registeredAddress: 'No. 45, Jalan Tun Razak, 50400 Kuala Lumpur',
    directors: ['Rajesh Kumar', 'Tan Mei Ling'],
    companySecretary: 'Lee Wei Ming (MAISAC No. MA-00456)',
    financialYearEnd: '2025-06-30',
    departments: ['corp_sec', 'tax', 'accounting'],
    active: true,
  },
  {
    id: 'comp-panorama',
    name: 'Panorama F&B Group Sdn Bhd',
    registrationNo: '202001005432 (1387654-P)',
    incorporationDate: '2020-02-10',
    ssmState: 'Penang',
    sicCodes: ['56101', '56301'],
    registeredAddress: '78, Gurney Drive, 10250 Georgetown, Penang',
    directors: ['Lim Kah Hoe', 'Chong Wei Soon'],
    companySecretary: 'Ariel Low (MAISAC No. MA-00789)',
    financialYearEnd: '2025-09-30',
    departments: ['corp_sec', 'audit', 'accounting'],
    active: true,
  },
];

export const seedContacts: CompanyContact[] = [
  {
    id: 'contact-nusantara-1',
    companyId: 'comp-nusantara',
    name: 'Lee Wei Ming',
    email: 'secretary@nusantara.example',
    phone: '+6012-345-6789',
    role: 'Company Secretary',
    preferredChannel: 'email',
    isPrimary: true,
  },
  {
    id: 'contact-nusantara-2',
    companyId: 'comp-nusantara',
    name: 'Ahmad bin Ismail',
    email: 'ahmad@nusantara.example',
    phone: '+6013-456-7890',
    role: 'Director',
    preferredChannel: 'whatsapp',
    isPrimary: false,
  },
  {
    id: 'contact-ace-1',
    companyId: 'comp-ace',
    name: 'Rajesh Kumar',
    email: 'rajesh@acelogistics.example',
    phone: '+6014-567-8901',
    role: 'Director',
    preferredChannel: 'email',
    isPrimary: true,
  },
  {
    id: 'contact-panorama-1',
    companyId: 'comp-panorama',
    name: 'Ariel Low',
    email: 'secretary@panorama.example',
    phone: '+6015-678-9012',
    role: 'Company Secretary',
    preferredChannel: 'email',
    isPrimary: true,
  },
];

export const seedRules: ComplianceRule[] = [
  {
    id: 'rule-ar',
    name: 'Annual Return Reminder (Section 68)',
    department: 'corp_sec',
    defaultSubject: 'Annual Return Filing Reminder — {{companyName}}',
    defaultBody:
      'Dear {{contactName}},\n\nThis is a reminder that the Annual Return for {{companyName}} ({{registrationNo}}) is due on {{dueDate}}.\n\nPlease prepare the necessary particulars and confirm lodgement via MyCoID portal.\n\nBest regards,\nCLPC Corporate Secretarial',
    defaultEveryNWorkingDays: 30,
    variables: ['companyName', 'registrationNo', 'contactName', 'dueDate'],
    statutoryRef: 'Section 68, Companies Act 2016',
    active: true,
  },
  {
    id: 'rule-tax-cp204',
    name: 'Tax CP204 / Form C Reminder',
    department: 'tax',
    defaultSubject: 'Corporate Tax Filing Reminder — {{companyName}}',
    defaultBody:
      'Dear {{contactName}},\n\nPlease note the upcoming corporate tax deadline for {{companyName}} ({{registrationNo}}).\n\nEnsure CP204/Form C is prepared and submitted to LHDN before the due date on {{dueDate}}.\n\nBest regards,\nCLPC Tax Team',
    defaultEveryNWorkingDays: 14,
    variables: ['companyName', 'registrationNo', 'contactName', 'dueDate'],
    statutoryRef: 'Income Tax Act 1967, Section 77A',
    active: true,
  },
  {
    id: 'rule-audit-fs',
    name: 'Audited Financial Statements Reminder',
    department: 'audit',
    defaultSubject: 'Audit & FS Deadline Reminder — {{companyName}}',
    defaultBody:
      'Dear {{contactName}},\n\nThe audited financial statements deadline for {{companyName}} ({{registrationNo}}) is approaching on {{dueDate}}.\n\nKindly provide outstanding PBC items to the audit team.\n\nBest regards,\nCLPC Audit Team',
    defaultEveryNWorkingDays: 7,
    variables: ['companyName', 'registrationNo', 'contactName', 'dueDate'],
    statutoryRef: 'Section 258, Companies Act 2016',
    active: true,
  },
  {
    id: 'rule-accounting-monthly',
    name: 'Monthly Management Accounts Reminder',
    department: 'accounting',
    defaultSubject: 'Monthly Accounts Closing Reminder — {{companyName}}',
    defaultBody:
      'Dear {{contactName}},\n\nPlease ensure all invoices, receipts and bank statements for {{companyName}} ({{registrationNo}}) are submitted by {{dueDate}} so we can close the monthly accounts on time.\n\nBest regards,\nCLPC Accounting Team',
    defaultEveryNWorkingDays: 30,
    variables: ['companyName', 'registrationNo', 'contactName', 'dueDate'],
    active: true,
  },
  {
    id: 'rule-agm',
    name: 'AGM Notice Reminder (Section 340)',
    department: 'corp_sec',
    defaultSubject: 'AGM Notice & Compliance Reminder — {{companyName}}',
    defaultBody:
      'Dear {{contactName}},\n\nPlease be reminded that {{companyName}} ({{registrationNo}}) must hold its AGM by {{dueDate}}.\n\nKindly confirm board availability and agenda items.\n\nBest regards,\nCLPC Corporate Secretarial',
    defaultEveryNWorkingDays: 21,
    variables: ['companyName', 'registrationNo', 'contactName', 'dueDate'],
    statutoryRef: 'Section 340, Companies Act 2016',
    active: true,
  },
];

export const seedJobs: ScheduledSendJob[] = [
  {
    id: 'job-ar-nusantara',
    companyId: 'comp-nusantara',
    contactId: 'contact-nusantara-1',
    ruleId: 'rule-ar',
    department: 'corp_sec',
    channel: 'email',
    subject: 'Annual Return Filing Reminder — Nusantara Digital Sdn Bhd',
    body:
      'Dear Lee Wei Ming,\n\nThis is a reminder that the Annual Return for Nusantara Digital Sdn Bhd (202301012345 (1509876-K)) is due on 2026-05-15.\n\nPlease prepare the necessary particulars and confirm lodgement via MyCoID portal.\n\nBest regards,\nCLPC Corporate Secretarial',
    firstSendAt: '2026-04-14T09:00:00+08:00',
    everyNWorkingDays: 30,
    stopDate: '2026-05-20',
    status: 'active',
    createdBy: 'staff-corpsec',
    createdAt: '2026-04-01T10:00:00+08:00',
  },
  {
    id: 'job-tax-ace',
    companyId: 'comp-ace',
    contactId: 'contact-ace-1',
    ruleId: 'rule-tax-cp204',
    department: 'tax',
    channel: 'email',
    subject: 'Corporate Tax Filing Reminder — Ace Logistics Sdn Bhd',
    body:
      'Dear Rajesh Kumar,\n\nPlease note the upcoming corporate tax deadline for Ace Logistics Sdn Bhd (201801009876 (1245789-A)).\n\nEnsure CP204/Form C is prepared and submitted to LHDN before the due date on 2026-01-31.\n\nBest regards,\nCLPC Tax Team',
    firstSendAt: '2026-01-17T09:00:00+08:00',
    everyNWorkingDays: 14,
    stopDate: '2026-01-31',
    status: 'active',
    createdBy: 'staff-tax',
    createdAt: '2026-01-03T09:00:00+08:00',
  },
];

export const seedSendLogs: SendLog[] = [
  {
    id: 'log-ar-nusantara-1',
    jobId: 'job-ar-nusantara',
    companyId: 'comp-nusantara',
    contactId: 'contact-nusantara-1',
    scheduledRunAt: '2026-04-14T09:00:00+08:00',
    sentAt: '2026-04-14T09:00:03+08:00',
    senderStaffId: 'staff-corpsec',
    senderEmail: 'corpsec@clpc.my',
    recipient: 'secretary@nusantara.example',
    channel: 'email',
    status: 'simulated',
    messageSnapshot: 'Annual Return Filing Reminder — Nusantara Digital Sdn Bhd',
    providerMessageId: 'demo-msg-001',
    evidenceType: 'simulated',
    demoMarked: true,
    createdAt: '2026-04-14T09:00:03+08:00',
  },
];

export const seedAuditEvents: AuditEvent[] = [
  {
    id: 'evt-init',
    actorStaffId: 'staff-admin',
    actorEmail: 'admin@clpc.my',
    action: 'DEMO_SEED_LOADED',
    entityType: 'system',
    detail: { note: 'Demo data seeded; Supabase not configured.' },
    createdAt: '2026-04-01T00:00:00+08:00',
  },
];

export function getDepartmentLabel(dept: Department): string {
  const labels: Record<Department, string> = {
    admin: 'Administration',
    audit: 'Audit',
    tax: 'Tax',
    accounting: 'Accounting',
    corp_sec: 'Corporate Secretarial',
  };
  return labels[dept];
}

export function getChannelLabel(channel: string): string {
  return channel === 'email' ? 'Email' : channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
}

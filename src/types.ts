export type Department = 'admin' | 'audit' | 'tax' | 'accounting' | 'corp_sec';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export type JobStatus = 'active' | 'paused' | 'completed' | 'deactivated';

export type SendStatus = 'scheduled' | 'sent' | 'delivered' | 'failed' | 'simulated';

export type Channel = 'email' | 'whatsapp' | 'sms';

export type EvidenceType = 'simulated' | 'provider_receipt' | 'gmail_print';

export interface StaffUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  displayName: string;
  department: Department;
  allowedDepartments: Department[];
  role: 'admin' | 'manager' | 'staff';
  active: boolean;
  passwordHash?: string;
}

export interface Company {
  id: string;
  name: string;
  registrationNo: string;
  incorporationDate: string;
  ssmState: string;
  sicCodes: string[];
  registeredAddress: string;
  directors: string[];
  companySecretary: string;
  financialYearEnd: string;
  departments: Department[];
  active: boolean;
}

export interface CompanyContact {
  id: string;
  companyId: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  preferredChannel: Channel;
  isPrimary: boolean;
}

export interface ComplianceRule {
  id: string;
  name: string;
  department: Department;
  defaultSubject: string;
  defaultBody: string;
  defaultEveryNWorkingDays: number;
  variables: string[];
  statutoryRef?: string;
  active: boolean;
}

export interface ScheduledSendJob {
  id: string;
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
  status: JobStatus;
  createdBy: string;
  createdAt: string;
}

export interface SendRun {
  scheduledRunAt: string;
  status: SendStatus;
}

export interface SendLog {
  id: string;
  jobId: string;
  companyId: string;
  contactId?: string;
  scheduledRunAt: string;
  sentAt?: string;
  senderStaffId?: string;
  senderEmail?: string;
  recipient: string;
  channel: Channel;
  status: SendStatus;
  messageSnapshot: string;
  providerMessageId?: string;
  evidenceType: EvidenceType;
  fixtureMarked: boolean;
  createdAt: string;
}

export interface ProofDocument {
  id: string;
  sendLogId: string;
  documentType: string;
  storagePath?: string;
  metadata: Record<string, unknown>;
  uploadedBy?: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actorStaffId?: string;
  actorEmail?: string;
  action: string;
  entityType: string;
  entityId?: string;
  detail: Record<string, unknown>;
  createdAt: string;
}

// Legacy MVP types (retained for backward compatibility)
export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  category: 'filing' | 'governance' | 'tax' | 'audit' | 'statutory';
  dueDate: string;
  status: TaskStatus;
  owner: string;
  evidence: EvidenceEntry[];
  aiDraft?: string;
  ssmRef?: string;
  actRef?: string;
}

export interface EvidenceEntry {
  id: string;
  taskId: string;
  note: string;
  artifactRef: string;
  timestamp: string;
  addedBy: string;
}

export interface ComplianceEvent {
  id: string;
  name: string;
  year: number;
  tasks: ComplianceTask[];
}

export interface AuditLedgerEntry {
  timestamp: string;
  actor: string;
  action: string;
  taskId: string;
  evidenceId?: string;
  detail: string;
}

export interface ReviewSummary {
  reviewer: string;
  reviewedAt: string;
  findings: string[];
  approved: boolean;
  notes: string;
}

// Fixture-backed store state shape
export interface AppState {
  staffUsers: StaffUser[];
  currentUser: StaffUser | null;
  cloudReady: boolean;
  loading: boolean;
  error?: string;
  companies: Company[];
  contacts: CompanyContact[];
  rules: ComplianceRule[];
  jobs: ScheduledSendJob[];
  sendLogs: SendLog[];
  proofDocuments: ProofDocument[];
  auditEvents: AuditEvent[];
}

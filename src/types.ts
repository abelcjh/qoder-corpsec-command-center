export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

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

export interface Company {
  name: string;
  registrationNo: string;
  incorporationDate: string;
  ssmState: string;
  sicCodes: string[];
  registeredAddress: string;
  directors: string[];
  companySecretary: string;
  financialYearEnd: string;
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

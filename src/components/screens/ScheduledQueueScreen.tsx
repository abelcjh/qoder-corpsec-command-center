import { useMemo, useState } from 'react';
import type { Channel, Company, CompanyContact, ComplianceRule, Department, ScheduledSendJob, StaffUser } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Badge } from '../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { getDepartmentLabel, getChannelLabel } from '../../data/seed';
import { buildScheduledSendJobRuns, interpolateTemplate } from '../../lib/reminderEngine';
import { formatDateTime } from '../../lib/utils';
import { Plus, Play, CalendarClock } from 'lucide-react';

export interface ScheduledQueueScreenProps {
  user: StaffUser;
  companies: Company[];
  contacts: CompanyContact[];
  rules: ComplianceRule[];
  jobs: ScheduledSendJob[];
  onCreateJob: (input: {
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
  }) => void;
  onSimulateJob: (job: ScheduledSendJob) => void;
}

const channels: Channel[] = ['email', 'whatsapp', 'sms'];

export function ScheduledQueueScreen({
  user,
  companies,
  contacts,
  rules,
  jobs,
  onCreateJob,
  onSimulateJob,
}: ScheduledQueueScreenProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [previewRuns, setPreviewRuns] = useState<string[] | null>(null);
  const [form, setForm] = useState<{
    companyId: string;
    contactId: string;
    ruleId: string;
    department: Department;
    channel: Channel;
    subject: string;
    body: string;
    firstSendAt: string;
    everyNWorkingDays: number;
    stopDate: string;
  }>({
    companyId: '',
    contactId: '',
    ruleId: '',
    department: user.department === 'admin' ? 'corp_sec' : user.department,
    channel: 'email',
    subject: '',
    body: '',
    firstSendAt: '',
    everyNWorkingDays: 30,
    stopDate: '',
  });

  const availableContacts = useMemo(
    () => contacts.filter((c) => c.companyId === form.companyId),
    [contacts, form.companyId]
  );

  const selectedCompany = useMemo(
    () => companies.find((c) => c.id === form.companyId),
    [companies, form.companyId]
  );

  const applyRule = (ruleId: string) => {
    const rule = rules.find((r) => r.id === ruleId);
    if (!rule || !selectedCompany) return;
    const primary = contacts.find((c) => c.companyId === selectedCompany.id && c.isPrimary) ??
      contacts.find((c) => c.companyId === selectedCompany.id);
    const vars: Record<string, string> = {
      companyName: selectedCompany.name,
      registrationNo: selectedCompany.registrationNo,
      contactName: primary?.name || 'Client',
      dueDate: form.stopDate || 'TBD',
    };
    setForm((f) => ({
      ...f,
      ruleId,
      department: rule.department,
      channel: primary?.preferredChannel || 'email',
      subject: interpolateTemplate(rule.defaultSubject, vars),
      body: interpolateTemplate(rule.defaultBody, vars),
      everyNWorkingDays: rule.defaultEveryNWorkingDays,
    }));
  };

  const updatePreview = () => {
    if (!form.firstSendAt || !form.everyNWorkingDays) {
      setPreviewRuns(null);
      return;
    }
    const dummy = {
      id: 'preview',
      companyId: form.companyId,
      department: form.department,
      channel: form.channel,
      subject: form.subject,
      body: form.body,
      firstSendAt: new Date(form.firstSendAt).toISOString(),
      everyNWorkingDays: Number(form.everyNWorkingDays),
      stopDate: form.stopDate || undefined,
      status: 'active' as const,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    };
    const runs = buildScheduledSendJobRuns(dummy).slice(0, 10);
    setPreviewRuns(runs.map((r) => r.scheduledRunAt));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateJob({
      companyId: form.companyId,
      contactId: form.contactId || undefined,
      ruleId: form.ruleId || undefined,
      department: form.department,
      channel: form.channel,
      subject: form.subject,
      body: form.body,
      firstSendAt: new Date(form.firstSendAt).toISOString(),
      everyNWorkingDays: Number(form.everyNWorkingDays),
      stopDate: form.stopDate || undefined,
    });
    setShowCreate(false);
    setPreviewRuns(null);
    setForm({
      companyId: '',
      contactId: '',
      ruleId: '',
      department: user.department === 'admin' ? 'corp_sec' : user.department,
      channel: 'email',
      subject: '',
      body: '',
      firstSendAt: '',
      everyNWorkingDays: 30,
      stopDate: '',
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Scheduled Queue</h2>
          <p className="text-sm text-brand-muted">Recurring reminder jobs and next runs</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Send Job
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Dept</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>First Send</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              const company = companies.find((c) => c.id === job.companyId);
              return (
                <TableRow key={job.id}>
                  <TableCell className="max-w-xs truncate font-medium">{job.subject}</TableCell>
                  <TableCell>{company?.name || job.companyId}</TableCell>
                  <TableCell>{getDepartmentLabel(job.department)}</TableCell>
                  <TableCell>{getChannelLabel(job.channel)}</TableCell>
                  <TableCell>{formatDateTime(job.firstSendAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === 'active'
                          ? 'success'
                          : job.status === 'deactivated'
                          ? 'muted'
                          : 'warning'
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSimulateJob(job)}
                      disabled={job.status !== 'active'}
                    >
                      <Play size={14} /> Simulate
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
        <DialogHeader>
          <div>
            <DialogTitle>New Send Job</DialogTitle>
            <DialogDescription>Choose a company, apply a rule or write a custom reminder.</DialogDescription>
          </div>
          <DialogClose onClose={() => setShowCreate(false)} />
        </DialogHeader>
        <form onSubmit={submit}>
          <DialogContent className="max-h-[70vh] space-y-4 overflow-y-auto">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Company</Label>
                <select
                  className="input"
                  required
                  value={form.companyId}
                  onChange={(e) => setForm({ ...form, companyId: e.target.value, contactId: '', ruleId: '', subject: '', body: '' })}
                >
                  <option value="">Select company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Contact</Label>
                <select
                  className="input"
                  value={form.contactId}
                  onChange={(e) => setForm({ ...form, contactId: e.target.value })}
                  disabled={!form.companyId}
                >
                  <option value="">Default contact</option>
                  {availableContacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.preferredChannel})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Predefined Rule</Label>
                <select
                  className="input"
                  value={form.ruleId}
                  onChange={(e) => applyRule(e.target.value)}
                  disabled={!form.companyId}
                >
                  <option value="">Custom</option>
                  {rules.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Department</Label>
                <select
                  className="input"
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value as Department })}
                >
                  {(user.department === 'admin'
                    ? (['corp_sec', 'audit', 'tax', 'accounting'] as Department[])
                    : [user.department]
                  ).map((d) => (
                    <option key={d} value={d}>
                      {getDepartmentLabel(d)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Channel</Label>
                <select
                  className="input"
                  required
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value as Channel })}
                >
                  {channels.map((c) => (
                    <option key={c} value={c}>
                      {getChannelLabel(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>First Send Date/Time</Label>
                <Input
                  type="datetime-local"
                  required
                  value={form.firstSendAt}
                  onChange={(e) => setForm({ ...form, firstSendAt: e.target.value })}
                />
              </div>
              <div>
                <Label>Every N Working Days</Label>
                <Input
                  type="number"
                  min={1}
                  required
                  value={form.everyNWorkingDays}
                  onChange={(e) => setForm({ ...form, everyNWorkingDays: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Stop Date</Label>
                <Input
                  type="date"
                  value={form.stopDate}
                  onChange={(e) => setForm({ ...form, stopDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Subject</Label>
              <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <Label>Body</Label>
              <Textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-brand-border bg-brand-surface/50 p-3">
              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <CalendarClock size={16} />
                Preview first 10 scheduled runs
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={updatePreview}>
                Refresh Preview
              </Button>
            </div>
            {previewRuns && (
              <div className="rounded-lg border border-brand-border bg-brand-surface/30 p-3">
                <div className="mb-2 text-xs font-medium text-brand-muted">Upcoming runs</div>
                <div className="flex flex-wrap gap-2">
                  {previewRuns.map((r, i) => (
                    <Badge key={i} variant="muted">
                      {formatDateTime(r)}
                    </Badge>
                  ))}
                  {previewRuns.length === 10 && <span className="text-xs text-brand-muted">…</span>}
                </div>
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Job</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

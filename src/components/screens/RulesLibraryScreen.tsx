import { useState } from 'react';
import type { ComplianceRule, Department } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Badge } from '../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { getDepartmentLabel } from '../../data/seed';
import { Plus } from 'lucide-react';

export interface RulesLibraryScreenProps {
  rules: ComplianceRule[];
  onCreateRule: (input: {
    name: string;
    department: Department;
    defaultSubject: string;
    defaultBody: string;
    defaultEveryNWorkingDays: number;
    variables: string[];
    statutoryRef?: string;
  }) => void;
}

const departments: Department[] = ['corp_sec', 'audit', 'tax', 'accounting'];

export function RulesLibraryScreen({ rules, onCreateRule }: RulesLibraryScreenProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: '',
    department: 'corp_sec' as Department,
    defaultSubject: '',
    defaultBody: '',
    defaultEveryNWorkingDays: 30,
    variables: 'companyName,registrationNo,contactName,dueDate',
    statutoryRef: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRule({
      name: form.name,
      department: form.department,
      defaultSubject: form.defaultSubject,
      defaultBody: form.defaultBody,
      defaultEveryNWorkingDays: Number(form.defaultEveryNWorkingDays),
      variables: form.variables.split(',').map((s) => s.trim()).filter(Boolean),
      statutoryRef: form.statutoryRef || undefined,
    });
    setShowCreate(false);
    setForm({
      name: '',
      department: 'corp_sec',
      defaultSubject: '',
      defaultBody: '',
      defaultEveryNWorkingDays: 30,
      variables: 'companyName,registrationNo,contactName,dueDate',
      statutoryRef: '',
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Rules Library</h2>
          <p className="text-sm text-brand-muted">Predefined reminder templates by department</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} /> Add Rule
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Recurrence</TableHead>
              <TableHead>Variables</TableHead>
              <TableHead>Statutory Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>
                  <Badge variant="info">{getDepartmentLabel(rule.department)}</Badge>
                </TableCell>
                <TableCell>Every {rule.defaultEveryNWorkingDays} working days</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {rule.variables.map((v) => (
                      <Badge key={v} variant="muted">
                        {v}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-brand-muted">{rule.statutoryRef || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
        <DialogHeader>
          <div>
            <DialogTitle>Add Compliance Rule</DialogTitle>
            <DialogDescription>Define a reusable reminder template.</DialogDescription>
          </div>
          <DialogClose onClose={() => setShowCreate(false)} />
        </DialogHeader>
        <form onSubmit={submit}>
          <DialogContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Rule Name</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Department</Label>
                <select
                  className="input"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value as Department })}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {getDepartmentLabel(d)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Default Subject</Label>
                <Input required value={form.defaultSubject} onChange={(e) => setForm({ ...form, defaultSubject: e.target.value })} placeholder="Reminder — {{companyName}}" />
              </div>
              <div>
                <Label>Recurrence (working days)</Label>
                <Input type="number" min={1} required value={form.defaultEveryNWorkingDays} onChange={(e) => setForm({ ...form, defaultEveryNWorkingDays: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <Label>Default Body</Label>
              <Textarea required value={form.defaultBody} onChange={(e) => setForm({ ...form, defaultBody: e.target.value })} placeholder="Use {{companyName}}, {{dueDate}}, etc." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Variables (comma separated)</Label>
                <Input value={form.variables} onChange={(e) => setForm({ ...form, variables: e.target.value })} />
              </div>
              <div>
                <Label>Statutory Reference</Label>
                <Input value={form.statutoryRef} onChange={(e) => setForm({ ...form, statutoryRef: e.target.value })} />
              </div>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Rule</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

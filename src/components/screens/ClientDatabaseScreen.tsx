import { useMemo, useState } from 'react';
import type { Company, CompanyContact, Department } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Badge } from '../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { getDepartmentLabel } from '../../data/seed';
import { Plus, Eye, Users } from 'lucide-react';

export interface ClientDatabaseScreenProps {
  companies: Company[];
  contacts: CompanyContact[];
  onCreateCompany: (input: {
    name: string;
    registrationNo: string;
    incorporationDate: string;
    ssmState: string;
    registeredAddress: string;
    directors: string[];
    companySecretary: string;
    financialYearEnd: string;
    departments: Department[];
    sicCodes: string[];
  }) => void;
  onDeactivate: (id: string) => void;
  onReactivate: (id: string) => void;
}

const allDepartments: Department[] = ['corp_sec', 'audit', 'tax', 'accounting'];

export function ClientDatabaseScreen({
  companies,
  contacts,
  onCreateCompany,
  onDeactivate,
  onReactivate,
}: ClientDatabaseScreenProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [form, setForm] = useState({
    name: '',
    registrationNo: '',
    incorporationDate: '',
    ssmState: 'Selangor',
    registeredAddress: '',
    directors: '',
    companySecretary: '',
    financialYearEnd: '',
    departments: [] as Department[],
  });

  const companyContacts = useMemo(
    () => contacts.filter((c) => c.companyId === selectedCompany?.id),
    [contacts, selectedCompany]
  );

  const toggleDept = (dept: Department) => {
    setForm((f) => ({
      ...f,
      departments: f.departments.includes(dept)
        ? f.departments.filter((d) => d !== dept)
        : [...f.departments, dept],
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCompany({
      ...form,
      directors: form.directors.split(',').map((s) => s.trim()).filter(Boolean),
      sicCodes: [],
    });
    setShowCreate(false);
    setForm({
      name: '',
      registrationNo: '',
      incorporationDate: '',
      ssmState: 'Selangor',
      registeredAddress: '',
      directors: '',
      companySecretary: '',
      financialYearEnd: '',
      departments: [],
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Client Database</h2>
          <p className="text-sm text-brand-muted">Department-scoped company master records</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} /> Add Company
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.registrationNo}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.departments.map((d) => (
                      <Badge key={d} variant="default">
                        {getDepartmentLabel(d)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {company.active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="muted">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCompany(company)}>
                      <Eye size={16} />
                    </Button>
                    {company.active ? (
                      <Button variant="danger" size="sm" onClick={() => onDeactivate(company.id)}>
                        Deactivate
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={() => onReactivate(company.id)}>
                        Reactivate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
        <DialogHeader>
          <div>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>Create a client record in the database.</DialogDescription>
          </div>
          <DialogClose onClose={() => setShowCreate(false)} />
        </DialogHeader>
        <form onSubmit={submit}>
          <DialogContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Company Name</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Registration No.</Label>
                <Input required value={form.registrationNo} onChange={(e) => setForm({ ...form, registrationNo: e.target.value })} />
              </div>
              <div>
                <Label>Incorporation Date</Label>
                <Input type="date" required value={form.incorporationDate} onChange={(e) => setForm({ ...form, incorporationDate: e.target.value })} />
              </div>
              <div>
                <Label>SSM State</Label>
                <Input value={form.ssmState} onChange={(e) => setForm({ ...form, ssmState: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Registered Address</Label>
                <Input value={form.registeredAddress} onChange={(e) => setForm({ ...form, registeredAddress: e.target.value })} />
              </div>
              <div>
                <Label>Directors (comma separated)</Label>
                <Input value={form.directors} onChange={(e) => setForm({ ...form, directors: e.target.value })} />
              </div>
              <div>
                <Label>Company Secretary</Label>
                <Input value={form.companySecretary} onChange={(e) => setForm({ ...form, companySecretary: e.target.value })} />
              </div>
              <div>
                <Label>Financial Year End</Label>
                <Input type="date" value={form.financialYearEnd} onChange={(e) => setForm({ ...form, financialYearEnd: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Departments</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allDepartments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDept(dept)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      form.departments.includes(dept)
                        ? 'border-crimson-600 bg-crimson-600 text-white'
                        : 'border-brand-border bg-brand-surface text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    {getDepartmentLabel(dept)}
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Company</Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={!!selectedCompany} onClose={() => setSelectedCompany(null)}>
        {selectedCompany && (
          <>
            <DialogHeader>
              <div>
                <DialogTitle>{selectedCompany.name}</DialogTitle>
                <DialogDescription>{selectedCompany.registrationNo}</DialogDescription>
              </div>
              <DialogClose onClose={() => setSelectedCompany(null)} />
            </DialogHeader>
            <DialogContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <ProfileField label="Incorporation Date" value={selectedCompany.incorporationDate} />
                <ProfileField label="SSM State" value={selectedCompany.ssmState} />
                <ProfileField label="Financial Year End" value={selectedCompany.financialYearEnd || '—'} />
                <ProfileField label="Status" value={selectedCompany.active ? 'Active' : 'Inactive'} />
              </div>
              <ProfileField label="Registered Address" value={selectedCompany.registeredAddress} />
              <ProfileField label="Directors" value={selectedCompany.directors.join(', ') || '—'} />
              <ProfileField label="Company Secretary" value={selectedCompany.companySecretary} />
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-text">
                  <Users size={16} /> Contacts ({companyContacts.length})
                </h4>
                {companyContacts.length === 0 ? (
                  <p className="text-sm text-brand-muted">No contacts recorded.</p>
                ) : (
                  <div className="space-y-2">
                    {companyContacts.map((c) => (
                      <div key={c.id} className="rounded-lg border border-brand-border bg-brand-surface/50 p-3">
                        <div className="text-sm font-medium">
                          {c.name} {c.isPrimary && <Badge variant="success">Primary</Badge>}
                        </div>
                        <div className="text-xs text-brand-muted">
                          {c.role} • {c.email} • {c.phone} • {c.preferredChannel}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setSelectedCompany(null)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-brand-muted">{label}</div>
      <div className="mt-0.5 text-sm text-brand-text">{value}</div>
    </div>
  );
}

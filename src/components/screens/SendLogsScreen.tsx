import { useState } from 'react';
import type { Company, SendLog } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Badge } from '../ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { formatDateTime } from '../../lib/utils';
import { getChannelLabel } from '../../data/seed';
import { MailCheck, FileText, Fingerprint } from 'lucide-react';
import { buildProofPacket } from '../../lib/proofPacket';

export interface SendLogsScreenProps {
  companies: Company[];
  logs: SendLog[];
  onRunDueCheck: () => void;
}

export function SendLogsScreen({ companies, logs, onRunDueCheck }: SendLogsScreenProps) {
  const [selectedLog, setSelectedLog] = useState<SendLog | null>(null);
  const selectedPacket = selectedLog ? buildProofPacket(selectedLog) : null;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Send Logs / Evidence</h2>
          <p className="text-sm text-brand-muted">Timestamped database-backed proof records</p>
        </div>
        <Button onClick={onRunDueCheck}>
          <MailCheck size={16} /> Run Due Check
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sent At</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Evidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
              const company = companies.find((c) => c.id === log.companyId);
              return (
                <TableRow key={log.id} className="cursor-pointer" onClick={() => setSelectedLog(log)}>
                  <TableCell>{log.sentAt ? formatDateTime(log.sentAt) : formatDateTime(log.scheduledRunAt)}</TableCell>
                  <TableCell className="font-medium">{company?.name || log.companyId}</TableCell>
                  <TableCell>{log.recipient}</TableCell>
                  <TableCell>{getChannelLabel(log.channel)}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'failed' ? 'danger' : log.status === 'scheduled' ? 'warning' : 'success'}>{log.status === 'simulated' ? 'queued' : log.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-brand-muted">
                      <FileText size={14} />
                      {log.evidenceType}
                      
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selectedLog} onClose={() => setSelectedLog(null)}>
        {selectedLog && (
          <>
            <DialogHeader>
              <div>
                <DialogTitle>Message Snapshot</DialogTitle>
                <DialogDescription>
                  {selectedLog.providerMessageId ? `Provider ID: ${selectedLog.providerMessageId}` : 'Pending provider receipt'}
                </DialogDescription>
              </div>
              <DialogClose onClose={() => setSelectedLog(null)} />
            </DialogHeader>
            <DialogContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Recipient" value={selectedLog.recipient} />
                <Field label="Channel" value={getChannelLabel(selectedLog.channel)} />
                <Field label="Scheduled" value={formatDateTime(selectedLog.scheduledRunAt)} />
                <Field label="Sent At" value={selectedLog.sentAt ? formatDateTime(selectedLog.sentAt) : '—'} />
                <Field label="Sender" value={selectedLog.senderEmail || '—'} />
                <Field label="Evidence Type" value={selectedLog.evidenceType} />
              </div>
              <div className="rounded-lg border border-brand-border bg-brand-surface/50 p-4">
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-muted">Snapshot</div>
                <pre className="whitespace-pre-wrap text-sm text-brand-text">{selectedLog.messageSnapshot}</pre>
              </div>
              {selectedPacket && (
                <div className="rounded-lg border border-brand-border bg-brand-surface/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-muted"><Fingerprint size={14} /> Reviewer-safe packet</div>
                  <div className="font-mono text-sm text-brand-text">{selectedPacket.packetId}</div>
                  <p className="mt-2 text-xs text-brand-muted">{selectedPacket.statusLabel} · {selectedPacket.ageDays}d old · hashable non-secret export fields retained for audit review.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedPacket.authorityControls.map((control) => (
                      <span key={control} className="rounded-full bg-brand-panel px-2 py-1 text-xs text-brand-muted">{control}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">Authority control strip keeps staff identity, deterministic rule authority, no-send boundary, and no-secret export visible inside the evidence dialog.</p>
                </div>
              )}
           </DialogContent>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-brand-muted">{label}</div>
      <div className="mt-0.5 text-sm text-brand-text">{value}</div>
    </div>
  );
}

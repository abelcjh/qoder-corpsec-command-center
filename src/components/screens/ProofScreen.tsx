import type { SendLog } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileCheck } from 'lucide-react';

export interface ProofScreenProps {
  logs: SendLog[];
}

export function ProofScreen({ logs }: ProofScreenProps) {
  const simulated = logs.filter((l) => l.status === 'simulated').length;
  const delivered = logs.filter((l) => l.status === 'delivered').length;
  const failed = logs.filter((l) => l.status === 'failed').length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Qoder Proof / Evidence</h2>
        <p className="text-sm text-brand-muted">Proof-of-send summary and evidence retention policy</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Records</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileCheck size={20} className="text-crimson-500" />
              {logs.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Simulated</CardDescription>
            <CardTitle className="text-2xl">{simulated}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Delivered</CardDescription>
            <CardTitle className="text-2xl">{delivered}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-2xl">{failed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Retention Policy</CardTitle>
          <CardDescription>How proof is kept when clients are deactivated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-brand-text">
          <p>
            When a company is deactivated, all future scheduled jobs are paused or marked deactivated, but historical
            send logs and proof documents remain immutable. This matches CLPC’s operational need: client database is
            the source of truth, and evidence must survive billing or engagement changes.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-brand-muted">
            <li>Timestamps, recipients, senders, and snapshots are never deleted.</li>
            <li>Provider message IDs and Gmail printouts are stored as authoritative proof.</li>
            <li>Demo sends are explicitly marked so judges can distinguish simulation from live traffic.</li>
          </ul>
          <div className="mt-4 rounded-lg border border-crimson-800/50 bg-crimson-950/30 p-3">
            <Badge variant="warning">DEMO</Badge>
            <p className="mt-2 text-xs text-crimson-200/70">
              This prototype uses simulated sends only. No real email, WhatsApp, or SMS messages are transmitted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

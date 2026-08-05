import type { SendLog } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { FileCheck, Database } from 'lucide-react';

export interface ProofScreenProps {
  logs: SendLog[];
}

export function ProofScreen({ logs }: ProofScreenProps) {
  const gmailProof = logs.filter((l) => l.evidenceType === 'gmail_print').length;
  const providerProof = logs.filter((l) => l.providerMessageId).length;
  const failed = logs.filter((l) => l.status === 'failed').length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Qoder Proof / Evidence</h2>
        <p className="text-sm text-brand-muted">Database proof records and retention policy</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardDescription>Total Records</CardDescription><CardTitle className="flex items-center gap-2 text-2xl"><FileCheck size={20} className="text-crimson-500" />{logs.length}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Gmail Print Proof</CardDescription><CardTitle className="text-2xl">{gmailProof}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Provider IDs</CardDescription><CardTitle className="text-2xl">{providerProof}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Failed</CardDescription><CardTitle className="text-2xl">{failed}</CardTitle></CardHeader></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Retention Policy</CardTitle>
          <CardDescription>How proof is kept when clients are deactivated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-brand-text">
          <p>
            When a company is deactivated, future scheduled jobs are paused or marked deactivated, but historical
            send logs and proof documents remain immutable. This matches CLPC’s operational need: client database is
            the source of truth, and evidence must survive billing or engagement changes.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-brand-muted">
            <li>Timestamps, recipients, senders, and message snapshots are retained in Supabase.</li>
            <li>Provider message IDs and Gmail print documents are stored as authoritative proof.</li>
            <li>Deactivation affects future jobs only; old send logs remain queryable from the company profile.</li>
          </ul>
          <div className="mt-4 rounded-lg border border-emerald-800/50 bg-emerald-950/30 p-3 text-emerald-100">
            <div className="flex items-center gap-2 font-medium text-emerald-400"><Database size={16} /> Supabase evidence layer active</div>
            <p className="mt-2 text-xs text-emerald-200/70">The current records shown here are loaded from the CLPC Supabase cloud database.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

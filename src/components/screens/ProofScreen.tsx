import type { SendLog } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { FileCheck, Database, Fingerprint, ShieldCheck } from 'lucide-react';
import { summarizeProofPackets } from '../../lib/proofPacket';

export interface ProofScreenProps {
  logs: SendLog[];
}

export function ProofScreen({ logs }: ProofScreenProps) {
  const gmailProof = logs.filter((l) => l.evidenceType === 'gmail_print').length;
  const providerProof = logs.filter((l) => l.providerMessageId).length;
  const failed = logs.filter((l) => l.status === 'failed').length;
  const proofSummary = summarizeProofPackets(logs);
  const latestPacket = proofSummary.packets[0];

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
          <CardTitle className="flex items-center gap-2"><Fingerprint size={18} className="text-crimson-500" /> Reviewer-Safe Proof Packet</CardTitle>
          <CardDescription>10-second judge receipt: every reminder can be exported as a hashable, non-secret evidence bundle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatusTile label="Current" value={proofSummary.current} tone="emerald" />
            <StatusTile label="Expiring" value={proofSummary.expiring} tone="amber" />
            <StatusTile label="Stale" value={proofSummary.stale} tone="crimson" />
          </div>
          {latestPacket && (
            <div className="rounded-xl border border-brand-border bg-brand-surface/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-brand-muted">Latest packet ID</div>
                  <div className="mt-1 font-mono text-base text-brand-text">{latestPacket.packetId}</div>
                </div>
                <div className="rounded-full border border-emerald-800/50 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-200">
                  {latestPacket.statusLabel} · {latestPacket.ageDays}d old
                </div>
              </div>
              <p className="mt-3 text-brand-muted">{latestPacket.exportNote}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {latestPacket.evidenceFields.slice(0, 7).map((field) => (
                  <span key={field} className="rounded-full bg-brand-panel px-2 py-1 text-xs text-brand-muted">{field}</span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>


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


function StatusTile({ label, value, tone }: { label: string; value: number; tone: 'emerald' | 'amber' | 'crimson' }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-300' : 'text-crimson-300';
  return (
    <div className="rounded-lg border border-brand-border bg-brand-panel/70 p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-muted"><ShieldCheck size={14} /> {label}</div>
      <div className={`mt-1 text-2xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

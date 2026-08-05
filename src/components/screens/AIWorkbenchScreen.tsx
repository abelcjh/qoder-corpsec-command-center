import { useMemo, useState, type ElementType } from 'react';
import type { Company, ComplianceRule, ScheduledSendJob, SendLog, StaffUser } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BrainCircuit, CheckCircle2, ClipboardList, Loader2, ShieldAlert, Sparkles } from 'lucide-react';

type AIBrief = {
  executiveBrief: string;
  risks: string[];
  recommendedActions: string[];
  clientMessage: string;
  proofNotes: string[];
  mode?: string;
};

const governanceReceipts = [
  ['Deterministic record', 'Client, rule, schedule, owner, and proof-log state remain the source of truth in Credence, not in the model output.'],
  ['AI at the edge', 'Agnes drafts the executive brief, risks, next actions, and client wording from a bounded context packet only.'],
  ['Human approval', 'Every compliance action and external client message stays review-before-send; AI copy is advisory, editable, and non-legal advice.'],
  ['Fallback visible', 'If the Cloudflare/Agnes route is unavailable, the screen switches to a local deterministic fallback instead of blocking the demo.'],
];

export interface AIWorkbenchScreenProps {
  user: StaffUser;
  companies: Company[];
  rules: ComplianceRule[];
  jobs: ScheduledSendJob[];
  logs: SendLog[];
}

function localBrief(companies: Company[], jobs: ScheduledSendJob[], logs: SendLog[]): AIBrief {
  const activeClients = companies.filter((c) => c.active).length;
  const activeJobs = jobs.filter((j) => j.status === 'active').length;
  const gmailProof = logs.filter((l) => l.evidenceType === 'gmail_print').length;
  const staleJobs = jobs.filter((j) => j.status === 'active' && new Date(j.firstSendAt).getTime() < Date.now()).length;
  return {
    mode: 'Local deterministic fallback',
    executiveBrief: `Credence is monitoring ${activeClients} active clients, ${activeJobs} active reminder jobs, and ${logs.length} retained proof logs. The strongest next judge-visible story is the controlled loop: client record → department rule → scheduled job → evidence retained after deactivation.`,
    risks: [
      staleJobs > 0 ? `${staleJobs} active job(s) have first-send dates in the past; demo them as due-check candidates.` : 'No immediate overdue first-send dates found in the scoped queue.',
      gmailProof === 0 ? 'No Gmail print-document proof rows in this scope; emphasize provider IDs/message snapshots unless Gmail proof is available.' : `${gmailProof} Gmail print-document proof row(s) available for evidence narrative.`,
      'AI output is advisory only; final compliance action remains human-reviewed.',
    ],
    recommendedActions: [
      'Open Client Database, choose one company, then create/show a department-specific reminder job.',
      'Show Send Logs immediately after the queue to prove evidence retention, sender/recipient metadata, and provider IDs.',
      'Use the Qoder Build screen before closing the video so Qoder usage is visible, not merely claimed.',
    ],
    clientMessage: 'Hi, this is a reminder from the CLPC team. We are preparing the next compliance follow-up for your company record. Please confirm the latest responsible contact and any supporting documents required for the upcoming filing window.',
    proofNotes: ['Local rules generated this fallback because the Agnes endpoint was unavailable in this environment.', 'No secrets are sent to the browser; the deployed Cloudflare Function keeps the Agnes API key server-side.'],
  };
}

export function AIWorkbenchScreen({ user, companies, rules, jobs, logs }: AIWorkbenchScreenProps) {
  const [brief, setBrief] = useState<AIBrief>(() => localBrief(companies, jobs, logs));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCompany = useMemo(() => companies.find((c) => c.active) ?? companies[0], [companies]);
  const companyJobs = useMemo(() => jobs.filter((j) => !selectedCompany || j.companyId === selectedCompany.id), [jobs, selectedCompany]);
  const companyLogs = useMemo(() => logs.filter((l) => !selectedCompany || l.companyId === selectedCompany.id), [logs, selectedCompany]);

  async function generateBrief() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          user: { department: user.department, role: user.role },
          company: selectedCompany,
          jobs: companyJobs.slice(0, 8),
          logs: companyLogs.slice(0, 8),
          rules: rules.slice(0, 8),
        }),
      });
      if (!response.ok) throw new Error(`Agnes AI endpoint returned ${response.status}`);
      const data = (await response.json()) as AIBrief;
      setBrief({ ...localBrief(companies, jobs, logs), ...data, mode: data.mode ?? 'Agnes AI via Cloudflare Function' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AI request failed';
      setError(message);
      setBrief(localBrief(companies, jobs, logs));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="hero-panel overflow-hidden rounded-[2rem] border border-cream-200/10 p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Agnes AI workbench</Badge>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-cream-100 md:text-5xl">
            AI compliance copilot, constrained by audit evidence.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-cream-100/70 md:text-base">
            Generate a judge-visible briefing from the selected client, reminder queue, proof logs, and CLPC rules. Agnes AI drafts the messy narrative; Credence keeps the workflow deterministic, scoped, and human-reviewed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateBrief} disabled={loading} size="lg">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Generate Agnes briefing
            </Button>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-100">
              Key stays server-side in Cloudflare
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-700/50 bg-amber-950/30 p-3 text-sm text-amber-100">
          Agnes fallback active: {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldAlert size={18} className="text-emerald-400" /> AI governance receipt</CardTitle>
          <CardDescription>Enterprise-ready winner pattern: generative briefing at the edge, deterministic audit system in the middle</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {governanceReceipts.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="font-semibold text-brand-text">{label}</div>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit size={18} className="text-crimson-400" /> Executive AI brief</CardTitle>
            <CardDescription>{brief.mode}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-7 text-brand-text">{brief.executiveBrief}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selected client</CardTitle>
            <CardDescription>AI context packet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><span className="text-brand-muted">Company</span><div className="font-medium">{selectedCompany?.name ?? 'No client'}</div></div>
            <div><span className="text-brand-muted">Jobs in scope</span><div className="font-medium">{companyJobs.length}</div></div>
            <div><span className="text-brand-muted">Proof logs</span><div className="font-medium">{companyLogs.length}</div></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <InsightCard icon={ShieldAlert} title="Risks / exceptions" items={brief.risks} />
        <InsightCard icon={CheckCircle2} title="Recommended next actions" items={brief.recommendedActions} />
        <InsightCard icon={ClipboardList} title="Proof notes" items={brief.proofNotes} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-drafted client follow-up</CardTitle>
          <CardDescription>Editable wording for the human staff member to review before any real send</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-brand-border bg-black/20 p-4 text-sm leading-6 text-brand-text">
            {brief.clientMessage}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InsightCard({ icon: Icon, title, items }: { icon: ElementType; title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Icon size={18} className="text-crimson-400" /> {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={`${title}-${idx}`} className="rounded-xl border border-brand-border bg-brand-surface/35 p-3 text-sm leading-6 text-brand-text">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

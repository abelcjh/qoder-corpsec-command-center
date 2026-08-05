import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Film, Megaphone, Send, Trophy, CalendarDays } from 'lucide-react';

const rubric = [
  ['Use of Qoder', '30%', 'Spec-driven prompt, Qoder CLI build session, build ledger, verification logs, reusable workflow proof, and Qoder Security checkpoint.'],
  ['Innovation & Creativity', '25%', 'Malaysia-first corporate-secretarial reminder platform with department-scoped workflows and evidence retention.'],
  ['Impact', '20%', 'Social reach and engagement from LinkedIn/X post; real CLPC/industry validation angle.'],
  ['Technical Execution', '15%', 'Supabase-backed staff login, client database, scheduled jobs, proof logs, build + verify passing.'],
  ['Presentation & UGC', '10%', '2–3 minute demo video, correct tags, clear product story, screenshots.'],
];

const requirements = [
  ['Social post', 'Required', 'Post on LinkedIn or X about the project. Describe what Credence does and share the Qoder build experience.'],
  ['Tags', 'Required', 'Tag @QoderOfficial and @AlibabaCloud.'],
  ['Hashtags', 'Required', '#QoderHackathon #BuildWithQoder'],
  ['Demo video', 'Required', '2–3 minutes. Show the project in action, explain the problem, demonstrate key features. Upload to YouTube, Loom, or Vimeo.'],
  ['Submission form', 'Required', 'Submit both the social post URL and demo video link via the organizer form before Aug 5.'],
];

const marketFindings = [
  {
    source: 'Officio Malaysia',
    url: 'https://getofficio.today/',
    signal: 'Malaysian company-secretary tools already sell client portals, date tracking, and automatic statutory reminders.',
    credenceAngle: 'Lead with proof retention and department-scoped reminder operations, not another generic calendar.',
  },
  {
    source: 'CA-Kompas',
    url: 'https://ca-kompas.com/',
    signal: 'Local accounting/company-secretary buyers expect client databases, 80+ fields, compliance tracking, and email/SMS notifications.',
    credenceAngle: 'Show the client database as the operational source of truth and make every reminder produce auditable evidence.',
  },
  {
    source: 'iCorpSec',
    url: 'https://icorpsec.com/',
    signal: 'Singapore/Malaysia competitors are moving toward AI drafting and compliance scanners.',
    credenceAngle: 'Differentiate as a human-approved command center where AI assists messy intake while deterministic rules create the deadline/job/proof trail.',
  },
  {
    source: 'Qoder Security',
    url: 'https://docs.qoder.com/qoder-security-guide',
    signal: 'Qoder positions L1/L2/L3 security scans as staged review from coding loop to pre-push handoff.',
    credenceAngle: 'Show a rule-clean security checkpoint: Qoder-built code, human review, build+verify receipt, and scan/credit limitation noted honestly.',
  },
];

const demoScenes = [
  'Open polished staff login; call out Supabase-seeded credentials and CLPC database connection.',
  'Login as admin; show dashboard stats, active clients, scheduled jobs, and proof logs.',
  'Switch to Client Database; open a company profile and show departments/contacts.',
  'Create or show a predefined compliance rule; explain client database is the source of truth, not invoices.',
  'Create a New Send Job with working-day recurrence and editable body preview.',
  'Show Send Logs / Evidence: provider IDs, sender/recipient, message snapshot, Gmail print-document status.',
  'Open Qoder Build Ledger: explain spec-driven Qoder workflow, CLI build, verification, Qoder Security checkpoint, and reusable artifacts.',
];

const socialDraft = `I built Credence for the Alibaba Cloud x Qoder Hackathon Singapore 2026 — a Malaysia-first corporate-secretarial compliance workflow platform for firms like CLPC.\n\nThe app turns client company records into department-scoped reminder jobs, scheduled queues, and defensible evidence logs: who reminded whom, when, under which rule, with what proof, and what remains at risk.\n\nQoder was central to the build: I used a clear spec, Qoder CLI/agentic workflow, verification loops, and a security-review checkpoint to upgrade the app into a Supabase-backed React/Tailwind platform with staff credentials, client profiles, scheduled jobs, and proof records.\n\n@QoderOfficial @AlibabaCloud #QoderHackathon #BuildWithQoder`;

export function SubmissionPackScreen() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Submission Pack</h2>
          <p className="text-sm text-brand-muted">Organizer requirements mapped directly to Credence artifacts</p>
        </div>
        <Badge variant="warning">Deadline: Aug 5</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> Judging rubric coverage</CardTitle>
            <CardDescription>From the organizer master deck</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rubric.map(([name, weight, coverage]) => (
              <div key={name} className="grid gap-3 rounded-xl border border-brand-border bg-brand-surface/40 p-3 sm:grid-cols-[5rem_12rem_1fr]">
                <div className="text-xl font-semibold text-crimson-400">{weight}</div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-brand-muted">{coverage}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays size={18} className="text-crimson-500" /> Key dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-3"><div className="font-semibold">Jul 22</div><div className="text-brand-muted">Onsite hackathon day</div></div>
            <div className="rounded-xl border border-crimson-800/50 bg-crimson-950/30 p-3"><div className="font-semibold text-crimson-300">Aug 5</div><div className="text-crimson-100/75">UGC + submission links due</div></div>
            <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-3"><div className="font-semibold">Aug 8</div><div className="text-brand-muted">Winners announced</div></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Send size={18} className="text-crimson-500" /> Required submission items</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {requirements.map(([item, status, detail]) => (
            <div key={item} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-3"><div className="font-medium">{item}</div><Badge variant="success">{status}</Badge></div>
              <p className="text-sm text-brand-muted">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy size={18} className="text-crimson-500" /> Competitor calibration</CardTitle>
          <CardDescription>Why this entry is positioned beyond a standard reminder calendar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-3">
          {marketFindings.map((finding) => (
            <div key={finding.source} className="rounded-xl border border-brand-border bg-brand-surface/40 p-4">
              <a href={finding.url} className="text-sm font-semibold text-crimson-300 underline-offset-4 hover:underline" target="_blank" rel="noreferrer">{finding.source}</a>
              <p className="mt-2 text-sm text-brand-muted">{finding.signal}</p>
              <p className="mt-3 text-sm text-brand-text"><span className="font-medium">Credence angle:</span> {finding.credenceAngle}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Film size={18} className="text-crimson-500" /> 2–3 minute video structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {demoScenes.map((scene, idx) => (
                <li key={scene} className="flex gap-3 text-sm text-brand-text"><span className="text-crimson-400">{idx + 1}</span><span>{scene}</span></li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Megaphone size={18} className="text-crimson-500" /> Social post draft</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-xl border border-brand-border bg-brand-surface/50 p-4 text-sm leading-6 text-brand-text">{socialDraft}</pre>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Final link checklist</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-brand-text sm:grid-cols-2">
          <ChecklistItem>public social post URL</ChecklistItem>
          <ChecklistItem>2–3 minute video link</ChecklistItem>
          <ChecklistItem>repository or deploy URL if form allows</ChecklistItem>
          <ChecklistItem>screenshots attached to post for engagement</ChecklistItem>
        </CardContent>
      </Card>
    </div>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface/40 p-3"><CheckCircle2 size={16} className="text-emerald-500" /> {children}</div>;
}

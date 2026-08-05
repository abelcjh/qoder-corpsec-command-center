import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Wrench, CheckCircle2, FileCode2, Database, ShieldCheck, TestTube2 } from 'lucide-react';

export function BuildLedgerScreen() {
  const artifacts = [
    {
      phase: 'Architecture',
      items: [
        'Supabase schema with RLS notes (supabase/schema.sql)',
        'Supabase cloud client adapter wired through .env.local (src/lib/supabase.ts)',
        'TypeScript domain types covering staff, companies, contacts, rules, jobs, logs, proofs',
      ],
    },
    {
      phase: 'Reminder Engine',
      items: [
        'createScheduledSendJob with deterministic ID',
        'buildScheduledSendJobRuns using working-day recurrence',
        'due-send checker with deduplication',
        'recordSendProof with snapshot, provider ID, and evidence type',
      ],
    },
    {
      phase: 'UI / Screens',
      items: [
        'Tailwind + custom shadcn-inspired component library',
        'Login with department scoping',
        'Command Dashboard, Client Database, Company Profile drawer',
        'Rules Library, New Send Job modal with preview',
        'Scheduled Queue, Send Logs, Evidence, Build Ledger',
      ],
    },
    {
      phase: 'Interactivity',
      items: [
        'Login changes department scope',
        'Create company / job with Supabase persistence where supported',
        'Run due-check or record proof preview',
        'Deactivate company stops future jobs but retains logs',
      ],
    },
    {
      phase: 'Verification',
      items: [
        'Automated verify script for reminder engine, auth scoping, deactivation, fixtures',
        'npm run build passes TypeScript strict mode',
      ],
    },
    {
      phase: 'Security / Review',
      items: [
        'Qoder Security checkpoint mapped to L1 static, L2 lightweight, and L3 deep scan docs',
        'No secrets committed; Supabase credentials stay in .env.local',
        'Human review boundary preserved for compliance actions and paid/credit-consuming scans',
      ],
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Qoder Build Ledger</h2>
        <p className="text-sm text-brand-muted">Artifacts and capabilities delivered in this build session</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={Wrench} label="UI Components" value="10+" />
        <MetricCard icon={Database} label="Tables" value="8" />
        <MetricCard icon={ShieldCheck} label="Staff Users" value="5" />
        <MetricCard icon={TestTube2} label="Verify Tests" value="20+" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {artifacts.map((group) => (
          <Card key={group.phase}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode2 size={18} className="text-crimson-500" />
                {group.phase}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-brand-text">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Qoder Usage Notes</CardTitle>
          <CardDescription>How Qoder was used for this hackathon build</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-brand-text">
          <p>
            Qoder scaffolded the upgraded full-stack prototype end-to-end: dependency setup, Tailwind theming,
            Supabase integration, reminder engine, screen components, fixture-backed local state, verification tests, and
            documentation. All changes are kept inside this repository. The security checkpoint is documented honestly: run Qoder L2/L3 scan if access/credits allow, otherwise show build+verify and human review as the current receipt.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="info">React 18</Badge>
            <Badge variant="info">TypeScript</Badge>
            <Badge variant="info">Tailwind CSS</Badge>
            <Badge variant="info">Supabase</Badge>
            <Badge variant="info">Vite</Badge>
            <Badge variant="warning">Fixture-safe Sends</Badge>
            <Badge variant="info">Qoder Security Checkpoint</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Icon size={20} className="text-crimson-500" />
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

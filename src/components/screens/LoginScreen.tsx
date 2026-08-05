import { useState } from 'react';
import type { StaffUser } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Badge } from '../ui/Badge';
import { Shield, Database, LockKeyhole, Users, Sparkles } from 'lucide-react';

export interface LoginScreenProps {
  staffUsers: StaffUser[];
  loading?: boolean;
  error?: string;
  onLogin: (username: string, password: string) => boolean;
  onRetry?: () => void;
}

const credentialHints = [
  ['admin', 'admin123', 'all departments'],
  ['tax', 'tax123', 'tax only'],
  ['audit', 'audit123', 'audit only'],
  ['accounts', 'accounts123', 'accounting only'],
  ['corpsec', 'corpsec123', 'corp sec only'],
];

export function LoginScreen({ staffUsers, loading, error, onLogin, onRetry }: LoginScreenProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    setLoginError(!ok);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0908] text-cream-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(165,28,48,0.28),transparent_32%),radial-gradient(circle_at_85%_5%,rgba(255,248,240,0.10),transparent_24%),linear-gradient(135deg,#0b0908_0%,#17110f_45%,#080808_100%)]" />
      <div className="absolute left-8 top-8 hidden h-64 w-64 rounded-full border border-crimson-800/40 lg:block" />
      <div className="absolute bottom-[-8rem] right-[-4rem] h-96 w-96 rounded-full bg-crimson-950/40 blur-3xl" />

      <main className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cream-200/15 bg-cream-100/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cream-200/70">
            <Database size={14} /> Supabase cloud connected
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.95] text-cream-50 md:text-7xl">
              Credence command center
            </h1>
            <p className="max-w-xl text-lg leading-8 text-cream-100/72">
              Staff-authenticated corporate-secretarial reminder workflows for CLPC: client database, rules, scheduled queue, and proof logs backed by seeded cloud rows.
            </p>
          </div>
          <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
            <ProofChip icon={<Users size={18} />} title={`${staffUsers.length || '—'} staff`} body="credentials seeded" />
            <ProofChip icon={<Database size={18} />} title="Supabase" body="live database" />
            <ProofChip icon={<Sparkles size={18} />} title="Qoder build" body="proof ledger ready" />
          </div>
        </section>

        <Card className="border-cream-100/12 bg-[#fff8f0] text-[#211a17] shadow-[0_24px_90px_rgba(0,0,0,0.5)]">
          <CardHeader className="border-b border-[#e8ded0] pb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a51c30] text-white shadow-lg shadow-crimson-900/30">
                  <Shield size={24} />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-[#17110f]">Staff login</h2>
                <p className="mt-1 text-sm text-[#725f55]">Use the database-seeded staff credentials below.</p>
              </div>
              <Badge variant="success">Cloud DB</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            {loading ? (
              <div className="rounded-xl border border-[#e8ded0] bg-[#fbf3e8] p-4 text-sm text-[#725f55]">Loading staff users from Supabase…</div>
            ) : error ? (
              <div className="space-y-3 rounded-xl border border-crimson-200 bg-crimson-50 p-4 text-sm text-crimson-900">
                <div className="font-semibold">Database connection failed</div>
                <div>{error}</div>
                {onRetry && <Button type="button" onClick={onRetry}>Retry connection</Button>}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-[#3a302b]">Username</Label>
                  <Input className="border-[#d8c7b5] bg-white text-[#17110f] placeholder:text-[#9b897b]" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                </div>
                <div>
                  <Label className="text-[#3a302b]">Password</Label>
                  <Input className="border-[#d8c7b5] bg-white text-[#17110f] placeholder:text-[#9b897b]" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                </div>
                {loginError && <p className="text-sm font-medium text-crimson-700">Invalid database credential.</p>}
                <Button type="submit" className="h-12 w-full bg-[#a51c30] text-base hover:bg-[#7f1525]">
                  <LockKeyhole size={18} /> Enter platform
                </Button>
              </form>
            )}

            <div className="rounded-2xl border border-[#e8ded0] bg-[#fbf3e8] p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8c7668]">seeded credentials</div>
              <div className="grid gap-2">
                {credentialHints.map(([u, p, scope]) => (
                  <button key={u} type="button" onClick={() => { setUsername(u); setPassword(p); setLoginError(false); }} className="flex items-center justify-between rounded-xl border border-[#eadccb] bg-white px-3 py-2 text-left text-sm transition hover:border-[#a51c30]/40 hover:bg-[#fffaf2]">
                    <span><strong>{u}</strong> / {p}</span>
                    <span className="text-xs text-[#8c7668]">{scope}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function ProofChip({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-cream-100/12 bg-cream-100/5 p-4 backdrop-blur">
      <div className="mb-3 text-crimson-300">{icon}</div>
      <div className="font-semibold text-cream-50">{title}</div>
      <div className="text-xs uppercase tracking-[0.18em] text-cream-200/45">{body}</div>
    </div>
  );
}

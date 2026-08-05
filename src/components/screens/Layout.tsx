import { cn } from '../../lib/utils';
import type { StaffUser } from '../../types';
import { getDepartmentLabel } from '../../data/seed';
import { Button } from '../ui/Button';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  CalendarClock,
  MailCheck,
  FileCheck,
  Wrench,
  Send,
  LogOut,
  Shield,
} from 'lucide-react';

export type Screen =
  | 'dashboard'
  | 'clients'
  | 'rules'
  | 'queue'
  | 'logs'
  | 'proof'
  | 'build-ledger'
  | 'submission';

export interface LayoutProps {
  user: StaffUser;
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const navItems: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Client Database', icon: Building2 },
  { id: 'rules', label: 'Rules Library', icon: BookOpen },
  { id: 'queue', label: 'Scheduled Queue', icon: CalendarClock },
  { id: 'logs', label: 'Send Logs', icon: MailCheck },
  { id: 'proof', label: 'Evidence', icon: FileCheck },
  { id: 'build-ledger', label: 'Qoder Build', icon: Wrench },
  { id: 'submission', label: 'Submission Pack', icon: Send },
];

export function Layout({ user, screen, onNavigate, onLogout, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <aside className="hidden w-60 flex-col border-r border-brand-border bg-brand-card lg:flex">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-brand-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson-600">
            <Shield className="text-white" size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold">Credence</div>
            <div className="text-xs text-brand-muted">CorpSec OS</div>
          </div>
        </div>

        <nav className="flex-1 overflow-auto p-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  screen === item.id
                    ? 'bg-brand-surface text-brand-text'
                    : 'text-brand-muted hover:bg-brand-surface/50 hover:text-brand-text'
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-brand-border p-4">
          <div className="mb-3 text-xs text-brand-muted">
            <div className="font-medium text-brand-text">{user.fullName}</div>
            <div>{getDepartmentLabel(user.department)}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="w-full justify-start">
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-brand-border bg-brand-card px-5 py-3 lg:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-crimson-600">
              <Shield className="text-white" size={16} />
            </div>
            <span className="font-semibold">Credence</span>
          </div>
          <h1 className="hidden text-base font-semibold lg:block">
            {navItems.find((n) => n.id === screen)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <span className="badge bg-ink-800 text-brand-text">
              {getDepartmentLabel(user.department)}
            </span>
            <Button variant="secondary" size="sm" onClick={onLogout} className="hidden sm:flex">
              <LogOut size={16} />
              Log out
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

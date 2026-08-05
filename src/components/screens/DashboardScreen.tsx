import type { Company, ScheduledSendJob, SendLog, StaffUser } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import {
  getDepartmentLabel,
} from '../../data/seed';
import { Building2, CalendarClock, MailCheck, Database } from 'lucide-react';

export interface DashboardScreenProps {
  user: StaffUser;
  companies: Company[];
  jobs: ScheduledSendJob[];
  logs: SendLog[];
}

export function DashboardScreen({ user, companies, jobs, logs }: DashboardScreenProps) {
  const activeCompanies = companies.filter((c) => c.active).length;
  const inactiveCompanies = companies.length - activeCompanies;
  const activeJobs = jobs.filter((j) => j.status === 'active').length;
  const evidenceLogs = logs.length;

  const upcomingJobs = [...jobs]
    .filter((j) => j.status === 'active')
    .sort((a, b) => new Date(a.firstSendAt).getTime() - new Date(b.firstSendAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Department Scope</CardDescription>
            <CardTitle className="text-lg">{getDepartmentLabel(user.department)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-brand-muted">
              {user.department === 'admin'
                ? 'Full access across all departments.'
                : `Viewing clients tagged for ${getDepartmentLabel(user.department).toLowerCase()}.`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Clients</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building2 size={20} className="text-crimson-500" />
              {activeCompanies}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inactiveCompanies > 0 && (
              <p className="text-xs text-brand-muted">{inactiveCompanies} deactivated</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Jobs</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CalendarClock size={20} className="text-crimson-500" />
              {activeJobs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-brand-muted">Scheduled reminder sequences</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Proof Logs</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MailCheck size={20} className="text-crimson-500" />
              {evidenceLogs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-brand-muted">Database-backed send evidence</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Active Jobs</CardTitle>
            <CardDescription>Next scheduled reminders in your department scope</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingJobs.length === 0 ? (
              <p className="text-sm text-brand-muted">No active jobs found.</p>
            ) : (
              <div className="space-y-3">
                {upcomingJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between rounded-lg border border-brand-border bg-brand-surface/50 p-3"
                  >
                    <div>
                      <div className="text-sm font-medium">{job.subject}</div>
                      <div className="text-xs text-brand-muted">
                        {job.channel} • every {job.everyNWorkingDays} working days
                      </div>
                    </div>
                    <Badge variant="info">{formatDate(job.firstSendAt)}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-800/50 bg-emerald-950/30 p-3">
              <Database size={18} className="mt-0.5 text-emerald-400" />
              <div className="text-sm text-emerald-100">
                <strong className="text-emerald-400">Supabase cloud connected</strong>
                <p className="mt-1 text-xs text-emerald-200/70">
                  Staff credentials, client profiles, scheduled jobs, and proof logs are loaded from the CLPC cloud database.
                </p>
              </div>
            </div>
            <div className="text-xs text-brand-muted">
              <p>Logs retained when companies are deactivated.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

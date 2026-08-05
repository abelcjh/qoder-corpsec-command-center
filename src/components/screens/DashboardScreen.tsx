import type { Company, ScheduledSendJob, SendLog, StaffUser } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import {
  getDepartmentLabel,
} from '../../data/seed';
import { Building2, CalendarClock, MailCheck, AlertTriangle } from 'lucide-react';

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
  const simulatedLogs = logs.filter((l) => l.status === 'simulated').length;

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
            <CardDescription>Simulated Sends</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MailCheck size={20} className="text-crimson-500" />
              {simulatedLogs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-brand-muted">Demo sends recorded as proof</p>
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
            <div className="flex items-start gap-3 rounded-lg border border-amber-800/50 bg-amber-950/30 p-3">
              <AlertTriangle size={18} className="mt-0.5 text-amber-400" />
              <div className="text-sm text-amber-100">
                <strong className="text-amber-400">Demo mode active</strong>
                <p className="mt-1 text-xs text-amber-200/70">
                  Supabase not configured. All sends are simulated and marked as demo evidence.
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

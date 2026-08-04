import type { ComplianceTask } from '../types';
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  tasks: ComplianceTask[];
}

export default function StatsBar({ tasks }: Props) {
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const overdue = tasks.filter((t) => t.status === 'overdue').length;
  const total = tasks.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <section className="card stats-bar">
      <div className="stats-header">
        <h3>Compliance Progress</h3>
        <span className="stats-pct">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="stats-grid">
        <div className="stat">
          <CheckCircle2 size={16} className="text-green" />
          <span className="stat-count">{completed}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat">
          <Loader2 size={16} className="text-blue" />
          <span className="stat-count">{inProgress}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <Clock size={16} className="text-amber" />
          <span className="stat-count">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <AlertCircle size={16} className="text-red" />
          <span className="stat-count">{overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>
    </section>
  );
}

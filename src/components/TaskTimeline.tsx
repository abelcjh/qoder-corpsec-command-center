import type { ComplianceTask } from '../types';
import { CheckCircle2, Circle, Loader2, AlertTriangle, Paperclip } from 'lucide-react';

interface Props {
  tasks: ComplianceTask[];
  selectedTaskId: string | null;
  onSelect: (id: string) => void;
}

const statusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle2 size={18} className="status-icon green" />;
    case 'in_progress': return <Loader2 size={18} className="status-icon blue" />;
    case 'overdue': return <AlertTriangle size={18} className="status-icon red" />;
    default: return <Circle size={18} className="status-icon gray" />;
  }
};

const categoryBadge = (cat: string) => {
  const map: Record<string, string> = {
    statutory: 'Statutory',
    governance: 'Governance',
    audit: 'Audit',
    tax: 'Tax',
    filing: 'Filing',
  };
  return <span className={`cat-badge cat-${cat}`}>{map[cat] ?? cat}</span>;
};

export default function TaskTimeline({ tasks, selectedTaskId, onSelect }: Props) {
  const sorted = [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <section className="card task-timeline">
      <h2 className="card-title">Task Timeline</h2>
      <div className="timeline-list">
        {sorted.map((task) => (
          <button
            key={task.id}
            className={`timeline-item ${selectedTaskId === task.id ? 'selected' : ''}`}
            onClick={() => onSelect(task.id)}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-row">
                {statusIcon(task.status)}
                <span className="timeline-title">{task.title}</span>
                {task.evidence.length > 0 && (
                  <span className="evidence-count" title={`${task.evidence.length} evidence`}>
                    <Paperclip size={12} /> {task.evidence.length}
                  </span>
                )}
              </div>
              <div className="timeline-meta">
                {categoryBadge(task.category)}
                <span className="timeline-date">{task.dueDate}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

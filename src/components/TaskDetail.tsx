import { useState } from 'react';
import type { ComplianceTask, TaskStatus } from '../types';
import { FileText, User, Calendar, BookOpen, Sparkles, Paperclip, Plus } from 'lucide-react';

interface Props {
  task: ComplianceTask;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onAddEvidence: (taskId: string, note: string, artifactRef: string) => void;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

export default function TaskDetail({ task, onUpdateStatus, onAddEvidence }: Props) {
  const [note, setNote] = useState('');
  const [artifact, setArtifact] = useState('');

  const handleAddEvidence = () => {
    if (!note.trim()) return;
    onAddEvidence(task.id, note.trim(), artifact.trim() || 'note.txt');
    setNote('');
    setArtifact('');
  };

  return (
    <section className="card task-detail">
      <div className="detail-header">
        <h2 className="card-title"><FileText size={18} /> {task.title}</h2>
        <span className={`status-pill status-${task.status}`}>{task.status.replace('_', ' ')}</span>
      </div>

      <p className="detail-desc">{task.description}</p>

      <div className="detail-meta-grid">
        <div className="meta-item">
          <User size={14} /> <span className="meta-label">Owner:</span>
          <span className="meta-value">{task.owner}</span>
        </div>
        <div className="meta-item">
          <Calendar size={14} /> <span className="meta-label">Due:</span>
          <span className="meta-value">{task.dueDate}</span>
        </div>
        {task.ssmRef && (
          <div className="meta-item">
            <BookOpen size={14} /> <span className="meta-label">SSM Ref:</span>
            <span className="meta-value mono">{task.ssmRef}</span>
          </div>
        )}
        {task.actRef && (
          <div className="meta-item">
            <BookOpen size={14} /> <span className="meta-label">Act Ref:</span>
            <span className="meta-value mono">{task.actRef}</span>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h3>Status</h3>
        <div className="status-buttons">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              className={`status-btn ${task.status === opt.value ? 'active' : ''}`}
              onClick={() => onUpdateStatus(task.id, opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {task.aiDraft && (
        <div className="detail-section ai-section">
          <h3>
            <Sparkles size={16} /> AI Draft Summary
            <span className="ai-badge">AI-Generated — Review Required</span>
          </h3>
          <div className="ai-draft-box">
            <p>{task.aiDraft}</p>
          </div>
        </div>
      )}

      <div className="detail-section">
        <h3><Paperclip size={16} /> Evidence ({task.evidence.length})</h3>
        <div className="evidence-list">
          {task.evidence.length === 0 && (
            <p className="empty-evidence">No evidence attached yet.</p>
          )}
          {task.evidence.map((ev) => (
            <div key={ev.id} className="evidence-item">
              <div className="evidence-note">{ev.note}</div>
              <div className="evidence-meta">
                <span className="evidence-ref">{ev.artifactRef}</span>
                <span className="evidence-by">{ev.addedBy}</span>
                <span className="evidence-time">{new Date(ev.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="evidence-form">
          <h4><Plus size={14} /> Add Evidence Note</h4>
          <textarea
            placeholder="Describe the evidence or action taken..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
          <div className="evidence-form-row">
            <input
              placeholder="Artifact reference (e.g. invoice_2026.pdf)"
              value={artifact}
              onChange={(e) => setArtifact(e.target.value)}
            />
            <button className="btn-primary" onClick={handleAddEvidence} disabled={!note.trim()}>
              Attach
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

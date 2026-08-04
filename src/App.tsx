import { useState } from 'react';
import { fixtureCompany } from './data/company';
import { fixtureComplianceEvent } from './data/complianceEvents';
import { initialLedger } from './data/auditLedger';
import { fixtureReview } from './data/reviewSummary';
import type { ComplianceTask, EvidenceEntry, AuditLedgerEntry, TaskStatus } from './types';
import CompanyProfile from './components/CompanyProfile';
import TaskTimeline from './components/TaskTimeline';
import TaskDetail from './components/TaskDetail';
import AuditLedger from './components/AuditLedger';
import ReviewPanel from './components/ReviewPanel';
import StatsBar from './components/StatsBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<ComplianceTask[]>(fixtureComplianceEvent.tasks);
  const [ledger, setLedger] = useState<AuditLedgerEntry[]>(initialLedger);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? null;

  const addLedgerEntry = (action: string, taskId: string, detail: string, evidenceId?: string) => {
    const entry: AuditLedgerEntry = {
      timestamp: new Date().toISOString(),
      actor: 'Lee Wei Ming',
      action,
      taskId,
      evidenceId,
      detail,
    };
    setLedger((prev) => [...prev, entry]);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    addLedgerEntry('STATUS_CHANGED', taskId, `Task status changed to "${status}"`);
  };

  const addEvidence = (taskId: string, note: string, artifactRef: string) => {
    const evidenceId = `ev-${taskId}-${Date.now()}`;
    const entry: EvidenceEntry = {
      id: evidenceId,
      taskId,
      note,
      artifactRef,
      timestamp: new Date().toISOString(),
      addedBy: 'Lee Wei Ming',
    };
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, evidence: [...t.evidence, entry] } : t
      )
    );
    addLedgerEntry('EVIDENCE_ADDED', taskId, `Evidence added: ${note.slice(0, 80)}`, evidenceId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#DC2626" />
              <path d="M7 14L12 19L21 9" stroke="#FFF8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="header-title">CorpSec Command Center</span>
          </div>
          <span className="header-subtitle">Compliance Workflow Cockpit</span>
        </div>
        <div className="header-right">
          <span className="header-badge">{fixtureCompany.name}</span>
          <span className="header-badge outline">{fixtureComplianceEvent.name}</span>
        </div>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <CompanyProfile company={fixtureCompany} />
          <StatsBar tasks={tasks} />
          <TaskTimeline
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            onSelect={setSelectedTaskId}
          />
        </div>

        <div className="right-panel">
          {selectedTask ? (
            <TaskDetail
              task={selectedTask}
              onUpdateStatus={updateTaskStatus}
              onAddEvidence={addEvidence}
            />
          ) : (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <p>Select a task from the timeline to view details, update status, and attach evidence.</p>
            </div>
          )}
          <AuditLedger entries={ledger} />
          <ReviewPanel review={fixtureReview} />
        </div>
      </main>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { useAppStore } from './lib/store';
import { LoginScreen } from './components/screens/LoginScreen';
import { Layout, type Screen } from './components/screens/Layout';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ClientDatabaseScreen } from './components/screens/ClientDatabaseScreen';
import { RulesLibraryScreen } from './components/screens/RulesLibraryScreen';
import { ScheduledQueueScreen } from './components/screens/ScheduledQueueScreen';
import { SendLogsScreen } from './components/screens/SendLogsScreen';
import { ProofScreen } from './components/screens/ProofScreen';
import { BuildLedgerScreen } from './components/screens/BuildLedgerScreen';
import { SubmissionPackScreen } from './components/screens/SubmissionPackScreen';
import { AIWorkbenchScreen } from './components/screens/AIWorkbenchScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const store = useAppStore();
  const { state, login, logout } = store;

  if (!state.currentUser) {
    return (
      <LoginScreen
        staffUsers={state.staffUsers}
        loading={state.loading}
        error={state.error}
        onRetry={store.refreshCloud}
        onLogin={(username, password) => login(username, password)}
      />
    );
  }

  return (
    <Layout user={state.currentUser} screen={screen} onNavigate={setScreen} onLogout={logout}>
      {state.error && (
        <div className="mb-4 rounded-xl border border-crimson-800/60 bg-crimson-950/40 p-3 text-sm text-crimson-100">
          Database notice: {state.error}
        </div>
      )}
      {screen === 'dashboard' && (
        <DashboardScreen
          user={state.currentUser}
          companies={store.scopedCompanies}
          jobs={store.scopedJobs}
          logs={store.scopedLogs}
        />
      )}
      {screen === 'clients' && (
        <ClientDatabaseScreen
          companies={store.scopedCompanies}
          contacts={state.contacts}
          onCreateCompany={(input) => store.createCompany({ ...input, sicCodes: [] })}
          onDeactivate={store.deactivateCompany}
          onReactivate={store.reactivateCompany}
        />
      )}
      {screen === 'rules' && <RulesLibraryScreen rules={store.scopedRules} onCreateRule={store.createRule} />}
      {screen === 'queue' && (
        <ScheduledQueueScreen
          user={state.currentUser}
          companies={store.scopedCompanies}
          contacts={state.contacts}
          rules={store.scopedRules}
          jobs={store.scopedJobs}
          onCreateJob={store.createJob}
          onRecordProofPreview={store.simulateJobNow}
        />
      )}
      {screen === 'logs' && (
        <SendLogsScreen companies={store.scopedCompanies} logs={store.scopedLogs} onRunDueCheck={() => store.simulateCron(new Date('2026-12-31T23:59:00+08:00'))} />
      )}
      {screen === 'proof' && <ProofScreen logs={store.scopedLogs} />}
      {screen === 'ai' && (
        <AIWorkbenchScreen
          user={state.currentUser}
          companies={store.scopedCompanies}
          rules={store.scopedRules}
          jobs={store.scopedJobs}
          logs={store.scopedLogs}
        />
      )}
      {screen === 'build-ledger' && <BuildLedgerScreen />}
      {screen === 'submission' && <SubmissionPackScreen />}
    </Layout>
  );
}

export default App;

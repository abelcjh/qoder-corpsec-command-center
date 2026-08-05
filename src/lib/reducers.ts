import type { AppState } from '../types';

export function deactivateCompanyReducer(state: AppState, companyId: string): AppState {
  return {
    ...state,
    companies: state.companies.map((c) => (c.id === companyId ? { ...c, active: false } : c)),
    jobs: state.jobs.map((j) =>
      j.companyId === companyId && j.status === 'active' ? { ...j, status: 'deactivated' as const } : j
    ),
  };
}

export function reactivateCompanyReducer(state: AppState, companyId: string): AppState {
  return {
    ...state,
    companies: state.companies.map((c) => (c.id === companyId ? { ...c, active: true } : c)),
  };
}

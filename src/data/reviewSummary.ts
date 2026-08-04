import type { ReviewSummary } from '../types';

export const fixtureReview: ReviewSummary = {
  reviewer: 'Lee Wei Ming (MAISAC No. MA-00456)',
  reviewedAt: '2026-08-01T16:00:00Z',
  findings: [
    'Annual return and statutory registers are current and lodged.',
    'Audited FS pending director sign-off — draft received from external auditors.',
    'AGM notice circulated; quorum expected.',
    'Beneficial ownership declaration requires final confirmation from Siti.',
    'Tax filing deadline (Jul 31) approaching — chargeable income computed.',
    'EPF/SOCSO audit pending; no known arrears as of Q2.',
  ],
  approved: false,
  notes: 'Overall compliance posture is on track. Three items require action before end of July. Recommend prioritizing FS sign-off and tax filing. No critical overdue items at this review date.',
};

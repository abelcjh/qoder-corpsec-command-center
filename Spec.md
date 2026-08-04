# Technical Specification — CorpSec Command Center

## 1. Purpose

A local web application that serves as a compliance workflow cockpit for Malaysian SMEs (Sdn Bhd entities). It guides company secretaries through annual compliance obligations with deterministic workflow templates, evidence tracking, and optional AI-assisted draft summaries.

## 2. Scope

### In Scope
- Company profile display (SSM-registered entity)
- Compliance event with task timeline (12 tasks for annual cycle)
- Interactive task status management (pending, in_progress, completed, overdue)
- Evidence note entry with artifact references
- Immutable audit ledger logging all state changes
- AI draft summaries (clearly marked as AI-generated, review required)
- Human company secretary review panel with findings and approval status
- Dark/cream/crimson professional theme
- Verification script for fixtures and documentation

### Out of Scope
- Legal advice or automated legal reasoning
- External API integrations or paid services
- User authentication or multi-tenancy
- Persistent backend storage (all state in-memory for MVP)
- Actual document upload/file storage (artifact references only)

## 3. Architecture

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized production builds
- **CSS Custom Properties** for theming (no CSS framework dependency)
- **Lucide React** for consistent iconography

### State Management
- React `useState` hooks in the root `App` component
- Callback props passed down for task status updates and evidence addition
- Audit ledger entries appended immutably on each state change

### Data Layer
- All data is deterministic and stored in TypeScript source files under `src/data/`
- Fixtures are importable and verifiable via the verification script
- No external database or API calls

## 4. Data Model

### Company
- name, registrationNo, incorporationDate, ssmState, sicCodes
- registeredAddress, directors[], companySecretary, financialYearEnd

### ComplianceTask
- id, title, description, category (filing|governance|tax|audit|statutory)
- dueDate, status (pending|in_progress|completed|overdue), owner
- evidence: EvidenceEntry[]
- aiDraft?: string (optional, clearly marked)
- ssmRef?, actRef? (statutory references)

### EvidenceEntry
- id, taskId, note, artifactRef, timestamp, addedBy

### AuditLedgerEntry
- timestamp, actor, action, taskId, evidenceId?, detail

### ReviewSummary
- reviewer, reviewedAt, findings[], approved, notes

## 5. User Flow

1. User sees company profile and compliance progress stats
2. User reviews task timeline sorted by due date
3. User selects a task to view details
4. User can update task status (interactive buttons)
5. User can add evidence notes with artifact references
6. All changes are logged to the audit ledger
7. AI drafts (where available) provide contextual summaries
8. Human secretary review panel shows overall findings and approval status

## 6. Theme

- **Background**: Dark navy (#1A1A2E)
- **Cards**: Darker card (#222240) with subtle borders
- **Text**: Cream (#FFF8F0) with muted variants
- **Accent**: Crimson (#DC2626) for primary actions and highlights
- **Status Colors**: Green (completed), Blue (in progress), Amber (pending), Red (overdue)

## 7. Security & Privacy

- All data is local and deterministic — no external network calls
- No user data is collected or transmitted
- No authentication tokens, API keys, or secrets in the codebase
- Artifact references are filename strings, not actual file uploads

## 8. Verification

The `scripts/verify.mjs` script checks:
- Compliance event fixture has >= 8 tasks (currently 12)
- Each task has all required fields
- Company fixture has all required fields
- Audit ledger, review summary fixtures exist and have content
- All 6 UI components exist
- All 6 documentation files exist

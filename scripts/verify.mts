import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  addWorkingDays,
  buildScheduledSendJobRuns,
  createScheduledSendJob,
  isWorkingDay,
  simulateCronSend,
  simulateDueSends,
} from '../src/lib/reminderEngine';
import {
  filterCompaniesByDepartment,
  filterRulesByDepartment,
  filterJobsByDepartment,
  filterLogsByDepartment,
} from '../src/lib/scoping';
import { deactivateCompanyReducer } from '../src/lib/reducers';
import {
  seedCompanies,
  seedContacts,
  seedJobs,
  seedRules,
  seedSendLogs,
  seedStaffUsers,
} from '../src/data/seed';
import { buildProofPacket, summarizeProofPackets } from '../src/lib/proofPacket';
import type { AppState, Department, ScheduledSendJob, StaffUser } from '../src/types';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition: unknown, msg: string) {
  if (condition) {
    console.log(`  PASS: ${msg}`);
    passed++;
  } else {
    console.error(`  FAIL: ${msg}`);
    failed++;
  }
}

console.log('\n--- CorpSec Command Center Verification ---\n');

// 1. Reminder engine — working day math
console.log('[Reminder Engine: Working Days]');
const monday = new Date('2026-08-03T09:00:00+08:00'); // Monday
assert(isWorkingDay(monday), 'Monday is a working day');
const sunday = new Date('2026-08-02T09:00:00+08:00'); // Sunday
assert(!isWorkingDay(sunday), 'Sunday is not a working day');
const plus5 = addWorkingDays(monday, 5);
assert(plus5.getDay() === 1, 'Adding 5 working days from Monday lands on next Monday');

// 2. Reminder engine — job run generation
console.log('\n[Reminder Engine: Run Generation]');
const job = createScheduledSendJob({
  companyId: 'comp-test',
  contactId: 'contact-test',
  department: 'corp_sec',
  channel: 'email',
  subject: 'Test',
  body: 'Body',
  firstSendAt: monday.toISOString(),
  everyNWorkingDays: 5,
  stopDate: '2026-08-31',
  createdBy: 'staff-test',
});
const runs = buildScheduledSendJobRuns(job);
assert(runs.length > 1, `Generated ${runs.length} runs before stop date`);
assert(runs.every((r) => isWorkingDay(new Date(r.scheduledRunAt))), 'All runs land on working days');
assert(runs.length <= 500, 'Run generation has a safety cap');

// 3. Reminder engine — simulate send and deduplication
console.log('\n[Reminder Engine: Simulation]');
const contact = seedContacts[0];
const staff = seedStaffUsers.find((u) => u.department === 'corp_sec');
const log = simulateCronSend(job, runs[0], contact, staff, new Date('2026-08-03T09:05:00+08:00'));
assert(log.status === 'simulated', 'Simulated send has status simulated');
assert(log.fixtureMarked === true, 'Safe simulated send is fixture-marked for judge clarity');
assert(log.recipient === contact.email, 'Recipient uses primary contact email');
assert(log.messageSnapshot.includes('Test'), 'Snapshot includes subject');

const logs = simulateDueSends([job], seedContacts, staff, [], new Date('2026-08-31T23:59:00+08:00'));
assert(logs.length === runs.length, `Cron simulator generated ${logs.length} logs (expected ${runs.length})`);
const secondPass = simulateDueSends([job], seedContacts, staff, logs, new Date('2026-08-31T23:59:00+08:00'));
assert(secondPass.length === 0, 'Cron simulator deduplicates already-sent runs');

// 4. Auth scoping
console.log('\n[Auth Scoping]');
const taxUser = seedStaffUsers.find((u) => u.department === 'tax')!;
const adminUser = seedStaffUsers.find((u) => u.department === 'admin')!;
const taxCompanies = filterCompaniesByDepartment(seedCompanies, taxUser.department);
const adminCompanies = filterCompaniesByDepartment(seedCompanies, adminUser.department);
assert(taxCompanies.length < adminCompanies.length, 'Tax staff sees fewer companies than admin');
assert(
  taxCompanies.every((c) => c.departments.includes('tax')),
  'Tax staff only sees companies tagged for tax'
);
assert(
  filterRulesByDepartment(seedRules, taxUser.department).every((r) => r.department === 'tax'),
  'Tax staff only sees tax rules'
);
assert(
  filterJobsByDepartment(seedJobs, taxUser.department).every((j) => j.department === 'tax'),
  'Tax staff only sees tax jobs'
);
assert(
  filterLogsByDepartment(seedSendLogs, seedCompanies, taxUser.department).length <= seedSendLogs.length,
  'Tax staff sees subset of logs'
);

// 5. Company deactivation retains logs
console.log('\n[Deactivation Retains Logs]');
const initialState: AppState = {
  staffUsers: seedStaffUsers,
  currentUser: adminUser,
  companies: seedCompanies,
  contacts: seedContacts,
  rules: seedRules,
  jobs: seedJobs,
  sendLogs: seedSendLogs,
  proofDocuments: [],
  auditEvents: [],
};
const companyToDeactivate = seedCompanies.find((c) => c.active)!;
const beforeLogCount = initialState.sendLogs.length;
const deactivated = deactivateCompanyReducer(initialState, companyToDeactivate.id);
assert(
  deactivated.companies.find((c) => c.id === companyToDeactivate.id)?.active === false,
  'Company is marked inactive'
);
assert(
  deactivated.jobs.filter((j) => j.companyId === companyToDeactivate.id).every((j) => j.status !== 'active'),
  'Active jobs for deactivated company are stopped'
);
assert(deactivated.sendLogs.length === beforeLogCount, 'Historical send logs are retained');

// 5b. Reviewer-safe proof packet
console.log('\n[Reviewer-Safe Proof Packet]');
const packet = buildProofPacket(seedSendLogs[0], new Date('2026-04-15T09:00:00+08:00'));
assert(packet.packetId.startsWith('proof-'), 'Proof packet gets deterministic hashable ID');
assert(packet.freshness === 'current', 'Fresh proof is classified current');
assert(packet.evidenceFields.includes('provider_message_id'), 'Proof packet lists provider message ID as reviewer-safe field');
const packetSummary = summarizeProofPackets(seedSendLogs, new Date('2026-04-15T09:00:00+08:00'));
assert(packetSummary.current === 1, 'Proof packet summary counts current evidence');

// 6. Build output
console.log('\n[Build Output]');
assert(existsSync(resolve(root, 'dist/index.html')), 'dist/index.html exists');
assert(existsSync(resolve(root, 'dist/assets')), 'dist/assets exists');

// 7. Key files exist
console.log('\n[Project Files]');
const requiredFiles = [
  'src/lib/supabase.ts',
  'src/lib/database.types.ts',
  'src/lib/reminderEngine.ts',
  'src/lib/scoping.ts',
  'src/lib/reducers.ts',
  'src/lib/store.ts',
  'src/data/seed.ts',
  'supabase/schema.sql',
  'tailwind.config.js',
  'postcss.config.js',
  'scripts/live-smoke.mjs',
];
for (const file of requiredFiles) {
  assert(existsSync(resolve(root, file)), `${file} exists`);
}

// 8. Documentation
console.log('\n[Documentation]');
const docs = ['README.md', 'Spec.md', 'QODER_BUILD_LEDGER.md', 'PROOF_LEDGER.md', 'DEMO_SCRIPT.md', 'SUBMISSION_CHECKLIST.md'];
for (const doc of docs) {
  try {
    const src = readFileSync(resolve(root, doc), 'utf-8');
    assert(src.length > 100, `${doc} exists and has content`);
  } catch {
    assert(false, `${doc} exists`);
  }
}
const submissionPack = readFileSync(resolve(root, 'src/components/screens/SubmissionPackScreen.tsx'), 'utf-8');
assert(submissionPack.includes('60-second judge live check'), 'Submission Pack includes 60-second judge live check');
assert(submissionPack.includes('Client Database → Scheduled Queue → Send Logs / Evidence → Proof → AI Workbench'), 'Submission Pack documents the golden demo loop');
assert(submissionPack.includes('Current live smoke check'), 'Submission Pack includes current live Worker smoke receipt');
assert(submissionPack.includes('AI Workbench recording packet'), 'Submission Pack includes governed AI Workbench recording packet');
assert(submissionPack.includes('AI-to-staff handoff receipt'), 'Submission Pack includes AI-to-staff handoff receipt');
assert(submissionPack.includes('Enterprise trust scorecard'), 'Submission Pack includes enterprise trust winner-calibration scorecard');
assert(submissionPack.includes('Authority and provenance receipt'), 'Submission Pack includes authority/provenance trust receipt');
assert(submissionPack.includes('Staff identity'), 'Submission Pack states staff identity as the action owner');
assert(submissionPack.includes('Pilot handoff receipt'), 'Submission Pack includes pilot handoff receipt for adoption readiness');
assert(submissionPack.includes('Reusable workflow'), 'Submission Pack states reusable workflow artifacts for pilot handoff');
assert(submissionPack.includes('Deterministic middle'), 'Submission Pack states deterministic rules remain the trusted middle');
assert(submissionPack.includes('AI drafts only'), 'Submission Pack states AI drafts only before staff approval');
assert(submissionPack.includes('ClientBase / VOPlus Singapore scan'), 'Submission Pack includes Singapore practice-suite competitor calibration');
assert(submissionPack.includes('owner-specific chase becomes a reviewer-safe proof receipt'), 'Submission Pack states the narrow proof-receipt wedge');
assert(readFileSync(resolve(root, 'src/lib/proofPacket.ts'), 'utf-8').includes('Reviewer-safe packet'), 'Proof packet utility documents non-secret reviewer export boundary');
assert(submissionPack.includes('Deterministic authority'), 'Submission Pack states deterministic records remain authoritative over AI output');
const packageJson = readFileSync(resolve(root, 'package.json'), 'utf-8');
assert(packageJson.includes('smoke:live'), 'Package exposes npm run smoke:live for deployed demo reliability');
const liveSmokeScript = readFileSync(resolve(root, 'scripts/live-smoke.mjs'), 'utf-8');
assert(liveSmokeScript.includes('45000'), 'Live smoke allows a 45s Agnes bridge window for realistic cold starts');
assert(liveSmokeScript.includes('clear bounded error'), 'Live smoke accepts only generated brief JSON or bounded error JSON');
const submissionChecklist = readFileSync(resolve(root, 'SUBMISSION_CHECKLIST.md'), 'utf-8');
assert(submissionChecklist.includes('npm run smoke:live'), 'Submission checklist includes live smoke command');

// 9. Schema includes expected tables
console.log('\n[Supabase Schema]');
const schema = readFileSync(resolve(root, 'supabase/schema.sql'), 'utf-8');
const tables = ['staff_users', 'companies', 'company_contacts', 'compliance_rules', 'scheduled_send_jobs', 'send_logs', 'proof_documents', 'audit_events'];
for (const table of tables) {
  assert(schema.includes(`CREATE TABLE ${table}`), `Schema defines ${table}`);
}
assert(schema.includes('ENABLE ROW LEVEL SECURITY'), 'Schema enables RLS');

// Summary
console.log(`\n--- Results: ${passed} passed, ${failed} failed ---\n`);

if (failed > 0) {
  process.exit(1);
}

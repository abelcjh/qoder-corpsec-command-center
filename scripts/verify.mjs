import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    console.log(`  PASS: ${msg}`);
    passed++;
  } else {
    console.error(`  FAIL: ${msg}`);
    failed++;
  }
}

console.log('\n--- CorpSec Command Center Verification ---\n');

// 1. Check compliance events fixture has >=8 tasks
console.log('[Fixture: Compliance Events]');
const eventsPath = resolve(root, 'src/data/complianceEvents.ts');
const eventsSrc = readFileSync(eventsPath, 'utf-8');

const taskMatches = eventsSrc.match(/id:\s*'task-\d+'/g);
const taskCount = taskMatches ? taskMatches.length : 0;
assert(taskCount >= 8, `Task count >= 8 (found ${taskCount})`);

// 2. Check each task has required fields
const requiredFields = ['id', 'title', 'description', 'category', 'dueDate', 'status', 'owner'];
for (const field of requiredFields) {
  const regex = new RegExp(`${field}:`, 'g');
  const matches = eventsSrc.match(regex);
  assert(
    matches && matches.length >= taskCount,
    `All tasks have "${field}" field (${matches ? matches.length : 0}/${taskCount})`
  );
}

// 3. Check company fixture
console.log('\n[Fixture: Company]');
const companyPath = resolve(root, 'src/data/company.ts');
const companySrc = readFileSync(companyPath, 'utf-8');

const companyFields = ['name', 'registrationNo', 'incorporationDate', 'ssmState', 'directors', 'companySecretary', 'financialYearEnd'];
for (const field of companyFields) {
  assert(companySrc.includes(`${field}:`), `Company has "${field}" field`);
}

// 4. Check audit ledger
console.log('\n[Fixture: Audit Ledger]');
const ledgerPath = resolve(root, 'src/data/auditLedger.ts');
const ledgerSrc = readFileSync(ledgerPath, 'utf-8');
assert(ledgerSrc.includes('AuditLedgerEntry'), 'Audit ledger type imported');
assert(ledgerSrc.length > 200, 'Audit ledger has content');

// 5. Check review summary
console.log('\n[Fixture: Review Summary]');
const reviewPath = resolve(root, 'src/data/reviewSummary.ts');
const reviewSrc = readFileSync(reviewPath, 'utf-8');
assert(reviewSrc.includes('reviewer'), 'Review has reviewer');
assert(reviewSrc.includes('findings'), 'Review has findings');
assert(reviewSrc.includes('approved'), 'Review has approval status');

// 6. Check key components exist
console.log('\n[Components]');
const components = [
  'CompanyProfile', 'StatsBar', 'TaskTimeline',
  'TaskDetail', 'AuditLedger', 'ReviewPanel'
];
for (const comp of components) {
  try {
    const src = readFileSync(resolve(root, `src/components/${comp}.tsx`), 'utf-8');
    assert(src.length > 100, `${comp}.tsx exists and has content`);
  } catch {
    assert(false, `${comp}.tsx exists`);
  }
}

// 7. Check documentation
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

// Summary
console.log(`\n--- Results: ${passed} passed, ${failed} failed ---\n`);

if (failed > 0) {
  process.exit(1);
}

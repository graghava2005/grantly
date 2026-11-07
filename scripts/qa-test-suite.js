import assert from 'assert';
import { SCHOLARSHIPS_DATA } from '../src/data/scholarships.js';
import { DEFAULT_DEMO_STUDENT, INITIAL_APPLICATIONS, INITIAL_SAVED_IDS } from '../src/data/initialUserData.js';
import { calculateEligibilityMatch } from '../src/utils/eligibilityEngine.js';

console.log('--- STARTING GRANTLY AUTOMATED QA & AUDIT TEST SUITE ---');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`, err.message);
  }
}

// 1. DATASET INTEGRITY
runTest('Catalog has at least 15 realistic Indian scholarship records', () => {
  assert(SCHOLARSHIPS_DATA.length >= 15, `Expected >= 15, got ${SCHOLARSHIPS_DATA.length}`);
  SCHOLARSHIPS_DATA.forEach(sch => {
    assert(sch.id, 'Scholarship must have an id');
    assert(sch.title, 'Scholarship must have a title');
    assert(sch.provider, 'Scholarship must have a provider');
    assert(sch.awardAmount, 'Scholarship must have an award amount');
    assert(sch.deadline, 'Scholarship must have a deadline');
    assert(Array.isArray(sch.requiredDocuments), 'Scholarship must have required documents array');
    assert(sch.requiredDocuments.length >= 3, 'Must have at least 3 required documents');
  });
});

// 2. ELIGIBILITY ENGINE: GENDER HARD BLOCK
runTest('Eligibility engine blocks Male applicant on Female-only scheme (Adobe WIT)', () => {
  const maleStudent = { ...DEFAULT_DEMO_STUDENT, gender: 'Male' };
  const adobeScheme = SCHOLARSHIPS_DATA.find(s => s.id === 'adobe-women-in-tech-2025');
  const result = calculateEligibilityMatch(maleStudent, adobeScheme);
  assert.strictEqual(result.isEligible, false, 'Male student should not be eligible for female-only scheme');
  assert.strictEqual(result.hardBlock, true, 'Hardblock must be true');
  assert(result.score <= 30, `Score must be penalized, got ${result.score}`);
  assert(result.unmatchedReasons.some(r => r.includes('Gender mismatch')), 'Must explain gender mismatch');
});

// 3. ELIGIBILITY ENGINE: INCOME CEILING HARD BLOCK
runTest('Eligibility engine blocks applicant exceeding income ceiling', () => {
  const wealthyStudent = { ...DEFAULT_DEMO_STUDENT, familyIncome: 1200000 }; // 12 Lakhs
  const siemensScheme = SCHOLARSHIPS_DATA.find(s => s.id === 'siemens-scholarship-2025'); // Max 2L
  const result = calculateEligibilityMatch(wealthyStudent, siemensScheme);
  assert.strictEqual(result.isEligible, false, 'Student above ceiling must be ineligible');
  assert.strictEqual(result.hardBlock, true, 'Hardblock must be true');
  assert(result.unmatchedReasons.some(r => r.includes('Income exceeds limit')), 'Must explain income failure');
});

// 4. ELIGIBILITY ENGINE: CUTOFF SCORE HARD BLOCK
runTest('Eligibility engine blocks student with percentage far below cutoff', () => {
  const lowScorer = { ...DEFAULT_DEMO_STUDENT, percentage: 55 };
  const lorealScheme = SCHOLARSHIPS_DATA.find(s => s.id === 'loreal-women-in-science-2025'); // Min 85%
  const result = calculateEligibilityMatch(lowScorer, lorealScheme);
  assert.strictEqual(result.isEligible, false, 'Low scorer should be ineligible');
  assert.strictEqual(result.hardBlock, true, 'Hardblock must be true');
  assert(result.unmatchedReasons.some(r => r.includes('Academic criterion unmet')), 'Must explain academic cutoff failure');
});

// 5. ELIGIBILITY ENGINE: CATEGORY MISMATCH
runTest('Eligibility engine blocks General student on strict SC/ST scheme', () => {
  const generalStudent = { ...DEFAULT_DEMO_STUDENT, category: 'General' };
  const ongcScheme = SCHOLARSHIPS_DATA.find(s => s.id === 'ongc-sc-st-merit-2025');
  const result = calculateEligibilityMatch(generalStudent, ongcScheme);
  assert.strictEqual(result.isEligible, false, 'General student should not qualify for SC/ST reserved scheme');
  assert.strictEqual(result.hardBlock, true, 'Hardblock must be true');
  assert(result.unmatchedReasons.some(r => r.includes('Category requirement not met')), 'Must explain category requirement');
});

// 6. ELIGIBILITY ENGINE: QUALIFYING MATCH
runTest('Aarav Sharma qualifies with High Match on Reliance Foundation UG', () => {
  const aarav = DEFAULT_DEMO_STUDENT;
  const reliance = SCHOLARSHIPS_DATA.find(s => s.id === 'reliance-ug-2025');
  const result = calculateEligibilityMatch(aarav, reliance);
  assert.strictEqual(result.isEligible, true, 'Aarav should qualify for Reliance');
  assert.strictEqual(result.hardBlock, false, 'Hardblock should be false');
  assert(result.score >= 85, `Score should be >= 85, got ${result.score}`);
  assert(result.matchedReasons.length >= 4, 'Should explain multiple satisfied rules');
});

// 7. MISSING INFORMATION HANDLING
runTest('Eligibility engine identifies missing fields and alerts student', () => {
  const incompleteStudent = { name: 'New Student' };
  const reliance = SCHOLARSHIPS_DATA.find(s => s.id === 'reliance-ug-2025');
  const result = calculateEligibilityMatch(incompleteStudent, reliance);
  assert(result.missingInfo.length >= 2, 'Should identify missing fields');
  assert(result.missingInfo.some(m => m.includes('income') || m.includes('percentage')), 'Should prompt for missing income or percentage');
});

// 8. INITIAL APPLICATION TRACKER STATE
runTest('Initial application records contain valid 6-stage statuses', () => {
  const validStages = ['Interested', 'Preparing Documents', 'Applied', 'Under Review', 'Approved', 'Rejected'];
  assert(INITIAL_APPLICATIONS.length >= 3, 'Should have initial applications');
  INITIAL_APPLICATIONS.forEach(app => {
    assert(validStages.includes(app.status), `Invalid status: ${app.status}`);
    assert(app.scholarshipId, 'Must have scholarshipId');
  });
});

console.log(`\n========================================`);
console.log(`QA AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}

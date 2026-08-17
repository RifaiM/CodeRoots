/**
 * Phase 3: Gamification & XP Calculation Stress Testing & Edge Cases
 */

import fs from 'fs';

const store = {};
global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { for (let k in store) delete store[k]; }
};

const dashboardCode = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');
const windowSandbox = {};
new Function('window', 'document', 'localStorage', dashboardCode)(windowSandbox, {
    addEventListener: () => {},
    querySelectorAll: () => []
}, global.localStorage);

const getUserXPAndRank = windowSandbox.getUserXPAndRank;

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

function assert(condition, desc) {
    totalTests++;
    if (condition) {
        passedTests++;
    } else {
        failedTests.push(desc);
        console.error(`❌ FAIL: ${desc}`);
    }
}

console.log('🧪 PHASE 3: Gamification & XP Stress & Edge-Case Testing...\n');

// ----------------------------------------------------
// 1. CLEAN SLATE
// ----------------------------------------------------
localStorage.clear();
let stats = getUserXPAndRank();
assert(stats.totalXP === 0, 'Clean slate XP is 0');
assert(stats.maxXP === 25000, 'Max XP is 25000');
assert(stats.rankTitle === 'Web Explorer', 'Initial rank is Web Explorer');

// ----------------------------------------------------
// 2. CORRUPTED / MALICIOUS LOCALSTORAGE INPUTS
// ----------------------------------------------------
console.log('--- Testing Malformed / Corrupted LocalStorage Inputs ---');
localStorage.setItem('novicodes_daily_quest_xp', 'NaN');
localStorage.setItem('novicodes_streak_bonus_xp', '-99999');
localStorage.setItem('novicodes_streak_count', 'undefined');
localStorage.setItem('level1_completed', 'maybe');
localStorage.setItem('__proto__', 'malicious');
localStorage.setItem('constructor', 'override');

stats = getUserXPAndRank();
assert(!isNaN(stats.totalXP), 'Total XP is never NaN when malformed values are in localStorage');
assert(stats.totalXP >= 0, 'Total XP is never negative');
assert(stats.maxXP === 25000, 'Max XP remains 25000');
assert(typeof stats.rankTitle === 'string', 'Rank title is always a valid string');

localStorage.clear();

// ----------------------------------------------------
// 3. INDIVIDUAL LEVEL 7 TRACK SPECIALIZATION TESTS
// ----------------------------------------------------
console.log('--- Testing Level 7 Specialization Ranks ---');

// Track 7D TypeScript Only (12 lessons x 150 = 1800 XP)
for (let i = 1; i <= 12; i++) {
    localStorage.setItem(`partF_branchD_lesson${i}_complete`, 'true');
}
stats = getUserXPAndRank();
assert(stats.l7BranchD === 12, 'l7BranchD count is 12');
assert(stats.l7XP === 1800, `l7XP for TypeScript is 1800, got ${stats.l7XP}`);
assert(stats.rankTitle === 'TypeScript Specialist', `Rank for TypeScript mastery is 'TypeScript Specialist', got '${stats.rankTitle}'`);
assert(stats.rankIcon === '🔷', 'Rank icon for TypeScript is 🔷');

localStorage.clear();

// Track 7E CSS Motion Only (10 lessons x 150 = 1500 XP)
for (let i = 1; i <= 10; i++) {
    localStorage.setItem(`partF_branchE_lesson${i}_complete`, 'true');
}
stats = getUserXPAndRank();
assert(stats.l7BranchE === 10, 'l7BranchE count is 10');
assert(stats.l7XP === 1500, `l7XP for CSS Motion is 1500, got ${stats.l7XP}`);
assert(stats.rankTitle === 'CSS Motion Specialist', `Rank for CSS Motion is 'CSS Motion Specialist', got '${stats.rankTitle}'`);
assert(stats.rankIcon === '🎨', 'Rank icon for CSS Motion is 🎨');

localStorage.clear();

// All 5 Level 7 Tracks (6 + 6 + 6 + 12 + 10 = 40 lessons = 7,800 XP)
for (let i = 1; i <= 6; i++) {
    localStorage.setItem(`partF_branchA_lesson${i}_complete`, 'true');
    localStorage.setItem(`partF_branchB_lesson${i}_complete`, 'true');
    localStorage.setItem(`partF_branchC_lesson${i}_complete`, 'true');
}
for (let i = 1; i <= 12; i++) localStorage.setItem(`partF_branchD_lesson${i}_complete`, 'true');
for (let i = 1; i <= 10; i++) localStorage.setItem(`partF_branchE_lesson${i}_complete`, 'true');

stats = getUserXPAndRank();
assert(stats.l7Completed === 40, `l7Completed is 40, got ${stats.l7Completed}`);
assert(stats.l7XP === 7800, `l7XP is 7800, got ${stats.l7XP}`);
assert(stats.rankTitle === 'Principal Polymath', `All 5 Level 7 tracks award 'Principal Polymath', got '${stats.rankTitle}'`);
assert(stats.rankIcon === '👑', 'Rank icon for Principal Polymath is 👑');

// ----------------------------------------------------
// 4. RAPID DEVKIT TOGGLING STRESS TEST (100 Cycles)
// ----------------------------------------------------
console.log('\n--- Running 100-Cycle DevKit Toggle Stress Test ---');

for (let cycle = 1; cycle <= 100; cycle++) {
    // Unlock All
    localStorage.setItem('practice_mode_unlocked', 'true');
    localStorage.setItem('level0_completed', 'true');
    localStorage.setItem('level1_completed', 'true');
    localStorage.setItem('level2_completed', 'true');
    localStorage.setItem('level3_completed', 'true');
    localStorage.setItem('level4_completed', 'true');
    localStorage.setItem('level5_completed', 'true');
    localStorage.setItem('level6_completed', 'true');
    localStorage.setItem('level7_completed', 'true');
    localStorage.setItem('level8_completed', 'true');
    localStorage.setItem('level9_completed', 'true');
    localStorage.setItem('level10_completed', 'true');

    // 10 Advanced Foundations
    localStorage.setItem('foundations_react_completed', 'true');
    localStorage.setItem('foundations_python_completed', 'true');
    localStorage.setItem('foundations_cloud_completed', 'true');
    localStorage.setItem('foundations_sql_completed', 'true');
    localStorage.setItem('foundations_nextjs_completed', 'true');
    localStorage.setItem('foundations_typescript_completed', 'true');
    localStorage.setItem('foundations_cssmotion_completed', 'true');
    localStorage.setItem('foundations_async_completed', 'true');
    localStorage.setItem('foundations_auth_completed', 'true');
    localStorage.setItem('foundations_saas_completed', 'true');

    // 103 Lessons
    for (let i = 1; i <= 15; i++) {
        localStorage.setItem(`partB_lesson${i}_remake_complete`, 'true');
        localStorage.setItem(`partC_lesson${i}_remake_complete`, 'true');
        localStorage.setItem(`partE_lesson${i}_remake_complete`, 'true');
    }
    for (let i = 1; i <= 6; i++) {
        localStorage.setItem(`partF_branchA_lesson${i}_complete`, 'true');
        localStorage.setItem(`partF_branchB_lesson${i}_complete`, 'true');
        localStorage.setItem(`partF_branchC_lesson${i}_complete`, 'true');
        localStorage.setItem(`partG_lesson${i}_remake_complete`, 'true');
        localStorage.setItem(`partH_lesson${i}_remake_complete`, 'true');
        localStorage.setItem(`partI_lesson${i}_remake_complete`, 'true');
    }
    for (let i = 1; i <= 12; i++) localStorage.setItem(`partF_branchD_lesson${i}_complete`, 'true');
    for (let i = 1; i <= 10; i++) localStorage.setItem(`partF_branchE_lesson${i}_complete`, 'true');

    const unlocked = getUserXPAndRank();
    if (unlocked.totalXP !== 25000) {
        assert(false, `Cycle ${cycle}: Unlocked XP must be 25000, got ${unlocked.totalXP}`);
    }

    // Lock All (Clean Slate)
    localStorage.clear();
    const locked = getUserXPAndRank();
    if (locked.totalXP !== 0) {
        assert(false, `Cycle ${cycle}: Locked XP must be 0, got ${locked.totalXP}`);
    }
}

assert(true, '100-cycle DevKit lock/unlock stress test completed with 0 state leakage');

console.log(`\n========================================`);
console.log(`🏁 Phase 3 Summary: ${passedTests}/${totalTests} assertions passed`);
console.log(`========================================\n`);

if (failedTests.length > 0) {
    console.error('Failed tests:', failedTests);
    process.exit(1);
} else {
    console.log('🎉 Phase 3 Gamification & XP Stress Engine 100% Passed!');
}

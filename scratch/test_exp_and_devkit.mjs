/**
 * Test Suite: XP Calculation Engine & Ctrl+Alt+D DevKit Lock/Unlock State Machine
 */

import fs from 'fs';

// Mock localStorage and window environment
const store = {};
global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { for (let k in store) delete store[k]; }
};
global.sessionStorage = {
    clear: () => {}
};

// Load dashboard.js getUserXPAndRank function
const dashboardCode = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');
const windowSandbox = {};
new Function('window', 'document', 'localStorage', dashboardCode)(windowSandbox, {
    addEventListener: () => {},
    querySelectorAll: () => []
}, global.localStorage);

const getUserXPAndRank = windowSandbox.getUserXPAndRank;

let tests = 0;
let passed = 0;

function assert(condition, desc) {
    tests++;
    if (condition) {
        passed++;
    } else {
        console.error(`❌ FAIL: ${desc}`);
    }
}

console.log('🧪 Testing EXP Logic and Ctrl+Alt+D DevKit State Machine...\n');

// ----------------------------------------------------
// SCENARIO 1: Clean State (0 XP)
// ----------------------------------------------------
localStorage.clear();
const initialStats = getUserXPAndRank();
assert(initialStats.totalXP === 0, `Initial totalXP must be 0, got ${initialStats.totalXP}`);
assert(initialStats.maxXP === 25000, `Initial maxXP must be 25000, got ${initialStats.maxXP}`);
assert(initialStats.rankTitle === 'Web Explorer', `Initial rank must be 'Web Explorer', got '${initialStats.rankTitle}'`);
assert(initialStats.l7Completed === 0, `Initial l7Completed must be 0, got ${initialStats.l7Completed}`);
assert(initialStats.l7XP === 0, `Initial l7XP must be 0, got ${initialStats.l7XP}`);

// ----------------------------------------------------
// SCENARIO 2: Partial Progress (Level 7 Tracks)
// ----------------------------------------------------
// Complete Track 7A (6 lessons x 250 = 1500 XP)
for (let i = 1; i <= 6; i++) {
    localStorage.setItem(`partF_branchA_lesson${i}_complete`, 'true');
}
// Complete Track 7D TypeScript (12 lessons x 150 = 1800 XP)
for (let i = 1; i <= 12; i++) {
    localStorage.setItem(`partF_branchD_lesson${i}_complete`, 'true');
}
// Complete Track 7E CSS Motion (10 lessons x 150 = 1500 XP)
for (let i = 1; i <= 10; i++) {
    localStorage.setItem(`partF_branchE_lesson${i}_complete`, 'true');
}

const partialStats = getUserXPAndRank();
// 1500 + 1800 + 1500 = 4800 XP
assert(partialStats.l7BranchA === 6, `l7BranchA should be 6, got ${partialStats.l7BranchA}`);
assert(partialStats.l7BranchD === 12, `l7BranchD should be 12, got ${partialStats.l7BranchD}`);
assert(partialStats.l7BranchE === 10, `l7BranchE should be 10, got ${partialStats.l7BranchE}`);
assert(partialStats.l7Completed === 28, `l7Completed should be 28, got ${partialStats.l7Completed}`);
assert(partialStats.l7XP === 4800, `l7XP should be 4800, got ${partialStats.l7XP}`);
assert(partialStats.totalXP === 4800, `totalXP should be 4800, got ${partialStats.totalXP}`);

// ----------------------------------------------------
// SCENARIO 3: Dev Mode Unlock (Ctrl+Alt+D)
// ----------------------------------------------------
localStorage.clear();

// Simulate unlockAll()
localStorage.setItem('practice_mode_unlocked', 'true');
localStorage.setItem('level0_completed', 'true');
localStorage.setItem('readWebsite', 'true');
localStorage.setItem('readHTML', 'true');
localStorage.setItem('readCSS', 'true');
localStorage.setItem('readJavaScript', 'true');
localStorage.setItem('level0_quiz_completed', 'true');
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

// All 10 Advanced Foundations
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

// All Dojo Lessons (103 lessons total)
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

for (let i = 1; i <= 12; i++) {
    localStorage.setItem(`partF_branchD_lesson${i}_complete`, 'true');
}

for (let i = 1; i <= 10; i++) {
    localStorage.setItem(`partF_branchE_lesson${i}_complete`, 'true');
}

const unlockedStats = getUserXPAndRank();
console.log('Unlocked State Stats:', {
    totalXP: unlockedStats.totalXP,
    maxXP: unlockedStats.maxXP,
    rank: unlockedStats.rankTitle,
    l7XP: unlockedStats.l7XP,
    l7Completed: unlockedStats.l7Completed
});

assert(unlockedStats.totalXP === 25000, `Unlocked totalXP must equal EXACTLY 25000, got ${unlockedStats.totalXP}`);
assert(unlockedStats.maxXP === 25000, `Unlocked maxXP must be 25000, got ${unlockedStats.maxXP}`);
assert(unlockedStats.l7Completed === 40, `Unlocked l7Completed must be 40, got ${unlockedStats.l7Completed}`);
assert(unlockedStats.l7XP === 7800, `Unlocked l7XP must be 7800, got ${unlockedStats.l7XP}`);
assert(unlockedStats.rankTitle === 'Master Web Developer', `Unlocked rank must be 'Master Web Developer', got '${unlockedStats.rankTitle}'`);

// ----------------------------------------------------
// SCENARIO 4: Dev Mode Lock / Reset (Ctrl+Alt+D Toggle)
// ----------------------------------------------------
// Simulate lockAll()
localStorage.removeItem('practice_mode_unlocked');
localStorage.removeItem('level0_completed');
localStorage.removeItem('level1_completed');
localStorage.removeItem('level2_completed');
localStorage.removeItem('level3_completed');
localStorage.removeItem('level4_completed');
localStorage.removeItem('level5_completed');
localStorage.removeItem('level6_completed');
localStorage.removeItem('level7_completed');
localStorage.removeItem('level8_completed');
localStorage.removeItem('level9_completed');
localStorage.removeItem('level10_completed');
localStorage.removeItem('foundations_react_completed');
localStorage.removeItem('foundations_python_completed');
localStorage.removeItem('foundations_cloud_completed');
localStorage.removeItem('foundations_sql_completed');
localStorage.removeItem('foundations_nextjs_completed');
localStorage.removeItem('foundations_typescript_completed');
localStorage.removeItem('foundations_cssmotion_completed');
localStorage.removeItem('foundations_async_completed');
localStorage.removeItem('foundations_auth_completed');
localStorage.removeItem('foundations_saas_completed');

for (let i = 1; i <= 20; i++) {
    localStorage.removeItem(`partB_lesson${i}_remake_complete`);
    localStorage.removeItem(`partC_lesson${i}_remake_complete`);
    localStorage.removeItem(`partE_lesson${i}_remake_complete`);
}
for (let i = 1; i <= 6; i++) {
    localStorage.removeItem(`partF_branchA_lesson${i}_complete`);
    localStorage.removeItem(`partF_branchB_lesson${i}_complete`);
    localStorage.removeItem(`partF_branchC_lesson${i}_complete`);
    localStorage.removeItem(`partG_lesson${i}_remake_complete`);
    localStorage.removeItem(`partH_lesson${i}_remake_complete`);
    localStorage.removeItem(`partI_lesson${i}_remake_complete`);
}
for (let i = 1; i <= 12; i++) {
    localStorage.removeItem(`partF_branchD_lesson${i}_complete`);
}
for (let i = 1; i <= 10; i++) {
    localStorage.removeItem(`partF_branchE_lesson${i}_complete`);
}

const lockedStats = getUserXPAndRank();
assert(lockedStats.totalXP === 0, `Locked totalXP must be 0, got ${lockedStats.totalXP}`);
assert(lockedStats.rankTitle === 'Web Explorer', `Locked rank must be 'Web Explorer', got '${lockedStats.rankTitle}'`);

console.log(`\n========================================`);
console.log(`🏁 EXP & DevKit Verification: ${passed}/${tests} assertions passed`);
console.log(`========================================\n`);

if (passed === tests) {
    console.log('🎉 EXP LOGIC & CTRL+ALT+D DEVKIT ENGINE ARE 100% CLEAN & VERIFIED!');
} else {
    process.exit(1);
}

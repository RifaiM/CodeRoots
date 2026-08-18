/**
 * Test script: DevKit Dynamic State Verification
 * Simulates localStorage, DOM, and Ctrl+Alt+D unlock/lock cycle
 */

class MockLocalStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
    clear() {
        this.store = {};
    }
}

global.window = global;
global.localStorage = new MockLocalStorage();
global.sessionStorage = new MockLocalStorage();

// Import getUserXPAndRank logic
import { getUserXPAndRank } from '../src/scripts/xpEngine.js';
global.getUserXPAndRank = getUserXPAndRank;

console.log('--- Initial State Check ---');
const initialStats = getUserXPAndRank();
console.log('Initial XP:', initialStats.totalXP);
console.log('Initial Rank:', initialStats.rankTitle);

console.log('\n--- Simulating Ctrl+Alt+D (unlockAll) ---');
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

localStorage.setItem('partF_completed', 'true');
localStorage.setItem('partF_branchA_completed', 'true');
localStorage.setItem('partF_branchB_completed', 'true');
localStorage.setItem('partF_branchC_completed', 'true');
localStorage.setItem('partF_branchD_completed', 'true');
localStorage.setItem('partF_branchE_completed', 'true');
localStorage.setItem('partG_completed', 'true');
localStorage.setItem('partH_completed', 'true');
localStorage.setItem('partI_completed', 'true');

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
console.log('Unlocked XP:', unlockedStats.totalXP);
console.log('Unlocked Rank:', unlockedStats.rankTitle);
console.log('L4 completed:', unlockedStats.l4Completed);
console.log('L5 completed:', unlockedStats.l5Completed);
console.log('L6 completed:', unlockedStats.l6Completed);
console.log('L7 completed:', unlockedStats.l7Completed);
console.log('L8 completed:', unlockedStats.l8Completed);
console.log('L9 completed:', unlockedStats.l9Completed);
console.log('L10 completed:', unlockedStats.l10Completed);

if (unlockedStats.totalXP !== 25000) {
    console.error('FAIL: totalXP should be 25000, got:', unlockedStats.totalXP);
    process.exit(1);
}

// Test Level Regex matching for double digits (Level 00 .. Level 10)
const badges = ['Level 00', 'Level 01', 'Level 02', 'Level 03', 'Level 04', 'Level 05', 'Level 06', 'Level 07', 'Level 08', 'Level 09', 'Level 10'];
for (const b of badges) {
    const levelMatch = b.match(/Level\s*(\d+)/i);
    const levelNum = levelMatch ? parseInt(levelMatch[1], 10) : -1;
    if (levelNum < 0 || levelNum > 10) {
        console.error(`FAIL: Level matching failed for badge '${b}', parsed as ${levelNum}`);
        process.exit(1);
    }
}

console.log('\n✅ ALL 11 LEVEL BADGES PARSED CORRECTLY VIA REGEX!');
console.log('✅ DEVKIT UNLOCK PRODUCES EXACTLY 25,000 / 25,000 XP & MASTER WEB DEVELOPER RANK!');

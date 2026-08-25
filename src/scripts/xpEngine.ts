/**
 * NoviCodes XP & Rank Engine (TypeScript / ESM)
 * Deterministic learner progress and level breakdown calculator
 * Single source of truth for gamified XP, daily quest streaks, and developer ranks.
 */

export interface UserStats {
 totalXP: number;
 maxXP: number;
 rankTitle: string;
 rankIcon: string;
 isL0: boolean;
 isL1: boolean;
 isL2: boolean;
 isL3: boolean;
 // Advanced Foundations (Levels 5 - 10)
 isReactFoundations: boolean;
 isPythonFoundations: boolean;
 isCloudFoundations: boolean;
 isSqlFoundations: boolean;
 isNextjsFoundations: boolean;
 isTypescriptFoundations: boolean;
 isCssMotionFoundations: boolean;
 isAsyncFoundations: boolean;
 isAuthFoundations: boolean;
 isSaasFoundations: boolean;
 advancedFoundationsXP: number;
 // Coding Dojos
 l4Completed: number;
 l5Completed: number;
 l6Completed: number;
 l7Completed: number;
 l7XP: number;
 l7BranchA: number;
 l7BranchB: number;
 l7BranchC: number;
 l7BranchD: number;
 l7BranchE: number;
 l8Completed: number;
 l9Completed: number;
 l10Completed: number;
 dailyQuestXP: number;
 streakBonusXP: number;
 streakCount: number;
}

export function getUserXPAndRank(): UserStats {
 const maxXP = 25000;

 if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
 return {
 totalXP: 0,
 maxXP,
 rankTitle: 'Web Explorer',
 rankIcon: '',
 isL0: false,
 isL1: false,
 isL2: false,
 isL3: false,
 isReactFoundations: false,
 isPythonFoundations: false,
 isCloudFoundations: false,
 isSqlFoundations: false,
 isNextjsFoundations: false,
 isTypescriptFoundations: false,
 isCssMotionFoundations: false,
 isAsyncFoundations: false,
 isAuthFoundations: false,
 isSaasFoundations: false,
 advancedFoundationsXP: 0,
 l4Completed: 0,
 l5Completed: 0,
 l6Completed: 0,
 l7Completed: 0,
 l7XP: 0,
 l7BranchA: 0,
 l7BranchB: 0,
 l7BranchC: 0,
 l7BranchD: 0,
 l7BranchE: 0,
 l8Completed: 0,
 l9Completed: 0,
 l10Completed: 0,
 dailyQuestXP: 0,
 streakBonusXP: 0,
 streakCount: 0
 };
 }

 // Core Foundations (L0 - L3)
 const isL0 = localStorage.getItem('level0_completed') === 'true';
 const isL1 = localStorage.getItem('level1_completed') === 'true';
 const isL2 = localStorage.getItem('level2_completed') === 'true';
 const isL3 = localStorage.getItem('level3_completed') === 'true';

 // Advanced Foundations (L5 - L10)
 const isReactFoundations = localStorage.getItem('foundations_react_completed') === 'true';
 const isPythonFoundations = localStorage.getItem('foundations_python_completed') === 'true';
 const isCloudFoundations = localStorage.getItem('foundations_cloud_completed') === 'true';
 const isSqlFoundations = localStorage.getItem('foundations_sql_completed') === 'true';
 const isNextjsFoundations = localStorage.getItem('foundations_nextjs_completed') === 'true';
 const isTypescriptFoundations = localStorage.getItem('foundations_typescript_completed') === 'true';
 const isCssMotionFoundations = localStorage.getItem('foundations_cssmotion_completed') === 'true';
 const isAsyncFoundations = localStorage.getItem('foundations_async_completed') === 'true';
 const isAuthFoundations = localStorage.getItem('foundations_auth_completed') === 'true';
 const isSaasFoundations = localStorage.getItem('foundations_saas_completed') === 'true';

 let advancedFoundationsXP = 0;
 if (isReactFoundations) advancedFoundationsXP += 300;
 if (isPythonFoundations) advancedFoundationsXP += 300;
 if (isCloudFoundations) advancedFoundationsXP += 300;
 if (isSqlFoundations) advancedFoundationsXP += 300;
 if (isNextjsFoundations) advancedFoundationsXP += 300;
 if (isTypescriptFoundations) advancedFoundationsXP += 300;
 if (isCssMotionFoundations) advancedFoundationsXP += 300;
 if (isAsyncFoundations) advancedFoundationsXP += 300;
 if (isAuthFoundations) advancedFoundationsXP += 300;
 if (isSaasFoundations) advancedFoundationsXP += 500;

 let l4Completed = 0;
 for (let i = 1; i <= 15; i++) {
 try {
 const isComp = localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true' || 
 localStorage.getItem(`lesson_${i}_completed`) === 'true' || 
 localStorage.getItem(`lesson_${i}_completed`) === '1';
 if (isComp) l4Completed++;
 } catch (e) {}
 }

 let l5Completed = 0;
 for (let i = 1; i <= 15; i++) {
 try {
 const isComp = localStorage.getItem(`partC_lesson${i}_remake_complete`) === 'true';
 if (isComp) l5Completed++;
 } catch (e) {}
 }

 let l6Completed = 0;
 for (let i = 1; i <= 15; i++) {
 try {
 const isComp = localStorage.getItem(`partE_lesson${i}_remake_complete`) === 'true';
 if (isComp) l6Completed++;
 } catch (e) {}
 }

 let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0, l7BranchD = 0, l7BranchE = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partF_branchA_lesson${i}_complete`) === 'true') l7BranchA++;
 if (localStorage.getItem(`partF_branchB_lesson${i}_complete`) === 'true') l7BranchB++;
 if (localStorage.getItem(`partF_branchC_lesson${i}_complete`) === 'true') l7BranchC++;
 } catch (e) {}
 }
 for (let i = 1; i <= 12; i++) {
 try {
 if (localStorage.getItem(`partF_branchD_lesson${i}_complete`) === 'true') l7BranchD++;
 } catch (e) {}
 }
 for (let i = 1; i <= 10; i++) {
 try {
 if (localStorage.getItem(`partF_branchE_lesson${i}_complete`) === 'true') l7BranchE++;
 } catch (e) {}
 }
 const l7Completed = l7BranchA + l7BranchB + l7BranchC + l7BranchD + l7BranchE;
 const l7XP = (l7BranchA * 250) + (l7BranchB * 250) + (l7BranchC * 250) + (l7BranchD * 150) + (l7BranchE * 150);

 let l8Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partG_lesson${i}_remake_complete`) === 'true') l8Completed++;
 } catch (e) {}
 }

 let l9Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partH_lesson${i}_remake_complete`) === 'true') l9Completed++;
 } catch (e) {}
 }

 let l10Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partI_lesson${i}_remake_complete`) === 'true') l10Completed++;
 } catch (e) {}
 }

 function safeParseInt(val: any, defaultVal: number = 0): number {
 if (!val) return defaultVal;
 const parsed = parseInt(String(val), 10);
 return (isNaN(parsed) || parsed < 0) ? defaultVal : parsed;
 }

 // Daily Quests & Streaks
 const dailyQuestXP = safeParseInt(localStorage.getItem('novicodes_daily_quest_xp'), 0);
 const streakBonusXP = safeParseInt(localStorage.getItem('novicodes_streak_bonus_xp'), 0);
 const streakCount = safeParseInt(localStorage.getItem('novicodes_streak_count'), 0);

 let totalXP = 0;
 if (isL0) totalXP += 250;
 if (isL1) totalXP += 300;
 if (isL2) totalXP += 300;
 if (isL3) totalXP += 400;
 totalXP += advancedFoundationsXP;
 totalXP += (l4Completed * 100);
 totalXP += (l5Completed * 150);
 totalXP += (l6Completed * 200);
 totalXP += l7XP;
 totalXP += (l8Completed * 250);
 totalXP += (l9Completed * 250);
 totalXP += (l10Completed * 500);
 totalXP += (dailyQuestXP + streakBonusXP);
 totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

 let rankTitle = 'Web Explorer';
 let rankIcon = '';

 if (l10Completed >= 6) {
 rankTitle = 'Master Web Developer';
 rankIcon = '';
 } else if (l10Completed > 0 || isSaasFoundations) {
 rankTitle = 'SaaS UI Architect';
 rankIcon = '';
 } else if (l9Completed >= 6) {
 rankTitle = 'React Auth Specialist';
 rankIcon = '️';
 } else if (l9Completed > 0 || isAuthFoundations) {
 rankTitle = 'Security Engineer';
 rankIcon = '';
 } else if (l8Completed >= 6) {
 rankTitle = 'Async UI Specialist';
 rankIcon = '';
 } else if (l8Completed > 0 || isAsyncFoundations) {
 rankTitle = 'API Integration Specialist';
 rankIcon = '';
 } else if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6 && l7BranchD >= 12 && l7BranchE >= 10) {
 rankTitle = 'Principal Polymath';
 rankIcon = '';
 } else if (l7BranchA >= 6 || isCloudFoundations) {
 rankTitle = 'Cloud Specialist';
 rankIcon = '️';
 } else if (l7BranchB >= 6 || isSqlFoundations) {
 rankTitle = 'Database Architect';
 rankIcon = '️';
 } else if (l7BranchC >= 6 || isNextjsFoundations) {
 rankTitle = 'Next.js Engineer';
 rankIcon = '';
 } else if (l7BranchD >= 12 || isTypescriptFoundations) {
 rankTitle = 'TypeScript Specialist';
 rankIcon = '';
 } else if (l7BranchE >= 10 || isCssMotionFoundations) {
 rankTitle = 'CSS Motion Specialist';
 rankIcon = '';
 } else if (l7Completed > 0) {
 rankTitle = 'Fullstack Specialist';
 rankIcon = '';
 } else if (l6Completed >= 15) {
 rankTitle = 'Python Backend Architect';
 rankIcon = '';
 } else if (l6Completed > 0 || isPythonFoundations) {
 rankTitle = 'Python Backend Engineer';
 rankIcon = '';
 } else if (l5Completed >= 15) {
 rankTitle = 'React Master';
 rankIcon = '️';
 } else if (l5Completed > 0 || isReactFoundations) {
 rankTitle = 'React Engineer';
 rankIcon = '️';
 } else if (l4Completed >= 15) {
 rankTitle = 'DOM Master';
 rankIcon = '️';
 } else if (l4Completed > 0) {
 rankTitle = 'DOM Challenger';
 rankIcon = '️';
 } else if (isL1 || isL2 || isL3) {
 rankTitle = 'Code Apprentice';
 rankIcon = '️';
 } else {
 rankTitle = 'Web Explorer';
 rankIcon = '';
 }

 return {
 totalXP,
 maxXP,
 rankTitle,
 rankIcon,
 isL0,
 isL1,
 isL2,
 isL3,
 isReactFoundations,
 isPythonFoundations,
 isCloudFoundations,
 isSqlFoundations,
 isNextjsFoundations,
 isTypescriptFoundations,
 isCssMotionFoundations,
 isAsyncFoundations,
 isAuthFoundations,
 isSaasFoundations,
 advancedFoundationsXP,
 l4Completed,
 l5Completed,
 l6Completed,
 l7Completed,
 l7XP,
 l7BranchA,
 l7BranchB,
 l7BranchC,
 l7BranchD,
 l7BranchE,
 l8Completed,
 l9Completed,
 l10Completed,
 dailyQuestXP,
 streakBonusXP,
 streakCount
 };
}

/**
 * Universal Real-Time Header Stats Hydrator
 */
let isUpdating = false;

export function updateAllHeaderStats(): UserStats {
 const stats = getUserXPAndRank();
 if (typeof window === 'undefined' || typeof document === 'undefined') return stats;

 if (isUpdating) return stats;
 isUpdating = true;

 try {
 // 1. XP Badge Labels
 const xpBadgeLabels = document.querySelectorAll('.xp-badge .badge-label, #userXpLabel, #userTotalXPDisplay');
 xpBadgeLabels.forEach(el => {
 el.textContent = `${stats.totalXP.toLocaleString()} XP`;
 });

 const xpBadgeTracks = document.querySelectorAll('.xp-badge');
 xpBadgeTracks.forEach(el => {
 el.setAttribute('title', `Rank: ${stats.rankTitle} • ${stats.totalXP.toLocaleString()} / ${stats.maxXP.toLocaleString()} Total XP`);
 });

 // 2. Rank / Level Badge Labels
 const rankBadgeLabels = document.querySelectorAll('.rank-badge .badge-label, .level-badge .badge-label, #userRankLabel, #userRankTitleDisplay');
 rankBadgeLabels.forEach(el => {
 el.textContent = stats.rankTitle;
 });

 const rankBadgeIcons = document.querySelectorAll('.rank-badge .badge-icon, .level-badge .badge-icon, #userRankIcon, #userRankIconDisplay');
 rankBadgeIcons.forEach(el => {
 el.textContent = stats.rankIcon;
 });

 const rankBadgeElements = document.querySelectorAll('.rank-badge, .level-badge');
 rankBadgeElements.forEach(el => {
 el.setAttribute('title', `Developer Rank: ${stats.rankTitle}`);
 });

 // 3. Streak Badge Labels
 const streakValues = document.querySelectorAll('.streak-badge .streak-num-val, #userStreakLabel .streak-num-val');
 streakValues.forEach(el => {
 el.textContent = String(stats.streakCount);
 });
 } catch (e) {
 console.error('[XP Engine] Error hydrating UI badges:', e);
 } finally {
 isUpdating = false;
 }

 return stats;
}

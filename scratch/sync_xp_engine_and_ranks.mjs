import fs from 'fs';

// 1. UPDATE src/components/PlatformHeader.astro
let header = fs.readFileSync('src/components/PlatformHeader.astro', 'utf-8');
header = header.replace(
    /<span class="badge-label" id="userRankLabel">Web Novice<\/span>/g,
    `<span class="badge-label" id="userRankLabel">Web Explorer</span>`
);
fs.writeFileSync('src/components/PlatformHeader.astro', header, 'utf-8');
console.log('✅ Updated PlatformHeader.astro default rank to Web Explorer');


// 2. UPDATE src/scripts/xpEngine.ts
const xpEngineContent = `/**
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
    isAsyncFoundations: boolean;
    isAuthFoundations: boolean;
    isSaasFoundations: boolean;
    advancedFoundationsXP: number;
    // Coding Dojos
    l4Completed: number;
    l5Completed: number;
    l6Completed: number;
    l7Completed: number;
    l7BranchA: number;
    l7BranchB: number;
    l7BranchC: number;
    l8Completed: number;
    l9Completed: number;
    l10Completed: number;
    dailyQuestXP: number;
    streakBonusXP: number;
    streakCount: number;
}

export function getUserXPAndRank(): UserStats {
    const maxXP = 21100;

    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return {
            totalXP: 0,
            maxXP,
            rankTitle: 'Web Explorer',
            rankIcon: '🌐',
            isL0: false,
            isL1: false,
            isL2: false,
            isL3: false,
            isReactFoundations: false,
            isPythonFoundations: false,
            isCloudFoundations: false,
            isSqlFoundations: false,
            isNextjsFoundations: false,
            isAsyncFoundations: false,
            isAuthFoundations: false,
            isSaasFoundations: false,
            advancedFoundationsXP: 0,
            l4Completed: 0,
            l5Completed: 0,
            l6Completed: 0,
            l7Completed: 0,
            l7BranchA: 0,
            l7BranchB: 0,
            l7BranchC: 0,
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
    const isAsyncFoundations = localStorage.getItem('foundations_async_completed') === 'true';
    const isAuthFoundations = localStorage.getItem('foundations_auth_completed') === 'true';
    const isSaasFoundations = localStorage.getItem('foundations_saas_completed') === 'true';

    let advancedFoundationsXP = 0;
    if (isReactFoundations) advancedFoundationsXP += 300;
    if (isPythonFoundations) advancedFoundationsXP += 300;
    if (isCloudFoundations) advancedFoundationsXP += 300;
    if (isSqlFoundations) advancedFoundationsXP += 300;
    if (isNextjsFoundations) advancedFoundationsXP += 300;
    if (isAsyncFoundations) advancedFoundationsXP += 300;
    if (isAuthFoundations) advancedFoundationsXP += 300;
    if (isSaasFoundations) advancedFoundationsXP += 500;

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partB_lesson\${i}_remake_complete\`) === 'true' || 
                           localStorage.getItem(\`lesson_\${i}_completed\`) === 'true' || 
                           localStorage.getItem(\`lesson_\${i}_completed\`) === '1';
            if (isComp) l4Completed++;
        } catch (e) {}
    }

    let l5Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partC_lesson\${i}_remake_complete\`) === 'true';
            if (isComp) l5Completed++;
        } catch (e) {}
    }

    let l6Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partE_lesson\${i}_remake_complete\`) === 'true';
            if (isComp) l6Completed++;
        } catch (e) {}
    }

    let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partF_branchA_lesson\${i}_complete\`) === 'true') l7BranchA++;
            if (localStorage.getItem(\`partF_branchB_lesson\${i}_complete\`) === 'true') l7BranchB++;
            if (localStorage.getItem(\`partF_branchC_lesson\${i}_complete\`) === 'true') l7BranchC++;
        } catch (e) {}
    }
    const l7Completed = l7BranchA + l7BranchB + l7BranchC;

    let l8Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partG_lesson\${i}_remake_complete\`) === 'true') l8Completed++;
        } catch (e) {}
    }

    let l9Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partH_lesson\${i}_remake_complete\`) === 'true') l9Completed++;
        } catch (e) {}
    }

    let l10Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partI_lesson\${i}_remake_complete\`) === 'true') l10Completed++;
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
    totalXP += (l7Completed * 250);
    totalXP += (l8Completed * 250);
    totalXP += (l9Completed * 250);
    totalXP += (l10Completed * 500);
    totalXP += (dailyQuestXP + streakBonusXP);
    totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

    let rankTitle = 'Web Explorer';
    let rankIcon = '🌐';

    if (l10Completed >= 6) {
        rankTitle = 'Grand Master Fullstack Engineer';
        rankIcon = '👑';
    } else if (l10Completed > 0 || isSaasFoundations) {
        rankTitle = 'SaaS UI Architect';
        rankIcon = '🏆';
    } else if (l9Completed >= 6) {
        rankTitle = 'React Auth Specialist';
        rankIcon = '🛡️';
    } else if (l9Completed > 0 || isAuthFoundations) {
        rankTitle = 'Security Engineer';
        rankIcon = '🔐';
    } else if (l8Completed >= 6) {
        rankTitle = 'Async UI Specialist';
        rankIcon = '🌉';
    } else if (l8Completed > 0 || isAsyncFoundations) {
        rankTitle = 'API Integration Specialist';
        rankIcon = '⚡';
    } else if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6) {
        rankTitle = 'Principal Polymath';
        rankIcon = '👑';
    } else if (l7BranchA >= 6 || isCloudFoundations) {
        rankTitle = 'Cloud Specialist';
        rankIcon = '☁️';
    } else if (l7BranchB >= 6 || isSqlFoundations) {
        rankTitle = 'Database Architect';
        rankIcon = '🛢️';
    } else if (l7BranchC >= 6 || isNextjsFoundations) {
        rankTitle = 'Next.js Engineer';
        rankIcon = '⚡';
    } else if (l7Completed > 0) {
        rankTitle = 'Fullstack Specialist';
        rankIcon = '🚀';
    } else if (l6Completed >= 15) {
        rankTitle = 'Python Backend Architect';
        rankIcon = '🐍';
    } else if (l6Completed > 0 || isPythonFoundations) {
        rankTitle = 'Python Backend Engineer';
        rankIcon = '🐍';
    } else if (l5Completed >= 15) {
        rankTitle = 'React Master';
        rankIcon = '⚛️';
    } else if (l5Completed > 0 || isReactFoundations) {
        rankTitle = 'React Engineer';
        rankIcon = '⚛️';
    } else if (l4Completed >= 15) {
        rankTitle = 'DOM Master';
        rankIcon = '⚔️';
    } else if (l4Completed > 0) {
        rankTitle = 'DOM Challenger';
        rankIcon = '⚔️';
    } else if (isL1 || isL2 || isL3) {
        rankTitle = 'Code Apprentice';
        rankIcon = '🛡️';
    } else {
        rankTitle = 'Web Explorer';
        rankIcon = '🌐';
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
        isAsyncFoundations,
        isAuthFoundations,
        isSaasFoundations,
        advancedFoundationsXP,
        l4Completed,
        l5Completed,
        l6Completed,
        l7Completed,
        l7BranchA,
        l7BranchB,
        l7BranchC,
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
        const xpBadgeLabels = document.querySelectorAll('.xp-badge .badge-label, #userTotalXPDisplay');
        xpBadgeLabels.forEach(el => {
            if (el) el.textContent = \`\${stats.totalXP.toLocaleString()} XP\`;
        });

        const rankLabels = document.querySelectorAll('#userRankLabel');
        rankLabels.forEach(el => {
            if (el) el.textContent = stats.rankTitle;
        });

        const rankIcons = document.querySelectorAll('#userRankIcon');
        rankIcons.forEach(el => {
            if (el) el.textContent = stats.rankIcon;
        });

        const userLevelBadges = document.querySelectorAll('#userLevelBadge');
        userLevelBadges.forEach(el => {
            if (el) el.textContent = stats.rankIcon;
        });
    } catch (e) {}

    isUpdating = false;
    return stats;
}

if (typeof window !== 'undefined') {
    (window as any).getUserXPAndRank = getUserXPAndRank;
    (window as any).updateHeaderStats = updateAllHeaderStats;
}
`;

fs.writeFileSync('src/scripts/xpEngine.ts', xpEngineContent, 'utf-8');
console.log('✅ Updated src/scripts/xpEngine.ts with 21,100 maxXP and Advanced Foundations');


// 3. UPDATE src/components/UserProfileModal.astro
let userModal = fs.readFileSync('src/components/UserProfileModal.astro', 'utf-8');

// Update ranks array
const oldRanksArray = `        const ranks = [
            { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web Basics' },
            { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • HTML, CSS & JS' },
            { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • JS Widget Dojo' },
            { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • React Component Dojo' },
            { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Python Basics Dojo' },
            { title: 'Principal Polymath', icon: '👑', level: 'Level 7 • Specialized Tracks' },
            { title: 'Async UI Specialist', icon: '🌉', level: 'Level 8 • Async UI & Loading' },
            { title: 'React Auth Specialist', icon: '🛡️', level: 'Level 9 • User Logins & Auth' },
            { title: 'Grand Master Fullstack Engineer', icon: '👑', level: 'Level 10 • Complete App Capstone' }
        ];`;

const newRanksArray = `        const ranks = [
            { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web Basics' },
            { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • Core Foundations' },
            { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • JS Widget Dojo' },
            { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • React Component Dojo' },
            { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Python Basics Dojo' },
            { title: 'Fullstack Specialist', icon: '🚀', level: 'Level 7 • Cloud, SQL & Next.js' },
            { title: 'Async UI Specialist', icon: '🌉', level: 'Level 8 • Async UI & Skeletons' },
            { title: 'React Auth Specialist', icon: '🛡️', level: 'Level 9 • User Logins & Security' },
            { title: 'Grand Master Fullstack Engineer', icon: '👑', level: 'Level 10 • SaaS Capstone' }
        ];`;

userModal = userModal.replace(oldRanksArray, newRanksArray);

// Update XP Breakdown Grid in UserProfileModal
const oldXpGrid = `                        <!-- XP Breakdown Grid -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web Basics</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: \${stats.isL0 ? '#10b981' : '#64748b'};">\${stats.isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${((stats.isL1 ? 300 : 0) + (stats.isL2 ? 300 : 0) + (stats.isL3 ? 400 : 0))} / 1,000 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: JS Widget Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">\${stats.l4Completed * 100} / 1,500 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Component Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${stats.l5Completed * 150} / 2,250 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Basics Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">\${stats.l6Completed * 200} / 3,000 XP</div>
                            </div>
                            <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Specialized Tracks</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">\${stats.l7Completed * 250} / 4,500 XP</div>
                            </div>
                            <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #0369a1; font-weight: 700;">Level 8: Async UI & Skeletons</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${(stats.l8Completed || 0) * 250} / 1,500 XP</div>
                            </div>
                            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #4338ca; font-weight: 700;">Level 9: User Logins &amp; Auth</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #4f46e5;">\${(stats.l9Completed || 0) * 250} / 1,500 XP</div>
                            </div>
                            <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #b45309; font-weight: 700;">Level 10: Complete App Capstone</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #d97706;">\${(stats.l10Completed || 0) * 500} / 3,000 XP</div>
                            </div>
                            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 8px 10px; border-radius: 10px; grid-column: 1 / -1;">
                                <div style="font-size: 0.70rem; color: #854d0e; font-weight: 700;">🔥 Daily Quests &amp; Streaks XP</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #ca8a04;">+\${(stats.dailyQuestXP + stats.streakBonusXP).toLocaleString()} XP (\${stats.streakCount}-Day Streak)</div>
                            </div>
                        </div>`;

const newXpGrid = `                        <!-- XP Breakdown Grid -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web Basics</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: \${stats.isL0 ? '#10b981' : '#64748b'};">\${stats.isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Core Foundations (L1-3)</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${((stats.isL1 ? 300 : 0) + (stats.isL2 ? 300 : 0) + (stats.isL3 ? 400 : 0))} / 1,000 XP</div>
                            </div>
                            <div style="background: #eef2ff; border: 1px solid #c7d2fe; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #4338ca; font-weight: 700;">Advanced Foundations (L5-10)</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #4f46e5;">\${stats.advancedFoundationsXP || 0} / 2,600 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: JS Widget Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">\${stats.l4Completed * 100} / 1,500 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Component Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${stats.l5Completed * 150} / 2,250 XP</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Basics Dojo</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">\${stats.l6Completed * 200} / 3,000 XP</div>
                            </div>
                            <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Specialized Tracks</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">\${stats.l7Completed * 250} / 4,500 XP</div>
                            </div>
                            <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #0369a1; font-weight: 700;">Level 8: Async UI & Skeletons</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">\${(stats.l8Completed || 0) * 250} / 1,500 XP</div>
                            </div>
                            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #4338ca; font-weight: 700;">Level 9: User Logins &amp; Auth</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #4f46e5;">\${(stats.l9Completed || 0) * 250} / 1,500 XP</div>
                            </div>
                            <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px 10px; border-radius: 10px;">
                                <div style="font-size: 0.70rem; color: #b45309; font-weight: 700;">Level 10: Complete App Capstone</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #d97706;">\${(stats.l10Completed || 0) * 500} / 3,000 XP</div>
                            </div>
                            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 8px 10px; border-radius: 10px; grid-column: 1 / -1;">
                                <div style="font-size: 0.70rem; color: #854d0e; font-weight: 700;">🔥 Daily Quests &amp; Streaks XP</div>
                                <div style="font-size: 0.84rem; font-weight: 800; color: #ca8a04;">+\${(stats.dailyQuestXP + stats.streakBonusXP).toLocaleString()} XP (\${stats.streakCount}-Day Streak)</div>
                            </div>
                        </div>`;

userModal = userModal.replace(oldXpGrid, newXpGrid);
fs.writeFileSync('src/components/UserProfileModal.astro', userModal, 'utf-8');
console.log('✅ Updated UserProfileModal.astro with Advanced Foundations card and new rank roadmap');


// 4. UPDATE public/foundations.js with Quiz Completion Storage & Routing for all 11 tracks
let foundationsJs = fs.readFileSync('public/foundations.js', 'utf-8');

const oldQuizSubmitLogic = `            if (correctCount === totalQuestions) {
                // Save Track Completion State to LocalStorage
                if (trackData.trackKey === 'html') {
                    localStorage.setItem('level1_completed', 'true');
                } else if (trackData.trackKey === 'css') {
                    localStorage.setItem('level2_completed', 'true');
                } else if (trackData.trackKey === 'js') {
                    localStorage.setItem('level3_completed', 'true');
                }

                let nextUrl = '/';
                let nextLabel = '🏠 Return to Dashboard';
                if (trackData.trackKey === 'html') {
                    nextUrl = '/foundations.html?track=css';
                    nextLabel = '🎨 Level 2: CSS Foundations ➔';
                } else if (trackData.trackKey === 'css') {
                    nextUrl = '/foundations.html?track=js';
                    nextLabel = '⚡ Level 3: JS Foundations ➔';
                } else if (trackData.trackKey === 'js') {
                    nextUrl = '/2. partB/hub.html';
                    nextLabel = '⚔️ Enter Level 4 (DOM Dojo) ➔';
                }`;

const newQuizSubmitLogic = `            if (correctCount === totalQuestions) {
                // Save Track Completion State to LocalStorage
                const trackKeyMap = {
                    html: 'level1_completed',
                    css: 'level2_completed',
                    js: 'level3_completed',
                    react: 'foundations_react_completed',
                    python: 'foundations_python_completed',
                    cloud: 'foundations_cloud_completed',
                    sql: 'foundations_sql_completed',
                    nextjs: 'foundations_nextjs_completed',
                    async: 'foundations_async_completed',
                    auth: 'foundations_auth_completed',
                    saas: 'foundations_saas_completed'
                };
                if (trackKeyMap[trackData.trackKey]) {
                    localStorage.setItem(trackKeyMap[trackData.trackKey], 'true');
                }

                let nextUrl = '/';
                let nextLabel = '🏠 Return to Dashboard';
                if (trackData.trackKey === 'html') {
                    nextUrl = '/foundations.html?track=css';
                    nextLabel = '🎨 Level 2: CSS Foundations ➔';
                } else if (trackData.trackKey === 'css') {
                    nextUrl = '/foundations.html?track=js';
                    nextLabel = '⚡ Level 3: JS Foundations ➔';
                } else if (trackData.trackKey === 'js') {
                    nextUrl = '/2. partB/hub.html';
                    nextLabel = '⚔️ Enter Level 4 (DOM Dojo) ➔';
                } else if (trackData.trackKey === 'react') {
                    nextUrl = '/3. partC/hub.html';
                    nextLabel = '⚛️ Enter Level 5 React Dojo ➔';
                } else if (trackData.trackKey === 'python') {
                    nextUrl = '/5. partE/hub.html';
                    nextLabel = '🐍 Enter Level 6 Python Dojo ➔';
                } else if (trackData.trackKey === 'cloud') {
                    nextUrl = '/6. partF/branchA/lesson1_remake.html';
                    nextLabel = '☁️ Launch Track 7A: Cloud ➔';
                } else if (trackData.trackKey === 'sql') {
                    nextUrl = '/6. partF/branchB/lesson1_remake.html';
                    nextLabel = '🛢️ Launch Track 7B: SQL ➔';
                } else if (trackData.trackKey === 'nextjs') {
                    nextUrl = '/6. partF/branchC/lesson1_remake.html';
                    nextLabel = '⚡ Launch Track 7C: Next.js ➔';
                } else if (trackData.trackKey === 'async') {
                    nextUrl = '/7. partG/hub.html';
                    nextLabel = '🌉 Enter Level 8 Async UI Dojo ➔';
                } else if (trackData.trackKey === 'auth') {
                    nextUrl = '/8. partH/hub.html';
                    nextLabel = '🛡️ Enter Level 9 React Auth Dojo ➔';
                } else if (trackData.trackKey === 'saas') {
                    nextUrl = '/9. partI/hub.html';
                    nextLabel = '🏆 Launch Level 10 SaaS Capstone ➔';
                }`;

foundationsJs = foundationsJs.replace(oldQuizSubmitLogic, newQuizSubmitLogic);
fs.writeFileSync('public/foundations.js', foundationsJs, 'utf-8');
console.log('✅ Updated public/foundations.js quiz submission engine');


// 5. UPDATE public/scripts/dashboard.js & public/foundations.js getUserXPAndRank functions
const jsXpEngineFunction = `window.getUserXPAndRank = function() {
    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

    const isReactFoundations = localStorage.getItem('foundations_react_completed') === 'true';
    const isPythonFoundations = localStorage.getItem('foundations_python_completed') === 'true';
    const isCloudFoundations = localStorage.getItem('foundations_cloud_completed') === 'true';
    const isSqlFoundations = localStorage.getItem('foundations_sql_completed') === 'true';
    const isNextjsFoundations = localStorage.getItem('foundations_nextjs_completed') === 'true';
    const isAsyncFoundations = localStorage.getItem('foundations_async_completed') === 'true';
    const isAuthFoundations = localStorage.getItem('foundations_auth_completed') === 'true';
    const isSaasFoundations = localStorage.getItem('foundations_saas_completed') === 'true';

    let advancedFoundationsXP = 0;
    if (isReactFoundations) advancedFoundationsXP += 300;
    if (isPythonFoundations) advancedFoundationsXP += 300;
    if (isCloudFoundations) advancedFoundationsXP += 300;
    if (isSqlFoundations) advancedFoundationsXP += 300;
    if (isNextjsFoundations) advancedFoundationsXP += 300;
    if (isAsyncFoundations) advancedFoundationsXP += 300;
    if (isAuthFoundations) advancedFoundationsXP += 300;
    if (isSaasFoundations) advancedFoundationsXP += 500;

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partB_lesson\${i}_remake_complete\`) === 'true' || 
                           localStorage.getItem(\`lesson_\${i}_completed\`) === 'true' || 
                           localStorage.getItem(\`lesson_\${i}_completed\`) === '1';
            if (isComp) l4Completed++;
        } catch (e) {}
    }

    let l5Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partC_lesson\${i}_remake_complete\`) === 'true';
            if (isComp) l5Completed++;
        } catch (e) {}
    }

    let l6Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(\`partE_lesson\${i}_remake_complete\`) === 'true';
            if (isComp) l6Completed++;
        } catch (e) {}
    }

    let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partF_branchA_lesson\${i}_complete\`) === 'true') l7BranchA++;
            if (localStorage.getItem(\`partF_branchB_lesson\${i}_complete\`) === 'true') l7BranchB++;
            if (localStorage.getItem(\`partF_branchC_lesson\${i}_complete\`) === 'true') l7BranchC++;
        } catch (e) {}
    }
    const l7Completed = l7BranchA + l7BranchB + l7BranchC;

    let l8Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partG_lesson\${i}_remake_complete\`) === 'true') l8Completed++;
        } catch (e) {}
    }

    let l9Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partH_lesson\${i}_remake_complete\`) === 'true') l9Completed++;
        } catch (e) {}
    }

    let l10Completed = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(\`partI_lesson\${i}_remake_complete\`) === 'true') l10Completed++;
        } catch (e) {}
    }

    function safeParseInt(val, defaultVal) {
        if (!val) return defaultVal || 0;
        const parsed = parseInt(String(val), 10);
        return (isNaN(parsed) || parsed < 0) ? (defaultVal || 0) : parsed;
    }

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
    totalXP += (l7Completed * 250);
    totalXP += (l8Completed * 250);
    totalXP += (l9Completed * 250);
    totalXP += (l10Completed * 500);
    totalXP += (dailyQuestXP + streakBonusXP);
    totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

    let rankTitle = 'Web Explorer';
    let rankIcon = '🌐';

    if (l10Completed >= 6) {
        rankTitle = 'Grand Master Fullstack Engineer';
        rankIcon = '👑';
    } else if (l10Completed > 0 || isSaasFoundations) {
        rankTitle = 'SaaS UI Architect';
        rankIcon = '🏆';
    } else if (l9Completed >= 6) {
        rankTitle = 'React Auth Specialist';
        rankIcon = '🛡️';
    } else if (l9Completed > 0 || isAuthFoundations) {
        rankTitle = 'Security Engineer';
        rankIcon = '🔐';
    } else if (l8Completed >= 6) {
        rankTitle = 'Async UI Specialist';
        rankIcon = '🌉';
    } else if (l8Completed > 0 || isAsyncFoundations) {
        rankTitle = 'API Integration Specialist';
        rankIcon = '⚡';
    } else if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6) {
        rankTitle = 'Principal Polymath';
        rankIcon = '👑';
    } else if (l7BranchA >= 6 || isCloudFoundations) {
        rankTitle = 'Cloud Specialist';
        rankIcon = '☁️';
    } else if (l7BranchB >= 6 || isSqlFoundations) {
        rankTitle = 'Database Architect';
        rankIcon = '🛢️';
    } else if (l7BranchC >= 6 || isNextjsFoundations) {
        rankTitle = 'Next.js Engineer';
        rankIcon = '⚡';
    } else if (l7Completed > 0) {
        rankTitle = 'Fullstack Specialist';
        rankIcon = '🚀';
    } else if (l6Completed >= 15) {
        rankTitle = 'Python Backend Architect';
        rankIcon = '🐍';
    } else if (l6Completed > 0 || isPythonFoundations) {
        rankTitle = 'Python Backend Engineer';
        rankIcon = '🐍';
    } else if (l5Completed >= 15) {
        rankTitle = 'React Master';
        rankIcon = '⚛️';
    } else if (l5Completed > 0 || isReactFoundations) {
        rankTitle = 'React Engineer';
        rankIcon = '⚛️';
    } else if (l4Completed >= 15) {
        rankTitle = 'DOM Master';
        rankIcon = '⚔️';
    } else if (l4Completed > 0) {
        rankTitle = 'DOM Challenger';
        rankIcon = '⚔️';
    } else if (isL1 || isL2 || isL3) {
        rankTitle = 'Code Apprentice';
        rankIcon = '🛡️';
    } else {
        rankTitle = 'Web Explorer';
        rankIcon = '🌐';
    }

    return {
        totalXP,
        maxXP: 21100,
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
        isAsyncFoundations,
        isAuthFoundations,
        isSaasFoundations,
        advancedFoundationsXP,
        l4Completed,
        l5Completed,
        l6Completed,
        l7Completed,
        l7BranchA,
        l7BranchB,
        l7BranchC,
        l8Completed,
        l9Completed,
        l10Completed,
        dailyQuestXP,
        streakBonusXP,
        streakCount
    };
};`;

// Replace in public/scripts/dashboard.js
let dash = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');
dash = dash.replace(/window\.getUserXPAndRank = function\(\) \{[\s\S]*?\n\};/, jsXpEngineFunction);
fs.writeFileSync('public/scripts/dashboard.js', dash, 'utf-8');

// Replace in public/foundations.js
foundationsJs = fs.readFileSync('public/foundations.js', 'utf-8');
foundationsJs = foundationsJs.replace(/window\.getUserXPAndRank = function\(\) \{[\s\S]*?\n\};/, jsXpEngineFunction);
fs.writeFileSync('public/foundations.js', foundationsJs, 'utf-8');

// Replace in public/1. partA/web_history.js
let webHist = fs.readFileSync('public/1. partA/web_history.js', 'utf-8');
webHist = webHist.replace(/window\.getUserXPAndRank = function\(\) \{[\s\S]*?\n\};/, jsXpEngineFunction);
fs.writeFileSync('public/1. partA/web_history.js', webHist, 'utf-8');

console.log('✅ Synchronized getUserXPAndRank across dashboard.js, foundations.js, and web_history.js');

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
    l4Completed: number;
    l5Completed: number;
    l6Completed: number;
    l7Completed: number;
    l7BranchA: number;
    l7BranchB: number;
    l7BranchC: number;
    dailyQuestXP: number;
    streakBonusXP: number;
    streakCount: number;
}

export function getUserXPAndRank(): UserStats {
    const maxXP = 8000;

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
            l4Completed: 0,
            l5Completed: 0,
            l6Completed: 0,
            l7Completed: 0,
            l7BranchA: 0,
            l7BranchB: 0,
            l7BranchC: 0,
            dailyQuestXP: 0,
            streakBonusXP: 0,
            streakCount: 0
        };
    }

    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

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

    let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(`partF_branchA_lesson${i}_complete`) === 'true') l7BranchA++;
            if (localStorage.getItem(`partF_branchB_lesson${i}_complete`) === 'true') l7BranchB++;
            if (localStorage.getItem(`partF_branchC_lesson${i}_complete`) === 'true') l7BranchC++;
        } catch (e) {}
    }
    const l7Completed = l7BranchA + l7BranchB + l7BranchC;

    function safeParseInt(val: any, defaultVal: number = 0): number {
        if (!val) return defaultVal;
        const parsed = parseInt(String(val), 10);
        return (isNaN(parsed) || parsed < 0) ? defaultVal : parsed;
    }

    // Daily Quests & Streaks (Sanitized & Tamper Resilient)
    const dailyQuestXP = safeParseInt(localStorage.getItem('novicodes_daily_quest_xp'), 0);
    const streakBonusXP = safeParseInt(localStorage.getItem('novicodes_streak_bonus_xp'), 0);
    const streakCount = safeParseInt(localStorage.getItem('novicodes_streak_count'), 0);

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);
    totalXP += (l6Completed * 200);
    totalXP += (l7Completed * 250);
    totalXP += (dailyQuestXP + streakBonusXP);
    totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

    let rankTitle = 'Web Explorer';
    let rankIcon = '🌐';

    if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6) {
        rankTitle = 'Principal Polymath';
        rankIcon = '👑';
    } else if (l7BranchA >= 6) {
        rankTitle = 'Cloud Specialist';
        rankIcon = '☁️';
    } else if (l7BranchB >= 6) {
        rankTitle = 'Database Architect';
        rankIcon = '🛢️';
    } else if (l7BranchC >= 6) {
        rankTitle = 'Next.js Engineer';
        rankIcon = '⚡';
    } else if (l7Completed > 0) {
        rankTitle = 'Mastery Challenger';
        rankIcon = '🚀';
    } else if (l6Completed >= 15 && l5Completed >= 15) {
        rankTitle = 'Master Architect';
        rankIcon = '👑';
    } else if (l6Completed > 0) {
        rankTitle = 'Python Backend Engineer';
        rankIcon = '🐍';
    } else if (l5Completed >= 15) {
        rankTitle = 'Fullstack Master';
        rankIcon = '🏆';
    } else if (l5Completed > 0) {
        rankTitle = 'React Engineer';
        rankIcon = '⚛️';
    } else if (l4Completed >= 15) {
        rankTitle = 'Dojo Master';
        rankIcon = '⚔️';
    } else if (l4Completed > 0) {
        rankTitle = 'DOM Challenger';
        rankIcon = '⚔️';
    } else if (isL1 || isL2 || isL3) {
        rankTitle = 'Code Apprentice';
        rankIcon = '🛡️';
    } else if (isL0) {
        rankTitle = 'Web Explorer';
        rankIcon = '🌐';
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
        l4Completed,
        l5Completed,
        l6Completed,
        l7Completed,
        l7BranchA,
        l7BranchB,
        l7BranchC,
        dailyQuestXP,
        streakBonusXP,
        streakCount
    };
}

/**
 * Universal Real-Time Header Stats Hydrator
 * Updates all navbar elements across the page in real-time
 */
let isUpdating = false;

export function updateAllHeaderStats(): UserStats {
    const stats = getUserXPAndRank();
    if (typeof window === 'undefined' || typeof document === 'undefined') return stats;

    if (isUpdating) return stats;
    isUpdating = true;

    try {
        // 1. Update XP Labels
        const xpLabels = document.querySelectorAll('#userXpLabel, .xp-badge .badge-label, .user-xp-label');
        xpLabels.forEach(el => {
            el.textContent = `${stats.totalXP.toLocaleString()} XP`;
        });

        // 2. Update Rank Labels & Icons
        const rankLabels = document.querySelectorAll('#userRankLabel, .level-badge .badge-label, .user-rank-label');
        rankLabels.forEach(el => {
            el.textContent = stats.rankTitle;
        });

        const rankIcons = document.querySelectorAll('#userRankIcon, .level-badge .badge-icon, .user-rank-icon');
        rankIcons.forEach(el => {
            el.textContent = stats.rankIcon;
        });

        // 3. Update Streak Badges
        const streakNums = document.querySelectorAll('#userStreakLabel .streak-num-val, .streak-badge .streak-num-val, #streakBadgeVal');
        streakNums.forEach(el => {
            el.textContent = stats.streakCount.toString();
        });

        // 4. Animate Visual Pulse on XP Badge
        const xpBadges = document.querySelectorAll('.xp-badge');
        xpBadges.forEach(b => {
            b.classList.remove('xp-reward-pulse');
            void (b as HTMLElement).offsetWidth; // Force CSS reflow
            b.classList.add('xp-reward-pulse');
        });
    } finally {
        isUpdating = false;
    }

    return stats;
}

export function broadcastXPUpdated(): void {
    if (typeof window !== 'undefined') {
        const stats = updateAllHeaderStats();
        try {
            window.dispatchEvent(new CustomEvent('novicodes:xp_updated', { detail: stats }));
        } catch (e) {}
    }
}

// Global window registration for cross-script compatibility
if (typeof window !== 'undefined') {
    (window as any).getUserXPAndRank = getUserXPAndRank;
    (window as any).updateHeaderStats = updateAllHeaderStats;
    (window as any).broadcastXPUpdated = broadcastXPUpdated;
}

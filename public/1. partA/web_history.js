/**
 * NoviCodes - Level 0 Web History & Architecture Controller Script
 * Unified Interactive Engine with Era Simulator, Packet Flow, and Progress Sync
 */

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderStats();
    initEraTimeMachine();
    initPacketSimulator();
    initTimelineFilter();
    initPillarsProgress();
    initQuizEngine();
    initBackToTop();
});

/* ==========================================================================
   1. User XP & Developer Rank Profile Engine (Unified Levels 0 - 7)
   ========================================================================== */
window.getUserXPAndRank = function() {
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
};

function updateHeaderStats() {
    const stats = window.getUserXPAndRank();
    const xpLabel = document.getElementById('userXpLabel');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');

    if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (rankLabel) rankLabel.textContent = stats.rankTitle;
    if (rankIcon) rankIcon.textContent = stats.rankIcon;
}

window.openUserProfileModal = function() {
    const stats = window.getUserXPAndRank();
    const progressPct = Math.min(Math.round((stats.totalXP / stats.maxXP) * 100), 100);

    const ranks = [
        { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web History' },
        { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • Foundations' },
        { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • DOM Dojo' },
        { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • Framework Dojo' },
        { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Backend Dojo' },
        { title: 'Cloud Specialist', icon: '☁️', level: 'Level 7 • Track 7A DevOps' },
        { title: 'Database Architect', icon: '🛢️', level: 'Level 7 • Track 7B Database' },
        { title: 'Next.js Engineer', icon: '⚡', level: 'Level 7 • Track 7C Next.js' },
        { title: 'Fullstack Master', icon: '🏆', level: 'Level 5 & 6 Complete' },
        { title: 'Master Architect', icon: '👑', level: 'Levels 0-6 Complete' },
        { title: 'Principal Polymath', icon: '👑', level: '100% All Level 7 Tracks' }
    ];

    const currentRankTitle = stats.rankTitle;

    const rankLadderHTML = ranks.map(r => {
        const isCurrent = currentRankTitle === r.title || (r.title === 'DOM Challenger' && currentRankTitle === 'Dojo Master');
        const bg = isCurrent ? 'background: #eff6ff; border: 1px solid #3b82f6;' : 'background: #f8fafc; border: 1px solid #e2e8f0;';
        const badgeBg = isCurrent ? 'background: #2563eb; color: #ffffff;' : 'background: #e2e8f0; color: #64748b;';
        const badgeText = isCurrent ? '✅ Active' : '🔒 Locked';

        return `
            <div style="${bg} padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px; text-align: left;">
                    <span style="font-size: 1.1rem; flex-shrink: 0;">${r.icon}</span>
                    <div>
                        <div style="font-size: 0.84rem; font-weight: 800; color: ${isCurrent ? '#1e40af' : '#1e293b'};">${r.title}</div>
                        <div style="font-size: 0.72rem; color: #64748b;">${r.level}</div>
                    </div>
                </div>
                <span style="${badgeBg} font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">${badgeText}</span>
            </div>
        `;
    }).join('');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '👤 Learner Profile & Rank Roadmap',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; max-width: 100%; box-sizing: border-box;">
                    <!-- Rank Banner -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 16px 14px; border-radius: 14px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
                        <div style="font-size: 2.4rem; margin-bottom: 4px;">${stats.rankIcon}</div>
                        <div style="font-size: 1.15rem; font-weight: 800;">${stats.rankTitle}</div>
                        <div style="font-size: 0.85rem; color: #93c5fd; margin-top: 2px;">${stats.totalXP.toLocaleString()} / ${stats.maxXP.toLocaleString()} Total XP</div>
                        
                        <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 99px; margin-top: 12px; overflow: hidden;">
                            <div style="background: #38bdf8; height: 100%; width: ${progressPct}%; border-radius: 99px; transition: width 0.4s ease;"></div>
                        </div>
                    </div>

                    <!-- XP Breakdown Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web History</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: ${stats.isL0 ? '#10b981' : '#64748b'};">${stats.isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${((stats.isL1?300:0)+(stats.isL2?300:0)+(stats.isL3?400:0))} / 1,000 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: DOM Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">${stats.l4Completed * 100} / 1,500 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${stats.l5Completed * 150} / 2,250 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">${stats.l6Completed * 200} / 3,000 XP</div>
                        </div>
                        <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Mastery Hub</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">${stats.l7Completed * 250} / 4,500 XP</div>
                        </div>
                        <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #0369a1; font-weight: 700;">Level 8: API Bridge</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${(stats.l8Completed || 0) * 250} / 1,500 XP</div>
                        </div>
                        <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #4338ca; font-weight: 700;">Level 9: Auth &amp; DB</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #4f46e5;">${(stats.l9Completed || 0) * 250} / 1,500 XP</div>
                        </div>
                        <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #b45309; font-weight: 700;">Level 10: Apex SaaS</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #d97706;">${(stats.l10Completed || 0) * 500} / 3,000 XP</div>
                        </div>
                        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 8px 10px; border-radius: 10px; grid-column: 1 / -1;">
                            <div style="font-size: 0.70rem; color: #854d0e; font-weight: 700;">🔥 Daily Quests &amp; Streaks XP</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #ca8a04;">+${(stats.dailyQuestXP + stats.streakBonusXP).toLocaleString()} XP (${stats.streakCount}-Day Streak)</div>
                        </div>
                    </div>

                    <!-- Developer Rank Progression Roadmap -->
                    <div style="text-align: left; margin-bottom: 14px;">
                        <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                            🗺️ Developer Rank Progression Roadmap
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 6px; touch-action: pan-y; -webkit-overflow-scrolling: touch; padding-right: 2px;">
                            ${rankLadderHTML}
                        </div>
                    </div>

                    <!-- Reset Danger Action -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center;">
                        <button onclick="window.confirmResetProgress()" style="background: #fee2e2; border: 1px solid #fca5a5; color: #dc2626; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: all 0.2s ease;">
                            🔄 Reset Course Progress
                        </button>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        });
    }
};

window.confirmResetProgress = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Reset All Progress?',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <p style="color: #475569; font-size: 0.93rem; line-height: 1.6; margin-bottom: 12px;">
                        This will reset your <strong>XP back to 0</strong>, reset <strong>Daily Quest XP & Streaks</strong>, clear your <strong>Developer Rank</strong>, and reset all completed lesson checkmarks across <strong>Level 0 through Level 10</strong>.
                    </p>
                    <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 10px; border-radius: 10px; font-weight: 700; color: #be123c; font-size: 0.84rem;">
                        🚨 This action cannot be undone!
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#2563eb',
            confirmButtonText: '🚨 Yes, Reset Everything',
            cancelButtonText: 'Cancel (Keep Progress)',
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Exhaustive Full Platform Wipe
                localStorage.clear();
                sessionStorage.clear();

                if (typeof updateAllHeaderStats === 'function') {
                    updateAllHeaderStats();
                }

                Swal.fire({
                    icon: 'success',
                    title: '🔄 Progress Reset!',
                    text: 'All progress, XP, and streaks have been cleared. Re-initializing NoviCodes...',
                    timer: 1200,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
            }
        });
    }
};

/* ==========================================================================
   2. Interactive Web Era Time Machine
   ========================================================================== */
const eraData = {
    '1991': {
        url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
        html: `
            <div class="screen-1991">
                <h2>WorldWideWeb - Executive Summary</h2>
                <p>The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.</p>
                <p>Everything there is online at CERN is linked directly or indirectly to this document.</p>
                <ul>
                    <li><a href="javascript:void(0)" onclick="Swal.fire('Hypertext Link', 'In 1991, clicking blue links retrieved raw text over HTTP port 80.', 'info')">What is Hypertext?</a></li>
                    <li><a href="javascript:void(0)" onclick="Swal.fire('Tim Berners-Lee', 'Created HTML, HTTP, and URLs on a NeXT Computer at CERN.', 'info')">Technical Project Documentation</a></li>
                </ul>
            </div>
        `
    },
    '2004': {
        url: 'https://web2004.portal.net/my-blog/dev-journal',
        html: `
            <div class="screen-2004">
                <div class="blog-header">
                    📻 Web 2.0 Community Blog • Powered by CSS & Early AJAX
                </div>
                <h3 style="margin: 0 0 6px 0; color: #1e3a8a;">Welcome to the Read-Write Web!</h3>
                <p style="font-size: 0.88rem; line-height: 1.5; color: #475569; margin: 0 0 10px 0;">
                    Web 2.0 transformed the internet from static read-only documents into collaborative social networks, blogs, and interactive web widgets.
                </p>
                <div style="display: flex; gap: 8px;">
                    <button onclick="Swal.fire('Dynamic DOM', 'JavaScript in 2004 introduced XMLHttpRequest to update pages without full reload!', 'success')" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.80rem;">👍 Leave a Comment (AJAX)</button>
                    <span style="font-size: 0.78rem; color: #64748b; display: flex; align-items: center;">⭐ 1,420 Readers</span>
                </div>
            </div>
        `
    },
    '2026': {
        url: 'https://novicodes.dev/cloud-app/dashboard',
        html: `
            <div class="screen-2026">
                <span class="modern-pill">⚡ 2026 Modern Web App Engine</span>
                <h3 style="margin: 0 0 8px 0; font-size: 1.25rem;">Fullstack Serverless & Instant Edge Delivery</h3>
                <p style="font-size: 0.88rem; color: #cbd5e1; margin: 0 0 14px 0; line-height: 1.55;">
                    Modern web development combines React Server Components, Python microservices, zero-latency global edge CDNs, and AI-accelerated dev tools.
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span style="background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700;">🟢 Edge Latency: 12ms</span>
                    <span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700;">⚛️ Next.js + Python SSR</span>
                </div>
            </div>
        `
    }
};

function initEraTimeMachine() {
    const tabButtons = document.querySelectorAll('.era-tab-btn');
    const urlBar = document.getElementById('browserUrlInput');
    const screenContent = document.getElementById('eraScreenContent');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const eraKey = btn.dataset.era;
            const data = eraData[eraKey];
            if (data) {
                if (urlBar) urlBar.textContent = data.url;
                if (screenContent) screenContent.innerHTML = data.html;
            }
        });
    });
}

/* ==========================================================================
   3. "How the Internet Works in 4 Steps" Packet Simulator
   ========================================================================== */
function initPacketSimulator() {
    const simulateBtn = document.getElementById('simulatePacketBtn');
    const stepCards = document.querySelectorAll('.flow-step-card');
    if (!simulateBtn) return;

    let isRunning = false;

    simulateBtn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        simulateBtn.disabled = true;
        simulateBtn.innerHTML = '<span>⏳ Packet Travelling Across Internet...</span>';

        let currentStep = 0;
        stepCards.forEach(c => c.classList.remove('active'));

        const interval = setInterval(() => {
            stepCards.forEach((c, idx) => {
                c.classList.toggle('active', idx === currentStep);
            });

            currentStep++;
            if (currentStep >= stepCards.length) {
                clearInterval(interval);
                setTimeout(() => {
                    simulateBtn.disabled = false;
                    simulateBtn.innerHTML = '<span>🚀 Send Another Test Request</span>';
                    isRunning = false;
                }, 1200);
            }
        }, 900);
    });
}

/* ==========================================================================
   4. Browser Evolution Timeline Filter
   ========================================================================== */
const browserMilestones = [
    { name: 'WorldWideWeb', year: 1990, cat: 'pioneers', icon: '🌍', desc: 'The first web browser & editor created by Tim Berners-Lee at CERN.', impact: 'Birth of the Web' },
    { name: 'NCSA Mosaic', year: 1993, cat: 'pioneers', icon: '🖼️', desc: 'First browser to display images inline with text, making the web visual.', impact: 'Visual Revolution' },
    { name: 'Netscape Navigator', year: 1994, cat: 'pioneers', icon: '🧭', desc: 'Introduced JavaScript, cookies, and dominated 90% of the early web.', impact: 'Web Goes Mainstream' },
    { name: 'Internet Explorer', year: 1995, cat: 'wars', icon: '🌐', desc: 'Bundled with Windows, triggering the historic First Browser War.', impact: 'Browser Wars Begin' },
    { name: 'Apple Safari', year: 2003, cat: 'wars', icon: '🧭', desc: 'Pioneered WebKit and opened the door for modern mobile browsing on smartphones.', impact: 'Mobile Web Pioneer' },
    { name: 'Mozilla Firefox', year: 2004, cat: 'wars', icon: '🦊', desc: 'Open-source champion that popularized tabbed browsing and extensions.', impact: 'Open Web Standards' },
    { name: 'Google Chrome', year: 2008, cat: 'modern', icon: '🌟', desc: 'Introduced the ultra-fast V8 JavaScript engine, powering today modern apps.', impact: 'V8 Speed Engine' },
    { name: 'Microsoft Edge', year: 2015, cat: 'modern', icon: '💎', desc: 'Replaced legacy IE with Chromium-powered performance and modern standards.', impact: 'Modern Web Engine' }
];

function initTimelineFilter() {
    const filterBtns = document.querySelectorAll('.filter-pill-btn');
    const timelineContainer = document.getElementById('timelineCardsContainer');
    if (!timelineContainer) return;

    function renderCards(filter) {
        timelineContainer.innerHTML = '';
        const filtered = filter === 'all' ? browserMilestones : browserMilestones.filter(b => b.cat === filter);

        filtered.forEach(b => {
            const card = document.createElement('div');
            card.className = 'browser-milestone-card';
            card.innerHTML = `
                <div class="card-top">
                    <span class="browser-icon-box">${b.icon}</span>
                    <span class="browser-year-tag">${b.year}</span>
                </div>
                <h3 class="browser-name">${b.name}</h3>
                <p class="browser-desc">${b.desc}</p>
                <span class="browser-impact-pill">${b.impact}</span>
            `;
            timelineContainer.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards(btn.dataset.filter);
        });
    });

    renderCards('all');
}

/* ==========================================================================
   5. 4 Core Pillars Progress Synchronization
   ========================================================================== */
function initPillarsProgress() {
    const isWebsite = localStorage.getItem('readWebsite') === 'true';
    const isHTML = localStorage.getItem('readHTML') === 'true';
    const isCSS = localStorage.getItem('readCSS') === 'true';
    const isJS = localStorage.getItem('readJavaScript') === 'true';
    const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';
    const isL0 = localStorage.getItem('level0_completed') === 'true';

    const count = (isWebsite ? 1 : 0) + (isHTML ? 1 : 0) + (isCSS ? 1 : 0) + (isJS ? 1 : 0);

    const cardWebsite = document.getElementById('cardWebsite');
    const cardHTML = document.getElementById('cardHTML');
    const cardCSS = document.getElementById('cardCSS');
    const cardJS = document.getElementById('cardJS');

    if (cardWebsite && isWebsite) cardWebsite.classList.add('completed');
    if (cardHTML && isHTML) cardHTML.classList.add('completed');
    if (cardCSS && isCSS) cardCSS.classList.add('completed');
    if (cardJS && isJS) cardJS.classList.add('completed');

    const progressCount = document.getElementById('pillarProgressCount');
    const progressFill = document.getElementById('pillarProgressFill');

    if (progressCount) progressCount.textContent = `${count}/4`;
    if (progressFill) progressFill.style.width = `${(count / 4) * 100}%`;

    updateClaimButtonState(count, isQuizComplete, isL0);
}

function updateClaimButtonState(pillarCount, isQuizComplete, isL0) {
    const claimBtn = document.getElementById('claimLevel0Btn');
    if (!claimBtn) return;

    if (isL0) {
        claimBtn.classList.remove('locked');
        claimBtn.innerHTML = '<span>✅ Level 0 Completed (+250 XP Claimed) • Return to Dashboard</span>';
        claimBtn.onclick = () => { window.location.href = '../index.html'; };
    } else if (pillarCount === 4 && isQuizComplete) {
        claimBtn.classList.remove('locked');
        claimBtn.innerHTML = '<span>🎉 All Requirements Met! Claim Level 0 (+250 XP) ➔</span>';
        claimBtn.onclick = window.claimLevel0Completion;
    } else {
        claimBtn.classList.add('locked');
        if (pillarCount < 4 && !isQuizComplete) {
            claimBtn.innerHTML = `<span>🔒 Complete 4 Pillars (${pillarCount}/4) & Knowledge Challenge to Unlock (+250 XP)</span>`;
        } else if (pillarCount < 4) {
            claimBtn.innerHTML = `<span>🔒 Explore Remaining Pillars (${pillarCount}/4) to Unlock (+250 XP)</span>`;
        } else {
            claimBtn.innerHTML = `<span>🔒 Complete Knowledge Challenge Below to Unlock (+250 XP)</span>`;
        }

        claimBtn.onclick = () => {
            if (typeof Swal !== 'undefined') {
                const missing = [];
                if (pillarCount < 4) missing.push(`• <strong>Explore 4 Core Pillars:</strong> ${pillarCount}/4 completed (+50 XP each)`);
                if (!isQuizComplete) missing.push(`• <strong>Pass Knowledge Challenge:</strong> Complete the 5-question quiz below (+50 XP)`);

                Swal.fire({
                    icon: 'info',
                    title: '🔒 Level 0 Requirements Remaining',
                    html: `
                        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: left; padding: 4px 8px;">
                            <p style="color: #475569; font-size: 0.92rem; margin-bottom: 12px; line-height: 1.5;">
                                Complete both milestones below to claim your official <strong>Level 0 (+250 XP)</strong> reward and unlock Level 1 Foundations:
                            </p>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; font-size: 0.88rem; color: #1e293b; line-height: 1.7;">
                                ${missing.join('<br>')}
                            </div>
                        </div>
                    `,
                    confirmButtonColor: '#2563eb',
                    confirmButtonText: 'Got It! Let\'s Finish Up 🚀'
                });
            }
        };
    }
}

/* ==========================================================================
   6. Level 0 Knowledge Challenge (Quiz)
   ========================================================================== */
const questions = [
    {
        q: '1. Who invented the World Wide Web and created the first web browser in 1990?',
        options: [
            { text: 'Bill Gates (Microsoft)', correct: false },
            { text: 'Tim Berners-Lee (CERN)', correct: true },
            { text: 'Steve Jobs (Apple)', correct: false },
            { text: 'Brendan Eich (Netscape)', correct: false }
        ],
        explanation: 'Tim Berners-Lee invented HTML, HTTP, and the first web browser (WorldWideWeb) while working at CERN in 1990.'
    },
    {
        q: '2. What breakthrough feature made NCSA Mosaic (1993) famous?',
        options: [
            { text: 'First browser to display images inline with text', correct: true },
            { text: 'First browser to run Python on the backend', correct: false },
            { text: 'First browser to support CSS3 3D animations', correct: false },
            { text: 'First browser to use tabbed windows', correct: false }
        ],
        explanation: 'Mosaic was the first graphical browser to display images directly inline alongside text, transforming the web into a visual medium.'
    },
    {
        q: '3. When you type a URL into your browser, what is the role of the DNS?',
        options: [
            { text: 'To download the images immediately', correct: false },
            { text: 'To translate the human-readable domain name into an IP address', correct: true },
            { text: 'To style the HTML buttons with CSS', correct: false },
            { text: 'To compile JavaScript code', correct: false }
        ],
        explanation: 'The Domain Name System (DNS) acts like the internet phonebook, translating human-friendly names (e.g. google.com) into computer IP addresses (e.g. 142.250.190.46).'
    },
    {
        q: '4. Which language is responsible for the interactive logic and behavior of a webpage?',
        options: [
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'SQL', correct: false }
        ],
        explanation: 'HTML provides structure, CSS provides visual styling, and JavaScript provides dynamic interactivity and client-side logic.'
    },
    {
        q: '5. What revolutionary technology introduced in 2004 allowed web pages to update without reloading?',
        options: [
            { text: 'AJAX (Asynchronous JavaScript and XML)', correct: true },
            { text: 'HTML5 Video tags', correct: false },
            { text: 'CSS Grid layouts', correct: false },
            { text: 'Floppy Disks', correct: false }
        ],
        explanation: 'AJAX allowed Web 2.0 applications (like Gmail and Google Maps) to fetch data in the background and update the DOM without refreshing the entire page.'
    }
];

let currentQuestionIndex = 0;
let quizAnswered = false;
let quizScore = 0;

function initQuizEngine() {
    quizScore = 0;
    loadQuestion(0);
}

function loadQuestion(idx) {
    currentQuestionIndex = idx;
    quizAnswered = false;
    const qData = questions[idx];

    const qBadge = document.getElementById('quizQBadge');
    const qText = document.getElementById('quizQText');
    const optContainer = document.getElementById('quizOptionsContainer');
    const feedbackBox = document.getElementById('quizFeedbackBox');

    const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';

    if (qBadge) {
        qBadge.textContent = isQuizComplete && idx === 0 
            ? `✅ Challenge Passed (Question 1 of ${questions.length})`
            : `Question ${idx + 1} of ${questions.length}`;
    }
    if (qText) qText.textContent = qData.q;
    if (feedbackBox) {
        feedbackBox.className = 'quiz-feedback-box';
        feedbackBox.innerHTML = '';
    }

    if (optContainer) {
        optContainer.innerHTML = '';
        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => handleOptionClick(btn, opt.correct, qData.explanation));
            optContainer.appendChild(btn);
        });
    }
}

function handleOptionClick(selectedBtn, isCorrect, explanation) {
    if (quizAnswered) return;
    quizAnswered = true;

    if (isCorrect) quizScore++;

    const optButtons = document.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
        btn.disabled = true;
    });

    if (isCorrect) {
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
        optButtons.forEach(btn => {
            const match = questions[currentQuestionIndex].options.find(o => o.text === btn.textContent);
            if (match && match.correct) btn.classList.add('correct');
        });
    }

    const isFinalQuestion = currentQuestionIndex === questions.length - 1;

    if (isFinalQuestion) {
        localStorage.setItem('level0_quiz_completed', 'true');
        localStorage.setItem('level0_quiz_score', quizScore.toString());
        initPillarsProgress(); // Re-check and unlock claim button immediately!
    }

    const feedbackBox = document.getElementById('quizFeedbackBox');
    if (feedbackBox) {
        feedbackBox.className = `quiz-feedback-box show ${isCorrect ? 'correct' : 'incorrect'}`;

        if (!isFinalQuestion) {
            feedbackBox.innerHTML = `
                <strong>${isCorrect ? '🎉 Correct Answer!' : '💡 Key Concept:'}</strong>
                <p style="margin: 4px 0 8px 0;">${explanation}</p>
                <button onclick="window.nextQuestion()" style="background: ${isCorrect ? '#16a34a' : '#2563eb'}; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.80rem;">
                    Next Question ➡️
                </button>
            `;
        } else {
            feedbackBox.innerHTML = `
                <div style="padding: 4px 0;">
                    <div style="font-size: 1rem; font-weight: 800; color: #16a34a; margin-bottom: 4px;">🎉 Level 0 Knowledge Challenge Completed!</div>
                    <p style="margin: 4px 0 10px 0; color: #334155;">
                        You scored <strong>${quizScore}/${questions.length} correct</strong>! You have mastered web history, browser evolution, and packet architecture.
                    </p>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button onclick="window.scrollToClaim()" style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.84rem;">
                            🌟 Continue to Claim Level 0 ➔
                        </button>
                        <button onclick="window.initQuizEngine()" style="background: #e2e8f0; color: #475569; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.82rem;">
                            🔄 Retake Quiz
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

window.nextQuestion = function() {
    const nextIdx = (currentQuestionIndex + 1) % questions.length;
    loadQuestion(nextIdx);
};

window.scrollToClaim = function() {
    const claimSection = document.querySelector('.completion-banner');
    if (claimSection) {
        claimSection.scrollIntoView({ behavior: 'smooth' });
    }
};

/* ==========================================================================
   7. Claim Level 0 Completion & Return to Dashboard (+250 XP)
   ========================================================================== */
window.claimLevel0Completion = function() {
    const isWebsite = localStorage.getItem('readWebsite') === 'true';
    const isHTML = localStorage.getItem('readHTML') === 'true';
    const isCSS = localStorage.getItem('readCSS') === 'true';
    const isJS = localStorage.getItem('readJavaScript') === 'true';
    const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';
    const count = (isWebsite ? 1 : 0) + (isHTML ? 1 : 0) + (isCSS ? 1 : 0) + (isJS ? 1 : 0);

    if (count < 4 || !isQuizComplete) {
        updateClaimButtonState(count, isQuizComplete, false);
        return;
    }

    localStorage.setItem('level0_completed', 'true');
    localStorage.setItem('readWebsite', 'true');
    localStorage.setItem('readHTML', 'true');
    localStorage.setItem('readCSS', 'true');
    localStorage.setItem('readJavaScript', 'true');
    localStorage.setItem('level0_quiz_completed', 'true');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: '🎉 Level 0 Complete!',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 8px;">🌱 ➔ 🛡️</div>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #16a34a; margin-bottom: 6px;">+250 XP Earned!</div>
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin-bottom: 14px;">
                        Congratulations! You have mastered the history, architecture, and 4 core pillars of web development. You have earned the <strong>Web Explorer</strong> milestone and unlocked Level 1 HTML Foundations!
                    </p>
                </div>
            `,
            showCancelButton: true,
            cancelButtonText: '🏠 Dashboard',
            cancelButtonColor: '#64748b',
            confirmButtonText: '🧱 Next: Level 1 (HTML Foundations) ➔',
            confirmButtonColor: '#2563eb',
            allowOutsideClick: false
        }).then((res) => {
            if (res.isConfirmed) {
                window.location.href = '/foundations.html?track=html';
            } else {
                window.location.href = '/';
            }
        });
    } else {
        window.location.href = '/foundations.html?track=html';
    }
};

/* ==========================================================================
   8. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

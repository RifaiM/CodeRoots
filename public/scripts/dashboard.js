/* ==========================================================================
   DevDojo Master Dashboard JavaScript Engine
   Security: HTML Escaping & Input Sanitization
   Animation: GSAP Entrance Sequences & Micro-interactions
   Progress: LocalStorage Sync & Dynamic XP Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardSecurity();
    initUserProgress();
    initGSAPAnimations();
    initMobileSegmentedFilter();
    initGlobalBackToTop();
    initFAQAccordion();
    initHashNavigation();
    initHeroTypewriter();
});

/**
 * Smooth Rotating Skill Suffix Typewriter Engine
 * Accessible, zero-layout-shift, prefers-reduced-motion safe
 */
function initHeroTypewriter() {
    const elements = document.querySelectorAll('.typewriter-text, #typewriterText');
    if (!elements || elements.length === 0) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const defaultPhrases = [
        'Doing, Not Just Watching',
        'Solving 103 Hands-On Challenges',
        'Mastering React & JavaScript',
        'Writing Real Code in Browser',
        'Building Modern Web Interfaces'
    ];

    elements.forEach(el => {
        let phrases = defaultPhrases;
        if (el.dataset && el.dataset.phrases) {
            try {
                const parsed = JSON.parse(el.dataset.phrases);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    phrases = parsed;
                }
            } catch (e) {}
        }

        let phraseIdx = 0;
        let charIdx = el.textContent.length || phrases[0].length;
        let isDeleting = true;
        let typingSpeed = 60;
        const pauseEnd = 2400;
        const pauseStart = 350;

        function typeLoop() {
            const currentPhrase = phrases[phraseIdx];

            if (isDeleting) {
                charIdx--;
                el.textContent = currentPhrase.substring(0, charIdx);
                typingSpeed = 35;

                if (charIdx <= 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(typeLoop, pauseStart);
                    return;
                }
            } else {
                charIdx++;
                el.textContent = currentPhrase.substring(0, charIdx);
                typingSpeed = 65;

                if (charIdx >= currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, pauseEnd);
                    return;
                }
            }

            setTimeout(typeLoop, typingSpeed);
        }

        setTimeout(typeLoop, pauseEnd);
    });
}

/**
 * Global Back To Top Floating Action Button Engine
 */
function initGlobalBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTopBtn';
        btn.className = 'back-to-top-btn';
        btn.setAttribute('aria-label', 'Back to Top');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        document.body.appendChild(btn);
    }

    function checkScroll() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPos > 100) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 1. Security Safeguards (XSS Protection & Safe Text Injection)
 */
function initDashboardSecurity() {
    // Prevent opener hijacking on all external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

/**
 * Safe HTML Escaper to prevent XSS injection
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Single source of truth for XP & Learner Rank calculation
 */
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
    const l7XP = (l7BranchA * 250) + (l7BranchB * 250) + (l7BranchC * 250) + (l7BranchD * 150) + (l7BranchE * 150);
    totalXP += l7XP;
    totalXP += (l8Completed * 250);
    totalXP += (l9Completed * 250);
    totalXP += (l10Completed * 500);
    totalXP += (dailyQuestXP + streakBonusXP);
    totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

    let rankTitle = 'Web Explorer';
    let rankIcon = '🌐';

    if (l10Completed >= 6) {
        rankTitle = 'Master Web Developer';
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
    } else if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6 && l7BranchD >= 12 && l7BranchE >= 10) {
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
    } else if (l7BranchD >= 12 || isTypescriptFoundations) {
        rankTitle = 'TypeScript Specialist';
        rankIcon = '🔷';
    } else if (l7BranchE >= 10 || isCssMotionFoundations) {
        rankTitle = 'CSS Motion Specialist';
        rankIcon = '🎨';
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
        maxXP: 25000,
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
};

/**
 * 2. Progression Lock/Unlock Engine & XP Calculation
 */

window.updateHeaderStats = function() {
    const stats = window.getUserXPAndRank();
    const xpBadge = document.querySelector('.xp-badge .badge-label');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');
    if (xpBadge) xpBadge.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (rankLabel) rankLabel.textContent = stats.rankTitle;
    if (rankIcon) rankIcon.textContent = stats.rankIcon;
};
window.initUserProgress = initUserProgress;

function initUserProgress() {
    let completedCount = 0;
    
    // Get unified XP, Rank, and completion stats
    const stats = window.getUserXPAndRank();
    const { isL0: isLevel0Complete, isL1: isLevel1Complete, isL2: isLevel2Complete, isL3: isLevel3Complete, l4Completed, l5Completed, l6Completed } = stats;
    const isPracticeUnlocked = localStorage.getItem('practice_mode_unlocked') === 'true';

    // Update Header UI Elements
    const xpBadge = document.querySelector('.xp-badge .badge-label');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');
    const resumeBtn = document.getElementById('resumeLessonBtn');

    if (xpBadge) {
        xpBadge.textContent = `${stats.totalXP.toLocaleString()} XP`;
    }

    if (rankLabel) {
        rankLabel.textContent = stats.rankTitle;
        if (rankIcon) rankIcon.textContent = stats.rankIcon;
    }

    // Update Track Card Unlock States
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
        const badge = card.querySelector('.track-level-badge');
        const statusIcon = card.querySelector('.track-status-icon');
        const btn = card.querySelector('.dojo-btn, .gold-btn, .primary-btn') || card.querySelector('.track-btn:last-of-type') || card.querySelector('.track-btn');
        if (!badge || !statusIcon || !btn) return;

        const levelText = badge.textContent.trim();

        if (levelText === 'Level 0') {
            const p1 = localStorage.getItem('readWebsite') === 'true';
            const p2 = localStorage.getItem('readHTML') === 'true';
            const p3 = localStorage.getItem('readCSS') === 'true';
            const p4 = localStorage.getItem('readJavaScript') === 'true';
            const pillarsCount = (p1 ? 1 : 0) + (p2 ? 1 : 0) + (p3 ? 1 : 0) + (p4 ? 1 : 0);

            updateTrackCardState(card, statusIcon, btn, isLevel0Complete, {
                count: pillarsCount,
                total: 4,
                xpReward: 250,
                unit: 'Pillars'
            }, './1. partA/web_history.html', 'Level 0 Web History');

            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isLevel0Complete ? '✅ Level 0 Completed' : (pillarsCount > 0 ? `📖 Continue Pillar ${Math.min(pillarsCount + 1, 4)} ➔` : '📖 Read Web History & Concepts');
            }
        } else if (levelText === 'Level 1') {
            updateTrackCardState(card, statusIcon, btn, isLevel1Complete, {
                xpReward: 300,
                unit: 'Foundations'
            }, './foundations.html?track=html', 'HTML Foundations');
        } else if (levelText === 'Level 2') {
            updateTrackCardState(card, statusIcon, btn, isLevel2Complete, {
                xpReward: 300,
                unit: 'Foundations'
            }, './foundations.html?track=css', 'CSS Foundations');
        } else if (levelText === 'Level 3') {
            updateTrackCardState(card, statusIcon, btn, isLevel3Complete, {
                xpReward: 400,
                unit: 'Foundations'
            }, './foundations.html?track=js', 'JS Foundations');
        } else if (levelText === 'Level 4') {
            const isFinished = l4Completed >= 15;
            const targetUrl = './2. partB/hub.html';
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: l4Completed,
                total: 15,
                xpReward: 1500,
                unit: 'Lessons'
            }, targetUrl, 'Level 4 DOM Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 4 Completed' : (l4Completed > 0 ? `⚔️ Continue Dojo (${l4Completed}/15) ➔` : '⚔️ Enter Level 4 Dojo');
            }
        } else if (levelText === 'Level 5') {
            const isFinished = l5Completed >= 15;
            const targetUrl = './3. partC/hub.html';
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: l5Completed,
                total: 15,
                xpReward: 2250,
                unit: 'Lessons'
            }, targetUrl, 'Level 5 React Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 5 Completed' : (l5Completed > 0 ? `⚛️ Continue Dojo (${l5Completed}/15) ➔` : '⚛️ Enter Level 5 Dojo');
            }
        } else if (levelText === 'Level 6') {
            let l6CompletedCount = 0;
            for (let i = 1; i <= 15; i++) {
                if (localStorage.getItem(`partE_lesson${i}_remake_complete`) === 'true') {
                    l6CompletedCount++;
                }
            }
            const isFinished = l6CompletedCount >= 15;
            const targetUrl = './5. partE/hub.html';
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: l6CompletedCount,
                total: 15,
                xpReward: 3000,
                unit: 'Lessons'
            }, targetUrl, 'Level 6 Python Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 6 Completed' : (l6CompletedCount > 0 ? `🐍 Continue Dojo (${l6CompletedCount}/15) ➔` : '🐍 Enter Level 6 Dojo');
            }
        } else if (levelText === 'Level 7') {
            const stats = window.getUserXPAndRank();
            const isFinished = (stats.l7BranchA >= 6 || stats.l7BranchB >= 6 || stats.l7BranchC >= 6);
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: stats.l7Completed,
                total: 18,
                xpReward: 1500,
                unit: 'Specialization'
            }, './6. partF/hub.html', 'Level 7 Specialization Hub');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 7 Completed' : (stats.l7Completed > 0 ? `🚀 Continue Hub (${stats.l7Completed}/18) ➔` : '🚀 Enter Level 7 Hub');
            }
        } else if (levelText === 'Level 8') {
            const stats = window.getUserXPAndRank();
            const isFinished = stats.l8Completed >= 6;
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: stats.l8Completed,
                total: 6,
                xpReward: 1500,
                unit: 'Projects'
            }, './7. partG/hub.html', 'Level 8 Fullstack Bridge');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 8 Completed' : (stats.l8Completed > 0 ? `🌉 Continue Dojo (${stats.l8Completed}/6) ➔` : '🌉 Enter Level 8 Dojo');
            }
        } else if (levelText === 'Level 9') {
            const stats = window.getUserXPAndRank();
            const isFinished = stats.l9Completed >= 6;
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: stats.l9Completed,
                total: 6,
                xpReward: 1500,
                unit: 'Projects'
            }, './8. partH/hub.html', 'Level 9 Auth & Database');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 9 Completed' : (stats.l9Completed > 0 ? `🛡️ Continue Dojo (${stats.l9Completed}/6) ➔` : '🛡️ Enter Level 9 Dojo');
            }
        } else if (levelText.includes('Level 10') || levelText.includes('LEVEL 10')) {
            const stats = window.getUserXPAndRank();
            const isFinished = stats.l10Completed >= 6;
            updateTrackCardState(card, statusIcon, btn, isFinished, {
                count: stats.l10Completed,
                total: 6,
                xpReward: 3000,
                unit: 'Milestones'
            }, './9. partI/hub.html', 'Level 10 SaaS Dashboard UI');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 10 Completed' : (stats.l10Completed > 0 ? `🏆 Continue Apex (${stats.l10Completed}/6) ➔` : '🏆 Launch Level 10 Dojo');
            }
        }
    });

    // Navbar Practical Dojo Link Control (Only #dojoNavLink opens Hub Modal)
    const dojoNavLinks = document.querySelectorAll('#dojoNavLink');
    dojoNavLinks.forEach(dojoLink => {
        dojoLink.classList.remove('dojo-locked');
        dojoLink.innerHTML = '<span class="nav-icon">⚔️</span><span class="nav-text">&nbsp;Practical Dojo</span>';
        dojoLink.title = 'Practical Dojo Hub';
        dojoLink.onclick = (e) => {
            e.preventDefault();
            openDojoHub();
        };
    });
}

function updateTrackCardState(card, statusIcon, btn, isCompleted, progressInfo, linkUrl, trackName) {
    card.classList.remove('locked');
    btn.classList.remove('disabled', 'locked-btn');

    if (isCompleted) {
        statusIcon.className = 'track-status-icon completed';
        statusIcon.textContent = progressInfo && progressInfo.total ? `✅ Mastered (${progressInfo.total}/${progressInfo.total})` : (progressInfo && progressInfo.xpReward ? `✅ Mastered (+${progressInfo.xpReward} XP)` : '✅ Mastered');
    } else if (progressInfo && progressInfo.count > 0) {
        statusIcon.className = 'track-status-icon in-progress';
        statusIcon.textContent = `🔥 In Progress: ${progressInfo.count}/${progressInfo.total}`;
    } else if (progressInfo && progressInfo.xpReward) {
        statusIcon.className = 'track-status-icon ready';
        statusIcon.textContent = `⚡ +${progressInfo.xpReward.toLocaleString()} XP`;
    } else {
        statusIcon.className = 'track-status-icon ready';
        statusIcon.textContent = '🟢 Active Track';
    }

    if (btn.tagName.toLowerCase() === 'a') {
        btn.href = linkUrl;
        btn.onclick = null;
    } else {
        btn.onclick = (e) => {
            e.preventDefault();
            window.location.href = linkUrl;
        };
    }
}

/**
 * 3. GSAP Animation Engine
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline for Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from('.hero-pill', {
        duration: 0.6,
        y: -15,
        opacity: 0,
        delay: 0.1
    })
    .from('.hero-title', {
        duration: 0.7,
        y: 20,
        opacity: 0
    }, '-=0.4')
    .from('.hero-subtitle', {
        duration: 0.7,
        y: 15,
        opacity: 0
    }, '-=0.5');

    // Reveal Skill Tree Cards with Stagger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.track-card.gsap-reveal', {
            scrollTrigger: {
                trigger: '.roadmap-section',
                start: 'top 85%'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
        });
    } else {
        // Fallback stagger animation if ScrollTrigger is not present
        gsap.from('.track-card.gsap-reveal', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.08,
            delay: 0.4,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
        });
    }
}

/**
 * 4. Mobile Segmented Filter Switcher (320px & 375px UX)
 */
function initMobileSegmentedFilter() {
    const tabs = document.querySelectorAll('.segmented-tab');
    const cards = document.querySelectorAll('.track-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * 5. Track Preview Modal Handler (Safe Swal Popup)
 */
function showTrackPreview(title, description) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: escapeHTML(title),
            text: escapeHTML(description),
            icon: 'info',
            confirmButtonText: 'Got It!',
            confirmButtonColor: '#2563eb',
            customClass: {
                popup: 'swal-soft-popup',
                title: 'swal-soft-title'
            }
        });
    } else {
        alert(`${title}\n\n${description}`);
    }
}

/**
 * 6. Global Certificate Hub Selection Modal
 */
window.showCertLockWarning = function(levelName, count, requiredCount = 15) {
    const isLevel7 = levelName.includes('Level 7');
    const titleText = `🔒 ${levelName} Locked`;
    const messageText = isLevel7
        ? `You must complete any 1 Specialization Track (6 Lessons in Cloud Shipping, Databases & Auth, or Next.js) before claiming your official Level 7 Certificate! (${count}/6 Completed)`
        : `You must complete all 15 lessons in ${levelName} before claiming your official Certificate! (${count}/${requiredCount} Completed)`;

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'warning',
            title: titleText,
            text: messageText,
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'Got It!'
        });
    }
};

function getRelativeRootPrefix() {
    const rawPath = decodeURIComponent(window.location.pathname).toLowerCase();
    if (rawPath.includes('/lesson')) {
        return '../../';
    }
    if (rawPath.includes('parta') || rawPath.includes('partb') || rawPath.includes('partc') || rawPath.includes('partd') || rawPath.includes('parte') || rawPath.includes('partf')) {
        return '../';
    }
    return './';
}

window.openCertificateHub = function() {
    const stats = window.getUserXPAndRank();
    const isUnlocked = localStorage.getItem('practice_mode_unlocked') === 'true';
    const rootPrefix = getRelativeRootPrefix();

    const isL4Earned = isUnlocked || stats.l4Completed >= 15;
    const isL5Earned = isUnlocked || stats.l5Completed >= 15;
    const isL6Earned = isUnlocked || stats.l6Completed >= 15;
    const isL7Earned = isUnlocked || (stats.l7BranchA >= 6 || stats.l7BranchB >= 6 || stats.l7BranchC >= 6 || stats.l7Completed >= 6);

    const renderCertItem = (title, sub, url, isEarned, completedCount, maxCount, bgStyle, textStyle, btnColor) => {
        if (isEarned) {
            return `
                <a href="${url}" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; ${bgStyle} padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                    <div style="text-align: left; flex: 1;">
                        <div style="font-weight: 800; font-size: 0.92rem; ${textStyle}">${title}</div>
                        <div style="font-size: 0.76rem; color: #64748b;">${sub}</div>
                    </div>
                    <span class="badge-action" style="font-weight: 800; color: ${btnColor}; font-size: 0.85rem;">View &rarr;</span>
                </a>
            `;
        } else {
            return `
                <div onclick="window.showCertLockWarning('${title}', ${completedCount}, ${maxCount})" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px dashed #cbd5e1; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #94a3b8; transition: all 0.2s ease;">
                    <div style="text-align: left; flex: 1;">
                        <div style="font-weight: 800; font-size: 0.92rem; color: #64748b;">${title}</div>
                        <div style="font-size: 0.76rem; color: #94a3b8;">${sub} • ${completedCount}/${maxCount} Completed</div>
                    </div>
                    <span class="badge-action" style="font-weight: 800; color: #64748b; font-size: 0.80rem; background: #e2e8f0; padding: 4px 8px; border-radius: 8px;">🔒 Locked</span>
                </div>
            `;
        }
    };

    const l4Item = renderCertItem('📜 Level 4 Certificate', 'Vanilla JavaScript Web Widgets', `${rootPrefix}2. partB/certificate.html`, isL4Earned, stats.l4Completed, 15, 'background: #f8fafc; border: 1px solid #cbd5e1;', '', '#2563eb');
    const l5Item = renderCertItem('⚛️ Level 5 Certificate', 'React & Reusable UI Components', `${rootPrefix}3. partC/certificate.html`, isL5Earned, stats.l5Completed, 15, 'background: #f0f9ff; border: 1px solid #38bdf8;', 'color: #0369a1;', '#0284c7');
    const l6Item = renderCertItem('🐍 Level 6 Certificate', 'Python & Backend Basics', `${rootPrefix}5. partE/certificate.html`, isL6Earned, stats.l6Completed, 15, 'background: #ecfdf5; border: 1px solid #10b981;', 'color: #047857;', '#059669');
    const l7Item = renderCertItem('🚀 Level 7 Certificate', 'Specialized Developer Tracks', `${rootPrefix}6. partF/certificate.html`, isL7Earned, stats.l7Completed, 6, 'background: #faf5ff; border: 1px solid #c084fc;', 'color: #7e22ce;', '#9333ea');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '📜 Proof-of-Work Certificates',
            customClass: {
                popup: 'responsive-profile-modal responsive-cert-hub-modal'
            },
            html: `
                <div style="text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px 0;">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 18px; line-height: 1.5;">
                        Select an earned certificate to view, print, or download your official Proof of Work:
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${l4Item}
                        ${l5Item}
                        ${l6Item}
                        ${l7Item}
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true
        });
    } else {
        window.location.href = isL7Earned ? `${rootPrefix}6. partF/certificate.html` : `${rootPrefix}2. partB/certificate.html`;
    }
};

/**
 * 7. Practical Dojo Level Selection Hub Modal (100% Open Access)
 */
window.openDojoHub = function() {
    const rootPrefix = getRelativeRootPrefix();
    const rawPath = decodeURIComponent(window.location.pathname).toLowerCase();
    const isL4 = rawPath.includes('partb/hub.html') || rawPath.includes('2. partb/hub.html');
    const isL5 = rawPath.includes('partc/hub.html') || rawPath.includes('3. partc/hub.html');
    const isL6 = rawPath.includes('parte/hub.html') || rawPath.includes('5. parte/hub.html');
    const isL7 = rawPath.includes('partf/hub.html') || rawPath.includes('6. partf/hub.html');

    let activeL4 = 1;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true') {
            activeL4 = Math.min(i + 1, 15);
        }
    }

    let activeL5 = 1;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partC_lesson${i}_remake_complete`) === 'true') {
            activeL5 = Math.min(i + 1, 15);
        }
    }

    let activeL6 = 1;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partE_lesson${i}_remake_complete`) === 'true') {
            activeL6 = Math.min(i + 1, 15);
        }
    }

    const itemL4 = isL4
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #eff6ff; border: 2px solid #3b82f6; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #1d4ed8;">⚔️ Level 4: DOM Interactivity Dojo</div>
                    <div style="font-size: 0.76rem; color: #2563eb;">15 Projects • Active Lesson ${activeL4}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #1d4ed8; font-size: 0.80rem; background: #dbeafe; padding: 4px 10px; border-radius: 8px;">📍 Active Page</span>
            </div>
        `
        : `
            <a href="${rootPrefix}2. partB/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem;">⚔️ Level 4: DOM Interactivity Dojo</div>
                    <div style="font-size: 0.76rem; color: #64748b;">15 Projects • Active Lesson ${activeL4}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #2563eb; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    const itemL5 = isL5
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #f0f9ff; border: 2px solid #0284c7; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #0369a1;">⚛️ Level 5: React & Framework Dojo</div>
                    <div style="font-size: 0.76rem; color: #0284c7;">15 Projects • Active Lesson ${activeL5}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #0369a1; font-size: 0.80rem; background: #e0f2fe; padding: 4px 10px; border-radius: 8px;">📍 Active Page</span>
            </div>
        `
        : `
            <a href="${rootPrefix}3. partC/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #f0f9ff; border: 1px solid #38bdf8; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #0369a1;">⚛️ Level 5: React & Framework Dojo</div>
                    <div style="font-size: 0.76rem; color: #0284c7;">15 Projects • Active Lesson ${activeL5}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #0284c7; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    const itemL6 = isL6
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #ecfdf5; border: 2px solid #059669; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #047857;">🐍 Level 6: Python & Backend Dojo</div>
                    <div style="font-size: 0.76rem; color: #059669;">15 Projects • Active Lesson ${activeL6}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #047857; font-size: 0.80rem; background: #d1fae5; padding: 4px 10px; border-radius: 8px;">📍 Active Page</span>
            </div>
        `
        : `
            <a href="${rootPrefix}5. partE/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #ecfdf5; border: 1px solid #10b981; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #047857;">🐍 Level 6: Python & Backend Dojo</div>
                    <div style="font-size: 0.76rem; color: #059669;">15 Projects • Active Lesson ${activeL6}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #059669; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    const itemL7 = isL7
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #faf5ff; border: 2px solid #c084fc; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #7e22ce;">🚀 Level 7: Mastery Specialization Hub</div>
                    <div style="font-size: 0.76rem; color: #9333ea;">3 Tracks • Cloud, Database & Next.js</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #7e22ce; font-size: 0.80rem; background: #f3e8ff; padding: 4px 10px; border-radius: 8px;">📍 Active Page</span>
            </div>
        `
        : `
            <a href="${rootPrefix}6. partF/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #faf5ff; border: 1px solid #c084fc; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #7e22ce;">🚀 Level 7: Mastery Specialization Hub</div>
                    <div style="font-size: 0.76rem; color: #9333ea;">3 Tracks • Cloud, Database & Next.js</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #9333ea; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '⚔️ Practical Dojo Hub',
            customClass: {
                popup: 'responsive-profile-modal responsive-cert-hub-modal'
            },
            html: `
                <div style="text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px 0;">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 18px; line-height: 1.5;">
                        Select a Practical Dojo level to jump into live interactive coding:
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${itemL4}
                        ${itemL5}
                        ${itemL6}
                        ${itemL7}
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true
        });
    } else {
        window.location.href = `${rootPrefix}2. partB/hub.html`;
    }
};

/**
 * Hash Navigation Smooth Scroll on Page Load
 */
function initHashNavigation() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
}


/**
 * Interactive FAQ Accordion Engine
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems || faqItems.length === 0) return;

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question-btn');
        const panel = item.querySelector('.faq-answer-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');

            // Close other items for single-accordion UX
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question-btn');
                    const otherPanel = otherItem.querySelector('.faq-answer-panel');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherPanel) otherPanel.style.maxHeight = null;
                }
            });

            // Toggle selected item
            if (isCurrentlyActive) {
                item.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
            } else {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
}

// Level 6: Python & Backend Dojo - Navigation System (100% Identical to Level 5)
(function() {
    'use strict';

    const level6Lessons = [
        { id: 1, title: 'Python Essentials & Syntax' },
        { id: 2, title: 'Control Flow & Logic Engines' },
        { id: 3, title: 'Functions, Scope & Lambdas' },
        { id: 4, title: 'Data Structures & List Comprehensions' },
        { id: 5, title: 'Object-Oriented Programming (OOP)' },
        { id: 6, title: 'OOP Inheritance & Polymorphism' },
        { id: 7, title: 'Error & Exception Handling' },
        { id: 8, title: 'Modules, Packages & Standard Library' },
        { id: 9, title: 'File I/O & Data Persistence' },
        { id: 10, title: 'Asynchronous Python & Asyncio' },
        { id: 11, title: 'Databases & SQL ORM Integration' },
        { id: 12, title: 'RESTful Web APIs with FastAPI' },
        { id: 13, title: 'Authentication & Security Basics' },
        { id: 14, title: 'Guided Mini Project: Task Manager API' },
        { id: 15, title: '🏆 Capstone Python Backend Service' }
    ];

    function getCurrentLessonId() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/i);
        return match ? parseInt(match[1], 10) : 1;
    }

    function isLessonCompleted(lessonId) {
        return localStorage.getItem(`partE_lesson${lessonId}_remake_complete`) === 'true';
    }

    function canAccessLesson(lessonId) {
        if (lessonId === 1) return true;
        if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;
        for (let i = 1; i < lessonId; i++) {
            if (!isLessonCompleted(i)) {
                return false;
            }
        }
        return true;
    }

    function checkAccessProtection() {
        const currentId = getCurrentLessonId();
        if (!canAccessLesson(currentId)) {
            const requiredLesson = currentId - 1;
            let highestAccessible = 1;
            for (let i = 1; i <= 15; i++) {
                if (!isLessonCompleted(i)) {
                    highestAccessible = i;
                    break;
                }
            }

            const renderAccessDenied = () => {
                // Inject animation keyframes once
                if (!document.getElementById('_ad-styles-l6')) {
                    const s = document.createElement('style');
                    s.id = '_ad-styles-l6';
                    s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:scale(.88) translateY(-16px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes _adFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}';
                    document.head.appendChild(s);
                }
                if (document.getElementById('_access-denied-overlay')) return;

                // Full-screen overlay — appended ON TOP, never replaces body HTML
                const overlay = document.createElement('div');
                overlay.id = '_access-denied-overlay';
                overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#090d16 0%,#0f172a 50%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.3s ease;font-family:\'Plus Jakarta Sans\',system-ui,-apple-system,sans-serif;');

                const card = document.createElement('div');
                card.setAttribute('style', 'position:relative;z-index:1;background:rgba(15,23,42,0.88);border:1px solid rgba(51,65,85,0.8);border-top:4px solid #10b981;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;padding:38px 28px;max-width:460px;width:90%;text-align:center;box-shadow:0 24px 50px rgba(0,0,0,0.5);animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);box-sizing:border-box;');
                card.innerHTML = '<div style="display:inline-block;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-family:\'Fira Code\',monospace;font-size:0.80rem;font-weight:700;padding:5px 12px;border-radius:20px;margin-bottom:14px;letter-spacing:0.5px;">🔒 PREREQUISITE REQUIRED</div>'
                    + '<div style="font-size:3.6rem;margin-bottom:12px;line-height:1;filter:drop-shadow(0 8px 16px rgba(239,68,68,0.25));animation:_adFloat 3s ease-in-out infinite;">🔒</div>'
                    + '<h2 style="color:#ffffff;margin:0 0 10px;font-size:1.55rem;font-weight:800;letter-spacing:-0.3px;">Access Restricted</h2>'
                    + '<p style="margin:0 0 24px;line-height:1.6;color:#94a3b8;font-size:0.92rem;">You must complete <strong style="color:#f8fafc;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#f8fafc;">Lesson ' + currentId + '</strong> in Level 6 • Python Dojo.</p>'
                    + '<div style="display:flex;flex-direction:column;gap:10px;width:100%;box-sizing:border-box;">'
                    + '<button onclick="window.location.href=\'../lesson' + highestAccessible + '/lesson' + highestAccessible + '_remake.html\'" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;border:none;border-radius:24px;font-family:inherit;font-size:0.90rem;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(16,185,129,0.35);transition:all 0.2s ease;box-sizing:border-box;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'"><span>🐍 Take Me to Lesson ' + highestAccessible + ' ➔</span></button>'
                    + '<a href="../../index.html" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 20px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:24px;font-family:inherit;font-size:0.86rem;font-weight:700;text-decoration:none;box-sizing:border-box;transition:all 0.2s ease;" onmouseover="this.style.background=\'#334155\';this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.background=\'#1e293b\';this.style.transform=\'\'"><span>🏠 Return to Dashboard</span></a>'
                    + '</div>';

                overlay.appendChild(card);
                document.body.appendChild(overlay);
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', renderAccessDenied);
            } else {
                renderAccessDenied();
            }
            return false;
        }
        return true;
    }


    if (!checkAccessProtection()) return;

    // SweetAlert2-backed locked lesson notification
    window.__navLockedAlert = function(requiredLesson, lockedLesson) {
        const fire = () => Swal.fire({
            icon: 'warning',
            title: '🔒 Lesson Locked',
            html: `Complete <strong>Lesson ${requiredLesson}</strong> first to unlock Lesson ${lockedLesson}!`,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Got it!',
            timer: 5000,
            timerProgressBar: true
        });
        if (typeof Swal !== 'undefined') {
            fire();
        } else {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            s.onload = fire;
            document.head.appendChild(s);
        }
    };

    function initLevel6Nav() {
        const header = document.querySelector('header.platform-header') || document.querySelector('header.lesson-header') || document.querySelector('header');
        if (!header) return;

        const currentId = getCurrentLessonId();

        // Create Navigation Container 100% Identical to Level 5
        const container = document.createElement('div');
        container.className = 'lesson-nav-container';

        // Dropdown Toggle Button 100% Identical to Level 5
        const btn = document.createElement('button');
        btn.className = 'lesson-nav-btn';
        btn.id = 'lessonNavBtn';
        btn.innerHTML = `
            <span class="nav-icon">📚</span>
            <span class="nav-btn-text">Jump to Lesson</span>
            <span class="nav-arrow">▼</span>
            <span class="nav-hamburger">
                <span></span>
                <span></span>
                <span></span>
            </span>
        `;

        // Dropdown Menu Container 100% Identical to Level 5
        const menu = document.createElement('div');
        menu.className = 'lesson-nav-dropdown';
        menu.id = 'lessonNavDropdown';

        let lessonListHTML = level6Lessons.map(lesson => {
            const isCompleted = isLessonCompleted(lesson.id);
            const canAccess = canAccessLesson(lesson.id);
            const isCurrent = lesson.id === currentId;

            let statusIcon = '';
            let className = 'nav-lesson-item';

            if (isCurrent) {
                statusIcon = '📍';
                className += ' current';
            } else if (isCompleted) {
                statusIcon = '✅';
                className += ' completed';
            } else if (canAccess) {
                statusIcon = '🔓';
                className += ' available';
            } else {
                statusIcon = '🔒';
                className += ' locked';
            }

            const hrefAttr = canAccess ? `href="../lesson${lesson.id}/lesson${lesson.id}_remake.html"` : 'href="javascript:void(0)"';
            const clickAttr = !canAccess ? `onclick="window.__navLockedAlert(${lesson.id - 1}, ${lesson.id})"` : '';

            return `
                <a class="${className}" ${hrefAttr} ${clickAttr}>
                    <span class="lesson-status">${statusIcon}</span>
                    <span class="lesson-info">
                        <span class="lesson-number">Lesson ${lesson.id}</span>
                        <span class="lesson-title">${lesson.title}</span>
                    </span>
                </a>
            `;
        }).join('');

        // Generate Certificate Section 100% Identical to Level 5
        let completedCount = level6Lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
        let allLessonsCompleted = level6Lessons.every(lesson => isLessonCompleted(lesson.id));
        let isCourseCompleted = isLessonCompleted(15) || allLessonsCompleted;

        let certHTML = '';
        if (isCourseCompleted) {
            certHTML = `
                <div class="nav-section-divider">
                    <span class="divider-text">Course Complete!</span>
                </div>
                <a class="nav-lesson-item certificate-item completed" href="../certificate.html" role="button" aria-label="Download your official course certificate">
                    <span class="lesson-status">🏆</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Certificate</span>
                        <span class="lesson-title">Download Your Certificate</span>
                    </span>
                </a>
            `;
        } else if (canAccessLesson(15)) {
            certHTML = `
                <div class="nav-section-divider">
                    <span class="divider-text">Almost There!</span>
                </div>
                <a class="nav-lesson-item certificate-item available" href="../lesson15/lesson15_remake.html" role="button" aria-label="Complete final capstone project">
                    <span class="lesson-status">🎯</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Final Step</span>
                        <span class="lesson-title">Complete Capstone Project</span>
                    </span>
                </a>
            `;
        } else {
            certHTML = `
                <div class="nav-section-divider">
                    <span class="divider-text">Progress: ${completedCount}/15</span>
                </div>
                <div class="nav-lesson-item certificate-item locked">
                    <span class="lesson-status">🔒</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Certificate</span>
                        <span class="lesson-title">Complete all lessons first</span>
                    </span>
                </div>
            `;
        }

        menu.innerHTML = `
            <div class="nav-header">
                <span class="nav-title">Course Navigation</span>
            </div>
            <div class="nav-content">
                ${lessonListHTML}
                ${certHTML}
            </div>
        `;

        function toggleNav(e) {
            if (e) e.stopPropagation();
            const isOpen = menu.classList.contains('show');
            if (isOpen) {
                closeNav();
            } else {
                openNav();
            }
        }

        function openNav() {
            btn.classList.add('active');
            menu.classList.add('show');
        }

        function closeNav() {
            btn.classList.remove('active');
            menu.classList.remove('show');
        }

        btn.addEventListener('click', toggleNav);

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNav();
        });

        container.appendChild(btn);
        container.appendChild(menu);
        
        const targetNav = document.querySelector('.header-nav-links') 
                       || document.querySelector('.header-lesson-badge') 
                       || document.querySelector('.header-inner') 
                       || document.querySelector('header');
        if (targetNav) {
            targetNav.appendChild(container);
        }
        
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLevel6Nav);
    } else {
        initLevel6Nav();
    }
})();


/* ==========================================================================
   User XP & Developer Rank Profile Engine (Unified Levels 0 - 7)
   ========================================================================== */
window.getUserXPAndRank = function() {
    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem('partB_lesson' + i + '_remake_complete') === 'true' || localStorage.getItem('lesson_' + i + '_completed') === 'true' || localStorage.getItem('lesson_' + i + '_completed') === '1';
            if (isComp) l4Completed++;
        } catch (e) {}
    }

    let l5Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem('partC_lesson' + i + '_remake_complete') === 'true';
            if (isComp) l5Completed++;
        } catch (e) {}
    }

    let l6Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem('partE_lesson' + i + '_remake_complete') === 'true';
            if (isComp) l6Completed++;
        } catch (e) {}
    }

    let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem('partF_branchA_lesson' + i + '_complete') === 'true') l7BranchA++;
            if (localStorage.getItem('partF_branchB_lesson' + i + '_complete') === 'true') l7BranchB++;
            if (localStorage.getItem('partF_branchC_lesson' + i + '_complete') === 'true') l7BranchC++;
        } catch (e) {}
    }
    const l7Completed = l7BranchA + l7BranchB + l7BranchC;

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);
    totalXP += (l6Completed * 200);
    totalXP += (l7Completed * 250);

    let rankTitle = 'Web Novice';
    let rankIcon = '🌱';
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
    } else if (isL1) {
        rankTitle = 'Code Apprentice';
        rankIcon = '🛡️';
    } else if (isL0) {
        rankTitle = 'Web Novice';
        rankIcon = '🌱';
    } else {
        rankTitle = 'Web Explorer';
        rankIcon = '🌐';
    }

    return {
        isL0, isL1, isL2, isL3,
        l4Completed, l5Completed, l6Completed,
        l7BranchA, l7BranchB, l7BranchC, l7Completed,
        totalXP,
        maxXP: 12500,
        rankTitle,
        rankIcon
    };
};

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

        return '<div style="' + bg + ' padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">' +
            '<div style="display: flex; align-items: center; gap: 8px; text-align: left;">' +
                '<span style="font-size: 1.1rem; flex-shrink: 0;">' + r.icon + '</span>' +
                '<div>' +
                    '<div style="font-size: 0.84rem; font-weight: 800; color: ' + (isCurrent ? '#1e40af' : '#1e293b') + ';">' + r.title + '</div>' +
                    '<div style="font-size: 0.72rem; color: #64748b;">' + r.level + '</div>' +
                '</div>' +
            '</div>' +
            '<span style="' + badgeBg + ' font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">' + badgeText + '</span>' +
        '</div>';
    }).join('');

    const modalHTML = '<div style="font-family: Plus Jakarta Sans, sans-serif; text-align: center; max-width: 100%; box-sizing: border-box;">' +
        '<div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 16px 14px; border-radius: 14px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">' +
            '<div style="font-size: 2.4rem; margin-bottom: 4px;">' + stats.rankIcon + '</div>' +
            '<div style="font-size: 1.15rem; font-weight: 800;">' + stats.rankTitle + '</div>' +
            '<div style="font-size: 0.85rem; color: #93c5fd; margin-top: 2px;">' + stats.totalXP.toLocaleString() + ' / ' + stats.maxXP.toLocaleString() + ' Total XP</div>' +
            '<div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 99px; margin-top: 12px; overflow: hidden;">' +
                '<div style="background: #38bdf8; height: 100%; width: ' + progressPct + '%; border-radius: 99px; transition: width 0.4s ease;"></div>' +
            '</div>' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">' +
            '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web History</div><div style="font-size: 0.84rem; font-weight: 800; color: ' + (stats.isL0 ? '#10b981' : '#64748b') + ';">' + (stats.isL0 ? '250 XP ✅' : '0 / 250 XP') + '</div></div>' +
            '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div><div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">' + ((stats.isL1?300:0)+(stats.isL2?300:0)+(stats.isL3?400:0)) + ' / 1,000 XP</div></div>' +
            '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: DOM Dojo</div><div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">' + (stats.l4Completed * 100) + ' / 1,500 XP</div></div>' +
            '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Dojo</div><div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">' + (stats.l5Completed * 150) + ' / 2,250 XP</div></div>' +
            '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Dojo</div><div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">' + (stats.l6Completed * 200) + ' / 3,000 XP</div></div>' +
            '<div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;"><div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Mastery Hub</div><div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">' + (stats.l7Completed * 250) + ' / 4,500 XP</div></div>' +
        '</div>' +
        '<div style="text-align: left; margin-bottom: 14px;">' +
            '<div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🗺️ Developer Rank Progression Roadmap</div>' +
            '<div style="display: flex; flex-direction: column; gap: 6px; touch-action: pan-y; -webkit-overflow-scrolling: touch; padding-right: 2px;">' + rankLadderHTML + '</div>' +
        '</div>' +
    '</div>';

    const fireModal = function() {
        Swal.fire({
            title: '👤 Learner Profile & Rank Roadmap',
            html: modalHTML,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        });
    };

    if (typeof Swal !== 'undefined') {
        fireModal();
    } else {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        s.onload = fireModal;
        document.head.appendChild(s);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    try {
        const stats = window.getUserXPAndRank();
        const xpLabel = document.getElementById('userXpLabel');
        if (xpLabel) xpLabel.textContent = stats.totalXP.toLocaleString() + ' XP';
    } catch (e) {}
});


window.confirmResetProgress = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Reset All Progress?',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <p style="color: #475569; font-size: 0.93rem; line-height: 1.6; margin-bottom: 12px;">
                        This will reset your <strong>XP back to 0</strong>, reset <strong>Daily Quest XP & Streaks</strong>, clear your <strong>Developer Rank</strong>, and reset all completed lesson checkmarks across Level 0 through Level 7.
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
                // 1. Reset User XP
                localStorage.removeItem('userXP');
                localStorage.removeItem('novicodes_user_xp');
                localStorage.removeItem('novicodes_xp');

                // 2. Reset Daily Quests & Streaks
                localStorage.removeItem('novicodes_streak_count');
                localStorage.removeItem('novicodes_longest_streak');
                localStorage.removeItem('novicodes_last_quest_date');
                localStorage.removeItem('novicodes_daily_quest_xp');
                localStorage.removeItem('novicodes_streak_bonus_xp');
                localStorage.removeItem('novicodes_streak_freeze');

                // 3. Reset Level Completion & Concept Flags
                localStorage.removeItem('level0_completed');
                localStorage.removeItem('level0_quiz_completed');
                localStorage.removeItem('level0_quiz_score');
                localStorage.removeItem('readWebsite');
                localStorage.removeItem('readHTML');
                localStorage.removeItem('readCSS');
                localStorage.removeItem('readJavaScript');
                localStorage.removeItem('level1_completed');
                localStorage.removeItem('level2_completed');
                localStorage.removeItem('level3_completed');
                localStorage.removeItem('level4_completed');
                localStorage.removeItem('level5_completed');
                localStorage.removeItem('level6_completed');
                localStorage.removeItem('level7_completed');

                // 4. Reset Level 7 Track & Branch Completion Flags
                localStorage.removeItem('partF_completed');
                localStorage.removeItem('partF_complete');
                localStorage.removeItem('partF_branchA_completed');
                localStorage.removeItem('partF_branchA_complete');
                localStorage.removeItem('partF_branchB_completed');
                localStorage.removeItem('partF_branchB_complete');
                localStorage.removeItem('partF_branchC_completed');
                localStorage.removeItem('partF_branchC_complete');

                // 5. Reset Lessons 1-20 (Levels 1-6)
                for (let i = 1; i <= 20; i++) {
                    localStorage.removeItem(`partB_lesson${i}_remake_complete`);
                    localStorage.removeItem(`partB_lesson${i}_remake_completed`);
                    localStorage.removeItem(`partC_lesson${i}_remake_complete`);
                    localStorage.removeItem(`partC_lesson${i}_remake_completed`);
                    localStorage.removeItem(`partD_lesson${i}_remake_complete`);
                    localStorage.removeItem(`partD_lesson${i}_remake_completed`);
                    localStorage.removeItem(`partE_lesson${i}_remake_complete`);
                    localStorage.removeItem(`partE_lesson${i}_remake_completed`);
                    localStorage.removeItem(`lesson_${i}_completed`);
                    localStorage.removeItem(`lesson_${i}_complete`);
                }

                // 6. Reset Level 7 Branch A, B, C Lessons & Keystroke Drafts
                for (let i = 1; i <= 6; i++) {
                    localStorage.removeItem(`partF_branchA_lesson${i}_complete`);
                    localStorage.removeItem(`partF_branchA_lesson${i}_completed`);
                    localStorage.removeItem(`partF_branchA_lesson${i}_draft`);

                    localStorage.removeItem(`partF_branchB_lesson${i}_complete`);
                    localStorage.removeItem(`partF_branchB_lesson${i}_completed`);
                    localStorage.removeItem(`partF_branchB_lesson${i}_draft`);

                    localStorage.removeItem(`partF_branchC_lesson${i}_complete`);
                    localStorage.removeItem(`partF_branchC_lesson${i}_completed`);
                    localStorage.removeItem(`partF_branchC_lesson${i}_draft`);
                }

                // 7. Reset Practice Mode & Toggles
                localStorage.removeItem('practice_mode_unlocked');
                localStorage.removeItem('progression_mode');

                Swal.fire({
                    icon: 'success',
                    title: '🔄 Progress Reset!',
                    text: 'Re-initializing NoviCodes...',
                    timer: 1200,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
            }
        });
    }
};

/**
 * Practical Dojo Level Selection Hub Modal
 */
function getRelativeRootPrefix() {
    const rawPath = decodeURIComponent(window.location.pathname).toLowerCase();
    if (rawPath.includes('/lesson') || rawPath.includes('/brancha') || rawPath.includes('/branchb') || rawPath.includes('/branchc') || rawPath.includes('brancha/') || rawPath.includes('branchb/') || rawPath.includes('branchc/')) {
        return '../../';
    }
    if (rawPath.includes('parta') || rawPath.includes('partb') || rawPath.includes('partc') || rawPath.includes('partd') || rawPath.includes('parte') || rawPath.includes('partf') || rawPath.includes('1. parta') || rawPath.includes('2. partb') || rawPath.includes('3. partc') || rawPath.includes('5. parte') || rawPath.includes('6. partf')) {
        return '../';
    }
    return './';
}

window.openDojoHub = function() {
    const rootPrefix = getRelativeRootPrefix();
    const rawPath = decodeURIComponent(window.location.pathname).toLowerCase();
    const isL4 = rawPath.includes('partb') || rawPath.includes('2. partb');
    const isL5 = rawPath.includes('partc') || rawPath.includes('3. partc');
    const isL6 = rawPath.includes('parte') || rawPath.includes('5. parte');
    const isL7 = rawPath.includes('partf') || rawPath.includes('6. partf');

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

    let activeL7 = '7A';
    if (localStorage.getItem('partF_branchA_completed') === 'true') activeL7 = '7B';
    if (localStorage.getItem('partF_branchB_completed') === 'true') activeL7 = '7C';

    const itemL4 = isL4
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #eff6ff; border: 2px solid #3b82f6; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #1d4ed8;">⚔️ Level 4: DOM Interactivity Dojo</div>
                    <div style="font-size: 0.76rem; color: #2563eb;">15 Projects • Active Lesson ${activeL4}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #1d4ed8; font-size: 0.80rem; background: #dbeafe; padding: 4px 10px; border-radius: 8px;">📍 Active Track</span>
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
                <span class="badge-action" style="font-weight: 800; color: #0369a1; font-size: 0.80rem; background: #e0f2fe; padding: 4px 10px; border-radius: 8px;">📍 Active Track</span>
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
                <span class="badge-action" style="font-weight: 800; color: #047857; font-size: 0.80rem; background: #d1fae5; padding: 4px 10px; border-radius: 8px;">📍 Active Track</span>
            </div>
        `
        : `
            <a href="${rootPrefix}5. partE/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #ecfdf5; border: 1px solid #34d399; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #047857;">🐍 Level 6: Python & Backend Dojo</div>
                    <div style="font-size: 0.76rem; color: #059669;">15 Projects • Active Lesson ${activeL6}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #059669; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    const itemL7 = isL7
        ? `
            <div onclick="if(typeof Swal !== 'undefined') Swal.close()" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #faf5ff; border: 2px solid #9333ea; padding: 12px 16px; border-radius: 12px; cursor: pointer; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #7e22ce;">🚀 Level 7: Specialization Dojo</div>
                    <div style="font-size: 0.76rem; color: #9333ea;">18 Projects • Active Track ${activeL7}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #7e22ce; font-size: 0.80rem; background: #f3e8ff; padding: 4px 10px; border-radius: 8px;">📍 Active Track</span>
            </div>
        `
        : `
            <a href="${rootPrefix}6. partF/hub.html" class="hub-modal-card" style="display: flex; align-items: center; justify-content: space-between; background: #faf5ff; border: 1px solid #c084fc; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                <div style="text-align: left; flex: 1;">
                    <div style="font-weight: 800; font-size: 0.92rem; color: #7e22ce;">🚀 Level 7: Specialization Dojo</div>
                    <div style="font-size: 0.76rem; color: #9333ea;">18 Projects • Active Track ${activeL7}</div>
                </div>
                <span class="badge-action" style="font-weight: 800; color: #9333ea; font-size: 0.85rem;">Enter Hub &rarr;</span>
            </a>
        `;

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '⚔️ Select Practical Dojo Level',
            html: `
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px; font-family: 'Plus Jakarta Sans', sans-serif;">
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0 0 8px 0; text-align: center;">
                        Jump directly to any practical project-building hub:
                    </p>
                    ${itemL4}
                    ${itemL5}
                    ${itemL6}
                    ${itemL7}
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            width: '460px',
            customClass: {
                popup: 'responsive-profile-modal'
            }
        });
    } else {
        window.location.href = `${rootPrefix}2. partB/hub.html`;
    }
};


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
                    s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:scale(.85) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}';
                    document.head.appendChild(s);
                }
                if (document.getElementById('_access-denied-overlay')) return;

                // Full-screen overlay — appended ON TOP, never replaces body HTML
                const overlay = document.createElement('div');
                overlay.id = '_access-denied-overlay';
                overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.3s ease;font-family:system-ui,sans-serif;');

                const card = document.createElement('div');
                card.setAttribute('style', 'background:#ffffff;padding:40px 32px;border-radius:20px;box-shadow:0 24px 48px rgba(0,0,0,0.45);text-align:center;max-width:440px;width:100%;animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);');
                card.innerHTML = '<div style="font-size:3.5rem;margin-bottom:16px;">\uD83D\uDD12</div>'
                    + '<h2 style="color:#e11d48;margin:0 0 12px;font-size:1.6rem;font-weight:800;">Access Denied</h2>'
                    + '<p style="margin:0 0 24px;line-height:1.7;color:#475569;font-size:1rem;">You must complete <strong style="color:#1e293b;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#1e293b;">Lesson ' + currentId + '</strong>.</p>'
                    + '<button onclick="window.location.href=\'../lesson' + highestAccessible + '/lesson' + highestAccessible + '_remake.html\'" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-weight:700;cursor:pointer;font-size:1rem;box-shadow:0 4px 14px rgba(16,185,129,0.4);" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">\uD83D\uDC0D Take Me to Lesson ' + highestAccessible + '</button>';

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

    function initLevel6Nav() {
        const header = document.querySelector('header.lesson-header') || document.querySelector('header');
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
            const clickAttr = !canAccess ? `onclick="alert('🔒 Complete Lesson ${lesson.id - 1} to unlock Lesson ${lesson.id}!')"` : '';

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
        header.appendChild(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLevel6Nav);
    } else {
        initLevel6Nav();
    }
})();

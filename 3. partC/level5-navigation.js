// Level 5: React & Framework Dojo - Navigation System 100% Identical to Level 4
(function() {
    'use strict';

    const level5Lessons = [
        { id: 1, title: 'ES6+ Superpowers for Frameworks' },
        { id: 2, title: 'The Component Mental Model' },
        { id: 3, title: 'JSX Syntax & Dynamic Rendering' },
        { id: 4, title: 'Component Props & Composition' },
        { id: 5, title: 'Interactivity with useState' },
        { id: 6, title: 'Complex & Nested State Management' },
        { id: 7, title: 'Side Effects & useEffect Hook' },
        { id: 8, title: 'Fetching REST APIs in React' },
        { id: 9, title: 'Controlled Forms & Validation' },
        { id: 10, title: 'DOM Access & useRef Hook' },
        { id: 11, title: 'Single Page Application Routing' },
        { id: 12, title: 'Building Custom Hooks' },
        { id: 13, title: 'Context API & Global State' },
        { id: 14, title: 'Performance Optimization & Memo' },
        { id: 15, title: '🏆 Capstone Framework Web App' }
    ];

    function getCurrentLessonId() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/i);
        return match ? parseInt(match[1], 10) : 1;
    }

    function isLessonCompleted(lessonId) {
        return localStorage.getItem(`partC_lesson${lessonId}_remake_complete`) === 'true';
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
                document.body.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; z-index: 10000; padding: 20px; box-sizing: border-box;">
                        <div style="background: white; padding: 40px 30px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); text-align: center; max-width: 440px; width: 100%;">
                            <div style="font-size: 3.5rem; margin-bottom: 16px;">🔒</div>
                            <h1 style="color: #e11d48; margin: 0 0 12px 0; font-size: 1.6rem; font-weight: 800;">Access Denied</h1>
                            <p style="margin: 0 0 24px 0; line-height: 1.6; color: #475569; font-size: 1rem;">
                                You must complete <strong>Lesson ${requiredLesson}</strong> before accessing <strong>Lesson ${currentId}</strong>.
                            </p>
                            <button onclick="window.location.href='../lesson${highestAccessible}/lesson${highestAccessible}_remake.html'" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); transition: transform 0.2s ease;">
                                🚀 Take Me to Lesson ${highestAccessible}
                            </button>
                        </div>
                    </div>
                `;
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

    function initLevel5Nav() {
        const header = document.querySelector('header.lesson-header');
        if (!header) return;

        const currentId = getCurrentLessonId();

        // Create Navigation Container
        const container = document.createElement('div');
        container.className = 'lesson-nav-container';

        // Dropdown Toggle Button matching Level 4
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

        // Dropdown Menu Container matching Level 4
        const menu = document.createElement('div');
        menu.className = 'lesson-nav-dropdown';
        menu.id = 'lessonNavDropdown';

        let lessonListHTML = level5Lessons.map(lesson => {
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

        // Generate Certificate Drawer Section matching Level 4
        let completedCount = level5Lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
        let allLessonsCompleted = level5Lessons.every(lesson => isLessonCompleted(lesson.id));
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
        document.addEventListener('DOMContentLoaded', initLevel5Nav);
    } else {
        initLevel5Nav();
    }
})();

// Level 4: DOM Interactivity Dojo - Navigation System 100% Identical to Level 5
(function() {
    'use strict';

    const level4Lessons = [
        { id: 1, title: "Interactive HTML Page Structure" },
        { id: 2, title: "Typography & Heading Hierarchy" },
        { id: 3, title: "Interactive Links & Dynamic Media" },
        { id: 4, title: "Lists & Dropdown Drawer Navigation" },
        { id: 5, title: "Semantic HTML Web Architecture" },
        { id: 6, title: "CSS Styling & Theme Engine" },
        { id: 7, title: "CSS Box Model & Element Bounds" },
        { id: 8, title: "Flexbox Layout & Alignment Engine" },
        { id: 9, title: "CSS Positioning & Floating Modals" },
        { id: 10, title: "JavaScript Logic & State Variables" },
        { id: 11, title: "Live DOM Manipulation & Queries" },
        { id: 12, title: "Event Listeners & User Interactions" },
        { id: 13, title: "Controlled Forms & Live Input Validation" },
        { id: 14, title: "Guided Dashboard Mini Application" },
        { id: 15, title: "🏆 Capstone Practical Web Application" }
    ];

    function getCurrentLessonId() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/i);
        return match ? parseInt(match[1], 10) : 1;
    }

    function isLessonCompleted(lessonId) {
        return localStorage.getItem(`partB_lesson${lessonId}_remake_complete`) === 'true';
    }

    function canAccessLesson(lessonId) {
        return true;
    }

    function initLevel4Nav() {
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

        let lessonListHTML = level4Lessons.map(lesson => {
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

        // Generate Certificate Drawer Section 100% Identical to Level 5
        let completedCount = level4Lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
        let allLessonsCompleted = level4Lessons.every(lesson => isLessonCompleted(lesson.id));
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
        document.addEventListener('DOMContentLoaded', initLevel4Nav);
    } else {
        initLevel4Nav();
    }
})();
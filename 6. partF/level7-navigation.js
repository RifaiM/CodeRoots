// Level 7: Specialization Hub Navigation System (100% Identical to Levels 4, 5 & 6)
(function() {
    'use strict';

    // ── Track Definitions ──
    const branchALessons = [
        { id: 1, title: 'Git & GitHub Workflow Mastery', file: 'lesson1_remake.html', key: 'partF_branchA_lesson1_complete' },
        { id: 2, title: 'Vercel & Netlify Production Deployments', file: 'lesson2_remake.html', key: 'partF_branchA_lesson2_complete' },
        { id: 3, title: 'Cloudflare Pages & Edge Delivery', file: 'lesson3_remake.html', key: 'partF_branchA_lesson3_complete' },
        { id: 4, title: 'Deploying Backends to Render & Fly.io', file: 'lesson4_remake.html', key: 'partF_branchA_lesson4_complete' },
        { id: 5, title: 'Connecting Frontend & Backend (CORS)', file: 'lesson5_remake.html', key: 'partF_branchA_lesson5_complete' },
        { id: 6, title: 'GitHub Actions CI/CD Workflows', file: 'lesson6_remake.html', key: 'partF_branchA_lesson6_complete' }
    ];

    const branchBLessons = [
        { id: 1, title: 'Relational Databases & SQL Syntax', file: 'lesson1_remake.html', key: 'partF_branchB_lesson1_complete' },
        { id: 2, title: 'Managed Cloud Databases (Supabase/Neon)', file: 'lesson2_remake.html', key: 'partF_branchB_lesson2_complete' },
        { id: 3, title: 'Python ORM Architecture (SQLAlchemy)', file: 'lesson3_remake.html', key: 'partF_branchB_lesson3_complete' },
        { id: 4, title: 'Password Hashing & Security (Bcrypt)', file: 'lesson4_remake.html', key: 'partF_branchB_lesson4_complete' },
        { id: 5, title: 'JWT Token Authentication Systems', file: 'lesson5_remake.html', key: 'partF_branchB_lesson5_complete' },
        { id: 6, title: 'Protected Auth Middleware & RBAC', file: 'lesson6_remake.html', key: 'partF_branchB_lesson6_complete' }
    ];

    const branchCLessons = [
        { id: 1, title: 'Next.js App Router Architecture', file: 'lesson1_remake.html', key: 'partF_branchC_lesson1_complete' },
        { id: 2, title: 'Server Components vs Client Components', file: 'lesson2_remake.html', key: 'partF_branchC_lesson2_complete' },
        { id: 3, title: 'Next.js Server Actions & Form Mutations', file: 'lesson3_remake.html', key: 'partF_branchC_lesson3_complete' },
        { id: 4, title: 'API Routes & Dynamic Route Handlers', file: 'lesson4_remake.html', key: 'partF_branchC_lesson4_complete' },
        { id: 5, title: 'Database Integration in Next.js Apps', file: 'lesson5_remake.html', key: 'partF_branchC_lesson5_complete' },
        { id: 6, title: 'Full-Stack Vercel Production Deployment', file: 'lesson6_remake.html', key: 'partF_branchC_lesson6_complete' }
    ];

    // Detect active branch and lesson
    function getActiveTrackInfo() {
        const path = decodeURIComponent(window.location.pathname).toLowerCase();
        let lessons = branchALessons;
        let branchFolder = 'branchA';
        let branchTitle = 'Cloud Shipping';

        if (path.includes('branchb')) {
            lessons = branchBLessons;
            branchFolder = 'branchB';
            branchTitle = 'Databases & Auth';
        } else if (path.includes('branchc')) {
            lessons = branchCLessons;
            branchFolder = 'branchC';
            branchTitle = 'Next.js Framework';
        }

        const match = path.match(/lesson(\d+)/i);
        const currentId = match ? parseInt(match[1], 10) : 1;

        return { lessons, branchFolder, branchTitle, currentId };
    }

    function isLessonCompleted(lessonItem) {
        const altKey = lessonItem.key.replace('_complete', '_completed');
        return localStorage.getItem(lessonItem.key) === 'true' || localStorage.getItem(altKey) === 'true';
    }

    function canAccessLesson(lessonIndex, lessonsList) {
        if (lessonIndex === 1) return true;
        if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;
        for (let i = 0; i < lessonIndex - 1; i++) {
            if (!isLessonCompleted(lessonsList[i])) {
                return false;
            }
        }
        return true;
    }

    // ── Full-Screen Access Protection Overlay ──
    function checkAccessProtection() {
        const { lessons, currentId } = getActiveTrackInfo();
        if (!canAccessLesson(currentId, lessons)) {
            const requiredLesson = currentId - 1;
            let highestAccessible = 1;
            for (let i = 1; i <= lessons.length; i++) {
                if (!canAccessLesson(i, lessons)) break;
                highestAccessible = i;
            }

            const renderAccessDenied = () => {
                if (document.getElementById('_access-denied-overlay')) return;

                const overlay = document.createElement('div');
                overlay.id = '_access-denied-overlay';
                overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;font-family:system-ui,sans-serif;');

                const card = document.createElement('div');
                card.setAttribute('style', 'background:#ffffff;padding:40px 32px;border-radius:20px;box-shadow:0 24px 48px rgba(0,0,0,0.45);text-align:center;max-width:440px;width:100%;');
                card.innerHTML = '<div style="font-size:3.5rem;margin-bottom:16px;">🔒</div>'
                    + '<h2 style="color:#e11d48;margin:0 0 12px;font-size:1.6rem;font-weight:800;">Access Denied</h2>'
                    + '<p style="margin:0 0 24px;line-height:1.7;color:#475569;font-size:1rem;">You must complete <strong style="color:#1e293b;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#1e293b;">Lesson ' + currentId + '</strong>.</p>'
                    + '<button onclick="window.location.href=\'./lesson' + highestAccessible + '_remake.html\'" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-weight:700;cursor:pointer;font-size:1rem;box-shadow:0 4px 14px rgba(16,185,129,0.4);">🚀 Take Me to Lesson ' + highestAccessible + '</button>';

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

    // SweetAlert Locked Alert Callback
    window.__navLockedAlert = function(requiredLesson, lockedLesson) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'warning',
                title: '🔒 Lesson Locked',
                html: `Complete <strong>Lesson ${requiredLesson}</strong> first to unlock Lesson ${lockedLesson}!`,
                confirmButtonColor: '#a855f7',
                confirmButtonText: 'Got It!'
            });
        }
    };

    // ── Build Header Jump to Lesson Dropdown ──
    function initLevel7Nav() {
        const headerNav = document.querySelector('.header-nav-links');
        if (!headerNav) return;

        const { lessons, currentId, branchTitle } = getActiveTrackInfo();

        const container = document.createElement('div');
        container.className = 'lesson-nav-container';

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

        const menu = document.createElement('div');
        menu.className = 'lesson-nav-dropdown';
        menu.id = 'lessonNavDropdown';

        let lessonListHTML = lessons.map(lesson => {
            const isCompleted = isLessonCompleted(lesson);
            const canAccess = canAccessLesson(lesson.id, lessons);
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

            const hrefAttr = canAccess ? `href="./${lesson.file}"` : 'href="javascript:void(0)"';
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

        let completedCount = lessons.filter(l => isLessonCompleted(l)).length;

        menu.innerHTML = `
            <div class="nav-header">
                <span class="nav-title">${branchTitle} Navigation</span>
                <span style="font-size:0.74rem;color:#94a3b8;">${completedCount}/6 Done</span>
            </div>
            <div class="nav-content">
                ${lessonListHTML}
                <div class="nav-section-divider">
                    <span class="divider-text">Track Progress: ${completedCount}/6 Lessons</span>
                </div>
            </div>
        `;

        container.appendChild(btn);
        container.appendChild(menu);
        headerNav.prepend(container);

        // Toggle Event Handler
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            btn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                menu.classList.remove('show');
                btn.classList.remove('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLevel7Nav);
    } else {
        initLevel7Nav();
    }
})();

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

                if (!document.getElementById('_ad-styles-l7')) {
                    const s = document.createElement('style');
                    s.id = '_ad-styles-l7';
                    s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:scale(.88) translateY(-16px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes _adFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}';
                    document.head.appendChild(s);
                }

                const overlay = document.createElement('div');
                overlay.id = '_access-denied-overlay';
                overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#090d16 0%,#0f172a 50%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.3s ease;font-family:\'Plus Jakarta Sans\',system-ui,-apple-system,sans-serif;');

                const card = document.createElement('div');
                card.setAttribute('style', 'position:relative;z-index:1;background:rgba(15,23,42,0.88);border:1px solid rgba(51,65,85,0.8);border-top:4px solid #6366f1;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;padding:38px 28px;max-width:460px;width:90%;text-align:center;box-shadow:0 24px 50px rgba(0,0,0,0.5);animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);box-sizing:border-box;');
                card.innerHTML = '<div style="display:inline-block;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-family:\'Fira Code\',monospace;font-size:0.80rem;font-weight:700;padding:5px 12px;border-radius:20px;margin-bottom:14px;letter-spacing:0.5px;">🔒 PREREQUISITE REQUIRED</div>'
                    + '<div style="font-size:3.6rem;margin-bottom:12px;line-height:1;filter:drop-shadow(0 8px 16px rgba(239,68,68,0.25));animation:_adFloat 3s ease-in-out infinite;">🔒</div>'
                    + '<h2 style="color:#ffffff;margin:0 0 10px;font-size:1.55rem;font-weight:800;letter-spacing:-0.3px;">Access Restricted</h2>'
                    + '<p style="margin:0 0 24px;line-height:1.6;color:#94a3b8;font-size:0.92rem;">You must complete <strong style="color:#f8fafc;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#f8fafc;">Lesson ' + currentId + '</strong> in Level 7 • ' + branchTitle + '.</p>'
                    + '<div style="display:flex;flex-direction:column;gap:10px;width:100%;box-sizing:border-box;">'
                    + '<button onclick="window.location.href=\'./lesson' + highestAccessible + '_remake.html\'" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);color:#ffffff;border:none;border-radius:24px;font-family:inherit;font-size:0.90rem;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(99,102,241,0.35);transition:all 0.2s ease;box-sizing:border-box;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\"><span>🚀 Take Me to Lesson ' + highestAccessible + ' ➔</span></button>'
                    + '<a href="../../index.html" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 20px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:24px;font-family:inherit;font-size:0.86rem;font-weight:700;text-decoration:none;box-sizing:border-box;transition:all 0.2s ease;" onmouseover="this.style.background=\'#334155\';this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.background=\'#1e293b\';this.style.transform=\'\"><span>🏠 Return to Dashboard</span></a>'
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

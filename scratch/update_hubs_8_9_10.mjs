import fs from 'fs';
import path from 'path';

// Master script to refine Levels 8, 9, and 10 to 100% honest, production-accurate Advanced Frontend & React Architecture!

// ----------------------------------------------------
// 1. HUB 8, 9, 10 UPDATES
// ----------------------------------------------------

const hub8Content = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PlatformHeader from '../../components/PlatformHeader.astro';
import PlatformFooter from '../../components/PlatformFooter.astro';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: '🏠', title: 'Dashboard Home' },
    { href: '/1. partA/hub.html', label: 'Foundations', icon: '📚', title: 'Foundations Academy' },
    { href: 'javascript:void(0)', label: 'Practical Dojo', icon: '⚔️', title: 'Practical Dojo Hub', active: true, extraClass: 'dojo-nav-highlight', onClick: 'openDojoHub()' }
];
---

<BaseLayout
    title="Async UI & Client Data Architecture (Level 8) | CodeRoots"
    description="Master asynchronous React data lifecycles, skeleton loaders, error boundaries, optimistic UI, and real-time polling."
    showHeaderFooter={false}
>
    <PlatformHeader 
        slot="header"
        tagText="Level 8 • Async UI Architecture"
        tagId="headerLogoTag"
        navLinks={navLinks}
        showXpBadge={true}
        showLevelBadge={true}
    />

    <main class="hub-container">
        <!-- Hero Section -->
        <section class="hub-hero">
            <span class="hub-badge" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: white;">🌉 Level 8 • Async UI & Client Data Architecture</span>
            <h1>Architect Resilient Async Frontend Systems</h1>
            <p>
                Production React frontends must handle latency, network blips, and real-time synchronization with zero stutter. Master asynchronous data fetching, animated skeleton loaders, error boundary fallbacks, optimistic state mutations, and polling lifecycles across 6 hands-on projects!
            </p>

            <!-- Live Progress Bar -->
            <div class="hero-progress-wrap">
                <div class="hero-progress-info">
                    <span>Course Progress</span>
                    <span id="heroProgressText">0 of 6 Projects Completed (0%)</span>
                </div>
                <div class="hero-progress-bar">
                    <div class="hero-progress-fill" id="heroProgressFill"></div>
                </div>
            </div>

            <!-- Smart Resume CTA -->
            <a href="/7. partG/lesson1/lesson1_remake.html" class="hero-cta-btn" id="heroResumeBtn">
                <span>🚀 Start Lesson 1: Async Data Fetching ➔</span>
            </a>
        </section>

        <!-- Stats Overview Row -->
        <section class="hub-stats-grid">
            <div class="hub-stat-card">
                <div class="hub-stat-val">1,500 XP</div>
                <div class="hub-stat-lbl">Total XP Bounty</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val" id="statCompletedProjects">0 / 6</div>
                <div class="hub-stat-lbl">Projects Built</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">React 18 + Async Hooks</div>
                <div class="hub-stat-lbl">Core Stack</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">Async UI Specialist</div>
                <div class="hub-stat-lbl">Official Certificate</div>
            </div>
        </section>

        <!-- Curriculum Breakdown -->
        <section class="curriculum-section">
            <div class="chapter-block">
                <div class="chapter-header">
                    <div class="chapter-title-wrap">
                        <span class="chapter-num">Async UI Track</span>
                        <h2 class="chapter-title">Client Data Lifecycles &amp; Reactive State</h2>
                    </div>
                    <span class="chapter-badge">Lessons 1–6 • 1,500 XP</span>
                </div>

                <div class="lesson-cards-grid">
                    
                    <a href="/7. partG/lesson1/lesson1_remake.html" class="lesson-card locked" id="lessonCard1">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 01</span>
                            <span class="lesson-status-pill locked" id="statusPill1">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Async Data Fetching & Skeleton Loaders</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText1">Locked</span>
                        </div>
                    </a>
                    <a href="/7. partG/lesson2/lesson2_remake.html" class="lesson-card locked" id="lessonCard2">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 02</span>
                            <span class="lesson-status-pill locked" id="statusPill2">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Error Boundaries & HTTP Fallbacks</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText2">Locked</span>
                        </div>
                    </a>
                    <a href="/7. partG/lesson3/lesson3_remake.html" class="lesson-card locked" id="lessonCard3">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 03</span>
                            <span class="lesson-status-pill locked" id="statusPill3">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Controlled Form Mutations & Pending State</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText3">Locked</span>
                        </div>
                    </a>
                    <a href="/7. partG/lesson4/lesson4_remake.html" class="lesson-card locked" id="lessonCard4">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 04</span>
                            <span class="lesson-status-pill locked" id="statusPill4">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Optimistic UI Updates & State Rollbacks</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText4">Locked</span>
                        </div>
                    </a>
                    <a href="/7. partG/lesson5/lesson5_remake.html" class="lesson-card locked" id="lessonCard5">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 05</span>
                            <span class="lesson-status-pill locked" id="statusPill5">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Real-Time Polling & Sync Cleanup</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText5">Locked</span>
                        </div>
                    </a>
                    <a href="/7. partG/lesson6/lesson6_remake.html" class="lesson-card locked" id="lessonCard6">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 06</span>
                            <span class="lesson-status-pill locked" id="statusPill6">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Capstone: Reactive E-Commerce Dashboard</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText6">Locked</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Certificate Showcase Card -->
        <section class="hub-cert-card">
            <div class="cert-card-inner">
                <div class="cert-icon-wrap">🎓</div>
                <div class="cert-text-wrap">
                    <h3>Async UI &amp; Client Data Specialist Certificate</h3>
                    <p>Complete all 6 async integration projects to earn your official Level 8 verification credential!</p>
                </div>
                <a href="/7. partG/certificate.html" class="cert-cta-btn locked" id="certButton">
                    <span>🔒 Complete 6 Projects to Unlock</span>
                </a>
            </div>
        </section>
    </main>

    <PlatformFooter slot="footer" />
</BaseLayout>

<script is:inline>
    (function () {
        const LESSON_KEYS = [
            'partG_lesson1_remake_complete',
            'partG_lesson2_remake_complete',
            'partG_lesson3_remake_complete',
            'partG_lesson4_remake_complete',
            'partG_lesson5_remake_complete',
            'partG_lesson6_remake_complete'
        ];

        const LESSON_URLS = [
            '/7. partG/lesson1/lesson1_remake.html',
            '/7. partG/lesson2/lesson2_remake.html',
            '/7. partG/lesson3/lesson3_remake.html',
            '/7. partG/lesson4/lesson4_remake.html',
            '/7. partG/lesson5/lesson5_remake.html',
            '/7. partG/lesson6/lesson6_remake.html'
        ];

        const LESSON_NAMES = [
            'Async Data Fetching & Skeletons',
            'Error Boundaries & HTTP Fallbacks',
            'Controlled Form Mutations',
            'Optimistic UI Updates',
            'Real-Time Polling & Sync',
            'Reactive E-Commerce Dashboard'
        ];

        function initHub() {
            let completedCount = 0;
            let firstIncompleteIdx = -1;

            LESSON_KEYS.forEach((key, idx) => {
                const isComplete = localStorage.getItem(key) === 'true';
                const isUnlocked = idx === 0 || localStorage.getItem(LESSON_KEYS[idx - 1]) === 'true';

                if (isComplete) completedCount++;
                if (!isComplete && firstIncompleteIdx === -1 && isUnlocked) {
                    firstIncompleteIdx = idx;
                }

                const card = document.getElementById(\`lessonCard\${idx + 1}\`);
                const pill = document.getElementById(\`statusPill\${idx + 1}\`);
                const action = document.getElementById(\`actionText\${idx + 1}\`);

                if (!card || !pill || !action) return;

                if (isComplete) {
                    card.className = 'lesson-card completed';
                    pill.className = 'lesson-status-pill completed';
                    pill.textContent = '✅ Completed';
                    action.textContent = 'Review Project ➔';
                } else if (isUnlocked) {
                    card.className = 'lesson-card in-progress';
                    pill.className = 'lesson-status-pill in-progress';
                    pill.textContent = '⚡ In Progress';
                    action.textContent = 'Launch Project ➔';
                } else {
                    card.className = 'lesson-card locked';
                    pill.className = 'lesson-status-pill locked';
                    pill.textContent = '🔒 Locked';
                    action.textContent = 'Locked';
                }
            });

            const percent = Math.round((completedCount / LESSON_KEYS.length) * 100);
            const progressFill = document.getElementById('heroProgressFill');
            const progressText = document.getElementById('heroProgressText');
            const statsVal = document.getElementById('statCompletedProjects');

            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = \`\${completedCount} of \${LESSON_KEYS.length} Projects Completed (\${percent}%)\`;
            if (statsVal) statsVal.textContent = \`\${completedCount} / \${LESSON_KEYS.length}\`;

            const resumeBtn = document.getElementById('heroResumeBtn');
            if (resumeBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    resumeBtn.href = '/7. partG/certificate.html';
                    resumeBtn.innerHTML = '<span>🏆 Claim Specialist Certificate ➔</span>';
                    resumeBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                } else if (firstIncompleteIdx !== -1) {
                    resumeBtn.href = LESSON_URLS[firstIncompleteIdx];
                    resumeBtn.innerHTML = \`<span>🚀 Continue Project \${firstIncompleteIdx + 1}: \${LESSON_NAMES[firstIncompleteIdx]} ➔</span>\`;
                }
            }

            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.innerHTML = '<span>🎓 View & Download Certificate ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }
        }

        document.addEventListener('DOMContentLoaded', initHub);
        window.addEventListener('storage', initHub);
    })();
</script>
`;

const hub9Content = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PlatformHeader from '../../components/PlatformHeader.astro';
import PlatformFooter from '../../components/PlatformFooter.astro';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: '🏠', title: 'Dashboard Home' },
    { href: '/1. partA/hub.html', label: 'Foundations', icon: '📚', title: 'Foundations Academy' },
    { href: 'javascript:void(0)', label: 'Practical Dojo', icon: '⚔️', title: 'Practical Dojo Hub', active: true, extraClass: 'dojo-nav-highlight', onClick: 'openDojoHub()' }
];
---

<BaseLayout
    title="React Auth State & Access Control (Level 9) | CodeRoots"
    description="Master client authentication lifecycles, global AuthContext providers, protected route guards, and role-based access control."
    showHeaderFooter={false}
>
    <PlatformHeader 
        slot="header"
        tagText="Level 9 • React Auth & Access Control"
        tagId="headerLogoTag"
        navLinks={navLinks}
        showXpBadge={true}
        showLevelBadge={true}
    />

    <main class="hub-container">
        <!-- Hero Section -->
        <section class="hub-hero">
            <span class="hub-badge" style="background: linear-gradient(135deg, #4f46e5, #4338ca); color: white;">🛡️ Level 9 • React Auth State & Access Control</span>
            <h1>Architect Frontend Authentication &amp; Access Gates</h1>
            <p>
                Master how production React applications architect authentication state. Learn token management, global session distribution with AuthContext, protected route navigation guards, session hydration, and role-based UI access control (RBAC) across 6 hands-on projects!
            </p>

            <!-- Live Progress Bar -->
            <div class="hero-progress-wrap">
                <div class="hero-progress-info">
                    <span>Course Progress</span>
                    <span id="heroProgressText">0 of 6 Projects Completed (0%)</span>
                </div>
                <div class="hero-progress-bar">
                    <div class="hero-progress-fill" id="heroProgressFill"></div>
                </div>
            </div>

            <!-- Smart Resume CTA -->
            <a href="/8. partH/lesson1/lesson1_remake.html" class="hero-cta-btn" id="heroResumeBtn">
                <span>🚀 Start Lesson 1: Auth Token State ➔</span>
            </a>
        </section>

        <!-- Stats Overview Row -->
        <section class="hub-stats-grid">
            <div class="hub-stat-card">
                <div class="hub-stat-val">1,500 XP</div>
                <div class="hub-stat-lbl">Total XP Bounty</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val" id="statCompletedProjects">0 / 6</div>
                <div class="hub-stat-lbl">Projects Built</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">React Context + RBAC</div>
                <div class="hub-stat-lbl">Security Stack</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">Auth UI Specialist</div>
                <div class="hub-stat-lbl">Official Certificate</div>
            </div>
        </section>

        <!-- Curriculum Breakdown -->
        <section class="curriculum-section">
            <div class="chapter-block">
                <div class="chapter-header">
                    <div class="chapter-title-wrap">
                        <span class="chapter-num">Auth &amp; Security Track</span>
                        <h2 class="chapter-title">Client Auth State &amp; Access Control Architecture</h2>
                    </div>
                    <span class="chapter-badge">Lessons 1–6 • 1,500 XP</span>
                </div>

                <div class="lesson-cards-grid">
                    
                    <a href="/8. partH/lesson1/lesson1_remake.html" class="lesson-card locked" id="lessonCard1">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 01</span>
                            <span class="lesson-status-pill locked" id="statusPill1">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Auth Token State & Client Session Storage</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText1">Locked</span>
                        </div>
                    </a>
                    <a href="/8. partH/lesson2/lesson2_remake.html" class="lesson-card locked" id="lessonCard2">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 02</span>
                            <span class="lesson-status-pill locked" id="statusPill2">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Global AuthContext & useAuth() Hook</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText2">Locked</span>
                        </div>
                    </a>
                    <a href="/8. partH/lesson3/lesson3_remake.html" class="lesson-card locked" id="lessonCard3">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 03</span>
                            <span class="lesson-status-pill locked" id="statusPill3">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Protected Route Guards & Redirects</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText3">Locked</span>
                        </div>
                    </a>
                    <a href="/8. partH/lesson4/lesson4_remake.html" class="lesson-card locked" id="lessonCard4">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 04</span>
                            <span class="lesson-status-pill locked" id="statusPill4">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">User Directory State & Immutable Mutations</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText4">Locked</span>
                        </div>
                    </a>
                    <a href="/8. partH/lesson5/lesson5_remake.html" class="lesson-card locked" id="lessonCard5">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 05</span>
                            <span class="lesson-status-pill locked" id="statusPill5">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Role-Based Access Control (RBAC) UI Gates</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText5">Locked</span>
                        </div>
                    </a>
                    <a href="/8. partH/lesson6/lesson6_remake.html" class="lesson-card locked" id="lessonCard6">
                        <div class="card-top">
                            <span class="lesson-idx">PROJECT 06</span>
                            <span class="lesson-status-pill locked" id="statusPill6">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Capstone: Secure Workspace with Role Guards</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +250 XP</span>
                            <span class="card-action-text" id="actionText6">Locked</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Certificate Showcase Card -->
        <section class="hub-cert-card">
            <div class="cert-card-inner">
                <div class="cert-icon-wrap">🎓</div>
                <div class="cert-text-wrap">
                    <h3>React Auth &amp; Access Control Specialist Certificate</h3>
                    <p>Complete all 6 security projects to earn your official Level 9 verification credential!</p>
                </div>
                <a href="/8. partH/certificate.html" class="cert-cta-btn locked" id="certButton">
                    <span>🔒 Complete 6 Projects to Unlock</span>
                </a>
            </div>
        </section>
    </main>

    <PlatformFooter slot="footer" />
</BaseLayout>

<script is:inline>
    (function () {
        const LESSON_KEYS = [
            'partH_lesson1_remake_complete',
            'partH_lesson2_remake_complete',
            'partH_lesson3_remake_complete',
            'partH_lesson4_remake_complete',
            'partH_lesson5_remake_complete',
            'partH_lesson6_remake_complete'
        ];

        const LESSON_URLS = [
            '/8. partH/lesson1/lesson1_remake.html',
            '/8. partH/lesson2/lesson2_remake.html',
            '/8. partH/lesson3/lesson3_remake.html',
            '/8. partH/lesson4/lesson4_remake.html',
            '/8. partH/lesson5/lesson5_remake.html',
            '/8. partH/lesson6/lesson6_remake.html'
        ];

        const LESSON_NAMES = [
            'Auth Token State',
            'Global AuthContext & useAuth()',
            'Protected Route Guards',
            'User Directory State',
            'Role-Based Access Control',
            'Secure Team Workspace'
        ];

        function initHub() {
            let completedCount = 0;
            let firstIncompleteIdx = -1;

            LESSON_KEYS.forEach((key, idx) => {
                const isComplete = localStorage.getItem(key) === 'true';
                const isUnlocked = idx === 0 || localStorage.getItem(LESSON_KEYS[idx - 1]) === 'true';

                if (isComplete) completedCount++;
                if (!isComplete && firstIncompleteIdx === -1 && isUnlocked) {
                    firstIncompleteIdx = idx;
                }

                const card = document.getElementById(\`lessonCard\${idx + 1}\`);
                const pill = document.getElementById(\`statusPill\${idx + 1}\`);
                const action = document.getElementById(\`actionText\${idx + 1}\`);

                if (!card || !pill || !action) return;

                if (isComplete) {
                    card.className = 'lesson-card completed';
                    pill.className = 'lesson-status-pill completed';
                    pill.textContent = '✅ Completed';
                    action.textContent = 'Review Project ➔';
                } else if (isUnlocked) {
                    card.className = 'lesson-card in-progress';
                    pill.className = 'lesson-status-pill in-progress';
                    pill.textContent = '⚡ In Progress';
                    action.textContent = 'Launch Project ➔';
                } else {
                    card.className = 'lesson-card locked';
                    pill.className = 'lesson-status-pill locked';
                    pill.textContent = '🔒 Locked';
                    action.textContent = 'Locked';
                }
            });

            const percent = Math.round((completedCount / LESSON_KEYS.length) * 100);
            const progressFill = document.getElementById('heroProgressFill');
            const progressText = document.getElementById('heroProgressText');
            const statsVal = document.getElementById('statCompletedProjects');

            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = \`\${completedCount} of \${LESSON_KEYS.length} Projects Completed (\${percent}%)\`;
            if (statsVal) statsVal.textContent = \`\${completedCount} / \${LESSON_KEYS.length}\`;

            const resumeBtn = document.getElementById('heroResumeBtn');
            if (resumeBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    resumeBtn.href = '/8. partH/certificate.html';
                    resumeBtn.innerHTML = '<span>🏆 Claim Specialist Certificate ➔</span>';
                    resumeBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                } else if (firstIncompleteIdx !== -1) {
                    resumeBtn.href = LESSON_URLS[firstIncompleteIdx];
                    resumeBtn.innerHTML = \`<span>🚀 Continue Project \${firstIncompleteIdx + 1}: \${LESSON_NAMES[firstIncompleteIdx]} ➔</span>\`;
                }
            }

            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.innerHTML = '<span>🎓 View & Download Certificate ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }
        }

        document.addEventListener('DOMContentLoaded', initHub);
        window.addEventListener('storage', initHub);
    })();
</script>
`;

const hub10Content = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PlatformHeader from '../../components/PlatformHeader.astro';
import PlatformFooter from '../../components/PlatformFooter.astro';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: '🏠', title: 'Dashboard Home' },
    { href: '/1. partA/hub.html', label: 'Foundations', icon: '📚', title: 'Foundations Academy' },
    { href: 'javascript:void(0)', label: 'Practical Dojo', icon: '⚔️', title: 'Practical Dojo Hub', active: true, extraClass: 'dojo-nav-highlight', onClick: 'openDojoHub()' }
];
---

<BaseLayout
    title="SaaS UI Architecture & Design Systems (Level 10) | CodeRoots"
    description="Architect enterprise SaaS frontends, modular layout shells, debounced search pipelines, dynamic billing switchers, and AI copilots."
    showHeaderFooter={false}
>
    <PlatformHeader 
        slot="header"
        tagText="Level 10 • SaaS UI Architecture"
        tagId="headerLogoTag"
        navLinks={navLinks}
        showXpBadge={true}
        showLevelBadge={true}
    />

    <main class="hub-container">
        <!-- Hero Section -->
        <section class="hub-hero">
            <span class="hub-badge" style="background: linear-gradient(135deg, #e11d48, #be123c); color: white;">🏆 Level 10 • SaaS UI Architecture & Design Systems</span>
            <h1>Architect Enterprise SaaS Frontends</h1>
            <p>
                The ultimate frontend engineering milestone. Master modular SaaS layout shells, debounced live search filters, dynamic subscription billing switchers, streaming AI copilot panels, and pre-flight launch dashboards across 6 flagship milestones!
            </p>

            <!-- Live Progress Bar -->
            <div class="hero-progress-wrap">
                <div class="hero-progress-info">
                    <span>Course Progress</span>
                    <span id="heroProgressText">0 of 6 Milestones Completed (0%)</span>
                </div>
                <div class="hero-progress-bar">
                    <div class="hero-progress-fill" id="heroProgressFill"></div>
                </div>
            </div>

            <!-- Smart Resume CTA -->
            <a href="/9. partI/lesson1/lesson1_remake.html" class="hero-cta-btn" id="heroResumeBtn">
                <span>🚀 Start Milestone 1: Modular SaaS Shell ➔</span>
            </a>
        </section>

        <!-- Stats Overview Row -->
        <section class="hub-stats-grid">
            <div class="hub-stat-card">
                <div class="hub-stat-val">3,000 XP</div>
                <div class="hub-stat-lbl">Apex Bounty</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val" id="statCompletedProjects">0 / 6</div>
                <div class="hub-stat-lbl">Milestones Completed</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">React 18 + SaaS Patterns</div>
                <div class="hub-stat-lbl">Architecture Stack</div>
            </div>
            <div class="hub-stat-card">
                <div class="hub-stat-val">SaaS UI Architect</div>
                <div class="hub-stat-lbl">Apex Diploma</div>
            </div>
        </section>

        <!-- Curriculum Breakdown -->
        <section class="curriculum-section">
            <div class="chapter-block">
                <div class="chapter-header">
                    <div class="chapter-title-wrap">
                        <span class="chapter-num">Diploma Track</span>
                        <h2 class="chapter-title">Production SaaS UI Architecture &amp; Design Systems</h2>
                    </div>
                    <span class="chapter-badge">Milestones 1–6 • 3,000 XP</span>
                </div>

                <div class="lesson-cards-grid">
                    
                    <a href="/9. partI/lesson1/lesson1_remake.html" class="lesson-card locked" id="lessonCard1">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 01</span>
                            <span class="lesson-status-pill locked" id="statusPill1">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Modular SaaS Layout Shell & Navigation</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText1">Locked</span>
                        </div>
                    </a>
                    <a href="/9. partI/lesson2/lesson2_remake.html" class="lesson-card locked" id="lessonCard2">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 02</span>
                            <span class="lesson-status-pill locked" id="statusPill2">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Debounced Live Search & Multi-Filter Pipelines</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText2">Locked</span>
                        </div>
                    </a>
                    <a href="/9. partI/lesson3/lesson3_remake.html" class="lesson-card locked" id="lessonCard3">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 03</span>
                            <span class="lesson-status-pill locked" id="statusPill3">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Subscription Tier Switcher & Billing UI</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText3">Locked</span>
                        </div>
                    </a>
                    <a href="/9. partI/lesson4/lesson4_remake.html" class="lesson-card locked" id="lessonCard4">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 04</span>
                            <span class="lesson-status-pill locked" id="statusPill4">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Interactive AI Copilot & Insights Panel</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText4">Locked</span>
                        </div>
                    </a>
                    <a href="/9. partI/lesson5/lesson5_remake.html" class="lesson-card locked" id="lessonCard5">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 05</span>
                            <span class="lesson-status-pill locked" id="statusPill5">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Production Readiness Audit & Pre-Flight Dashboard</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText5">Locked</span>
                        </div>
                    </a>
                    <a href="/9. partI/lesson6/lesson6_remake.html" class="lesson-card locked" id="lessonCard6">
                        <div class="card-top">
                            <span class="lesson-idx">MILESTONE 06</span>
                            <span class="lesson-status-pill locked" id="statusPill6">🔒 Locked</span>
                        </div>
                        <h3 class="lesson-card-title">Apex Capstone: Enterprise SaaS Dashboard Suite</h3>
                        <div class="card-bottom">
                            <span class="xp-tag">⚡ +500 XP</span>
                            <span class="card-action-text" id="actionText6">Locked</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Certificate Showcase Card -->
        <section class="hub-cert-card">
            <div class="cert-card-inner">
                <div class="cert-icon-wrap">🎓</div>
                <div class="cert-text-wrap">
                    <h3>SaaS UI &amp; Design Systems Architect Diploma</h3>
                    <p>Complete all 6 production milestones to unlock your prestigious Level 10 graduation diploma!</p>
                </div>
                <a href="/9. partI/certificate.html" class="cert-cta-btn locked" id="certButton">
                    <span>🔒 Complete 6 Milestones to Unlock</span>
                </a>
            </div>
        </section>
    </main>

    <PlatformFooter slot="footer" />
</BaseLayout>

<script is:inline>
    (function () {
        const LESSON_KEYS = [
            'partI_lesson1_remake_complete',
            'partI_lesson2_remake_complete',
            'partI_lesson3_remake_complete',
            'partI_lesson4_remake_complete',
            'partI_lesson5_remake_complete',
            'partI_lesson6_remake_complete'
        ];

        const LESSON_URLS = [
            '/9. partI/lesson1/lesson1_remake.html',
            '/9. partI/lesson2/lesson2_remake.html',
            '/9. partI/lesson3/lesson3_remake.html',
            '/9. partI/lesson4/lesson4_remake.html',
            '/9. partI/lesson5/lesson5_remake.html',
            '/9. partI/lesson6/lesson6_remake.html'
        ];

        const LESSON_NAMES = [
            'Modular SaaS Shell',
            'Debounced Live Search',
            'Subscription Tier Switcher',
            'Interactive AI Copilot',
            'Production Readiness Audit',
            'Enterprise SaaS Dashboard'
        ];

        function initHub() {
            let completedCount = 0;
            let firstIncompleteIdx = -1;

            LESSON_KEYS.forEach((key, idx) => {
                const isComplete = localStorage.getItem(key) === 'true';
                const isUnlocked = idx === 0 || localStorage.getItem(LESSON_KEYS[idx - 1]) === 'true';

                if (isComplete) completedCount++;
                if (!isComplete && firstIncompleteIdx === -1 && isUnlocked) {
                    firstIncompleteIdx = idx;
                }

                const card = document.getElementById(\`lessonCard\${idx + 1}\`);
                const pill = document.getElementById(\`statusPill\${idx + 1}\`);
                const action = document.getElementById(\`actionText\${idx + 1}\`);

                if (!card || !pill || !action) return;

                if (isComplete) {
                    card.className = 'lesson-card completed';
                    pill.className = 'lesson-status-pill completed';
                    pill.textContent = '✅ Completed';
                    action.textContent = 'Review Milestone ➔';
                } else if (isUnlocked) {
                    card.className = 'lesson-card in-progress';
                    pill.className = 'lesson-status-pill in-progress';
                    pill.textContent = '⚡ In Progress';
                    action.textContent = 'Launch Milestone ➔';
                } else {
                    card.className = 'lesson-card locked';
                    pill.className = 'lesson-status-pill locked';
                    pill.textContent = '🔒 Locked';
                    action.textContent = 'Locked';
                }
            });

            const percent = Math.round((completedCount / LESSON_KEYS.length) * 100);
            const progressFill = document.getElementById('heroProgressFill');
            const progressText = document.getElementById('heroProgressText');
            const statsVal = document.getElementById('statCompletedProjects');

            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = \`\${completedCount} of \${LESSON_KEYS.length} Milestones Completed (\${percent}%)\`;
            if (statsVal) statsVal.textContent = \`\${completedCount} / \${LESSON_KEYS.length}\`;

            const resumeBtn = document.getElementById('heroResumeBtn');
            if (resumeBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    resumeBtn.href = '/9. partI/certificate.html';
                    resumeBtn.innerHTML = '<span>🏆 Claim Master Diploma ➔</span>';
                    resumeBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                } else if (firstIncompleteIdx !== -1) {
                    resumeBtn.href = LESSON_URLS[firstIncompleteIdx];
                    resumeBtn.innerHTML = \`<span>🚀 Continue Milestone \${firstIncompleteIdx + 1}: \${LESSON_NAMES[firstIncompleteIdx]} ➔</span>\`;
                }
            }

            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.innerHTML = '<span>🎓 View & Download Diploma ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }
        }

        document.addEventListener('DOMContentLoaded', initHub);
        window.addEventListener('storage', initHub);
    })();
</script>
`;

fs.writeFileSync(path.resolve('src/pages/7. partG/hub.astro'), hub8Content, 'utf-8');
fs.writeFileSync(path.resolve('src/pages/8. partH/hub.astro'), hub9Content, 'utf-8');
fs.writeFileSync(path.resolve('src/pages/9. partI/hub.astro'), hub10Content, 'utf-8');
console.log('✅ Updated Hubs for Levels 8, 9, and 10');

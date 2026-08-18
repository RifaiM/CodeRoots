/**
 * NoviCodes - Master Foundations Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalBackToTop();

    // 1. Determine Active Track from Query Parameter (?track=html | css | js | react | python | cloud | sql | nextjs | typescript | cssmotion | async | auth | saas)
    const urlParams = new URLSearchParams(window.location.search);
    const rawTrackParam = urlParams.get('track');
    const validTracks = ['html', 'css', 'js', 'react', 'python', 'cloud', 'sql', 'nextjs', 'typescript', 'cssmotion', 'async', 'auth', 'saas'];

    if (rawTrackParam && !validTracks.includes(rawTrackParam.toLowerCase())) {
        render404TrackPage(rawTrackParam);
        return;
    }

    const trackKey = (rawTrackParam || 'html').toLowerCase();

    const trackMap = {
        html: window.LEVEL1_HTML_DATA,
        css: window.LEVEL2_CSS_DATA,
        js: window.LEVEL3_JS_DATA,
        react: window.LEVEL5_REACT_DATA,
        python: window.LEVEL6_PYTHON_DATA,
        cloud: window.LEVEL7A_CLOUD_DATA,
        sql: window.LEVEL7B_SQL_DATA,
        nextjs: window.LEVEL7C_NEXTJS_DATA,
        typescript: window.LEVEL7D_TYPESCRIPT_DATA,
        cssmotion: window.LEVEL7E_CSSMOTION_DATA,
        async: window.LEVEL8_ASYNC_DATA,
        auth: window.LEVEL9_AUTH_DATA,
        saas: window.LEVEL10_SAAS_DATA
    };

    let trackData = trackMap[trackKey] || window.LEVEL1_HTML_DATA;

    // 2. Hydrate Page Header & Hero Details
    document.title = `NoviCodes - ${trackData.title}`;
    
    const trackBadgePill = document.getElementById('trackBadgePill');
    const trackTitle = document.getElementById('trackTitle');
    const trackSubtitle = document.getElementById('trackSubtitle');
    const headerLogoTag = document.getElementById('headerLogoTag');

    if (trackBadgePill) trackBadgePill.textContent = trackData.title;
    if (trackTitle) trackTitle.textContent = trackData.title;
    if (trackSubtitle) trackSubtitle.textContent = trackData.subtitle;
    if (headerLogoTag && trackData) {
        headerLogoTag.textContent = trackData.title;
    }

    // Calculate User Stats from LocalStorage
    updateHeaderStats();

    // 3. Initialize Track Quick Switcher Dropdown (with Active Tab Preservation)
    const trackQuickSelect = document.getElementById('trackQuickSelect');
    if (trackQuickSelect) {
        trackQuickSelect.value = trackKey;
        trackQuickSelect.addEventListener('change', (e) => {
            const chosen = e.target.value;
            if (chosen && chosen !== trackKey) {
                const activeTabBtn = document.querySelector('.foundations-tab-bar .tab-btn.active');
                const activeTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'concepts';
                const tabParam = activeTab && activeTab !== 'concepts' ? `&tab=${encodeURIComponent(activeTab)}` : '';
                window.location.href = `/foundations.html?track=${encodeURIComponent(chosen)}${tabParam}`;
            }
        });
    }

    // 4. Initialize Tab Navigation Engine
    initTabNavigation();

    // 5. Hydrate 1. Concepts Panel
    hydrateConceptsPanel(trackData.concepts, trackKey);

    // 6. Hydrate 2. Glossary Panel
    hydrateGlossaryPanel(trackData.glossary);

    // 7. Hydrate 3. Code Sandbox Engine
    initSandboxEngine(trackData.sandbox);

    // 8. Hydrate 4. Quiz & Verification Engine
    initInteractiveQuiz(trackData);
});

/**
 * Calculates XP and rank badge from LocalStorage across all Level 0 - 7 tracks
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
    const l7XP = (l7BranchA * 250) + (l7BranchB * 250) + (l7BranchC * 250) + (l7BranchD * 150) + (l7BranchE * 150);

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

function updateHeaderStats() {
    const stats = window.getUserXPAndRank();
    const xpLabel = document.getElementById('userXpLabel');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');

    if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (rankLabel) rankLabel.textContent = stats.rankTitle;
    if (rankIcon) rankIcon.textContent = stats.rankIcon;
}

/**
 * Initializes 4-Tab Segmented Switcher with URL History & Tab Persistence
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.foundations-tab-bar .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    const switchTab = (targetTab) => {
        tabButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-tab') === targetTab);
        });
        tabPanels.forEach(p => {
            p.classList.toggle('active', p.id === `panel-${targetTab}`);
        });

        // Update URL state without page reload
        try {
            const newUrl = new URL(window.location.href);
            if (targetTab === 'concepts') {
                newUrl.searchParams.delete('tab');
            } else {
                newUrl.searchParams.set('tab', targetTab);
            }
            window.history.replaceState({}, '', newUrl.toString());
        } catch (e) {}
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            if (targetTab) switchTab(targetTab);
        });
    });

    // Restore tab from URL search param on page load
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const initialTab = urlParams.get('tab');
        if (initialTab && document.getElementById(`panel-${initialTab}`)) {
            switchTab(initialTab);
        }
    } catch (e) {}
}

const DOJO_DESTINATIONS = {
    html: {
        title: 'Level 4 • JavaScript Widget Dojo',
        desc: 'Take your HTML & DOM structural knowledge into 15 hands-on interactive browser widgets.',
        url: '/2. partB/hub.html',
        btnText: '⚔️ Start Level 4 DOM Dojo ➔',
        icon: '⚔️'
    },
    css: {
        title: 'Level 7E • CSS Motion & Animation Dojo',
        desc: 'Put your box model and styling theory into 10 interactive hardware-accelerated animations.',
        url: '/6. partF/branchE/lesson1_remake.html',
        btnText: '🎨 Start CSS Motion Dojo ➔',
        icon: '🎨'
    },
    js: {
        title: 'Level 4 • JavaScript Widget Dojo',
        desc: 'Put variables, functions, and event listeners to work building 15 interactive browser widgets.',
        url: '/2. partB/lesson1/lesson1_remake.html',
        btnText: '⚡ Start Level 4 Lesson 1 (Counter Widget) ➔',
        icon: '⚔️'
    },
    react: {
        title: 'Level 5 • React Component Dojo',
        desc: 'Put JSX, props, and useState mental models to work across 15 interactive React milestones.',
        url: '/3. partC/lesson1/lesson1_remake.html',
        btnText: '⚛️ Start Level 5 Lesson 1 (JSX Component) ➔',
        icon: '⚛️'
    },
    python: {
        title: 'Level 6 • Python & Backend Dojo',
        desc: 'Practice algorithms, data structures, OOP classes, and API mocks in 15 Python challenges.',
        url: '/5. partE/lesson1/lesson1_remake.html',
        btnText: '🐍 Start Level 6 Lesson 1 (Python Basics) ➔',
        icon: '🐍'
    },
    cloud: {
        title: 'Level 7A • Cloud Hosting & DevOps Dojo',
        desc: 'Write real Nginx configs, Dockerfile manifests, and automated GitHub Actions CI/CD workflows.',
        url: '/6. partF/branchA/lesson1_remake.html',
        btnText: '☁️ Start Level 7A Lesson 1 (Static Hosting) ➔',
        icon: '☁️'
    },
    sql: {
        title: 'Level 7B • SQL Relational Databases Dojo',
        desc: 'Design relational tables, foreign keys, complex JOINs, and safe database transactions.',
        url: '/6. partF/branchB/lesson1_remake.html',
        btnText: '🛢️ Start Level 7B Lesson 1 (Create Table) ➔',
        icon: '🛢️'
    },
    nextjs: {
        title: 'Level 7C • Next.js App Router Dojo',
        desc: 'Build with React Server Components, App Router layouts, dynamic routes, and server data fetching.',
        url: '/6. partF/branchC/lesson1_remake.html',
        btnText: '⚡ Start Level 7C Lesson 1 (App Router) ➔',
        icon: '⚡'
    },
    typescript: {
        title: 'Level 7D • TypeScript Mastery Dojo',
        desc: 'Build type-safe interfaces, generics <T>, discriminated unions, and a reactive state store.',
        url: '/6. partF/branchD/lesson1_remake.html',
        btnText: '🔷 Start Level 7D Lesson 1 (Type Inference) ➔',
        icon: '🔷'
    },
    cssmotion: {
        title: 'Level 7E • CSS Motion & Micro-Interactions Dojo',
        desc: 'Build GPU-accelerated transforms, keyframe spinners, card shimmer, and accessible motion.',
        url: '/6. partF/branchE/lesson1_remake.html',
        btnText: '🎨 Start Level 7E Lesson 1 (Transitions) ➔',
        icon: '🎨'
    },
    async: {
        title: 'Level 8 • Async UI & Live Data Dojo',
        desc: 'Build animated skeleton placeholders, error recovery screens, and optimistic UI rollbacks.',
        url: '/7. partG/lesson1/lesson1_remake.html',
        btnText: '🌉 Start Level 8 Lesson 1 (Skeleton Loaders) ➔',
        icon: '🌉'
    },
    auth: {
        title: 'Level 9 • User Logins & Auth Dojo',
        desc: 'Build JWT session gates, AuthContext providers, protected routes, and role permissions.',
        url: '/8. partH/lesson1/lesson1_remake.html',
        btnText: '🛡️ Start Level 9 Lesson 1 (Auth Gate) ➔',
        icon: '🛡️'
    },
    saas: {
        title: 'Level 10 • SaaS Dashboard UI Dojo',
        desc: 'Combine layout shells, debounced live queries, subscription tiers, and AI chat panels.',
        url: '/9. partI/lesson1/lesson1_remake.html',
        btnText: '🏆 Start Level 10 Lesson 1 (Sidebar Shell) ➔',
        icon: '🏆'
    }
};

/**
 * Hydrates 1. Concepts Panel with Interactive Analogies, Live Simulators & Search Filter
 */
function hydrateConceptsPanel(conceptsData, trackKey) {
    const heroBox = document.getElementById('heroAnalogyBox');
    const listContainer = document.getElementById('conceptSectionsList');
    const searchInput = document.getElementById('conceptSearchInput');
    const clearBtn = document.getElementById('clearConceptSearchBtn');
    const statsLabel = document.getElementById('conceptSearchStats');

    if (!conceptsData || !heroBox || !listContainer) return;

    // Hero Analogy Box
    heroBox.innerHTML = `
        <h2><span>${conceptsData.heroAnalogy.icon}</span> ${conceptsData.heroAnalogy.title}</h2>
        <p>${conceptsData.heroAnalogy.description}</p>
    `;

    function renderSections(sections) {
        if (!sections || sections.length === 0) {
            listContainer.innerHTML = `<div class="concept-card" style="text-align: center; color: #64748b; padding: 36px 16px;"><p>🔍 No concepts matching your search filter.</p></div>`;
            return;
        }

        listContainer.innerHTML = sections.map(section => `
            <div class="concept-card">
                <h3>${section.title}</h3>
                <div>${section.content}</div>
            </div>
        `).join('');

        // Append Practical Dojo Bridge Card at the bottom of Tab 1
        const dojoInfo = DOJO_DESTINATIONS[trackKey] || DOJO_DESTINATIONS.html;
        const bridgeDiv = document.createElement('div');
        bridgeDiv.className = 'dojo-practice-bridge-card';
        bridgeDiv.innerHTML = `
            <div class="bridge-content-wrap">
                <div class="bridge-icon-badge">${dojoInfo.icon}</div>
                <div class="bridge-text-block">
                    <span class="bridge-tag">⚔️ Practical Application</span>
                    <h3 class="bridge-title">Ready to Practice in the Browser IDE?</h3>
                    <p class="bridge-desc">${escapeHtml(dojoInfo.desc)}</p>
                </div>
            </div>
            <div class="bridge-action-buttons">
                <a href="${escapeHtml(dojoInfo.url)}" class="bridge-btn-primary">
                    <span>${escapeHtml(dojoInfo.btnText)}</span>
                </a>
                <button type="button" class="bridge-btn-secondary" id="bridgeGoToQuizBtn">
                    <span>🧪 Take Knowledge Quiz (+300 XP)</span>
                </button>
            </div>
        `;
        listContainer.appendChild(bridgeDiv);

        const quizSwitchBtn = bridgeDiv.querySelector('#bridgeGoToQuizBtn');
        if (quizSwitchBtn) {
            quizSwitchBtn.addEventListener('click', () => {
                const quizTabBtn = document.querySelector('.foundations-tab-bar .tab-btn[data-tab="quiz"]');
                if (quizTabBtn) {
                    quizTabBtn.click();
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                }
            });
        }
    }

    renderSections(conceptsData.sections);

    if (searchInput) {
        const handleFilter = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (clearBtn) clearBtn.style.display = query ? 'inline-flex' : 'none';

            if (!query) {
                if (statsLabel) statsLabel.textContent = '';
                renderSections(conceptsData.sections);
                return;
            }

            const filtered = conceptsData.sections.filter(s => 
                (s.title && s.title.toLowerCase().includes(query)) ||
                (s.content && s.content.toLowerCase().includes(query))
            );

            if (statsLabel) {
                statsLabel.textContent = `Showing ${filtered.length} of ${conceptsData.sections.length} concepts`;
            }

            renderSections(filtered);
        };

        searchInput.addEventListener('input', handleFilter);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                handleFilter();
                searchInput.focus();
            });
        }
    }

    // Mount Interactive Concept Engines based on Active Track
    setTimeout(() => {
        if (trackKey === 'html') {
            initHtmlConceptWidgets();
        } else if (trackKey === 'css') {
            initCssConceptWidgets();
        } else if (trackKey === 'js') {
            initJsConceptWidgets();
        }
    }, 50);
}

// ── 1. HTML Interactive Concept Widgets ──
function initHtmlConceptWidgets() {
    const chunks = document.querySelectorAll('.tag-anatomy-card .anatomy-chunk');
    const detailBox = document.getElementById('anatomyDetailBox');

    const explanations = {
        open: {
            title: '🏷️ Opening Tag (<a ... >)',
            desc: 'Tells the browser to construct a new link element in the DOM tree. The opening tag bracket (<a) and closing bracket (>) define the start of the container.'
        },
        attr: {
            title: '⚡ Attributes (href="https://novicodes.dev")',
            desc: 'Attributes provide settings, properties, and destination targets for elements. href defines the URL where the user will be navigated upon clicking.'
        },
        content: {
            title: '📝 Element Content ("Explore Code Dojo")',
            desc: 'The human-readable text or nested child tags packed between the opening and closing tags that users see on the screen.'
        },
        close: {
            title: '🛑 Closing Tag (</a>)',
            desc: 'Tells the browser parser that this link container ends here. The forward slash (/) terminates the element boundary.'
        }
    };

    chunks.forEach(chunk => {
        chunk.addEventListener('click', () => {
            const part = chunk.dataset.part;
            chunks.forEach(c => {
                c.classList.toggle('active', c.dataset.part === part);
            });
            const info = explanations[part];
            if (info && detailBox) {
                detailBox.innerHTML = `
                    <div style="font-family: var(--font-mono, monospace); font-weight: 600; color: var(--text-title, #20211F); font-size: 0.88rem; margin-bottom: 6px;">
                        ${info.title}
                    </div>
                    <p style="color: var(--text-body, #20211F); font-size: 0.88rem; line-height: 1.55; margin: 0;">
                        ${info.desc}
                    </p>
                `;
            }
        });
    });

    // Auto-select first chunk on load
    if (chunks.length > 0) {
        chunks[0].click();
    }
}

// ── 2. CSS Interactive Concept Widgets ──
function initCssConceptWidgets() {
    // A. Box Model Explorer (Bidirectional Free-Hover Engine)
    const container = document.getElementById('cssBoxModelWidget');
    const readout = document.getElementById('boxModelReadout');
    const allLayerEls = container ? container.querySelectorAll('[data-layer]') : [];

    const layerDescriptions = {
        margin: {
            name: 'Margin 🚚',
            badgeColor: '#A33B24',
            desc: 'Outer buffer space in the delivery truck separating this element from neighbor boxes so they do not collide or touch.'
        },
        border: {
            name: 'Border 📦',
            badgeColor: '#854D0E',
            desc: 'The visible cardboard box outline surrounding the inner cushion (e.g. <code>2px solid #2C2D2B</code>).'
        },
        padding: {
            name: 'Padding 🛡️',
            badgeColor: '#2F5233',
            desc: 'The protective inner cushion inside the box giving your text/image breathing room from the cardboard walls.'
        },
        content: {
            name: 'Content ☕',
            badgeColor: '#1B1C1A',
            desc: 'The actual valuable item inside the box (your text headline, paragraph, photo, or button).'
        }
    };

    function setActiveLayer(layerKey) {
        allLayerEls.forEach(el => {
            el.classList.toggle('layer-active', el.getAttribute('data-layer') === layerKey);
        });

        if (readout) {
            if (layerKey && layerDescriptions[layerKey]) {
                const info = layerDescriptions[layerKey];
                readout.innerHTML = `
                    <div style="text-align: left; width: 100%;">
                        <strong style="color: ${info.badgeColor}; font-family: var(--font-mono, monospace); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.03em; display: inline-block; margin-right: 6px;">
                            ${info.name} Layer:
                        </strong>
                        <span style="color: var(--text-body, #20211F); line-height: 1.5;">${info.desc}</span>
                    </div>
                `;
            } else {
                readout.innerHTML = `<span><strong>💡 Hover over any Box Model layer above</strong> to see its real-world shipping box analogy!</span>`;
            }
        }
    }

    if (container) {
        // Use mouseover & pointermove to guarantee bidirectional detection (inner->outer and outer->inner)
        const handleLayerHover = (e) => {
            const layerEl = e.target.closest('[data-layer]');
            if (layerEl && container.contains(layerEl)) {
                const key = layerEl.getAttribute('data-layer');
                setActiveLayer(key);
            }
        };

        container.addEventListener('mouseover', handleLayerHover);
        container.addEventListener('pointermove', handleLayerHover);

        container.addEventListener('mouseleave', () => {
            setActiveLayer(null);
        });
    }

    // Set initial default message
    setActiveLayer(null);

    // B. Flexbox Playground
    const flexViewport = document.getElementById('flexSandboxViewport');
    const flexBtns = document.querySelectorAll('#cssFlexboxWidget .concept-toggle-btn');

    flexBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.flexDir) {
                flexBtns.forEach(b => { if (b.dataset.flexDir) b.classList.remove('active'); });
                btn.classList.add('active');
                if (flexViewport) flexViewport.style.flexDirection = btn.dataset.flexDir;
            } else if (btn.dataset.flexJustify) {
                flexBtns.forEach(b => { if (b.dataset.flexJustify) b.classList.remove('active'); });
                btn.classList.add('active');
                if (flexViewport) flexViewport.style.justifyContent = btn.dataset.flexJustify;
            }
        });
    });
}

// ── 3. JavaScript Interactive Concept Widgets ──
function initJsConceptWidgets() {
    // A. Triad Harmonizer
    const btnHtml = document.getElementById('btnToggleHtml') || document.getElementById('checkHtml');
    const btnCss = document.getElementById('btnToggleCss') || document.getElementById('checkCss');
    const btnJs = document.getElementById('btnToggleJs') || document.getElementById('checkJs');
    const screen = document.getElementById('triadPreviewScreen');

    let triadCount = 0;
    let hasHtml = true;
    let hasCss = true;
    let hasJs = true;

    function syncButtonState(btn, isActive) {
        if (!btn) return;
        btn.classList.toggle('active', isActive);
        btn.classList.toggle('checked', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        const statusSpan = btn.querySelector('.triad-btn-status');
        if (statusSpan) {
            statusSpan.textContent = isActive ? 'ON' : 'OFF';
        }
    }

    function updateTriad() {
        if (!screen) return;
        if (!hasHtml) {
            screen.innerHTML = `
                <div style="background: var(--canvas-base, #F1EEE7); border: 1px dashed var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 24px 16px; text-align: center; font-family: var(--font-mono, monospace);">
                    <div style="font-size: 1.5rem; margin-bottom: 8px;">💀</div>
                    <strong style="color: var(--accent-oxide, #A33B24); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 6px;">[STRUCTURE OFFLINE]</strong>
                    <p style="color: var(--text-muted, #686760); font-size: 0.82rem; margin: 0; max-width: 440px; margin: 0 auto; line-height: 1.5;">HTML is turned off. Without HTML bones, no elements exist in the browser DOM. There is nothing for CSS to paint or for JavaScript to attach events to!</p>
                </div>
            `;
            return;
        }

        if (hasCss) {
            screen.innerHTML = `
                <div id="triadContentBox" style="background: #FFFFFF; border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 20px; text-align: center; max-width: 360px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <span style="display: inline-block; font-family: var(--font-mono, monospace); font-size: 0.70rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: ${hasJs ? '#2F5233' : '#A33B24'}; background: ${hasJs ? '#EBF3EC' : '#F6ECE9'}; padding: 3px 8px; border-radius: 2px; margin-bottom: 10px;">
                        ${hasJs ? '⚡ Interactive Widget Active' : '🔒 Static Widget (No JS)'}
                    </span>
                    <h3 id="triadTitle" style="font-family: var(--font-serif, 'Newsreader', serif); font-size: 1.2rem; font-weight: 600; color: var(--text-title, #20211F); margin: 0 0 6px 0;">Live Web Counter</h3>
                    <p id="triadText" style="color: var(--text-muted, #686760); font-size: 0.84rem; margin: 0 0 14px 0; line-height: 1.5;">Click the button below to test interactivity and state updates:</p>
                    <button type="button" id="triadActionBtn" style="background: var(--accent-oxide, #A33B24); color: #F8F6F1; border: 1px solid var(--accent-oxide, #A33B24); padding: 8px 16px; border-radius: 2px; font-family: var(--font-mono, monospace); font-size: 0.78rem; font-weight: 600; cursor: pointer; text-transform: uppercase; letter-spacing: 0.04em; transition: all 0.15s ease;">
                        ⚡ Increment Count: <span id="triadCountDisplay">${triadCount}</span>
                    </button>
                </div>
            `;
        } else {
            // Raw unstyled HTML fallback
            screen.innerHTML = `
                <div id="triadContentBox" style="background: #FFFFFF; border: 1px solid #767676; padding: 14px; font-family: 'Times New Roman', Times, serif; color: #000000; text-align: left;">
                    <div style="font-size: 0.76rem; font-family: monospace; color: #666666; margin-bottom: 6px;">&lt;!-- Raw Unstyled HTML (CSS is OFF) --&gt;</div>
                    <h3 id="triadTitle" style="margin: 0 0 6px 0; font-size: 1.15rem; font-weight: bold; color: #000000;">Live Web Counter</h3>
                    <p id="triadText" style="margin: 0 0 10px 0; font-size: 0.90rem; color: #000000;">Click the button below to test interactivity and state updates:</p>
                    <button type="button" id="triadActionBtn" style="background: #e9e9ed; color: #000000; border: 1px solid #767676; padding: 3px 8px; font-size: 0.82rem; cursor: pointer;">
                        Click Me (Count: <span id="triadCountDisplay">${triadCount}</span>)
                    </button>
                </div>
            `;
        }

        const newBtn = document.getElementById('triadActionBtn');
        const newCount = document.getElementById('triadCountDisplay');
        if (newBtn) {
            newBtn.addEventListener('click', () => {
                if (hasJs) {
                    triadCount++;
                    if (newCount) newCount.textContent = triadCount;
                    newBtn.style.transform = 'scale(1.06)';
                    setTimeout(() => newBtn.style.transform = 'scale(1)', 100);
                } else {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'JavaScript Offline',
                            html: `
                                <div style="font-family: var(--font-sans, sans-serif); text-align: left; padding: 4px 8px;">
                                    <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55; margin-bottom: 8px;">
                                        Because <strong>JavaScript</strong> is turned off, this button cannot listen for click events or update state in memory.
                                    </p>
                                    <p style="color: var(--text-muted, #686760); font-size: 0.84rem; line-height: 1.5; margin: 0;">
                                        Turn <strong>⚡ 3. JavaScript</strong> back ON to restore dynamic click reaction!
                                    </p>
                                </div>
                            `,
                            confirmButtonColor: '#A33B24',
                            confirmButtonText: 'Acknowledge'
                        });
                    } else {
                        alert('JavaScript is OFF! Without JS, elements cannot react to events.');
                    }
                }
            });
        }
    }

    if (btnHtml) {
        btnHtml.addEventListener('click', (e) => {
            e.preventDefault();
            hasHtml = !hasHtml;
            syncButtonState(btnHtml, hasHtml);
            updateTriad();
        });
    }
    if (btnCss) {
        btnCss.addEventListener('click', (e) => {
            e.preventDefault();
            hasCss = !hasCss;
            syncButtonState(btnCss, hasCss);
            updateTriad();
        });
    }
    if (btnJs) {
        btnJs.addEventListener('click', (e) => {
            e.preventDefault();
            hasJs = !hasJs;
            syncButtonState(btnJs, hasJs);
            updateTriad();
        });
    }

    // Initial invocation so button state & preview screen are synced on page load
    syncButtonState(btnHtml, hasHtml);
    syncButtonState(btnCss, hasCss);
    syncButtonState(btnJs, hasJs);
    updateTriad();

    // B. Live Event Reactor
    const btnClick = document.getElementById('eventBtnClick');
    const btnHover = document.getElementById('eventBtnHover');
    const btnTimer = document.getElementById('eventBtnTimer');
    const inputMirror = document.getElementById('eventInputMirror');
    const mirrorOutput = document.getElementById('eventMirrorOutput');
    const logBox = document.getElementById('eventLiveLogBox');

    function appendLog(msg, color = '#34d399') {
        if (!logBox) return;
        const entry = document.createElement('div');
        entry.style.color = color;
        entry.textContent = `> [${new Date().toLocaleTimeString()}] ${msg}`;
        logBox.appendChild(entry);
        logBox.scrollTop = logBox.scrollHeight;
    }

    if (btnClick) {
        let clickN = 0;
        btnClick.addEventListener('click', () => {
            clickN++;
            appendLog(`click event fired! (Total clicks: ${clickN})`, '#38bdf8');
        });
    }

    if (btnHover) {
        btnHover.addEventListener('mouseenter', () => {
            appendLog(`mouseenter event triggered on hover button`, '#facc15');
        });
    }

    if (btnTimer) {
        btnTimer.addEventListener('click', () => {
            appendLog(`setTimeout() registered. Timer running...`, '#c084fc');
            btnTimer.disabled = true;
            setTimeout(() => {
                appendLog(`⏰ setTimeout timer completed after 2000ms!`, '#4ade80');
                btnTimer.disabled = false;
            }, 2000);
        });
    }

    if (inputMirror) {
        inputMirror.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (mirrorOutput) {
                mirrorOutput.textContent = val ? `Hello, ${val}! 👋` : '(Waiting for input...)';
                mirrorOutput.style.color = val ? '#16a34a' : '#2563eb';
            }
            appendLog(`input event: value="${e.target.value}" (Length: ${e.target.value.length} chars)`, '#f472b6');
        });
    }

    // C. Variable Memory Box (const vs let)
    const btnConst = document.getElementById('btnTryBreakConst');
    const btnMem = document.getElementById('btnIncrementMemory');
    const btnToggle = document.getElementById('btnToggleReady');
    const xpVal = document.getElementById('memXpVal');
    const readyVal = document.getElementById('memReadyVal');

    let dynamicXp = 400;
    let dynamicReady = true;

    if (btnConst) {
        btnConst.addEventListener('click', () => {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'TypeError: Assignment to constant variable',
                    html: `
                        <div style="text-align: left; font-family: var(--font-sans, sans-serif);">
                            <p style="color: var(--text-body, #20211F); font-size: 0.90rem; margin-bottom: 12px;">
                                <code>appName</code> was declared with <code>const</code> (immutable reference).
                            </p>
                            <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 12px; font-size: 0.86rem; color: var(--text-body, #20211F); line-height: 1.55;">
                                In JavaScript, once a <code>const</code> identifier is assigned, its reference cannot be re-bound.
                            </div>
                        </div>
                    `,
                    confirmButtonColor: '#A33B24',
                    confirmButtonText: 'Acknowledge'
                });
            } else {
                alert('TypeError: Assignment to constant variable. const bindings cannot be reassigned.');
            }
            appendLog(`[ERROR] Uncaught TypeError: Assignment to constant variable 'appName'`, '#A33B24');
        });
    }

    if (btnMem && xpVal) {
        btnMem.addEventListener('click', () => {
            dynamicXp += 50;
            xpVal.textContent = dynamicXp;
            xpVal.style.color = '#2563eb';
            xpVal.style.transform = 'scale(1.2)';
            setTimeout(() => {
                xpVal.style.color = '#0f172a';
                xpVal.style.transform = 'scale(1)';
            }, 200);
            appendLog(`let learnerXP updated on whiteboard: ${dynamicXp} XP`, '#38bdf8');
        });
    }

    if (btnToggle && readyVal) {
        btnToggle.addEventListener('click', () => {
            dynamicReady = !dynamicReady;
            readyVal.textContent = dynamicReady.toString();
            readyVal.style.color = dynamicReady ? '#16a34a' : '#ea580c';
            readyVal.style.transform = 'scale(1.2)';
            setTimeout(() => {
                readyVal.style.transform = 'scale(1)';
            }, 200);
            appendLog(`let isReady flipped on whiteboard: ${dynamicReady}`, '#4ade80');
        });
    }
}

/**
 * Hydrates 2. Glossary Bank & Search Module
 */
function hydrateGlossaryPanel(glossaryData) {
    const cardsContainer = document.getElementById('glossaryCardsContainer');
    const searchInput = document.getElementById('glossarySearchInput');
    const clearBtn = document.getElementById('clearGlossarySearchBtn');
    const statsLabel = document.getElementById('glossarySearchStats');

    if (!glossaryData || !cardsContainer) return;

    function renderCards(filteredData) {
        if (filteredData.length === 0) {
            cardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">🔍 No matching glossary terms found.</p>`;
            return;
        }

        cardsContainer.innerHTML = filteredData.map(item => `
            <div class="glossary-item-card">
                <span class="glossary-category">${escapeHtml(item.category || 'Core Concept')}</span>
                <h3>${escapeHtml(item.term || '')}</h3>
                <p>${escapeHtml(item.definition || item.desc || '')}</p>
                ${(item.analogy || item.tip) ? `
                <div class="glossary-analogy-box">
                    <strong>💡 Real-World Analogy:</strong> ${escapeHtml(item.analogy || item.tip || '')}
                </div>` : ''}
                ${(item.codeSnippet || item.code) ? `<div class="code-explain-box"><pre><code>${escapeHtml(item.codeSnippet || item.code || '')}</code></pre></div>` : ''}
            </div>
        `).join('');
    }

    renderCards(glossaryData);

    if (searchInput) {
        const handleFilter = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (clearBtn) clearBtn.style.display = query ? 'inline-flex' : 'none';

            if (!query) {
                if (statsLabel) statsLabel.textContent = '';
                renderCards(glossaryData);
                return;
            }

            const filtered = glossaryData.filter(item => 
                (item.term && item.term.toLowerCase().includes(query)) ||
                (item.definition && item.definition.toLowerCase().includes(query)) ||
                (item.desc && item.desc.toLowerCase().includes(query)) ||
                (item.category && item.category.toLowerCase().includes(query)) ||
                (item.analogy && item.analogy.toLowerCase().includes(query))
            );

            if (statsLabel) {
                statsLabel.textContent = `Showing ${filtered.length} of ${glossaryData.length} terms`;
            }

            renderCards(filtered);
        };

        searchInput.addEventListener('input', handleFilter);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                handleFilter();
                searchInput.focus();
            });
        }
    }
}

/**
 * Initializes 3. Code Sandbox Engine with Live IFrame Sync
 */
function initSandboxEngine(sandboxData) {
    const textarea = document.getElementById('sandboxTextarea');
    const iframe = document.getElementById('sandboxPreviewIframe');
    const instructions = document.getElementById('sandboxInstructions');
    const resetBtn = document.getElementById('resetSandboxBtn');

    if (!sandboxData || !textarea || !iframe) return;

    if (instructions) instructions.textContent = sandboxData.instructions;
    textarea.value = sandboxData.initialHTML;

    function updatePreview() {
        iframe.srcdoc = textarea.value;
    }
    updatePreview();

    let debounceTimer;
    textarea.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updatePreview, 250);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const executeReset = () => {
                textarea.value = sandboxData.initialHTML;
                updatePreview();
            };

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Reset Sandbox Code?',
                    text: 'This will reset your sandbox editor back to the default HTML snippet.',
                    showCancelButton: true,
                    confirmButtonColor: '#A33B24',
                    cancelButtonColor: '#BAB4A6',
                    confirmButtonText: 'Reset Sandbox',
                    cancelButtonText: 'Cancel',
                    customClass: { popup: 'responsive-profile-modal' }
                }).then((result) => {
                    if (result.isConfirmed) {
                        executeReset();
                    }
                });
            } else {
                if (confirm('Reset sandbox code to the default template?')) {
                    executeReset();
                }
            }
        });
    }
}

/**
 * Tab 4: Interactive Knowledge Verification Quiz
 */
function initInteractiveQuiz(trackData) {
    const quizContainer = document.getElementById('quizQuestionsContainer');
    const submitBtn = document.getElementById('submitQuizBtn');

    const quizList = (trackData && (trackData.quizzes || trackData.quiz)) || [];
    if (!quizContainer || !quizList.length) return;

    let userAnswers = {};
    const totalQuestions = quizList.length;

    // Render Questions matching Technical Field Journal card styles
    quizContainer.innerHTML = quizList.map((q, qIndex) => `
        <div class="quiz-card" data-qindex="${qIndex}">
            <h3>Q${qIndex + 1}. ${escapeHtml(q.question)}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, optIndex) => `
                    <button type="button" class="quiz-option-btn quiz-opt-btn" data-qindex="${qIndex}" data-optindex="${optIndex}">
                        <span><strong>${String.fromCharCode(65 + optIndex)}.</strong> ${escapeHtml(opt)}</span>
                    </button>
                `).join('')}
            </div>
            <div class="quiz-explanation" id="quiz-exp-${qIndex}">
                <strong>💡 Concept Verification:</strong> ${escapeHtml(q.explanation)}
            </div>
        </div>
    `).join('');

    // Option Click Handlers
    const optButtons = quizContainer.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = parseInt(btn.getAttribute('data-qindex'), 10);
            const optIdx = parseInt(btn.getAttribute('data-optindex'), 10);

            // Deselect other options in this question
            const siblings = quizContainer.querySelectorAll(`.quiz-opt-btn[data-qindex="${qIdx}"]`);
            siblings.forEach(s => s.classList.remove('selected'));

            // Select clicked
            btn.classList.add('selected');
            userAnswers[qIdx] = optIdx;
        });
    });

    // Submit Verification Handler
    if (submitBtn && !submitBtn._hasQuizListener) {
        submitBtn._hasQuizListener = true;
        submitBtn.addEventListener('click', () => {
            let correctCount = 0;

            quizList.forEach((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                const questionEl = quizContainer.querySelector(`.quiz-card[data-qindex="${qIdx}"]`);
                if (!questionEl) return;
                const optionsBtns = questionEl.querySelectorAll('.quiz-opt-btn');
                const expBox = document.getElementById(`quiz-exp-${qIdx}`);

                optionsBtns.forEach(b => b.classList.remove('selected-correct', 'selected-wrong'));

                if (selectedOpt === q.correctIndex) {
                    correctCount++;
                    if (optionsBtns[selectedOpt]) {
                        optionsBtns[selectedOpt].classList.add('selected-correct');
                    }
                } else {
                    if (selectedOpt !== undefined && optionsBtns[selectedOpt]) {
                        optionsBtns[selectedOpt].classList.add('selected-wrong');
                    }
                    if (optionsBtns[q.correctIndex]) {
                        optionsBtns[q.correctIndex].classList.add('selected-correct');
                    }
                }

                if (expBox) expBox.classList.add('visible');
            });

            if (Object.keys(userAnswers).length < totalQuestions) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Incomplete Verification',
                        text: 'Please answer all 3 questions before submitting your verification.',
                        confirmButtonColor: '#A33B24',
                        confirmButtonText: 'Acknowledge'
                    });
                } else {
                    alert('Please answer all 3 questions before submitting!');
                }
                return;
            }

            if (correctCount === totalQuestions) {
                const xpAmount = trackData.xpReward || 300;

                // Save Track Completion State to LocalStorage
                if (trackData.trackKey === 'html') {
                    localStorage.setItem('level1_completed', 'true');
                } else if (trackData.trackKey === 'css') {
                    localStorage.setItem('level2_completed', 'true');
                } else if (trackData.trackKey === 'js') {
                    localStorage.setItem('level3_completed', 'true');
                } else if (trackData.trackKey === 'react') {
                    localStorage.setItem('foundations_react_completed', 'true');
                } else if (trackData.trackKey === 'python') {
                    localStorage.setItem('foundations_python_completed', 'true');
                } else if (trackData.trackKey === 'cloud') {
                    localStorage.setItem('foundations_cloud_completed', 'true');
                } else if (trackData.trackKey === 'sql') {
                    localStorage.setItem('foundations_sql_completed', 'true');
                } else if (trackData.trackKey === 'nextjs') {
                    localStorage.setItem('foundations_nextjs_completed', 'true');
                } else if (trackData.trackKey === 'typescript') {
                    localStorage.setItem('foundations_typescript_completed', 'true');
                } else if (trackData.trackKey === 'cssmotion') {
                    localStorage.setItem('foundations_cssmotion_completed', 'true');
                } else if (trackData.trackKey === 'async') {
                    localStorage.setItem('foundations_async_completed', 'true');
                } else if (trackData.trackKey === 'auth') {
                    localStorage.setItem('foundations_auth_completed', 'true');
                } else if (trackData.trackKey === 'saas') {
                    localStorage.setItem('foundations_saas_completed', 'true');
                }

                let nextUrl = trackData.nextTrackUrl || '/1. partA/hub.html';
                let nextLabel = trackData.nextTrackName ? `${trackData.nextTrackName} →` : 'Return to Foundations Hub →';

                window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));

                if (typeof updateHeaderStats === 'function') {
                    updateHeaderStats();
                }

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Foundations Track Verified',
                        html: `
                            <div style="font-family: var(--font-sans, sans-serif); text-align: center; padding: 4px 0;">
                                <p style="color: var(--text-body, #20211F); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
                                    All <strong>${totalQuestions}/${totalQuestions}</strong> knowledge check criteria satisfied for <strong>${escapeHtml(trackData.title)}</strong>.
                                </p>
                                <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 8px 16px; border-radius: 2px; font-family: var(--font-mono, monospace); font-weight: 600; color: #2F5233; font-size: 0.85rem; display: inline-block; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em;">
                                    BOUNTY // +${xpAmount} XP EARNED
                                </div>
                            </div>
                        `,
                        showCancelButton: true,
                        cancelButtonText: 'Dashboard Skill Tree',
                        cancelButtonColor: '#BAB4A6',
                        confirmButtonColor: '#A33B24',
                        confirmButtonText: nextLabel,
                        allowOutsideClick: false
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.href = nextUrl;
                        } else {
                            window.location.href = '/';
                        }
                    });
                } else {
                    alert(`Track Completed! You earned +${xpAmount} XP!`);
                    window.location.href = nextUrl;
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Verification Incomplete',
                        text: `You scored ${correctCount}/${totalQuestions}. Review the explanations and update your answers to continue.`,
                        confirmButtonColor: '#A33B24',
                        confirmButtonText: 'Review Answers'
                    });
                } else {
                    alert(`You scored ${correctCount}/${totalQuestions}. Review the explanations and try again.`);
                }
            }
        });
    }
}

// Global alias for compatibility
window.initQuizEngine = initInteractiveQuiz;

/**
 * Utility: HTML Escaper for Code Snippets (Null-Safe)
 */
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
 * Renders interactive smart 404 recovery page for invalid track parameters
 */
function render404TrackPage(invalidKey) {
    document.title = "NoviCodes - Foundation Track Not Found";
    updateHeaderStats();

    const mainContainer = document.querySelector('.foundations-main');
    if (!mainContainer) return;

    const safeKey = String(invalidKey || '').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const rawLower = String(invalidKey || '').toLowerCase().trim();

    // 11 Foundations Track Definitions with Aliases
    const allTracks = [
        { key: 'html', title: 'Level 1: HTML5 Structural Foundations', icon: '🧱', aliases: ['html5', 'htm', 'tags', 'dom', 'markup'] },
        { key: 'css', title: 'Level 2: Modern CSS3 Styling & Layouts', icon: '🎨', aliases: ['css3', 'style', 'styles', 'flexbox', 'grid', 'styling'] },
        { key: 'js', title: 'Level 3: Modern JavaScript (ES6+) Foundations', icon: '⚡', aliases: ['javascript', 'es6', 'script', 'ecmascript'] },
        { key: 'react', title: 'Level 5: React & Modern UI Foundations', icon: '⚛️', aliases: ['reactjs', 'jsx', 'components', 'props', 'state', 'hooks'] },
        { key: 'python', title: 'Level 6: Python & Server Logic Foundations', icon: '🐍', aliases: ['py', 'python3', 'backend', 'django', 'fastapi'] },
        { key: 'cloud', title: 'Level 7A: Cloud & Deployment Foundations', icon: '☁️', aliases: ['docker', 'devops', 'cicd', 'ci-cd', 'hosting', 'nginx', 'deploy'] },
        { key: 'sql', title: 'Level 7B: SQL & Database Foundations', icon: '🛢️', aliases: ['postgres', 'postgresql', 'database', 'db', 'sqlite', 'mysql'] },
        { key: 'nextjs', title: 'Level 7C: Next.js & UI Architecture Foundations', icon: '⚡', aliases: ['next', 'next.js', 'nextjss', 'ssr', 'rsc', 'server-components'] },
        { key: 'typescript', title: 'Level 7D: TypeScript & Type Safety Foundations', icon: '🔷', aliases: ['ts', 'typescript', 'types', 'typing', 'interfaces'] },
        { key: 'cssmotion', title: 'Level 7E: CSS Motion & Micro-Interactions Foundations', icon: '🎨', aliases: ['cssmotion', 'motion', 'animation', 'animations', 'keyframes', 'transitions', 'microinteractions', 'svgmotion'] },
        { key: 'async', title: 'Level 8: Async UI & Live Data Foundations', icon: '🌉', aliases: ['asyncui', 'skeleton', 'optimistic', 'loading', 'fetching'] },
        { key: 'auth', title: 'Level 9: User Logins & Security UI Foundations', icon: '🛡️', aliases: ['jwt', 'login', 'authentication', 'rbac', 'security'] },
        { key: 'saas', title: 'Level 10: SaaS Dashboard UI Foundations', icon: '🏆', aliases: ['capstone', 'saasui', 'skyscraper', 'dashboard', 'enterprise'] }
    ];

    // Smart Matcher: Exact Alias or Substring Match
    let bestMatch = null;
    for (const t of allTracks) {
        if (t.key.includes(rawLower) || rawLower.includes(t.key)) {
            bestMatch = t;
            break;
        }
        if (t.aliases.some(a => a.includes(rawLower) || rawLower.includes(a))) {
            bestMatch = t;
            break;
        }
    }

    // Generate Smart Match Recommendation Card
    const suggestionHtml = bestMatch ? `
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1.5px solid #93c5fd; border-radius: 14px; padding: 18px 20px; margin: 0 auto 24px auto; text-align: left; max-width: 520px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);">
            <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #1d4ed8; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                <span>✨</span> Auto-Detected Match
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                <div>
                    <div style="font-size: 1rem; font-weight: 800; color: #0f172a;">${bestMatch.icon} ${bestMatch.title}</div>
                    <div style="font-size: 0.82rem; color: #475569; margin-top: 2px;">Did you mean to open the <code>?track=${bestMatch.key}</code> foundation guide?</div>
                </div>
                <a href="./foundations.html?track=${bestMatch.key}" style="background: #2563eb; color: white; padding: 9px 18px; border-radius: 10px; font-weight: 700; font-size: 0.86rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25); transition: all 0.2s ease;">
                    <span>Open Track ➔</span>
                </a>
            </div>
        </div>
    ` : '';

    // Generate Clean Dropdown Options
    const selectOptionsHtml = allTracks.map(t => `<option value="./foundations.html?track=${t.key}">${t.icon} ${t.title}</option>`).join('');

    mainContainer.innerHTML = `
        <div style="text-align: center; padding: 50px 24px; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.04); max-width: 620px; margin: 40px auto 60px auto;">
            <div style="font-size: 3.2rem; margin-bottom: 12px;">🔍</div>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0 0 10px 0;">Foundation Track Not Found</h2>
            <p style="color: #64748b; font-size: 0.94rem; line-height: 1.6; margin: 0 auto 24px auto; max-width: 480px;">
                The track <code style="background:#fff1f2; border: 1px solid #fecdd3; padding:3px 8px; border-radius:6px; color:#be123c; font-weight:700;">"?track=${safeKey}"</code> does not match any current syllabus.
            </p>

            ${suggestionHtml}

            <!-- 2 Primary Escape Actions -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
                <a href="./1. partA/hub.html" style="background: #2563eb; color: white; padding: 11px 22px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
                    <span>🗺️ Browse All Foundations Hub</span>
                </a>
                <a href="./index.html#roadmap" style="background: #f8fafc; color: #0f172a; padding: 11px 20px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.9rem; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; gap: 6px;">
                    <span>🏠 Skill Tree Dashboard</span>
                </a>
            </div>

            <!-- Quick Track Dropdown Selector -->
            <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; max-width: 440px; margin: 0 auto;">
                <label for="trackQuickJumpSelect" style="display: block; font-size: 0.78rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                    ⚡ Jump Directly to Any Foundation Track
                </label>
                <select id="trackQuickJumpSelect" onchange="if(this.value) window.location.href=this.value;" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.88rem; font-weight: 600; color: #1e293b; background: #ffffff; cursor: pointer; outline: none;">
                    <option value="">-- Choose a Foundation Track --</option>
                    ${selectOptionsHtml}
                </select>
            </div>
        </div>
    `;
}

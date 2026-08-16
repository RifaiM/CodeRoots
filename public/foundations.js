/**
 * NoviCodes - Master Foundations Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalBackToTop();

    // 1. Determine Active Track from Query Parameter (?track=html | css | js | react | python | cloud | sql | nextjs | async | auth | saas)
    const urlParams = new URLSearchParams(window.location.search);
    const rawTrackParam = urlParams.get('track');
    const validTracks = ['html', 'css', 'js', 'react', 'python', 'cloud', 'sql', 'nextjs', 'async', 'auth', 'saas'];

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

    if (trackBadgePill) trackBadgePill.textContent = `${trackData.badgeIcon} ${trackData.title}`;
    if (trackTitle) trackTitle.textContent = trackData.title;
    if (trackSubtitle) trackSubtitle.textContent = trackData.subtitle;
    if (headerLogoTag && trackData) {
        headerLogoTag.textContent = trackData.title;
    }

    // Calculate User Stats from LocalStorage
    updateHeaderStats();

    // 3. Initialize Tab Navigation Engine
    initTabNavigation();

    // 4. Hydrate 1. Concepts Panel
    hydrateConceptsPanel(trackData.concepts, trackKey);

    // 5. Hydrate 2. Glossary Panel
    hydrateGlossaryPanel(trackData.glossary);

    // 6. Hydrate 3. Code Sandbox Engine
    initSandboxEngine(trackData.sandbox);

    // 7. Hydrate 4. Quiz & Verification Engine
    initQuizEngine(trackData);
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

/**
 * Initializes 4-Tab Segmented Switcher
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.foundations-tab-bar .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

/**
 * Hydrates 1. Concepts Panel with Interactive Analogies & Live Simulators
 */
function hydrateConceptsPanel(conceptsData, trackKey) {
    const heroBox = document.getElementById('heroAnalogyBox');
    const listContainer = document.getElementById('conceptSectionsList');

    if (!conceptsData || !heroBox || !listContainer) return;

    // Hero Analogy Box
    heroBox.innerHTML = `
        <h2><span>${conceptsData.heroAnalogy.icon}</span> ${conceptsData.heroAnalogy.title}</h2>
        <p>${conceptsData.heroAnalogy.description}</p>
    `;

    // Concept Sections List
    listContainer.innerHTML = conceptsData.sections.map(section => `
        <div class="concept-card">
            <h3>${section.title}</h3>
            <div>${section.content}</div>
        </div>
    `).join('');

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
            title: '🏷️ Opening Tag (<a>)',
            desc: 'Tells the browser: "Hey, open a new link box!" The angle brackets (<...>) act as container boundaries.'
        },
        attr: {
            title: '⚡ Attributes (href="https://novicodes.dev")',
            desc: 'Like a luggage tag attached to a suitcase! href tells the link where to fly when clicked.'
        },
        content: {
            title: '📝 Element Content ("Explore Code Dojo")',
            desc: 'The actual visible item packed inside the box that visitors read and click on.'
        },
        close: {
            title: '🛑 Closing Tag (</a>)',
            desc: 'Tells the browser: "The link box ends here! Tape it shut with a forward slash (/)." Everything after this is outside the link.'
        }
    };

    chunks.forEach(chunk => {
        chunk.addEventListener('click', () => {
            chunks.forEach(c => c.classList.remove('active'));
            chunk.classList.add('active');
            const part = chunk.dataset.part;
            const info = explanations[part];
            if (info && detailBox) {
                detailBox.innerHTML = `<strong>${info.title}</strong><p style="margin: 6px 0 0 0;">${info.desc}</p>`;
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
    // A. Box Model Explorer
    const layers = [
        { id: 'bmMarginLayer', name: 'Margin 🚚', desc: 'Outer space in the delivery truck separating this box from neighbor elements so they don\'t smash together.' },
        { id: 'bmBorderLayer', name: 'Border 📦', desc: 'The visible cardboard box outline surrounding the inner cushion (e.g. 2px solid #f59e0b).' },
        { id: 'bmPaddingLayer', name: 'Padding 🛡️', desc: 'The protective inner cushion inside the box giving your text/image breathing room from the cardboard walls.' },
        { id: 'bmContentLayer', name: 'Content ☕', desc: 'The actual valuable item inside the box (your text headline, paragraph, photo, or button).' }
    ];

    const readout = document.getElementById('boxModelReadout');
    if (readout) {
        readout.innerHTML = `<strong>💡 Hover over any Box Model layer above</strong> to see its purpose and real-world shipping box analogy!`;
    }

    layers.forEach(l => {
        const el = document.getElementById(l.id);
        if (el) {
            el.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                if (readout) {
                    readout.innerHTML = `<span style="color: #2563eb; font-weight: 800;">${l.name} Layer:</span> ${l.desc}`;
                }
            });
        }
    });

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
    const checkHtml = document.getElementById('checkHtml');
    const checkCss = document.getElementById('checkCss');
    const checkJs = document.getElementById('checkJs');
    const screen = document.getElementById('triadPreviewScreen');

    let triadCount = 0;
    let hasHtml = true;
    let hasCss = true;
    let hasJs = true;

    function updateTriad() {
        if (!screen) return;
        if (!hasHtml) {
            screen.innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 30px 0; font-style: italic;">(HTML is unchecked — No structural content exists!)</div>';
            return;
        }

        screen.innerHTML = `
            <div id="triadContentBox" style="text-align: center;">
                <h3 id="triadTitle" style="margin: 0 0 8px 0; color: ${hasCss ? '#0f172a' : '#000000'}; font-family: ${hasCss ? 'inherit' : 'monospace'}; font-size: ${hasCss ? '1.2rem' : '1rem'};">Live Interactive App</h3>
                <p id="triadText" style="color: ${hasCss ? '#64748b' : '#333333'}; font-size: ${hasCss ? '0.9rem' : '0.85rem'}; margin-bottom: 14px;">Click the button below to test interactivity:</p>
                <button id="triadActionBtn" style="${hasCss ? 'background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: transform 0.15s ease;' : 'background: #e0e0e0; color: black; border: 1px solid black; padding: 4px 8px; cursor: pointer;'}">⚡ Click Me (Count: <span id="triadCountDisplay">${triadCount}</span>)</button>
            </div>
        `;

        const newBtn = document.getElementById('triadActionBtn');
        const newCount = document.getElementById('triadCountDisplay');
        if (newBtn) {
            newBtn.addEventListener('click', () => {
                if (hasJs) {
                    triadCount++;
                    if (newCount) newCount.textContent = triadCount;
                    newBtn.style.transform = 'scale(1.1)';
                    setTimeout(() => newBtn.style.transform = 'scale(1)', 120);
                } else {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: '⚡ JavaScript is Disabled!',
                            text: 'Without JavaScript, buttons are completely static and cannot calculate math or react to user clicks.',
                            confirmButtonColor: '#2563eb'
                        });
                    } else {
                        alert('JavaScript is disabled! Without JS, buttons cannot react to clicks.');
                    }
                }
            });
        }
    }

    if (checkHtml) {
        checkHtml.addEventListener('click', () => {
            hasHtml = !hasHtml;
            checkHtml.classList.toggle('checked', hasHtml);
            updateTriad();
        });
    }
    if (checkCss) {
        checkCss.addEventListener('click', () => {
            hasCss = !hasCss;
            checkCss.classList.toggle('checked', hasCss);
            updateTriad();
        });
    }
    if (checkJs) {
        checkJs.addEventListener('click', () => {
            hasJs = !hasJs;
            checkJs.classList.toggle('checked', hasJs);
            updateTriad();
        });
    }

    // Initial invocation so button click handler is active on page load!
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
                    title: '🛑 TypeError: Assignment to constant variable!',
                    html: '<strong>appName</strong> was declared using <code>const</code> (Permanent Sharpie 🔒).<br><br>In JavaScript, once a <code>const</code> variable is assigned, its value is locked forever and cannot be overwritten!',
                    confirmButtonColor: '#ef4444'
                });
            } else {
                alert('🛑 TypeError: Assignment to constant variable!\nconst appName is locked with permanent sharpie and cannot be changed.');
            }
            appendLog(`[ERROR] Uncaught TypeError: Assignment to constant variable 'appName'`, '#f87171');
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

    if (!glossaryData || !cardsContainer) return;

    function renderCards(filteredData) {
        if (filteredData.length === 0) {
            cardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No matching glossary terms found.</p>`;
            return;
        }

        cardsContainer.innerHTML = filteredData.map(item => `
            <div class="glossary-item-card">
                <span class="glossary-category">${escapeHtml(item.category)}</span>
                <h3>${escapeHtml(item.term)}</h3>
                <p>${escapeHtml(item.definition)}</p>
                <div class="glossary-analogy-box">
                    <strong>💡 Real-World Analogy:</strong> ${escapeHtml(item.analogy)}
                </div>
                ${item.codeSnippet ? `<div class="code-explain-box"><pre><code>${escapeHtml(item.codeSnippet)}</code></pre></div>` : ''}
            </div>
        `).join('');
    }

    renderCards(glossaryData);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = glossaryData.filter(item => 
                item.term.toLowerCase().includes(query) ||
                item.definition.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            renderCards(filtered);
        });
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
            textarea.value = sandboxData.initialHTML;
            updatePreview();
        });
    }
}

/**
 * Initializes 4. Quiz & Knowledge Verification Engine
 */
function initQuizEngine(trackData) {
    const container = document.getElementById('quizQuestionsContainer');
    const submitBtn = document.getElementById('submitQuizBtn');

    if (!trackData || !trackData.quizzes || !container) return;

    const userAnswers = {}; // QuestionID -> selectedOptionIndex

    container.innerHTML = trackData.quizzes.map((q, qIdx) => `
        <div class="quiz-card" id="quiz-card-${q.id}">
            <h3>${qIdx + 1}. ${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, optIdx) => `
                    <button class="quiz-option-btn" data-qid="${q.id}" data-optidx="${optIdx}">
                        <span class="opt-radio">⚪</span>
                        <span>${escapeHtml(opt)}</span>
                    </button>
                `).join('')}
            </div>
            <div class="quiz-explanation" id="explanation-${q.id}">
                <strong>💡 Explanation:</strong> ${q.explanation}
            </div>
        </div>
    `).join('');

    // Bind Option Click Handlers
    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const qid = btn.getAttribute('data-qid');
            const optIdx = parseInt(btn.getAttribute('data-optidx'), 10);

            userAnswers[qid] = optIdx;

            // Highlight selected button
            const parentCard = document.getElementById(`quiz-card-${qid}`);
            parentCard.querySelectorAll('.quiz-option-btn').forEach(b => {
                b.classList.remove('selected', 'selected-correct', 'selected-wrong');
                b.querySelector('.opt-radio').textContent = '⚪';
            });

            btn.classList.add('selected');
            btn.querySelector('.opt-radio').textContent = '🔘';
        });
    });

    // Submit Quiz Handler
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            let correctCount = 0;
            const totalQuestions = trackData.quizzes.length;

            trackData.quizzes.forEach(q => {
                const selectedOpt = userAnswers[q.id];
                const card = document.getElementById(`quiz-card-${q.id}`);
                const expBox = document.getElementById(`explanation-${q.id}`);

                if (selectedOpt === undefined) return;

                const optionsBtns = card.querySelectorAll('.quiz-option-btn');

                if (selectedOpt === q.correctIndex) {
                    correctCount++;
                    optionsBtns[selectedOpt].classList.add('selected-correct');
                    optionsBtns[selectedOpt].querySelector('.opt-radio').textContent = '✅';
                } else {
                    optionsBtns[selectedOpt].classList.add('selected-wrong');
                    optionsBtns[selectedOpt].querySelector('.opt-radio').textContent = '❌';
                    optionsBtns[q.correctIndex].classList.add('selected-correct');
                }

                if (expBox) expBox.classList.add('visible');
            });

            if (Object.keys(userAnswers).length < totalQuestions) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Incomplete Quiz',
                        text: 'Please answer all 3 questions before submitting your verification!',
                        confirmButtonColor: '#2563eb'
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
                } else if (trackData.trackKey === 'async') {
                    localStorage.setItem('foundations_async_completed', 'true');
                } else if (trackData.trackKey === 'auth') {
                    localStorage.setItem('foundations_auth_completed', 'true');
                } else if (trackData.trackKey === 'saas') {
                    localStorage.setItem('foundations_saas_completed', 'true');
                }

                let nextUrl = trackData.nextTrackUrl || '/1. partA/hub.html';
                let nextLabel = trackData.nextTrackName ? `⚡ ${trackData.nextTrackName} ➔` : '📚 Return to Foundations Hub ➔';

                window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));

                if (typeof updateHeaderStats === 'function') {
                    updateHeaderStats();
                }

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: '🎉 Foundations Track Completed!',
                        html: `
                            <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 4px 0;">
                                <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
                                    Awesome job! You answered <strong>${totalQuestions}/${totalQuestions}</strong> Knowledge Check questions correctly for <strong>${escapeHtml(trackData.title)}</strong>!
                                </p>
                                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px 18px; border-radius: 12px; font-weight: 800; color: #166534; font-size: 0.95rem; display: inline-block; margin-bottom: 10px;">
                                    ⚡ +${xpAmount} XP Earned!
                                </div>
                            </div>
                        `,
                        showCancelButton: true,
                        cancelButtonText: '🏠 Dashboard',
                        cancelButtonColor: '#64748b',
                        confirmButtonColor: '#2563eb',
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
                    alert(`🎉 Track Completed! You earned +${xpAmount} XP!`);
                    window.location.href = nextUrl;
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Keep Going!',
                        text: `You scored ${correctCount}/${totalQuestions}. Review the explanations above and select the correct answers!`,
                        confirmButtonColor: '#2563eb'
                    });
                }
            }
        });
    }
}

/**
 * Utility: HTML Escaper for Code Snippets
 */
function escapeHtml(str) {
    return str
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

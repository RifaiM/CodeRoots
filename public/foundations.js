/**
 * NoviCodes - Master Foundations Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalBackToTop();

    // 1. Determine Active Track from Query Parameter (?track=html | css | js)
    const urlParams = new URLSearchParams(window.location.search);
    const rawTrackParam = urlParams.get('track');
    const validTracks = ['html', 'css', 'js'];

    if (rawTrackParam && !validTracks.includes(rawTrackParam.toLowerCase())) {
        render404TrackPage(rawTrackParam);
        return;
    }

    const trackKey = (rawTrackParam || 'html').toLowerCase();

    let trackData = window.LEVEL1_HTML_DATA;
    if (trackKey === 'css') {
        trackData = window.LEVEL2_CSS_DATA;
    } else if (trackKey === 'js') {
        trackData = window.LEVEL3_JS_DATA;
    }

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

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === '1';
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

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);
    totalXP += (l6Completed * 200);
    totalXP += (l7Completed * 250);

    const dailyQuestXP = parseInt(localStorage.getItem('novicodes_daily_quest_xp') || '0', 10);
    const streakBonusXP = parseInt(localStorage.getItem('novicodes_streak_bonus_xp') || '0', 10);
    totalXP += (dailyQuestXP + streakBonusXP);

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

function updateHeaderStats() {
    const stats = window.getUserXPAndRank();
    const xpLabel = document.getElementById('userXpLabel');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');

    if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (rankLabel) rankLabel.textContent = stats.rankTitle;
    if (rankIcon) rankIcon.textContent = stats.rankIcon;
}

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

        return `
            <div style="${bg} padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px; text-align: left;">
                    <span style="font-size: 1.1rem; flex-shrink: 0;">${r.icon}</span>
                    <div>
                        <div style="font-size: 0.84rem; font-weight: 800; color: ${isCurrent ? '#1e40af' : '#1e293b'};">${r.title}</div>
                        <div style="font-size: 0.72rem; color: #64748b;">${r.level}</div>
                    </div>
                </div>
                <span style="${badgeBg} font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">${badgeText}</span>
            </div>
        `;
    }).join('');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '👤 Learner Profile & Rank Roadmap',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; max-width: 100%; box-sizing: border-box;">
                    
                    <!-- Rank Banner (Single Icon on Top) -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 16px 14px; border-radius: 14px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
                        <div style="font-size: 2.4rem; margin-bottom: 4px;">${stats.rankIcon}</div>
                        <div style="font-size: 1.15rem; font-weight: 800;">${stats.rankTitle}</div>
                        <div style="font-size: 0.85rem; color: #93c5fd; margin-top: 2px;">${stats.totalXP.toLocaleString()} / ${stats.maxXP.toLocaleString()} Total XP</div>
                        
                        <!-- Progress Bar -->
                        <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 99px; margin-top: 12px; overflow: hidden;">
                            <div style="background: #38bdf8; height: 100%; width: ${progressPct}%; border-radius: 99px; transition: width 0.4s ease;"></div>
                        </div>
                    </div>

                    <!-- XP Breakdown Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web History</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: ${stats.isL0 ? '#10b981' : '#64748b'};">${stats.isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${((stats.isL1?300:0)+(stats.isL2?300:0)+(stats.isL3?400:0))} / 1,000 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: DOM Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">${stats.l4Completed * 100} / 1,500 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${stats.l5Completed * 150} / 2,250 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">${stats.l6Completed * 200} / 3,000 XP</div>
                        </div>
                        <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Mastery Hub</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">${stats.l7Completed * 250} / 4,500 XP</div>
                        </div>
                        <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #0369a1; font-weight: 700;">Level 8: API Bridge</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${(stats.l8Completed || 0) * 250} / 1,500 XP</div>
                        </div>
                        <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #4338ca; font-weight: 700;">Level 9: Auth &amp; DB</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #4f46e5;">${(stats.l9Completed || 0) * 250} / 1,500 XP</div>
                        </div>
                        <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #b45309; font-weight: 700;">Level 10: Apex SaaS</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #d97706;">${(stats.l10Completed || 0) * 500} / 3,000 XP</div>
                        </div>
                        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 8px 10px; border-radius: 10px; grid-column: 1 / -1;">
                            <div style="font-size: 0.70rem; color: #854d0e; font-weight: 700;">🔥 Daily Quests &amp; Streaks XP</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #ca8a04;">+${(stats.dailyQuestXP + stats.streakBonusXP).toLocaleString()} XP (${stats.streakCount}-Day Streak)</div>
                        </div>
                    </div>

                    <!-- Developer Rank Progression Roadmap -->
                    <div style="text-align: left; margin-bottom: 14px;">
                        <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                            🗺️ Developer Rank Progression Roadmap
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 6px; touch-action: pan-y; -webkit-overflow-scrolling: touch; padding-right: 2px;">
                            ${rankLadderHTML}
                        </div>
                    </div>

                    <!-- Reset Danger Action -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center;">
                        <button onclick="window.confirmResetProgress()" style="background: #fee2e2; border: 1px solid #fca5a5; color: #dc2626; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: all 0.2s ease;">
                            🔄 Reset Course Progress
                        </button>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        });
    }
};

window.confirmResetProgress = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Reset All Progress?',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <p style="color: #475569; font-size: 0.93rem; line-height: 1.6; margin-bottom: 12px;">
                        This will reset your <strong>XP back to 0</strong>, reset <strong>Daily Quest XP & Streaks</strong>, clear your <strong>Developer Rank</strong>, and reset all completed lesson checkmarks across <strong>Level 0 through Level 10</strong>.
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
                // Exhaustive Full Platform Wipe
                localStorage.clear();
                sessionStorage.clear();

                if (typeof updateAllHeaderStats === 'function') {
                    updateAllHeaderStats();
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Progress Reset Complete',
                    text: 'All XP, ranks, and lesson progress across Levels 0 through 10 have been reset to zero.',
                    confirmButtonColor: '#2563eb'
                }).then(() => {
                    location.reload();
                });
            }
        });
    }
};

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
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (doc) {
                doc.open();
                doc.write(textarea.value);
                doc.close();
            } else {
                iframe.srcdoc = textarea.value;
            }
        } catch (e) {
            iframe.srcdoc = textarea.value;
        }
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
                // Save Track Completion State to LocalStorage
                if (trackData.trackKey === 'html') {
                    localStorage.setItem('level1_completed', 'true');
                } else if (trackData.trackKey === 'css') {
                    localStorage.setItem('level2_completed', 'true');
                } else if (trackData.trackKey === 'js') {
                    localStorage.setItem('level3_completed', 'true');
                }

                let nextUrl = '/';
                let nextLabel = '🏠 Return to Dashboard';
                if (trackData.trackKey === 'html') {
                    nextUrl = '/foundations.html?track=css';
                    nextLabel = '🎨 Level 2: CSS Foundations ➔';
                } else if (trackData.trackKey === 'css') {
                    nextUrl = '/foundations.html?track=js';
                    nextLabel = '⚡ Level 3: JS Foundations ➔';
                } else if (trackData.trackKey === 'js') {
                    nextUrl = '/2. partB/hub.html';
                    nextLabel = '⚔️ Enter Level 4 (DOM Dojo) ➔';
                }

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
 * Renders interactive 404 error page for invalid track parameters
 */
function render404TrackPage(invalidKey) {
    document.title = "NoviCodes - 404 Track Not Found";
    updateHeaderStats();

    const mainContainer = document.querySelector('.foundations-main');
    if (!mainContainer) return;

    const safeKey = String(invalidKey || '').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    mainContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); max-width: 650px; margin: 40px auto 60px auto;">
            <div style="font-size: 3.8rem; margin-bottom: 12px;">🔍 404</div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Foundation Track Not Found</h2>
            <p style="color: #64748b; font-size: 0.96rem; line-height: 1.6; margin-bottom: 24px;">
                The foundation track <code style="background:#fff1f2; border: 1px solid #fecdd3; padding:4px 8px; border-radius:6px; color:#be123c; font-weight:700;">"?track=${safeKey}"</code> does not exist on NoviCodes.
            </p>
            <div style="font-size: 0.84rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px;">
                Explore Available Foundation Tracks:
            </div>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; max-width: 600px; margin: 0 auto;">
                <a href="./foundations.html?track=html" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🧱 HTML</a>
                <a href="./foundations.html?track=css" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🎨 CSS</a>
                <a href="./foundations.html?track=js" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">⚡ JS</a>
                <a href="./foundations.html?track=react" style="background: #0284c7; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">⚛️ React</a>
                <a href="./foundations.html?track=python" style="background: #059669; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🐍 Python</a>
                <a href="./foundations.html?track=cloud" style="background: #7c3aed; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">☁️ Cloud</a>
                <a href="./foundations.html?track=sql" style="background: #4f46e5; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🛢️ SQL</a>
                <a href="./foundations.html?track=nextjs" style="background: #09090b; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem; border: 1px solid #3f3f46;">⚡ Next.js</a>
                <a href="./foundations.html?track=async" style="background: #0284c7; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🌉 Async UI</a>
                <a href="./foundations.html?track=auth" style="background: #4338ca; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🛡️ Auth</a>
                <a href="./foundations.html?track=saas" style="background: #d97706; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🏆 SaaS</a>
                <a href="./index.html#roadmap" style="background: #f1f5f9; color: #0f172a; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem; border: 1px solid #cbd5e1;">🗺️ Skill Tree</a>
            </div>
        </div>
    `;
}

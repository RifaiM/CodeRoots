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

    if (trackBadgePill) trackBadgePill.textContent = `${trackData.badgeIcon} ${trackData.title}`;
    if (trackTitle) trackTitle.textContent = trackData.title;
    if (trackSubtitle) trackSubtitle.textContent = trackData.subtitle;

    // Calculate User Stats from LocalStorage
    updateHeaderStats();

    // 3. Initialize Tab Navigation Engine
    initTabNavigation();

    // 4. Hydrate 1. Concepts Panel
    hydrateConceptsPanel(trackData.concepts);

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
                    <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px;">
                        This will reset your <strong>XP back to 0</strong>, clear your <strong>Developer Rank</strong>, and reset all completed lesson checkmarks across Level 0 through Level 7.
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
                // Clear all progress keys
                localStorage.removeItem('level0_completed');
                localStorage.removeItem('level1_completed');
                localStorage.removeItem('level2_completed');
                localStorage.removeItem('level3_completed');

                for (let i = 1; i <= 15; i++) {
                    localStorage.removeItem(`partB_lesson${i}_remake_complete`);
                    localStorage.removeItem(`lesson_${i}_completed`);
                    localStorage.removeItem(`partC_lesson${i}_remake_complete`);
                    localStorage.removeItem(`partE_lesson${i}_remake_complete`);
                }

                for (let i = 1; i <= 6; i++) {
                    localStorage.removeItem(`partF_branchA_lesson${i}_complete`);
                    localStorage.removeItem(`partF_branchB_lesson${i}_complete`);
                    localStorage.removeItem(`partF_branchC_lesson${i}_complete`);
                }

                localStorage.removeItem('practice_mode_unlocked');

                Swal.fire({
                    icon: 'success',
                    title: 'Progress Reset Complete',
                    text: 'All XP, ranks, and lesson progress have been reset to zero.',
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
 * Hydrates 1. Concepts Panel
 */
function hydrateConceptsPanel(conceptsData) {
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

                const xpAmount = trackData.trackKey === 'js' ? 400 : 300;

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: '🎉 Foundations Track Completed!',
                        html: `
                            <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 4px 0;">
                                <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
                                    Awesome job! You answered <strong>${totalQuestions}/${totalQuestions}</strong> Knowledge Check questions correctly for <strong>${escapeHtml(trackData.title)}</strong>!
                                </p>
                                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px 18px; border-radius: 12px; font-weight: 800; color: #166534; font-size: 0.95rem; display: inline-block;">
                                    ⚡ +${xpAmount} XP Earned!
                                </div>
                            </div>
                        `,
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Return to Dashboard',
                        allowOutsideClick: false
                    }).then(() => {
                        window.location.href = './index.html';
                    });
                } else {
                    alert(`🎉 Track Completed! You earned +${xpAmount} XP!`);
                    window.location.href = './index.html';
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
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="./foundations.html?track=html" style="background: #2563eb; color: white; padding: 10px 18px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.88rem;">🏗️ HTML Track</a>
                <a href="./foundations.html?track=css" style="background: #2563eb; color: white; padding: 10px 18px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.88rem;">🎨 CSS Track</a>
                <a href="./foundations.html?track=js" style="background: #2563eb; color: white; padding: 10px 18px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.88rem;">⚡ JS Track</a>
                <a href="./index.html" style="background: #f1f5f9; color: #0f172a; padding: 10px 18px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.88rem; border: 1px solid #cbd5e1;">🏠 Skill Tree</a>
            </div>
        </div>
    `;
}

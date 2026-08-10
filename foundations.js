/**
 * NoviCodes - Master Foundations Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalBackToTop();

    // 1. Determine Active Track from Query Parameter (?track=html | css | js)
    const urlParams = new URLSearchParams(window.location.search);
    const trackKey = (urlParams.get('track') || 'html').toLowerCase();

    let trackData = window.LEVEL1_HTML_DATA;
    if (trackKey === 'css') {
        trackData = window.LEVEL2_CSS_DATA;
    } else if (trackKey === 'js') {
        trackData = window.LEVEL3_JS_DATA;
    }

    if (!trackData) {
        console.error('Track data not found for key:', trackKey);
        trackData = window.LEVEL1_HTML_DATA;
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
 * Calculates XP and rank badge from LocalStorage
 */
function updateHeaderStats() {
    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

    let completedCount = 0;
    for (let i = 1; i <= 15; i++) {
        const val = localStorage.getItem(`lesson_${i}_completed`);
        if (val === 'true' || val === '1') completedCount++;
    }

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (completedCount * 100);

    const xpLabel = document.getElementById('userXpLabel');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');

    if (xpLabel) xpLabel.textContent = `${totalXP.toLocaleString()} XP`;

    if (rankLabel && rankIcon) {
        if (completedCount >= 15) {
            rankIcon.textContent = '🏆';
            rankLabel.textContent = 'Dojo Master';
        } else if (isL3) {
            rankIcon.textContent = '⚔️';
            rankLabel.textContent = 'Dojo Challenger';
        } else if (isL1) {
            rankIcon.textContent = '🛡️';
            rankLabel.textContent = 'Code Apprentice';
        } else if (isL0) {
            rankIcon.textContent = '🌱';
            rankLabel.textContent = 'Web Novice';
        } else {
            rankIcon.textContent = '🌐';
            rankLabel.textContent = 'Web Explorer';
        }
    }
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
                b.classList.remove('selected-correct', 'selected-wrong');
                b.querySelector('.opt-radio').textContent = '⚪';
            });

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
                        confirmColor: '#2563eb'
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

                // Redirect to Dashboard
                window.location.href = './dashboard.html';
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Keep Going!',
                        text: `You scored ${correctCount}/${totalQuestions}. Review the explanations above and select the correct answers!`,
                        confirmColor: '#2563eb'
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

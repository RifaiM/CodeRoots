/**
 * NoviCodes - Concept 4: JavaScript Interactivity Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderStats();
    initEventSandbox();
    initConceptQuiz();
    checkIfAlreadyCompleted();
});

function updateHeaderStats() {
    if (typeof window.getUserXPAndRank === 'function') {
        const stats = window.getUserXPAndRank();
        const xpLabel = document.getElementById('userXpLabel');
        if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;
    }
}

// 1. Event Sandbox Counter
let count = 0;

function initEventSandbox() {
    const valDisplay = document.getElementById('counterValueDisplay');
    const incBtn = document.getElementById('btnInc');
    const decBtn = document.getElementById('btnDec');
    const resetBtn = document.getElementById('btnReset');

    if (!valDisplay) return;

    if (incBtn) {
        incBtn.addEventListener('click', () => {
            count++;
            valDisplay.textContent = count;
        });
    }

    if (decBtn) {
        decBtn.addEventListener('click', () => {
            count--;
            valDisplay.textContent = count;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            count = 0;
            valDisplay.textContent = count;
        });
    }
}

// 2. Mini Knowledge Check
const quizQuestions = [
    {
        q: 'What is the main role of JavaScript in web development?',
        options: [
            { text: 'To provide dynamic behavior, interactivity, and event handling', correct: true },
            { text: 'To format text into bold and italics only', correct: false },
            { text: 'To purchase server hardware', correct: false }
        ],
        explanation: 'JavaScript is the programming language of the web that makes pages interactive, handles user clicks/events, and communicates with servers.'
    },
    {
        q: 'What is an "Event" in JavaScript?',
        options: [
            { text: 'An action that happens in the browser (like a user click, keypress, or submit)', correct: true },
            { text: 'A calendar date when HTML was invented', correct: false },
            { text: 'A special type of CSS font family', correct: false }
        ],
        explanation: 'Events are signals that something has occurred in the DOM (such as a click or input change) that JavaScript can listen and respond to.'
    },
    {
        q: 'What standard method is used to attach click listener functions to DOM elements?',
        options: [
            { text: 'addEventListener("click", callbackFunction)', correct: true },
            { text: 'listenForClickEvent()', correct: false },
            { text: 'triggerBrowserOnClick()', correct: false }
        ],
        explanation: 'addEventListener() attaches an event handler function to an element without overwriting existing event handlers.'
    }
];

let currentQuizIdx = 0;
let quizPassed = false;

function initConceptQuiz() {
    loadQuizQuestion(0);
}

function loadQuizQuestion(idx) {
    currentQuizIdx = idx;
    const qData = quizQuestions[idx];
    const qBadge = document.getElementById('quizBadge');
    const qText = document.getElementById('quizQText');
    const optContainer = document.getElementById('quizOptionsContainer');
    const feedbackBox = document.getElementById('quizFeedbackBox');

    const isAlreadyRead = localStorage.getItem('readJavaScript') === 'true';

    if (qBadge) {
        qBadge.textContent = isAlreadyRead && idx === 0 
            ? `✅ Mastered (Question 1 of ${quizQuestions.length})` 
            : `Question ${idx + 1} of ${quizQuestions.length}`;
    }

    if (qText) qText.textContent = `${idx + 1}. ${qData.q}`;
    if (feedbackBox) {
        feedbackBox.className = 'quiz-feedback-box';
        feedbackBox.innerHTML = '';
    }

    if (optContainer) {
        optContainer.innerHTML = '';
        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => {
                const allBtns = optContainer.querySelectorAll('.quiz-opt-btn');
                allBtns.forEach(b => b.disabled = true);

                if (opt.correct) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                    allBtns.forEach(b => {
                        const m = qData.options.find(o => o.text === b.textContent);
                        if (m && m.correct) b.classList.add('correct');
                    });
                }

                const isLast = idx === quizQuestions.length - 1;
                if (isLast) {
                    quizPassed = true;
                    updateCompletionButton();
                }

                feedbackBox.className = `quiz-feedback-box show ${opt.correct ? 'correct' : 'incorrect'}`;

                if (!isLast) {
                    feedbackBox.innerHTML = `
                        <strong>${opt.correct ? '🎉 Correct!' : '💡 Key Concept:'}</strong>
                        <p style="margin:4px 0 8px 0;">${qData.explanation}</p>
                        <button onclick="window.nextConceptQuestion()" style="background:#ca8a04; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.80rem;">Next Question ➔</button>
                    `;
                } else {
                    feedbackBox.innerHTML = `
                        <div style="padding: 2px 0;">
                            <div style="font-size: 0.96rem; font-weight: 800; color: #16a34a; margin-bottom: 4px;">🎉 JavaScript Concept Check Passed! (3/3 Answered)</div>
                            <p style="margin: 4px 0 10px 0; color: #334155;">
                                Awesome! You understand events, interactivity, and DOM listener functions. Claim your +50 XP below!
                            </p>
                            <button onclick="window.markConceptComplete()" style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.84rem;">
                                🌟 Complete Pillar 4 & Claim +50 XP ➔
                            </button>
                        </div>
                    `;
                }
            });
            optContainer.appendChild(btn);
        });
    }
}

window.nextConceptQuestion = function() {
    currentQuizIdx = (currentQuizIdx + 1) % quizQuestions.length;
    loadQuizQuestion(currentQuizIdx);
};

// 3. Mark Complete & Navigate back to Web History
window.markConceptComplete = function() {
    const isAlreadyRead = localStorage.getItem('readJavaScript') === 'true';
    if (!quizPassed && !isAlreadyRead) {
        showLockedModal();
        return;
    }

    localStorage.setItem('readJavaScript', 'true');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: '🌟 All 4 Pillars Mastered!',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 8px;">🌐 🧱 🎨 ⚡</div>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #16a34a; margin-bottom: 6px;">+50 XP Earned! (4/4 Pillars Complete)</div>
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5;">
                        You have mastered all 4 core pillars! Return to the Web History roadmap to claim your <strong>Level 0 Completion & +250 XP reward</strong>!
                    </p>
                </div>
            `,
            confirmButtonText: '🚀 Return to Web History Roadmap ➔',
            confirmButtonColor: '#2563eb'
        }).then(() => {
            window.location.href = '../web_history.html';
        });
    } else {
        window.location.href = '../web_history.html';
    }
};

function showLockedModal() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'info',
            title: '🔒 Verification Required',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: left; padding: 4px 8px;">
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin-bottom: 10px;">
                        Please answer all 3 questions in <strong>Section 3: Concept Verification Check</strong> to prove your understanding before claiming this concept (+50 XP)!
                    </p>
                </div>
            `,
            confirmButtonColor: '#ca8a04',
            confirmButtonText: 'Take Verification Check 🚀'
        });
    }
}

function updateCompletionButton() {
    const isAlreadyRead = localStorage.getItem('readJavaScript') === 'true';
    const btn = document.getElementById('markReadBtn');
    if (!btn) return;

    if (isAlreadyRead) {
        btn.classList.remove('locked');
        btn.innerHTML = '<span>✅ Completed (+50 XP Earned) • Return to Roadmap ➔</span>';
        btn.onclick = () => { window.location.href = '../web_history.html'; };
    } else if (quizPassed) {
        btn.classList.remove('locked');
        btn.innerHTML = '<span>🌟 Complete Pillar 4 & Return to Roadmap (+50 XP) ➔</span>';
        btn.onclick = window.markConceptComplete;
    } else {
        btn.classList.add('locked');
        btn.innerHTML = '<span>🔒 Complete Verification Check (Section 3) to Unlock (+50 XP)</span>';
        btn.onclick = showLockedModal;
    }
}

function checkIfAlreadyCompleted() {
    updateCompletionButton();
}
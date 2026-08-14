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
            { text: 'An action that happens in the browser (like a user click, keypress, or scroll)', correct: true },
            { text: 'A calendar date when HTML was invented', correct: false },
            { text: 'A special type of CSS font family', correct: false }
        ],
        explanation: 'Events are signals that something has occurred in the DOM (such as a click, mouse move, or input change) that JavaScript can listen and respond to.'
    }
];

let currentQuizIdx = 0;

function initConceptQuiz() {
    loadQuizQuestion(0);
}

function loadQuizQuestion(idx) {
    const qData = quizQuestions[idx];
    const qText = document.getElementById('quizQText');
    const optContainer = document.getElementById('quizOptionsContainer');
    const feedbackBox = document.getElementById('quizFeedbackBox');

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
                    feedbackBox.className = 'quiz-feedback-box show correct';
                    feedbackBox.innerHTML = `<strong>🎉 Correct!</strong> <p style="margin:4px 0 8px 0;">${qData.explanation}</p>`;
                } else {
                    btn.classList.add('incorrect');
                    feedbackBox.className = 'quiz-feedback-box show incorrect';
                    feedbackBox.innerHTML = `<strong>💡 Hint:</strong> <p style="margin:4px 0 8px 0;">${qData.explanation}</p>`;
                }

                if (idx < quizQuestions.length - 1) {
                    feedbackBox.innerHTML += `<button onclick="window.nextConceptQuestion()" style="background:#ca8a04; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold; cursor:pointer;">Next Question ➔</button>`;
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

function checkIfAlreadyCompleted() {
    if (localStorage.getItem('readJavaScript') === 'true') {
        const btn = document.getElementById('markReadBtn');
        if (btn) btn.innerHTML = '<span>✅ Completed (+50 XP Earned) • Return to Roadmap ➔</span>';
    }
}
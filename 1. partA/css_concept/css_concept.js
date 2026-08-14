/**
 * NoviCodes - Concept 3: CSS Styling Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderStats();
    initStylerPlayground();
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

// 1. Live Styler Playground
function initStylerPlayground() {
    const demoCard = document.getElementById('demoElementCard');
    const colorBtn = document.getElementById('styleToggleColor');
    const radiusBtn = document.getElementById('styleToggleRadius');
    const shadowBtn = document.getElementById('styleToggleShadow');

    if (!demoCard) return;

    let isPink = false;
    let isRounded = false;
    let hasGlow = false;

    if (colorBtn) {
        colorBtn.addEventListener('click', () => {
            isPink = !isPink;
            colorBtn.classList.toggle('active', isPink);
            demoCard.style.background = isPink ? 'linear-gradient(135deg, #db2777 0%, #9333ea 100%)' : '#ffffff';
            demoCard.style.color = isPink ? '#ffffff' : '#0f172a';
        });
    }

    if (radiusBtn) {
        radiusBtn.addEventListener('click', () => {
            isRounded = !isRounded;
            radiusBtn.classList.toggle('active', isRounded);
            demoCard.style.borderRadius = isRounded ? '24px' : '8px';
        });
    }

    if (shadowBtn) {
        shadowBtn.addEventListener('click', () => {
            hasGlow = !hasGlow;
            shadowBtn.classList.toggle('active', hasGlow);
            demoCard.style.boxShadow = hasGlow ? '0 10px 25px rgba(219, 39, 119, 0.45)' : 'none';
        });
    }
}

// 2. Mini Knowledge Check
const quizQuestions = [
    {
        q: 'What does CSS stand for?',
        options: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Styling Syntax', correct: false },
            { text: 'Computer Screen Standards', correct: false }
        ],
        explanation: 'CSS stands for Cascading Style Sheets. "Cascading" refers to how styles inherit and flow down from parent to child rules.'
    },
    {
        q: 'In the CSS Box Model, which layer creates space OUTSIDE the element border?',
        options: [
            { text: 'Margin', correct: true },
            { text: 'Padding', correct: false },
            { text: 'Content', correct: false }
        ],
        explanation: 'Margin creates transparent buffer space OUTSIDE the border, while Padding creates space INSIDE the border around content.'
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
                    feedbackBox.innerHTML += `<button onclick="window.nextConceptQuestion()" style="background:#db2777; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold; cursor:pointer;">Next Question ➔</button>`;
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

// 3. Mark Complete & Navigate
window.markConceptComplete = function() {
    localStorage.setItem('readCSS', 'true');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: '🎉 Concept 3 Mastered!',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <div style="font-size: 1.15rem; font-weight: 800; color: #db2777; margin-bottom: 6px;">+50 XP Earned!</div>
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5;">
                        You have mastered CSS styling and the Box Model! Ready for the final pillar: <strong>JavaScript Interactivity</strong>?
                    </p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '⚡ Next: JavaScript Concept ➔',
            cancelButtonText: '🗺️ Back to Web History',
            confirmButtonColor: '#db2777',
            cancelButtonColor: '#64748b'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../javascript_concept/javascript_concept.html';
            } else {
                window.location.href = '../web_history.html';
            }
        });
    } else {
        window.location.href = '../javascript_concept/javascript_concept.html';
    }
};

function checkIfAlreadyCompleted() {
    if (localStorage.getItem('readCSS') === 'true') {
        const btn = document.getElementById('markReadBtn');
        if (btn) btn.innerHTML = '<span>✅ Completed (+50 XP Earned) • Next: JavaScript ➔</span>';
    }
}
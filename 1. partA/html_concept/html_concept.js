/**
 * NoviCodes - Concept 2: HTML Structure Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderStats();
    initTagSandbox();
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

// 1. Tag Sandbox
const tagSamples = {
    h1: {
        code: `&lt;h1&gt;Welcome to NoviCodes&lt;/h1&gt;`,
        preview: `<h1 style="margin:0; font-size:1.6rem; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif;">Welcome to NoviCodes</h1>`
    },
    p: {
        code: `&lt;p&gt;HTML creates the semantic blueprint of every webpage.&lt;/p&gt;`,
        preview: `<p style="margin:0; font-size:0.95rem; color:#475569; font-family:'Plus Jakarta Sans',sans-serif;">HTML creates the semantic blueprint of every webpage.</p>`
    },
    button: {
        code: `&lt;button class="btn"&gt;🚀 Start Building&lt;/button&gt;`,
        preview: `<button style="background:#ea580c; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif;">🚀 Start Building</button>`
    },
    img: {
        code: `&lt;img src="assets/logo.jpg" alt="Logo" width="48" height="48"&gt;`,
        preview: `<img src="../../assets/logo.jpg" alt="Logo" style="width:48px; height:48px; border-radius:8px; object-fit:cover;">`
    }
};

function initTagSandbox() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    const codePane = document.getElementById('tagCodePane');
    const previewPane = document.getElementById('tagPreviewPane');

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tagButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.dataset.tag;
            const data = tagSamples[key];
            if (data) {
                if (codePane) codePane.innerHTML = `<code>${data.code}</code>`;
                if (previewPane) previewPane.innerHTML = data.preview;
            }
        });
    });
}

// 2. Mini Knowledge Check
const quizQuestions = [
    {
        q: 'What does HTML stand for?',
        options: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'High Tech Modern Layout', correct: false },
            { text: 'Hyperlink Text Management Logic', correct: false }
        ],
        explanation: 'HTML stands for HyperText Markup Language — the standard markup language used to structure web pages.'
    },
    {
        q: 'Which tag represents the top-level main heading on a webpage?',
        options: [
            { text: '<h1>', correct: true },
            { text: '<head>', correct: false },
            { text: '<header>', correct: false }
        ],
        explanation: '<h1> is the highest-level heading element, typically representing the main title of the page.'
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
                    feedbackBox.innerHTML += `<button onclick="window.nextConceptQuestion()" style="background:#ea580c; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold; cursor:pointer;">Next Question ➔</button>`;
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
    localStorage.setItem('readHTML', 'true');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: '🎉 Concept 2 Mastered!',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <div style="font-size: 1.15rem; font-weight: 800; color: #ea580c; margin-bottom: 6px;">+50 XP Earned!</div>
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5;">
                        You have mastered HTML tags and DOM hierarchy! Ready to explore <strong>Pillar 3: CSS Styling</strong>?
                    </p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '🎨 Next: CSS Concept ➔',
            cancelButtonText: '🗺️ Back to Web History',
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#64748b'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../css_concept/css_concept.html';
            } else {
                window.location.href = '../web_history.html';
            }
        });
    } else {
        window.location.href = '../css_concept/css_concept.html';
    }
};

function checkIfAlreadyCompleted() {
    if (localStorage.getItem('readHTML') === 'true') {
        const btn = document.getElementById('markReadBtn');
        if (btn) btn.innerHTML = '<span>✅ Completed (+50 XP Earned) • Next: CSS ➔</span>';
    }
}
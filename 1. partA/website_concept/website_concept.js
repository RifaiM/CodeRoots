/**
 * NoviCodes - Concept 1: What is a Website? Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderStats();
    initInspector();
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

// 1. Client vs Server Inspector
const inspectorDetails = {
    client: {
        title: '💻 The Client (Web Browser)',
        desc: 'The client is your personal device (laptop, smartphone, or tablet) running a web browser like Chrome, Safari, or Firefox. The browser makes requests, downloads code files, builds the visual DOM layout, and executes JavaScript.'
    },
    internet: {
        title: '🌐 The Internet & DNS Network',
        desc: 'The global highway connecting clients to servers. Routers, fiber-optic cables, and DNS servers translate human-readable names (novicodes.dev) into machine IP addresses (142.250.190.46) in milliseconds.'
    },
    server: {
        title: '🖥️ The Web Server (Host)',
        desc: 'A powerful 24/7 connected computer in a cloud data center that stores website files (HTML, CSS, JS, images, databases). When a client sends a request, the server responds with the requested code bundle.'
    }
};

function initInspector() {
    const buttons = document.querySelectorAll('.inspector-node-btn');
    const detailBox = document.getElementById('inspectorDetailBox');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.dataset.target;
            const data = inspectorDetails[key];
            if (data && detailBox) {
                detailBox.innerHTML = `<strong>${data.title}</strong><p style="margin: 6px 0 0 0;">${data.desc}</p>`;
            }
        });
    });
}

// 2. Mini Knowledge Check
const quizQuestions = [
    {
        q: 'What is the primary role of a Web Server?',
        options: [
            { text: 'To store and deliver website files to visitors 24/7', correct: true },
            { text: 'To manufacture physical computer monitors', correct: false },
            { text: 'To design logos and color palettes', correct: false }
        ],
        explanation: 'Web servers are high-reliability computers that store website code and serve it to clients across the internet on demand.'
    },
    {
        q: 'What does URL stand for?',
        options: [
            { text: 'Uniform Resource Locator (the unique address of a web resource)', correct: true },
            { text: 'Universal Routing Link', correct: false },
            { text: 'Unlimited Realtime Logic', correct: false }
        ],
        explanation: 'A URL (Uniform Resource Locator) specifies the protocol, domain name, and file path to locate a web resource.'
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
                    feedbackBox.innerHTML += `<button onclick="window.nextConceptQuestion()" style="background:#2563eb; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold; cursor:pointer;">Next Question ➔</button>`;
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

// 3. Mark as Complete & Sync
window.markConceptComplete = function() {
    localStorage.setItem('readWebsite', 'true');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: '🎉 Concept 1 Mastered!',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <div style="font-size: 1.15rem; font-weight: 800; color: #16a34a; margin-bottom: 6px;">+50 XP Earned!</div>
                    <p style="color: #475569; font-size: 0.92rem; line-height: 1.5;">
                        You've unlocked the fundamental concept of how websites work! Ready to explore <strong>Pillar 2: HTML Structure</strong>?
                    </p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '🧱 Next: HTML Concept ➔',
            cancelButtonText: '🗺️ Back to Web History',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../html_concept/html_concept.html';
            } else {
                window.location.href = '../web_history.html';
            }
        });
    } else {
        window.location.href = '../html_concept/html_concept.html';
    }
};

function checkIfAlreadyCompleted() {
    if (localStorage.getItem('readWebsite') === 'true') {
        const btn = document.getElementById('markReadBtn');
        if (btn) btn.innerHTML = '<span>✅ Completed (+50 XP Earned) • Next: HTML ➔</span>';
    }
}
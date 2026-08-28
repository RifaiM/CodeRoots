/**
 * NoviCodes - Concept 1: What is a Website? Controller
 */

document.addEventListener('DOMContentLoaded', () => {
 initBackToTop();
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
 title: ' The Client (Web Browser)',
 desc: 'The client is your personal device (laptop, smartphone, or tablet) running a web browser like Chrome, Safari, or Firefox. The browser makes requests, downloads code files, builds the visual DOM layout, and executes JavaScript.'
 },
 internet: {
 title: ' The Internet & DNS Network',
 desc: 'The global highway connecting clients to servers. Routers, fiber-optic cables, and DNS servers translate human-readable names (novicodes.dev) into machine IP addresses (142.250.190.46) in milliseconds.'
 },
 server: {
 title: '️ The Web Server (Host)',
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
 q: 'What is the primary role of a client (web browser)?',
 options: [
 { text: 'To send requests, download files, and render HTML/CSS/JS for the user', correct: true },
 { text: 'To store database records in a cloud datacenter', correct: false },
 { text: 'To manage physical fiber-optic cables under the ocean', correct: false }
 ],
 explanation: 'The client (browser) requests web documents from the server and renders them into an interactive visual webpage.'
 },
 {
 q: 'What is the primary role of a Web Server?',
 options: [
 { text: 'To store website files and serve them to clients on demand 24/7', correct: true },
 { text: 'To manufacture physical computer monitors', correct: false },
 { text: 'To design logos and color palettes', correct: false }
 ],
 explanation: 'Web servers are high-reliability computers that host website assets and deliver them to users over HTTP/HTTPS.'
 },
 {
 q: 'What does URL stand for and what is its role?',
 options: [
 { text: 'Uniform Resource Locator (the unique address to find a web resource)', correct: true },
 { text: 'Universal Routing Link', correct: false },
 { text: 'Unlimited Realtime Logic', correct: false }
 ],
 explanation: 'A URL specifies the protocol (https://), domain name, and file path to locate a specific resource on the internet.'
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

 const isAlreadyRead = localStorage.getItem('readWebsite') === 'true';

 if (qBadge) {
 qBadge.textContent = isAlreadyRead && idx === 0 
 ? ` Mastered (Question 1 of ${quizQuestions.length})` 
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
 <strong>${opt.correct ? ' Correct!' : ' Key Concept:'}</strong>
 <p style="margin:4px 0 8px 0;">${qData.explanation}</p>
 <button onclick="window.nextConceptQuestion()" style="background:#2563eb; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.80rem;">Next Question </button>
 `;
 } else {
 feedbackBox.innerHTML = `
 <div style="padding: 2px 0;">
 <div style="font-size: 0.96rem; font-weight: 800; color: #16a34a; margin-bottom: 4px;"> Concept Check Passed! (3/3 Answered)</div>
 <p style="margin: 4px 0 10px 0; color: #334155;">
 Great job! You understand clients, web servers, and URL structures. Claim your +50 XP below!
 </p>
 <button onclick="window.markConceptComplete()" style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.84rem;">
 Claim +50 XP & Continue 
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

// 3. Mark as Complete & Sync
window.markConceptComplete = function() {
 const isAlreadyRead = localStorage.getItem('readWebsite') === 'true';
 if (!quizPassed && !isAlreadyRead) {
 showLockedModal();
 return;
 }

 localStorage.setItem('readWebsite', 'true');
 updateHeaderStats();
 window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));
 window.dispatchEvent(new Event('storage'));

 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'success',
 title: 'Concept 1 Verified',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.84rem; font-weight: 600; color: #2F5233; background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 6px 14px; border-radius: 2px; display: inline-block; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
 BOUNTY // +50 XP EARNED
 </div>
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55;">
 You have unlocked the core concept of web mechanics and client-server communication. Ready to explore <strong>Pillar 2: HTML Structure</strong>?
 </p>
 </div>
 `,
 showCancelButton: true,
 confirmButtonText: 'Next: HTML Concept →',
 cancelButtonText: 'Web History Roadmap',
 confirmButtonColor: '#A33B24',
 cancelButtonColor: '#BAB4A6'
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

function showLockedModal() {
 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'warning',
 title: 'Verification Incomplete',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: left; padding: 4px 8px;">
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55; margin-bottom: 10px;">
 Please answer all 3 questions in <strong>Section 3: Concept Verification Check</strong> to prove your understanding before claiming this milestone (+50 XP).
 </p>
 </div>
 `,
 confirmButtonColor: '#A33B24',
 confirmButtonText: 'Take Verification Check →'
 });
 }
}

function updateCompletionButton() {
 const isAlreadyRead = localStorage.getItem('readWebsite') === 'true';
 const btn = document.getElementById('markReadBtn');
 if (!btn) return;

 if (isAlreadyRead) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Concept Mastered (+50 XP Earned) • Next: HTML </span>';
 btn.onclick = () => { window.location.href = '../html_concept/html_concept.html'; };
 } else if (quizPassed) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Mark Complete & Continue to HTML (+50 XP) </span>';
 btn.onclick = window.markConceptComplete;
 } else {
 btn.classList.add('locked');
 btn.innerHTML = '<span> Complete Verification Check (Section 3) to Unlock (+50 XP)</span>';
 btn.onclick = showLockedModal;
 }
}

function checkIfAlreadyCompleted() {
 updateCompletionButton();
}

function initBackToTop() {
 const btn = document.getElementById('backToTopBtn');
 if (!btn) return;

 window.addEventListener('scroll', () => {
 if (window.scrollY > 150) {
 btn.classList.add('visible');
 } else {
 btn.classList.remove('visible');
 }
 }, { passive: true });

 btn.addEventListener('click', () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 });
}
/**
 * NoviCodes - Concept 2: HTML Structure Controller
 */

document.addEventListener('DOMContentLoaded', () => {
 initBackToTop();
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
 code: `&lt;button class="btn"&gt; Start Building&lt;/button&gt;`,
 preview: `<button style="background:#ea580c; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif;"> Start Building</button>`
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
 explanation: '<h1> is the highest-level heading element, representing the primary title of the page.'
 },
 {
 q: 'What is the syntax difference between an opening tag and a closing tag?',
 options: [
 { text: 'Closing tags contain a forward slash (e.g. </p>) before the tag name', correct: true },
 { text: 'Closing tags are written in uppercase only', correct: false },
 { text: 'Closing tags use curly braces {/p}', correct: false }
 ],
 explanation: 'Closing tags include a forward slash (/) immediately after the opening angle bracket to signal the end of the element.'
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

 const isAlreadyRead = localStorage.getItem('readHTML') === 'true';

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
 <button onclick="window.nextConceptQuestion()" style="background:#ea580c; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.80rem;">Next Question </button>
 `;
 } else {
 feedbackBox.innerHTML = `
 <div style="padding: 2px 0;">
 <div style="font-size: 0.96rem; font-weight: 800; color: #16a34a; margin-bottom: 4px;"> HTML Concept Check Passed! (3/3 Answered)</div>
 <p style="margin: 4px 0 10px 0; color: #334155;">
 Excellent! You understand markup tags, heading hierarchy, and DOM nesting. Claim your +50 XP below!
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

// 3. Mark Complete & Navigate
window.markConceptComplete = function() {
 const isAlreadyRead = localStorage.getItem('readHTML') === 'true';
 if (!quizPassed && !isAlreadyRead) {
 showLockedModal();
 return;
 }

 localStorage.setItem('readHTML', 'true');
 updateHeaderStats();
 window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));
 window.dispatchEvent(new Event('storage'));

 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'success',
 title: 'Concept 2 Verified',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.84rem; font-weight: 600; color: #2F5233; background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 6px 14px; border-radius: 2px; display: inline-block; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
 BOUNTY // +50 XP EARNED
 </div>
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55;">
 You have mastered HTML semantic elements and DOM hierarchy. Ready to explore <strong>Pillar 3: CSS Styling</strong>?
 </p>
 </div>
 `,
 showCancelButton: true,
 confirmButtonText: 'Next: CSS Concept →',
 cancelButtonText: 'Web History Roadmap',
 confirmButtonColor: '#A33B24',
 cancelButtonColor: '#BAB4A6'
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
 const isAlreadyRead = localStorage.getItem('readHTML') === 'true';
 const btn = document.getElementById('markReadBtn');
 if (!btn) return;

 if (isAlreadyRead) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Concept Mastered (+50 XP Earned) • Next: CSS </span>';
 btn.onclick = () => { window.location.href = '../css_concept/css_concept.html'; };
 } else if (quizPassed) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Mark Complete & Continue to CSS (+50 XP) </span>';
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
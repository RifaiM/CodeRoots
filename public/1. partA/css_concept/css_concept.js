/**
 * NoviCodes - Concept 3: CSS Styling Controller
 */

document.addEventListener('DOMContentLoaded', () => {
 initBackToTop();
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
 },
 {
 q: 'Which CSS property is used to change the background color of an element?',
 options: [
 { text: 'background-color', correct: true },
 { text: 'color', correct: false },
 { text: 'border-color', correct: false }
 ],
 explanation: 'background-color sets the fill color of an element container, while color sets the text color.'
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

 const isAlreadyRead = localStorage.getItem('readCSS') === 'true';

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
 <button onclick="window.nextConceptQuestion()" style="background:#db2777; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.80rem;">Next Question </button>
 `;
 } else {
 feedbackBox.innerHTML = `
 <div style="padding: 2px 0;">
 <div style="font-size: 0.96rem; font-weight: 800; color: #16a34a; margin-bottom: 4px;"> CSS Concept Check Passed! (3/3 Answered)</div>
 <p style="margin: 4px 0 10px 0; color: #334155;">
 Great job! You understand selectors, cascading inheritance, and the box model. Claim your +50 XP below!
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
 const isAlreadyRead = localStorage.getItem('readCSS') === 'true';
 if (!quizPassed && !isAlreadyRead) {
 showLockedModal();
 return;
 }

 localStorage.setItem('readCSS', 'true');

 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'success',
 title: 'Concept 3 Verified',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.84rem; font-weight: 600; color: #2F5233; background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 6px 14px; border-radius: 2px; display: inline-block; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
 BOUNTY // +50 XP EARNED
 </div>
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55;">
 You have mastered CSS styling rules and the Box Model. Ready for the final pillar: <strong>JavaScript Interactivity</strong>?
 </p>
 </div>
 `,
 showCancelButton: true,
 confirmButtonText: 'Next: JavaScript Concept →',
 cancelButtonText: 'Web History Roadmap',
 confirmButtonColor: '#A33B24',
 cancelButtonColor: '#BAB4A6'
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
 const isAlreadyRead = localStorage.getItem('readCSS') === 'true';
 const btn = document.getElementById('markReadBtn');
 if (!btn) return;

 if (isAlreadyRead) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Concept Mastered (+50 XP Earned) • Next: JavaScript </span>';
 btn.onclick = () => { window.location.href = '../javascript_concept/javascript_concept.html'; };
 } else if (quizPassed) {
 btn.classList.remove('locked');
 btn.innerHTML = '<span> Mark Complete & Continue to JavaScript (+50 XP) </span>';
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
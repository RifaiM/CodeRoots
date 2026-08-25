/**
 * NoviCodes - Level 0 Web History & Architecture Controller Script
 * Unified Interactive Engine with Era Simulator, Packet Flow, and Progress Sync
 */

document.addEventListener('DOMContentLoaded', () => {
 updateHeaderStats();
 initEraTimeMachine();
 initPacketSimulator();
 initTimelineFilter();
 initPillarsProgress();
 initQuizEngine();
 initBackToTop();
});

/* ==========================================================================
 1. User XP & Developer Rank Profile Engine (Unified Levels 0 - 7)
 ========================================================================== */
window.getUserXPAndRank = function() {
 const isL0 = localStorage.getItem('level0_completed') === 'true';
 const isL1 = localStorage.getItem('level1_completed') === 'true';
 const isL2 = localStorage.getItem('level2_completed') === 'true';
 const isL3 = localStorage.getItem('level3_completed') === 'true';

 const isReactFoundations = localStorage.getItem('foundations_react_completed') === 'true';
 const isPythonFoundations = localStorage.getItem('foundations_python_completed') === 'true';
 const isCloudFoundations = localStorage.getItem('foundations_cloud_completed') === 'true';
 const isSqlFoundations = localStorage.getItem('foundations_sql_completed') === 'true';
 const isNextjsFoundations = localStorage.getItem('foundations_nextjs_completed') === 'true';
 const isAsyncFoundations = localStorage.getItem('foundations_async_completed') === 'true';
 const isAuthFoundations = localStorage.getItem('foundations_auth_completed') === 'true';
 const isSaasFoundations = localStorage.getItem('foundations_saas_completed') === 'true';

 let advancedFoundationsXP = 0;
 if (isReactFoundations) advancedFoundationsXP += 300;
 if (isPythonFoundations) advancedFoundationsXP += 300;
 if (isCloudFoundations) advancedFoundationsXP += 300;
 if (isSqlFoundations) advancedFoundationsXP += 300;
 if (isNextjsFoundations) advancedFoundationsXP += 300;
 if (isAsyncFoundations) advancedFoundationsXP += 300;
 if (isAuthFoundations) advancedFoundationsXP += 300;
 if (isSaasFoundations) advancedFoundationsXP += 500;

 let l4Completed = 0;
 for (let i = 1; i <= 15; i++) {
 try {
 const isComp = localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true' || 
 localStorage.getItem(`lesson_${i}_completed`) === 'true' || 
 localStorage.getItem(`lesson_${i}_completed`) === '1';
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

 let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0, l7BranchD = 0, l7BranchE = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partF_branchA_lesson${i}_complete`) === 'true') l7BranchA++;
 if (localStorage.getItem(`partF_branchB_lesson${i}_complete`) === 'true') l7BranchB++;
 if (localStorage.getItem(`partF_branchC_lesson${i}_complete`) === 'true') l7BranchC++;
 } catch (e) {}
 }
 for (let i = 1; i <= 12; i++) {
 try {
 if (localStorage.getItem(`partF_branchD_lesson${i}_complete`) === 'true') l7BranchD++;
 } catch (e) {}
 }
 for (let i = 1; i <= 10; i++) {
 try {
 if (localStorage.getItem(`partF_branchE_lesson${i}_complete`) === 'true') l7BranchE++;
 } catch (e) {}
 }
 const l7Completed = l7BranchA + l7BranchB + l7BranchC + l7BranchD + l7BranchE;
 const l7XP = (l7BranchA * 250) + (l7BranchB * 250) + (l7BranchC * 250) + (l7BranchD * 150) + (l7BranchE * 150);

 let l8Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partG_lesson${i}_remake_complete`) === 'true') l8Completed++;
 } catch (e) {}
 }

 let l9Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partH_lesson${i}_remake_complete`) === 'true') l9Completed++;
 } catch (e) {}
 }

 let l10Completed = 0;
 for (let i = 1; i <= 6; i++) {
 try {
 if (localStorage.getItem(`partI_lesson${i}_remake_complete`) === 'true') l10Completed++;
 } catch (e) {}
 }

 function safeParseInt(val, defaultVal) {
 if (!val) return defaultVal || 0;
 const parsed = parseInt(String(val), 10);
 return (isNaN(parsed) || parsed < 0) ? (defaultVal || 0) : parsed;
 }

 const dailyQuestXP = safeParseInt(localStorage.getItem('novicodes_daily_quest_xp'), 0);
 const streakBonusXP = safeParseInt(localStorage.getItem('novicodes_streak_bonus_xp'), 0);
 const streakCount = safeParseInt(localStorage.getItem('novicodes_streak_count'), 0);

 let totalXP = 0;
 if (isL0) totalXP += 250;
 if (isL1) totalXP += 300;
 if (isL2) totalXP += 300;
 if (isL3) totalXP += 400;
 totalXP += advancedFoundationsXP;
 totalXP += (l4Completed * 100);
 totalXP += (l5Completed * 150);
 totalXP += (l6Completed * 200);
 totalXP += l7XP;
 totalXP += (l8Completed * 250);
 totalXP += (l9Completed * 250);
 totalXP += (l10Completed * 500);
 totalXP += (dailyQuestXP + streakBonusXP);
 totalXP = Math.max(0, isNaN(totalXP) ? 0 : totalXP);

 let rankTitle = 'Web Explorer';
 let rankIcon = '';

 if (l10Completed >= 6) {
 rankTitle = 'Master Web Developer';
 rankIcon = '';
 } else if (l10Completed > 0 || isSaasFoundations) {
 rankTitle = 'SaaS UI Architect';
 rankIcon = '';
 } else if (l9Completed >= 6) {
 rankTitle = 'React Auth Specialist';
 rankIcon = '️';
 } else if (l9Completed > 0 || isAuthFoundations) {
 rankTitle = 'Security Engineer';
 rankIcon = '';
 } else if (l8Completed >= 6) {
 rankTitle = 'Async UI Specialist';
 rankIcon = '';
 } else if (l8Completed > 0 || isAsyncFoundations) {
 rankTitle = 'API Integration Specialist';
 rankIcon = '';
 } else if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6 && l7BranchD >= 12 && l7BranchE >= 10) {
 rankTitle = 'Principal Polymath';
 rankIcon = '';
 } else if (l7BranchA >= 6 || isCloudFoundations) {
 rankTitle = 'Cloud Specialist';
 rankIcon = '️';
 } else if (l7BranchB >= 6 || isSqlFoundations) {
 rankTitle = 'Database Architect';
 rankIcon = '️';
 } else if (l7BranchC >= 6 || isNextjsFoundations) {
 rankTitle = 'Next.js Engineer';
 rankIcon = '';
 } else if (l7BranchD >= 12 || isTypescriptFoundations) {
 rankTitle = 'TypeScript Specialist';
 rankIcon = '';
 } else if (l7BranchE >= 10 || isCssMotionFoundations) {
 rankTitle = 'CSS Motion Specialist';
 rankIcon = '';
 } else if (l7Completed > 0) {
 rankTitle = 'Fullstack Specialist';
 rankIcon = '';
 } else if (l6Completed >= 15) {
 rankTitle = 'Python Backend Architect';
 rankIcon = '';
 } else if (l6Completed > 0 || isPythonFoundations) {
 rankTitle = 'Python Backend Engineer';
 rankIcon = '';
 } else if (l5Completed >= 15) {
 rankTitle = 'React Master';
 rankIcon = '️';
 } else if (l5Completed > 0 || isReactFoundations) {
 rankTitle = 'React Engineer';
 rankIcon = '️';
 } else if (l4Completed >= 15) {
 rankTitle = 'DOM Master';
 rankIcon = '️';
 } else if (l4Completed > 0) {
 rankTitle = 'DOM Challenger';
 rankIcon = '️';
 } else if (isL1 || isL2 || isL3) {
 rankTitle = 'Code Apprentice';
 rankIcon = '️';
 } else {
 rankTitle = 'Web Explorer';
 rankIcon = '';
 }

 return {
 totalXP,
 maxXP: 25000,
 rankTitle,
 rankIcon,
 isL0,
 isL1,
 isL2,
 isL3,
 isReactFoundations,
 isPythonFoundations,
 isCloudFoundations,
 isSqlFoundations,
 isNextjsFoundations,
 isTypescriptFoundations,
 isCssMotionFoundations,
 isAsyncFoundations,
 isAuthFoundations,
 isSaasFoundations,
 advancedFoundationsXP,
 l4Completed,
 l5Completed,
 l6Completed,
 l7Completed,
 l7XP,
 l7BranchA,
 l7BranchB,
 l7BranchC,
 l7BranchD,
 l7BranchE,
 l8Completed,
 l9Completed,
 l10Completed,
 dailyQuestXP,
 streakBonusXP,
 streakCount
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

/* ==========================================================================
 2. Interactive Web Era Time Machine
 ========================================================================== */
const eraData = {
 '1991': {
 url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
 html: `
 <div class="screen-1991">
 <h2>WorldWideWeb - Executive Summary</h2>
 <p>The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.</p>
 <p>Everything there is online at CERN is linked directly or indirectly to this document.</p>
 <ul>
 <li><a href="javascript:void(0)" onclick="Swal.fire({ title: 'Hypertext Protocol', text: 'In 1991, clicking blue links retrieved raw text over HTTP port 80.', icon: 'info' })">What is Hypertext?</a></li>
 <li><a href="javascript:void(0)" onclick="Swal.fire({ title: 'Tim Berners-Lee', text: 'Created HTML, HTTP, and URLs on a NeXT Computer at CERN.', icon: 'info' })">Technical Project Documentation</a></li>
 </ul>
 </div>
 `
 },
 '2004': {
 url: 'https://web2004.portal.net/my-blog/dev-journal',
 html: `
 <div class="screen-2004" style="background: #FFFFFF; border: 1px solid #D5D0C6; border-radius: 2px; padding: 18px;">
 <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: #A33B24; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">
 Web 2.0 Community Journal • Powered by CSS & Early AJAX
 </div>
 <h3 style="font-family: 'Newsreader', Georgia, serif; font-size: 1.3rem; margin: 0 0 8px 0; color: #20211F;">Welcome to the Read-Write Web</h3>
 <p style="font-size: 0.88rem; line-height: 1.55; color: #686760; margin: 0 0 14px 0;">
 Web 2.0 transformed the internet from static read-only documents into collaborative platforms, blogs, and dynamic client-side widgets.
 </p>
 <div style="display: flex; gap: 8px; align-items: center;">
 <button onclick="Swal.fire({ title: 'Dynamic DOM (AJAX)', text: 'JavaScript in 2004 introduced XMLHttpRequest to update web pages without a full reload.', icon: 'success' })" style="background: #A33B24; color: #F8F6F1; border: 1px solid #A33B24; padding: 6px 14px; border-radius: 2px; font-family: 'IBM Plex Mono', monospace; font-size: 0.76rem; font-weight: 600; text-transform: uppercase; cursor: pointer;">Post Comment (AJAX)</button>
 <span style="font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: #686760;">1,420 READERS</span>
 </div>
 </div>
 `
 },
 '2026': {
 url: 'https://novicodes.dev/cloud-app/dashboard',
 html: `
 <div class="screen-2026" style="background: #20211F; color: #F8F6F1; border: 1px solid #D5D0C6; border-radius: 2px; padding: 18px;">
 <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: #EAC9C0; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">
 Modern Web Architecture • Fullstack Edge Engine
 </div>
 <h3 style="font-family: 'Newsreader', Georgia, serif; font-size: 1.3rem; margin: 0 0 8px 0; color: #F8F6F1;">Serverless Delivery & Reactive Edge UI</h3>
 <p style="font-size: 0.88rem; color: #D5D0C6; margin: 0 0 14px 0; line-height: 1.55;">
 Modern web applications combine React Server Components, Python microservices, zero-latency edge CDNs, and hardware-accelerated CSS animations.
 </p>
 <div style="display: flex; gap: 8px; flex-wrap: wrap;">
 <span style="background: #314C52; color: #EBF0F1; border: 1px solid #C2CED0; padding: 3px 8px; border-radius: 2px; font-family: 'IBM Plex Mono', monospace; font-size: 0.70rem; font-weight: 600;">EDGE LATENCY // 12MS</span>
 <span style="background: #314C52; color: #EBF0F1; border: 1px solid #C2CED0; padding: 3px 8px; border-radius: 2px; font-family: 'IBM Plex Mono', monospace; font-size: 0.70rem; font-weight: 600;">REACT + FASTAPI SSR</span>
 </div>
 </div>
 `
 }
};

function initEraTimeMachine() {
 const tabButtons = document.querySelectorAll('.era-tab-btn');
 const urlBar = document.getElementById('browserUrlInput');
 const screenContent = document.getElementById('eraScreenContent');

 tabButtons.forEach(btn => {
 btn.addEventListener('click', () => {
 tabButtons.forEach(b => b.classList.remove('active'));
 btn.classList.add('active');

 const eraKey = btn.dataset.era;
 const data = eraData[eraKey];
 if (data) {
 if (urlBar) urlBar.textContent = data.url;
 if (screenContent) screenContent.innerHTML = data.html;
 }
 });
 });
}

/* ==========================================================================
 3. "How the Internet Works in 4 Steps" Packet Simulator
 ========================================================================== */
function initPacketSimulator() {
 const simulateBtn = document.getElementById('simulatePacketBtn');
 const stepCards = document.querySelectorAll('.flow-step-card');
 if (!simulateBtn) return;

 let isRunning = false;

 simulateBtn.addEventListener('click', () => {
 if (isRunning) return;
 isRunning = true;
 simulateBtn.disabled = true;
 simulateBtn.innerHTML = '<span>⏳ Packet Travelling Across Internet...</span>';

 let currentStep = 0;
 stepCards.forEach(c => c.classList.remove('active'));

 const interval = setInterval(() => {
 stepCards.forEach((c, idx) => {
 c.classList.toggle('active', idx === currentStep);
 });

 currentStep++;
 if (currentStep >= stepCards.length) {
 clearInterval(interval);
 setTimeout(() => {
 simulateBtn.disabled = false;
 simulateBtn.innerHTML = '<span> Send Another Test Request</span>';
 isRunning = false;
 }, 1200);
 }
 }, 900);
 });
}

/* ==========================================================================
 4. Browser Evolution Timeline Filter
 ========================================================================== */
const browserMilestones = [
 { name: 'WorldWideWeb', year: 1990, cat: 'pioneers', icon: '', desc: 'The first web browser & editor created by Tim Berners-Lee at CERN.', impact: 'Birth of the Web' },
 { name: 'NCSA Mosaic', year: 1993, cat: 'pioneers', icon: '️', desc: 'First browser to display images inline with text, making the web visual.', impact: 'Visual Revolution' },
 { name: 'Netscape Navigator', year: 1994, cat: 'pioneers', icon: '', desc: 'Introduced JavaScript, cookies, and dominated 90% of the early web.', impact: 'Web Goes Mainstream' },
 { name: 'Internet Explorer', year: 1995, cat: 'wars', icon: '', desc: 'Bundled with Windows, triggering the historic First Browser War.', impact: 'Browser Wars Begin' },
 { name: 'Apple Safari', year: 2003, cat: 'wars', icon: '', desc: 'Pioneered WebKit and opened the door for modern mobile browsing on smartphones.', impact: 'Mobile Web Pioneer' },
 { name: 'Mozilla Firefox', year: 2004, cat: 'wars', icon: '', desc: 'Open-source champion that popularized tabbed browsing and extensions.', impact: 'Open Web Standards' },
 { name: 'Google Chrome', year: 2008, cat: 'modern', icon: '', desc: 'Introduced the ultra-fast V8 JavaScript engine, powering today modern apps.', impact: 'V8 Speed Engine' },
 { name: 'Microsoft Edge', year: 2015, cat: 'modern', icon: '', desc: 'Replaced legacy IE with Chromium-powered performance and modern standards.', impact: 'Modern Web Engine' }
];

function initTimelineFilter() {
 const filterBtns = document.querySelectorAll('.filter-pill-btn');
 const timelineContainer = document.getElementById('timelineCardsContainer');
 if (!timelineContainer) return;

 function renderCards(filter) {
 timelineContainer.innerHTML = '';
 const filtered = filter === 'all' ? browserMilestones : browserMilestones.filter(b => b.cat === filter);

 filtered.forEach(b => {
 const card = document.createElement('div');
 card.className = 'browser-milestone-card';
 card.innerHTML = `
 <div class="card-top">
 <span class="browser-icon-box">${b.icon}</span>
 <span class="browser-year-tag">${b.year}</span>
 </div>
 <h3 class="browser-name">${b.name}</h3>
 <p class="browser-desc">${b.desc}</p>
 <span class="browser-impact-pill">${b.impact}</span>
 `;
 timelineContainer.appendChild(card);
 });
 }

 filterBtns.forEach(btn => {
 btn.addEventListener('click', () => {
 filterBtns.forEach(b => b.classList.remove('active'));
 btn.classList.add('active');
 renderCards(btn.dataset.filter);
 });
 });

 renderCards('all');
}

/* ==========================================================================
 5. 4 Core Pillars Progress Synchronization
 ========================================================================== */
function initPillarsProgress() {
 const isWebsite = localStorage.getItem('readWebsite') === 'true';
 const isHTML = localStorage.getItem('readHTML') === 'true';
 const isCSS = localStorage.getItem('readCSS') === 'true';
 const isJS = localStorage.getItem('readJavaScript') === 'true';
 const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';
 const isL0 = localStorage.getItem('level0_completed') === 'true';

 const count = (isWebsite ? 1 : 0) + (isHTML ? 1 : 0) + (isCSS ? 1 : 0) + (isJS ? 1 : 0);

 const cardWebsite = document.getElementById('cardWebsite');
 const cardHTML = document.getElementById('cardHTML');
 const cardCSS = document.getElementById('cardCSS');
 const cardJS = document.getElementById('cardJS');

 if (cardWebsite && isWebsite) cardWebsite.classList.add('completed');
 if (cardHTML && isHTML) cardHTML.classList.add('completed');
 if (cardCSS && isCSS) cardCSS.classList.add('completed');
 if (cardJS && isJS) cardJS.classList.add('completed');

 const progressCount = document.getElementById('pillarProgressCount');
 const progressFill = document.getElementById('pillarProgressFill');

 if (progressCount) progressCount.textContent = `${count}/4`;
 if (progressFill) progressFill.style.width = `${(count / 4) * 100}%`;

 updateClaimButtonState(count, isQuizComplete, isL0);
}

function updateClaimButtonState(pillarCount, isQuizComplete, isL0) {
 const claimBtn = document.getElementById('claimLevel0Btn');
 if (!claimBtn) return;

 if (isL0) {
 claimBtn.classList.remove('locked');
 claimBtn.innerHTML = '<span> Level 0 Completed (+250 XP Claimed) • Return to Dashboard</span>';
 claimBtn.onclick = () => { window.location.href = '../index.html'; };
 } else if (pillarCount === 4 && isQuizComplete) {
 claimBtn.classList.remove('locked');
 claimBtn.innerHTML = '<span> All Requirements Met! Claim Level 0 (+250 XP) </span>';
 claimBtn.onclick = window.claimLevel0Completion;
 } else {
 claimBtn.classList.add('locked');
 if (pillarCount < 4 && !isQuizComplete) {
 claimBtn.innerHTML = `<span> Complete 4 Pillars (${pillarCount}/4) & Knowledge Challenge to Unlock (+250 XP)</span>`;
 } else if (pillarCount < 4) {
 claimBtn.innerHTML = `<span> Explore Remaining Pillars (${pillarCount}/4) to Unlock (+250 XP)</span>`;
 } else {
 claimBtn.innerHTML = `<span> Complete Knowledge Challenge Below to Unlock (+250 XP)</span>`;
 }

 claimBtn.onclick = () => {
 if (typeof Swal !== 'undefined') {
 const missing = [];
 if (pillarCount < 4) missing.push(`• <strong>Explore 4 Core Pillars:</strong> ${pillarCount}/4 completed (+50 XP each)`);
 if (!isQuizComplete) missing.push(`• <strong>Pass Knowledge Challenge:</strong> Complete the 5-question quiz below (+50 XP)`);

 Swal.fire({
 icon: 'warning',
 title: 'Level 0 Prerequisites Incomplete',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: left; padding: 4px 8px;">
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; margin-bottom: 12px; line-height: 1.5;">
 Complete both milestones below to claim your official <strong>Level 0 (+250 XP)</strong> reward and unlock Level 1 Foundations:
 </p>
 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 12px 14px; font-size: 0.86rem; color: var(--text-title, #20211F); line-height: 1.7;">
 ${missing.join('<br>')}
 </div>
 </div>
 `,
 confirmButtonColor: '#A33B24',
 confirmButtonText: 'Continue Practice →'
 });
 }
 };
 }
}

/* ==========================================================================
 6. Level 0 Knowledge Challenge (Quiz)
 ========================================================================== */
const questions = [
 {
 q: '1. Who invented the World Wide Web and created the first web browser in 1990?',
 options: [
 { text: 'Bill Gates (Microsoft)', correct: false },
 { text: 'Tim Berners-Lee (CERN)', correct: true },
 { text: 'Steve Jobs (Apple)', correct: false },
 { text: 'Brendan Eich (Netscape)', correct: false }
 ],
 explanation: 'Tim Berners-Lee invented HTML, HTTP, and the first web browser (WorldWideWeb) while working at CERN in 1990.'
 },
 {
 q: '2. What breakthrough feature made NCSA Mosaic (1993) famous?',
 options: [
 { text: 'First browser to display images inline with text', correct: true },
 { text: 'First browser to run Python on the backend', correct: false },
 { text: 'First browser to support CSS3 3D animations', correct: false },
 { text: 'First browser to use tabbed windows', correct: false }
 ],
 explanation: 'Mosaic was the first graphical browser to display images directly inline alongside text, transforming the web into a visual medium.'
 },
 {
 q: '3. When you type a URL into your browser, what is the role of the DNS?',
 options: [
 { text: 'To download the images immediately', correct: false },
 { text: 'To translate the human-readable domain name into an IP address', correct: true },
 { text: 'To style the HTML buttons with CSS', correct: false },
 { text: 'To compile JavaScript code', correct: false }
 ],
 explanation: 'The Domain Name System (DNS) acts like the internet phonebook, translating human-friendly names (e.g. google.com) into computer IP addresses (e.g. 142.250.190.46).'
 },
 {
 q: '4. Which language is responsible for the interactive logic and behavior of a webpage?',
 options: [
 { text: 'HTML', correct: false },
 { text: 'CSS', correct: false },
 { text: 'JavaScript', correct: true },
 { text: 'SQL', correct: false }
 ],
 explanation: 'HTML provides structure, CSS provides visual styling, and JavaScript provides dynamic interactivity and client-side logic.'
 },
 {
 q: '5. What revolutionary technology introduced in 2004 allowed web pages to update without reloading?',
 options: [
 { text: 'AJAX (Asynchronous JavaScript and XML)', correct: true },
 { text: 'HTML5 Video tags', correct: false },
 { text: 'CSS Grid layouts', correct: false },
 { text: 'Floppy Disks', correct: false }
 ],
 explanation: 'AJAX allowed Web 2.0 applications (like Gmail and Google Maps) to fetch data in the background and update the DOM without refreshing the entire page.'
 }
];

let currentQuestionIndex = 0;
let quizAnswered = false;
let quizScore = 0;

function initQuizEngine() {
 quizScore = 0;
 loadQuestion(0);
}

function loadQuestion(idx) {
 currentQuestionIndex = idx;
 quizAnswered = false;
 const qData = questions[idx];

 const qBadge = document.getElementById('quizQBadge');
 const qText = document.getElementById('quizQText');
 const optContainer = document.getElementById('quizOptionsContainer');
 const feedbackBox = document.getElementById('quizFeedbackBox');

 const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';

 if (qBadge) {
 qBadge.textContent = isQuizComplete && idx === 0 
 ? ` Challenge Passed (Question 1 of ${questions.length})`
 : `Question ${idx + 1} of ${questions.length}`;
 }
 if (qText) qText.textContent = qData.q;
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
 btn.addEventListener('click', () => handleOptionClick(btn, opt.correct, qData.explanation));
 optContainer.appendChild(btn);
 });
 }
}

function handleOptionClick(selectedBtn, isCorrect, explanation) {
 if (quizAnswered) return;
 quizAnswered = true;

 if (isCorrect) quizScore++;

 const optButtons = document.querySelectorAll('.quiz-opt-btn');
 optButtons.forEach(btn => {
 btn.disabled = true;
 });

 if (isCorrect) {
 selectedBtn.classList.add('correct');
 } else {
 selectedBtn.classList.add('incorrect');
 optButtons.forEach(btn => {
 const match = questions[currentQuestionIndex].options.find(o => o.text === btn.textContent);
 if (match && match.correct) btn.classList.add('correct');
 });
 }

 const isFinalQuestion = currentQuestionIndex === questions.length - 1;

 if (isFinalQuestion) {
 localStorage.setItem('level0_quiz_completed', 'true');
 localStorage.setItem('level0_quiz_score', quizScore.toString());
 initPillarsProgress(); // Re-check and unlock claim button immediately!
 }

 const feedbackBox = document.getElementById('quizFeedbackBox');
 if (feedbackBox) {
 feedbackBox.className = `quiz-feedback-box show ${isCorrect ? 'correct' : 'incorrect'}`;

 if (!isFinalQuestion) {
 feedbackBox.innerHTML = `
 <div style="font-family: var(--font-mono); font-size: 0.76rem; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; color: ${isCorrect ? '#314C52' : '#A33B24'};">
 ${isCorrect ? '[ CORRECT ANSWER ]' : '[ KEY CONCEPT ]'}
 </div>
 <p style="margin: 4px 0 12px 0; color: #20211F; font-size: 0.88rem; line-height: 1.5;">${explanation}</p>
 <button onclick="window.nextQuestion()" style="background: #A33B24; color: #F8F6F1; border: 1px solid #A33B24; padding: 6px 14px; border-radius: 2px; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 600; text-transform: uppercase; cursor: pointer;">
 Next Question 
 </button>
 `;
 } else {
 feedbackBox.innerHTML = `
 <div style="padding: 4px 0;">
 <div style="font-family: var(--font-serif); font-size: 1.2rem; font-weight: 500; color: #314C52; margin-bottom: 6px;">Knowledge Challenge Completed</div>
 <p style="margin: 4px 0 14px 0; color: #686760; font-size: 0.88rem; line-height: 1.5;">
 You scored <strong>${quizScore}/${questions.length} correct</strong>. You have mastered web history, browser evolution, and packet architecture.
 </p>
 <div style="display: flex; gap: 8px; flex-wrap: wrap;">
 <button onclick="window.scrollToClaim()" style="background: #A33B24; color: #F8F6F1; border: 1px solid #A33B24; padding: 8px 16px; border-radius: 2px; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; text-transform: uppercase; cursor: pointer;">
 Proceed to Claim Reward 
 </button>
 <button onclick="window.initQuizEngine()" style="background: #FFFFFF; color: #20211F; border: 1px solid #D5D0C6; padding: 8px 14px; border-radius: 2px; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 600; text-transform: uppercase; cursor: pointer;">
 Retake Quiz
 </button>
 </div>
 </div>
 `;
 }
 }
}

window.nextQuestion = function() {
 const nextIdx = (currentQuestionIndex + 1) % questions.length;
 loadQuestion(nextIdx);
};

window.scrollToClaim = function() {
 const claimSection = document.querySelector('.completion-banner');
 if (claimSection) {
 claimSection.scrollIntoView({ behavior: 'smooth' });
 }
};

/* ==========================================================================
 7. Claim Level 0 Completion & Return to Dashboard (+250 XP)
 ========================================================================== */
window.claimLevel0Completion = function() {
 const isWebsite = localStorage.getItem('readWebsite') === 'true';
 const isHTML = localStorage.getItem('readHTML') === 'true';
 const isCSS = localStorage.getItem('readCSS') === 'true';
 const isJS = localStorage.getItem('readJavaScript') === 'true';
 const isQuizComplete = localStorage.getItem('level0_quiz_completed') === 'true';
 const count = (isWebsite ? 1 : 0) + (isHTML ? 1 : 0) + (isCSS ? 1 : 0) + (isJS ? 1 : 0);

 if (count < 4 || !isQuizComplete) {
 updateClaimButtonState(count, isQuizComplete, false);
 return;
 }

 localStorage.setItem('level0_completed', 'true');
 localStorage.setItem('readWebsite', 'true');
 localStorage.setItem('readHTML', 'true');
 localStorage.setItem('readCSS', 'true');
 localStorage.setItem('readJavaScript', 'true');
 localStorage.setItem('level0_quiz_completed', 'true');

 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'success',
 title: 'Level 0 Milestone Completed',
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.84rem; font-weight: 600; color: #2F5233; background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 6px 14px; border-radius: 2px; display: inline-block; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
 BOUNTY // +250 XP EARNED
 </div>
 <p style="color: var(--text-body, #20211F); font-size: 0.90rem; line-height: 1.55; margin-bottom: 14px;">
 Congratulations! You have mastered the history, architecture, and 4 core pillars of web development. You have earned the <strong>Web Explorer</strong> milestone and unlocked Level 1 HTML Foundations.
 </p>
 </div>
 `,
 showCancelButton: true,
 cancelButtonText: 'Curriculum Roadmap',
 cancelButtonColor: '#BAB4A6',
 confirmButtonText: 'Next: Level 1 (HTML Foundations) →',
 confirmButtonColor: '#A33B24',
 allowOutsideClick: false
 }).then((res) => {
 if (res.isConfirmed) {
 window.location.href = '/foundations.html?track=html';
 } else {
 window.location.href = '/';
 }
 });
 } else {
 window.location.href = '/foundations.html?track=html';
 }
};

/* ==========================================================================
 8. Back to Top Floating Button
 ========================================================================== */
function initBackToTop() {
 const btn = document.getElementById('backToTopBtn');
 if (!btn) return;

 window.addEventListener('scroll', () => {
 if (window.scrollY > 200) {
 btn.classList.add('visible');
 } else {
 btn.classList.remove('visible');
 }
 }, { passive: true });

 btn.addEventListener('click', () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 });
}

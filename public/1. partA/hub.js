/**
 * Foundations Academy Hub Controller (Levels 0–10)
 * Dynamically tracks Core Foundations (0-3) and Advanced Foundations (5-10) progress.
 * Real-time responsive to DevKit unlocks (Ctrl+Alt+D) and quiz completions.
 */

(function() {
 'use strict';

 const coreTracks = [
 {
 id: 0,
 level: 'Level 0',
 title: 'Web Architecture & History',
 xp: 100,
 url: './web_history.html',
 key: 'level0_completed',
 cardId: 'cardL0',
 pillId: 'pillL0',
 actionId: 'actionL0',
 prevTrackKey: null
 },
 {
 id: 1,
 level: 'Level 1',
 title: 'HTML5 Structural Foundations',
 xp: 400,
 url: '../foundations.html?track=html',
 key: 'level1_completed',
 cardId: 'cardL1',
 pillId: 'pillL1',
 actionId: 'actionL1',
 prevTrackKey: 'level0_completed'
 },
 {
 id: 2,
 level: 'Level 2',
 title: 'Modern CSS3 Styling & Layouts',
 xp: 400,
 url: '../foundations.html?track=css',
 key: 'level2_completed',
 cardId: 'cardL2',
 pillId: 'pillL2',
 actionId: 'actionL2',
 prevTrackKey: 'level1_completed'
 },
 {
 id: 3,
 level: 'Level 3',
 title: 'Modern JavaScript (ES6+) Foundations',
 xp: 400,
 url: '../foundations.html?track=js',
 key: 'level3_completed',
 cardId: 'cardL3',
 pillId: 'pillL3',
 actionId: 'actionL3',
 prevTrackKey: 'level2_completed'
 }
 ];

 const advancedTracks = [
 {
 id: 5,
 level: 'Level 5',
 title: 'React & Modern UI',
 url: '../foundations.html?track=react',
 key: 'foundations_react_completed',
 cardId: 'cardL5',
 pillId: 'pillL5',
 actionId: 'actionL5'
 },
 {
 id: 6,
 level: 'Level 6',
 title: 'Python & Server Logic',
 url: '../foundations.html?track=python',
 key: 'foundations_python_completed',
 cardId: 'cardL6',
 pillId: 'pillL6',
 actionId: 'actionL6'
 },
 {
 id: '7A',
 level: 'Level 7A',
 title: 'Cloud & Deployment',
 url: '../foundations.html?track=cloud',
 key: 'foundations_cloud_completed',
 cardId: 'cardL7A',
 pillId: 'pillL7A',
 actionId: 'actionL7A'
 },
 {
 id: '7B',
 level: 'Level 7B',
 title: 'SQL & Databases',
 url: '../foundations.html?track=sql',
 key: 'foundations_sql_completed',
 cardId: 'cardL7B',
 pillId: 'pillL7B',
 actionId: 'actionL7B'
 },
 {
 id: '7C',
 level: 'Level 7C',
 title: 'Next.js & UI Architecture',
 url: '../foundations.html?track=nextjs',
 key: 'foundations_nextjs_completed',
 cardId: 'cardL7C',
 pillId: 'pillL7C',
 actionId: 'actionL7C'
 },
 {
 id: 8,
 level: 'Level 8',
 title: 'Async UI & Live Data',
 url: '../foundations.html?track=async',
 key: 'foundations_async_completed',
 cardId: 'cardL8',
 pillId: 'pillL8',
 actionId: 'actionL8'
 },
 {
 id: 9,
 level: 'Level 9',
 title: 'User Logins & Security UI',
 url: '../foundations.html?track=auth',
 key: 'foundations_auth_completed',
 cardId: 'cardL9',
 pillId: 'pillL9',
 actionId: 'actionL9'
 },
 {
 id: 10,
 level: 'Level 10',
 title: 'SaaS Dashboard UI',
 url: '../foundations.html?track=saas',
 key: 'foundations_saas_completed',
 cardId: 'cardL10',
 pillId: 'pillL10',
 actionId: 'actionL10'
 }
 ];

 function isTrackComplete(key) {
 return localStorage.getItem(key) === 'true';
 }

 function canAccessTrack(track) {
 if (track.id === 0) return true;
 if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;
 if (!track.prevTrackKey) return true;
 return isTrackComplete(track.prevTrackKey);
 }

 function initFoundationsHub() {
 let completedCount = 0;
 let nextAccessibleTrack = coreTracks[0];
 let foundNext = false;

 // 1. Process Core Foundations (0–3)
 coreTracks.forEach(track => {
 const completed = isTrackComplete(track.key);
 const accessible = canAccessTrack(track);

 if (completed) {
 completedCount++;
 } else if (accessible && !foundNext) {
 nextAccessibleTrack = track;
 foundNext = true;
 }

 const card = document.getElementById(track.cardId);
 const pill = document.getElementById(track.pillId);
 const action = document.getElementById(track.actionId);

 if (card && pill && action) {
 if (completed) {
 card.href = track.url;
 pill.className = 'track-status-pill completed';
 pill.textContent = ' Completed';
 action.innerHTML = 'Review Track ';
 card.onclick = null;
 } else if (accessible) {
 card.href = track.url;
 pill.className = 'track-status-pill available';
 pill.textContent = ' Up Next';
 action.innerHTML = 'Start Track ';
 card.onclick = null;
 } else {
 card.href = 'javascript:void(0)';
 card.onclick = (e) => {
 e.preventDefault();
 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'warning',
 title: 'Track Locked',
 text: `Please complete ${track.id === 1 ? 'Level 0' : `Level ${track.id - 1}`} before unlocking this track.`,
 confirmButtonColor: '#A33B24',
 confirmButtonText: 'Acknowledge'
 });
 }
 };
 pill.className = 'track-status-pill locked';
 pill.textContent = 'LOCKED';
 action.innerHTML = 'Locked';
 }
 }
 });

 // 2. Process Advanced Foundations (5–10)
 advancedTracks.forEach(track => {
 const completed = isTrackComplete(track.key);
 const card = document.getElementById(track.cardId);
 const pill = document.getElementById(track.pillId);
 const action = document.getElementById(track.actionId);

 if (card && pill && action) {
 if (completed) {
 card.href = track.url;
 pill.className = 'track-status-pill completed';
 pill.textContent = ' Completed';
 action.innerHTML = 'Review Track ';
 } else {
 card.href = track.url;
 pill.className = 'track-status-pill available';
 pill.textContent = ' Available';
 action.innerHTML = 'Start Track ';
 }
 }
 });

 // 3. Progress Bar (Core Foundations 0–3)
 const total = coreTracks.length;
 const pct = Math.round((completedCount / total) * 100);

 const progressFill = document.getElementById('heroProgressFill');
 const progressText = document.getElementById('heroProgressText');
 const statCompleted = document.getElementById('statCompletedTracks');

 if (progressFill) progressFill.style.width = `${pct}%`;
 if (progressText) progressText.textContent = `${completedCount} of ${total} Tracks Completed (${pct}%)`;
 if (statCompleted) statCompleted.textContent = `${completedCount} / ${total}`;

 // 4. Smart Resume CTA
 const resumeBtn = document.getElementById('heroResumeBtn');
 if (resumeBtn) {
 if (completedCount === total) {
 resumeBtn.href = '../2. partB/hub.html';
 resumeBtn.innerHTML = '<span>️ Enter Level 4: DOM Dojo </span>';
 } else if (completedCount === 0) {
 resumeBtn.href = './web_history.html';
 resumeBtn.innerHTML = '<span> Start Level 0: Web History </span>';
 } else {
 resumeBtn.href = nextAccessibleTrack.url;
 resumeBtn.innerHTML = `<span> Continue ${nextAccessibleTrack.level}: ${nextAccessibleTrack.title} </span>`;
 }
 }

 // 5. Header User Stats
 if (typeof window.getUserXPAndRank === 'function') {
 const stats = window.getUserXPAndRank();
 const xpLabel = document.getElementById('userXpLabel');
 if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;

 const rankLabel = document.getElementById('userRankLabel');
 if (rankLabel) rankLabel.textContent = stats.rankTitle;

 const rankIcon = document.getElementById('userRankIcon');
 if (rankIcon) rankIcon.textContent = stats.rankIcon;
 }
 }

 document.addEventListener('DOMContentLoaded', initFoundationsHub);
 window.addEventListener('novicodes:xp_updated', initFoundationsHub);
 window.addEventListener('storage', initFoundationsHub);
})();

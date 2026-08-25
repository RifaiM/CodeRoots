/**
 * NoviCodes - Daily Streaks & 2-Minute Warmup Quest Engine
 * Provides returning learner retention, daily code rituals, and gamified XP progression.
 */

(function () {
 'use strict';

 // ── Helper: Format YYYY-MM-DD ──
 function getTodayDateString() {
 const d = new Date();
 const year = d.getFullYear();
 const month = String(d.getMonth() + 1).padStart(2, '0');
 const day = String(d.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
 }

 function getYesterdayDateString() {
 const d = new Date();
 d.setDate(d.getDate() - 1);
 const year = d.getFullYear();
 const month = String(d.getMonth() + 1).padStart(2, '0');
 const day = String(d.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
 }

 function getDayOfYear() {
 const now = new Date();
 const start = new Date(now.getFullYear(), 0, 0);
 const diff = now - start;
 const oneDay = 1000 * 60 * 60 * 24;
 return Math.floor(diff / oneDay);
 }

 // ── Get Streak State from LocalStorage ──
 window.getStreakData = function () {
 const currentStreak = parseInt(localStorage.getItem('novicodes_streak_count') || '0', 10);
 const longestStreak = parseInt(localStorage.getItem('novicodes_longest_streak') || '0', 10);
 const lastDate = localStorage.getItem('novicodes_last_quest_date') || '';
 const dailyQuestXP = parseInt(localStorage.getItem('novicodes_daily_quest_xp') || '0', 10);
 const streakBonusXP = parseInt(localStorage.getItem('novicodes_streak_bonus_xp') || '0', 10);
 const freezeAvailable = localStorage.getItem('novicodes_streak_freeze') !== 'false';

 return {
 currentStreak,
 longestStreak,
 lastDate,
 dailyQuestXP,
 streakBonusXP,
 freezeAvailable,
 isTodayCompleted: lastDate === getTodayDateString()
 };
 };

 // ── Retrieve Today's Active Quest ──
 window.getTodayDailyQuest = function () {
 const bank = window.DAILY_QUESTS_BANK || [];
 if (bank.length === 0) return null;
 const dayIndex = getDayOfYear() % bank.length;
 return bank[dayIndex];
 };

 // ── Submit Answer & Process Streak & Rewards ──
 window.submitDailyQuestAnswer = function (selectedOptionIndex) {
 const quest = window.getTodayDailyQuest();
 if (!quest) return;

 const streakData = window.getStreakData();
 if (streakData.isTodayCompleted) {
 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'info',
 title: 'Exercise Already Completed',
 text: 'You have already solved today\'s quest and extended your streak. A new exercise unlocks tomorrow.',
 confirmButtonColor: '#A33B24',
 confirmButtonText: 'Acknowledge'
 });
 }
 return;
 }

 const isCorrect = selectedOptionIndex === quest.correctIndex;
 const optionBtns = document.querySelectorAll('.quest-option-btn');

 optionBtns.forEach((btn, idx) => {
 btn.disabled = true;
 if (idx === quest.correctIndex) {
 btn.classList.add('correct');
 btn.innerHTML = `<span class="opt-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg></span> <span>${escapeHtml(quest.options[idx])}</span>`;
 } else if (idx === selectedOptionIndex) {
 btn.classList.add('incorrect');
 btn.innerHTML = `<span class="opt-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg></span> <span>${escapeHtml(quest.options[idx])}</span>`;
 }
 });

 if (!isCorrect) {
 // Friendly retry option
 setTimeout(() => {
 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'warning',
 title: 'Incorrect Selection',
 html: `
 <div style="text-align: left; font-family: var(--font-sans, sans-serif);">
 <p style="font-size: 0.90rem; color: var(--text-body, #20211F); margin-bottom: 12px;">
 <strong>${escapeHtml(quest.options[selectedOptionIndex])}</strong> is not the intended solution.
 </p>
 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 12px; font-size: 0.86rem; color: var(--text-body, #20211F); line-height: 1.55;">
 <strong style="font-family: var(--font-mono, monospace); font-size: 0.74rem; text-transform: uppercase; color: var(--accent-oxide, #A33B24);">TECHNICAL HINT:</strong><br>${escapeHtml(quest.explanation)}
 </div>
 </div>
 `,
 confirmButtonText: 'Try Again →',
 confirmButtonColor: '#A33B24'
 }).then(() => {
 optionBtns.forEach((btn, idx) => {
 btn.disabled = false;
 btn.classList.remove('incorrect', 'correct');
 btn.innerHTML = `<span class="opt-icon">${String.fromCharCode(65 + idx)}</span> <span>${escapeHtml(quest.options[idx])}</span>`;
 });
 });
 }
 }, 600);
 return;
 }

 // --- Correct Answer Flow ---
 const todayStr = getTodayDateString();
 const yesterdayStr = getYesterdayDateString();

 let newStreak = streakData.currentStreak;
 if (streakData.lastDate === yesterdayStr) {
 newStreak += 1;
 } else if (streakData.lastDate === todayStr) {
 // already completed (guarded above)
 } else {
 // first time or streak restarted
 newStreak = 1;
 }

 const newLongest = Math.max(newStreak, streakData.longestStreak);
 const newDailyXP = streakData.dailyQuestXP + 50;

 let bonusXP = 0;
 let milestoneTitle = '';

 if (newStreak === 3) {
 bonusXP = 100;
 milestoneTitle = ' 3-Day Spark Milestone (+100 Bonus XP)!';
 } else if (newStreak === 7) {
 bonusXP = 250;
 milestoneTitle = ' 7-Day Flame Milestone (+250 Bonus XP)!';
 } else if (newStreak === 14) {
 bonusXP = 500;
 milestoneTitle = ' 14-Day Inferno Milestone (+500 Bonus XP)!';
 }

 const newBonusXP = streakData.streakBonusXP + bonusXP;

 // Save State
 localStorage.setItem('novicodes_streak_count', newStreak.toString());
 localStorage.setItem('novicodes_longest_streak', newLongest.toString());
 localStorage.setItem('novicodes_last_quest_date', todayStr);
 localStorage.setItem('novicodes_daily_quest_xp', newDailyXP.toString());
 if (bonusXP > 0) {
 localStorage.setItem('novicodes_streak_bonus_xp', newBonusXP.toString());
 }

 // Trigger Confetti Celebration
 triggerQuestConfetti();

 // Refresh Header Badges Live
 if (typeof window.updateHeaderStats === 'function') {
 window.updateHeaderStats();
 } else if (typeof window.initUserProgress === 'function') {
 window.initUserProgress();
 }

 // Direct DOM update guarantee & visual pop animation
 const xpBadgeEl = document.querySelector('.xp-badge');
 const xpLabelEl = document.querySelector('.xp-badge .badge-label') || document.getElementById('userXpLabel');
 if (typeof window.getUserXPAndRank === 'function' && xpLabelEl) {
 const stats = window.getUserXPAndRank();
 xpLabelEl.textContent = `${stats.totalXP.toLocaleString()} XP`;
 const rankLabel = document.getElementById('userRankLabel');
 const rankIcon = document.getElementById('userRankIcon');
 if (rankLabel) rankLabel.textContent = stats.rankTitle;
 if (rankIcon) rankIcon.textContent = stats.rankIcon;
 }

 if (xpBadgeEl) {
 xpBadgeEl.classList.remove('xp-reward-pulse');
 void xpBadgeEl.offsetWidth; // Force CSS reflow
 xpBadgeEl.classList.add('xp-reward-pulse');
 }

 updateStreakHeaderBadge();

 try {
 window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));
 } catch (e) {}

 // Show Celebration Modal
 setTimeout(() => {
 const totalAwarded = 50 + bonusXP;
 if (typeof Swal !== 'undefined') {
 Swal.fire({
 icon: 'success',
 title: milestoneTitle ? milestoneTitle : ` ${newStreak}-Day Streak Extended!`,
 html: `
 <div style="font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 12px; text-transform: uppercase;">BOUNTY EARNED // <strong style="color: var(--accent-oxide);">+${totalAwarded} XP</strong></div>
 <div style="background: var(--canvas-base); border: 1px solid var(--border-subtle); border-radius: 2px; padding: 14px; text-align: left; font-size: 0.88rem; line-height: 1.6; color: var(--text-body);">
 <strong style="font-family: var(--font-mono); font-size: 0.76rem; text-transform: uppercase; color: var(--accent-oxide);">SOLUTION ANALYSIS:</strong><br>${escapeHtml(quest.explanation)}
 </div>
 <p style="margin-top: 14px; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.76rem; text-transform: uppercase;">NEXT EXERCISE UNLOCKS AT 00:00 UTC</p>
 `,
 confirmButtonText: 'CONTINUE →',
 confirmButtonColor: '#A33B24'
 }).then(() => {
 renderDailyQuestCard();
 });
 } else {
 renderDailyQuestCard();
 }
 }, 500);
 };

 // ── Render Daily Quest Card on Dashboard ──
 window.renderDailyQuestCard = function () {
 const container = document.getElementById('dailyQuestCardContainer');
 if (!container) return;

 const quest = window.getTodayDailyQuest();
 if (!quest) return;

 const streakData = window.getStreakData();
 const isCompleted = streakData.isTodayCompleted;

 if (isCompleted) {
 container.innerHTML = `
 <div class="daily-quest-card completed-card">
 <div class="quest-card-header">
 <div class="quest-header-left">
 <span class="quest-pill-completed">STATUS // COMPLETED</span>
 <span class="quest-category-badge">${escapeHtml(quest.category)}</span>
 </div>
 <div class="quest-streak-badge">
 <span class="streak-num">STREAK // ${streakData.currentStreak} DAYS</span>
 </div>
 </div>

 <div class="quest-completed-body">
 <h3 class="quest-title">Daily +50 XP Bounty Claimed</h3>
 <p class="quest-question">Challenge: <em>"${escapeHtml(quest.title)}"</em></p>
 
 <div class="quest-explanation-banner">
 <strong>SOLUTION ANALYSIS:</strong> ${escapeHtml(quest.explanation)}
 </div>

 <div class="next-quest-countdown-box">
 <span class="countdown-label">NEXT EXERCISE UNLOCKS IN:</span>
 <span class="countdown-timer" id="dailyQuestCountdown">--:--:--</span>
 </div>
 </div>
 </div>
 `;
 startCountdownTimer();
 return;
 }

 // Active State Card
 container.innerHTML = `
 <div class="daily-quest-card active-card">
 <div class="quest-card-header">
 <div class="quest-header-left">
 <span class="quest-pill-active">EXERCISE // DAILY BUG AUDIT</span>
 <span class="quest-category-badge">${escapeHtml(quest.category)}</span>
 </div>
 <div class="quest-reward-pill">
 <span>+50 XP BOUNTY</span>
 </div>
 </div>

 <div class="quest-card-body">
 <h3 class="quest-title">${escapeHtml(quest.title)}</h3>
 <p class="quest-question">${escapeHtml(quest.question)}</p>

 ${quest.codeSnippet ? `
 <div class="quest-code-box">
 <pre><code>${escapeHtml(quest.codeSnippet)}</code></pre>
 </div>
 ` : ''}

 <div class="quest-options-grid">
 ${quest.options.map((opt, idx) => `
 <button class="quest-option-btn" onclick="submitDailyQuestAnswer(${idx})">
 <span class="opt-icon">[ ${String.fromCharCode(65 + idx)} ]</span>
 <span class="opt-text">${escapeHtml(opt)}</span>
 </button>
 `).join('')}
 </div>
 </div>

 <div class="quest-card-footer">
 <div class="quest-footer-hint">
 <span>DAILY RETENTION CHALLENGE • 2-MINUTE AUDIT</span>
 </div>
 <div class="quest-footer-streak">
 <span>CURRENT STREAK: <strong>${streakData.currentStreak} DAYS</strong></span>
 </div>
 </div>
 </div>
 `;
 };

 // ── Live Countdown Timer to Midnight ──
 function startCountdownTimer() {
 const timerEl = document.getElementById('dailyQuestCountdown');
 if (!timerEl) return;

 function updateTimer() {
 const now = new Date();
 const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
 const diff = tomorrow - now;

 if (diff <= 0) {
 renderDailyQuestCard();
 return;
 }

 const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
 const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
 const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

 timerEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
 }

 updateTimer();
 setInterval(updateTimer, 1000);
 }

 // ── Update Header Streak Badge ──
 function updateStreakHeaderBadge() {
 const streakData = window.getStreakData();
 const badge = document.getElementById('headerStreakBadge');
 const numVal = document.querySelector('#userStreakLabel .streak-num-val');
 const daysText = document.querySelector('#userStreakLabel .streak-days-text');
 const label = document.getElementById('userStreakLabel');

 if (numVal) {
 numVal.textContent = streakData.currentStreak;
 } else if (label) {
 label.innerHTML = `<span class="streak-num-val">${streakData.currentStreak}</span>d<span class="streak-days-text">&nbsp;streak</span>`;
 }

 if (badge) {
 badge.style.display = 'inline-flex';
 if (streakData.isTodayCompleted) {
 badge.classList.add('streak-active-today');
 } else {
 badge.classList.remove('streak-active-today');
 }
 }
 }

 // ── Open Streak Calendar & Rewards Modal ──
 window.openStreakModal = function () {
 const streakData = window.getStreakData();

 const milestones = [
 { days: 3, xp: 100, title: '3-Day Retention Milestone', sub: '3 consecutive daily exercises' },
 { days: 7, xp: 250, title: '7-Day Retention Milestone', sub: '7 consecutive daily exercises' },
 { days: 14, xp: 500, title: '14-Day Retention Milestone', sub: '14 consecutive daily exercises' }
 ];

 const milestonesHTML = milestones.map((m, idx) => {
 const isUnlocked = streakData.currentStreak >= m.days;
 const bg = isUnlocked ? 'background: var(--card-bg, #FFFFFF); border: 1px solid var(--border-dark, #BAB4A6);' : 'background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6);';
 const badgeBg = isUnlocked ? 'background: var(--accent-slate, #314C52); color: #F8F6F1;' : 'background: var(--border-hairline, #E5E1D8); color: var(--text-muted, #686760);';

 return `
 <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; ${bg} border-radius: 2px;">
 <div style="text-align: left;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.70rem; color: var(--text-muted, #686760); text-transform: uppercase;">§ 0${idx + 1} // ${m.days}-DAY GOAL</div>
 <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-title, #20211F);">${m.title}</div>
 <div style="font-size: 0.74rem; color: var(--text-muted, #686760);">${m.sub}</div>
 </div>
 <span style="${badgeBg} font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 600; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.04em;">
 ${isUnlocked ? 'CLAIMED' : `+${m.xp} XP`}
 </span>
 </div>
 `;
 }).join('');

 if (typeof Swal !== 'undefined') {
 Swal.fire({
 title: 'Daily Retention Streak & Milestones',
 customClass: {
 popup: 'responsive-profile-modal responsive-streak-modal'
 },
 scrollbarPadding: false,
 showCloseButton: true,
 html: `
 <div style="font-family: var(--font-sans, sans-serif); text-align: left;">
 
 <!-- 2-Column Streak Stats -->
 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 14px; text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 600; color: var(--accent-oxide, #A33B24); text-transform: uppercase; letter-spacing: 0.04em;">CURRENT STREAK</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 1.8rem; font-weight: 600; color: var(--text-title, #20211F); margin: 2px 0;">${streakData.currentStreak} DAYS</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">${streakData.isTodayCompleted ? 'COMPLETED TODAY' : 'PENDING TODAY'}</div>
 </div>
 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 14px; text-align: center;">
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 600; color: var(--text-muted, #686760); text-transform: uppercase; letter-spacing: 0.04em;">LONGEST STREAK</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 1.8rem; font-weight: 600; color: var(--text-title, #20211F); margin: 2px 0;">${streakData.longestStreak} DAYS</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">PERSONAL RECORD</div>
 </div>
 </div>

 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 600; color: var(--text-muted, #686760); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
 01 / MILESTONE BOUNTIES
 </div>
 <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
 ${milestonesHTML}
 </div>

 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); border-radius: 2px; padding: 10px 14px; font-family: var(--font-mono, monospace); font-size: 0.74rem; color: var(--text-muted, #686760); text-align: center; text-transform: uppercase; letter-spacing: 0.03em;">
 STREAK SAVER // Complete 1 daily exercise every 24 hours to maintain your progression.
 </div>
 </div>
 `,
 confirmButtonText: 'CONTINUE →',
 confirmButtonColor: '#A33B24'
 });
 }
 };

 // ── Confetti Animation Trigger ──
 function triggerQuestConfetti() {
 if (typeof confetti === 'function') {
 confetti({
 particleCount: 80,
 spread: 70,
 origin: { y: 0.6 }
 });
 }
 }

 // ── Helper: Escape HTML ──
 function escapeHtml(str) {
 if (!str) return '';
 return String(str)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;')
 .replace(/'/g, '&#039;');
 }

 // ── Init on DOM Ready ──
 document.addEventListener('DOMContentLoaded', () => {
 updateStreakHeaderBadge();
 renderDailyQuestCard();
 });

})();

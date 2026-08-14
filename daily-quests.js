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
                    title: '⚡ Already Completed Today!',
                    text: 'You have already solved today\'s quest and extended your streak. Come back tomorrow for a new quest!',
                    confirmButtonColor: '#2563eb'
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
                btn.innerHTML = `<span class="opt-icon">✅</span> <span>${escapeHtml(quest.options[idx])}</span>`;
            } else if (idx === selectedOptionIndex) {
                btn.classList.add('incorrect');
                btn.innerHTML = `<span class="opt-icon">❌</span> <span>${escapeHtml(quest.options[idx])}</span>`;
            }
        });

        if (!isCorrect) {
            // Friendly retry option
            setTimeout(() => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Almost there!',
                        html: `<strong>${escapeHtml(quest.options[selectedOptionIndex])}</strong> is not quite right.<br><br><div style="text-align:left; background:#eff6ff; padding:12px; border-radius:8px; font-size:0.88rem; color:#1e3a8a;"><strong>💡 Hint:</strong> ${escapeHtml(quest.explanation)}</div>`,
                        confirmButtonText: '🔄 Try Again',
                        confirmButtonColor: '#2563eb'
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
            milestoneTitle = '🔥 3-Day Spark Milestone (+100 Bonus XP)!';
        } else if (newStreak === 7) {
            bonusXP = 250;
            milestoneTitle = '🌋 7-Day Flame Milestone (+250 Bonus XP)!';
        } else if (newStreak === 14) {
            bonusXP = 500;
            milestoneTitle = '👑 14-Day Inferno Milestone (+500 Bonus XP)!';
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

        // Show Celebration Modal
        setTimeout(() => {
            const totalAwarded = 50 + bonusXP;
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: milestoneTitle ? milestoneTitle : `🔥 ${newStreak}-Day Streak Extended!`,
                    html: `
                        <div style="font-size: 1.1rem; margin-bottom: 12px;">You earned <strong style="color: #2563eb;">+${totalAwarded} XP</strong> today!</div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: left; font-size: 0.88rem; line-height: 1.6; color: #334155;">
                            <strong>💡 Key Takeaway:</strong><br>${escapeHtml(quest.explanation)}
                        </div>
                        <p style="margin-top: 14px; color: #64748b; font-size: 0.84rem;">Come back tomorrow at midnight for your next daily quest! ⏰</p>
                    `,
                    confirmButtonText: '⚡ Awesome, Keep Going!',
                    confirmButtonColor: '#2563eb'
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
                            <span class="quest-pill-completed">✅ Today's Quest Completed</span>
                            <span class="quest-category-badge">${escapeHtml(quest.category)}</span>
                        </div>
                        <div class="quest-streak-badge">
                            <span class="streak-flame">🔥</span>
                            <span class="streak-num">${streakData.currentStreak}-Day Streak</span>
                        </div>
                    </div>

                    <div class="quest-completed-body">
                        <div class="completed-check-icon">🏆</div>
                        <h3>You've claimed today's +50 XP!</h3>
                        <p>Your coding habit is on fire! Today's challenge was: <em>"${escapeHtml(quest.title)}"</em>.</p>
                        
                        <div class="quest-explanation-banner">
                            <strong>💡 Solution Summary:</strong> ${escapeHtml(quest.explanation)}
                        </div>

                        <div class="next-quest-countdown-box">
                            <span class="countdown-label">⏰ Next Daily Quest Unlocks In:</span>
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
                        <span class="quest-pill-active"><span class="pulse-dot"></span> Daily 2-Min Quest</span>
                        <span class="quest-category-badge">${escapeHtml(quest.category)}</span>
                    </div>
                    <div class="quest-reward-pill">
                        <span>⚡ +50 XP</span>
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
                                <span class="opt-icon">${String.fromCharCode(65 + idx)}</span>
                                <span class="opt-text">${escapeHtml(opt)}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="quest-card-footer">
                    <div class="quest-footer-hint">
                        <span>🎯 Test your skills in 2 minutes & maintain your daily streak!</span>
                    </div>
                    <div class="quest-footer-streak">
                        <span>Current Streak: <strong>🔥 ${streakData.currentStreak} Days</strong></span>
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

        if (numVal && daysText) {
            numVal.textContent = streakData.currentStreak;
            daysText.textContent = streakData.currentStreak === 1 ? ' Day' : ' Days';
        } else if (label) {
            label.innerHTML = `<span class="streak-num-val">${streakData.currentStreak}</span><span class="streak-days-text">${streakData.currentStreak === 1 ? ' Day' : ' Days'}</span>`;
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
            { days: 3, xp: 100, title: '🔥 3-Day Spark', icon: '✨' },
            { days: 7, xp: 250, title: '🌋 7-Day Flame', icon: '🌟' },
            { days: 14, xp: 500, title: '👑 14-Day Inferno', icon: '💎' }
        ];

        let milestonesHTML = milestones.map(m => {
            const isUnlocked = streakData.currentStreak >= m.days || streakData.longestStreak >= m.days;
            return `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; background:${isUnlocked ? '#eff6ff' : '#f8fafc'}; border:1px solid ${isUnlocked ? '#bfdbfe' : '#e2e8f0'}; border-radius:10px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:1.4rem;">${m.icon}</span>
                        <div>
                            <div style="font-weight:800; font-size:0.9rem; color:#0f172a;">${m.title}</div>
                            <div style="font-size:0.78rem; color:#64748b;">${m.days} consecutive daily quests</div>
                        </div>
                    </div>
                    <div>
                        <span style="background:${isUnlocked ? '#2563eb' : '#cbd5e1'}; color:white; font-size:0.78rem; font-weight:800; padding:4px 10px; border-radius:20px;">
                            ${isUnlocked ? 'CLAIMED ✅' : `+${m.xp} XP`}
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: '🔥 Daily Coding Streak & Rewards',
                customClass: {
                    popup: 'responsive-profile-modal responsive-streak-modal'
                },
                scrollbarPadding: false,
                showCloseButton: true,
                html: `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
                        <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:12px; padding:14px; text-align:center;">
                            <div style="font-size:0.78rem; font-weight:800; color:#ea580c; text-transform:uppercase;">Current Streak</div>
                            <div style="font-size:1.8rem; font-weight:900; color:#c2410c; margin-top:2px;">🔥 ${streakData.currentStreak}</div>
                            <div style="font-size:0.75rem; color:#9a3412;">${streakData.isTodayCompleted ? 'Completed Today ✅' : 'Pending Today ⏳'}</div>
                        </div>
                        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; padding:14px; text-align:center;">
                            <div style="font-size:0.78rem; font-weight:800; color:#2563eb; text-transform:uppercase;">Longest Streak</div>
                            <div style="font-size:1.8rem; font-weight:900; color:#1e40af; margin-top:2px;">🏆 ${streakData.longestStreak}</div>
                            <div style="font-size:0.75rem; color:#1d4ed8;">Personal Record</div>
                        </div>
                    </div>

                    <div style="text-align:left; margin-bottom:8px; font-weight:800; font-size:0.86rem; color:#475569;">
                        🎯 Milestone Streak Bonuses:
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px;">
                        ${milestonesHTML}
                    </div>

                    <div style="background:#f1f5f9; border-radius:10px; padding:10px 14px; margin-top:10px; font-size:0.80rem; color:#64748b; text-align:center;">
                        🛡️ <strong>Streak Saver Active:</strong> Complete a 2-minute quest every 24 hours to keep your flame blazing!
                    </div>
                `,
                confirmButtonText: '⚡ Got It!',
                confirmButtonColor: '#2563eb'
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

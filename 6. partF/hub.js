/**
 * Level 7 Specialization Hub Engine
 * Dynamically tracks 7A, 7B, 7C branch progress, active lesson URLs, and individual syllabus lock/completion states.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHubProgress();
});

function initHubProgress() {
    const isPracticeUnlocked = localStorage.getItem('practice_mode_unlocked') === 'true';

    // Helper to update a branch's syllabus
    function updateBranch(branchKey, countElId, btnId, prefix, totalLessons = 6) {
        let completedCount = 0;
        let activeLesson = 1;
        let foundActive = false;

        for (let i = 1; i <= totalLessons; i++) {
            const isCompleted = localStorage.getItem(`partF_${branchKey}_lesson${i}_complete`) === 'true' || 
                                localStorage.getItem(`partF_${branchKey}_lesson${i}_completed`) === 'true';
            
            const isAccessible = i === 1 || isPracticeUnlocked || 
                                 localStorage.getItem(`partF_${branchKey}_lesson${i - 1}_complete`) === 'true' || 
                                 localStorage.getItem(`partF_${branchKey}_lesson${i - 1}_completed`) === 'true';

            if (isCompleted) {
                completedCount++;
            } else if (isAccessible && !foundActive) {
                activeLesson = i;
                foundActive = true;
            }

            // Update individual syllabus item in DOM
            const itemEl = document.getElementById(`item${prefix}_${i}`);
            const statEl = document.getElementById(`stat${prefix}_${i}`);

            if (itemEl && statEl) {
                if (isCompleted) {
                    itemEl.className = 'syllabus-item completed';
                    itemEl.href = `./${branchKey.toLowerCase().replace('branch', 'branch')}/lesson${i}_remake.html`;
                    statEl.textContent = '✅ Completed';
                    statEl.style.color = '#34d399';
                } else if (isAccessible) {
                    itemEl.className = 'syllabus-item available';
                    itemEl.href = `./${branchKey.toLowerCase().replace('branch', 'branch')}/lesson${i}_remake.html`;
                    statEl.textContent = '⚡ Up Next';
                    statEl.style.color = '#38bdf8';
                } else {
                    itemEl.className = 'syllabus-item locked';
                    itemEl.href = 'javascript:void(0)';
                    itemEl.onclick = (e) => {
                        e.preventDefault();
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: '🔒 Lesson Locked',
                                text: `Please complete Lesson ${i - 1} before accessing Lesson ${i}.`,
                                confirmButtonColor: '#7e22ce'
                            });
                        }
                    };
                    statEl.textContent = '🔒 Locked';
                    statEl.style.color = '#94a3b8';
                }
            }
        }

        if (completedCount >= totalLessons) {
            activeLesson = totalLessons;
        }

        // Update fill bar
        const fillEl = document.getElementById(countElId);
        if (fillEl) fillEl.style.width = `${(completedCount / totalLessons) * 100}%`;

        // Update action button
        const btnEl = document.getElementById(btnId);
        if (btnEl) {
            btnEl.href = `./${branchKey.toLowerCase().replace('branch', 'branch')}/lesson${activeLesson}_remake.html`;
            const icon = prefix === '7A' ? '☁️' : prefix === '7B' ? '🛢️' : '⚡';
            btnEl.querySelector('span').textContent = completedCount >= totalLessons 
                ? `✅ Track ${prefix} Completed` 
                : `${icon} Launch Track ${prefix} (Lesson ${activeLesson}/6)`;
        }
    }

    // 1. Branch 7A
    updateBranch('branchA', 'fillBranch7A', 'btnBranch7A', '7A');

    // 2. Branch 7B
    updateBranch('branchB', 'fillBranch7B', 'btnBranch7B', '7B');

    // 3. Branch 7C
    updateBranch('branchC', 'fillBranch7C', 'btnBranch7C', '7C');

    // Header User Stats
    if (typeof window.getUserXPAndRank === 'function') {
        const stats = window.getUserXPAndRank();
        const xpLabel = document.getElementById('userXpLabel') || document.querySelector('.xp-badge .badge-label');
        if (xpLabel) xpLabel.textContent = `${stats.totalXP.toLocaleString()} XP`;

        const rankLabel = document.getElementById('userRankLabel') || document.querySelector('.level-badge .badge-label');
        if (rankLabel) rankLabel.textContent = stats.rankTitle;

        const rankIcon = document.getElementById('userRankIcon') || document.querySelector('.level-badge .badge-icon');
        if (rankIcon) rankIcon.textContent = stats.rankIcon;
    }
}

/* ==========================================================================
   Level 7 Specialization Hub Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHubProgress();
});

function initHubProgress() {
    // 1. Calculate Branch 7A progress (Cloud & DevOps)
    let count7A = 0;
    let active7A = 1;
    for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem(`partF_branchA_lesson${i}_complete`) === 'true' || localStorage.getItem(`partF_branchA_lesson${i}_completed`) === 'true') {
            count7A++;
            active7A = Math.min(i + 1, 6);
        }
    }

    // 2. Calculate Branch 7B progress (Databases & Auth)
    let count7B = 0;
    let active7B = 1;
    for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem(`partF_branchB_lesson${i}_complete`) === 'true' || localStorage.getItem(`partF_branchB_lesson${i}_completed`) === 'true') {
            count7B++;
            active7B = Math.min(i + 1, 6);
        }
    }

    // 3. Calculate Branch 7C progress (Next.js & SSR)
    let count7C = 0;
    let active7C = 1;
    for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem(`partF_branchC_lesson${i}_complete`) === 'true' || localStorage.getItem(`partF_branchC_lesson${i}_completed`) === 'true') {
            count7C++;
            active7C = Math.min(i + 1, 6);
        }
    }

    // Update Progress Fill Bars
    const fill7A = document.getElementById('fillBranch7A');
    if (fill7A) fill7A.style.width = `${(count7A / 6) * 100}%`;

    const fill7B = document.getElementById('fillBranch7B');
    if (fill7B) fill7B.style.width = `${(count7B / 6) * 100}%`;

    const fill7C = document.getElementById('fillBranch7C');
    if (fill7C) fill7C.style.width = `${(count7C / 6) * 100}%`;

    // Update Target Links & Button Text
    const btn7A = document.getElementById('btnBranch7A');
    if (btn7A) {
        btn7A.href = `./branchA/lesson${active7A}_remake.html`;
        btn7A.querySelector('span').textContent = count7A >= 6 ? '✅ Track 7A Completed' : `☁️ Launch Track 7A (Lesson ${active7A}/6)`;
    }

    const btn7B = document.getElementById('btnBranch7B');
    if (btn7B) {
        btn7B.href = `./branchB/lesson${active7B}_remake.html`;
        btn7B.querySelector('span').textContent = count7B >= 6 ? '✅ Track 7B Completed' : `🛢️ Launch Track 7B (Lesson ${active7B}/6)`;
    }

    const btn7C = document.getElementById('btnBranch7C');
    if (btn7C) {
        btn7C.href = `./branchC/lesson${active7C}_remake.html`;
        btn7C.querySelector('span').textContent = count7C >= 6 ? '✅ Track 7C Completed' : `⚡ Launch Track 7C (Lesson ${active7C}/6)`;
    }

    // Header User Stats
    if (typeof window.getUserXPAndRank === 'function') {
        const stats = window.getUserXPAndRank();
        const rankLabel = document.getElementById('hubUserRankLabel');
        if (rankLabel) {
            rankLabel.textContent = `${stats.rankIcon} ${stats.rankTitle} • ${stats.totalXP.toLocaleString()} XP`;
        }
    }
}

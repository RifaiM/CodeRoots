/**
 * NoviCodes - Level 0 Shared Profile & XP Modal Helper
 * Powers live XP calculation and modal across Level 0 Concept pages
 */

window.getUserXPAndRank = function() {
    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        try {
            const isComp = localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === '1';
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

    let l7BranchA = 0, l7BranchB = 0, l7BranchC = 0;
    for (let i = 1; i <= 6; i++) {
        try {
            if (localStorage.getItem(`partF_branchA_lesson${i}_complete`) === 'true') l7BranchA++;
            if (localStorage.getItem(`partF_branchB_lesson${i}_complete`) === 'true') l7BranchB++;
            if (localStorage.getItem(`partF_branchC_lesson${i}_complete`) === 'true') l7BranchC++;
        } catch (e) {}
    }
    const l7Completed = l7BranchA + l7BranchB + l7BranchC;

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);
    totalXP += (l6Completed * 200);
    totalXP += (l7Completed * 250);

    let rankTitle = 'Web Novice';
    let rankIcon = '🌱';
    if (l7BranchA >= 6 && l7BranchB >= 6 && l7BranchC >= 6) {
        rankTitle = 'Principal Polymath';
        rankIcon = '👑';
    } else if (l7BranchA >= 6) {
        rankTitle = 'Cloud Specialist';
        rankIcon = '☁️';
    } else if (l7BranchB >= 6) {
        rankTitle = 'Database Architect';
        rankIcon = '🛢️';
    } else if (l7BranchC >= 6) {
        rankTitle = 'Next.js Engineer';
        rankIcon = '⚡';
    } else if (l7Completed > 0) {
        rankTitle = 'Mastery Challenger';
        rankIcon = '🚀';
    } else if (l6Completed >= 15 && l5Completed >= 15) {
        rankTitle = 'Master Architect';
        rankIcon = '👑';
    } else if (l6Completed > 0) {
        rankTitle = 'Python Backend Engineer';
        rankIcon = '🐍';
    } else if (l5Completed >= 15) {
        rankTitle = 'Fullstack Master';
        rankIcon = '🏆';
    } else if (l5Completed > 0) {
        rankTitle = 'React Engineer';
        rankIcon = '⚛️';
    } else if (l4Completed >= 15) {
        rankTitle = 'Dojo Master';
        rankIcon = '⚔️';
    } else if (l4Completed > 0) {
        rankTitle = 'DOM Challenger';
        rankIcon = '⚔️';
    } else if (isL1) {
        rankTitle = 'Code Apprentice';
        rankIcon = '🛡️';
    } else if (isL0) {
        rankTitle = 'Web Novice';
        rankIcon = '🌱';
    } else {
        rankTitle = 'Web Explorer';
        rankIcon = '🌐';
    }

    return {
        isL0, isL1, isL2, isL3,
        l4Completed, l5Completed, l6Completed,
        l7BranchA, l7BranchB, l7BranchC, l7Completed,
        totalXP,
        maxXP: 12500,
        rankTitle,
        rankIcon
    };
};

window.openUserProfileModal = function() {
    const stats = window.getUserXPAndRank();
    const progressPct = Math.min(Math.round((stats.totalXP / stats.maxXP) * 100), 100);

    const ranks = [
        { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web History' },
        { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • Foundations' },
        { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • DOM Dojo' },
        { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • Framework Dojo' },
        { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Backend Dojo' },
        { title: 'Cloud Specialist', icon: '☁️', level: 'Level 7 • Track 7A DevOps' },
        { title: 'Database Architect', icon: '🛢️', level: 'Level 7 • Track 7B Database' },
        { title: 'Next.js Engineer', icon: '⚡', level: 'Level 7 • Track 7C Next.js' },
        { title: 'Fullstack Master', icon: '🏆', level: 'Level 5 & 6 Complete' },
        { title: 'Master Architect', icon: '👑', level: 'Levels 0-6 Complete' },
        { title: 'Principal Polymath', icon: '👑', level: '100% All Level 7 Tracks' }
    ];

    const currentRankTitle = stats.rankTitle;

    const rankLadderHTML = ranks.map(r => {
        const isCurrent = currentRankTitle === r.title || (r.title === 'DOM Challenger' && currentRankTitle === 'Dojo Master');
        const bg = isCurrent ? 'background: #eff6ff; border: 1px solid #3b82f6;' : 'background: #f8fafc; border: 1px solid #e2e8f0;';
        const badgeBg = isCurrent ? 'background: #2563eb; color: #ffffff;' : 'background: #e2e8f0; color: #64748b;';
        const badgeText = isCurrent ? '✅ Active' : '🔒 Locked';

        return `
            <div style="${bg} padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px; text-align: left;">
                    <span style="font-size: 1.1rem; flex-shrink: 0;">${r.icon}</span>
                    <div>
                        <div style="font-size: 0.84rem; font-weight: 800; color: ${isCurrent ? '#1e40af' : '#1e293b'};">${r.title}</div>
                        <div style="font-size: 0.72rem; color: #64748b;">${r.level}</div>
                    </div>
                </div>
                <span style="${badgeBg} font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">${badgeText}</span>
            </div>
        `;
    }).join('');

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '👤 Learner Profile & Rank Roadmap',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; max-width: 100%; box-sizing: border-box;">
                    <!-- Rank Banner -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 16px 14px; border-radius: 14px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
                        <div style="font-size: 2.4rem; margin-bottom: 4px;">${stats.rankIcon}</div>
                        <div style="font-size: 1.15rem; font-weight: 800;">${stats.rankTitle}</div>
                        <div style="font-size: 0.85rem; color: #93c5fd; margin-top: 2px;">${stats.totalXP.toLocaleString()} / ${stats.maxXP.toLocaleString()} Total XP</div>
                        
                        <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 99px; margin-top: 12px; overflow: hidden;">
                            <div style="background: #38bdf8; height: 100%; width: ${progressPct}%; border-radius: 99px; transition: width 0.4s ease;"></div>
                        </div>
                    </div>

                    <!-- XP Breakdown Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 14px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 0: Web History</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: ${stats.isL0 ? '#10b981' : '#64748b'};">${stats.isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${((stats.isL1?300:0)+(stats.isL2?300:0)+(stats.isL3?400:0))} / 1,000 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 4: DOM Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #2563eb;">${stats.l4Completed * 100} / 1,500 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 5: React Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #0284c7;">${stats.l5Completed * 150} / 2,250 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #64748b; font-weight: 700;">Level 6: Python Dojo</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #10b981;">${stats.l6Completed * 200} / 3,000 XP</div>
                        </div>
                        <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 8px 10px; border-radius: 10px;">
                            <div style="font-size: 0.70rem; color: #7e22ce; font-weight: 700;">Level 7: Mastery Hub</div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: #9333ea;">${stats.l7Completed * 250} / 4,500 XP</div>
                        </div>
                    </div>

                    <!-- Rank Ladder -->
                    <div style="text-align: left; margin-bottom: 8px;">
                        <div style="font-size: 0.80rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Developer Ranks</div>
                        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; padding-right: 4px;">
                            ${rankLadderHTML}
                        </div>
                    </div>
                </div>
            `,
            showCloseButton: true,
            confirmButtonText: 'Got It 👍',
            confirmButtonColor: '#2563eb',
            customClass: {
                popup: 'learner-profile-swal-modal'
            }
        });
    }
};

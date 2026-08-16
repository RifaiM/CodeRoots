import fs from 'fs';

// 1. UPDATE UserProfileModal.astro
let userModal = fs.readFileSync('src/components/UserProfileModal.astro', 'utf-8');

// Replace rank ladder definition and mapping
const oldLadderSection = `        const ranks = [
            { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web Basics' },
            { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • Core Foundations' },
            { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • JS Widget Dojo' },
            { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • React Component Dojo' },
            { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Python Basics Dojo' },
            { title: 'Fullstack Specialist', icon: '🚀', level: 'Level 7 • Cloud, SQL & Next.js' },
            { title: 'Async UI Specialist', icon: '🌉', level: 'Level 8 • Async UI & Skeletons' },
            { title: 'React Auth Specialist', icon: '🛡️', level: 'Level 9 • User Logins & Security' },
            { title: 'Grand Master Fullstack Engineer', icon: '👑', level: 'Level 10 • SaaS Capstone' }
        ];

        const currentRankTitle = stats.rankTitle;

        const rankLadderHTML = ranks.map(r => {
            const isCurrent = currentRankTitle === r.title || 
                              (r.title === 'DOM Challenger' && currentRankTitle === 'Dojo Master') ||
                              (r.title === 'React Engineer' && currentRankTitle === 'Fullstack Master') ||
                              (r.title === 'Principal Polymath' && ['Cloud Specialist', 'Database Architect', 'Next.js Engineer', 'Principal Polymath'].includes(currentRankTitle)) ||
                              (r.title === 'Async UI Specialist' && ['Async UI Specialist', 'API Integration Specialist'].includes(currentRankTitle)) ||
                              (r.title === 'React Auth Specialist' && ['React Auth Specialist', 'Security Engineer'].includes(currentRankTitle)) ||
                              (r.title === 'Grand Master Fullstack Engineer' && ['Grand Master Fullstack Engineer', 'Apex SaaS Challenger'].includes(currentRankTitle));
            const bg = isCurrent ? 'background: #eff6ff; border: 1px solid #3b82f6;' : 'background: #f8fafc; border: 1px solid #e2e8f0;';
            const badgeBg = isCurrent ? 'background: #2563eb; color: #ffffff;' : 'background: #e2e8f0; color: #64748b;';
            const badgeText = isCurrent ? '✅ Active' : '🔒 Locked';

            return \`
                <div style="\${bg} padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px; text-align: left;">
                        <span style="font-size: 1.1rem; flex-shrink: 0;">\${r.icon}</span>
                        <div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: \${isCurrent ? '#1e40af' : '#1e293b'};">\${r.title}</div>
                            <div style="font-size: 0.72rem; color: #64748b;">\${r.level}</div>
                        </div>
                    </div>
                    <span style="\${badgeBg} font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">\${badgeText}</span>
                </div>
            \`;
        }).join('');`;

const newLadderSection = `        const ranks = [
            { title: 'Web Explorer', icon: '🌐', level: 'Level 0 • Web Basics', aliases: ['Web Explorer'] },
            { title: 'Code Apprentice', icon: '🛡️', level: 'Level 1-3 • Core Foundations', aliases: ['Code Apprentice'] },
            { title: 'DOM Challenger', icon: '⚔️', level: 'Level 4 • JS Widget Dojo', aliases: ['DOM Challenger', 'DOM Master', 'Dojo Master'] },
            { title: 'React Engineer', icon: '⚛️', level: 'Level 5 • React Component Dojo', aliases: ['React Engineer', 'React Master', 'Fullstack Master'] },
            { title: 'Python Backend Engineer', icon: '🐍', level: 'Level 6 • Python Basics Dojo', aliases: ['Python Backend Engineer', 'Python Backend Architect'] },
            { title: 'Fullstack Specialist', icon: '🚀', level: 'Level 7 • Cloud, SQL & Next.js', aliases: ['Fullstack Specialist', 'Cloud Specialist', 'Database Architect', 'Next.js Engineer', 'Principal Polymath', 'Mastery Challenger'] },
            { title: 'Async UI Specialist', icon: '🌉', level: 'Level 8 • Async UI & Skeletons', aliases: ['Async UI Specialist', 'API Integration Specialist'] },
            { title: 'React Auth Specialist', icon: '🛡️', level: 'Level 9 • User Logins & Security', aliases: ['React Auth Specialist', 'Security Engineer'] },
            { title: 'Grand Master Fullstack Engineer', icon: '👑', level: 'Level 10 • SaaS Capstone', aliases: ['Grand Master Fullstack Engineer', 'SaaS UI Architect', 'Apex SaaS Challenger'] }
        ];

        const currentRankTitle = stats.rankTitle;

        let currentRankIndex = 0;
        for (let idx = 0; idx < ranks.length; idx++) {
            if (ranks[idx].title === currentRankTitle || (ranks[idx].aliases && ranks[idx].aliases.includes(currentRankTitle))) {
                currentRankIndex = idx;
                break;
            }
        }

        const rankLadderHTML = ranks.map((r, idx) => {
            const isCurrent = idx === currentRankIndex;
            const isMastered = idx < currentRankIndex;

            let bg = 'background: #f8fafc; border: 1px solid #e2e8f0;';
            let badgeBg = 'background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0;';
            let badgeText = '🔒 Locked';
            let titleColor = '#64748b';

            if (isCurrent) {
                bg = 'background: #eff6ff; border: 1.5px solid #3b82f6; box-shadow: 0 2px 8px rgba(37,99,235,0.08);';
                badgeBg = 'background: #2563eb; color: #ffffff;';
                badgeText = '⭐ Active Rank';
                titleColor = '#1e40af';
            } else if (isMastered) {
                bg = 'background: #f0fdf4; border: 1px solid #bbf7d0;';
                badgeBg = 'background: #dcfce7; color: #15803d; border: 1px solid #86efac;';
                badgeText = '✅ Mastered';
                titleColor = '#166534';
            }

            return \`
                <div style="\${bg} padding: 8px 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px; text-align: left;">
                        <span style="font-size: 1.1rem; flex-shrink: 0;">\${r.icon}</span>
                        <div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: \${titleColor};">\${r.title}</div>
                            <div style="font-size: 0.72rem; color: #64748b;">\${r.level}</div>
                        </div>
                    </div>
                    <span style="\${badgeBg} font-size: 0.70rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;">\${badgeText}</span>
                </div>
            \`;
        }).join('');`;

userModal = userModal.replace(oldLadderSection, newLadderSection);

// Add 8 Foundations keys to unlockAll in UserProfileModal
const oldUnlock = `            localStorage.setItem('level10_completed', 'true');

            localStorage.setItem('partF_completed', 'true');`;

const newUnlock = `            localStorage.setItem('level10_completed', 'true');

            // Advanced Foundations (L5 - L10)
            localStorage.setItem('foundations_react_completed', 'true');
            localStorage.setItem('foundations_python_completed', 'true');
            localStorage.setItem('foundations_cloud_completed', 'true');
            localStorage.setItem('foundations_sql_completed', 'true');
            localStorage.setItem('foundations_nextjs_completed', 'true');
            localStorage.setItem('foundations_async_completed', 'true');
            localStorage.setItem('foundations_auth_completed', 'true');
            localStorage.setItem('foundations_saas_completed', 'true');

            localStorage.setItem('partF_completed', 'true');`;

userModal = userModal.replace(oldUnlock, newUnlock);

// Add 8 Foundations keys to lockAll in UserProfileModal
const oldLock = `            localStorage.removeItem('level10_completed');

            // 4. Reset Track Completion Flags (Levels 7–10)`;

const newLock = `            localStorage.removeItem('level10_completed');

            // Reset Advanced Foundations Keys
            localStorage.removeItem('foundations_react_completed');
            localStorage.removeItem('foundations_python_completed');
            localStorage.removeItem('foundations_cloud_completed');
            localStorage.removeItem('foundations_sql_completed');
            localStorage.removeItem('foundations_nextjs_completed');
            localStorage.removeItem('foundations_async_completed');
            localStorage.removeItem('foundations_auth_completed');
            localStorage.removeItem('foundations_saas_completed');

            // 4. Reset Track Completion Flags (Levels 7–10)`;

userModal = userModal.replace(oldLock, newLock);
fs.writeFileSync('src/components/UserProfileModal.astro', userModal, 'utf-8');
console.log('✅ Updated UserProfileModal.astro rank ladder & unlockAll/lockAll');


// 2. UPDATE public/scripts/dashboard.js unlockAll & lockAll
let dash = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');
dash = dash.replace(oldUnlock, newUnlock);
dash = dash.replace(oldLock, newLock);
fs.writeFileSync('public/scripts/dashboard.js', dash, 'utf-8');
console.log('✅ Updated public/scripts/dashboard.js unlockAll/lockAll');

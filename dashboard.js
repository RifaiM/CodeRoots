/* ==========================================================================
   DevDojo Master Dashboard JavaScript Engine
   Security: HTML Escaping & Input Sanitization
   Animation: GSAP Entrance Sequences & Micro-interactions
   Progress: LocalStorage Sync & Dynamic XP Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardSecurity();
    initUserProgress();
    initGSAPAnimations();
    initMobileSegmentedFilter();
    initGlobalBackToTop();
});

/**
 * Global Back To Top Floating Action Button Engine
 */
function initGlobalBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTopBtn';
        btn.className = 'back-to-top-btn';
        btn.setAttribute('aria-label', 'Back to Top');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        document.body.appendChild(btn);
    }

    function checkScroll() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPos > 100) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 1. Security Safeguards (XSS Protection & Safe Text Injection)
 */
function initDashboardSecurity() {
    // Prevent opener hijacking on all external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

/**
 * Safe HTML Escaper to prevent XSS injection
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 2. Progression Lock/Unlock Engine & XP Calculation
 */
function initUserProgress() {
    let completedCount = 0;
    
    // Check level completion states
    const isLevel0Complete = localStorage.getItem('level0_completed') === 'true';
    const isLevel1Complete = localStorage.getItem('level1_completed') === 'true';
    const isLevel2Complete = localStorage.getItem('level2_completed') === 'true';
    const isLevel3Complete = localStorage.getItem('level3_completed') === 'true';
    const isPracticeUnlocked = localStorage.getItem('practice_mode_unlocked') === 'true';

    // Calculate Level 4 & Level 5 lesson completion counts from LocalStorage
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

    // Calculate XP
    let totalXP = 0;
    if (isLevel0Complete) totalXP += 250;
    if (isLevel1Complete) totalXP += 300;
    if (isLevel2Complete) totalXP += 300;
    if (isLevel3Complete) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);
    
    // Update Header UI Elements
    const xpBadge = document.querySelector('.xp-badge .badge-label');
    const rankIcon = document.getElementById('userRankIcon');
    const rankLabel = document.getElementById('userRankLabel');
    const resumeBtn = document.getElementById('resumeLessonBtn');
    const unlockToggleBtn = document.getElementById('unlockToggleBtn');
    const unlockModeText = document.getElementById('unlockModeText');

    if (xpBadge) {
        xpBadge.textContent = `${totalXP.toLocaleString()} XP`;
    }

    if (rankLabel) {
        if (l5Completed >= 15) {
            if (rankIcon) rankIcon.textContent = '🏆';
            rankLabel.textContent = 'Fullstack Master';
        } else if (l5Completed > 0) {
            if (rankIcon) rankIcon.textContent = '⚛️';
            rankLabel.textContent = 'React Engineer';
        } else if (l4Completed >= 15) {
            if (rankIcon) rankIcon.textContent = '⚔️';
            rankLabel.textContent = 'Dojo Master';
        } else if (l4Completed > 0) {
            if (rankIcon) rankIcon.textContent = '⚔️';
            rankLabel.textContent = 'DOM Challenger';
        } else if (isLevel1Complete) {
            if (rankIcon) rankIcon.textContent = '🛡️';
            rankLabel.textContent = 'Code Apprentice';
        } else if (isLevel0Complete) {
            if (rankIcon) rankIcon.textContent = '🌱';
            rankLabel.textContent = 'Web Novice';
        } else {
            if (rankIcon) rankIcon.textContent = '🌐';
            rankLabel.textContent = 'Web Explorer';
        }
    }

    // Update Track Card Unlock States
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
        const badge = card.querySelector('.track-level-badge');
        const statusIcon = card.querySelector('.track-status-icon');
        const btn = card.querySelector('.track-btn');
        if (!badge || !statusIcon || !btn) return;

        const levelText = badge.textContent.trim();

        if (levelText === 'Level 0') {
            if (isLevel0Complete) {
                statusIcon.className = 'track-status-icon completed';
                statusIcon.textContent = '✅ Completed';
            } else {
                statusIcon.className = 'track-status-icon ready';
                statusIcon.textContent = '🟢 Active Track';
            }
        } else if (levelText === 'Level 1') {
            updateTrackCardState(card, statusIcon, btn, isLevel1Complete, true, './foundations.html?track=html', 'HTML Foundations');
        } else if (levelText === 'Level 2') {
            updateTrackCardState(card, statusIcon, btn, isLevel2Complete, true, './foundations.html?track=css', 'CSS Foundations');
        } else if (levelText === 'Level 3') {
            updateTrackCardState(card, statusIcon, btn, isLevel3Complete, true, './foundations.html?track=js', 'JS Foundations');
        } else if (levelText === 'Level 4') {
            let activeL4 = 1;
            for (let i = 1; i <= 15; i++) {
                if (localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true') {
                    activeL4 = Math.min(i + 1, 15);
                }
            }
            const isFinished = l4Completed >= 15;
            const targetUrl = isFinished ? './2. partB/lesson1/lesson1_remake.html' : `./2. partB/lesson${activeL4}/lesson${activeL4}_remake.html`;
            updateTrackCardState(card, statusIcon, btn, isFinished, true, targetUrl, 'Level 4 DOM Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 4 Completed' : '⚔️ Enter Level 4 Dojo';
            }
        } else if (levelText === 'Level 5') {
            let activeL5 = 1;
            for (let i = 1; i <= 15; i++) {
                if (localStorage.getItem(`partC_lesson${i}_remake_complete`) === 'true') {
                    activeL5 = Math.min(i + 1, 15);
                }
            }
            const isFinished = l5Completed >= 15;
            const targetUrl = isFinished ? './3. partC/lesson1/lesson1_remake.html' : `./3. partC/lesson${activeL5}/lesson${activeL5}_remake.html`;
            updateTrackCardState(card, statusIcon, btn, isFinished, true, targetUrl, 'Level 5 React Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 5 Completed' : '⚛️ Enter Level 5 Dojo';
            }
        } else if (levelText === 'Level 6') {
            let activeL6 = 1;
            let l6Completed = 0;
            for (let i = 1; i <= 15; i++) {
                if (localStorage.getItem(`partE_lesson${i}_remake_complete`) === 'true') {
                    l6Completed++;
                    activeL6 = Math.min(i + 1, 15);
                }
            }
            const isFinished = l6Completed >= 15;
            const targetUrl = isFinished ? './5. partE/lesson1/lesson1_remake.html' : `./5. partE/lesson${activeL6}/lesson${activeL6}_remake.html`;
            updateTrackCardState(card, statusIcon, btn, isFinished, true, targetUrl, 'Level 6 Python Dojo');
            const btnSpan = btn.querySelector('span');
            if (btnSpan) {
                btnSpan.textContent = isFinished ? '✅ Level 6 Completed' : '🐍 Enter Level 6 Dojo';
            }
        }
    });

    // Navbar Practical Dojo Link Control (Only #dojoNavLink opens Hub Modal)
    const dojoNavLinks = document.querySelectorAll('#dojoNavLink');
    dojoNavLinks.forEach(dojoLink => {
        dojoLink.classList.remove('dojo-locked');
        dojoLink.innerHTML = '⚔️ Practical Dojo';
        dojoLink.title = 'Practical Dojo Hub';
        dojoLink.onclick = (e) => {
            e.preventDefault();
            openDojoHub();
        };
    });

    // Bind Unlock Toggle Button
    if (unlockToggleBtn) {
        if (unlockModeText) {
            unlockModeText.textContent = isPracticeUnlocked ? 'Unlocked' : 'Unlock All';
        }
        unlockToggleBtn.onclick = () => {
            const newState = !isPracticeUnlocked;
            localStorage.setItem('practice_mode_unlocked', newState ? 'true' : 'false');
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: newState ? '🔓 Practice Mode Unlocked!' : '🔒 Locked Mode Restored!',
                    text: newState ? 'All tracks are now unlocked for testing & practice.' : 'Standard progression locks are restored.',
                    icon: 'info',
                    confirmButtonColor: '#2563eb'
                }).then(() => {
                    location.reload();
                });
            } else {
                location.reload();
            }
        };
    }
}

function updateTrackCardState(card, statusIcon, btn, isCompleted, isUnlocked, linkUrl, trackName) {
    if (isCompleted) {
        statusIcon.className = 'track-status-icon completed';
        statusIcon.textContent = '✅ Completed';
        card.classList.remove('locked');
        btn.href = linkUrl;
        btn.classList.remove('disabled', 'locked-btn');
        btn.onclick = null;
    } else if (isUnlocked) {
        statusIcon.className = 'track-status-icon ready';
        statusIcon.textContent = '🟢 Unlocked';
        card.classList.remove('locked');
        btn.href = linkUrl;
        btn.classList.remove('disabled', 'locked-btn');
        btn.onclick = null;
    } else {
        statusIcon.className = 'track-status-icon locked';
        statusIcon.textContent = '🔒 Locked';
        card.classList.add('locked');
        btn.removeAttribute('href');
        btn.classList.add('disabled', 'locked-btn');
        btn.onclick = (e) => {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '🔒 Track Locked',
                    text: `Complete the prerequisite track first to unlock ${trackName}! Or use "Unlock All" in the top bar.`,
                    icon: 'warning',
                    confirmButtonColor: '#2563eb'
                });
            }
        };
    }
}

/**
 * 3. GSAP Animation Engine
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline for Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from('.hero-pill', {
        duration: 0.6,
        y: -15,
        opacity: 0,
        delay: 0.1
    })
    .from('.hero-title', {
        duration: 0.7,
        y: 20,
        opacity: 0
    }, '-=0.4')
    .from('.hero-subtitle', {
        duration: 0.7,
        y: 15,
        opacity: 0
    }, '-=0.5');

    // Reveal Skill Tree Cards with Stagger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.track-card.gsap-reveal', {
            scrollTrigger: {
                trigger: '.roadmap-section',
                start: 'top 85%'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
        });
    } else {
        // Fallback stagger animation if ScrollTrigger is not present
        gsap.from('.track-card.gsap-reveal', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.08,
            delay: 0.4,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
        });
    }
}

/**
 * 4. Mobile Segmented Filter Switcher (320px & 375px UX)
 */
function initMobileSegmentedFilter() {
    const tabs = document.querySelectorAll('.segmented-tab');
    const cards = document.querySelectorAll('.track-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * 5. Track Preview Modal Handler (Safe Swal Popup)
 */
function showTrackPreview(title, description) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: escapeHTML(title),
            text: escapeHTML(description),
            icon: 'info',
            confirmButtonText: 'Got It!',
            confirmButtonColor: '#2563eb',
            customClass: {
                popup: 'swal-soft-popup',
                title: 'swal-soft-title'
            }
        });
    } else {
        alert(`${title}\n\n${description}`);
    }
}

/**
 * 6. Global Certificate Hub Selection Modal
 */
window.openCertificateHub = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '📜 NoviCodes Certificate Hub',
            html: `
                <div style="text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px 0;">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 18px; line-height: 1.5;">
                        Select an earned certificate to view, print, or download your official Proof of Work:
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="./2. partB/certificate.html" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem;">📜 Level 4 Certificate</div>
                                <div style="font-size: 0.76rem; color: #64748b;">DOM Manipulation & Web Interactivity</div>
                            </div>
                            <span style="font-weight: 800; color: #2563eb; font-size: 0.85rem;">View &rarr;</span>
                        </a>

                        <a href="./3. partC/certificate.html" style="display: flex; align-items: center; justify-content: space-between; background: #f0f9ff; border: 1px solid #38bdf8; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem; color: #0369a1;">⚛️ Level 5 Certificate</div>
                                <div style="font-size: 0.76rem; color: #0284c7;">React & Modern Frontend Engineering</div>
                            </div>
                            <span style="font-weight: 800; color: #0284c7; font-size: 0.85rem;">View &rarr;</span>
                        </a>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true
        });
    } else {
        window.location.href = './3. partC/certificate.html';
    }
};

/**
 * 7. Practical Dojo Level Selection Hub Modal (100% Open Access)
 */
window.openDojoHub = function() {
    let activeL4 = 1;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true') {
            activeL4 = Math.min(i + 1, 15);
        }
    }

    let activeL5 = 1;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partC_lesson${i}_remake_complete`) === 'true') {
            activeL5 = Math.min(i + 1, 15);
        }
    }

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '⚔️ Practical Dojo Hub',
            html: `
                <div style="text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px 0;">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 18px; line-height: 1.5;">
                        Select a Practical Dojo level to jump into live interactive coding:
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="./2. partB/lesson${activeL4}/lesson${activeL4}_remake.html" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem;">⚔️ Level 4: DOM Interactivity Dojo</div>
                                <div style="font-size: 0.76rem; color: #64748b;">15 Projects • Active Lesson ${activeL4}</div>
                            </div>
                            <span style="font-weight: 800; color: #2563eb; font-size: 0.85rem;">Continue &rarr;</span>
                        </a>

                        <a href="./3. partC/lesson${activeL5}/lesson${activeL5}_remake.html" style="display: flex; align-items: center; justify-content: space-between; background: #f0f9ff; border: 1px solid #38bdf8; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem; color: #0369a1;">⚛️ Level 5: React & Framework Dojo</div>
                                <div style="font-size: 0.76rem; color: #0284c7;">15 Projects • Active Lesson ${activeL5}</div>
                            </div>
                            <span style="font-weight: 800; color: #0284c7; font-size: 0.85rem;">Continue &rarr;</span>
                        </a>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true
        });
    } else {
        window.location.href = `./2. partB/lesson${activeL4}/lesson${activeL4}_remake.html`;
    }
};

/**
 * 8. User Profile & XP Breakdown Modal with Responsive Reset Option
 */
window.openUserProfileModal = function() {
    const isL0 = localStorage.getItem('level0_completed') === 'true';
    const isL1 = localStorage.getItem('level1_completed') === 'true';
    const isL2 = localStorage.getItem('level2_completed') === 'true';
    const isL3 = localStorage.getItem('level3_completed') === 'true';

    let l4Completed = 0;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partB_lesson${i}_remake_complete`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === 'true' || localStorage.getItem(`lesson_${i}_completed`) === '1') {
            l4Completed++;
        }
    }

    let l5Completed = 0;
    for (let i = 1; i <= 15; i++) {
        if (localStorage.getItem(`partC_lesson${i}_remake_complete`) === 'true') {
            l5Completed++;
        }
    }

    let totalXP = 0;
    if (isL0) totalXP += 250;
    if (isL1) totalXP += 300;
    if (isL2) totalXP += 300;
    if (isL3) totalXP += 400;
    totalXP += (l4Completed * 100);
    totalXP += (l5Completed * 150);

    let rankTitle = '🌱 Web Novice';
    let rankIcon = '🌱';
    if (l5Completed >= 15) {
        rankTitle = '🏆 Fullstack Master';
        rankIcon = '🏆';
    } else if (l5Completed > 0) {
        rankTitle = '⚛️ React Engineer';
        rankIcon = '⚛️';
    } else if (l4Completed >= 15) {
        rankTitle = '⚔️ Dojo Master';
        rankIcon = '⚔️';
    } else if (l4Completed > 0) {
        rankTitle = '⚔️ DOM Challenger';
        rankIcon = '⚔️';
    } else if (isL1) {
        rankTitle = '🛡️ Code Apprentice';
        rankIcon = '🛡️';
    } else if (isL0) {
        rankTitle = '🌱 Web Novice';
        rankIcon = '🌱';
    }

    const progressPct = Math.min(Math.round((totalXP / 5000) * 100), 100);

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '👤 Learner Profile & XP Breakdown',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; max-width: 100%; box-sizing: border-box;">
                    
                    <!-- Rank Banner -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 16px 14px; border-radius: 14px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
                        <div style="font-size: 2.2rem; margin-bottom: 4px;">${rankIcon}</div>
                        <div style="font-size: 1.1rem; font-weight: 800;">${rankTitle}</div>
                        <div style="font-size: 0.85rem; color: #93c5fd; margin-top: 2px;">${totalXP.toLocaleString()} / 5,000 Total XP</div>
                        
                        <!-- Progress Bar -->
                        <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 99px; margin-top: 12px; overflow: hidden;">
                            <div style="background: #38bdf8; height: 100%; width: ${progressPct}%; border-radius: 99px; transition: width 0.4s ease;"></div>
                        </div>
                    </div>

                    <!-- XP Breakdown Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; text-align: left; margin-bottom: 16px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
                            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">Level 0: Web History</div>
                            <div style="font-size: 0.88rem; font-weight: 800; color: ${isL0 ? '#10b981' : '#64748b'};">${isL0 ? '250 XP ✅' : '0 / 250 XP'}</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
                            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">Level 1-3: Foundations</div>
                            <div style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">${((isL1?300:0)+(isL2?300:0)+(isL3?400:0))} / 1,000 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
                            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">Level 4: DOM Dojo</div>
                            <div style="font-size: 0.88rem; font-weight: 800; color: #2563eb;">${l4Completed * 100} / 1,500 XP</div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
                            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">Level 5: React Dojo</div>
                            <div style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">${l5Completed * 150} / 2,250 XP</div>
                        </div>
                    </div>

                    <!-- Reset Danger Action -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; text-align: center;">
                        <button onclick="window.confirmResetProgress()" style="background: #fee2e2; border: 1px solid #fca5a5; color: #dc2626; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: all 0.2s ease;">
                            🔄 Reset Course Progress
                        </button>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        });
    }
};

window.confirmResetProgress = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Reset All Progress?',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center;">
                    <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px;">
                        This will reset your <strong>XP back to 0</strong>, clear your <strong>Developer Rank</strong>, and reset all completed lesson checkmarks across Level 0 through Level 5.
                    </p>
                    <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 10px; border-radius: 10px; font-weight: 700; color: #be123c; font-size: 0.84rem;">
                        🚨 This action cannot be undone!
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#2563eb',
            confirmButtonText: '🚨 Yes, Reset Everything',
            cancelButtonText: 'Cancel (Keep Progress)',
            showCloseButton: true,
            customClass: {
                popup: 'responsive-profile-modal'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear all completion keys from LocalStorage
                localStorage.removeItem('level0_completed');
                localStorage.removeItem('level1_completed');
                localStorage.removeItem('level2_completed');
                localStorage.removeItem('level3_completed');

                for (let i = 1; i <= 15; i++) {
                    localStorage.removeItem(`partB_lesson${i}_remake_complete`);
                    localStorage.removeItem(`lesson_${i}_completed`);
                    localStorage.removeItem(`partC_lesson${i}_remake_complete`);
                }

                Swal.fire({
                    icon: 'success',
                    title: '🔄 Progress Reset!',
                    text: 'Re-initializing NoviCodes...',
                    timer: 1200,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
            }
        });
    }
};

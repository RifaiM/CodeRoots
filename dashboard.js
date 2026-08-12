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
            const isUnlocked = isLevel0Complete || isPracticeUnlocked;
            updateTrackCardState(card, statusIcon, btn, isLevel1Complete, isUnlocked, './foundations.html?track=html', 'HTML Foundations');
        } else if (levelText === 'Level 2') {
            const isUnlocked = isLevel1Complete || isPracticeUnlocked;
            updateTrackCardState(card, statusIcon, btn, isLevel2Complete, isUnlocked, './foundations.html?track=css', 'CSS Foundations');
        } else if (levelText === 'Level 3') {
            const isUnlocked = isLevel2Complete || isPracticeUnlocked;
            updateTrackCardState(card, statusIcon, btn, isLevel3Complete, isUnlocked, './foundations.html?track=js', 'JS Foundations');
        } else if (levelText === 'Level 4') {
            const isUnlocked = isLevel3Complete || isPracticeUnlocked;
            const isFinished = completedCount >= 15;
            updateTrackCardState(card, statusIcon, btn, isFinished, isUnlocked, './2. partB/lesson1/lesson1_remake.html', 'Practical Dojo');
        }
    });

    // Check Practical Dojo Unlock Status (Requires all 3 Foundations: HTML, CSS, JS)
    let foundationsCompleted = 0;
    if (isLevel1Complete) foundationsCompleted++;
    if (isLevel2Complete) foundationsCompleted++;
    if (isLevel3Complete) foundationsCompleted++;

    const isDojoUnlocked = (isLevel1Complete && isLevel2Complete && isLevel3Complete) || isPracticeUnlocked;

    // Navbar Practical Dojo Link Control
    const dojoNavLinks = document.querySelectorAll('#dojoNavLink, a[href*="lesson1_remake.html"]');
    dojoNavLinks.forEach(dojoLink => {
        if (!isDojoUnlocked) {
            dojoLink.classList.add('dojo-locked');
            dojoLink.innerHTML = '🔒 Practical Dojo';
            dojoLink.title = `Locked: ${foundationsCompleted}/3 Foundations Completed`;
            dojoLink.onclick = (e) => {
                e.preventDefault();
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '🔒 Practical Dojo Locked!',
                        html: `
                            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 16px;">
                                You must complete all 3 <strong>Foundations Tracks</strong> (Level 1 HTML, Level 2 CSS, and Level 3 JS) to unlock the <strong>Level 4 Practical Dojo</strong>!
                            </p>
                            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; color: #1e40af;">
                                Foundations Progress: ${foundationsCompleted}/3 Completed
                            </div>
                        `,
                        icon: 'warning',
                        confirmButtonText: '🚀 Go to Foundations',
                        confirmButtonColor: '#2563eb',
                        showCancelButton: true,
                        cancelButtonText: 'Close'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = './foundations.html?track=html';
                        }
                    });
                } else {
                    alert(`🔒 Level 4 Practical Dojo is Locked!\nCompleted ${foundationsCompleted}/3 Foundations tracks.`);
                }
            };
        } else {
            dojoLink.classList.remove('dojo-locked');
            dojoLink.innerHTML = '⚔️ Practical Dojo';
            dojoLink.title = 'Practical Dojo Hub';
            dojoLink.onclick = (e) => {
                e.preventDefault();
                openDojoHub();
            };
        }
    });

    // Update Main Resume CTA
    if (resumeBtn) {
        if (!isLevel0Complete && !isPracticeUnlocked) {
            resumeBtn.href = './1. partA/web_history.html';
            resumeBtn.innerHTML = '<span>🚀 Level 0</span>';
        } else if (!isLevel1Complete && !isPracticeUnlocked) {
            resumeBtn.href = './foundations.html?track=html';
            resumeBtn.innerHTML = '<span>🚀 Level 1 HTML</span>';
        } else if (!isLevel2Complete && !isPracticeUnlocked) {
            resumeBtn.href = './foundations.html?track=css';
            resumeBtn.innerHTML = '<span>🚀 Level 2 CSS</span>';
        } else if (!isLevel3Complete && !isPracticeUnlocked) {
            resumeBtn.href = './foundations.html?track=js';
            resumeBtn.innerHTML = '<span>🚀 Level 3 JS</span>';
        } else {
            const nextLesson = Math.min(completedCount + 1, 15);
            resumeBtn.href = `./2. partB/lesson${nextLesson}/lesson${nextLesson}_remake.html`;
            resumeBtn.innerHTML = completedCount >= 15 ? '<span>🏆 Certificate</span>' : '<span>🏆 Level 4 Dojo</span>';
        }
    }

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
 * 7. Practical Dojo Level Selection Hub Modal
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

    const isL4Complete = localStorage.getItem('partB_lesson15_remake_complete') === 'true';
    const isPracticeUnlocked = localStorage.getItem('practice_unlock_all') === 'true';
    const isL5Unlocked = isL4Complete || isPracticeUnlocked;

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

                        ${isL5Unlocked ? `
                        <a href="./3. partC/lesson${activeL5}/lesson${activeL5}_remake.html" style="display: flex; align-items: center; justify-content: space-between; background: #f0f9ff; border: 1px solid #38bdf8; padding: 12px 16px; border-radius: 12px; text-decoration: none; color: #0f172a; transition: all 0.2s ease;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem; color: #0369a1;">⚛️ Level 5: React & Framework Dojo</div>
                                <div style="font-size: 0.76rem; color: #0284c7;">15 Projects • Active Lesson ${activeL5}</div>
                            </div>
                            <span style="font-weight: 800; color: #0284c7; font-size: 0.85rem;">Continue &rarr;</span>
                        </a>
                        ` : `
                        <div onclick="alert('🔒 Complete Level 4 to unlock Level 5 React Dojo!')" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px dashed #cbd5e1; padding: 12px 16px; border-radius: 12px; opacity: 0.7; cursor: pointer;">
                            <div style="text-align: left;">
                                <div style="font-weight: 800; font-size: 0.92rem; color: #64748b;">🔒 Level 5: React & Framework Dojo</div>
                                <div style="font-size: 0.76rem; color: #94a3b8;">Complete Level 4 first</div>
                            </div>
                            <span style="font-weight: 700; color: #94a3b8; font-size: 0.82rem;">Locked 🔒</span>
                        </div>
                        `}
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

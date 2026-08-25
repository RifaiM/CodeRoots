/**
 * Strict Sequential Access Protection Engine
 * Prevents URL tampering and jumping ahead without prerequisite completion.
 */

export interface AccessCheckOptions {
 track: string;
 lessonNum: number;
 levelTag: string;
 jumpLessons?: { id: number; title: string; url: string }[];
 dashboardUrl?: string;
}

export function isLessonCompleted(track: string, id: number): boolean {
 if (typeof localStorage === 'undefined') return true;

 if (track === 'partB') {
 return localStorage.getItem(`partB_lesson${id}_remake_complete`) === 'true' ||
 localStorage.getItem(`lesson_${id}_completed`) === 'true' ||
 localStorage.getItem(`lesson_${id}_completed`) === '1';
 } else if (track === 'partC') {
 return localStorage.getItem(`partC_lesson${id}_remake_complete`) === 'true';
 } else if (track === 'partE') {
 return localStorage.getItem(`partE_lesson${id}_remake_complete`) === 'true';
 } else if (track === 'partF_branchA' || track === 'branchA') {
 return localStorage.getItem(`partF_branchA_lesson${id}_complete`) === 'true' ||
 localStorage.getItem(`partF_branchA_lesson${id}_completed`) === 'true';
 } else if (track === 'partF_branchB' || track === 'branchB') {
 return localStorage.getItem(`partF_branchB_lesson${id}_complete`) === 'true' ||
 localStorage.getItem(`partF_branchB_lesson${id}_completed`) === 'true';
 } else if (track === 'partF_branchC' || track === 'branchC') {
 return localStorage.getItem(`partF_branchC_lesson${id}_complete`) === 'true' ||
 localStorage.getItem(`partF_branchC_lesson${id}_completed`) === 'true';
 } else if (track === 'partF_branchD' || track === 'branchD') {
 return localStorage.getItem(`partF_branchD_lesson${id}_complete`) === 'true' ||
 localStorage.getItem(`partF_branchD_lesson${id}_completed`) === 'true';
 } else if (track === 'partF_branchE' || track === 'branchE') {
 return localStorage.getItem(`partF_branchE_lesson${id}_complete`) === 'true' ||
 localStorage.getItem(`partF_branchE_lesson${id}_completed`) === 'true';
 } else if (track === 'partG') {
 return localStorage.getItem(`partG_lesson${id}_remake_complete`) === 'true';
 } else if (track === 'partH') {
 return localStorage.getItem(`partH_lesson${id}_remake_complete`) === 'true';
 } else if (track === 'partI') {
 return localStorage.getItem(`partI_lesson${id}_remake_complete`) === 'true';
 }
 return false;
}

export function canAccessLesson(track: string, targetLessonNum: number): boolean {
 if (typeof localStorage === 'undefined') return true;
 if (targetLessonNum <= 1) return true;
 if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;

 // Check all previous lessons 1 through targetLessonNum - 1
 for (let i = 1; i < targetLessonNum; i++) {
 if (!isLessonCompleted(track, i)) {
 return false;
 }
 }
 return true;
}

export function getHighestAccessibleLesson(track: string, totalLessons: number = 15): number {
 if (typeof localStorage === 'undefined') return 1;
 if (localStorage.getItem('practice_mode_unlocked') === 'true') return totalLessons;

 for (let i = 1; i <= totalLessons; i++) {
 if (!canAccessLesson(track, i)) {
 return Math.max(1, i - 1);
 }
 }
 return totalLessons;
}

export function getCompletedLessonsCount(track: string): number {
 if (typeof localStorage === 'undefined') return 0;
 let count = 0;
 let total = 6;
 if (track === 'partB' || track === 'partC' || track === 'partE') {
 total = 15;
 } else if (track.includes('branchD')) {
 total = 12;
 } else if (track.includes('branchE')) {
 total = 10;
 }
 for (let i = 1; i <= total; i++) {
 if (isLessonCompleted(track, i)) count++;
 }
 return count;
}

export function isCertificateAccessible(track: string): boolean {
 if (typeof localStorage === 'undefined') return false;
 if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;

 if (track === 'partB') {
 return getCompletedLessonsCount('partB') >= 15;
 } else if (track === 'partC') {
 return getCompletedLessonsCount('partC') >= 15;
 } else if (track === 'partE') {
 return getCompletedLessonsCount('partE') >= 15;
 } else if (track.startsWith('partF') || track.includes('branch')) {
 return localStorage.getItem('partF_branchA_completed') === 'true' ||
 localStorage.getItem('partF_branchB_completed') === 'true' ||
 localStorage.getItem('partF_branchC_completed') === 'true' ||
 localStorage.getItem('partF_branchD_completed') === 'true' ||
 localStorage.getItem('partF_branchE_completed') === 'true' ||
 getCompletedLessonsCount('partF_branchA') >= 6 ||
 getCompletedLessonsCount('partF_branchB') >= 6 ||
 getCompletedLessonsCount('partF_branchC') >= 6 ||
 getCompletedLessonsCount('partF_branchD') >= 12 ||
 getCompletedLessonsCount('partF_branchE') >= 10;
 } else if (track === 'partG') {
 return getCompletedLessonsCount('partG') >= 6;
 } else if (track === 'partH') {
 return getCompletedLessonsCount('partH') >= 6;
 } else if (track === 'partI') {
 return getCompletedLessonsCount('partI') >= 6;
 }
 return false;
}

export function checkLessonAccessAndRenderOverlay(opts: AccessCheckOptions): boolean {
 if (typeof window === 'undefined' || typeof document === 'undefined') return true;

 if (canAccessLesson(opts.track, opts.lessonNum)) {
 return true;
 }

 const requiredLesson = opts.lessonNum - 1;
 const totalLessons = opts.jumpLessons?.length || 15;
 const highestAccessible = getHighestAccessibleLesson(opts.track, totalLessons);

 // Find destination URL for highestAccessible
 let targetUrl = '/';
 if (opts.jumpLessons && opts.jumpLessons[highestAccessible - 1]) {
 targetUrl = opts.jumpLessons[highestAccessible - 1].url;
 } else if (opts.track === 'partB') {
 targetUrl = `/2. partB/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 } else if (opts.track === 'partC') {
 targetUrl = `/3. partC/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 } else if (opts.track === 'partE') {
 targetUrl = `/5. partE/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 } else if (opts.track.includes('branchA')) {
 targetUrl = `/6. partF/branchA/lesson${highestAccessible}_remake.html`;
 } else if (opts.track.includes('branchB')) {
 targetUrl = `/6. partF/branchB/lesson${highestAccessible}_remake.html`;
 } else if (opts.track.includes('branchC')) {
 targetUrl = `/6. partF/branchC/lesson${highestAccessible}_remake.html`;
 } else if (opts.track === 'partG') {
 targetUrl = `/7. partG/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 } else if (opts.track === 'partH') {
 targetUrl = `/8. partH/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 } else if (opts.track === 'partI') {
 targetUrl = `/9. partI/lesson${highestAccessible}/lesson${highestAccessible}_remake.html`;
 }

 const renderOverlay = () => {
 if (document.getElementById('_access-denied-overlay')) return;

 // Keyframes injection
 if (!document.getElementById('_ad-styles')) {
 const s = document.createElement('style');
 s.id = '_ad-styles';
 s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}';
 document.head.appendChild(s);
 }

 const overlay = document.createElement('div');
 overlay.id = '_access-denied-overlay';
 overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:rgba(32,33,31,0.75);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.2s ease;font-family:\'IBM Plex Sans\',system-ui,sans-serif;');

 const card = document.createElement('div');
 card.setAttribute('style', 'position:relative;z-index:1;background:#F8F6F1;border:1px solid #D5D0C6;border-radius:2px;padding:32px 24px;max-width:460px;width:95%;text-align:center;box-shadow:0 16px 40px rgba(32,33,31,0.18);animation:_adSlideIn 0.25s ease;box-sizing:border-box;');

 card.innerHTML = `
 <div style="display:inline-block;background:#F1EEE7;color:#A33B24;border:1px solid #D5D0C6;font-family:'IBM Plex Mono',monospace;font-size:0.72rem;font-weight:600;padding:3px 8px;border-radius:2px;margin-bottom:12px;letter-spacing:0.04em;text-transform:uppercase;">§ 00 // PREREQUISITE REQUIRED</div>
 <h2 style="color:#20211F;margin:0 0 8px;font-family:'Newsreader',Georgia,serif;font-size:1.55rem;font-weight:500;letter-spacing:-0.01em;">Access Restricted</h2>
 <p style="margin:0 0 20px;line-height:1.6;color:#686760;font-size:0.90rem;">
 You must complete <strong style="color:#20211F;">Lesson ${requiredLesson}</strong> before accessing <strong style="color:#20211F;">Lesson ${opts.lessonNum}</strong> in ${opts.levelTag}.
 </p>
 <div style="display:flex;flex-direction:column;gap:8px;width:100%;box-sizing:border-box;">
 <button onclick="window.location.href='${targetUrl}'" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px 16px;background:#A33B24;color:#F8F6F1;border:1px solid #A33B24;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:0.76rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;cursor:pointer;transition:all 0.15s ease;box-sizing:border-box;">
 <span>Open Lesson ${highestAccessible} →</span>
 </button>
 <a href="${opts.dashboardUrl || '/'}" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px 16px;background:#F1EEE7;color:#20211F;border:1px solid #D5D0C6;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:0.76rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;text-decoration:none;box-sizing:border-box;transition:all 0.15s ease;">
 <span>Return to Curriculum Roadmap</span>
 </a>
 </div>
 `;

 overlay.appendChild(card);
 document.body.appendChild(overlay);
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', renderOverlay);
 } else {
 renderOverlay();
 }

 return false;
}

export interface CertAccessCheckOptions {
 track: string;
 levelTag: string;
 totalProjects: number;
 hubUrl: string;
 certName: string;
}

export function showCertLockWarning(levelTag: string, completed: number, total: number) {
 const remaining = Math.max(0, total - completed);
 if (typeof (window as any).Swal !== 'undefined') {
 (window as any).Swal.fire({
 icon: 'warning',
 title: `${levelTag} Certificate Locked`,
 html: `
 <div style="text-align: center; font-family: var(--font-sans, sans-serif);">
 <p style="font-size: 0.90rem; color: var(--text-body, #20211F); margin-bottom: 16px; line-height: 1.55;">
 Complete all <strong>${total} interactive projects</strong> in this Dojo to claim and download your verified official certificate.
 </p>
 <div style="background: var(--canvas-base, #F1EEE7); border: 1px solid var(--border-subtle, #D5D0C6); padding: 12px; border-radius: 2px; display: flex; justify-content: space-around; margin-bottom: 12px;">
 <div>
 <div style="font-family: var(--font-mono, monospace); font-size: 1.25rem; font-weight: 600; color: #2F5233;">${completed} / ${total}</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">Completed</div>
 </div>
 <div style="width: 1px; background: var(--border-subtle, #D5D0C6);"></div>
 <div>
 <div style="font-family: var(--font-mono, monospace); font-size: 1.25rem; font-weight: 600; color: var(--accent-oxide, #A33B24);">${remaining}</div>
 <div style="font-family: var(--font-mono, monospace); font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">Remaining</div>
 </div>
 </div>
 </div>
 `,
 confirmButtonColor: '#A33B24',
 confirmButtonText: 'Continue Practice →',
 customClass: { popup: 'responsive-profile-modal' }
 });
 }
}

export function checkCertificateAccessAndRenderOverlay(opts: CertAccessCheckOptions): boolean {
 if (typeof window === 'undefined' || typeof document === 'undefined') return true;

 if (isCertificateAccessible(opts.track)) {
 return true;
 }

 const count = getCompletedLessonsCount(opts.track);
 const remaining = Math.max(0, opts.totalProjects - count);

 const renderOverlay = () => {
 if (document.getElementById('_cert-access-denied-overlay')) return;

 // Hide original cert-page-container immediately to prevent any visual leakage
 const originalMain = document.querySelector('.cert-page-container') as HTMLElement | null;
 if (originalMain) {
 originalMain.style.display = 'none';
 }

 // Keyframes injection
 if (!document.getElementById('_cert-ad-styles')) {
 const s = document.createElement('style');
 s.id = '_cert-ad-styles';
 s.textContent = '@keyframes _certFadeIn{from{opacity:0}to{opacity:1}}@keyframes _certSlideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}';
 document.head.appendChild(s);
 }

 const overlay = document.createElement('div');
 overlay.id = '_cert-access-denied-overlay';
 overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:rgba(32,33,31,0.75);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_certFadeIn 0.2s ease;font-family:\'IBM Plex Sans\',system-ui,sans-serif;');

 const card = document.createElement('div');
 card.setAttribute('style', 'position:relative;background:#F8F6F1;border:1px solid #D5D0C6;border-radius:2px;padding:32px 24px;max-width:460px;width:95%;text-align:center;box-shadow:0 16px 40px rgba(32,33,31,0.18);animation:_certSlideIn 0.25s ease;box-sizing:border-box;');

 card.innerHTML = `
 <div style="display:inline-block;background:#F1EEE7;color:#A33B24;border:1px solid #D5D0C6;font-family:'IBM Plex Mono',monospace;font-size:0.72rem;font-weight:600;padding:3px 8px;border-radius:2px;margin-bottom:12px;letter-spacing:0.04em;text-transform:uppercase;">§ 00 // CERTIFICATE LOCKED</div>
 <h2 style="color:#20211F;margin:0 0 8px;font-family:'Newsreader',Georgia,serif;font-size:1.55rem;font-weight:500;letter-spacing:-0.01em;">${opts.levelTag} Certificate Locked</h2>
 <p style="margin:0 0 20px;line-height:1.6;color:#686760;font-size:0.90rem;">
 You must complete all <strong style="color:#20211F;">${opts.totalProjects} projects</strong> in ${opts.certName} before unlocking your verified proof-of-work certificate.
 </p>
 
 <div style="background:#F1EEE7;border:1px solid #D5D0C6;border-radius:2px;padding:12px;display:flex;justify-content:space-around;margin-bottom:20px;">
 <div>
 <div style="font-family:'IBM Plex Mono',monospace;font-size:1.25rem;font-weight:600;color:#2F5233;">${count} / ${opts.totalProjects}</div>
 <div style="font-family:'IBM Plex Mono',monospace;font-size:0.72rem;color:#686760;text-transform:uppercase;">Completed</div>
 </div>
 <div style="width:1px;background:#D5D0C6;"></div>
 <div>
 <div style="font-family:'IBM Plex Mono',monospace;font-size:1.25rem;font-weight:600;color:#A33B24;">${remaining}</div>
 <div style="font-family:'IBM Plex Mono',monospace;font-size:0.72rem;color:#686760;text-transform:uppercase;">Remaining</div>
 </div>
 </div>

 <div style="display:flex;flex-direction:column;gap:8px;width:100%;box-sizing:border-box;">
 <button onclick="window.location.replace('${opts.hubUrl}')" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px 16px;background:#A33B24;color:#F8F6F1;border:1px solid #A33B24;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:0.76rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;cursor:pointer;transition:all 0.15s ease;box-sizing:border-box;">
 <span>Return to Dojo Hub →</span>
 </button>
 <a href="/#roadmap" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px 16px;background:#F1EEE7;color:#20211F;border:1px solid #D5D0C6;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:0.76rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;text-decoration:none;box-sizing:border-box;transition:all 0.15s ease;">
 <span>Curriculum Roadmap</span>
 </a>
 </div>
 `;

 overlay.appendChild(card);
 document.body.appendChild(overlay);
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', renderOverlay);
 } else {
 renderOverlay();
 }

 return false;
}

// Global registration
if (typeof window !== 'undefined') {
 (window as any).isLessonCompleted = isLessonCompleted;
 (window as any).canAccessLesson = canAccessLesson;
 (window as any).checkLessonAccessAndRenderOverlay = checkLessonAccessAndRenderOverlay;
 (window as any).isCertificateAccessible = isCertificateAccessible;
 (window as any).checkCertificateAccessAndRenderOverlay = checkCertificateAccessAndRenderOverlay;
 (window as any).showCertLockWarning = showCertLockWarning;
}

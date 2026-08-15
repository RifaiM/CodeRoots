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
    const total = (track.includes('branch') || track.startsWith('partF')) ? 6 : 15;
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
               getCompletedLessonsCount('partF_branchA') >= 6 ||
               getCompletedLessonsCount('partF_branchB') >= 6 ||
               getCompletedLessonsCount('partF_branchC') >= 6;
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
    }

    const renderOverlay = () => {
        if (document.getElementById('_access-denied-overlay')) return;

        // Keyframes injection
        if (!document.getElementById('_ad-styles')) {
            const s = document.createElement('style');
            s.id = '_ad-styles';
            s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:scale(.88) translateY(-16px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes _adFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}';
            document.head.appendChild(s);
        }

        const overlay = document.createElement('div');
        overlay.id = '_access-denied-overlay';
        overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#090d16 0%,#0f172a 50%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.3s ease;font-family:\'Plus Jakarta Sans\',system-ui,-apple-system,sans-serif;');

        const card = document.createElement('div');
        card.setAttribute('style', 'position:relative;z-index:1;background:rgba(15,23,42,0.92);border:1px solid rgba(51,65,85,0.8);border-top:4px solid #ef4444;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;padding:38px 28px;max-width:480px;width:90%;text-align:center;box-shadow:0 24px 50px rgba(0,0,0,0.6), 0 0 30px rgba(239,68,68,0.2);animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);box-sizing:border-box;');

        card.innerHTML = `
            <div style="display:inline-block;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-family:'Fira Code',monospace;font-size:0.80rem;font-weight:700;padding:5px 12px;border-radius:20px;margin-bottom:14px;letter-spacing:0.5px;">🔒 PREREQUISITE REQUIRED</div>
            <div style="font-size:3.6rem;margin-bottom:12px;line-height:1;filter:drop-shadow(0 8px 16px rgba(239,68,68,0.25));animation:_adFloat 3s ease-in-out infinite;">🔒</div>
            <h2 style="color:#ffffff;margin:0 0 10px;font-size:1.55rem;font-weight:800;letter-spacing:-0.3px;">Access Restricted</h2>
            <p style="margin:0 0 24px;line-height:1.6;color:#94a3b8;font-size:0.92rem;">
                You must complete <strong style="color:#f8fafc;">Lesson ${requiredLesson}</strong> before accessing <strong style="color:#f8fafc;">Lesson ${opts.lessonNum}</strong> in ${opts.levelTag}.
            </p>
            <div style="display:flex;flex-direction:column;gap:10px;width:100%;box-sizing:border-box;">
                <button onclick="window.location.href='${targetUrl}'" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);color:#ffffff;border:none;border-radius:24px;font-family:inherit;font-size:0.90rem;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(37,99,235,0.35);transition:all 0.2s ease;box-sizing:border-box;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                    <span>🚀 Take Me to Lesson ${highestAccessible} ➔</span>
                </button>
                <a href="${opts.dashboardUrl || '/'}" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 20px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:24px;font-family:inherit;font-size:0.86rem;font-weight:700;text-decoration:none;box-sizing:border-box;transition:all 0.2s ease;" onmouseover="this.style.background='#334155';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#1e293b';this.style.transform=''">
                    <span>🏠 Return to Dashboard</span>
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
}

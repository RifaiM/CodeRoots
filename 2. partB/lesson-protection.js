// lesson-protection.js - Sequential progression protection for Level 4 (Part B)

class LessonProtection {
    constructor() {
        this.init();
    }

    init() {
        // Run protection check immediately (before DOMContentLoaded)
        this.validateAccess();
        // Also check on browser back/forward navigation
        window.addEventListener('popstate', () => this.validateAccess());
        // Prevent programmatic history navigation to locked lessons
        this.protectNavigation();
    }

    getCurrentLessonNumber() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    isLessonCompleted(lessonNumber) {
        return localStorage.getItem(`partB_lesson${lessonNumber}_remake_complete`) === 'true';
    }

    getHighestAccessibleLesson() {
        for (let i = 1; i <= 15; i++) {
            if (!this.isLessonCompleted(i)) return i;
        }
        return 15;
    }

    canAccessLesson(lessonNumber) {
        if (lessonNumber === 1) return true;
        if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;
        for (let i = 1; i < lessonNumber; i++) {
            if (!this.isLessonCompleted(i)) return false;
        }
        return true;
    }

    validateAccess() {
        const currentLesson = this.getCurrentLessonNumber();
        if (!this.canAccessLesson(currentLesson)) {
            const highestAccessible = this.getHighestAccessibleLesson();
            const requiredLesson = currentLesson - 1;
            this.showAccessDeniedMessage(requiredLesson, currentLesson, highestAccessible);
            return false;
        }
        return true;
    }

    showAccessDeniedMessage(requiredLesson, attemptedLesson, highestAccessible) {
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
        card.setAttribute('style', 'position:relative;z-index:1;background:rgba(15,23,42,0.88);border:1px solid rgba(51,65,85,0.8);border-top:4px solid #2563eb;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;padding:38px 28px;max-width:460px;width:90%;text-align:center;box-shadow:0 24px 50px rgba(0,0,0,0.5);animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);box-sizing:border-box;');
        card.innerHTML = '<div style="display:inline-block;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-family:\'Fira Code\',monospace;font-size:0.80rem;font-weight:700;padding:5px 12px;border-radius:20px;margin-bottom:14px;letter-spacing:0.5px;">🔒 PREREQUISITE REQUIRED</div>'
            + '<div style="font-size:3.6rem;margin-bottom:12px;line-height:1;filter:drop-shadow(0 8px 16px rgba(239,68,68,0.25));animation:_adFloat 3s ease-in-out infinite;">🔒</div>'
            + '<h2 style="color:#ffffff;margin:0 0 10px;font-size:1.55rem;font-weight:800;letter-spacing:-0.3px;font-family:\'Plus Jakarta Sans\',sans-serif;">Access Restricted</h2>'
            + '<p style="margin:0 0 24px;line-height:1.6;color:#94a3b8;font-size:0.92rem;font-family:\'Plus Jakarta Sans\',sans-serif;">You must complete <strong style="color:#f8fafc;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#f8fafc;">Lesson ' + attemptedLesson + '</strong> in Level 4 • DOM Dojo.</p>'
            + '<div style="display:flex;flex-direction:column;gap:10px;width:100%;box-sizing:border-box;">'
            + '<button onclick="window.location.href=\'../lesson' + highestAccessible + '/lesson' + highestAccessible + '_remake.html\'" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);color:#ffffff;border:none;border-radius:24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:0.90rem;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(37,99,235,0.35);transition:all 0.2s ease;box-sizing:border-box;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'"><span>🚀 Take Me to Lesson ' + highestAccessible + ' ➔</span></button>'
            + '<a href="../../index.html" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 20px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:0.86rem;font-weight:700;text-decoration:none;box-sizing:border-box;transition:all 0.2s ease;" onmouseover="this.style.background=\'#334155\';this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.background=\'#1e293b\';this.style.transform=\'\'"><span>🏠 Return to Dashboard</span></a>'
            + '</div>';

        overlay.appendChild(card);

        const append = () => { if (!document.getElementById('_access-denied-overlay')) document.body.appendChild(overlay); };
        if (document.body) { append(); } else { document.addEventListener('DOMContentLoaded', append); }
    }

    protectNavigation() {
        const originalPushState = history.pushState.bind(history);
        const originalReplaceState = history.replaceState.bind(history);

        history.pushState = (...args) => {
            const url = args[2];
            if (url && this.isLessonURL(url)) {
                const n = this.extractLessonNumber(url);
                if (n && !this.canAccessLesson(n)) return;
            }
            return originalPushState(...args);
        };

        history.replaceState = (...args) => {
            const url = args[2];
            if (url && this.isLessonURL(url)) {
                const n = this.extractLessonNumber(url);
                if (n && !this.canAccessLesson(n)) return;
            }
            return originalReplaceState(...args);
        };
    }

    isLessonURL(url) { return url && url.includes('lesson') && url.includes('_remake.html'); }
    extractLessonNumber(url) { const m = url.match(/lesson(\d+)/); return m ? parseInt(m[1]) : null; }
}

const lessonProtection = new LessonProtection();

function markCurrentLessonComplete() {
    const n = lessonProtection.getCurrentLessonNumber();
    localStorage.setItem(`partB_lesson${n}_remake_complete`, 'true');
    showCompletionNotification(n);
}

function showCompletionNotification(lessonNumber) {
    const el = document.createElement('div');
    el.setAttribute('style', 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#27ae60,#2ecc71);color:white;padding:15px 20px;border-radius:10px;box-shadow:0 6px 16px rgba(39,174,96,0.3);z-index:10000;font-weight:600;max-width:300px;font-family:system-ui,sans-serif;');
    el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><span style="font-size:1.2em;">\u2705</span><div><div>Lesson ' + lessonNumber + ' Complete!</div><div style="font-size:0.85em;opacity:0.9;margin-top:2px;">Lesson ' + (lessonNumber + 1) + ' is now unlocked</div></div></div>';
    document.body.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity 0.5s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }, 4000);
}

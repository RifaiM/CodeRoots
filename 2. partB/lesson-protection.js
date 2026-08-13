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
            s.textContent = '@keyframes _adFadeIn{from{opacity:0}to{opacity:1}}@keyframes _adSlideIn{from{opacity:0;transform:scale(.85) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}';
            document.head.appendChild(s);
        }

        const overlay = document.createElement('div');
        overlay.id = '_access-denied-overlay';
        overlay.setAttribute('style', 'position:fixed;inset:0;width:100vw;height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;animation:_adFadeIn 0.3s ease');

        const card = document.createElement('div');
        card.setAttribute('style', 'background:#ffffff;padding:40px 32px;border-radius:20px;box-shadow:0 24px 48px rgba(0,0,0,0.45);text-align:center;max-width:440px;width:100%;animation:_adSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)');
        card.innerHTML = '<div style="font-size:3.5rem;margin-bottom:16px;">\uD83D\uDD12</div><h2 style="color:#e11d48;margin:0 0 12px;font-size:1.6rem;font-weight:800;font-family:system-ui,sans-serif;">Access Denied</h2><p style="margin:0 0 24px;line-height:1.7;color:#475569;font-size:1rem;font-family:system-ui,sans-serif;">You must complete <strong style="color:#1e293b;">Lesson ' + requiredLesson + '</strong> before accessing <strong style="color:#1e293b;">Lesson ' + attemptedLesson + '</strong>.</p><button onclick="window.location.href=\'../lesson' + highestAccessible + '/lesson' + highestAccessible + '_remake.html\'" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-weight:700;cursor:pointer;font-size:1rem;font-family:system-ui,sans-serif;box-shadow:0 4px 14px rgba(37,99,235,0.4);" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">\uD83D\uDE80 Take Me to Lesson ' + highestAccessible + '</button>';

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

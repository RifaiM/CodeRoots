import type { CompletionOptions } from '../types';

export class ProgressManager {
    /**
     * Trigger SweetAlert2 success celebration with Confetti and persist completion
     */
    public static celebrate(opts: CompletionOptions, nextBtnId: string = 'nextLessonBtn'): void {
        // 1. Mark localStorage completion & award XP once
        let isFirstCompletion = false;
        try {
            const alreadyCompleted = localStorage.getItem(opts.completionKey) === 'true';
            if (!alreadyCompleted) {
                isFirstCompletion = true;
                localStorage.setItem(opts.completionKey, 'true');
                
                // Add XP only once
                const curXp = parseInt(localStorage.getItem('userXP') || '0', 10);
                localStorage.setItem('userXP', (curXp + opts.xp).toString());
            }
        } catch (e) {}

        // Trigger live header stats update & broadcast
        try {
            if (typeof (window as any).updateHeaderStats === 'function') {
                (window as any).updateHeaderStats();
            }
            window.dispatchEvent(new CustomEvent('novicodes:xp_updated'));
        } catch (e) {}

        // 2. Trigger Confetti
        if (typeof (window as any).confetti === 'function') {
            (window as any).confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }

        // 3. Enable Next button in DOM if present
        const nextBtn = document.getElementById(nextBtnId) as HTMLElement | null;
        if (nextBtn) {
            nextBtn.classList.remove('locked', 'disabled');
            nextBtn.classList.add('active');
            if ('disabled' in nextBtn) (nextBtn as any).disabled = false;
        }

        // 4. Trigger SweetAlert2 Modal
        if (typeof (window as any).Swal !== 'undefined') {
            const modalTitle = isFirstCompletion 
                ? `${opts.lessonTitle} Completed`
                : `${opts.lessonTitle} Verified`;
            const modalText = isFirstCompletion
                ? (opts.customMessage || `Challenge solved successfully. +${opts.xp} XP bounty credited.`)
                : `Solution passed all automated verification checks.`;

            (window as any).Swal.fire({
                icon: 'success',
                title: modalTitle,
                text: modalText,
                showDenyButton: !!opts.nextUrl,
                showConfirmButton: true,
                confirmButtonColor: '#A33B24',
                denyButtonColor: '#BAB4A6',
                confirmButtonText: opts.nextUrl ? 'Next Lesson →' : 'Acknowledge',
                denyButtonText: 'Stay on Current Lesson',
                customClass: {
                    popup: 'responsive-profile-modal'
                }
            }).then((result: any) => {
                if (result.isConfirmed && opts.nextUrl) {
                    window.location.href = opts.nextUrl;
                }
            });
        }
    }
}

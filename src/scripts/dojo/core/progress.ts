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
            nextBtn.classList.remove('locked');
            nextBtn.classList.add('active');
            if ('disabled' in nextBtn) (nextBtn as any).disabled = false;
        }

        // 4. Trigger SweetAlert2 Modal
        if (typeof (window as any).Swal !== 'undefined') {
            const modalTitle = isFirstCompletion 
                ? `🎉 ${opts.lessonTitle} Completed! (+${opts.xp} XP)`
                : `🎉 ${opts.lessonTitle} Verified!`;
            const modalText = isFirstCompletion
                ? (opts.customMessage || `You've successfully solved the challenge and earned +${opts.xp} XP!`)
                : `Awesome job! Your solution passed all automated checks. (XP Bounty already claimed).`;

            (window as any).Swal.fire({
                icon: 'success',
                title: modalTitle,
                text: modalText,
                showDenyButton: !!opts.nextUrl,
                showConfirmButton: true,
                confirmButtonColor: '#10b981',
                denyButtonColor: '#475569',
                confirmButtonText: opts.nextUrl ? (opts.continueText || 'Continue to Next Lesson 🚀') : 'Awesome! 🎉',
                denyButtonText: opts.stayAndPracticeText || 'Stay & Practice 🛠️',
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

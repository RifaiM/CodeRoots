export interface EditorHistorySnapshot {
    value: string;
    selectionStart: number;
    selectionEnd: number;
}

export class EditorPersistence {
    private static readonly MAX_HISTORY = 150;

    /**
     * Restore draft or default starter code, auto-save on typing,
     * and attach universal Undo (Ctrl+Z), Redo (Ctrl+Y / Ctrl+Shift+Z), and Tab indentation.
     */
    public static bind(
        editor: HTMLTextAreaElement,
        draftKey: string,
        defaultStarter: string,
        onInput?: () => void
    ): void {
        if (!editor) return;

        // 1. Restore from storage
        let initialCode = defaultStarter;
        try {
            const saved = localStorage.getItem(draftKey);
            if (saved !== null && saved.trim() !== '') {
                initialCode = saved;
            }
        } catch (e) {
            initialCode = defaultStarter;
        }

        editor.value = initialCode;

        // 2. Undo / Redo In-Memory History Stack
        const history: EditorHistorySnapshot[] = [
            { value: editor.value, selectionStart: 0, selectionEnd: 0 }
        ];
        let historyIndex = 0;
        let isPerformingHistoryAction = false;
        let typingDebounceTimer: ReturnType<typeof setTimeout> | null = null;

        const recordSnapshot = () => {
            if (isPerformingHistoryAction) return;

            const currentVal = editor.value;
            const currentStart = editor.selectionStart;
            const currentEnd = editor.selectionEnd;

            // If value is identical to current index, update cursor position
            if (history[historyIndex] && history[historyIndex].value === currentVal) {
                history[historyIndex].selectionStart = currentStart;
                history[historyIndex].selectionEnd = currentEnd;
                return;
            }

            // Truncate any forward redo history
            if (historyIndex < history.length - 1) {
                history.splice(historyIndex + 1);
            }

            // Push fresh snapshot
            history.push({
                value: currentVal,
                selectionStart: currentStart,
                selectionEnd: currentEnd
            });

            // Enforce maximum stack capacity
            if (history.length > EditorPersistence.MAX_HISTORY) {
                history.shift();
            } else {
                historyIndex++;
            }
        };

        const triggerUpdate = () => {
            try {
                localStorage.setItem(draftKey, editor.value);
            } catch (e) {}
            if (onInput) onInput();
        };

        // 3. Auto-save on typing with smart history snapshot debounce (250ms)
        editor.addEventListener('input', () => {
            if (isPerformingHistoryAction) return;

            if (typingDebounceTimer) clearTimeout(typingDebounceTimer);
            typingDebounceTimer = setTimeout(() => {
                recordSnapshot();
            }, 250);

            triggerUpdate();
        });

        // 4. Universal Keyboard Shortcuts (Undo, Redo, Tab, Shift+Tab)
        editor.addEventListener('keydown', (e: KeyboardEvent) => {
            const isCtrlOrMeta = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();

            // A. Undo: Ctrl+Z / Cmd+Z (without Shift)
            if (isCtrlOrMeta && !e.shiftKey && key === 'z') {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (typingDebounceTimer) clearTimeout(typingDebounceTimer);
                recordSnapshot();

                if (historyIndex > 0) {
                    historyIndex--;
                    const snapshot = history[historyIndex];
                    isPerformingHistoryAction = true;
                    editor.value = snapshot.value;
                    editor.selectionStart = snapshot.selectionStart;
                    editor.selectionEnd = snapshot.selectionEnd;
                    isPerformingHistoryAction = false;
                    triggerUpdate();
                }
                return;
            }

            // B. Redo: Ctrl+Y / Cmd+Y OR Ctrl+Shift+Z / Cmd+Shift+Z
            if ((isCtrlOrMeta && key === 'y') || (isCtrlOrMeta && e.shiftKey && key === 'z')) {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    const snapshot = history[historyIndex];
                    isPerformingHistoryAction = true;
                    editor.value = snapshot.value;
                    editor.selectionStart = snapshot.selectionStart;
                    editor.selectionEnd = snapshot.selectionEnd;
                    isPerformingHistoryAction = false;
                    triggerUpdate();
                }
                return;
            }

            // C. Tab / Shift+Tab Indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (typingDebounceTimer) clearTimeout(typingDebounceTimer);
                recordSnapshot(); // Capture state before tab

                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;

                if (!e.shiftKey) {
                    // Forward Tab: Insert 2 spaces
                    editor.value = val.substring(0, start) + '  ' + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 2;
                } else {
                    // Shift+Tab: Un-indent if preceded by spaces
                    if (start >= 2 && val.substring(start - 2, start) === '  ') {
                        editor.value = val.substring(0, start - 2) + val.substring(start);
                        editor.selectionStart = editor.selectionEnd = start - 2;
                    } else if (start >= 1 && val.substring(start - 1, start) === ' ') {
                        editor.value = val.substring(0, start - 1) + val.substring(start);
                        editor.selectionStart = editor.selectionEnd = start - 1;
                    }
                }

                recordSnapshot(); // Capture state after tab
                triggerUpdate();
                return;
            }
        });
    }

    /**
     * Bind Reset Button to restore starter code and clear draft storage with safety confirmation
     */
    public static bindReset(
        btn: HTMLElement,
        editor: HTMLTextAreaElement,
        draftKey: string,
        defaultStarter: string,
        onReset?: () => void
    ): void {
        if (!btn || !editor) return;

        btn.addEventListener('click', () => {
            if (editor.value.trim() === defaultStarter.trim()) {
                return;
            }

            const executeReset = () => {
                editor.value = defaultStarter;
                try {
                    localStorage.removeItem(draftKey);
                } catch (e) {}
                if (onReset) onReset();
            };

            if (typeof (window as any).Swal !== 'undefined') {
                (window as any).Swal.fire({
                    icon: 'warning',
                    title: 'Reset Code Editor?',
                    text: 'This will replace your current code with the starter template. Your changes will be cleared.',
                    showCancelButton: true,
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#64748b',
                    confirmButtonText: 'Yes, Reset Code 🔄',
                    cancelButtonText: 'Cancel ✕',
                    customClass: { popup: 'responsive-profile-modal' }
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        executeReset();
                    }
                });
            } else {
                if (confirm('Are you sure you want to reset your editor to the starter code? Your changes will be lost.')) {
                    executeReset();
                }
            }
        });
    }
}

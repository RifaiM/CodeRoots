export class EditorPersistence {
    /**
     * Restore draft or default starter code and auto-save on every keystroke
     */
    public static bind(
        editor: HTMLTextAreaElement,
        draftKey: string,
        defaultStarter: string,
        onInput?: () => void
    ): void {
        if (!editor) return;

        // 1. Restore from storage
        try {
            const saved = localStorage.getItem(draftKey);
            editor.value = (saved !== null && saved.trim() !== '') ? saved : defaultStarter;
        } catch (e) {
            editor.value = defaultStarter;
        }

        // 2. Auto-save on typing
        editor.addEventListener('input', () => {
            try {
                localStorage.setItem(draftKey, editor.value);
            } catch (e) {}
            if (onInput) onInput();
        });
    }

    /**
     * Bind Reset Button to restore starter code and clear draft storage
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
            editor.value = defaultStarter;
            try {
                localStorage.removeItem(draftKey);
            } catch (e) {}
            if (onReset) onReset();
        });
    }
}

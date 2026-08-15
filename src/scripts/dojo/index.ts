/**
 * NoviCodes Universal Dojo Verification & Diagnostic Engine
 * Master Modular Entry Point
 */

import type { ChecklistTask, CompletionOptions, DiagnosticProblem, LinterMode } from './types';
import { HTMLLinter } from './linters/htmlLinter';
import { CSSLinter } from './linters/cssLinter';
import { JSCompiler } from './linters/jsCompiler';
import { ChecklistManager } from './core/checklist';
import { EditorPersistence } from './core/persistence';
import { ProgressManager } from './core/progress';
import { DiagnosticsPanel } from './ui/diagnosticsPanel';

export * from './types';
export { HTMLLinter } from './linters/htmlLinter';
export { CSSLinter } from './linters/cssLinter';
export { JSCompiler } from './linters/jsCompiler';

export class DojoEngine {
    private static checklistManager: ChecklistManager | null = null;
    private static currentMode: LinterMode = 'html';

    /**
     * Initialize real-time reactive task checklist
     */
    public static initChecklist(
        tasks: ChecklistTask[],
        opts: { containerId?: string; submitBtnId?: string; nextBtnId?: string; mode?: LinterMode } = {}
    ): void {
        this.checklistManager = new ChecklistManager(tasks, opts.containerId || 'taskChecklist');
        if (opts.mode) this.currentMode = opts.mode;
    }

    /**
     * Run real-time checklist against student's code
     */
    public static runChecklist(code: string): { allPassed: boolean; passedCount: number; totalCount: number } {
        if (!this.checklistManager) return { allPassed: false, passedCount: 0, totalCount: 0 };
        return this.checklistManager.run(code);
    }

    /**
     * Run intelligent syntax & structural diagnostics across HTML, CSS, and JS
     */
    public static lint(code: string, mode: LinterMode = this.currentMode): DiagnosticProblem[] {
        let problems: DiagnosticProblem[] = [];

        if (mode === 'html') {
            problems = HTMLLinter.lint(code);
        } else if (mode === 'css') {
            problems = CSSLinter.lint(code);
        } else if (mode === 'javascript') {
            problems = JSCompiler.lint(code);
        }

        DiagnosticsPanel.render(problems);
        return problems;
    }

    /**
     * Clear diagnostics panel
     */
    public static clearLint(): void {
        DiagnosticsPanel.clear();
    }

    /**
     * Bind auto-save draft persistence on every keystroke
     */
    public static setupDraftPersistence(
        editor: HTMLTextAreaElement,
        draftKey: string,
        defaultStarter: string,
        onUpdate?: () => void
    ): void {
        EditorPersistence.bind(editor, draftKey, defaultStarter, onUpdate);
    }

    /**
     * Bind safe reset button
     */
    public static setupResetButton(
        btn: HTMLElement,
        editor: HTMLTextAreaElement,
        draftKey: string,
        defaultStarter: string,
        onReset?: () => void
    ): void {
        EditorPersistence.bindReset(btn, editor, draftKey, defaultStarter, () => {
            this.clearLint();
            if (onReset) onReset();
        });
    }

    /**
     * Empty submission validation check
     */
    public static isEmpty(code: string): boolean {
        return !code || code.trim().length === 0;
    }

    /**
     * Show custom diagnostic banner
     */
    public static showLint(message: string, severity: 'error' | 'warning' | 'info' = 'error', hint?: string): void {
        DiagnosticsPanel.render([{
            message,
            severity,
            hint
        }]);
    }

    /**
     * Trigger SweetAlert2 completion celebration modal with confetti and XP
     */
    public static celebrateCompletion(opts: CompletionOptions): void {
        ProgressManager.celebrate(opts);
    }
}

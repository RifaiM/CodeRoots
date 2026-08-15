/**
 * NoviCodes Universal Dojo Verification & Diagnostic Engine
 * Master Modular Entry Point
 */

import type { ChecklistResult, ChecklistTask, CompletionOptions, DiagnosticProblem, LinterMode } from './types';
import { HTMLLinter } from './linters/htmlLinter';
import { CSSLinter } from './linters/cssLinter';
import { JSCompiler } from './linters/jsCompiler';
import { PythonLinter } from './linters/pythonLinter';
import { ChecklistManager } from './core/checklist';
import { EditorPersistence } from './core/persistence';
import { ProgressManager } from './core/progress';
import { DiagnosticsPanel } from './ui/diagnosticsPanel';
import { PyodideRunner, type PythonExecutionResult } from './runners/pyodideRunner';

export * from './types';
export { HTMLLinter } from './linters/htmlLinter';
export { CSSLinter } from './linters/cssLinter';
export { JSCompiler } from './linters/jsCompiler';
export { PythonLinter } from './linters/pythonLinter';
export { PyodideRunner, type PythonExecutionResult } from './runners/pyodideRunner';

export class DojoEngine {
    private static checklistManager: ChecklistManager | null = null;
    private static currentMode: LinterMode = 'html';

    /**
     * Execute real Python code via Pyodide WebAssembly
     */
    public static async runPython(code: string, timeoutMs?: number): Promise<PythonExecutionResult> {
        return PyodideRunner.run(code, timeoutMs);
    }

    /**
     * Initialize real-time reactive task checklist
     */
    public static initChecklist(
        tasks: ChecklistTask[],
        opts: { containerId?: string; submitBtnId?: string; nextBtnId?: string; mode?: LinterMode } = {}
    ): void {
        this.checklistManager = new ChecklistManager(tasks, opts.containerId || 'taskChecklist', opts.mode || 'html');
        if (opts.mode) this.currentMode = opts.mode;
    }

    /**
     * Run real-time checklist against student's code
     */
    public static runChecklist(code: string): ChecklistResult {
        if (!this.checklistManager) return { allPassed: false, passedCount: 0, totalCount: 0, incompleteTasks: [] };
        return this.checklistManager.run(code);
    }

    /**
     * Run intelligent syntax & structural diagnostics across HTML, CSS, JS, and Python
     */
    public static lint(code: string, mode: LinterMode = this.currentMode): DiagnosticProblem[] {
        let problems: DiagnosticProblem[] = [];

        if (mode === 'html') {
            problems = HTMLLinter.lint(code);
        } else if (mode === 'css') {
            problems = CSSLinter.lint(code);
        } else if (mode === 'javascript') {
            problems = JSCompiler.lint(code);
        } else if (mode === 'python') {
            problems = PythonLinter.lint(code);
        }

        DiagnosticsPanel.render(problems);
        return problems;
    }

    /**
     * Progate-grade intelligent verification when student clicks "Check & Verify Code"
     */
    public static verifySubmission(
        code: string,
        opts: CompletionOptions & { mode?: LinterMode }
    ): boolean {
        const mode = opts.mode || this.currentMode;

        // 1. Empty code check
        if (this.isEmpty(code)) {
            this.showLint(
                'Your code editor is empty!',
                'error',
                'Write your solution code in the editor before verifying.'
            );
            return false;
        }

        // 2. Syntax & compiler diagnostics
        const problems = this.lint(code, mode);
        const hasErrors = problems.some(p => p.severity === 'error');
        if (hasErrors) {
            // Keep syntax error panel rendered so student can fix the bug
            return false;
        }

        // 3. Evaluate real-time checklist requirements
        const result = this.runChecklist(code);
        if (result.allPassed) {
            this.clearLint();
            this.celebrateCompletion(opts);
            return true;
        } else {
            // Pinpoint the exact missing requirement
            const firstIncomplete = result.incompleteTasks[0];
            const cleanLabel = firstIncomplete
                ? (firstIncomplete.label || firstIncomplete.text || 'Requirement').replace(/<[^>]+>/g, '').trim()
                : 'Requirement incomplete';

            this.showLint(
                `Mission Incomplete: ${cleanLabel}`,
                'warning',
                `Review "🎯 Your Mission" in the left pane. Ensure your code matches the required tags, attributes, or keywords.`
            );

            // Highlight and pulse the incomplete task in the Mission Card
            if (firstIncomplete) {
                const targetItem = document.getElementById(`task_item_${firstIncomplete.id}`);
                if (targetItem) {
                    targetItem.classList.remove('task-highlight-pulse');
                    void targetItem.offsetWidth; // trigger reflow
                    targetItem.classList.add('task-highlight-pulse');
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            return false;
        }
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

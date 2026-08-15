/**
 * Shared TypeScript Types for the NoviCodes Dojo Engine
 */

export type LinterMode = 'html' | 'css' | 'javascript' | 'python' | 'sql' | 'nextjs' | 'bash' | 'yaml';

export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export interface DiagnosticProblem {
    message: string;
    line?: number;
    column?: number;
    severity: DiagnosticSeverity;
    hint?: string;
    ruleId?: string;
}

export interface ChecklistTask {
    id: string;
    label: string;
    regex?: RegExp;
    fn?: (code: string, doc?: Document) => boolean;
}

export interface CompletionOptions {
    lessonTitle: string;
    xp: number;
    completionKey: string;
    nextUrl?: string;
    stayAndPracticeText?: string;
    continueText?: string;
    customMessage?: string;
}

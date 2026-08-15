import type { DiagnosticProblem } from '../types';

export class JSCompiler {
    /**
     * Run JavaScript syntax and static diagnostics
     */
    public static lint(code: string): DiagnosticProblem[] {
        const problems: DiagnosticProblem[] = [];
        if (!code || code.trim().length === 0) return problems;

        // 1. Native JavaScript Syntax Validation via Function constructor
        try {
            // Evaluates syntax without executing top-level runtime
            new Function(code);
        } catch (e: any) {
            const errorMsg = e.message || 'Syntax Error';
            let lineNum: number | undefined;

            // Attempt to parse line number from stack/message
            const lineMatch = errorMsg.match(/line\s*(\d+)/i) || (e.stack && e.stack.match(/:(\d+):\d+/));
            if (lineMatch) {
                lineNum = parseInt(lineMatch[1], 10);
            }

            let hint = 'Check for missing quotes, unmatched brackets, or misspelled keywords.';
            if (errorMsg.includes('Unexpected token')) {
                hint = `Look closely around line ${lineNum || 'the highlighted area'} for missing parentheses, brackets, or commas.`;
            } else if (errorMsg.includes('Unterminated string') || errorMsg.includes('Invalid or unexpected token')) {
                hint = `Every opening quote (", ', or \`) must have a matching closing quote on the same string.`;
            } else if (errorMsg.includes('missing ) after argument list')) {
                hint = `Make sure every function call closes all parentheses: myFunction(arg1, arg2).`;
            }

            problems.push({
                message: errorMsg,
                line: lineNum,
                severity: 'error',
                hint
            });
        }

        // 2. Bracket Balance Counter (Parentheses, Curly Braces, Square Brackets)
        const clean = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
        const parenOpen = (clean.match(/\(/g) || []).length;
        const parenClose = (clean.match(/\)/g) || []).length;
        if (parenOpen !== parenClose && problems.length === 0) {
            problems.push({
                message: `Unmatched parentheses: ${parenOpen} '(' vs ${parenClose} ')'`,
                severity: 'error',
                hint: `Ensure all function calls and conditions have matching opening and closing parentheses.`
            });
        }

        const braceOpen = (clean.match(/\{/g) || []).length;
        const braceClose = (clean.match(/\}/g) || []).length;
        if (braceOpen !== braceClose && problems.length === 0) {
            problems.push({
                message: `Unmatched curly braces: ${braceOpen} '{' vs ${braceClose} '}'`,
                severity: 'error',
                hint: `Ensure every function, if-statement, and object block closes its matching '}'.`
            });
        }

        return problems;
    }
}

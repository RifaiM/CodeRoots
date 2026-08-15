import type { DiagnosticProblem } from '../types';

export class PythonLinter {
    public static lint(code: string): DiagnosticProblem[] {
        const problems: DiagnosticProblem[] = [];
        if (!code || code.trim().length === 0) return problems;

        const lines = code.split('\n');

        // 1. Line-by-line checks
        lines.forEach((lineText, idx) => {
            const lineNum = idx + 1;
            // Strip comments
            const cleanLine = lineText.replace(/#[^\r\n]*/, '').trim();
            if (!cleanLine) return;

            // Missing colon check on control flow / def / class
            if (/^(def\s+[a-zA-Z0-9_]+\s*\(.*?\)|if\s+.*|elif\s+.*|else|for\s+.*|while\s+.*|class\s+[a-zA-Z0-9_]+(\(.*?\))?|try|except(\s+.*)?|finally|with\s+.*)$/.test(cleanLine)) {
                if (!cleanLine.endsWith(':')) {
                    problems.push({
                        message: `Missing colon ':' at the end of statement`,
                        line: lineNum,
                        severity: 'error',
                        hint: `Python block headers must end with a colon ':' (e.g. 'if condition:' or 'def my_func():').`
                    });
                }
            }

            // JavaScript keywords mistakenly used in Python
            if (/\b(let|var|const)\s+[a-zA-Z0-9_]+\s*=/.test(cleanLine)) {
                problems.push({
                    message: `Invalid keyword in Python: Do not use 'let', 'const', or 'var'`,
                    line: lineNum,
                    severity: 'error',
                    hint: `In Python, define variables directly: 'variable_name = value' without let/const/var.`
                });
            }

            if (/^\s*function\s+[a-zA-Z0-9_]+/.test(cleanLine)) {
                problems.push({
                    message: `Invalid keyword 'function': Use 'def' to define functions in Python`,
                    line: lineNum,
                    severity: 'error',
                    hint: `Define functions with 'def function_name(args):'.`
                });
            }

            // Logical operators (&&, ||, !) instead of (and, or, not)
            if (/\&\&|\|\|/.test(cleanLine)) {
                problems.push({
                    message: `Invalid logical operator: Use 'and' / 'or' instead of '&&' / '||'`,
                    line: lineNum,
                    severity: 'warning',
                    hint: `Python uses English words for logical operators: 'if a and b:' or 'if x or y:'.`
                });
            }

            // Lowercase booleans
            if (/\b(true|false|null)\b/.test(cleanLine)) {
                const match = cleanLine.match(/\b(true|false|null)\b/)?.[0];
                const replacement = match === 'null' ? 'None' : match === 'true' ? 'True' : 'False';
                problems.push({
                    message: `Invalid literal '${match}': In Python, use '${replacement}'`,
                    line: lineNum,
                    severity: 'warning',
                    hint: `Python booleans and null are capitalized: True, False, None.`
                });
            }

            // Python 2 style print
            if (/^print\s+["'].*["']$/.test(cleanLine)) {
                problems.push({
                    message: `Missing parentheses in call to 'print'`,
                    line: lineNum,
                    severity: 'error',
                    hint: `In Python 3, print is a function: 'print("Hello")'.`
                });
            }
        });

        // 2. Bracket Balance Counter
        const strippedAllComments = code.replace(/#[^\r\n]*/g, '');
        const parenOpen = (strippedAllComments.match(/\(/g) || []).length;
        const parenClose = (strippedAllComments.match(/\)/g) || []).length;
        if (parenOpen !== parenClose) {
            problems.push({
                message: `Unmatched parentheses: ${parenOpen} '(' vs ${parenClose} ')'`,
                severity: 'error',
                hint: `Ensure all function calls, tuples, and groupings have matching '(' and ')'.`
            });
        }

        const bracketOpen = (strippedAllComments.match(/\[/g) || []).length;
        const bracketClose = (strippedAllComments.match(/\]/g) || []).length;
        if (bracketOpen !== bracketClose) {
            problems.push({
                message: `Unmatched square brackets: ${bracketOpen} '[' vs ${bracketClose} ']'`,
                severity: 'error',
                hint: `Ensure all lists and indexing expressions have matching '[' and ']'.`
            });
        }

        const braceOpen = (strippedAllComments.match(/\{/g) || []).length;
        const braceClose = (strippedAllComments.match(/\}/g) || []).length;
        if (braceOpen !== braceClose) {
            problems.push({
                message: `Unmatched curly braces: ${braceOpen} '{' vs ${braceClose} '}'`,
                severity: 'error',
                hint: `Ensure all dictionaries and f-string expressions have matching '{' and '}'.`
            });
        }

        return problems;
    }
}

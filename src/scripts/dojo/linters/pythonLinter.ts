import type { DiagnosticProblem } from '../types';

export class PythonLinter {
    public static lint(code: string): DiagnosticProblem[] {
        const problems: DiagnosticProblem[] = [];
        if (!code || code.trim().length === 0) return problems;

        const lines = code.split('\n');

        // 1. Line-by-line static syntax checks
        lines.forEach((lineText, idx) => {
            const lineNum = idx + 1;
            // Strip Python comments
            const cleanLine = lineText.replace(/#[^\r\n]*/, '').trim();
            if (!cleanLine) return;

            // Check for unclosed single/double quotes on a single line (unless multiline triple quote)
            if (!cleanLine.includes('"""') && !cleanLine.includes("'''")) {
                const quoteCountD = (cleanLine.match(/"/g) || []).length;
                const quoteCountS = (cleanLine.match(/'/g) || []).length;
                if (quoteCountD % 2 !== 0) {
                    problems.push({
                        message: `Unterminated double quote (") string literal`,
                        line: lineNum,
                        severity: 'error',
                        hint: `Every opening double quote (") must have a matching closing quote on the same line.`
                    });
                } else if (quoteCountS % 2 !== 0) {
                    problems.push({
                        message: `Unterminated single quote (') string literal`,
                        line: lineNum,
                        severity: 'error',
                        hint: `Every opening single quote (') must have a matching closing quote on the same line.`
                    });
                }
            }

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

        // 2. Exact Bracket & Delimiter Stack Tracker (skipping strings and comments)
        const parenStack: { line: number }[] = [];
        const braceStack: { line: number }[] = [];
        const bracketStack: { line: number }[] = [];

        lines.forEach((lineText, lineIdx) => {
            const lineNum = lineIdx + 1;
            let inString: string | null = null;

            for (let i = 0; i < lineText.length; i++) {
                const char = lineText[i];

                if (char === '#' && !inString) {
                    break; // Python comment, skip rest of line
                }

                if (inString) {
                    if (char === inString && lineText[i - 1] !== '\\') {
                        inString = null;
                    }
                    continue;
                } else if (char === '"' || char === "'") {
                    inString = char;
                    continue;
                }

                // Delimiters
                if (char === '(') {
                    parenStack.push({ line: lineNum });
                } else if (char === ')') {
                    if (parenStack.length === 0) {
                        problems.push({
                            message: `Unexpected closing parenthesis ')'`,
                            line: lineNum,
                            severity: 'error',
                            hint: `Remove this extra ')' or check the line above.`
                        });
                    } else {
                        parenStack.pop();
                    }
                }

                if (char === '{') {
                    braceStack.push({ line: lineNum });
                } else if (char === '}') {
                    if (braceStack.length === 0) {
                        problems.push({
                            message: `Unexpected closing curly brace '}'`,
                            line: lineNum,
                            severity: 'error',
                            hint: `Remove this extra '}' or check the line above.`
                        });
                    } else {
                        braceStack.pop();
                    }
                }

                if (char === '[') {
                    bracketStack.push({ line: lineNum });
                } else if (char === ']') {
                    if (bracketStack.length === 0) {
                        problems.push({
                            message: `Unexpected closing square bracket ']'`,
                            line: lineNum,
                            severity: 'error',
                            hint: `Remove this extra ']' or check the list above.`
                        });
                    } else {
                        bracketStack.pop();
                    }
                }
            }
        });

        // Report unclosed delimiters with exact line numbers
        parenStack.forEach(unclosed => {
            problems.push({
                message: `Unclosed parenthesis '(' opened on line ${unclosed.line}`,
                line: unclosed.line,
                severity: 'error',
                hint: `Ensure all function calls, tuples, and groupings have a matching ')' closing parenthesis.`
            });
        });

        braceStack.forEach(unclosed => {
            problems.push({
                message: `Unclosed curly brace '{' opened on line ${unclosed.line}`,
                line: unclosed.line,
                severity: 'error',
                hint: `Ensure all dictionaries and f-string expressions have a matching '}' closing brace.`
            });
        });

        bracketStack.forEach(unclosed => {
            problems.push({
                message: `Unclosed square bracket '[' opened on line ${unclosed.line}`,
                line: unclosed.line,
                severity: 'error',
                hint: `Ensure all lists and indexing expressions have a matching ']' closing bracket.`
            });
        });

        return problems;
    }
}


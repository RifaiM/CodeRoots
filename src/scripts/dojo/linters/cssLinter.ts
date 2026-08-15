import type { DiagnosticProblem } from '../types';

const COMMON_CSS_TYPOS: Record<string, string> = {
    'colr': 'color',
    'dispaly': 'display',
    'bacground': 'background',
    'backgroud': 'background',
    'pading': 'padding',
    'margn': 'margin',
    'font-weigth': 'font-weight',
    'font-sz': 'font-size',
    'bordr': 'border',
    'align': 'text-align or align-items',
    'justify': 'justify-content',
    'widht': 'width',
    'heigth': 'height',
    'positin': 'position',
    'flot': 'float',
    'visiblity': 'visibility'
};

export class CSSLinter {
    public static lint(code: string): DiagnosticProblem[] {
        const problems: DiagnosticProblem[] = [];
        if (!code || code.trim().length === 0) return problems;

        const lines = code.split('\n');

        // 1. Unterminated multi-line comment check
        let inComment = false;
        let commentStartLine = 1;
        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            if (!inComment && line.includes('/*') && !line.includes('*/')) {
                inComment = true;
                commentStartLine = lineNum;
            } else if (inComment && line.includes('*/')) {
                inComment = false;
            }
        });
        if (inComment) {
            problems.push({
                message: `Unterminated CSS comment '/*' opened on line ${commentStartLine}`,
                line: commentStartLine,
                severity: 'error',
                hint: `Close the comment with '*/'.`
            });
        }

        // 2. Brace Balance & Exact Line Tracking
        const braceStack: { line: number; selector: string }[] = [];
        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            const clean = line.replace(/\/\*[\s\S]*?\*\//g, '');

            // Check for opening braces
            for (let i = 0; i < clean.length; i++) {
                if (clean[i] === '{') {
                    const selector = clean.substring(0, i).trim() || `Line ${lineNum}`;
                    braceStack.push({ line: lineNum, selector });
                } else if (clean[i] === '}') {
                    if (braceStack.length === 0) {
                        problems.push({
                            message: `Unexpected closing brace '}'`,
                            line: lineNum,
                            severity: 'error',
                            hint: `Remove this extra closing brace or check the selector above.`
                        });
                    } else {
                        braceStack.pop();
                    }
                }
            }
        });

        // Report any unclosed blocks left on stack
        braceStack.forEach(unclosed => {
            problems.push({
                message: `Unclosed CSS block for '${unclosed.selector}' opened on line ${unclosed.line}`,
                line: unclosed.line,
                severity: 'error',
                hint: `Every CSS selector rule must end with a matching '}'.`
            });
        });

        // 3. Declaration & Property Checking
        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            const clean = line.replace(/\/\*[\s\S]*?\*\//g, '').trim();

            if (clean.includes(':') && !clean.startsWith('@') && !clean.startsWith('/*')) {
                const parts = clean.split(':');
                const prop = parts[0].trim().toLowerCase();
                const val = parts.slice(1).join(':').replace(/;.*$/, '').trim();

                // Property typo check
                if (COMMON_CSS_TYPOS[prop]) {
                    problems.push({
                        message: `Unknown CSS property '${prop}'`,
                        line: lineNum,
                        severity: 'warning',
                        hint: `Did you mean '${COMMON_CSS_TYPOS[prop]}'?`
                    });
                }

                // Incomplete property without value
                if (val === '' && (clean.endsWith(';') || clean.endsWith('}'))) {
                    problems.push({
                        message: `Missing value for CSS property '${prop}'`,
                        line: lineNum,
                        severity: 'error',
                        hint: `Provide a valid CSS value (e.g. '${prop}: value;').`
                    });
                }

                // Missing unit check (e.g. width: 100 or font-size: 16)
                if (/^(width|height|font-size|padding|margin|top|bottom|left|right|gap|border-radius)\s*:\s*\d+\s*(;|$)/i.test(clean)) {
                    if (val !== '0' && /^\d+$/.test(val)) {
                        problems.push({
                            message: `Missing CSS unit on '${prop}: ${val}'`,
                            line: lineNum,
                            severity: 'error',
                            hint: `CSS numbers (except 0) require a unit: '${prop}: ${val}px' or '${prop}: ${val}rem'.`
                        });
                    }
                }
            }
        });

        return problems;
    }
}


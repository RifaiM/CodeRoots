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
    'justify': 'justify-content'
};

export class CSSLinter {
    public static lint(code: string): DiagnosticProblem[] {
        const problems: DiagnosticProblem[] = [];
        if (!code || code.trim().length === 0) return problems;

        const lines = code.split('\n');

        // 1. Brace Balance Check
        let openBraces = 0;
        lines.forEach((line, idx) => {
            const clean = line.replace(/\/\*[\s\S]*?\*\//g, '');
            openBraces += (clean.match(/\{/g) || []).length;
            openBraces -= (clean.match(/\}/g) || []).length;
            if (openBraces < 0) {
                problems.push({
                    message: `Unexpected closing brace '}'`,
                    line: idx + 1,
                    severity: 'error',
                    hint: `Remove this extra closing brace or check the block above.`
                });
                openBraces = 0;
            }
        });

        if (openBraces > 0) {
            problems.push({
                message: `Unclosed CSS block: Missing ${openBraces} closing brace(s) '}'`,
                severity: 'error',
                hint: `Every CSS selector rule must end with a closing '}'.`
            });
        }

        // 2. Declaration & Property Checking
        lines.forEach((line, idx) => {
            const clean = line.replace(/\/\*[\s\S]*?\*\//g, '').trim();
            if (clean.includes(':') && !clean.startsWith('@') && !clean.startsWith('/*')) {
                const parts = clean.split(':');
                const prop = parts[0].trim().toLowerCase();
                const val = parts.slice(1).join(':').replace(/;.*$/, '').trim();

                // Property typo check
                if (COMMON_CSS_TYPOS[prop]) {
                    problems.push({
                        message: `Unknown CSS property '${prop}'`,
                        line: idx + 1,
                        severity: 'warning',
                        hint: `Did you mean '${COMMON_CSS_TYPOS[prop]}'?`
                    });
                }

                // Missing unit check (e.g. width: 100 or font-size: 16)
                if (/^(width|height|font-size|padding|margin|top|bottom|left|right|gap|border-radius)\s*:\s*\d+\s*(;|$)/i.test(clean)) {
                    if (val !== '0' && /^\d+$/.test(val)) {
                        problems.push({
                            message: `Missing CSS unit on '${prop}: ${val}'`,
                            line: idx + 1,
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

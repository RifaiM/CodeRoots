import fs from 'fs';
import path from 'path';

const partEDir = path.resolve('src/pages/5. partE');

function findLessonFiles(dir) {
    let results = [];
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) {
            results = results.concat(findLessonFiles(full));
        } else if (entry.endsWith('.astro') && entry.includes('lesson')) {
            results.push(full);
        }
    }
    return results;
}

const files = findLessonFiles(partEDir);
console.log(`Found ${files.length} partE lesson files to upgrade.`);

let upgraded = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(process.cwd(), file);

    const searchStart = content.indexOf('// 🔒 Security: Escape output');
    const searchFallbackStart = content.indexOf('// 🔒 Security: Escape user print() output');
    const searchFallbackStart2 = content.indexOf('// 5. Python Terminal Simulation');
    const targetStart = searchStart !== -1 ? searchStart : (searchFallbackStart !== -1 ? searchFallbackStart : searchFallbackStart2);

    const checkBtnIndex = content.indexOf('// 6. Check & Verify Code Action');
    if (targetStart === -1 || checkBtnIndex === -1) {
        console.warn(`⚠️ Could not locate section markers in ${rel}`);
        continue;
    }

    const before = content.slice(0, targetStart);
    const after = content.slice(checkBtnIndex);

    const replacementEngine = `        // 🔒 Security: Escape output to prevent XSS
        function escapeHTML(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        // 5. Python Execution Engine (Pyodide WebAssembly with Safe Client Fallback)
        function simulatePythonOutputFallback(code) {
            if (!terminalScreen) return;
            const prints = [];
            const lines = code.split('\\n');

            for (const line of lines) {
                const trimmed = line.trim();
                const printMatch = trimmed.match(/^print\\s*\\((.*)\\)$/);
                if (printMatch) {
                    let c = printMatch[1].trim();
                    if ((c.startsWith('"') && c.endsWith('"')) || (c.startsWith("'") && c.endsWith("'"))) {
                        c = c.slice(1, -1);
                    } else if (c.startsWith('f"') || c.startsWith("f'")) {
                        c = c.slice(2, -1);
                    }
                    prints.push(c);
                }
            }

            if (prints.length > 0) {
                terminalScreen.innerHTML = prints.map(p => \`<div style="color: #34d399;">&gt; \${escapeHTML(p)}</div>\`).join('') +
                    '<div style="color: #38bdf8; margin-top: 8px; font-size: 0.76rem;">✓ [Process exited with code 0]</div>';
            } else {
                terminalScreen.innerHTML = '<div style="color: #34d399;">&gt; main.py executed successfully!</div>' +
                    '<div style="color: #38bdf8; margin-top: 8px; font-size: 0.76rem;">✓ [Process exited with code 0]</div>';
            }
        }

        async function executePythonCode(code) {
            if (!terminalScreen) return;

            terminalScreen.innerHTML = '<div class="terminal-loading-wrap"><span class="terminal-spinner"></span>&gt; Running CPython 3.12 (WebAssembly)...</div>';

            try {
                const result = await DojoEngine.runPython(code);

                if (result.success) {
                    const lines = result.stdout ? result.stdout.split('\\n').filter(l => l !== '') : [];
                    if (lines.length > 0) {
                        terminalScreen.innerHTML = lines.map(p => \`<div style="color: #34d399;">&gt; \${escapeHTML(p)}</div>\`).join('') +
                            '<div style="color: #38bdf8; margin-top: 8px; font-size: 0.76rem;">✓ [Process exited with code 0]</div>';
                    } else {
                        terminalScreen.innerHTML = '<div style="color: #34d399;">&gt; main.py executed successfully (no stdout)!</div>' +
                            '<div style="color: #38bdf8; margin-top: 8px; font-size: 0.76rem;">✓ [Process exited with code 0]</div>';
                    }
                } else {
                    const errLines = result.stderr ? result.stderr.split('\\n').filter(l => l !== '') : ['Execution error'];
                    terminalScreen.innerHTML = errLines.map(e => \`<div style="color: #f87171;">&gt; \${escapeHTML(e)}</div>\`).join('') +
                        '<div style="color: #f87171; margin-top: 8px; font-size: 0.76rem;">✗ [Process exited with code 1]</div>';
                }
            } catch (err) {
                console.warn('Pyodide Web Worker unavailable, using client fallback:', err);
                simulatePythonOutputFallback(code);
            }
        }

`;

    // Ensure checkBtn listener is async and awaits executePythonCode
    let updatedAfter = after.replace(
        /checkBtn\.addEventListener\('click',\s*(?:async\s*)?\(\)\s*=>\s*\{[\s\n]*(?:await\s*)?(?:simulatePythonOutput|executePythonCode)\(editor\.value\);/g,
        "checkBtn.addEventListener('click', async () => {\n                await executePythonCode(editor.value);"
    );

    const newContent = before + replacementEngine + updatedAfter;
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`✅ Upgraded ${rel}`);
    upgraded++;
}

console.log(`\n🎉 Successfully upgraded ${upgraded} Python lessons with DojoEngine.runPython().`);

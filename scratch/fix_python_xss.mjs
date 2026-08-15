/**
 * Fix Python terminal innerHTML XSS across all 15 partE lesson files.
 * Adds escapeHTML() helper just before simulatePythonOutput and wraps ${p} with it.
 */
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
console.log(`Found ${files.length} partE lesson files.\n`);

// The escapeHTML helper to inject before simulatePythonOutput
const ESCAPE_FN = `        // 🔒 Security: Escape user print() output to prevent XSS
        function escapeHTML(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

`;

let fixed = 0;
let skipped = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(process.cwd(), file);

    // Check if already patched
    if (content.includes('function escapeHTML(str)')) {
        console.log(`⏭️  Already patched: ${rel}`);
        skipped++;
        continue;
    }

    // Check if it has the vulnerable pattern
    const VULNERABLE = 'terminalScreen.innerHTML = prints.map(p =>'; 
    if (!content.includes(VULNERABLE)) {
        console.log(`⚠️  No vulnerable pattern found: ${rel}`);
        skipped++;
        continue;
    }

    // 1. Inject escapeHTML before the simulatePythonOutput function
    const INJECTION_ANCHOR = '// 5. Python Terminal Simulation';
    if (!content.includes(INJECTION_ANCHOR)) {
        console.log(`⚠️  Anchor not found: ${rel}`);
        skipped++;
        continue;
    }

    content = content.replace(
        INJECTION_ANCHOR,
        ESCAPE_FN + INJECTION_ANCHOR
    );

    // 2. Fix the vulnerable innerHTML line:
    //    FROM: prints.map(p => `<div style="color: #34d399;">&gt; ${p}</div>`)
    //    TO:   prints.map(p => `<div style="color: #34d399;">&gt; ${escapeHTML(p)}</div>`)
    content = content.replace(
        /terminalScreen\.innerHTML = prints\.map\(p => `<div style="color: #34d399;">&gt; \${p}<\/div>`\)\.join\(''\)/g,
        `terminalScreen.innerHTML = prints.map(p => \`<div style="color: #34d399;">&gt; \${escapeHTML(p)}</div>\`).join('')`
    );

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Fixed: ${rel}`);
    fixed++;
}

console.log(`\n📊 Summary: ${fixed} fixed, ${skipped} skipped.`);

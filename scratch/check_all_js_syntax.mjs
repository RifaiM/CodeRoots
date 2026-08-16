import fs from 'fs';
import path from 'path';

function checkJsFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            checkJsFiles(full);
        } else if (f.endsWith('.js')) {
            try {
                const code = fs.readFileSync(full, 'utf-8');
                new Function(code);
                console.log(`✅ Syntax OK: ${full}`);
            } catch (err) {
                console.error(`❌ Syntax Error in ${full}:`, err.message);
            }
        }
    }
}

checkJsFiles('public');

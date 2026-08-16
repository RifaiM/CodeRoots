import fs from 'fs';
import path from 'path';
import vm from 'vm';

function checkJsSyntax(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            checkJsSyntax(fullPath);
        } else if (file.name.endsWith('.js') || file.name.endsWith('.mjs')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            try {
                // Check if valid JS script
                new vm.Script(content, { filename: fullPath });
                console.log(`✅ [VALID] ${fullPath}`);
            } catch (err) {
                console.error(`❌ [SYNTAX ERROR] in ${fullPath}:\n  ${err.message} at line ${err.stack ? err.stack.split('\n')[0] : ''}`);
            }
        }
    }
}

console.log('Checking all JS files in public/ and scratch/...');
checkJsSyntax('public');

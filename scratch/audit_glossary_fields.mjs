/**
 * Audit all 13 Foundations data files for missing glossary fields
 */

import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('public/data').filter(f => f.startsWith('level'));

console.log('🧪 Auditing all glossary fields across 13 data files...\n');

files.forEach(file => {
    const fullPath = path.join('public/data', file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const sandbox = { window: {} };
    new Function('window', content)(sandbox.window);
    const dataKey = Object.keys(sandbox.window)[0];
    const data = sandbox.window[dataKey];

    if (!data.glossary || !Array.isArray(data.glossary)) {
        console.error(`❌ [${file}] Missing glossary array!`);
        return;
    }

    data.glossary.forEach((item, idx) => {
        if (!item.category) {
            console.warn(`⚠️ [${file}] Glossary #${idx + 1} (${item.term}) is missing 'category'!`);
        }
        if (!item.term) {
            console.error(`❌ [${file}] Glossary #${idx + 1} is missing 'term'!`);
        }
        if (!item.definition) {
            console.error(`❌ [${file}] Glossary #${idx + 1} is missing 'definition'!`);
        }
        if (!item.analogy) {
            console.error(`❌ [${file}] Glossary #${idx + 1} is missing 'analogy'!`);
        }
    });
});

console.log('\nAudit complete!');

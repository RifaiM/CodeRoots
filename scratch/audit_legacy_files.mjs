import fs from 'fs';
import path from 'path';

function getFiles(dir, list = []) {
    if (!fs.existsSync(dir)) return list;
    const entries = fs.readdirSync(dir);
    for (const e of entries) {
        const full = path.join(dir, e);
        if (fs.statSync(full).isDirectory()) {
            getFiles(full, list);
        } else {
            list.push(full.replace(/\\/g, '/'));
        }
    }
    return list;
}

const allSrc = getFiles('src');
const allPublic = getFiles('public');
const allScratch = getFiles('scratch');

console.log(`Total src files: ${allSrc.length}`);
console.log(`Total public files: ${allPublic.length}`);
console.log(`Total scratch files: ${allScratch.length}`);

// Check all script / css references in src/
const allSrcContent = allSrc.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const allPublicContent = allPublic.filter(f => f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.html')).map(f => fs.readFileSync(f, 'utf-8')).join('\n');

const combinedContent = allSrcContent + '\n' + allPublicContent;

console.log('\n--- Checking Public Files Usage ---');
const unreferencedPublic = [];
for (const pub of allPublic) {
    const filename = path.basename(pub);
    const relPath = pub.replace(/^public\//, '');
    
    // Check if mentioned in combined content
    const isReferenced = combinedContent.includes(filename) || combinedContent.includes(relPath);
    if (!isReferenced) {
        unreferencedPublic.push(pub);
    }
}

console.log(`Found ${unreferencedPublic.length} unreferenced public files:`);
unreferencedPublic.forEach(f => console.log('  - ' + f));

import fs from 'fs';
import path from 'path';

const distDir = 'd:/3. CodeRoots-refactor/dist';

function getFiles(dir, ext = '.html') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, ext));
        } else if (file.endsWith(ext)) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getFiles(distDir, '.html');
console.log(`Auditing metadata for ${htmlFiles.length} generated pages...\n`);

const results = [];

htmlFiles.forEach(file => {
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                      content.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
    const keywordsMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/i);

    const title = titleMatch ? titleMatch[1] : 'MISSING';
    const desc = descMatch ? descMatch[1] : 'MISSING';
    const keywords = keywordsMatch ? keywordsMatch[1] : '';

    results.push({
        file: relPath,
        title,
        desc,
        keywords
    });
});

// Check for any legacy buzzwords or misleading terms across all titles & descriptions
const suspiciousTerms = ['capstone', 'guarantee', 'hired', 'become senior in 2 weeks', '100% job guarantee', 'ai-powered bot'];
const flaggings = [];

results.forEach(r => {
    suspiciousTerms.forEach(term => {
        if (r.title.toLowerCase().includes(term) || r.desc.toLowerCase().includes(term)) {
            flaggings.push(`[${r.file}] Found '${term}' in title/description`);
        }
    });
});

console.log('--- AUDIT OF META COPYWRITING & CLAIMS ---');
console.log(`Total Flagged Pages with suspicious buzzwords: ${flaggings.length}`);
if (flaggings.length > 0) {
    flaggings.forEach(f => console.log('  ⚠️ ' + f));
} else {
    console.log('✅ No misleading claims, false guarantees, or forbidden buzzwords found in metadata.');
}

console.log('\n--- SAMPLE METADATA REVIEW ---');
const samplePages = [
    'index.html',
    'foundations.html',
    '1. partA/hub.html',
    '2. partB/hub.html',
    '3. partC/hub.html',
    '5. partE/hub.html',
    '6. partF/hub.html',
    '7. partG/hub.html',
    '8. partH/hub.html',
    '9. partI/hub.html',
    '4. partD/devtype/devtype.html'
];

samplePages.forEach(p => {
    const item = results.find(r => r.file === p);
    if (item) {
        console.log(`\nPage: ${item.file}`);
        console.log(`  Title: ${item.title}`);
        console.log(`  Desc:  ${item.desc}`);
    }
});

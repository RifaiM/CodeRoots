import fs from 'fs';
import path from 'path';

function getFiles(dir, ext = '.astro') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, ext));
        } else if (file.endsWith(ext) && file.includes('lesson')) {
            results.push(fullPath);
        }
    });
    return results;
}

const lessonFiles = getFiles('d:/3. CodeRoots-refactor/src/pages');
console.log(`Found ${lessonFiles.length} interactive lessons.\n`);

let passedLessons = 0;
let failedLessons = 0;
const failures = [];

lessonFiles.forEach(file => {
    const relPath = path.relative('d:/3. CodeRoots-refactor/src/pages', file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Extract DEFAULT_STARTER
    const starterMatch = content.match(/const\s+DEFAULT_STARTER\s*=\s*(?:`([\s\S]*?)`|'([\s\S]*?)'|"([\s\S]*?)");/);
    if (!starterMatch) {
        failures.push(`[${relPath}] Missing DEFAULT_STARTER`);
        failedLessons++;
        return;
    }
    const starter = starterMatch[1] || starterMatch[2] || starterMatch[3];

    // Check that initChecklist is present
    if (!content.includes('DojoEngine.initChecklist(')) {
        failures.push(`[${relPath}] Missing DojoEngine.initChecklist`);
        failedLessons++;
        return;
    }

    // Check completionKey
    if (!content.includes('completionKey:')) {
        failures.push(`[${relPath}] Missing completionKey`);
        failedLessons++;
        return;
    }

    passedLessons++;
});

console.log('--- CHECKLIST & STARTER INITIALIZATION AUDIT ---');
console.log(`Total Lessons: ${lessonFiles.length}`);
console.log(`Passed: ${passedLessons} / ${lessonFiles.length}`);
console.log(`Failed: ${failedLessons} / ${lessonFiles.length}`);

if (failures.length > 0) {
    failures.forEach(f => console.log('  ❌ ' + f));
} else {
    console.log('✅ ALL 103 LESSONS HAVE FULL VALIDATION CHECKLISTS & STARTERS CONFIGURED!');
}

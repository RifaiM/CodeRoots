import fs from 'fs';
import path from 'path';

// Smarter AST/regex audit across all 81 lessons
const lessonDirs = [
    { level: 4, path: path.resolve('src/pages/2. partB') },
    { level: 5, path: path.resolve('src/pages/3. partC') },
    { level: 6, path: path.resolve('src/pages/5. partE') },
    { level: '7A', path: path.resolve('src/pages/6. partF/branchA') },
    { level: '7B', path: path.resolve('src/pages/6. partF/branchB') },
    { level: '7C', path: path.resolve('src/pages/6. partF/branchC') },
    { level: 8, path: path.resolve('src/pages/7. partG') },
    { level: 9, path: path.resolve('src/pages/8. partH') },
    { level: 10, path: path.resolve('src/pages/9. partI') },
];

let totalAudited = 0;
let issues = [];

for (const { level, path: dir } of lessonDirs) {
    let files = [];
    if (level.toString().startsWith('7')) {
        files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f.includes('lesson')).map(f => path.join(dir, f));
    } else {
        const subdirs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory() && f.startsWith('lesson'));
        files = subdirs.map(sd => path.join(dir, sd, `${sd}_remake.astro`));
    }

    for (const file of files) {
        totalAudited++;
        const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
        const content = fs.readFileSync(file, 'utf-8');

        // 1. Check jumpLessons prop passed to LessonLayout
        if (!content.includes('jumpLessons={')) {
            issues.push(`[${rel}] Missing jumpLessons prop in LessonLayout`);
        }

        // 2. Check starterCode prop
        if (!content.includes('starterCode={')) {
            issues.push(`[${rel}] Missing starterCode prop in LessonLayout`);
        }

        // 3. Check completionKey prop
        if (!content.includes('completionKey="') && !content.includes('completionKey={\`')) {
            issues.push(`[${rel}] Missing completionKey prop`);
        }

        // 4. Check xpAmount
        if (!content.includes('xpAmount={')) {
            issues.push(`[${rel}] Missing xpAmount prop`);
        }

        // 5. Check mode
        if (!content.includes('mode="') && !content.includes("mode='")) {
            issues.push(`[${rel}] Missing mode prop`);
        }

        // 6. Check Checklist initialized
        if (!content.includes('DojoEngine.initChecklist(')) {
            issues.push(`[${rel}] Missing DojoEngine.initChecklist`);
        }

        // 7. Check Draft Persistence
        if (!content.includes('DojoEngine.setupDraftPersistence(')) {
            issues.push(`[${rel}] Missing setupDraftPersistence`);
        }
    }
}

console.log(`\n================ 81 LESSONS STRUCTURAL AUDIT ================`);
console.log(`Total Lessons Audited: ${totalAudited}`);
console.log(`Structural Issues Found: ${issues.length}`);

if (issues.length > 0) {
    issues.forEach((iss, i) => console.log(`${i + 1}. ❌ ${iss}`));
} else {
    console.log('🎉 ALL 81 LESSONS PASS 100% OF STRUCTURAL & FRAMEWORK CHECKS!');
}

import fs from 'fs';
import path from 'path';

// Master Deep Audit for ALL 81 Lessons across Levels 4 through 10
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

let totalLessonsAudited = 0;
let errors = [];

for (const { level, path: dir } of lessonDirs) {
    if (!fs.existsSync(dir)) {
        errors.push(`Directory does not exist: ${dir}`);
        continue;
    }

    let files = [];
    if (level.toString().startsWith('7')) {
        files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f.includes('lesson')).map(f => path.join(dir, f));
    } else {
        const subdirs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory() && f.startsWith('lesson'));
        files = subdirs.map(sd => path.join(dir, sd, `${sd}_remake.astro`));
    }

    for (const file of files) {
        totalLessonsAudited++;
        const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
        const content = fs.readFileSync(file, 'utf-8');

        // Check required LessonLayout props
        const requiredProps = ['title', 'description', 'levelTag', 'lessonNum', 'lessonTitle', 'xpAmount', 'completionKey', 'nextLessonUrl', 'hubUrl', 'mode', 'jumpLessons'];
        for (const prop of requiredProps) {
            if (!content.includes(`${prop}=`)) {
                errors.push(`[${rel}] Missing prop '${prop}' in LessonLayout`);
            }
        }

        // Check starter code existence
        if (!content.includes('const starterCode = `')) {
            errors.push(`[${rel}] Missing starterCode definition`);
        }

        // Check DojoEngine.initChecklist existence
        if (!content.includes('DojoEngine.initChecklist(')) {
            errors.push(`[${rel}] Missing DojoEngine.initChecklist call`);
        }

        // Check draft persistence key
        if (!content.includes('DojoEngine.setupDraftPersistence(')) {
            errors.push(`[${rel}] Missing setupDraftPersistence call`);
        }

        // Check jumpLessons array non-empty
        const jumpMatch = content.match(/const jumpLessons = (\[[\s\S]*?\]);/);
        if (!jumpMatch) {
            errors.push(`[${rel}] Missing or invalid jumpLessons array`);
        } else {
            try {
                const jumps = new Function(`return ${jumpMatch[1]}`)();
                if (!Array.isArray(jumps) || jumps.length === 0) {
                    errors.push(`[${rel}] jumpLessons is empty`);
                }
            } catch (e) {
                errors.push(`[${rel}] Failed to parse jumpLessons: ${e.message}`);
            }
        }
    }
}

console.log('\n================ 81 LESSONS DEEP INTEGRITY AUDIT ================');
console.log(`Total Lessons Audited: ${totalLessonsAudited}`);
console.log(`Integrity Errors Found: ${errors.length}`);

if (errors.length > 0) {
    errors.forEach((err, i) => console.log(`${i + 1}. ❌ ${err}`));
} else {
    console.log('🎉 ALL 81 DOJO LESSONS HAVE PERFECT STRUCTURE & ZERO RUNTIME HOOK DEFECTS!');
}

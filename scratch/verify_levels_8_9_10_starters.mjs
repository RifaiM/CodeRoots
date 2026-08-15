import fs from 'fs';
import path from 'path';

// Comprehensive test of all 18 lessons in Levels 8, 9, 10
const dirs = [
    { level: 8, path: path.resolve('src/pages/7. partG') },
    { level: 9, path: path.resolve('src/pages/8. partH') },
    { level: 10, path: path.resolve('src/pages/9. partI') },
];

let totalLessons = 0;
let errorsFound = 0;

for (const { level, path: dir } of dirs) {
    const lessonDirs = fs.readdirSync(dir)
        .filter(f => fs.statSync(path.join(dir, f)).isDirectory() && f.startsWith('lesson'))
        .sort((a, b) => {
            const numA = parseInt(a.replace('lesson', ''), 10);
            const numB = parseInt(b.replace('lesson', ''), 10);
            return numA - numB;
        });

    for (const lDir of lessonDirs) {
        totalLessons++;
        const file = path.join(dir, lDir, `${lDir}_remake.astro`);
        const content = fs.readFileSync(file, 'utf-8');

        // Extract starterCode
        const starterMatch = content.match(/const starterCode = `([\s\S]*?)`;/);
        if (!starterMatch) {
            console.error(`❌ [Level ${level} ${lDir}] Missing starterCode`);
            errorsFound++;
            continue;
        }
        const starter = starterMatch[1];

        // Extract checklist array
        const checklistMatch = content.match(/const checklist = (\[[\s\S]*?\]);/);
        if (!checklistMatch) {
            console.error(`❌ [Level ${level} ${lDir}] Missing checklist array`);
            errorsFound++;
            continue;
        }

        let checklist;
        try {
            // Evaluate checklist safely
            const evalFn = new Function(`return ${checklistMatch[1]}`);
            checklist = evalFn();
        } catch (e) {
            console.error(`❌ [Level ${level} ${lDir}] Failed to parse checklist: ${e.message}`);
            errorsFound++;
            continue;
        }

        // Test Starter Code Against Checklist
        let starterPassCount = 0;
        for (let i = 0; i < checklist.length; i++) {
            const task = checklist[i];
            const testFn = task.test;
            if (testFn && testFn(starter)) {
                starterPassCount++;
            }
        }

        if (starterPassCount === checklist.length) {
            console.error(`⚠️ [Level ${level} ${lDir}] STARTER ALREADY PASSES ALL TASKS (${starterPassCount}/${checklist.length})! Starter must require student edits.`);
            errorsFound++;
        } else {
            console.log(`✅ [Level ${level} ${lDir}] Starter properly incomplete: ${starterPassCount}/${checklist.length} passed.`);
        }
    }
}

console.log(`\n================ SUMMARY ================`);
console.log(`Total Lessons Tested: ${totalLessons}`);
console.log(`Errors / Premature Completions: ${errorsFound}`);
if (errorsFound === 0) {
    console.log(`🎉 ALL 18 LESSONS PASSED INTEGRITY VERIFICATION!`);
}

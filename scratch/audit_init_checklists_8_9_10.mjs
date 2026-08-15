import fs from 'fs';
import path from 'path';

// Audit all 18 lessons in Levels 8, 9, 10 for starter code vs checklist tasks
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

        // Extract DojoEngine.initChecklist([ ... ], {
        const checklistMatch = content.match(/DojoEngine\.initChecklist\(\s*(\[[\s\S]*?\])\s*,\s*\{/);
        if (!checklistMatch) {
            console.error(`❌ [Level ${level} ${lDir}] Missing DojoEngine.initChecklist`);
            errorsFound++;
            continue;
        }

        let tasks;
        try {
            const evalFn = new Function(`return ${checklistMatch[1]}`);
            tasks = evalFn();
        } catch (e) {
            console.error(`❌ [Level ${level} ${lDir}] Failed to parse checklist: ${e.message}`);
            errorsFound++;
            continue;
        }

        // Test Starter Code Against Checklist
        let starterPassCount = 0;
        const failedTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const testFn = task.fn;
            if (testFn && testFn(starter)) {
                starterPassCount++;
            } else {
                failedTasks.push(task.label || task.id);
            }
        }

        if (starterPassCount === tasks.length) {
            console.error(`⚠️ [Level ${level} ${lDir}] STARTER ALREADY PASSES ALL TASKS (${starterPassCount}/${tasks.length})! Starter must require student edits.`);
            errorsFound++;
        } else {
            console.log(`✅ [Level ${level} ${lDir}] Properly incomplete starter: ${starterPassCount}/${tasks.length} passed. Tasks remaining: ${tasks.length - starterPassCount}`);
        }
    }
}

console.log(`\n================ SUMMARY ================`);
console.log(`Total Lessons Audited: ${totalLessons}`);
console.log(`Errors / Premature Completions: ${errorsFound}`);
if (errorsFound === 0) {
    console.log(`🎉 ALL 18 LESSONS HAVE PROPERLY INCOMPLETE STARTERS AND VALID CHECKLISTS!`);
}

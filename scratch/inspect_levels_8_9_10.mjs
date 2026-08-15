import fs from 'fs';
import path from 'path';

const dirs = [
    { level: 8, path: path.resolve('src/pages/7. partG') },
    { level: 9, path: path.resolve('src/pages/8. partH') },
    { level: 10, path: path.resolve('src/pages/9. partI') },
];

for (const { level, path: dir } of dirs) {
    console.log(`\n================ LEVEL ${level} (${path.basename(dir)}) ================`);
    const lessonDirs = fs.readdirSync(dir)
        .filter(f => fs.statSync(path.join(dir, f)).isDirectory() && f.startsWith('lesson'))
        .sort((a, b) => {
            const numA = parseInt(a.replace('lesson', ''), 10);
            const numB = parseInt(b.replace('lesson', ''), 10);
            return numA - numB;
        });

    for (const lDir of lessonDirs) {
        const file = path.join(dir, lDir, `${lDir}_remake.astro`);
        if (!fs.existsSync(file)) {
            console.log(`❌ Missing: ${file}`);
            continue;
        }
        const content = fs.readFileSync(file, 'utf-8');
        const titleMatch = content.match(/lessonTitle="([^"]+)"/);
        const levelTagMatch = content.match(/levelTag="([^"]+)"/);
        console.log(`  ${lDir}: [${levelTagMatch ? levelTagMatch[1] : 'N/A'}] ${titleMatch ? titleMatch[1] : 'N/A'}`);
    }
}

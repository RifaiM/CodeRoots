import fs from 'fs';
import path from 'path';

// Fix the leftover <div slot="intro"> wrapper — restore original <p class="lesson-subtitle" slot="intro"> pattern
const dirs = [
    path.resolve('src/pages/7. partG'),
    path.resolve('src/pages/8. partH'),
    path.resolve('src/pages/9. partI'),
];

let totalFixed = 0;

for (const dir of dirs) {
    const files = fs.readdirSync(dir)
        .map(f => path.join(dir, f))
        .filter(f => fs.statSync(f).isDirectory())
        .flatMap(d => fs.readdirSync(d).map(f => path.join(d, f)))
        .filter(f => f.endsWith('.astro') && f.includes('lesson'));

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        const rel = path.relative(process.cwd(), file);

        // Pattern left after removal:
        //   <!-- Intro Slot -->
        //   <div slot="intro">
        //       <p class="lesson-subtitle">
        //           ...text...
        //       </p>
        //       </div>
        //
        // Target:
        //   <!-- Intro Slot -->
        //   <p class="lesson-subtitle" slot="intro">
        //       ...text...
        //   </p>

        const leftoverPattern = /<!-- Intro Slot -->\s*<div slot="intro">\s*<p class="lesson-subtitle">([\s\S]*?)<\/p>\s*<\/div>/;
        const match = content.match(leftoverPattern);

        if (match) {
            const subtitleText = match[1].trim();
            const clean = `<!-- Intro Slot -->
    <p class="lesson-subtitle" slot="intro">
        ${subtitleText}
    </p>`;
            content = content.replace(leftoverPattern, clean);
            fs.writeFileSync(file, content, 'utf-8');
            console.log(`✅ Cleaned up wrapper in ${rel}`);
            totalFixed++;
        } else {
            console.log(`⏭️  Already clean: ${rel}`);
        }
    }
}

console.log(`\n✨ Done. Cleaned up ${totalFixed} lesson intro wrappers.`);

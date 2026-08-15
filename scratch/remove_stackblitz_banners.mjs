import fs from 'fs';
import path from 'path';

const dirs = [
    path.resolve('src/pages/7. partG'),
    path.resolve('src/pages/8. partH'),
    path.resolve('src/pages/9. partI'),
];

let totalUpdated = 0;

for (const dir of dirs) {
    const files = fs.readdirSync(dir)
        .map(f => path.join(dir, f))
        .filter(f => fs.statSync(f).isDirectory())
        .flatMap(d => fs.readdirSync(d).map(f => path.join(d, f)))
        .filter(f => f.endsWith('.astro') && f.includes('lesson'));

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        const rel = path.relative(process.cwd(), file);

        if (!content.includes('stackblitz-banner')) {
            console.log(`⏭️  No banner found in ${rel}`);
            continue;
        }

        // The banner was added inside a <div slot="intro"> wrapper.
        // Pattern to restore:
        //   <div slot="intro">
        //       <p class="lesson-subtitle">
        //           ...subtitle text...
        //       </p>
        //       <div class="stackblitz-banner">
        //           ...all banner content...
        //       </div>
        //   </div>
        //
        // We want to restore it to the original:
        //   <p class="lesson-subtitle" slot="intro">
        //       ...subtitle text...
        //   </p>

        const wrapperRegex = /<!-- Intro Slot -->\s*<div slot="intro">\s*<p class="lesson-subtitle">([\s\S]*?)<\/p>\s*<div class="stackblitz-banner">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

        const match = content.match(wrapperRegex);
        if (match) {
            const subtitleText = match[1].trim();
            const replacement = `<!-- Intro Slot -->
    <p class="lesson-subtitle" slot="intro">
        ${subtitleText}
    </p>`;
            content = content.replace(wrapperRegex, replacement);
            fs.writeFileSync(file, content, 'utf-8');
            console.log(`✅ Removed banner and restored clean intro in ${rel}`);
            totalUpdated++;
        } else {
            // Try simpler fallback: just remove stackblitz-banner div in place
            const bannerOnly = /<div class="stackblitz-banner">[\s\S]*?<\/div>\s*<\/div>/;
            if (bannerOnly.test(content)) {
                content = content.replace(bannerOnly, '</div>');
                fs.writeFileSync(file, content, 'utf-8');
                console.log(`✅ Removed banner block from ${rel} (fallback)`);
                totalUpdated++;
            } else {
                console.warn(`⚠️  Could not parse banner pattern in ${rel} — skipping`);
            }
        }
    }
}

console.log(`\n🎉 Done. Removed StackBlitz banners from ${totalUpdated} lessons.`);

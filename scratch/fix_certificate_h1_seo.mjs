/**
 * Update certificate pages generator header from <h2> to <h1> for semantic SEO heading hierarchy
 */

import fs from 'fs';

const certFiles = [
    'src/pages/2. partB/certificate.astro',
    'src/pages/3. partC/certificate.astro',
    'src/pages/5. partE/certificate.astro',
    'src/pages/6. partF/certificate.astro',
    'src/pages/7. partG/certificate.astro',
    'src/pages/8. partH/certificate.astro',
    'src/pages/9. partI/certificate.astro'
];

certFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    // Replace <h2> in generator-header with <h1>
    content = content.replace(/<div class="generator-header">\s*<h2>([^<]+)<\/h2>/g, '<div class="generator-header">\n                    <h1>$1</h1>');
    // Update CSS rule to support h1 as well
    content = content.replace(/\.generator-header h2\s*\{/g, '.generator-header h1,\n        .generator-header h2 {');
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Updated H1 heading in ${file}`);
});

console.log('🎉 All 7 certificate pages now have semantic H1 headers!');

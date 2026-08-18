import fs from 'fs';
import path from 'path';

// Clean navLinks across all pages to concise words without emojis
const files = [
    'src/pages/index.astro',
    'src/pages/foundations.astro',
    'src/pages/1. partA/hub.astro',
    'src/pages/1. partA/web_history.astro',
    'src/pages/1. partA/website_concept/website_concept.astro',
    'src/pages/1. partA/html_concept/html_concept.astro',
    'src/pages/1. partA/css_concept/css_concept.astro',
    'src/pages/1. partA/javascript_concept/javascript_concept.astro',
    'src/pages/2. partB/hub.astro',
    'src/pages/2. partB/certificate.astro',
    'src/pages/3. partC/hub.astro',
    'src/pages/3. partC/certificate.astro',
    'src/pages/5. partE/hub.astro',
    'src/pages/5. partE/certificate.astro',
    'src/pages/6. partF/hub.astro',
    'src/pages/6. partF/certificate.astro',
    'src/pages/7. partG/hub.astro',
    'src/pages/7. partG/certificate.astro',
    'src/pages/8. partH/hub.astro',
    'src/pages/8. partH/certificate.astro',
    'src/pages/9. partI/hub.astro',
    'src/pages/9. partI/certificate.astro',
    'src/pages/privacy.astro',
    'src/pages/terms.astro',
    'src/pages/disclaimer.astro',
    'src/layouts/LessonLayout.astro'
];

files.forEach(f => {
    const fullPath = path.resolve(f);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Standardize navLinks labels & remove emojis
    content = content.replace(/label:\s*['"]Skill Tree['"]/g, "label: 'Roadmap'");
    content = content.replace(/label:\s*['"]🗺️\s*Skill Tree['"]/g, "label: 'Roadmap'");
    content = content.replace(/label:\s*['"]📚\s*Foundations['"]/g, "label: 'Foundations'");
    content = content.replace(/label:\s*['"]⚔️\s*Practical Dojo['"]/g, "label: 'Dojo'");
    content = content.replace(/label:\s*['"]Practical Dojo['"]/g, "label: 'Dojo'");
    content = content.replace(/label:\s*['"]📜\s*Certificate['"]/g, "label: 'Certs'");
    content = content.replace(/label:\s*['"]Certificate['"]/g, "label: 'Certs'");
    content = content.replace(/label:\s*['"]🏠\s*Dashboard['"]/g, "label: 'Dashboard'");
    content = content.replace(/icon:\s*['"][^'"]+['"],?\s*/g, '');

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Cleaned navLinks in ${f}`);
});

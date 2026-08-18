import fs from 'fs';
import path from 'path';

// Standardize navLinks across all pages with clean icons & labels
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

    // Index page
    if (f === 'src/pages/index.astro') {
        const indexNav = `const navLinks = [
    { href: '#roadmap', label: 'Roadmap', icon: '🗺️', active: true, title: 'Curriculum Roadmap' },
    { href: '/1. partA/hub.html', label: 'Foundations', icon: '📚', title: 'Foundations Academy' },
    { href: 'javascript:void(0)', label: 'Dojo', icon: '⚔️', title: 'Practical Dojo Hub', id: 'dojoNavLink', extraClass: 'dojo-nav-highlight', onClick: 'openDojoHub()' },
    { href: 'javascript:void(0)', label: 'Certs', icon: '📜', title: 'Proof-of-Work Certificates', id: 'certificateNavLink', onClick: 'openCertificateHub()' }
];`;
        content = content.replace(/const navLinks = \[[\s\S]*?\];/m, indexNav);
    } else {
        // Other pages
        const standardNav = `const navLinks = [
    { href: '/', label: 'Roadmap', icon: '🗺️', title: 'Curriculum Roadmap' },
    { href: '/1. partA/hub.html', label: 'Foundations', icon: '📚', title: 'Foundations Academy' },
    { href: 'javascript:void(0)', label: 'Dojo', icon: '⚔️', title: 'Practical Dojo Hub', id: 'dojoNavLink', extraClass: 'dojo-nav-highlight', onClick: 'openDojoHub()' },
    { href: 'javascript:void(0)', label: 'Certs', icon: '📜', title: 'Proof-of-Work Certificates', id: 'certificateNavLink', onClick: 'openCertificateHub()' }
];`;
        content = content.replace(/const navLinks = \[[\s\S]*?\];/m, standardNav);
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated icons in ${f}`);
});

import fs from 'fs';

let content = fs.readFileSync('src/components/UserProfileModal.astro', 'utf-8');

// Update Certificate Hub Items
content = content.replace(
    /const l8Item = renderCertItem\('🌉 Level 8 Certificate', 'Fullstack API Integration Specialist'/,
    "const l8Item = renderCertItem('🌉 Level 8 Certificate', 'Async UI & Client Data Specialist'"
);

content = content.replace(
    /const l9Item = renderCertItem\('🛡️ Level 9 Certificate', 'Fullstack Auth & Database Architect'/,
    "const l9Item = renderCertItem('🛡️ Level 9 Certificate', 'React Auth & Access Control Specialist'"
);

content = content.replace(
    /const l10Item = renderCertItem\('🎓 Level 10 Diploma', 'Grand Master Fullstack Software Engineer'/,
    "const l10Item = renderCertItem('🎓 Level 10 Diploma', 'SaaS UI & Design Systems Architect'"
);

// Update Dojo Hub Item 10
content = content.replace(
    /'🏆 Level 10: Apex SaaS Capstone'/,
    "'🏆 Level 10: SaaS UI & Design Systems Dojo'"
);

fs.writeFileSync('src/components/UserProfileModal.astro', content, 'utf-8');
console.log('✅ Updated UserProfileModal.astro certificate modal strings');

import fs from 'fs';

// 1. BaseLayout.astro
let base = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf-8');
base = base.replace(
    /title = 'NoviCodes • Fullstack Web Engineering & Production SaaS Platform'/,
    "title = 'CodeRoots • Master Modern Web & Frontend Engineering'"
);
base = base.replace(
    /description = 'Master modern fullstack web development from fundamentals through React, Python, Cloud DevOps, and PostgreSQL to deploying production SaaS applications\. 10 interactive levels, 81 projects, and 7 verifiable credentials\.'/,
    "description = 'Master modern web development from fundamentals through JavaScript, Python, React, and modern SaaS architecture. 10 interactive levels, 81 real projects, and 7 verifiable credentials.'"
);
fs.writeFileSync('src/layouts/BaseLayout.astro', base, 'utf-8');
console.log('✅ Updated BaseLayout.astro branding and defaults');

// 2. PlatformHeader.astro
let header = fs.readFileSync('src/components/PlatformHeader.astro', 'utf-8');
header = header.replace(
    /<span class="title-novi">Novi<\/span><span class="title-codes">Codes<\/span>/g,
    '<span class="title-novi">Code</span><span class="title-codes">Roots</span>'
);
header = header.replace(
    /aria-label="NoviCodes Dashboard Home"/,
    'aria-label="CodeRoots Dashboard Home"'
);
header = header.replace(
    /alt="NoviCodes Logo"/,
    'alt="CodeRoots Logo"'
);
fs.writeFileSync('src/components/PlatformHeader.astro', header, 'utf-8');
console.log('✅ Updated PlatformHeader.astro branding');

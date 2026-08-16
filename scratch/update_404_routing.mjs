import fs from 'fs';

let content = fs.readFileSync('src/pages/404.astro', 'utf-8');

// Update fast-track pill texts
content = content.replace(
    /<span class="pill-text">Level 8: API Bridge<\/span>/,
    '<span class="pill-text">Level 8: Async UI</span>'
);
content = content.replace(
    /<span class="pill-text">Level 9: Auth &amp; DB<\/span>/,
    '<span class="pill-text">Level 9: React Auth</span>'
);
content = content.replace(
    /<span class="pill-text">Level 10: Apex SaaS<\/span>/,
    '<span class="pill-text">Level 10: SaaS UI</span>'
);

// Update route router descriptions
content = content.replace(
    /targetName = `Level 10 • Apex SaaS Milestone \${lessonNum}`;/,
    'targetName = `Level 10 • SaaS UI Milestone ${lessonNum}`;'
);
content = content.replace(
    /targetDesc = `Jump directly into production SaaS capstone milestone \${lessonNum}\.`;/,
    'targetDesc = `Jump directly into SaaS UI & Design Systems milestone ${lessonNum}.`;'
);
content = content.replace(
    /targetDesc = '6 enterprise production capstone milestones, subscriptions, multi-tenancy, and deployment\勃;/,
    "targetDesc = '6 production SaaS layout shells, live search, billing switchers, and AI copilot projects.';"
);
content = content.replace(
    /targetName = `Level 9 • Auth & DB Dojo Lesson \${lessonNum}`;/,
    'targetName = `Level 9 • React Auth Lesson ${lessonNum}`;'
);
content = content.replace(
    /targetDesc = `Jump directly into interactive fullstack security milestone \${lessonNum}\.`;/,
    'targetDesc = `Jump directly into React auth state & access control milestone ${lessonNum}.`;'
);
content = content.replace(
    /targetName = 'Level 9 • Fullstack Auth & Database Dojo Hub';/,
    "targetName = 'Level 9 • React Auth & Access Control Hub';"
);
content = content.replace(
    /targetDesc = '6 fullstack authentication, Prisma ORM, JWT, and RBAC security projects\勃;/,
    "targetDesc = '6 client auth state, AuthContext, route guards, and RBAC security projects.';"
);
content = content.replace(
    /targetName = `Level 8 • API Bridge Dojo Lesson \${lessonNum}`;/,
    'targetName = `Level 8 • Async UI Lesson ${lessonNum}`;'
);
content = content.replace(
    /targetDesc = `Jump directly into interactive API bridge milestone \${lessonNum}\.`;/,
    'targetDesc = `Jump directly into async UI & live data milestone ${lessonNum}.`;'
);
content = content.replace(
    /targetDesc = '6 interactive REST & WebSocket fullstack integration projects\勃;/,
    "targetDesc = '6 interactive async UI, skeleton loaders, and live polling projects.';"
);

fs.writeFileSync('src/pages/404.astro', content, 'utf-8');
console.log('✅ Updated 404.astro routing copy and pills');

import fs from 'fs';
import path from 'path';

const hubs = [
    path.resolve('src/pages/7. partG/hub.astro'),
    path.resolve('src/pages/8. partH/hub.astro'),
    path.resolve('src/pages/9. partI/hub.astro')
];

for (const hub of hubs) {
    let content = fs.readFileSync(hub, 'utf-8');
    if (!content.includes('/scripts/dashboard.js')) {
        content = content.replace('</BaseLayout>', '    <script is:inline src="/scripts/dashboard.js"></script>\n</BaseLayout>');
        fs.writeFileSync(hub, content, 'utf-8');
        console.log(`✅ Added dashboard.js to ${path.basename(path.dirname(hub))}/hub.astro`);
    } else {
        console.log(`⏭️  Already has dashboard.js: ${path.basename(path.dirname(hub))}/hub.astro`);
    }
}

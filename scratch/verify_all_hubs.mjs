import fs from 'fs';
import path from 'path';

const hubs = [
    'src/pages/1. partA/hub.astro',
    'src/pages/2. partB/hub.astro',
    'src/pages/3. partC/hub.astro',
    'src/pages/5. partE/hub.astro',
    'src/pages/6. partF/hub.astro',
    'src/pages/7. partG/hub.astro',
    'src/pages/8. partH/hub.astro',
    'src/pages/9. partI/hub.astro'
];

console.log('=== Hub Files Audit ===');
hubs.forEach(h => {
    const fullPath = path.resolve(h);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        console.log(`✅ ${h} exists (${content.length} bytes)`);
    } else {
        console.error(`❌ ${h} NOT FOUND`);
    }
});

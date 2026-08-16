import fs from 'fs';
import vm from 'vm';

const files = [
    'public/data/level1_html.js',
    'public/data/level2_css.js',
    'public/data/level3_js.js',
    'public/data/level5_react.js',
    'public/data/level6_python.js',
    'public/data/level7a_cloud.js',
    'public/data/level7b_sql.js',
    'public/data/level7c_nextjs.js',
    'public/data/level8_async.js',
    'public/data/level9_auth.js',
    'public/data/level10_saas.js'
];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    try {
        vm.runInContext(content, sandbox);
        console.log(`✅ ${file}: Executed cleanly without error!`);
    } catch (e) {
        console.error(`❌ ${file}: ERROR:`, e.message);
    }
}

import fs from 'fs';
import vm from 'vm';

const tracks = [
    { key: 'html', file: 'public/data/level1_html.js', varName: 'LEVEL1_HTML_DATA' },
    { key: 'css', file: 'public/data/level2_css.js', varName: 'LEVEL2_CSS_DATA' },
    { key: 'js', file: 'public/data/level3_js.js', varName: 'LEVEL3_JS_DATA' },
    { key: 'react', file: 'public/data/level5_react.js', varName: 'LEVEL5_REACT_DATA' },
    { key: 'python', file: 'public/data/level6_python.js', varName: 'LEVEL6_PYTHON_DATA' },
    { key: 'cloud', file: 'public/data/level7a_cloud.js', varName: 'LEVEL7A_CLOUD_DATA' },
    { key: 'sql', file: 'public/data/level7b_sql.js', varName: 'LEVEL7B_SQL_DATA' },
    { key: 'nextjs', file: 'public/data/level7c_nextjs.js', varName: 'LEVEL7C_NEXTJS_DATA' },
    { key: 'async', file: 'public/data/level8_async.js', varName: 'LEVEL8_ASYNC_DATA' },
    { key: 'auth', file: 'public/data/level9_auth.js', varName: 'LEVEL9_AUTH_DATA' },
    { key: 'saas', file: 'public/data/level10_saas.js', varName: 'LEVEL10_SAAS_DATA' }
];

console.log('🧪 Auditing all 11 Foundations Track Data Modules...');

const sandbox = { window: {} };
vm.createContext(sandbox);

let passCount = 0;

for (const track of tracks) {
    if (!fs.existsSync(track.file)) {
        console.error(`❌ Missing file: ${track.file}`);
        continue;
    }

    const code = fs.readFileSync(track.file, 'utf-8');
    try {
        vm.runInContext(code, sandbox);
        const data = sandbox.window[track.varName];
        if (!data) {
            console.error(`❌ window.${track.varName} not defined in ${track.file}`);
            continue;
        }

        // Validate structure
        if (!data.title || !data.concepts || !data.concepts.heroAnalogy || !data.concepts.sections || !data.glossary || !data.sandbox || !data.quizzes) {
            console.error(`❌ Incomplete data structure for track ${track.key} (${track.file})`);
            continue;
        }

        console.log(`✅ Track ?track=${track.key} -> "${data.title}" (${data.glossary.length} glossary terms, ${data.quizzes.length} quiz questions)`);
        passCount++;
    } catch (err) {
        console.error(`❌ Syntax error in ${track.file}:`, err.message);
    }
}

console.log(`\n🎉 Audit Complete: ${passCount} / ${tracks.length} Foundations Tracks 100% Validated!`);

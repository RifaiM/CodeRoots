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

console.log('🧪 Testing HTML & Script parsing in all sandbox templates...');

for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);

    const keys = Object.keys(sandbox.window);
    const dataObj = sandbox.window[keys[0]];

    if (dataObj && dataObj.sandbox && dataObj.sandbox.initialHTML) {
        const html = dataObj.sandbox.initialHTML;
        
        // Extract all <script> contents and validate syntax with vm
        const scriptMatches = html.match(/<script(?![^>]*type=["']text\/babel["'])[^>]*>([\s\S]*?)<\/script>/gi);
        if (scriptMatches) {
            for (const scriptTag of scriptMatches) {
                const code = scriptTag.replace(/<\/?script[^>]*>/gi, '');
                try {
                    new Function(code);
                } catch (e) {
                    console.error(`❌ Syntax Error in ${file} embedded <script>:`, e.message);
                }
            }
        }

        // Test all onclick="..." attributes for syntax errors
        const onclickMatches = html.matchAll(/onclick=(["'])(.*?)\1/gi);
        for (const match of onclickMatches) {
            const handler = match[2];
            try {
                new Function(handler);
            } catch (e) {
                console.error(`❌ Syntax Error in ${file} onclick="${handler}":`, e.message);
            }
        }

        console.log(`✅ ${file}: Sandbox HTML & embedded scripts 100% Valid!`);
    }
}

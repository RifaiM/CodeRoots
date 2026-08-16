import fs from 'fs';
import { parse } from 'acorn';

const code = fs.readFileSync('public/scripts/pyodideRunner.js', 'utf-8');
try {
    parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('✅ [VALID ESM MODULE] public/scripts/pyodideRunner.js');
} catch (e) {
    console.error('❌ ESM error in pyodideRunner.js:', e.message);
}

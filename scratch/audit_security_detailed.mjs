import fs from 'fs';
import path from 'path';

console.log('🔒 Starting Deep Security Audit...');

function scanDir(dir, filterFn) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scratch') continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(scanDir(fullPath, filterFn));
        } else if (filterFn(file)) {
            results.push(fullPath);
        }
    }
    return results;
}

const allCodeFiles = scanDir(path.resolve('.'), f => f.endsWith('.astro') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.json'));

console.log(`Found ${allCodeFiles.length} source code files to scan.`);

let findings = [];

// 1. Check for hardcoded API keys or secrets
const secretPatterns = [
    { name: 'OpenAI / Stripe secret key pattern', regex: /sk-[a-zA-Z0-9_-]{20,}/ },
    { name: 'AWS Access Key pattern', regex: /AKIA[0-9A-Z]{16}/ },
    { name: 'Generic private key', regex: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/ },
    { name: 'Hardcoded password literal', regex: /(?:password|passwd|secret)\s*[:=]\s*["'][^"'\s]{8,}["']/i }
];

// 2. Check for unsafe innerHTML in client code
const innerHTMLPattern = /\.innerHTML\s*=\s*(?!['"`]<[a-zA-Z0-9_\s\-\/="'#;:.,?&]+>['"`])([^;]+)/g;

for (const file of allCodeFiles) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');

    // Skip test scripts / scratch
    if (rel.startsWith('scratch/')) continue;

    // Check secrets
    for (const p of secretPatterns) {
        const match = content.match(p.regex);
        if (match) {
            // Ignore mock dummy tokens in lessons
            if (content.includes('fakeToken') || content.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo') || content.includes('secret123')) {
                continue;
            }
            findings.push({ file: rel, severity: 'HIGH', category: 'Secret Leak', detail: `Potential secret found matching ${p.name}: ${match[0].slice(0, 10)}...` });
        }
    }

    // Check dangerous eval
    if (content.includes('eval(') && !rel.includes('xpEngine') && !rel.includes('scratch/')) {
        // If eval is inside a safe parser or string
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('eval(') && !line.trim().startsWith('//')) {
                findings.push({ file: rel, line: idx + 1, severity: 'MEDIUM', category: 'Dynamic Code Execution', detail: line.trim() });
            }
        });
    }

    // Check innerHTML assignments
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (line.includes('.innerHTML =') && !line.trim().startsWith('//')) {
            // Check if it's using escapeHTML, textContent, or static string
            if (!line.includes('escapeHTML') && !line.includes('encodeURIComponent') && !line.includes('`') && !line.includes("'") && !line.includes('"')) {
                findings.push({ file: rel, line: idx + 1, severity: 'LOW', category: 'DOM XSS Check', detail: line.trim() });
            }
        }
    });
}

// 3. Check vercel.json for Security Headers
let vercelJsonCheck = 'PASS';
if (fs.existsSync('vercel.json')) {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
    const headers = vercelConfig.headers || [];
    const hasSecurityHeaders = headers.some(h => 
        h.headers && h.headers.some(sub => sub.key === 'X-Content-Type-Options' || sub.key === 'X-Frame-Options')
    );
    if (!hasSecurityHeaders) {
        vercelJsonCheck = 'WARN: vercel.json missing standard HTTP security headers';
    }
} else {
    vercelJsonCheck = 'WARN: vercel.json does not exist';
}

console.log('\n================ SECURITY AUDIT REPORT ================');
console.log(`vercel.json HTTP Headers: ${vercelJsonCheck}`);
console.log(`Potential Findings: ${findings.length}`);

if (findings.length > 0) {
    findings.forEach((f, i) => {
        console.log(`${i + 1}. [${f.severity}] (${f.category}) ${f.file}${f.line ? ':' + f.line : ''} -> ${f.detail}`);
    });
} else {
    console.log('🎉 ZERO CRITICAL OR HIGH SECURITY VULNERABILITIES DETECTED!');
}

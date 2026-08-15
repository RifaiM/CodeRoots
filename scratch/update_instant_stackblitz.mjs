import fs from 'fs';
import path from 'path';

const levels = [
    {
        dir: path.resolve('src/pages/7. partG'),
        oldUrl: 'https://stackblitz.com/fork/github/vitejs/vite/tree/main/examples/react',
        newUrl: 'https://stackblitz.com/fork/vite',
        badgeText: '⚡ Live Node.js Runtime',
        description: 'Master the concept here in your browser sandbox. To run with a <strong>live backend REST API and live server routes</strong>, launch the instant fullstack WebContainer:',
        buttonText: '⚡ Open in StackBlitz (Instant Node.js) →'
    },
    {
        dir: path.resolve('src/pages/8. partH'),
        oldUrl: 'https://stackblitz.com/fork/github/supabase/supabase/tree/master/examples/auth/nextjs',
        newUrl: 'https://stackblitz.com/fork/nextjs',
        badgeText: '🔒 Cloud Auth & Database',
        description: 'Master authentication and schema concepts here. To run with <strong>live server routes, JWT session cookies, and database models</strong>, launch the instant Next.js sandbox:',
        buttonText: '⚡ Open in StackBlitz (Instant Next.js) →'
    },
    {
        dir: path.resolve('src/pages/9. partI'),
        oldUrl: 'https://stackblitz.com/fork/github/vercel/next.js/tree/canary/examples/with-stripe-typescript',
        newUrl: 'https://stackblitz.com/fork/nextjs',
        badgeText: '🏆 Production SaaS Stack',
        description: 'Master modern enterprise architectures here. To run with <strong>live Stripe webhook listeners, AI streaming inference endpoints, and Cloud SQL</strong>, launch the instant SaaS sandbox:',
        buttonText: '⚡ Open in StackBlitz (Instant Next.js SaaS) →'
    }
];

let updated = 0;

for (const level of levels) {
    const files = fs.readdirSync(level.dir)
        .map(f => path.join(level.dir, f))
        .filter(f => fs.statSync(f).isDirectory())
        .flatMap(d => fs.readdirSync(d).map(f => path.join(d, f)))
        .filter(f => f.endsWith('.astro') && f.includes('lesson'));

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        const rel = path.relative(process.cwd(), file);

        // Replace the entire banner or just the URL & text
        const bannerRegex = /<div class="stackblitz-banner">[\s\S]*?<\/div>\s*<\/div>/;
        
        const newBanner = `<div class="stackblitz-banner">
            <div class="sb-badge-row">
                <span class="sb-badge">${level.badgeText}</span>
                <span class="sb-runtime-tag">Instant WebContainer</span>
            </div>
            <p>${level.description}</p>
            <a href="${level.newUrl}" target="_blank" rel="noopener noreferrer" class="sb-open-btn">
                <span>${level.buttonText}</span>
            </a>
        </div>
    </div>`;

        if (bannerRegex.test(content)) {
            content = content.replace(bannerRegex, newBanner);
            fs.writeFileSync(file, content, 'utf-8');
            console.log(`✅ Updated StackBlitz link to ${level.newUrl} in ${rel}`);
            updated++;
        }
    }
}

console.log(`\n🎉 Successfully updated StackBlitz instant templates in ${updated} lessons.`);

import fs from 'fs';
import path from 'path';

const levels = [
    {
        dir: path.resolve('src/pages/7. partG'),
        badgeText: '⚡ Live Node.js Runtime',
        description: 'Master the concept here in your browser sandbox. To run with a <strong>live backend REST API and live server routes</strong>, launch the official fullstack sandbox:',
        url: 'https://stackblitz.com/fork/github/vitejs/vite/tree/main/examples/react',
        buttonText: '⚡ Open in StackBlitz (Live Node.js) →'
    },
    {
        dir: path.resolve('src/pages/8. partH'),
        badgeText: '🔒 Cloud Auth & Database',
        description: 'Master authentication and schema concepts here. To run with <strong>live PostgreSQL, JWT session cookies, and database migrations</strong>, launch the official cloud starter:',
        url: 'https://stackblitz.com/fork/github/supabase/supabase/tree/master/examples/auth/nextjs',
        buttonText: '⚡ Open in StackBlitz (Supabase + Next.js) →'
    },
    {
        dir: path.resolve('src/pages/9. partI'),
        badgeText: '🏆 Production SaaS Stack',
        description: 'Master modern enterprise architectures here. To run with <strong>live Stripe webhook listeners, AI streaming inference endpoints, and Cloud SQL</strong>, launch the fullstack SaaS sandbox:',
        url: 'https://stackblitz.com/fork/github/vercel/next.js/tree/canary/examples/with-stripe-typescript',
        buttonText: '⚡ Open in StackBlitz (Next.js + Stripe SaaS) →'
    }
];

let totalUpgraded = 0;

for (const level of levels) {
    const files = fs.readdirSync(level.dir)
        .map(f => path.join(level.dir, f))
        .filter(f => fs.statSync(f).isDirectory())
        .flatMap(d => fs.readdirSync(d).map(f => path.join(d, f)))
        .filter(f => f.endsWith('.astro') && f.includes('lesson'));

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        const rel = path.relative(process.cwd(), file);

        if (content.includes('stackblitz-banner')) {
            console.log(`⏭️ Already has StackBlitz banner: ${rel}`);
            continue;
        }

        // Pattern to replace:
        // <!-- Intro Slot -->
        // <p class="lesson-subtitle" slot="intro">
        //     ...
        // </p>
        const introMatch = content.match(/<!-- Intro Slot -->\s*<p class="lesson-subtitle" slot="intro">([\s\S]*?)<\/p>/);
        if (!introMatch) {
            console.warn(`⚠️ Could not match intro slot in ${rel}`);
            continue;
        }

        const subtitleText = introMatch[1].trim();

        const replacement = `<!-- Intro Slot -->
    <div slot="intro">
        <p class="lesson-subtitle">
            ${subtitleText}
        </p>
        <div class="stackblitz-banner">
            <div class="sb-badge-row">
                <span class="sb-badge">${level.badgeText}</span>
                <span class="sb-runtime-tag">WebContainer Engine</span>
            </div>
            <p>${level.description}</p>
            <a href="${level.url}" target="_blank" rel="noopener noreferrer" class="sb-open-btn">
                <span>${level.buttonText}</span>
            </a>
        </div>
    </div>`;

        content = content.replace(introMatch[0], replacement);
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`✅ Added StackBlitz bridge to ${rel}`);
        totalUpgraded++;
    }
}

console.log(`\n🎉 Successfully added StackBlitz Concept Bridge to ${totalUpgraded} lessons.`);

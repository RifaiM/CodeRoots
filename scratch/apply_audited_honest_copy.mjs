import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git' && f !== 'dist') {
                walkDir(fullPath, callback);
            }
        } else {
            callback(fullPath);
        }
    });
}

let modifiedCount = 0;

// Category 1: Stripe -> Pricing Switcher & Tiers
// Category 2: AI LLM Inference API -> AI Helper Panel & Simulated Stream UI
// Category 3: Live Deployments -> Hosting Manifest Configurations / API Logic
// Category 4: Cloud DB Clusters -> PostgreSQL Connection URI & SSL Config
// Category 5: Enterprise Microservices -> Modular Next.js Layout Shell & UI

walkDir('src', filePath => {
    if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        // Level 10 Lesson 3 (Stripe -> Pricing Switcher)
        content = content.replace(/Stripe Checkout & Webhook Subscription Tiers/g, 'Subscription Pricing Switcher & Tier Cards');
        content = content.replace(/Stripe Checkout & Subscription Tiers/g, 'Subscription Pricing Switcher & Tier Cards');
        content = content.replace(/Stripe Checkout/g, 'Subscription Switcher');
        content = content.replace(/Handle recurring SaaS monetization by creating Stripe checkout session triggers and webhook subscription tier handlers\./g, 'Build an interactive monthly and annual subscription billing switcher with highlighted plan features and active plan states.');
        content = content.replace(/Stripe Webhooks are like digital automated courier receipts 🧾: the instant a user pays at checkout, Stripe notifies your server to upgrade their account permissions\./g, 'A pricing switcher lets users toggle between monthly and annual billing rates, dynamically updating discounts and feature lists in real time.');

        // Level 10 Lesson 4 (AI LLM -> AI Helper Panel UI)
        content = content.replace(/Modern AI \/ LLM REST API Integration/g, 'AI Helper Panel & Response Stream UI');
        content = content.replace(/Modern AI \/ LLM REST API/g, 'AI Helper Panel & Response Stream UI');
        content = content.replace(/Connect frontend applications to AI LLM inference endpoints to generate automated summaries and smart content tags\./g, 'Build an interactive AI prompt assistant with simulated response streams, dynamic loading indicators, and summary preview cards.');
        content = content.replace(/Claim your prestigious Level 10 Grand Master Diploma in Next\.js App Router, Stripe SaaS Monetization, PostgreSQL, and AI LLM APIs\./g, 'Claim your verified Level 10 Certificate in Next.js App Router, SaaS UI Layouts, Pricing Switchers, and Interactive Widgets.');
        content = content.replace(/You have mastered the complete fullstack curriculum from HTML fundamentals to Next\.js App Router, Stripe SaaS monetization, and AI microservices\. Here is how to launch your engineering career:/g, 'You have mastered the complete web development curriculum from HTML fundamentals to Next.js App Router, responsive dashboard layouts, and interactive UI widgets. Here is how to keep growing your skills:');
        content = content.replace(/Integrate real LLM inference streaming endpoints into your frontend UI with OpenAI or Google Gemini SDKs for automated intelligent workflows\./g, 'Connect your frontend components to live LLM streaming APIs using OpenAI or Google Gemini SDKs for real-world AI applications.');
        content = content.replace(/Integrate Live Stripe Payments/g, 'Connect Real Payment Gateways');
        content = content.replace(/Create a free Stripe Developer test account and wire real webhook signatures and subscription checkout sessions into your Next\.js application\./g, 'Create a Stripe Developer test account to experiment with real payment checkouts and webhook handlers in your standalone projects.');
        content = content.replace(/Deploy a monetized SaaS product combining Next\.js \+ PostgreSQL \+ Stripe on Vercel or Railway\. Build real value for real users\./g, 'Deploy fullstack projects with Next.js, PostgreSQL, and real APIs on Vercel or Railway to build your public developer portfolio.');

        // Level 10 Lesson 1 (Enterprise Microservices -> Next.js Layout Shell)
        content = content.replace(/Enterprise Next\.js App Router Blueprint/g, 'Next.js App Router Layout & Navigation Shell');
        content = content.replace(/Enterprise Production Microservice Architecture/g, 'Modular Next.js Layout Shell & Navigation');
        content = content.replace(/Structure production Next\.js enterprise applications with modular RootLayout wrappers and responsive navigation rails\./g, 'Structure modern Next.js applications with modular RootLayout wrappers and responsive sidebar navigation rails.');

        // Level 10 Hub & Cert
        content = content.replace(/Architect enterprise SaaS frontends, modular layout shells, debounced search pipelines, dynamic billing switchers, and AI copilots\./g, 'Build modern SaaS dashboard interfaces, modular layout shells, debounced search filters, pricing switchers, and interactive AI chat panels.');
        content = content.replace(/Enterprise SaaS Dashboard/g, 'SaaS Dashboard UI Suite');

        // Level 8 Lesson 6 (Multi-user task SaaS)
        content = content.replace(/Enterprise Multi-User Task SaaS Capstone/g, 'Multi-User Task Board UI with Role Badges');
        content = content.replace(/Enterprise Multi-User Task SaaS/g, 'Multi-User Task Board UI with Role Badges');
        content = content.replace(/Deploy an enterprise fullstack task management SaaS with user authentication, role-based badges, and real-time team board updates\./g, 'Build a responsive multi-user task board interface with role badges, search filtering, and active member status.');
        content = content.replace(/Your Level 9 Capstone is a secure enterprise collaboration app like Linear or Jira 🚀: keeping teams organized while protecting sensitive company operations\./g, 'A collaborative task board keeps team projects organized with role badges, fast search, and clean status tags.');

        // Level 5 Lesson 15 (Deploy Python backend service -> Build Python API Logic)
        content = content.replace(/Deploy a production Python backend service integrating User Models, SHA-256 authentication, and CRUD API operations\./g, 'Build a Python backend API structure integrating User Models, SHA-256 password hashing logic, and CRUD operations.');
        content = content.replace(/Deploy a production Python backend combining User Models, SHA-256 auth hashing, and database persistence\./g, 'Build a Python backend service combining User Models, SHA-256 password hashing logic, and CRUD operations.');
        content = content.replace(/Deploying your backend capstone is like cutting the grand opening ribbon 🎀 on your own tech company's secure cloud server\./g, 'Assembling your Python API service combines all your data models, security hashing, and endpoint routing into one cohesive project.');

        // Level 7A Cloud & Hosting copy
        content = content.replace(/deploy live production web apps to Vercel, Cloudflare Pages, Netlify, and Render for \$0\/month forever\./g, 'write cloud hosting configuration manifests for Vercel, Cloudflare Pages, Netlify, and Render.');
        content = content.replace(/Deploy edge-rendered applications globally on Cloudflare Pages using wrangler\.toml configuration files\./g, 'Configure Cloudflare Pages edge deployments using wrangler.toml configuration files.');
        content = content.replace(/Deploy single-page applications to Cloudflare Pages, configure SPA _redirects, and attach custom CNAME domains\./g, 'Configure Cloudflare Pages routing rules, SPA _redirects manifests, and custom domain settings.');
        content = content.replace(/Deploy Python backend web services using render\.yaml Infrastructure-as-Code manifests\./g, 'Configure Python backend hosting manifests using render.yaml Infrastructure-as-Code files.');
        content = content.replace(/Configure render\.yaml infrastructure-as-code, deploy Python ASGI servers with Uvicorn, and manage environment variables\./g, 'Write render.yaml infrastructure-as-code manifests, configure Uvicorn start commands, and define environment variables.');
        content = content.replace(/Deploy a production-grade fullstack Next\.js service dashboard with search filter and responsive cards\./g, 'Build a Next.js dashboard interface with search filtering and responsive card components.');
        content = content.replace(/Deploy a production Next\.js fullstack service combining Server Components, global state, API fetching, and error boundaries\./g, 'Build a Next.js dashboard UI combining Server Components, global state, API fetching, and error boundaries.');

        // Level 7B PostgreSQL Connection String copy
        content = content.replace(/Connect to production cloud PostgreSQL databases securely using SSL connection strings\./g, 'Learn PostgreSQL connection string URI syntax and SSL mode configuration parameters.');
        content = content.replace(/Configure production PostgreSQL DATABASE_URL connection strings with SSL mode for Neon and Supabase serverless databases\./g, 'Write PostgreSQL DATABASE_URL connection strings with required SSL parameters for cloud databases.');
        content = content.replace(/Perform transactional Create, Read, and Update operations on cloud PostgreSQL tables using FastAPI and SQLAlchemy ORM\./g, 'Define database table models and write structured query operations using Python and SQLAlchemy ORM syntax.');

        // Level 6 Certificate
        content = content.replace(/Claim your Level 7 Certificate in Web Developering Mastery across frontend, backend microservices, and database systems\./g, 'Claim your Level 7 Certificate in Specialized Web Tracks across cloud hosting configs, SQL schemas, and Next.js UI.');

        // 404 descriptions
        content = content.replace(/targetDesc = 'Master cloud deployment, DNS, CI\/CD pipelines, and containers\.'/, "targetDesc = 'Learn cloud hosting configs, Git workflows, and CI/CD pipelines.';");
        content = content.replace(/targetDesc = 'Master multi-tenancy, subscription billing, and production deployments\.'/, "targetDesc = 'Learn Next.js App Router, pricing switchers, and SaaS UI components.';");
        content = content.replace(/targetDesc = '6 enterprise production capstone milestones, subscriptions, and deployment\.'/, "targetDesc = '6 interactive lessons covering SaaS layout shells, search filters, and pricing tables.';");

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

walkDir('public', filePath => {
    if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        content = content.replace(/Stripe Checkout & Webhook Subscription Tiers/g, 'Subscription Pricing Switcher & Tier Cards');
        content = content.replace(/Stripe Checkout & Subscription Tiers/g, 'Subscription Pricing Switcher & Tier Cards');
        content = content.replace(/Stripe Checkout/g, 'Subscription Switcher');
        content = content.replace(/Modern AI \/ LLM REST API Integration/g, 'AI Helper Panel & Response Stream UI');
        content = content.replace(/Modern AI \/ LLM REST API/g, 'AI Helper Panel & Response Stream UI');
        content = content.replace(/Enterprise Next\.js App Router Blueprint/g, 'Next.js App Router Layout & Navigation Shell');
        content = content.replace(/Enterprise Production Microservice Architecture/g, 'Modular Next.js Layout Shell & Navigation');
        content = content.replace(/Enterprise Multi-User Task SaaS/g, 'Multi-User Task Board UI with Role Badges');
        content = content.replace(/Enterprise SaaS Dashboard/g, 'SaaS Dashboard UI Suite');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

console.log(`\n🎉 Total files cleanly updated: ${modifiedCount}`);

import fs from 'fs';
import path from 'path';

const certificates = [
    {
        filePath: 'src/pages/3. partC/certificate.astro',
        title: 'Level 5 Certificate: React & Frontend Engineering | NoviCodes',
        description: 'Claim your Level 5 Certificate in React Component Architecture, Custom Hooks, State Synchronization, and Modern Frontend Engineering.',
        levelTag: 'Level 5 • React Dojo',
        hubUrl: '/3. partC/hub.html',
        hubTitle: 'Level 5 Hub',
        hubIcon: '⚛️',
        certLockedTitle: 'Level 5 Certificate Locked! 📜',
        certLockedText: 'You must complete all <strong>15 interactive React projects</strong> in Level 5 before claiming your official Certificate of Mastery!',
        totalLessons: 15,
        certId: 'NC-REACT-2026-0051',
        headline: 'CERTIFICATE OF MASTERY',
        subheadline: 'REACT COMPONENT ARCHITECTURE & MODERN FRONTEND ENGINEERING',
        defaultRecipient: 'React Developer',
        bodyText: 'has successfully solved 15 interactive React coding challenges demonstrating verified proficiency in component decomposition, JSX rendering, custom hooks, state synchronization, controlled forms, Context API, and single-page applications.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Curriculum Architect',
        sealIcon: '⚛️',
        sealText: 'LEVEL 5',
        trackPrefix: 'partC',
        certFilename: 'NoviCodes_Level5_React_Certificate',
        nextUrl: '/5. partE/hub.html',
        nextLabel: 'Level 6: Python Dojo →',
        cards: [
            { icon: '⚡', title: 'Build a Real React App', text: 'Create a working Todo app or expense tracker using Vite. Install npm packages, use real component files, and manage dependencies.', link: 'https://vitejs.dev/guide/', linkText: 'Start with Vite →' },
            { icon: '🗂️', title: 'Learn State Management', text: 'React local state is great for small apps. For larger applications, learn Zustand (clean and simple) or Redux Toolkit (industry standard).', link: 'https://zustand-demo.pmnd.rs', linkText: 'Zustand Documentation →' },
            { icon: '🎨', title: 'Style With Tailwind CSS', text: 'Most modern React projects use Tailwind CSS. It accelerates UI prototyping with utility-first responsive styling.', link: 'https://tailwindcss.com/docs/installation', linkText: 'Tailwind CSS Guide →' }
        ]
    },
    {
        filePath: 'src/pages/5. partE/certificate.astro',
        title: 'Level 6 Certificate: Python & Backend Architecture | NoviCodes',
        description: 'Claim your Level 6 Certificate in Python Syntax, Data Structures, Algorithmic Functions, and Backend Architecture.',
        levelTag: 'Level 6 • Python Dojo',
        hubUrl: '/5. partE/hub.html',
        hubTitle: 'Level 6 Hub',
        hubIcon: '🐍',
        certLockedTitle: 'Level 6 Certificate Locked! 📜',
        certLockedText: 'You must complete all <strong>15 interactive Python projects</strong> in Level 6 before claiming your official Certificate of Mastery!',
        totalLessons: 15,
        certId: 'NC-PY-2026-0062',
        headline: 'CERTIFICATE OF MASTERY',
        subheadline: 'PYTHON DATA STRUCTURES & BACKEND ARCHITECTURE',
        defaultRecipient: 'Python Developer',
        bodyText: 'has successfully solved 15 interactive Python challenges demonstrating verified proficiency in control flow, list comprehensions, object-oriented programming, file systems, error handling, password hashing, and API endpoints.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Backend Architect',
        sealIcon: '🐍',
        sealText: 'LEVEL 6',
        trackPrefix: 'partE',
        certFilename: 'NoviCodes_Level6_Python_Certificate',
        nextUrl: '/6. partF/hub.html',
        nextLabel: 'Level 7: Mastery Dojo →',
        cards: [
            { icon: '🐍', title: 'Run Python in Cloud Workspaces', text: 'Write and run complete multi-file Python applications directly in your browser with interactive terminals on Replit or GitHub Codespaces.', link: 'https://replit.com/languages/python3', linkText: 'Try Replit Python (Free) →' },
            { icon: '📦', title: 'Set Up Local Python', text: 'Install Python 3.12 locally on your computer with virtual environments (venv), pip package manager, and VS Code Python extension.', link: 'https://www.python.org/downloads/', linkText: 'Download Python 3.12 →' },
            { icon: '🌶️', title: 'Build a FastAPI Backend', text: 'Python\'s FastAPI framework is industry-standard for asynchronous microservices. Build your first REST endpoint with automatic Swagger docs.', link: 'https://fastapi.tiangolo.com/tutorial/', linkText: 'FastAPI Documentation →' }
        ]
    },
    {
        filePath: 'src/pages/6. partF/certificate.astro',
        title: 'Level 7 Certificate: Fullstack Mastery | NoviCodes',
        description: 'Claim your Level 7 Certificate in Fullstack Engineering Mastery across frontend, backend microservices, and database systems.',
        levelTag: 'Level 7 • Mastery Dojo',
        hubUrl: '/6. partF/hub.html',
        hubTitle: 'Level 7 Hub',
        hubIcon: '👑',
        certLockedTitle: 'Level 7 Certificate Locked! 📜',
        certLockedText: 'You must complete all <strong>18 interactive fullstack projects</strong> across Tracks 7A, 7B, and 7C before claiming your official Certificate of Mastery!',
        totalLessons: 18,
        certId: 'NC-MASTERY-2026-0073',
        headline: 'CERTIFICATE OF MASTERY',
        subheadline: 'FULLSTACK ENGINEERING & CLOUD ARCHITECTURE',
        defaultRecipient: 'Fullstack Engineer',
        bodyText: 'has demonstrated verified fullstack mastery across modern web frontend components, RESTful API microservices, relational database schemas, and cloud deployment pipelines.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Fullstack Architect',
        sealIcon: '👑',
        sealText: 'LEVEL 7',
        trackPrefix: 'partF',
        certFilename: 'NoviCodes_Level7_Mastery_Certificate',
        nextUrl: '/7. partG/hub.html',
        nextLabel: 'Level 8: Fullstack Bridge →',
        cards: [
            { icon: '🗄️', title: 'Connect a Real Database', text: 'You have mastered relational SQL schemas. Now connect to a live cloud PostgreSQL database with Supabase or Neon.tech for free.', link: 'https://supabase.com/docs/guides/database', linkText: 'Supabase Postgres Guide →' },
            { icon: '🔐', title: 'Add Real Authentication', text: 'Implement production auth with Clerk or NextAuth.js (Auth.js). Secure session tokens, OAuth providers, and user management.', link: 'https://clerk.com/docs', linkText: 'Clerk Auth Docs →' },
            { icon: '🚀', title: 'Deploy Full-Stack to Vercel', text: 'Deploy a complete Next.js fullstack application with serverless routes and database connections straight to Vercel\'s global edge network.', link: 'https://vercel.com/guides/nextjs-prisma-postgres', linkText: 'Vercel Deployment Guide →' }
        ]
    },
    {
        filePath: 'src/pages/7. partG/certificate.astro',
        title: 'Level 8 Certificate: API Bridge & State Systems | NoviCodes',
        description: 'Claim your Level 8 Certificate in Asynchronous API Bridges, Skeleton Loaders, Optimistic UI, and Live Polling Systems.',
        levelTag: 'Level 8 • Fullstack Bridge',
        hubUrl: '/7. partG/hub.html',
        hubTitle: 'Level 8 Hub',
        hubIcon: '🌉',
        certLockedTitle: 'Level 8 Certificate Locked! 📜',
        certLockedText: 'You must complete all <strong>6 enterprise bridge projects</strong> in Level 8 before claiming your official Certificate of Mastery!',
        totalLessons: 6,
        certId: 'NC-BRIDGE-2026-0084',
        headline: 'CERTIFICATE OF MASTERY',
        subheadline: 'ASYNCHRONOUS API BRIDGE & CLIENT-SERVER ARCHITECTURE',
        defaultRecipient: 'API Systems Engineer',
        bodyText: 'has successfully solved 6 enterprise bridge projects demonstrating verified proficiency in asynchronous data streaming, skeleton loaders, optimistic UI mutations, error boundaries, and real-time polling engines.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Systems Architect',
        sealIcon: '🌉',
        sealText: 'LEVEL 8',
        trackPrefix: 'partG',
        certFilename: 'NoviCodes_Level8_API_Bridge_Certificate',
        nextUrl: '/8. partH/hub.html',
        nextLabel: 'Level 9: Auth & Database →',
        cards: [
            { icon: '🛠️', title: 'Consume Real Public APIs', text: 'Use your fetch and state patterns to consume live open APIs like GitHub REST API, OpenWeatherMap, or PokeAPI in a real React project.', link: 'https://github.com/public-apis/public-apis', linkText: 'Explore 1,000+ Public APIs →' },
            { icon: '📡', title: 'Master TanStack Query', text: 'TanStack React Query is the industry standard for production server-state management with automatic cache invalidation and background refetching.', link: 'https://tanstack.com/query/latest', linkText: 'TanStack Query Docs →' },
            { icon: '⚡', title: 'Deploy a Backend on Railway', text: 'Deploy a custom Express or Hono Node.js REST API with automatic GitHub continuous deployment on Railway or Render.', link: 'https://railway.app', linkText: 'Railway Cloud Deployment →' }
        ]
    },
    {
        filePath: 'src/pages/8. partH/certificate.astro',
        title: 'Level 9 Certificate: Auth & Database Engineering | NoviCodes',
        description: 'Claim your Level 9 Certificate in Cryptographic Password Hashing, JWT Session Verification, and PostgreSQL Schema Architecture.',
        levelTag: 'Level 9 • Auth & Database',
        hubUrl: '/8. partH/hub.html',
        hubTitle: 'Level 9 Hub',
        hubIcon: '🛡️',
        certLockedTitle: 'Level 9 Certificate Locked! 📜',
        certLockedText: 'You must complete all <strong>6 secure engineering projects</strong> in Level 9 before claiming your official Certificate of Mastery!',
        totalLessons: 6,
        certId: 'NC-SEC-2026-0095',
        headline: 'CERTIFICATE OF MASTERY',
        subheadline: 'AUTHENTICATION SECURITY & RELATIONAL DATABASE ARCHITECTURE',
        defaultRecipient: 'Security & DB Architect',
        bodyText: 'has successfully solved 6 secure engineering projects demonstrating verified proficiency in cryptographic password hashing, JWT session verification, role-based access control, PostgreSQL schema design, and ACID transactions.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Security Architect',
        sealIcon: '🛡️',
        sealText: 'LEVEL 9',
        trackPrefix: 'partH',
        certFilename: 'NoviCodes_Level9_Auth_DB_Certificate',
        nextUrl: '/9. partI/hub.html',
        nextLabel: 'Level 10: Apex SaaS Diploma →',
        cards: [
            { icon: '🔒', title: 'Implement Live JWT Auth', text: 'Build an Express or FastAPI auth microservice using Bcrypt password salting and jsonwebtoken signing with HTTP-only security cookies.', link: 'https://jwt.io/introduction', linkText: 'JWT.io Official Guide →' },
            { icon: '🐘', title: 'Deploy Cloud Postgres with Prisma', text: 'Set up a free serverless PostgreSQL database on Neon.tech and manage schema migrations with Prisma ORM or Drizzle.', link: 'https://neon.tech/docs/introduction', linkText: 'Neon Serverless Postgres →' },
            { icon: '🎯', title: 'Deploy a Fullstack SaaS Template', text: 'Clone a battle-tested Next.js + PostgreSQL + Tailwind authentication starter template on Railway or Vercel.', link: 'https://railway.app/templates', linkText: 'Railway SaaS Templates →' }
        ]
    },
    {
        filePath: 'src/pages/9. partI/certificate.astro',
        title: 'Level 10 Certificate: Apex SaaS Fullstack Diploma | NoviCodes',
        description: 'Claim your prestigious Level 10 Grand Master Diploma in Next.js App Router, Stripe SaaS Monetization, PostgreSQL, and AI LLM APIs.',
        levelTag: 'Level 10 • Apex SaaS',
        hubUrl: '/9. partI/hub.html',
        hubTitle: 'Level 10 Hub',
        hubIcon: '🏆',
        certLockedTitle: 'Level 10 Diploma Locked! 📜',
        certLockedText: 'You must complete all <strong>6 enterprise milestone capstones</strong> in Level 10 before claiming your official Grand Master Diploma!',
        totalLessons: 6,
        certId: 'NC-APEX-2026-0100',
        headline: 'GRAND MASTER DIPLOMA',
        subheadline: 'APEX PRODUCTION SAAS & AI FULLSTACK ARCHITECTURE',
        defaultRecipient: 'Apex Fullstack Architect',
        bodyText: 'has achieved the highest academic honor at NoviCodes by engineering an end-to-end production SaaS platform featuring Next.js App Router, Stripe recurring billing webhooks, PostgreSQL persistence, and modern AI LLM API integrations.',
        sigLine: 'NoviCodes Academic Board',
        sigLabel: 'Chief Technology Officer',
        sealIcon: '🏆',
        sealText: 'APEX MASTER',
        trackPrefix: 'partI',
        certFilename: 'NoviCodes_Level10_Apex_Grand_Master_Diploma',
        nextUrl: 'https://github.com/RifaiM/CodeRoots',
        nextLabel: '⭐ Star NoviCodes on GitHub →',
        isApex: true,
        cards: [
            { icon: '💳', title: 'Integrate Live Stripe Payments', text: 'Create a free Stripe Developer test account and wire real webhook signatures and subscription checkout sessions into your Next.js application.', link: 'https://stripe.com/docs/payments/quickstart', linkText: 'Stripe Developer Quickstart →' },
            { icon: '🤖', title: 'Build with OpenAI / Gemini APIs', text: 'Integrate real LLM inference streaming endpoints into your frontend UI with OpenAI or Google Gemini SDKs for automated intelligent workflows.', link: 'https://platform.openai.com/docs/quickstart', linkText: 'AI API Quickstart →' },
            { icon: '🚀', title: 'Ship Your Production SaaS', text: 'Deploy a monetized SaaS product combining Next.js + PostgreSQL + Stripe on Vercel or Railway. Build real value for real users.', link: 'https://github.com/vercel/nextjs-subscription-payments', linkText: 'Vercel Next.js SaaS Template →' }
        ]
    }
];

function generateCertPage(cert) {
    const isExternalNext = cert.nextUrl.startsWith('http');
    const targetAttr = isExternalNext ? ' target="_blank" rel="noopener noreferrer"' : '';

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PlatformHeader from '../../components/PlatformHeader.astro';
import PlatformFooter from '../../components/PlatformFooter.astro';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: '🏠', title: 'Dashboard Home' },
    { href: '${cert.hubUrl}', label: '${cert.hubTitle}', icon: '${cert.hubIcon}', title: '${cert.hubTitle} Return' }
];
---

<BaseLayout 
    title="${cert.title}" 
    description="${cert.description}"
    showHeaderFooter={false}
>
    <PlatformHeader 
        slot="header"
        tagText="${cert.levelTag}"
        tagId="headerLogoTag"
        navLinks={navLinks}
        showXpBadge={true}
        showLevelBadge={true}
    />

    <main class="cert-page-container">
        <div class="cert-container">
            
            <!-- Certificate Generator Controls -->
            <section class="generator-card">
                <div class="generator-header">
                    <h2>🎓 ${cert.headline === 'GRAND MASTER DIPLOMA' ? 'Level 10 Grand Master Diploma Generator' : cert.levelTag.split('•')[0].trim() + ' Certificate Generator'}</h2>
                    <p>Enter your full name to generate your verified proof-of-work certificate in ${cert.subheadline}.</p>
                </div>

                <div class="generator-inputs">
                    <div class="input-group">
                        <label for="learnerNameInput">Full Legal Name / Developer Alias:</label>
                        <input type="text" id="learnerNameInput" placeholder="e.g. Alex Rivera" value="${cert.defaultRecipient}" />
                    </div>
                    <div class="btn-row">
                        <button class="cert-action-btn primary" id="generateCertBtn">
                            <span>✨ Update Certificate</span>
                        </button>
                        <button class="cert-action-btn success" id="downloadCertBtn">
                            <span>📥 Download High-Res PNG</span>
                        </button>
                        <button class="cert-action-btn secondary" id="printCertBtn" onclick="window.print()">
                            <span>🖨️ Print / PDF</span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- Visual Certificate Preview -->
            <div class="certificate-frame" id="certificateFrame">
                <div class="certificate-inner">
                    <div class="cert-watermark">NOVICODES</div>
                    
                    <div class="cert-top-row">
                        <img src="/assets/logo.jpg" alt="NoviCodes Logo" class="cert-logo-img" />
                        <div class="cert-brand">NOVICODES PLATFORM</div>
                        <div class="cert-id-badge">ID: <span id="certIdDisplay">${cert.certId}</span></div>
                    </div>

                    <div class="cert-headline">${cert.headline}</div>
                    <div class="cert-subheadline">${cert.subheadline}</div>

                    <div class="cert-awarded-text">THIS CERTIFIES THAT</div>
                    <div class="cert-recipient-name" id="certRecipientName">${cert.defaultRecipient}</div>

                    <div class="cert-body-text">
                        ${cert.bodyText}
                    </div>

                    <div class="cert-footer-row">
                        <div class="cert-sig-col">
                            <div class="cert-sig-line">${cert.sigLine}</div>
                            <div class="cert-sig-label">${cert.sigLabel}</div>
                        </div>
                        <div class="cert-badge-center">
                            <div class="cert-gold-seal">
                                <span>${cert.sealIcon}</span>
                                <span>${cert.sealText}</span>
                            </div>
                        </div>
                        <div class="cert-sig-col">
                            <div class="cert-sig-line" id="certIssueDate">August 15, 2026</div>
                            <div class="cert-sig-label">Date of Issuance</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 🚀 What's Next Graduation Bridge (Option C) -->
        <section class="whats-next-section">
            <div class="whats-next-inner">
                <h2 class="whats-next-title">${cert.isApex ? '🏆 You Have Reached the Apex of NoviCodes!' : '🚀 What Should You Do Next?'}</h2>
                <p class="whats-next-sub">
                    ${cert.isApex ? 'You have mastered the complete fullstack curriculum from HTML fundamentals to Next.js App Router, Stripe SaaS monetization, and AI microservices. Here is how to launch your engineering career:' : 'You have mastered this level\'s core engineering competencies. Here is how to apply your verified skills to real-world production:'}
                </p>
                <div class="whats-next-grid">
                    ${cert.cards.map(c => `
                    <div class="wn-card">
                        <div class="wn-icon">${c.icon}</div>
                        <h3>${c.title}</h3>
                        <p>${c.text}</p>
                        <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="wn-link">${c.linkText}</a>
                    </div>`).join('')}
                </div>
                <div class="whats-next-cta">
                    <a href="/" class="whats-next-btn primary">← Back to Dashboard</a>
                    <a href="${cert.nextUrl}" class="whats-next-btn accent"${targetAttr}>${cert.nextLabel}</a>
                </div>
            </div>
        </section>
    </main>

    <PlatformFooter slot="footer" />

    <style is:global>
        .cert-page-container {
            max-width: 1000px;
            margin: 30px auto 50px auto;
            padding: 0 20px;
        }

        .generator-card {
            background: #ffffff;
            border: 1.5px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
            margin-bottom: 30px;
        }

        .generator-header h2 {
            margin: 0 0 8px 0;
            font-size: 1.35rem;
            color: #0f172a;
            font-weight: 800;
        }

        .generator-header p {
            margin: 0 0 16px 0;
            color: #64748b;
            font-size: 0.90rem;
        }

        .generator-inputs {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .input-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 700;
            color: #334155;
            margin-bottom: 6px;
        }

        .input-group input {
            width: 100%;
            padding: 12px 14px;
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            font-size: 0.95rem;
            font-family: inherit;
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.2s;
        }

        .input-group input:focus {
            border-color: #2563eb;
        }

        .btn-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .cert-action-btn {
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 0.90rem;
            font-weight: 800;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
        }

        .cert-action-btn.primary {
            background: #2563eb;
            color: #ffffff;
        }

        .cert-action-btn.primary:hover {
            background: #1d4ed8;
        }

        .cert-action-btn.success {
            background: #10b981;
            color: #ffffff;
        }

        .cert-action-btn.success:hover {
            background: #059669;
        }

        .cert-action-btn.secondary {
            background: #f1f5f9;
            color: #334155;
            border: 1.5px solid #cbd5e1;
        }

        .cert-action-btn.secondary:hover {
            background: #e2e8f0;
        }

        /* Visual Certificate Layout */
        .certificate-frame {
            background: linear-gradient(135deg, #fefce8 0%, #ffffff 100%);
            border: 12px solid #0f172a;
            border-image: linear-gradient(135deg, #d97706, #fbbf24, #b45309) 12;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 16px 36px rgba(0,0,0,0.12);
            position: relative;
        }

        .certificate-inner {
            border: 2px solid rgba(217, 119, 6, 0.4);
            padding: 36px 40px;
            text-align: center;
            position: relative;
            background: #ffffff;
        }

        .cert-watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-25deg);
            font-size: 5.5rem;
            font-weight: 900;
            color: rgba(0, 0, 0, 0.025);
            letter-spacing: 12px;
            user-select: none;
            pointer-events: none;
        }

        .cert-top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .cert-logo-img {
            width: 44px;
            height: 44px;
            border-radius: 8px;
        }

        .cert-brand {
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 2px;
            color: #475569;
        }

        .cert-id-badge {
            font-size: 0.75rem;
            font-family: 'Fira Code', monospace;
            color: #64748b;
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 6px;
        }

        .cert-headline {
            font-size: 2.2rem;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: 2px;
            margin-bottom: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .cert-subheadline {
            font-size: 0.95rem;
            font-weight: 700;
            color: #d97706;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 28px;
        }

        .cert-awarded-text {
            font-size: 0.78rem;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }

        .cert-recipient-name {
            font-size: 2rem;
            font-weight: 800;
            color: #1e3a8a;
            border-bottom: 2px solid #bfdbfe;
            display: inline-block;
            padding: 0 24px 6px 24px;
            margin-bottom: 20px;
        }

        .cert-body-text {
            font-size: 0.88rem;
            line-height: 1.7;
            color: #475569;
            max-width: 680px;
            margin: 0 auto 36px auto;
        }

        .cert-footer-row {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }

        .cert-sig-col {
            text-align: center;
            width: 180px;
        }

        .cert-sig-line {
            font-size: 0.95rem;
            font-weight: 800;
            color: #0f172a;
            border-bottom: 1.5px solid #cbd5e1;
            padding-bottom: 4px;
            margin-bottom: 4px;
        }

        .cert-sig-label {
            font-size: 0.72rem;
            color: #94a3b8;
            text-transform: uppercase;
            font-weight: 700;
        }

        .cert-gold-seal {
            background: linear-gradient(135deg, #fbbf24, #d97706);
            color: #ffffff;
            width: 72px;
            height: 72px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(217, 119, 6, 0.4);
            font-weight: 900;
            font-size: 0.70rem;
            border: 3px solid #ffffff;
        }

        .cert-gold-seal span:first-child {
            font-size: 1.2rem;
        }

        @media (max-width: 768px) {
            .cert-headline {
                font-size: 1.5rem;
            }
            .cert-recipient-name {
                font-size: 1.4rem;
            }
            .cert-footer-row {
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }
        }

        /* ── Pixel-Perfect Print Stylesheet (Hides Navbar, Footer & Form Controls) ─── */
        @media print {
            @page {
                size: landscape;
                margin: 0;
            }
            html, body {
                background: #ffffff !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            header, footer, nav, .platform-header, .platform-footer, .generator-card, .btn-row, #printCertBtn {
                display: none !important;
            }
            .cert-page-container {
                padding: 0 !important;
                margin: 0 !important;
                max-width: 100% !important;
                min-height: auto !important;
                background: transparent !important;
                display: block !important;
            }
            .cert-container {
                max-width: 100% !important;
                gap: 0 !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            .certificate-frame {
                box-shadow: none !important;
                border: 12px solid #0f172a !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                width: 96% !important;
                max-width: 1000px !important;
                margin: 20px auto !important;
            }
        }
    </style>

    <script is:inline src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script is:inline src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

    <script>
        import { isCertificateAccessible, getCompletedLessonsCount } from '../../scripts/dojo/core/protection';

        document.addEventListener('DOMContentLoaded', () => {
            // 1. Enforce Certificate Access Protection
            if (!isCertificateAccessible('${cert.trackPrefix}')) {
                const count = getCompletedLessonsCount('${cert.trackPrefix}');
                const remaining = Math.max(0, ${cert.totalLessons} - count);

                if (typeof (window as any).Swal !== 'undefined') {
                    (window as any).Swal.fire({
                        icon: 'warning',
                        title: '${cert.certLockedTitle}',
                        html: \`
                            <div style="text-align: center; font-family: 'Plus Jakarta Sans', sans-serif;">
                                <p style="font-size: 1.02rem; color: #475569; margin-bottom: 16px;">
                                    ${cert.certLockedText}
                                </p>
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px; display: flex; justify-content: space-around; margin-bottom: 12px;">
                                    <div>
                                        <div style="font-size: 1.4rem; font-weight: 800; color: #10b981;">\${count} / ${cert.totalLessons}</div>
                                        <div style="font-size: 0.8rem; color: #64748b;">Projects Solved</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 1.4rem; font-weight: 800; color: #ef4444;">\${remaining}</div>
                                        <div style="font-size: 0.8rem; color: #64748b;">Remaining</div>
                                    </div>
                                </div>
                            </div>
                        \`,
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Go to Hub',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        customClass: { popup: 'responsive-profile-modal' }
                    }).then(() => {
                        window.location.href = '${cert.hubUrl}';
                    });
                } else {
                    window.location.href = '${cert.hubUrl}';
                }
                return;
            }

            const nameInput = document.getElementById('learnerNameInput') as HTMLInputElement | null;
            const certName = document.getElementById('certRecipientName');
            const genBtn = document.getElementById('generateCertBtn');
            const dlBtn = document.getElementById('downloadCertBtn');
            const dateSpan = document.getElementById('certIssueDate');

            if (dateSpan) {
                dateSpan.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }

            function updateName() {
                if (certName && nameInput) {
                    certName.textContent = nameInput.value.trim() || '${cert.defaultRecipient}';
                }
            }

            if (nameInput) nameInput.addEventListener('input', updateName);
            if (genBtn) genBtn.addEventListener('click', updateName);

            // High-Res PNG Download
            if (dlBtn) {
                dlBtn.addEventListener('click', () => {
                    const certFrame = document.getElementById('certificateFrame');
                    if (!certFrame || typeof (window as any).html2canvas === 'undefined') return;

                    (window as any).html2canvas(certFrame, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
                        const link = document.createElement('a');
                        link.download = \`${cert.certFilename}_\${(nameInput?.value || 'Learner').replace(/\\s+/g, '_')}.png\`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    });
                });
            }
        });
    </script>
</BaseLayout>
`;
}

for (const cert of certificates) {
    const fullPath = path.resolve(cert.filePath);
    const content = generateCertPage(cert);
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ Standardized layout for ${cert.filePath}`);
}

console.log('\n🎉 All 6 certificate pages standardized to match Level 4 exactly!');

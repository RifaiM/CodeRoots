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

walkDir('src', filePath => {
    if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        // Clean Capstone leftover occurrences
        content = content.replace(/Python Fullstack Capstone Service/g, 'Final Project: Python Backend API Logic');
        content = content.replace(/Fullstack Python Backend Capstone/g, 'Final Project: Python Backend API Logic');
        content = content.replace(/🏆 Python Capstone Online/g, '🏆 Python API Service Online');
        content = content.replace(/Level 6 Capstone Architecture/g, 'Level 6 Final Project Architecture');
        content = content.replace(/Production Next\.js Fullstack Dashboard Capstone!/g, 'Next.js Service Dashboard Final Project!');
        content = content.replace(/Production Capstone Service/g, 'Final Project: Next.js Service Dashboard');
        content = content.replace(/Building your fullstack frontend capstone/g, 'Building your final frontend dashboard project');
        content = content.replace(/CAPSTONE<\/span><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #0f172a; font-weight: 600;">app\/page\.jsx/g, 'PROJECT</span><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #0f172a; font-weight: 600;">app/page.jsx');
        content = content.replace(/Fullstack Capstone Service Live Preview/g, 'Next.js Service Dashboard Live Preview');
        content = content.replace(/Capstone: Live E-Commerce Dashboard/g, 'Final Project: Reactive Storefront');
        content = content.replace(/Your Level 8 Capstone is the mission control dashboard/g, 'Your Level 8 final project is the interactive dashboard');
        content = content.replace(/Capstone: Multi-User Task SaaS with RBAC/g, 'Final Project: Multi-User Task Board UI');
        content = content.replace(/The Apex Fullstack SaaS Engine Capstone!/g, 'SaaS Dashboard UI Suite Final Project!');
        content = content.replace(/Your Level 10 Apex Capstone is the flagship product of your engineering career 🏆: proof to companies and founders worldwide that you can build, monetize, secure, and ship modern software\./g, 'Your Level 10 final project brings together all your interactive dashboard components: modular sidebar shell, live search filter, and pricing tier cards.');
        content = content.replace(/Apex Capstone: NoviCodes Pro SaaS Engine/g, 'Final Project: SaaS Dashboard UI Suite');
        content = content.replace(/🎓 Graduation Capstone/g, '⚡ Final Level');

        // Clean Fullstack leftover occurrences
        content = content.replace(/Fullstack React App Architecture/g, 'Modular React App Architecture');
        content = content.replace(/FULLSTACK ENGINEERING & CLOUD ARCHITECTURE/g, 'SPECIALIZED WEB TRACKS (CLOUD, SQL & NEXT.JS)');
        content = content.replace(/APEX PRODUCTION SAAS & AI FULLSTACK ARCHITECTURE/g, 'SAAS DASHBOARD UI & COMPONENT ARCHITECTURE');
        content = content.replace(/Fullstack E-Commerce Product & Inventory Dashboard!/g, 'Reactive Storefront & Inventory Dashboard!');
        content = content.replace(/Build a production-grade fullstack inventory and e-commerce catalog dashboard with filtering and real-time state mutation\./g, 'Build an interactive storefront catalog and product inventory dashboard with search filtering and live state updates.');
        content = content.replace(/🏆 Fullstack SaaS Dashboard/g, '🏆 Modern Next.js Dashboard');
        content = content.replace(/Live Preview: A fullstack SaaS Dashboard with live search/g, 'Live Preview: A modern Next.js Dashboard with live search');
        content = content.replace(/Apex Fullstack Architecture/g, 'Modern Next.js UI Architecture');
        content = content.replace(/Production Modern Fullstack Web Stack/g, 'Modern Next.js & React UI Stack');
        content = content.replace(/🚀 Fullstack Production Dashboard/g, '🚀 Modern Next.js Dashboard');
        content = content.replace(/Deploy a Fullstack SaaS Template/g, 'Explore Next.js Starter Templates');
        content = content.replace(/Deploy a complete Next\.js fullstack application with serverless routes and database connections straight to Vercel's global edge network\./g, 'Deploy your Next.js frontend and React projects straight to Vercel global edge network.');
        content = content.replace(/Level 7C • Fullstack/g, 'Level 7C • Next.js & UI');
        content = content.replace(/modern fullstack edge computing/g, 'modern web & edge computing');
        content = content.replace(/2026: Modern Web \(Fullstack Edge\)/g, '2026: Modern Web & Edge UI');
        content = content.replace(/Apex Fullstack Architect/g, 'Senior Web Developer');

        // Clean AI Copilot -> AI Chat Assistant
        content = content.replace(/Smart AI Copilot & Insights Panel/g, 'AI Chat Assistant & Insights Panel');
        content = content.replace(/AI copilot panel with thinking animations/g, 'AI chat assistant panel with typing animations');
        content = content.replace(/AI Copilot UI/g, 'AI Chat UI');
        content = content.replace(/billing switchers, and AI copilot panels\./g, 'billing switchers, and AI chat panels.');

        // Clean Apex -> Level 10 / Dashboard
        content = content.replace(/🏆 LEVEL 10 APEX/g, '🏆 LEVEL 10');
        content = content.replace(/Apex Diploma/g, 'Level 10 Certificate');
        content = content.replace(/fileTab="Apex\.jsx"/g, 'fileTab="Dashboard.jsx"');
        content = content.replace(/Apex SaaS Engine \| NoviCodes Pro/g, 'SaaS Dashboard UI | NoviCodes');

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

        content = content.replace(/Python Fullstack Capstone Service/g, 'Final Project: Python Backend API Logic');
        content = content.replace(/Fullstack Python Backend Capstone/g, 'Final Project: Python Backend API Logic');
        content = content.replace(/Production Capstone Service/g, 'Final Project: Next.js Service Dashboard');
        content = content.replace(/Capstone: Live E-Commerce Dashboard/g, 'Final Project: Reactive Storefront');
        content = content.replace(/Capstone: Multi-User Task SaaS with RBAC/g, 'Final Project: Multi-User Task Board UI');
        content = content.replace(/The Apex Fullstack SaaS Engine Capstone!/g, 'SaaS Dashboard UI Suite Final Project!');
        content = content.replace(/Apex Capstone: NoviCodes Pro SaaS Engine/g, 'Final Project: SaaS Dashboard UI Suite');
        content = content.replace(/Smart AI Copilot & Insights Panel/g, 'AI Chat Assistant & Insights Panel');
        content = content.replace(/Apex Diploma/g, 'Level 10 Certificate');
        content = content.replace(/Apex Fullstack Architect/g, 'Senior Web Developer');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

console.log(`\n🎉 Final Deep Scan Complete: ${modifiedCount} files updated.`);

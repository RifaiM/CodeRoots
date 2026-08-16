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
    if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        // Replace specific Capstone patterns
        content = content.replace(/LESSON 15 • CAPSTONE/g, 'LESSON 15 • FINAL PROJECT');
        content = content.replace(/Capstone: Full Interactive Web Application/g, 'Final Project: Interactive Web App');
        content = content.replace(/🏆 Capstone Practical Web Application/g, '🏆 Final Project: Practical Web Widget');
        content = content.replace(/Capstone Practical Web Application/g, 'Final Project: Practical Web Widget');
        content = content.replace(/🏆 Capstone Framework Web App/g, '🏆 Final Project: Dynamic React App');
        content = content.replace(/Capstone Framework Web App/g, 'Final Project: Dynamic React App');
        content = content.replace(/React Capstone Mini-App/g, 'Final Project: React Task App');
        content = content.replace(/React Capstone App/g, 'Final Project: React Task App');
        content = content.replace(/The Ultimate React Task Tracker Capstone/g, 'The Ultimate React Task Tracker Final Project');
        content = content.replace(/Build Capstone SPA/g, 'Build React SPA');
        content = content.replace(/Capstone Architectural Patterns/g, 'Final Project Architecture Patterns');
        content = content.replace(/Guided Applications & Capstone/g, 'Guided Applications & Final Project');
        content = content.replace(/Global State, Performance & Capstone/g, 'Global State, Performance & Final Project');
        content = content.replace(/Global State, Custom Hooks & Capstone/g, 'Global State, Custom Hooks & Final Project');
        content = content.replace(/Backend Security, Auth & Production Capstone/g, 'Backend Security, Auth & Final Project');
        content = content.replace(/Mini Dashboard & Capstone/g, 'Mini Dashboard & Final Project');
        content = content.replace(/🏆 Capstone Python Backend Service/g, '🏆 Final Project: Python API Logic Service');
        content = content.replace(/Capstone Python Backend Service/g, 'Final Project: Python API Logic Service');
        content = content.replace(/Apex Capstone: Enterprise SaaS Dashboard Suite/g, 'Final Project: Enterprise SaaS Dashboard');
        content = content.replace(/Apex Capstone: The Full SaaS Dashboard Suite/g, 'Final Project: SaaS Dashboard Suite');
        content = content.replace(/Capstone: Reactive E-Commerce Dashboard/g, 'Final Project: Reactive Storefront');
        content = content.replace(/Capstone: Reactive Storefront Dashboard/g, 'Final Project: Reactive Storefront');
        content = content.replace(/Capstone: Secure Workspace with Role Guards/g, 'Final Project: Secure Workspace with Role Guards');
        content = content.replace(/Capstone: Secure Team Workspace/g, 'Final Project: Secure Team Workspace');
        content = content.replace(/The Final Graduation Capstone/g, 'The Final Level 10 Project');
        content = content.replace(/Your Capstone Project/g, 'Your Final Project');
        content = content.replace(/Building your capstone/g, 'Building your final project');
        content = content.replace(/In this capstone/g, 'In this final project');
        content = content.replace(/in this capstone/g, 'in this final project');
        content = content.replace(/Complete SaaS Capstone/g, 'SaaS Dashboard UI');
        content = content.replace(/Apex SaaS Capstone/g, 'SaaS Dashboard UI');
        content = content.replace(/Complete Web App Capstone/g, 'SaaS Dashboard UI & Widgets');

        // Replace specific Fullstack occurrences in text
        content = content.replace(/Grand Master Fullstack Engineer/g, 'Master Web Developer');
        content = content.replace(/Chief Fullstack Architect/g, 'Senior Web Architect');
        content = content.replace(/Fullstack Engineer/g, 'Web Developer');
        content = content.replace(/Deploy Full-Stack to Vercel/g, 'Deploy Web App to Vercel');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

walkDir('public', filePath => {
    if (filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        content = content.replace(/LESSON 15 • CAPSTONE/g, 'LESSON 15 • FINAL PROJECT');
        content = content.replace(/Capstone: Full Interactive Web Application/g, 'Final Project: Interactive Web App');
        content = content.replace(/🏆 Capstone Practical Web Application/g, '🏆 Final Project: Practical Web Widget');
        content = content.replace(/Capstone Practical Web Application/g, 'Final Project: Practical Web Widget');
        content = content.replace(/🏆 Capstone Framework Web App/g, '🏆 Final Project: Dynamic React App');
        content = content.replace(/Capstone Framework Web App/g, 'Final Project: Dynamic React App');
        content = content.replace(/React Capstone Mini-App/g, 'Final Project: React Task App');
        content = content.replace(/🏆 Capstone Python Backend Service/g, '🏆 Final Project: Python API Logic Service');
        content = content.replace(/Capstone Python Backend Service/g, 'Final Project: Python API Logic Service');
        content = content.replace(/Apex Capstone: Enterprise SaaS Dashboard Suite/g, 'Final Project: Enterprise SaaS Dashboard');
        content = content.replace(/Complete SaaS Capstone/g, 'SaaS Dashboard UI');
        content = content.replace(/Apex SaaS Capstone/g, 'SaaS Dashboard UI');
        content = content.replace(/Complete Web App Capstone/g, 'SaaS Dashboard UI & Widgets');
        content = content.replace(/Grand Master Fullstack Engineer/g, 'Master Web Developer');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

console.log(`\n🎉 Total files updated: ${modifiedCount}`);

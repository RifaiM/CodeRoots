import fs from 'fs';
import path from 'path';

// Update Certificate 8
let cert8 = fs.readFileSync('src/pages/7. partG/certificate.astro', 'utf-8');
cert8 = cert8.replace(/title="Level 8 Certificate:.*?"/, 'title="Level 8 Certificate: Async UI & Client Data Architecture | NoviCodes"');
cert8 = cert8.replace(/tagText="Level 8 • Fullstack Bridge"/, 'tagText="Level 8 • Async UI Architecture"');
cert8 = cert8.replace(/ASYNCHRONOUS API BRIDGE & CLIENT-SERVER ARCHITECTURE/g, 'ASYNC UI & CLIENT DATA ARCHITECTURE');
cert8 = cert8.replace(/has successfully solved 6 enterprise bridge projects demonstrating verified proficiency in asynchronous data streaming, skeleton loaders, optimistic UI mutations, error boundaries, and real-time polling engines\./,
    'has successfully solved 6 advanced integration projects demonstrating verified proficiency in asynchronous data fetching, animated skeleton loaders, optimistic UI mutations, error boundary recovery, and real-time polling lifecycles in modern React applications.');
fs.writeFileSync('src/pages/7. partG/certificate.astro', cert8, 'utf-8');
console.log('✅ Updated Certificate 8');

// Update Certificate 9
let cert9 = fs.readFileSync('src/pages/8. partH/certificate.astro', 'utf-8');
cert9 = cert9.replace(/title="Level 9 Certificate:.*?"/, 'title="Level 9 Certificate: React Auth & Access Control | NoviCodes"');
cert9 = cert9.replace(/tagText="Level 9 • Auth & Database"/, 'tagText="Level 9 • React Auth & Access Control"');
cert9 = cert9.replace(/FULLSTACK JWT AUTHENTICATION & CLOUD DATABASE ARCHITECTURE/g, 'REACT AUTH STATE & ACCESS CONTROL ARCHITECTURE');
cert9 = cert9.replace(/has successfully solved 6 fullstack security projects demonstrating verified proficiency in stateless JWT authentication, global session hooks, protected route guards, relational database CRUD, and role-based access control\./,
    'has successfully solved 6 security architecture projects demonstrating verified proficiency in client-side authentication lifecycles, global AuthContext state, protected route guards, session hydration, and role-based UI access control (RBAC).');
fs.writeFileSync('src/pages/8. partH/certificate.astro', cert9, 'utf-8');
console.log('✅ Updated Certificate 9');

// Update Certificate 10
let cert10 = fs.readFileSync('src/pages/9. partI/certificate.astro', 'utf-8');
cert10 = cert10.replace(/title="Level 10 Diploma:.*?"/, 'title="Level 10 Master Diploma: SaaS UI & Design Systems Architecture | NoviCodes"');
cert10 = cert10.replace(/tagText="Level 10 • Apex SaaS"/, 'tagText="Level 10 • SaaS UI Architecture"');
cert10 = cert10.replace(/ENTERPRISE SAAS MICROSERVICES & FULLSTACK ARCHITECTURE/g, 'PRODUCTION SAAS UI & DESIGN SYSTEMS ARCHITECTURE');
cert10 = cert10.replace(/has achieved the highest standard of fullstack engineering excellence across 6 flagship milestones, demonstrating verified mastery of Next\.js App Router, Stripe checkout webhooks, AI LLM integrations, and enterprise microservice deployment\./,
    'has achieved the highest standard of engineering excellence across 6 flagship milestones, demonstrating verified mastery of modular SaaS layout shells, debounced multi-filter search, subscription billing switchers, AI copilot interfaces, and enterprise launch dashboards.');
fs.writeFileSync('src/pages/9. partI/certificate.astro', cert10, 'utf-8');
console.log('✅ Updated Certificate 10');

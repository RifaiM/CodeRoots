import fs from 'fs';

let css = fs.readFileSync('src/styles/dashboard.css', 'utf-8');

// 1. Add base desktop rules for nav-icon and nav-text around line 180
const baseNavDesktop = `/* Center Header Navigation Bar Links */
.header-nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.header-nav-links .nav-link {
  font-family: var(--font-mono);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-nav-links .nav-icon {
  display: none !important;
}

.header-nav-links .nav-text {
  display: inline-block !important;
}

.header-nav-links .nav-link:hover {
  color: var(--text-title);
  background: var(--canvas-base);
  border-color: var(--border-subtle);
}

.header-nav-links .nav-link.active {
  color: var(--accent-oxide);
  background: var(--canvas-base) !important;
  border-color: var(--border-subtle) !important;
  box-shadow: none !important;
}

.header-nav-links .nav-link.dojo-locked {
  opacity: 0.7 !important;
  color: var(--text-muted) !important;
  background: transparent !important;
  cursor: pointer !important;
}

.header-nav-links .nav-link.dojo-locked:hover {
  background: var(--canvas-base) !important;
  color: var(--accent-oxide) !important;
  border-color: var(--border-subtle) !important;
  box-shadow: none !important;
}`;

css = css.replace(/\/\* Center Header Navigation Bar Links \*\/[\s\S]*?\.header-nav-links \.nav-link\.dojo-locked:hover \{[\s\S]*?\}/m, baseNavDesktop);

// 2. Remove legacy duplicate media queries block (lines 1918 to 2100)
const legacyPattern = /\/\* ==========================================================================\s+Mobile Navbar Responsive Perfection \(576px, 425px, 375px, 320px\)[\s\S]*?@media \(max-width: 320px\) \{[\s\S]*?\n\}\n\}/m;
css = css.replace(legacyPattern, '');

// Also check for any leftover partial match
css = css.replace(/\/\* ==========================================================================\s+Mobile Navbar Responsive Perfection[\s\S]*?@media \(max-width: 320px\) \{[\s\S]*?\}\s+\}/g, '');

// 3. Define the single source of truth responsive rules for header
const responsiveHeaderRules = `/* ==========================================================================
   Responsive Viewport Architecture (Zero-Overflow Header & Fluid Layouts)
   ========================================================================== */

@media (max-width: 1200px) {
  .logo-tag {
    display: none !important;
  }

  .level-badge {
    display: none !important;
  }

  .streak-badge .streak-days-text {
    display: none !important;
  }

  .header-nav-links .nav-link {
    padding: 4px 8px !important;
    font-size: 0.76rem !important;
  }

  .header-user-stats {
    gap: 6px !important;
  }

  .stat-badge {
    padding: 0 7px !important;
    height: 28px !important;
    font-size: 0.74rem !important;
  }
}

@media (max-width: 768px) {
  .platform-header {
    padding: 0 8px !important;
    height: 48px !important;
    min-height: 48px !important;
  }

  .header-inner {
    gap: 4px !important;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
    overflow: hidden !important;
    width: 100% !important;
  }

  .platform-logo {
    gap: 6px !important;
    flex-shrink: 0 !important;
  }

  .brand-logo-img {
    width: 22px !important;
    height: 22px !important;
    border-radius: 2px !important;
  }

  .logo-title {
    font-size: 0.88rem !important;
    display: inline-block !important;
  }

  .logo-tag {
    display: none !important;
  }

  /* Crisp icon buttons on mobile / tablet */
  .header-nav-links {
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    flex-shrink: 0 !important;
    padding: 0 !important;
    background: transparent !important;
  }

  .header-nav-links .nav-icon {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 0.95rem !important;
    line-height: 1 !important;
  }

  .header-nav-links .nav-text {
    display: none !important;
  }

  .header-nav-links .nav-link {
    width: 32px !important;
    height: 28px !important;
    min-width: 32px !important;
    padding: 0 !important;
    border-radius: 2px !important;
    border: 1px solid var(--border-subtle) !important;
    background: var(--canvas-base) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }

  .header-nav-links .nav-link:hover,
  .header-nav-links .nav-link.active {
    background: var(--card-bg) !important;
    border-color: var(--text-title) !important;
  }

  .header-user-stats {
    gap: 4px !important;
    display: flex !important;
    align-items: center !important;
    flex-shrink: 0 !important;
  }

  .stat-badge {
    padding: 0 6px !important;
    height: 26px !important;
    font-family: var(--font-mono) !important;
    font-size: 0.70rem !important;
    border-radius: 2px !important;
    border: 1px solid var(--border-subtle) !important;
    background: var(--card-bg) !important;
    display: inline-flex !important;
    align-items: center !important;
    white-space: nowrap !important;
  }

  .level-badge {
    display: none !important;
  }

  .streak-badge .streak-days-text {
    display: none !important;
  }

  .outcomes-section {
    padding: 20px 16px;
    margin: 16px 0 28px;
    border-radius: 2px;
  }

  .outcomes-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin: 0;
  }

  .mobile-segmented-control {
    display: flex !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch;
    padding: 3px !important;
    gap: 3px !important;
    margin: 12px 0 16px 0 !important;
    scrollbar-width: none;
    box-sizing: border-box !important;
  }

  .mobile-segmented-control::-webkit-scrollbar {
    display: none;
  }

  .segmented-tab {
    flex: 1 0 auto !important;
    padding: 5px 10px !important;
    font-size: 0.72rem !important;
    white-space: nowrap !important;
    scroll-snap-align: start !important;
  }

  .tracks-snap-lane {
    display: flex !important;
    flex-direction: column !important;
    gap: 14px !important;
    width: 100% !important;
    overflow-x: visible !important;
    padding-bottom: 0 !important;
  }

  .track-card {
    flex: 1 1 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 16px !important;
    box-sizing: border-box !important;
  }

  .cert-promo-card {
    flex-direction: column;
    text-align: center;
    padding: 20px 16px;
  }

  .cert-promo-icon {
    display: none;
  }

  .platform-footer {
    padding: 28px 14px 20px 14px !important;
  }

  .footer-inner {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 16px !important;
  }

  .footer-links {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px 14px !important;
    width: 100% !important;
  }

  .footer-links a {
    font-size: 0.82rem !important;
  }
}

@media (max-width: 340px) {
  .platform-header {
    padding: 0 4px !important;
  }

  .header-inner {
    gap: 2px !important;
  }

  .logo-title {
    font-size: 0.80rem !important;
  }

  .header-nav-links {
    gap: 2px !important;
  }

  .header-nav-links .nav-link {
    width: 28px !important;
    height: 26px !important;
    min-width: 28px !important;
  }

  .header-nav-links .nav-icon {
    font-size: 0.85rem !important;
  }

  .stat-badge {
    padding: 0 4px !important;
    height: 24px !important;
    font-size: 0.65rem !important;
  }

  .hero-section {
    padding: 8px 4px 14px 4px !important;
  }
}`;

// Replace the responsive block around line 1220
css = css.replace(/\/\* ==========================================================================\s+Responsive Viewport Architecture[\s\S]*?\.hero-section \{\s+padding: 8px 4px 14px 4px !important;\s+\}\s+\}/m, responsiveHeaderRules);

fs.writeFileSync('src/styles/dashboard.css', css, 'utf-8');
fs.writeFileSync('public/styles/dashboard.css', css, 'utf-8');
console.log('Successfully updated src/styles/dashboard.css and public/styles/dashboard.css');

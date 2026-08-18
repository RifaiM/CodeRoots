import fs from 'fs';
import path from 'path';

const hubs = ['3. partC', '5. partE', '6. partF', '7. partG', '8. partH', '9. partI'];

const certRule = `/* 4. Certificate Callout Section */
.cert-callout-card,
.certificate-preview-box {
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    gap: 16px;
}

.cert-callout-info h3,
.cert-title {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--text-title);
    margin: 0 0 6px 0;
}

.cert-callout-info p,
.cert-desc {
    font-size: 0.88rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
}

.cert-callout-btn,
.cert-action-btn {
    display: inline-flex;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    color: var(--text-title);
    padding: 8px 16px;
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    transition: all 0.15s ease;
}

.cert-callout-btn:hover,
.cert-action-btn:hover {
    background: var(--text-title);
    color: #F8F6F1;
    border-color: var(--text-title);
}

.cert-action-btn.locked {
    background: var(--border-hairline);
    border-color: var(--border-card);
    color: var(--text-muted) !important;
    cursor: not-allowed;
}

.cert-action-btn.unlocked {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: #F8F6F1 !important;
}`;

hubs.forEach(h => {
    const cssPath = path.resolve(`public/${h}/hub.css`);
    if (!fs.existsSync(cssPath)) return;
    let content = fs.readFileSync(cssPath, 'utf-8');
    content = content.replace(/\/\* 4\. Certificate Callout Section \*\/[\s\S]*?\.cert-callout-btn:hover \{[\s\S]*?\}/m, certRule);
    fs.writeFileSync(cssPath, content, 'utf-8');
    console.log(`Updated cert rules in ${cssPath}`);
});

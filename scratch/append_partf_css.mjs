import fs from 'fs';

const extraCss = `
/* Level 7 Branch Grid Styles */
.branch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
}

.branch-card {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none !important;
}

.branch-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.branch-icon-box {
    font-size: 1.2rem;
}

.branch-tag {
    font-family: var(--font-mono);
    font-size: 0.70rem;
    font-weight: 600;
    color: var(--accent-color);
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-card);
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
}

.branch-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text-title);
    margin: 0 0 8px 0;
    line-height: 1.35;
}

.branch-desc {
    font-size: 0.86rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0 0 14px 0;
}

.branch-meta-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 16px;
}

.branch-meta-item {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    background: var(--bg-page);
    border: 1px solid var(--border-hairline);
    padding: 2px 6px;
    border-radius: 2px;
}

.branch-syllabus-wrap {
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 12px;
    margin-bottom: 16px;
}

.syllabus-heading {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-title);
    margin-bottom: 8px;
    text-transform: uppercase;
}

.syllabus-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.syllabus-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    background: var(--bg-card);
    border: 1px solid var(--border-hairline);
    border-radius: 2px;
    text-decoration: none;
    color: var(--text-body);
    font-size: 0.80rem;
    transition: all 0.15s ease;
}

.syllabus-item:hover {
    border-color: var(--text-title);
}

.syllabus-item.locked {
    opacity: 0.6;
    background: var(--bg-page);
}

.syllabus-item-left {
    display: flex;
    align-items: center;
    gap: 6px;
}

.syllabus-idx {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
}

.syllabus-name {
    font-weight: 500;
}

.syllabus-status {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    font-weight: 600;
}

.branch-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--border-hairline);
}

.branch-action-btn {
    display: inline-flex;
    align-items: center;
    background: var(--accent-color);
    color: #F8F6F1 !important;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 600;
    text-transform: uppercase;
}
`;

fs.appendFileSync('public/6. partF/hub.css', extraCss, 'utf-8');
console.log('Appended branch grid css to public/6. partF/hub.css');

import type { DiagnosticProblem } from '../types';

export class DiagnosticsPanel {
    private static containerId: string = 'lintPanel';

    public static setContainerId(id: string): void {
        this.containerId = id;
    }

    private static escapeHTML(str: string): string {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Render VS Code-grade problems diagnostics list
     */
    public static render(problems: DiagnosticProblem[]): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        if (problems.length === 0) {
            container.innerHTML = '';
            return;
        }

        const hasError = problems.some(p => p.severity === 'error');
        const headerTitle = hasError 
            ? `🛑 Syntax & Compiler Diagnostics (${problems.length})` 
            : `💡 Mission & Code Guidance (${problems.length})`;

        const itemsHTML = problems.map(p => {
            const isError = p.severity === 'error';
            const isWarning = p.severity === 'warning';
            const icon = isError ? '🔴' : isWarning ? '🟡' : 'ℹ️';
            const badgeBg = isError ? '#F6ECE9' : isWarning ? '#FEF3C7' : '#F1EEE7';
            const badgeColor = isError ? '#A33B24' : isWarning ? '#92400E' : '#43423E';
            const badgeBorder = isError ? '#A33B24' : isWarning ? '#D97706' : '#D5D0C6';
            const badgeText = isError ? 'ERROR' : isWarning ? 'GUIDANCE' : 'INFO';

            const itemBorder = isError ? '#A33B24' : isWarning ? '#D97706' : '#D5D0C6';
            const itemBg = isError ? '#FFFFFF' : '#FFFFFF';

            const safeMsg = this.escapeHTML(p.message);
            const safeHint = p.hint ? this.escapeHTML(p.hint) : '';

            return `
                <div class="diagnostic-item ${p.severity}" style="background: ${itemBg}; border: 1px solid ${itemBorder}; padding: 12px 14px; border-radius: 2px; margin-bottom: 8px; font-family: var(--font-body, 'IBM Plex Sans', sans-serif);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.86rem;">
                            <span>${icon}</span>
                            ${p.line ? `<span style="background: #F1EEE7; color: #20211F; padding: 2px 6px; border-radius: 2px; font-size: 0.74rem; font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-weight: 700; border: 1px solid #D5D0C6;">Line ${p.line}</span>` : ''}
                            <span style="color: #20211F;">${safeMsg}</span>
                        </div>
                        <span style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 2px; font-family: var(--font-mono, 'IBM Plex Mono', monospace); flex-shrink: 0;">${badgeText}</span>
                    </div>
                    ${safeHint ? `
                        <div style="font-size: 0.82rem; color: #43423E; background: #F8F6F1; border: 1px solid #D5D0C6; padding: 8px 12px; border-radius: 2px; margin-top: 6px; line-height: 1.5;">
                            💡 <strong>Hint:</strong> ${safeHint}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="vscode-problems-panel" style="margin-bottom: 14px;">
                <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #686760; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; font-family: var(--font-mono, 'IBM Plex Mono', monospace);">
                    <span>${headerTitle}</span>
                </div>
                ${itemsHTML}
            </div>
        `;
    }

    public static clear(): void {
        const container = document.getElementById(this.containerId);
        if (container) container.innerHTML = '';
    }
}

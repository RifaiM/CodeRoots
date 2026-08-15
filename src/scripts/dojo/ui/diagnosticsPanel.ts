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
            const icon = isError ? '🔴' : p.severity === 'warning' ? '🟡' : 'ℹ️';
            const badgeBg = isError ? '#fee2e2' : p.severity === 'warning' ? '#fef3c7' : '#eff6ff';
            const badgeColor = isError ? '#dc2626' : p.severity === 'warning' ? '#b45309' : '#2563eb';
            const badgeText = isError ? 'ERROR' : p.severity === 'warning' ? 'GUIDANCE' : 'INFO';

            const safeMsg = this.escapeHTML(p.message);
            const safeHint = p.hint ? this.escapeHTML(p.hint) : '';

            return `
                <div class="diagnostic-item ${p.severity}" style="background: #ffffff; border: 1px solid ${isError ? '#fca5a5' : '#fde68a'}; border-left: 4px solid ${isError ? '#ef4444' : '#f59e0b'}; padding: 12px 14px; border-radius: 10px; margin-bottom: 8px; font-family: 'Plus Jakarta Sans', sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.86rem;">
                            <span>${icon}</span>
                            ${p.line ? `<span style="background: #f1f5f9; color: #334155; padding: 2px 6px; border-radius: 4px; font-size: 0.74rem; font-family: monospace; font-weight: 700; border: 1px solid #cbd5e1;">Line ${p.line}</span>` : ''}
                            <span style="color: #0f172a;">${safeMsg}</span>
                        </div>
                        <span style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 12px; font-family: 'Fira Code', monospace; flex-shrink: 0;">${badgeText}</span>
                    </div>
                    ${safeHint ? `
                        <div style="font-size: 0.82rem; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 6px; margin-top: 6px; line-height: 1.5;">
                            💡 <strong>Hint:</strong> ${safeHint}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="vscode-problems-panel" style="margin-bottom: 14px;">
                <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
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

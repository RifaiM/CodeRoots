import type { DiagnosticProblem } from '../types';

export class DiagnosticsPanel {
    private static containerId: string = 'lintPanel';

    public static setContainerId(id: string): void {
        this.containerId = id;
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

        const itemsHTML = problems.map(p => {
            const isError = p.severity === 'error';
            const icon = isError ? '🔴' : p.severity === 'warning' ? '🟡' : 'ℹ️';
            const badgeBg = isError ? '#fee2e2' : p.severity === 'warning' ? '#fef3c7' : '#eff6ff';
            const badgeColor = isError ? '#dc2626' : p.severity === 'warning' ? '#b45309' : '#2563eb';
            const badgeText = isError ? 'ERROR' : p.severity === 'warning' ? 'WARNING' : 'INFO';

            return `
                <div class="diagnostic-item ${p.severity}" style="background: #ffffff; border: 1px solid ${isError ? '#fca5a5' : '#fde68a'}; border-left: 4px solid ${isError ? '#ef4444' : '#f59e0b'}; padding: 10px 14px; border-radius: 8px; margin-bottom: 8px; font-family: 'Plus Jakarta Sans', sans-serif;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
                        <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 0.84rem; color: #0f172a;">
                            <span>${icon}</span>
                            <span>${p.line ? `Line ${p.line}: ` : ''}${p.message}</span>
                        </div>
                        <span style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.70rem; font-weight: 800; padding: 2px 7px; border-radius: 12px; font-family: 'Fira Code', monospace;">${badgeText}</span>
                    </div>
                    ${p.hint ? `
                        <div style="font-size: 0.80rem; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 6px; margin-top: 6px; line-height: 1.5;">
                            💡 <strong>Hint:</strong> ${p.hint}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="vscode-problems-panel" style="margin-bottom: 14px;">
                <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <span>⚠️ Diagnostic Problems (${problems.length})</span>
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

import type { ChecklistTask } from '../types';

export class ChecklistManager {
    private tasks: ChecklistTask[] = [];
    private containerId: string = 'taskChecklist';
    private mode: string = 'html';

    constructor(tasks: ChecklistTask[], containerId: string = 'taskChecklist', mode: string = 'html') {
        this.tasks = tasks;
        this.containerId = containerId;
        this.mode = mode;
        this.render();
    }

    /**
     * Universal comment stripper to eliminate false positive regex matches in instructional comments
     */
    public static stripComments(code: string, mode: string = 'html'): string {
        if (!code) return '';
        let cleaned = code
            .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // JSX comments
            .replace(/<!--[\s\S]*?-->/g, '')             // HTML comments
            .replace(/\/\*[\s\S]*?\*\//g, '')            // Multi-line CSS / JS comments
            .replace(/(?<!:)\/\/[^\r\n]*/g, '');         // Single-line JS comments (avoid stripping http:// and https://)

        // Only strip # comments for Python / Shell / YAML languages (prevents breaking CSS hex colors and ID selectors)
        if (mode === 'python' || mode === 'bash' || mode === 'shell' || mode === 'yaml') {
            cleaned = cleaned.replace(/#[^\r\n]*/g, '');
        }

        // Only strip -- comments for SQL (prevents breaking CSS custom properties --var)
        if (mode === 'sql') {
            cleaned = cleaned.replace(/--[^\r\n]*/g, '');
        }

        return cleaned;
    }

    public render(): void {
        let container = document.getElementById(this.containerId);
        
        // Auto-locate mission card if container is not explicitly in DOM
        if (!container) {
            const missionCard = document.querySelector('.mission-card') || 
                                document.querySelector('.concept-card[style*="border-left"]') ||
                                document.querySelector('.lesson-instructions-pane .concept-card:last-child');
            if (missionCard) {
                const existingOl = missionCard.querySelector('ol');
                const newContainer = document.createElement('div');
                newContainer.id = this.containerId;
                if (existingOl) {
                    existingOl.replaceWith(newContainer);
                } else {
                    missionCard.appendChild(newContainer);
                }
                container = newContainer;
            }
        }

        if (!container) return;

        container.innerHTML = `
            <ul class="checklist-items">
                ${this.tasks.map(t => {
                    const label = t.label || t.text || '';
                    return `
                    <li class="checklist-item" id="task_item_${t.id}" data-task-id="${t.id}">
                        <span class="task-icon">⚪</span>
                        <span class="task-label">${label}</span>
                    </li>
                    `;
                }).join('')}
            </ul>
        `;

        const counter = document.getElementById('checklistCounter') || document.getElementById('missionCounter');
        if (counter) {
            counter.textContent = `0 / ${this.tasks.length}`;
            counter.classList.remove('all-passed');
        }
    }

    public run(rawCode: string): { allPassed: boolean; passedCount: number; totalCount: number } {
        let passedCount = 0;
        let doc: Document | undefined;

        // Strip comments so instructional TODO comments never trigger tasks
        const cleanCode = ChecklistManager.stripComments(rawCode, this.mode);

        try {
            doc = new DOMParser().parseFromString(cleanCode, 'text/html');
        } catch (e) {}

        this.tasks.forEach(task => {
            const item = document.getElementById(`task_item_${task.id}`);
            let isPassed = false;

            const validatorFn = task.fn || task.validator;
            if (validatorFn) {
                try {
                    isPassed = validatorFn(cleanCode, doc);
                } catch (e) {
                    isPassed = false;
                }
            } else if (task.regex) {
                isPassed = task.regex.test(cleanCode);
            }

            if (item) {
                const icon = item.querySelector('.task-icon');
                if (isPassed) {
                    item.classList.add('passed');
                    if (icon) icon.textContent = '✅';
                } else {
                    item.classList.remove('passed');
                    if (icon) icon.textContent = '⚪';
                }
            }

            if (isPassed) passedCount++;
        });

        const counter = document.getElementById('checklistCounter') || document.getElementById('missionCounter');
        if (counter) {
            counter.textContent = `${passedCount} / ${this.tasks.length}`;
            if (passedCount === this.tasks.length && this.tasks.length > 0) {
                counter.classList.add('all-passed');
            } else {
                counter.classList.remove('all-passed');
            }
        }

        return {
            allPassed: passedCount === this.tasks.length && this.tasks.length > 0,
            passedCount,
            totalCount: this.tasks.length
        };
    }
}

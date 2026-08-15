import type { ChecklistTask } from '../types';

export class ChecklistManager {
    private tasks: ChecklistTask[] = [];
    private containerId: string = 'taskChecklist';

    constructor(tasks: ChecklistTask[], containerId: string = 'taskChecklist') {
        this.tasks = tasks;
        this.containerId = containerId;
        this.render();
    }

    /**
     * Universal comment stripper to eliminate false positive regex matches in instructional comments
     */
    public static stripComments(code: string): string {
        if (!code) return '';
        return code
            .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // JSX comments
            .replace(/<!--[\s\S]*?-->/g, '')             // HTML comments
            .replace(/\/\*[\s\S]*?\*\//g, '')            // Multi-line CSS / JS comments
            .replace(/\/\/[^\r\n]*/g, '')                // Single-line JS comments
            .replace(/#[^\r\n]*/g, '')                   // Python / Bash / YAML comments
            .replace(/--[^\r\n]*/g, '');                 // SQL comments
    }

    public render(): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="dojo-checklist-card">
                <div class="checklist-header">
                    <span class="checklist-title">📋 Task Checklist</span>
                    <span class="checklist-counter" id="checklistCounter">0 / ${this.tasks.length}</span>
                </div>
                <ul class="checklist-items">
                    ${this.tasks.map(t => `
                        <li class="checklist-item" id="task_item_${t.id}" data-task-id="${t.id}">
                            <span class="task-icon">⚪</span>
                            <span class="task-label">${t.label}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    public run(rawCode: string): { allPassed: boolean; passedCount: number; totalCount: number } {
        let passedCount = 0;
        let doc: Document | undefined;

        // Strip comments so instructional TODO comments never trigger tasks
        const cleanCode = ChecklistManager.stripComments(rawCode);

        try {
            doc = new DOMParser().parseFromString(cleanCode, 'text/html');
        } catch (e) {}

        this.tasks.forEach(task => {
            const item = document.getElementById(`task_item_${task.id}`);
            let isPassed = false;

            if (task.fn) {
                try {
                    isPassed = task.fn(cleanCode, doc);
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

        const counter = document.getElementById('checklistCounter');
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

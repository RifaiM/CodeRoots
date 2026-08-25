/**
 * NoviCodes Pyodide WebAssembly Python Runner
 * Executes CPython 3.12 in an isolated background Web Worker
 */

export interface PythonExecutionResult {
 success: boolean;
 stdout: string;
 stderr: string;
}

export class PyodideRunner {
 private static worker: Worker | null = null;
 private static requestId = 0;
 private static pending = new Map<number, {
 resolve: (res: PythonExecutionResult) => void;
 reject: (err: any) => void;
 }>();

 private static getWorker(): Worker | null {
 if (!this.worker && typeof Worker !== 'undefined') {
 try {
 this.worker = new Worker('/scripts/pyodide-worker.js');
 this.worker.onmessage = (event: MessageEvent) => {
 const { id, success, stdout, stderr } = event.data;
 const callback = this.pending.get(id);
 if (callback) {
 this.pending.delete(id);
 callback.resolve({
 success: Boolean(success),
 stdout: stdout || '',
 stderr: stderr || ''
 });
 }
 };
 this.worker.onerror = (err) => {
 console.warn('Pyodide Worker error:', err);
 };
 } catch (e) {
 console.warn('Could not initialize Pyodide worker:', e);
 this.worker = null;
 }
 }
 return this.worker;
 }

 public static async run(code: string, timeoutMs = 12000): Promise<PythonExecutionResult> {
 const w = this.getWorker();
 if (!w) {
 throw new Error('Pyodide Web Worker not available');
 }

 return new Promise((resolve, reject) => {
 const id = ++this.requestId;
 const timer = setTimeout(() => {
 if (this.pending.has(id)) {
 this.pending.delete(id);
 resolve({
 success: false,
 stdout: '',
 stderr: `Execution timed out after ${timeoutMs / 1000} seconds.`
 });
 }
 }, timeoutMs);

 this.pending.set(id, {
 resolve: (res) => {
 clearTimeout(timer);
 resolve(res);
 },
 reject
 });

 w.postMessage({ id, code });
 });
 }
}

// public/scripts/pyodide-worker.js
// Dedicated Web Worker executing CPython 3.12 WebAssembly via Pyodide

let pyodideReadyPromise = null;
let pyodide = null;

async function initPyodide() {
 if (!pyodideReadyPromise) {
 pyodideReadyPromise = (async () => {
 importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js');
 // @ts-ignore
 pyodide = await loadPyodide({
 indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/'
 });
 return pyodide;
 })();
 }
 return pyodideReadyPromise;
}

self.onmessage = async (event) => {
 const { id, code } = event.data;
 if (!id || typeof code !== 'string') return;

 try {
 const py = await initPyodide();
 
 let stdout = '';
 let stderr = '';

 py.setStdout({
 batched: (msg) => {
 stdout += (stdout ? '\n' : '') + msg;
 }
 });

 py.setStderr({
 batched: (msg) => {
 stderr += (stderr ? '\n' : '') + msg;
 }
 });

 await py.runPythonAsync(code);

 self.postMessage({
 id,
 success: true,
 stdout: stdout.trim(),
 stderr: stderr.trim()
 });
 } catch (err) {
 const rawMsg = (err && err.message) ? String(err.message) : 'Python runtime error';
 const cleanMsg = rawMsg.replace(/\s+\(at .+\)/g, '').trim();
 self.postMessage({
 id,
 success: false,
 stdout: '',
 stderr: cleanMsg
 });
 }
};

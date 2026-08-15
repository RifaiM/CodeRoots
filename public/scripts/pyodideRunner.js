// public/scripts/pyodideRunner.js
// Singleton manager communicating with the Pyodide Web Worker

let _pyodideWorker = null;
let _requestId = 0;
const _pending = new Map();

function getWorkerInstance() {
    if (!_pyodideWorker && typeof Worker !== 'undefined') {
        try {
            _pyodideWorker = new Worker('/scripts/pyodide-worker.js');
            _pyodideWorker.onmessage = (event) => {
                const { id, success, stdout, stderr } = event.data;
                const callback = _pending.get(id);
                if (callback) {
                    _pending.delete(id);
                    callback.resolve({ success, stdout: stdout || '', stderr: stderr || '' });
                }
            };
            _pyodideWorker.onerror = (err) => {
                console.warn('Pyodide Worker encountered an error:', err);
            };
        } catch (e) {
            console.warn('Unable to instantiate Pyodide Web Worker:', e);
            _pyodideWorker = null;
        }
    }
    return _pyodideWorker;
}

export async function runPython(code, timeoutMs = 12000) {
    const worker = getWorkerInstance();
    if (!worker) {
        throw new Error('Web Worker not supported or Pyodide worker unavailable');
    }

    return new Promise((resolve, reject) => {
        const id = ++_requestId;
        const timer = setTimeout(() => {
            if (_pending.has(id)) {
                _pending.delete(id);
                resolve({
                    success: false,
                    stdout: '',
                    stderr: 'Execution timed out after ' + (timeoutMs / 1000) + ' seconds.'
                });
            }
        }, timeoutMs);

        _pending.set(id, {
            resolve: (res) => {
                clearTimeout(timer);
                resolve(res);
            },
            reject
        });

        worker.postMessage({ id, code });
    });
}

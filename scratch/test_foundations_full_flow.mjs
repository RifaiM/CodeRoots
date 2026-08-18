import fs from 'fs';
import path from 'path';

// Mock DOM environment
class MockElement {
    constructor(id = '', className = '', tagName = 'div') {
        this.id = id;
        this.className = className;
        this.tagName = tagName.toUpperCase();
        this.children = [];
        this.innerHTML = '';
        this.textContent = '';
        this.style = {};
        this.dataset = {};
        this._listeners = {};
    }

    addEventListener(event, fn) {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(fn);
    }

    dispatchEvent(event) {
        if (this._listeners[event.type]) {
            this._listeners[event.type].forEach(fn => fn(event));
        }
    }

    querySelector(sel) {
        if (sel.startsWith('#')) {
            const targetId = sel.slice(1);
            return this.id === targetId ? this : (this._findDeep(el => el.id === targetId));
        }
        if (sel.startsWith('.')) {
            const targetClass = sel.slice(1);
            return this.className.includes(targetClass) ? this : (this._findDeep(el => el.className.includes(targetClass)));
        }
        return null;
    }

    querySelectorAll(sel) {
        const results = [];
        this._collectDeep(sel, results);
        return results;
    }

    _collectDeep(sel, results) {
        // Basic parser for mock
        if (sel.includes('.quiz-opt-btn') || sel.includes('.quiz-option-btn')) {
            if (this.className.includes('quiz-opt-btn') || this.className.includes('quiz-option-btn')) {
                results.push(this);
            }
        }
        this.children.forEach(c => c._collectDeep(sel, results));
    }

    _findDeep(predicate) {
        for (const child of this.children) {
            if (predicate(child)) return child;
            const nested = child._findDeep(predicate);
            if (nested) return nested;
        }
        return null;
    }
}

class MockDocument {
    constructor() {
        this.elements = {};
        this._listeners = {};
    }

    createElement(tag) {
        return new MockElement('', '', tag);
    }

    getElementById(id) {
        if (!this.elements[id]) {
            this.elements[id] = new MockElement(id);
        }
        return this.elements[id];
    }

    querySelectorAll(sel) {
        return [];
    }

    querySelector(sel) {
        if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
        return new MockElement();
    }

    addEventListener(event, fn) {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(fn);
    }
}

class MockLocalStorage {
    constructor() { this.store = {}; }
    getItem(k) { return this.store[k] || null; }
    setItem(k, v) { this.store[k] = String(v); }
    removeItem(k) { delete this.store[k]; }
    clear() { this.store = {}; }
}

global.document = new MockDocument();
global.window = global;
global.localStorage = new MockLocalStorage();
global.CustomEvent = class { constructor(t) { this.type = t; } };
global.dispatchEvent = () => {};

// Load all 13 track data modules
const dataDir = 'd:/3. CodeRoots-refactor/public/data';
const dataFiles = fs.readdirSync(dataDir);
dataFiles.forEach(file => {
    const code = fs.readFileSync(path.join(dataDir, file), 'utf8');
    eval(code); // Evaluate in global mock window
});

console.log('--- Checking Track Data Modules Loaded ---');
const tracks = [
    'LEVEL1_HTML_DATA', 'LEVEL2_CSS_DATA', 'LEVEL3_JS_DATA',
    'LEVEL5_REACT_DATA', 'LEVEL6_PYTHON_DATA',
    'LEVEL7A_CLOUD_DATA', 'LEVEL7B_SQL_DATA', 'LEVEL7C_NEXTJS_DATA',
    'LEVEL7D_TYPESCRIPT_DATA', 'LEVEL7E_CSSMOTION_DATA',
    'LEVEL8_ASYNC_DATA', 'LEVEL9_AUTH_DATA', 'LEVEL10_SAAS_DATA'
];

tracks.forEach(t => {
    const qList = global[t] && (global[t].quizzes || global[t].quiz);
    if (!qList || qList.length === 0) {
        console.error(`❌ Missing or empty quiz in track ${t}`);
        process.exit(1);
    } else {
        console.log(`✅ ${t}: ${global[t].title} (${qList.length} questions)`);
    }
});

// Load foundations.js code
const foundationsCode = fs.readFileSync('d:/3. CodeRoots-refactor/public/foundations.js', 'utf8');
eval(foundationsCode);

console.log('\n--- Testing initInteractiveQuiz Execution & Submit Handler ---');
const htmlData = global.LEVEL1_HTML_DATA;
const quizContainer = document.getElementById('quizQuestionsContainer');
const submitBtn = document.getElementById('submitQuizBtn');

window.initQuizEngine(htmlData);

console.log('Quiz Container HTML generated length:', quizContainer.innerHTML.length);
if (quizContainer.innerHTML.length < 50) {
    console.error('❌ Quiz HTML was not generated!');
    process.exit(1);
}

console.log('✅ Foundations script evaluated without errors!');
console.log('✅ initInteractiveQuiz generated quiz cards properly!');

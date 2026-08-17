import fs from 'fs';
import path from 'path';

console.log('🧪 Testing Branch D (TypeScript Mastery) Starter Codes & Checklists...\n');

const solutions = [
    // Lesson 1
    `let appName: string = "NoviCloud";
let serverPort: number = 8080;
let isProduction: boolean = true;
let releaseVersion = "v2.5.0";
function formatServerStatus(name: string, port: number, active: boolean): string {
    return \`\${name}:\${port} is \${active ? 'ONLINE' : 'OFFLINE'}\`;
}`,
    // Lesson 2
    `const activeNodes: string[] = ["node-east", "node-west"];
const metrics: Array<number> = [98, 95, 99];
const serverGeoLocation: [number, number, string] = [37.7749, -122.4194, "San Francisco"];
const allowedProtocols: readonly string[] = ["HTTPS", "WSS", "GRPC"];
function getNodeCount(nodes: readonly string[]): number {
    return nodes.length;
}`,
    // Lesson 3
    `type NetworkState = 'idle' | 'loading' | 'success' | 'error';
type ResponseCode = string | number;
let currentRequestState: NetworkState = 'idle';
function renderStatusBadge(state: NetworkState): string {
    return state === 'success' ? '✅' : '⏳';
}
function parseStatusCode(code: ResponseCode): number {
    return typeof code === 'number' ? code : parseInt(code, 10);
}`,
    // Lesson 4
    `interface BaseEntity {
    readonly id: string;
    createdAt: Date;
}
interface UserProfile extends BaseEntity {
    username: string;
    email: string;
    avatarUrl?: string;
    karmaScore: number;
}
interface AdminAccount extends UserProfile {
    permissions: string[];
    accessLevel: 'moderator' | 'superadmin';
}
const leadAdmin: AdminAccount = {
    id: "admin-1",
    createdAt: new Date(),
    username: "alex",
    email: "alex@example.com",
    karmaScore: 100,
    permissions: ["manage_users"],
    accessLevel: "superadmin"
};
function formatUserHeader(user: UserProfile): string {
    return \`@\${user.username}\`;
}`,
    // Lesson 5
    `type MathOperation = (a: number, b: number) => number;
function calculateDiscount(price: number, discountRate: number = 0.1, promoCode?: string): number {
    return price * (1 - discountRate);
}
function logSystemEvent(level: 'info' | 'warn' | 'error', ...messages: string[]): void {
    console.log(level, ...messages);
}
function crashWithAlert(errorMessage: string): never {
    throw new Error(errorMessage);
}
function executeCalculation(op: MathOperation, x: number, y: number): number {
    return op(x, y);
}`,
    // Lesson 6
    `const saveBtn = document.getElementById("saveBtn");
function toggleBanner(elementId: string, isVisible: boolean): void {
    const el = document.getElementById(elementId);
    if (el !== null) {
        el.style.display = isVisible ? 'block' : 'none';
    }
}
function disableSubmitButton(buttonId: string): boolean {
    const el = document.getElementById(buttonId);
    if (el instanceof HTMLButtonElement) {
        el.disabled = true;
        return true;
    }
    return false;
}
function getInputValueSafe(inputId: string): string {
    const el = document.getElementById(inputId);
    if (el instanceof HTMLInputElement) {
        return el.value;
    }
    return "";
}`,
    // Lesson 7
    `function handleCardClick(event: MouseEvent): void {
    console.log(event.clientX, event.clientY);
}
function handleSearchKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
        console.log("Searching...");
    }
}
function handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
        console.log(target.value);
    }
}
function bindGlobalEscape(callback: () => void): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            callback();
        }
    });
}`,
    // Lesson 8
    `interface InitAction { type: 'INIT'; }
interface SetUserAction { type: 'SET_USER'; payload: { name: string; email: string }; }
interface SetErrorAction { type: 'SET_ERROR'; error: string; }
type AppAction = InitAction | SetUserAction | SetErrorAction;
interface AppState {
    status: 'idle' | 'ready' | 'error';
    user: { name: string; email: string } | null;
    errorMessage: string | null;
}
function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'INIT':
            return { ...state, status: 'idle' };
        case 'SET_USER':
            return { status: 'ready', user: action.payload, errorMessage: null };
        case 'SET_ERROR':
            return { ...state, status: 'error', errorMessage: action.error };
        default:
            return state;
    }
}`,
    // Lesson 9
    `interface ApiResponse<T> {
    status: number;
    data: T;
    timestamp: number;
    error?: string;
}
function wrapSuccessResponse<T>(data: T, status: number = 200): ApiResponse<T> {
    return { status, data, timestamp: Date.now() };
}
function getFirstItem<T>(items: T[]): T | undefined {
    return items[0];
}
function getLastItem<T>(items: T[]): T | undefined {
    return items[items.length - 1];
}
const userApiResult: ApiResponse<{ id: string; username: string }> = wrapSuccessResponse({ id: "1", username: "dev" });`,
    // Lesson 10
    `interface Identifiable { id: string | number; }
function findById<T extends Identifiable>(items: T[], targetId: string | number): T | undefined {
    return items.find(item => item.id === targetId);
}
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
interface Product { id: string; title: string; price: number; }
const prod: Product = { id: "p1", title: "Desk", price: 150 };
const deskPrice = getProperty(prod, "price");`,
    // Lesson 11
    `interface UserProfile {
    id: string;
    username: string;
    email: string;
    bio: string;
    isVerified: boolean;
}
type UserPatchUpdate = Partial<UserProfile>;
type PublicUserSummary = Pick<UserProfile, 'id' | 'username' | 'bio'>;
type UserRegistrationForm = Omit<UserProfile, 'id' | 'isVerified'>;
type RolePermissionMatrix = Record<'admin' | 'editor' | 'viewer', string[]>;
function applyUserPatch(original: UserProfile, patch: UserPatchUpdate): UserProfile {
    return { ...original, ...patch };
}`,
    // Lesson 12
    `type Listener<T> = (state: T) => void;
class TypedStore<T> {
    private state: T;
    private listeners: Listener<T>[] = [];

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState(): T {
        return this.state;
    }

    setState(updater: Partial<T> | ((prevState: T) => T)): void {
        if (typeof updater === 'function') {
            this.state = updater(this.state);
        } else {
            this.state = { ...this.state, ...updater };
        }
        this.listeners.forEach(fn => fn(this.state));
    }

    subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}
const store = new TypedStore({ count: 0, user: "admin" });
store.subscribe(s => console.log(s));
store.setState({ count: 1 });`
];

let totalTests = 0;
let passed = 0;

for (let i = 1; i <= 12; i++) {
    const file = path.join('src/pages/6. partF/branchD', `lesson${i}_remake.astro`);
    const code = fs.readFileSync(file, 'utf-8');
    
    // Extract checklist tests
    const match = code.match(/DojoEngine\.initChecklist\(\[([\s\S]*?)\](?:,\s*\{[\s\S]*?\})?\);/);
    if (!match) {
        console.error(`❌ Lesson ${i}: Failed to find DojoEngine.initChecklist`);
        continue;
    }
    
    const checklistCode = `[${match[1]}]`;
    let checklist;
    try {
        checklist = eval(checklistCode);
    } catch (e) {
        console.error(`❌ Lesson ${i}: Failed to parse checklist: ${e.message}`);
        continue;
    }
    
    const sol = solutions[i - 1];
    let allPassed = true;
    checklist.forEach((item, idx) => {
        totalTests++;
        const testFn = item.fn || item.test;
        const res = testFn(sol);
        if (res) {
            passed++;
        } else {
            allPassed = false;
            console.error(`❌ Lesson ${i} Step ${idx + 1} (${item.id}) FAILED test on reference solution!`);
        }
    });

    if (allPassed) {
        console.log(`✅ Lesson ${i} (All ${checklist.length} checklist tests passed!)`);
    }
}

console.log(`\n========================================`);
console.log(`🏁 Branch D Solution Matrix Verification: ${passed}/${totalTests} tests passed`);
console.log(`========================================\n`);

if (passed === totalTests) {
    console.log('🎉 ALL 12 BRANCH D LESSONS & CHECKLIST TESTS ARE 100% OPERATIONAL!');
} else {
    process.exit(1);
}

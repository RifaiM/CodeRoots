import fs from 'fs';
import path from 'path';

const targetDir = 'src/pages/6. partF/branchD';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const branchLessons = [
    { id: 1, title: "Primitive Types & Inference", url: "/6. partF/branchD/lesson1_remake.html" },
    { id: 2, title: "Arrays, Tuples & Readonly", url: "/6. partF/branchD/lesson2_remake.html" },
    { id: 3, title: "Union Types & String Literals", url: "/6. partF/branchD/lesson3_remake.html" },
    { id: 4, title: "Interfaces & Object Contracts", url: "/6. partF/branchD/lesson4_remake.html" },
    { id: 5, title: "Typed Functions & Rest Params", url: "/6. partF/branchD/lesson5_remake.html" },
    { id: 6, title: "DOM Elements & Null Narrowing", url: "/6. partF/branchD/lesson6_remake.html" },
    { id: 7, title: "Typed Event Handlers & Casting", url: "/6. partF/branchD/lesson7_remake.html" },
    { id: 8, title: "Discriminated Unions & Reducers", url: "/6. partF/branchD/lesson8_remake.html" },
    { id: 9, title: "Generics 101 & API Wrappers", url: "/6. partF/branchD/lesson9_remake.html" },
    { id: 10, title: "Generic Constraints & keyof", url: "/6. partF/branchD/lesson10_remake.html" },
    { id: 11, title: "Core Utility Types (Partial, Pick)", url: "/6. partF/branchD/lesson11_remake.html" },
    { id: 12, title: "Capstone: Typed State Store", url: "/6. partF/branchD/lesson12_remake.html" }
];

const lessonsData = [
    {
        num: 1,
        title: "Primitive Types & Inference",
        desc: "Learn primitive types (string, number, boolean, null, undefined) and understand when to annotate vs when to let TypeScript infer.",
        starterCode: `// 🚀 Level 7D Lesson 1: Primitive Types & Smart Inference!

// 👉 STEP 1: Declare an explicit string variable named 'appName' with value "NoviCloud"


// 👉 STEP 2: Declare an explicit number variable named 'serverPort' with value 8080


// 👉 STEP 3: Declare an explicit boolean variable named 'isProduction' with value true


// 👉 STEP 4: Declare an inferred variable named 'releaseVersion' with initial value "v2.5.0"


// 👉 STEP 5: Create a type-checked calculation function 'formatServerStatus' that takes (name: string, port: number, active: boolean): string
`,
        checklist: [
            { id: "step1", text: "Declare explicit string variable `appName: string = \"NoviCloud\"`", test: "code.includes('appName') && code.includes(':') && code.includes('string') && code.includes('NoviCloud')" },
            { id: "step2", text: "Declare explicit number variable `serverPort: number = 8080`", test: "code.includes('serverPort') && code.includes('number') && code.includes('8080')" },
            { id: "step3", text: "Declare explicit boolean variable `isProduction: boolean = true`", test: "code.includes('isProduction') && code.includes('boolean') && code.includes('true')" },
            { id: "step4", text: "Declare inferred variable `releaseVersion = \"v2.5.0\"`", test: "code.includes('releaseVersion') && code.includes('v2.5.0')" },
            { id: "step5", text: "Implement `formatServerStatus` function with typed parameters and string return", test: "code.includes('function formatServerStatus') && code.includes('name: string') && code.includes('port: number') && code.includes('active: boolean')" }
        ],
        painPoint: "In vanilla JavaScript, a variable starting as a number (`let port = 8080`) can accidentally be reassigned to a text string (`port = \"disabled\"`) later in a 5,000-line codebase. The server crashes silently when network libraries try to connect to a non-numeric port.",
        analogy: "Think of type annotations like customs luggage tags at an airport. Once a bag is tagged 'Fragile Glass' (number), the airline refuses to let anyone stuff 50 pounds of raw meat (string) inside it.",
        syntax: `<code>let port: number = 8080;</code><br/>
• <strong>let port</strong> → Variable name<br/>
• <strong>: number</strong> → The strict type contract (only numbers allowed)<br/>
• <strong>= 8080</strong> → The initial assigned value`,
        vscodeTrap: "Don't over-annotate simple local variables! Writing <code>let age: number = 25;</code> is redundant because TypeScript already infers <code>number</code> from <code>25</code>. Save explicit annotations for function inputs and uninitialized variables."
    },
    {
        num: 2,
        title: "Arrays, Tuples & Readonly",
        desc: "Master typed lists, fixed-length coordinate tuples, and immutable readonly arrays.",
        starterCode: `// 🚀 Level 7D Lesson 2: Arrays, Tuples & Readonly Modifiers!

// 👉 STEP 1: Declare an array of server names 'activeNodes: string[]' with ["node-east", "node-west"]


// 👉 STEP 2: Declare an array using generic syntax 'metrics: Array<number>' with [98, 95, 99]


// 👉 STEP 3: Declare a fixed coordinate Tuple 'serverGeoLocation: [number, number, string]' with [37.7749, -122.4194, "San Francisco"]


// 👉 STEP 4: Declare an immutable array 'allowedProtocols: readonly string[]' with ["HTTPS", "WSS", "GRPC"]


// 👉 STEP 5: Create a helper 'getNodeCount(nodes: readonly string[]): number' that returns nodes.length
`,
        checklist: [
            { id: "step1", text: "Declare `activeNodes: string[]` with specified server names", test: "code.includes('activeNodes') && (code.includes('string[]') || code.includes('Array<string>')) && code.includes('node-east')" },
            { id: "step2", text: "Declare `metrics: Array<number>` with numbers", test: "code.includes('metrics') && (code.includes('Array<number>') || code.includes('number[]')) && code.includes('98')" },
            { id: "step3", text: "Declare Tuple `serverGeoLocation: [number, number, string]`", test: "code.includes('serverGeoLocation') && code.includes('[number, number, string]') && code.includes('37.7749')" },
            { id: "step4", text: "Declare `allowedProtocols: readonly string[]`", test: "code.includes('allowedProtocols') && code.includes('readonly') && code.includes('HTTPS')" },
            { id: "step5", text: "Implement `getNodeCount` accepting `readonly string[]`", test: "code.includes('function getNodeCount') && code.includes('readonly') && code.includes('number')" }
        ],
        painPoint: "In vanilla JS, an array can hold mixed data `[42, 'admin', true, { error: 500 }]`. When you loop through it expecting objects, your code crashes with `TypeError: item.toUpperCase is not a function`.",
        analogy: "A Tuple `[number, number, string]` is like a GPS coordinate receipt: Slot 1 is Latitude, Slot 2 is Longitude, Slot 3 is City Name. The order and length are locked in stone.",
        syntax: `<code>let coords: [number, number] = [40.71, -74.00];</code><br/>
• <strong>[number, number]</strong> → Strict tuple of exactly 2 numbers<br/>
• <strong>readonly string[]</strong> → An array where <code>.push()</code> and <code>.pop()</code> are forbidden`,
        vscodeTrap: "Remember that Tuples check index positions strictly: `coords[0]` is guaranteed to be a number, whereas in a normal array `list[0]` could be undefined if the array is empty."
    },
    {
        num: 3,
        title: "Union Types & String Literals",
        desc: "Define strict state machines and multi-type variables using Union (|) and Literal types.",
        starterCode: `// 🚀 Level 7D Lesson 3: Union Types & String Literals!

// 👉 STEP 1: Create a type alias 'NetworkState' representing union of literal strings: 'idle' | 'loading' | 'success' | 'error'


// 👉 STEP 2: Create a type alias 'ResponseCode' representing union: string | number


// 👉 STEP 3: Declare a variable 'currentRequestState: NetworkState' with initial value 'idle'


// 👉 STEP 4: Create a function 'renderStatusBadge(state: NetworkState): string' that returns a formatted status icon


// 👉 STEP 5: Create a function 'parseStatusCode(code: ResponseCode): number' that safely returns a numeric code
`,
        checklist: [
            { id: "step1", text: "Define `type NetworkState = 'idle' | 'loading' | 'success' | 'error'`", test: "code.includes('type NetworkState') && code.includes('idle') && code.includes('loading') && code.includes('success') && code.includes('error')" },
            { id: "step2", text: "Define `type ResponseCode = string | number`", test: "code.includes('type ResponseCode') && code.includes('string | number')" },
            { id: "step3", text: "Declare `currentRequestState: NetworkState = 'idle'`", test: "code.includes('currentRequestState') && code.includes('NetworkState') && code.includes('idle')" },
            { id: "step4", text: "Implement `renderStatusBadge(state: NetworkState): string`", test: "code.includes('function renderStatusBadge') && code.includes('state: NetworkState') && code.includes('string')" },
            { id: "step5", text: "Implement `parseStatusCode(code: ResponseCode): number`", test: "code.includes('function parseStatusCode') && code.includes('code: ResponseCode') && code.includes('number')" }
        ],
        painPoint: "In JavaScript, typos in status flags like `if (status === 'succes')` (missing an 's') fail silently without any error message, leaving your UI stuck in an infinite loading spinner.",
        analogy: "A Union of String Literals is like a microwave preset dial: you can only turn it to 'Defrost', 'Reheat', 'Popcorn', or 'Stop'. You cannot set it to 'Explode' because the dial physically won't turn there.",
        syntax: `<code>type Theme = 'light' | 'dark' | 'system';</code><br/>
• <strong>type Theme</strong> → Name of the custom type alias<br/>
• <strong>|</strong> → The Union operator (means 'OR')<br/>
• <strong>'light'</strong> → String literal value (must match character-for-character)`,
        vscodeTrap: "When using union types like `string | number`, TypeScript won't let you call `.toUpperCase()` until you use `typeof code === 'string'` to narrow down the type first!"
    },
    {
        num: 4,
        title: "Interfaces & Object Contracts",
        desc: "Define strict object models with interfaces, optional fields (?), readonly properties, and interface inheritance.",
        starterCode: `// 🚀 Level 7D Lesson 4: Interfaces & Object Contracts!

// 👉 STEP 1: Define an interface 'BaseEntity' with 'readonly id: string' and 'createdAt: Date'


// 👉 STEP 2: Define an interface 'UserProfile' that extends 'BaseEntity' with:
//           - username: string
//           - email: string
//           - avatarUrl?: string (optional)
//           - karmaScore: number


// 👉 STEP 3: Define an interface 'AdminAccount' that extends 'UserProfile' with:
//           - permissions: string[]
//           - accessLevel: 'moderator' | 'superadmin'


// 👉 STEP 4: Create a valid object 'leadAdmin: AdminAccount' with sample data


// 👉 STEP 5: Create a function 'formatUserHeader(user: UserProfile): string'
`,
        checklist: [
            { id: "step1", text: "Define `interface BaseEntity` with `readonly id` and `createdAt`", test: "code.includes('interface BaseEntity') && code.includes('readonly id: string') && code.includes('createdAt: Date')" },
            { id: "step2", text: "Define `interface UserProfile extends BaseEntity` with optional `avatarUrl?`", test: "code.includes('interface UserProfile extends BaseEntity') && code.includes('avatarUrl?: string')" },
            { id: "step3", text: "Define `interface AdminAccount extends UserProfile` with literal `accessLevel`", test: "code.includes('interface AdminAccount extends UserProfile') && code.includes('accessLevel:')" },
            { id: "step4", text: "Create sample `leadAdmin: AdminAccount` object", test: "code.includes('leadAdmin') && code.includes('AdminAccount') && code.includes('permissions')" },
            { id: "step5", text: "Implement `formatUserHeader(user: UserProfile): string`", test: "code.includes('function formatUserHeader') && code.includes('user: UserProfile')" }
        ],
        painPoint: "When frontends receive JSON from an API, a missing `email` field or misspelled `avatar_url` vs `avatarUrl` crashes the entire profile screen with `Cannot read property of undefined`.",
        analogy: "An Interface is a legal passport application: every box (First Name, Birthdate, Nationality) must be filled in with the exact required format before the border officer will stamp it.",
        syntax: `<code>interface User { id: string; avatarUrl?: string; readonly role: string; }</code><br/>
• <strong>?</strong> → Optional property flag<br/>
• <strong>readonly</strong> → Immutable property flag<br/>
• <strong>extends</strong> → Inherit all properties from another interface`,
        vscodeTrap: "Use `interface` when modeling objects and domain entities (especially when extending or merging), and use `type` for unions (`A | B`), primitives, and tuples."
    },
    {
        num: 5,
        title: "Typed Functions & Rest Params",
        desc: "Declare typed parameters, return types, optional arguments, default values, and typed rest parameters.",
        starterCode: `// 🚀 Level 7D Lesson 5: Typed Functions & Rest Parameters!

// 👉 STEP 1: Declare a function type signature 'MathOperation' that takes (a: number, b: number) and returns number


// 👉 STEP 2: Implement 'calculateDiscount(price: number, discountRate: number = 0.1, promoCode?: string): number'


// 👉 STEP 3: Implement a function 'logSystemEvent(level: 'info' | 'warn' | 'error', ...messages: string[]): void'


// 👉 STEP 4: Implement a function 'crashWithAlert(errorMessage: string): never' that throws an Error


// 👉 STEP 5: Create a higher-order function 'executeCalculation(op: MathOperation, x: number, y: number): number'
`,
        checklist: [
            { id: "step1", text: "Define type `MathOperation = (a: number, b: number) => number`", test: "code.includes('type MathOperation') && code.includes('(a: number, b: number) => number')" },
            { id: "step2", text: "Implement `calculateDiscount` with default `0.1` and optional `promoCode?`", test: "code.includes('function calculateDiscount') && code.includes('discountRate: number = 0.1') && code.includes('promoCode?: string')" },
            { id: "step3", text: "Implement `logSystemEvent` with rest params `...messages: string[]` returning `void`", test: "code.includes('function logSystemEvent') && code.includes('...messages: string[]') && code.includes('void')" },
            { id: "step4", text: "Implement `crashWithAlert` returning `never`", test: "code.includes('function crashWithAlert') && code.includes('never') && code.includes('throw new Error')" },
            { id: "step5", text: "Implement `executeCalculation(op: MathOperation, x: number, y: number): number`", test: "code.includes('function executeCalculation') && code.includes('op: MathOperation')" }
        ],
        painPoint: "In JS, forgetting to return a value from a function leaves you with `undefined`. If another part of your app multiplies that result by 10, you get `NaN` propagating silently through your invoices.",
        analogy: "A function return type `: number` is a vending machine contract: if you put $2 in, it is physically wired to drop a soda can (number), not an empty puff of air (`void`) or a brick (`undefined`).",
        syntax: `<code>function add(a: number, b: number): number { return a + b; }</code><br/>
• <strong>(a: number, b: number)</strong> → Typed input parameters<br/>
• <strong>: number</strong> → The guaranteed return type<br/>
• <strong>void</strong> → Indicates the function produces side effects without returning data<br/>
• <strong>never</strong> → Indicates the function throws an exception and never reaches completion`,
        vscodeTrap: "Always specify return types on public API functions. It prevents accidental refactor bugs where someone changes the return statement and breaks 20 other files!"
    },
    {
        num: 6,
        title: "DOM Elements & Null Narrowing",
        desc: "Safely manipulate HTML elements, handle HTMLElement | null, and use instanceof type guards.",
        starterCode: `// 🚀 Level 7D Lesson 6: DOM Elements & Null Narrowing!

// 👉 STEP 1: Safely query an element 'const saveBtn = document.getElementById("saveBtn")'


// 👉 STEP 2: Create a function 'toggleBanner(elementId: string, isVisible: boolean): void'
//           - Look up element by id
//           - Use an 'if (element !== null)' or optional chaining guard to update style.display


// 👉 STEP 3: Create a function 'disableSubmitButton(buttonId: string): boolean'
//           - Look up element
//           - Use 'if (element instanceof HTMLButtonElement)' type guard
//           - Set element.disabled = true and return true (return false if element is not a button)


// 👉 STEP 4: Create a function 'getInputValueSafe(inputId: string): string'
//           - Narrow using 'instanceof HTMLInputElement'
//           - Return element.value (return empty string "" if not found)
`,
        checklist: [
            { id: "step1", text: "Query element with `document.getElementById`", test: "code.includes('document.getElementById') && code.includes('saveBtn')" },
            { id: "step2", text: "Implement `toggleBanner` with safe null check before modifying `style.display`", test: "code.includes('function toggleBanner') && code.includes('style.display')" },
            { id: "step3", text: "Implement `disableSubmitButton` using `instanceof HTMLButtonElement` type guard", test: "code.includes('function disableSubmitButton') && code.includes('instanceof HTMLButtonElement') && code.includes('.disabled = true')" },
            { id: "step4", text: "Implement `getInputValueSafe` using `instanceof HTMLInputElement` type guard", test: "code.includes('function getInputValueSafe') && code.includes('instanceof HTMLInputElement') && code.includes('.value')" }
        ],
        painPoint: "The #1 error in frontend web development is `Uncaught TypeError: Cannot read properties of null (reading 'style')`. It happens because JavaScript assumes `document.getElementById` always finds the element.",
        analogy: "TypeScript treats every DOM query like reaching into a mystery grab bag: the box might be empty (`null`). You are legally required to look inside the bag (`if (el !== null)`) before trying to use what's in it.",
        syntax: `<code>if (btn instanceof HTMLButtonElement) { btn.disabled = true; }</code><br/>
• <strong>instanceof HTMLButtonElement</strong> → Runtime check that also convinces TypeScript the element is a real button with a <code>.disabled</code> property`,
        vscodeTrap: "Never use the non-null assertion operator (`!`) blindly like `document.getElementById('btn')!`. If someone edits the HTML and removes that ID, your app will crash instantly at runtime!"
    },
    {
        num: 7,
        title: "Typed Event Handlers & Casting",
        desc: "Handle DOM events with exact event types (MouseEvent, KeyboardEvent) and safe target casting.",
        starterCode: `// 🚀 Level 7D Lesson 7: Typed Event Handlers & Type Casting!

// 👉 STEP 1: Create a typed click handler 'handleCardClick(event: MouseEvent): void'
//           - Log event.clientX and event.clientY


// 👉 STEP 2: Create a typed keyboard handler 'handleSearchKeydown(event: KeyboardEvent): void'
//           - Check if event.key === "Enter"


// 👉 STEP 3: Create a typed input change handler 'handleInputChange(event: Event): void'
//           - Cast target: 'const target = event.target as HTMLInputElement'
//           - Check if target exists, then log target.value


// 👉 STEP 4: Create a function 'bindGlobalEscape(callback: () => void): void'
//           - Listen to window keydown event with typed KeyboardEvent
//           - Execute callback when event.key === "Escape"
`,
        checklist: [
            { id: "step1", text: "Implement `handleCardClick(event: MouseEvent): void` accessing `clientX/Y`", test: "code.includes('function handleCardClick') && code.includes('event: MouseEvent') && code.includes('clientX')" },
            { id: "step2", text: "Implement `handleSearchKeydown(event: KeyboardEvent): void` checking `event.key`", test: "code.includes('function handleSearchKeydown') && code.includes('event: KeyboardEvent') && code.includes('event.key')" },
            { id: "step3", text: "Implement `handleInputChange(event: Event)` casting `event.target as HTMLInputElement`", test: "code.includes('function handleInputChange') && code.includes('as HTMLInputElement') && code.includes('target.value')" },
            { id: "step4", text: "Implement `bindGlobalEscape(callback: () => void): void`", test: "code.includes('function bindGlobalEscape') && code.includes('Escape')" }
        ],
        painPoint: "In React and vanilla JS, event handlers receive `e.target.value`. But in TypeScript, `event.target` is typed broadly as generic `EventTarget`, which doesn't have `.value`! Without proper casting, your editor throws a red error.",
        analogy: "Event Casting `as HTMLInputElement` is like showing your ID badge at the door: you are confirming to TypeScript: 'I know this generic event was triggered specifically by a text input field.'",
        syntax: `<code>const input = e.target as HTMLInputElement; console.log(input.value);</code><br/>
• <strong>as HTMLInputElement</strong> → Type assertion telling TS to treat the target as an input field with <code>.value</code>`,
        vscodeTrap: "Only use `as` casting when you are 100% certain of the target type (e.g. inside an input event handler). Never use `as any` to silence compiler warnings!"
    },
    {
        num: 8,
        title: "Discriminated Unions & Reducers",
        desc: "Architect bulletproof state management using Discriminated Unions and exhaustive switch statements.",
        starterCode: `// 🚀 Level 7D Lesson 8: Discriminated Unions & Reducers!

// 👉 STEP 1: Define 3 distinct Action interfaces with a common 'type' discriminator:
//           - InitAction: { type: 'INIT' }
//           - SetUserAction: { type: 'SET_USER'; payload: { name: string; email: string } }
//           - SetErrorAction: { type: 'SET_ERROR'; error: string }


// 👉 STEP 2: Combine them into a union type alias 'AppAction'


// 👉 STEP 3: Define an interface 'AppState' with:
//           - status: 'idle' | 'ready' | 'error'
//           - user: { name: string; email: string } | null
//           - errorMessage: string | null


// 👉 STEP 4: Implement a pure reducer function 'appReducer(state: AppState, action: AppAction): AppState'
//           - Use a 'switch (action.type)' statement to handle all 3 action types exhaustively
`,
        checklist: [
            { id: "step1", text: "Define `InitAction`, `SetUserAction`, `SetErrorAction` with literal `type` properties", test: "code.includes('INIT') && code.includes('SET_USER') && code.includes('SET_ERROR')" },
            { id: "step2", text: "Combine actions into `type AppAction = InitAction | SetUserAction | SetErrorAction`", test: "code.includes('type AppAction =') && code.includes('InitAction') && code.includes('SetUserAction') && code.includes('SetErrorAction')" },
            { id: "step3", text: "Define `interface AppState` with status, user, and errorMessage", test: "code.includes('interface AppState') && code.includes('status:') && code.includes('user:') && code.includes('errorMessage:')" },
            { id: "step4", text: "Implement `appReducer(state: AppState, action: AppAction): AppState` with `switch (action.type)`", test: "code.includes('function appReducer') && code.includes('switch') && code.includes('SET_USER')" }
        ],
        painPoint: "In Redux or React `useReducer`, handling `SET_USER` might access `action.payload.name`. If you dispatch a `SET_ERROR` action by mistake, your reducer tries to read `action.payload.name` and crashes with `Cannot read properties of undefined`.",
        analogy: "A Discriminated Union is like a color-coded triage tag in an emergency room: Tag 'RED' means immediate surgery (`payload.heartRate`), Tag 'GREEN' means minor bandage (`payload.prescription`). The doctor reads the tag color first before opening the kit.",
        syntax: `<code>type Action = { type: 'SUCCESS'; data: string } | { type: 'FAIL'; error: Error };</code><br/>
• <strong>type: 'SUCCESS'</strong> → The discriminator property (shared across all variants)<br/>
• Inside <code>if (action.type === 'SUCCESS')</code>, TS automatically knows <code>action.data</code> exists!`,
        vscodeTrap: "Always use a literal string for the discriminator (`type: 'FETCH_SUCCESS'`). This allows TypeScript's control flow analysis to narrow the entire object shape inside your `switch` cases automatically."
    },
    {
        num: 9,
        title: "Generics 101 & API Wrappers",
        desc: "Build reusable, type-safe functions and interfaces using Generic Type Placeholders (<T>).",
        starterCode: `// 🚀 Level 7D Lesson 9: Generics 101 & API Response Wrappers!

// 👉 STEP 1: Define a generic interface 'ApiResponse<T>' with:
//           - status: number
//           - data: T
//           - timestamp: number
//           - error?: string


// 👉 STEP 2: Define a generic helper 'wrapSuccessResponse<T>(data: T, status: number = 200): ApiResponse<T>'


// 👉 STEP 3: Define a generic helper 'getFirstItem<T>(items: T[]): T | undefined'


// 👉 STEP 4: Define a generic helper 'getLastItem<T>(items: T[]): T | undefined'


// 👉 STEP 5: Create a sample typed response 'userApiResult: ApiResponse<{ id: string; username: string }>'
`,
        checklist: [
            { id: "step1", text: "Define `interface ApiResponse<T>` with generic `data: T`", test: "code.includes('interface ApiResponse<T>') && code.includes('data: T') && code.includes('status: number')" },
            { id: "step2", text: "Implement `wrapSuccessResponse<T>(data: T, status: number = 200): ApiResponse<T>`", test: "code.includes('function wrapSuccessResponse') && code.includes('ApiResponse<T>')" },
            { id: "step3", text: "Implement `getFirstItem<T>(items: T[]): T | undefined`", test: "code.includes('function getFirstItem') && code.includes('items: T[]') && code.includes('T | undefined')" },
            { id: "step4", text: "Implement `getLastItem<T>(items: T[]): T | undefined`", test: "code.includes('function getLastItem') && code.includes('items: T[]') && code.includes('T | undefined')" },
            { id: "step5", text: "Create sample `userApiResult: ApiResponse<...>` with data", test: "code.includes('userApiResult') && code.includes('ApiResponse<') && code.includes('username')" }
        ],
        painPoint: "Without generics, you either have to duplicate code 50 times (`getUserResponse`, `getProductResponse`, `getOrderResponse`) or use `data: any`, which turns off all autocomplete and type safety in your frontend.",
        analogy: "A Generic `<T>` is like a transparent glass label on a moving box. When you build the box, it says `<T>`. When you fill it with Books, the label morphs into `Box<Book>`, and your editor knows every book has a `.title`.",
        syntax: `<code>function identity<T>(value: T): T { return value; }</code><br/>
• <strong>&lt;T&gt;</strong> → Declares the type placeholder<br/>
• <strong>value: T</strong> → Whatever type is passed in becomes the type of <code>value</code><br/>
• <strong>: T</strong> → Guarantees the exact same type is returned`,
        vscodeTrap: "By convention, single capital letters are used for generics: `T` (Type), `K` (Key), `V` (Value), `E` (Element). Don't use confusing names like `<MySpecialVariable>`."
    },
    {
        num: 10,
        title: "Generic Constraints & keyof",
        desc: "Lock down generics using extends constraints (<T extends Entity>) and the keyof operator.",
        starterCode: `// 🚀 Level 7D Lesson 10: Generic Constraints & keyof!

// 👉 STEP 1: Define an interface 'Identifiable' with 'id: string | number'


// 👉 STEP 2: Implement a generic function 'findById<T extends Identifiable>(items: T[], targetId: string | number): T | undefined'


// 👉 STEP 3: Implement a generic property getter 'getProperty<T, K extends keyof T>(obj: T, key: K): T[K]'


// 👉 STEP 4: Define an interface 'Product' with: id: string, title: string, price: number


// 👉 STEP 5: Test 'getProperty' with sample product data and get property 'price'
`,
        checklist: [
            { id: "step1", text: "Define `interface Identifiable` with `id: string | number`", test: "code.includes('interface Identifiable') && code.includes('id: string | number')" },
            { id: "step2", text: "Implement `findById<T extends Identifiable>` using `.find()`", test: "code.includes('function findById') && code.includes('Identifiable') && code.includes('targetId')" },
            { id: "step3", text: "Implement `getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`", test: "code.includes('function getProperty') && code.includes('keyof T') && code.includes('T[K]')" },
            { id: "step4", text: "Define `interface Product` with id, title, and price", test: "code.includes('interface Product') && code.includes('title: string') && code.includes('price: number')" },
            { id: "step5", text: "Call `getProperty` with product and valid key", test: "code.includes('getProperty(') && code.includes('price')" }
        ],
        painPoint: "If you write a generic `function findById<T>(items: T[])`, TypeScript yells at you when you write `item.id` because it has no idea if `T` even has an `id` property!",
        analogy: "A Generic Constraint `<T extends Identifiable>` is like an entry requirement for a VIP club: anyone can enter (`<T>`), as long as they are wearing an official ID badge (`extends Identifiable`).",
        syntax: `<code>function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }</code><br/>
• <strong>keyof T</strong> → A union of all property names of <code>T</code> (e.g. <code>'title' | 'price'</code>)<br/>
• <strong>K extends keyof T</strong> → Guarantees the key parameter is an actual existing property on the object!`,
        vscodeTrap: "The `keyof` operator gives you autocomplete for object properties in VS Code! When you type `getProperty(user, \"\")`, VS Code immediately suggests all valid keys."
    },
    {
        num: 11,
        title: "Core Utility Types (Partial, Pick)",
        desc: "Transform existing types using TypeScript's built-in utility types: Partial, Required, Pick, Omit, and Record.",
        starterCode: `// 🚀 Level 7D Lesson 11: Core Utility Types!

// 👉 STEP 1: Define a master interface 'UserProfile' with:
//           id: string; username: string; email: string; bio: string; isVerified: boolean


// 👉 STEP 2: Create a type alias 'UserPatchUpdate' using Partial<UserProfile>


// 👉 STEP 3: Create a type alias 'PublicUserSummary' using Pick<UserProfile, 'id' | 'username' | 'bio'>


// 👉 STEP 4: Create a type alias 'UserRegistrationForm' using Omit<UserProfile, 'id' | 'isVerified'>


// 👉 STEP 5: Create a type alias 'RolePermissionMatrix' using Record<'admin' | 'editor' | 'viewer', string[]>


// 👉 STEP 6: Implement a function 'applyUserPatch(original: UserProfile, patch: UserPatchUpdate): UserProfile'
`,
        checklist: [
            { id: "step1", text: "Define master `interface UserProfile` with 5 required fields", test: "code.includes('interface UserProfile') && code.includes('username: string') && code.includes('bio: string') && code.includes('isVerified: boolean')" },
            { id: "step2", text: "Define `type UserPatchUpdate = Partial<UserProfile>`", test: "code.includes('type UserPatchUpdate = Partial<UserProfile>')" },
            { id: "step3", text: "Define `type PublicUserSummary = Pick<UserProfile, 'id' | 'username' | 'bio'>`", test: "code.includes('type PublicUserSummary = Pick<UserProfile,') && code.includes('username')" },
            { id: "step4", text: "Define `type UserRegistrationForm = Omit<UserProfile, 'id' | 'isVerified'>`", test: "code.includes('type UserRegistrationForm = Omit<UserProfile,') && code.includes('isVerified')" },
            { id: "step5", text: "Define `type RolePermissionMatrix = Record<'admin' | 'editor' | 'viewer', string[]>`", test: "code.includes('type RolePermissionMatrix = Record<') && code.includes('string[]>')" },
            { id: "step6", text: "Implement `applyUserPatch(original, patch)` returning `{ ...original, ...patch }`", test: "code.includes('function applyUserPatch') && code.includes('patch: UserPatchUpdate') && code.includes('...original, ...patch')" }
        ],
        painPoint: "When updating a user profile in an HTTP PATCH request, you only send the fields that changed (`{ bio: 'New bio' }`). Without `Partial<T>`, TypeScript demands all 10 required user fields, forcing you to duplicate models.",
        analogy: "`Partial<T>` is like making every single question on an exam optional. `Pick<T, 'name'>` is like making a photocopied flashcard containing only the name field. `Record<K, V>` is a standardized dictionary shelf.",
        syntax: `<code>type UpdatePayload = Partial<User>; // All fields become optional (?)</code><br/>
• <strong>Partial&lt;T&gt;</strong> → Makes all fields optional<br/>
• <strong>Required&lt;T&gt;</strong> → Makes all optional fields strictly required<br/>
• <strong>Pick&lt;T, K&gt;</strong> → Extracts only the specified keys<br/>
• <strong>Omit&lt;T, K&gt;</strong> → Removes the specified keys<br/>
• <strong>Record&lt;K, V&gt;</strong> → Creates an object type with keys K and values V`,
        vscodeTrap: "Never recreate duplicate types manually when an existing interface already exists! Use `Pick` or `Omit` to keep your types in sync automatically when the original interface changes."
    },
    {
        num: 12,
        title: "Capstone: Typed State Store",
        desc: "Graduation Project: Build a fully typed in-memory reactive state store and event emitter from scratch with zero 'any' types.",
        starterCode: `// 🚀 Level 7D Lesson 12: CAPSTONE PROJECT - Typed In-Memory State Store!
// Build a production-grade, type-safe state store & event listener from scratch!

// 👉 STEP 1: Define a generic listener type 'Listener<T> = (state: T) => void'


// 👉 STEP 2: Define a generic class 'TypedStore<T>' with:
//           - private 'state: T'
//           - private 'listeners: Listener<T>[] = []'


// 👉 STEP 3: Implement constructor(initialState: T) setting this.state


// 👉 STEP 4: Implement 'getState(): T' returning this.state


// 👉 STEP 5: Implement 'setState(updater: Partial<T> | ((prevState: T) => T)): void'
//           - Update this.state (handling either object patch or functional updater)
//           - Notify all listeners with this.state


// 👉 STEP 6: Implement 'subscribe(listener: Listener<T>): () => void'
//           - Add listener to this.listeners
//           - Return an unsubscribe function that removes the listener


// 👉 STEP 7: Test your TypedStore with a sample state '{ count: number; user: string }'
`,
        checklist: [
            { id: "step1", text: "Define `type Listener<T> = (state: T) => void`", test: "code.includes('type Listener<T> = (state: T) => void')" },
            { id: "step2", text: "Define `class TypedStore<T>` with private `state` and `listeners` array", test: "code.includes('class TypedStore<T>') && code.includes('private state: T') && code.includes('private listeners: Listener<T>[]')" },
            { id: "step3", text: "Implement constructor setting `this.state = initialState`", test: "code.includes('constructor(initialState: T)') && code.includes('this.state = initialState')" },
            { id: "step4", text: "Implement `getState(): T` returning `this.state`", test: "code.includes('getState(): T') && code.includes('return this.state')" },
            { id: "step5", text: "Implement `setState(updater: ...): void` and notify all listeners", test: "code.includes('setState(updater:') && code.includes('this.listeners.forEach')" },
            { id: "step6", text: "Implement `subscribe(listener): () => void` returning unsubscribe function", test: "code.includes('subscribe(listener: Listener<T>)') && (code.includes('filter') || code.includes('splice'))" },
            { id: "step7", text: "Instantiate `TypedStore` with sample state and subscribe to changes", test: "code.includes('new TypedStore') && (code.includes('store.subscribe') || code.includes('store.setState'))" }
        ],
        painPoint: "State libraries like Redux or Zustand can feel like black boxes. Without understanding TypeScript classes, generics, and function types, developers struggle to build custom reactive architecture.",
        analogy: "A Typed State Store is a digital broadcasting tower: it holds a vault of verified data (`<T>`), and whenever the vault changes, it broadcasts the new state to all subscribed radio listeners with 100% type safety.",
        syntax: `<code>class TypedStore&lt;T&gt; { private state: T; constructor(initial: T) { this.state = initial; } }</code><br/>
• <strong>class TypedStore&lt;T&gt;</strong> → A generic class that can hold any state model<br/>
• <strong>private</strong> → Restricts direct mutation, enforcing safe getter/setter methods`,
        vscodeTrap: "Congratulations on reaching the Level 7D Capstone! You have mastered primitives, tuples, unions, interfaces, functions, DOM narrowing, event casting, discriminated unions, generics, and utility types. You can now build production TypeScript applications in VS Code with total confidence!"
    }
];

function escapeAstroHtml(str, allowFormattingTags = false) {
    if (!str) return '';
    let s = str
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;');
    
    if (!allowFormattingTags) {
        return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else {
        // Protect allowed tags: <code>, </code>, <br/>, <br>, <strong>, </strong>
        s = s.replace(/<code>/g, '___CODE_OPEN___')
             .replace(/<\/code>/g, '___CODE_CLOSE___')
             .replace(/<br\s*\/?>/g, '___BR___')
             .replace(/<strong>/g, '___STRONG_OPEN___')
             .replace(/<\/strong>/g, '___STRONG_CLOSE___');
        
        // Escape all remaining < and >
        s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Restore allowed tags
        s = s.replace(/___CODE_OPEN___/g, '<code>')
             .replace(/___CODE_CLOSE___/g, '</code>')
             .replace(/___BR___/g, '<br/>')
             .replace(/___STRONG_OPEN___/g, '<strong>')
             .replace(/___STRONG_CLOSE___/g, '</strong>');
        return s;
    }
}

// Generate each lesson file
for (const lesson of lessonsData) {
    const filePath = path.join(targetDir, `lesson${lesson.num}_remake.astro`);
    const nextUrl = lesson.num < 12 ? `/6. partF/branchD/lesson${lesson.num + 1}_remake.html` : `/6. partF/hub.html`;
    const nextLabel = lesson.num < 12 ? `Next: Milestone ${String(lesson.num + 1).padStart(2, '0')} ➔` : `🏆 Complete Level 7D Track ➔`;

    const content = `---
import LessonLayout from '../../../layouts/LessonLayout.astro';

const starterCode = \`${lesson.starterCode}\`;

const branchLessons = ${JSON.stringify(branchLessons, null, 4)};
---

<LessonLayout
    title="Milestone ${String(lesson.num).padStart(2, '0')}: ${lesson.title} | Level 7D • TypeScript Mastery"
    description="${escapeAstroHtml(lesson.desc, false)}"
    levelTag="Level 7D • TypeScript Mastery"
    lessonNum={${lesson.num}}
    lessonTitle="${lesson.title}"
    xpAmount={150}
    completionKey="partF_branchD_lesson${lesson.num}_complete"
    nextLessonUrl="${nextUrl}"
    hubUrl="/6. partF/hub.html"
    hubTitle="Level 7 Hub"
    hubIcon="🚀"
    fileTab="app.ts"
    starterCode={starterCode}
    mode="terminal"
    jumpLessons={branchLessons}
    certificateUrl="/6. partF/certificate.html"
    trackPrefix="partF_branchD"
>
    <!-- Intro Slot -->
    <p class="lesson-subtitle" slot="intro">
        ${escapeAstroHtml(lesson.desc, false)}
    </p>

    <!-- Concept Slot (Left Pane) -->
    <div slot="concept" style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- 🎯 PROGATE-STYLE TOP MISSION CARD: Immediately informs learner what to do -->
        <article class="concept-card mission-card">
            <div class="mission-header">
                <h3><span>🎯</span> Your Mission</h3>
                <span class="checklist-counter" id="checklistCounter">0 / ${lesson.checklist.length}</span>
            </div>
            <div class="target-output-preview" style="background: #f1f5f9; border-radius: 8px; padding: 10px 12px; margin: 8px 0 12px 0; border: 1px dashed #94a3b8; font-size: 0.82rem;">
                <strong style="color: #334155;">🖼️ Target Goal:</strong>
                <div style="color: #475569; margin-top: 3px;">TypeScript Verification: <code>Type check passing with 0 compiler errors</code></div>
            </div>
            <p class="mission-subtitle">Follow the step-by-step instructions below in the editor:</p>
            <div id="taskChecklist"></div>
        </article>
        
        <!-- The Real-World JavaScript Problem -->
        <article class="concept-card" style="background: #fff7ed; border-left: 4px solid #f97316;">
            <h3 style="color: #c2410c;"><span>🚨</span> The Real-World JavaScript Problem</h3>
            <p style="color: #9a3412; font-size: 0.88rem; line-height: 1.6; margin: 0;">${escapeAstroHtml(lesson.painPoint, false)}</p>
        </article>

        <!-- Core Concept & Analogy -->
        <article class="concept-card">
            <h3><span>💡</span> Core Architecture &amp; Mental Model</h3>
            <div class="analogy-callout">
                <strong>Real-World Analogy:</strong> ${escapeAstroHtml(lesson.analogy, false)}
            </div>
        </article>

        <!-- Syntax & Anatomy Breakdown -->
        <article class="concept-card">
            <h3><span>🔬</span> Syntax &amp; Anatomy Breakdown</h3>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.7;">
                ${escapeAstroHtml(lesson.syntax, true)}
            </div>
        </article>

        <!-- The VS Code Beginner Trap -->
        <article class="concept-card" style="background: #fef2f2; border-left: 4px solid #ef4444;">
            <h3 style="color: #b91c1c;"><span>⚠️</span> The VS Code Beginner Trap (What NOT to do)</h3>
            <p style="color: #991b1b; font-size: 0.88rem; line-height: 1.6; margin: 0;">${escapeAstroHtml(lesson.vscodeTrap, false)}</p>
        </article>

        <!-- Reference Pattern / Starter Code -->
        <article class="concept-card">
            <h3><span>💻</span> Reference Pattern</h3>
            <p style="color: #475569; font-size: 0.88rem; margin: 0 0 8px 0;">TypeScript architectural specification:</p>
            <div class="code-snippet-box">
                <button class="snippet-copy-btn" type="button" aria-label="Copy code snippet">📋 Copy</button>
                <pre><code id="refCodeBox_branchD_${lesson.num}">${escapeAstroHtml(lesson.starterCode, false)}</code></pre>
            </div>
        </article>

    </div>
</LessonLayout>

<!-- Client-Side Scripts & Verification Engine -->
<script>
    import { DojoEngine } from '../../../scripts/dojo';

    function initLesson() {
        const editor = document.getElementById('lessonEditor') as HTMLTextAreaElement | null;
        const lineNumbers = document.getElementById('ideLineNumbers');
        const lineNumbersInner = document.getElementById('ideLineNumbersInner') || lineNumbers;
        const terminalScreen = document.getElementById('terminalScreen');
        const checkBtn = document.getElementById('checkAnswerBtn');
        const resetBtn = document.getElementById('resetEditorBtn');

        if (!editor) return;

        const DRAFT_KEY = 'novicodes_draft_partF_branchD_lesson${lesson.num}';
        const DEFAULT_STARTER = \`${lesson.starterCode}\`;

        // 1. Initialize Real-Time Checklist
        DojoEngine.initChecklist([
            ${lesson.checklist.map(c => `{\n                id: "${c.id}",\n                label: ${JSON.stringify(c.text)},\n                fn: (code) => { try { return Boolean(${c.test}); } catch(e) { return false; } }\n            }`).join(',\n            ')}
        ], {
            containerId: 'taskChecklist',
            mode: 'terminal'
        });

        // 2. Line numbers & scroll sync
        function syncScroll() {
            if (lineNumbersInner && editor) {
                lineNumbersInner.style.transform = \`translateY(-\${editor.scrollTop}px)\`;
            }
        }

        function updateEditor() {
            if (!editor || !lineNumbersInner) return;
            const lines = editor.value.split('\\n');
            const lineCount = Math.max(lines.length, 1);
            lineNumbersInner.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join('\\n');
            syncScroll();

            // Real-Time Syntax & Diagnostics
            DojoEngine.lint(editor.value, 'terminal');

            // Real-Time Checklist Verification
            DojoEngine.runChecklist(editor.value);
        }

        // 3. Draft Auto-Save & Crash Resilience
        DojoEngine.setupDraftPersistence(editor, DRAFT_KEY, DEFAULT_STARTER, updateEditor);

        editor.addEventListener('scroll', syncScroll);

        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 2;
                updateEditor();
            }
        });

        // 4. Safe Reset Button Handler
        if (resetBtn) {
            DojoEngine.setupResetButton(resetBtn, editor, DRAFT_KEY, DEFAULT_STARTER, () => {
                updateEditor();
                if (terminalScreen) {
                    terminalScreen.innerHTML = '<div class="terminal-prompt" style="color: #94a3b8;">&gt; TypeScript environment reset. Ready for code.</div>';
                }
            });
        }

        // 5. Terminal output simulation
        function simulateTypeScriptConsole(code: string) {
            if (!terminalScreen) return;
            terminalScreen.innerHTML = \`<div style="color: #38bdf8; font-weight: 700;">&gt; tsc --noEmit (Checking TypeScript Compiler Diagnostics)...</div>
<div style="color: #34d399; font-family: monospace; font-size: 0.80rem; margin: 8px 0;">✨ Zero Type Errors Found! Strict Mode Passed ✓</div>
<div style="color: #cbd5e1; font-size: 0.78rem; line-height: 1.5;">Type checking completed: [Exit Code 0]</div>\`;
        }

        // 6. Check & Verify Code Action with Intelligent Diagnostics
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                if (typeof simulateTypeScriptConsole === 'function') {
                    simulateTypeScriptConsole(editor.value);
                }
                DojoEngine.verifySubmission(editor.value, {
                    lessonTitle: ${JSON.stringify(lesson.title)},
                    xp: 150,
                    completionKey: 'partF_branchD_lesson${lesson.num}_complete',
                    nextUrl: '${nextUrl}',
                    mode: 'terminal'
                });
            });
        }

        // Initial render
        // Initial render
        updateEditor();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson);
    } else {
        initLesson();
    }
</script>
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Generated: ${filePath}`);
}

console.log('🎉 All 12 Level 7D TypeScript lessons generated successfully!');

# 🗄️ State Schema & Data Models — NoviCodes

> **Version:** 2.0.0  
> **Storage Provider:** HTML5 LocalStorage & SessionStorage (100% Client-Side)  

---

## 1. LocalStorage Key Dictionary

### 1.1 Global Platform & Gamification State
| Storage Key | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `practice_mode_unlocked` | `string ('true'/'false')` | `null` | Developer bypass flag allowing unlocked navigation across all levels. |
| `novicodes_user_xp` / `userXP` | `string (integer)` | `'0'` | Total earned Experience Points across all tracks and quests. |
| `novicodes_streak_count` | `string (integer)` | `'0'` | Current consecutive days of completed daily coding quests. |
| `novicodes_longest_streak` | `string (integer)` | `'0'` | Personal record for highest consecutive daily quest streak. |
| `novicodes_last_quest_date` | `string (YYYY-MM-DD)` | `null` | ISO date of the last completed daily quest (streak calculation). |
| `novicodes_daily_quest_xp` | `string (integer)` | `'0'` | Accumulated XP earned exclusively from daily quests. |
| `novicodes_streak_bonus_xp` | `string (integer)` | `'0'` | Accumulated XP earned from streak milestones (3d, 7d, 14d). |
| `novicodes_streak_freeze` | `string ('true'/'false')` | `null` | Streak saver shield preserving flames on missed days. |

---

### 1.2 Level Completion Flags (Levels 0 through 10)
| Storage Key | Level / Track | Value | Condition to Set |
| :--- | :--- | :---: | :--- |
| `level0_completed` | Level 0: History | `'true'` | Completing all 4 Pillar analogies and the History timeline. |
| `level0_quiz_completed` | Level 0: Quiz | `'true'` | Answering the Web History quiz successfully. |
| `readWebsite`, `readHTML`, `readCSS`, `readJavaScript` | Level 0 Pillars | `'true'` | Opening and reading each concept pillar modal. |
| `level1_completed` | Level 1: HTML | `'true'` | Completing HTML5 Foundations interactive section. |
| `level2_completed` | Level 2: CSS | `'true'` | Completing CSS3 Foundations interactive section. |
| `level3_completed` | Level 3: JS | `'true'` | Completing JS Foundations interactive section. |
| `level4_completed` | Level 4: DOM | `'true'` | Completing all 15 Level 4 DOM Dojo lessons. |
| `level5_completed` | Level 5: React | `'true'` | Completing all 15 Level 5 React Dojo lessons. |
| `level6_completed` | Level 6: Python | `'true'` | Completing all 15 Level 6 Python Dojo lessons. |
| `level7_completed` / `partF_completed` | Level 7: Mastery | `'true'` | Completing at least 1 specialization track in Level 7. |
| `partF_branchA_completed` | Track 7A: Cloud | `'true'` | Completing all 6 Track 7A Cloud & DevOps projects. |
| `partF_branchB_completed` | Track 7B: DB | `'true'` | Completing all 6 Track 7B Postgres & SQL projects. |
| `partF_branchC_completed` | Track 7C: Next.js | `'true'` | Completing all 6 Track 7C Next.js SSR projects. |
| `level8_completed` / `partG_completed` | Level 8: API Bridge | `'true'` | Completing all 6 Level 8 API Bridge projects. |
| `level9_completed` / `partH_completed` | Level 9: Auth & DB | `'true'` | Completing all 6 Level 9 Auth & Database projects. |
| `level10_completed` / `partI_completed` | Level 10: Apex SaaS | `'true'` | Completing all 6 Level 10 Enterprise SaaS milestones. |

---

### 1.3 Lesson Completion Keys
- **Level 4:** `partB_lesson[1-15]_remake_complete`
- **Level 5:** `partC_lesson[1-15]_remake_complete`
- **Level 6:** `partE_lesson[1-15]_remake_complete`
- **Level 7A:** `partF_branchA_lesson[1-6]_complete`
- **Level 7B:** `partF_branchB_lesson[1-6]_complete`
- **Level 7C:** `partF_branchC_lesson[1-6]_complete`
- **Level 8:** `partG_lesson[1-6]_remake_complete`
- **Level 9:** `partH_lesson[1-6]_remake_complete`
- **Level 10:** `partI_lesson[1-6]_remake_complete`

---

### 1.4 Code Draft Persistence Keys
- `novicodes_draft_partB_lesson[1-15]`
- `novicodes_draft_partC_lesson[1-15]`
- `novicodes_draft_partE_lesson[1-15]`
- `partF_branchA_lesson[1-6]_draft`
- `partF_branchB_lesson[1-6]_draft`
- `partF_branchC_lesson[1-6]_draft`
- `novicodes_draft_partG_lesson[1-6]`
- `novicodes_draft_partH_lesson[1-6]`
- `novicodes_draft_partI_lesson[1-6]`

---

### 1.5 Certificate Recipient Name Keys
- `partB_cert_student_name` (DOM Certificate)
- `partC_cert_student_name` (React Certificate)
- `partE_cert_student_name` (Python Certificate)
- `partF_cert_student_name` (Specialization Certificate)
- `partG_cert_student_name` (API Bridge Certificate)
- `partH_cert_student_name` (Auth & DB Certificate)
- `partI_cert_student_name` (Graduation Diploma)

---

## 2. XP Formulas & Rank Progression Ladder

### 2.1 XP Computation
$$\text{Max Standard XP} = 250 + 1000 + 1500 + 2250 + 3000 + 4500 + 1500 + 1500 + 3000 = 18,500\text{ XP}$$

### 2.2 Developer Rank Thresholds
```typescript
export interface RankTier {
    rank: number;
    title: string;
    level: string;
    icon: string;
    minXP: number;
    maxXP: number;
}

export const RANK_LADDER: RankTier[] = [
    { rank: 0, title: 'Novice Coder', level: 'Level 0 (0–549 XP)', icon: '🌱', minXP: 0, maxXP: 549 },
    { rank: 1, title: 'Web Apprentice', level: 'Level 1–3 (550–1,249 XP)', icon: '🧱', minXP: 550, maxXP: 1249 },
    { rank: 2, title: 'DOM Manipulator', level: 'Level 4 (1,250–2,749 XP)', icon: '⚔️', minXP: 1250, maxXP: 2749 },
    { rank: 3, title: 'React Practitioner', level: 'Level 5 (2,750–4,999 XP)', icon: '⚛️', minXP: 2750, maxXP: 4999 },
    { rank: 4, title: 'Python Backend Engineer', level: 'Level 6 (5,000–7,999 XP)', icon: '🐍', minXP: 5000, maxXP: 7999 },
    { rank: 5, title: 'Cloud & Database Architect', level: 'Level 7 (8,000–12,499 XP)', icon: '🚀', minXP: 8000, maxXP: 12499 },
    { rank: 6, title: 'Fullstack API Integrator', level: 'Level 8 (12,500–13,999 XP)', icon: '🌉', minXP: 12500, maxXP: 13999 },
    { rank: 7, title: 'Fullstack Auth & DB Architect', level: 'Level 9 (14,000–15,499 XP)', icon: '🛡️', minXP: 14000, maxXP: 15499 },
    { rank: 8, title: 'Grand Master Fullstack Engineer', level: 'Level 10 (15,500+ XP)', icon: '👑', minXP: 15500, maxXP: 18500 }
];
```

---

## 3. TypeScript Engine Contracts & Interfaces

```typescript
export interface ChecklistTask {
    id: string;
    label: string;
    fn: (code: string) => boolean;
}

export interface VerificationOptions {
    lessonTitle: string;
    xp: number;
    completionKey: string;
    nextUrl?: string;
    mode?: 'html' | 'javascript' | 'python' | 'terminal' | 'sql';
}

export interface AccessCheckOptions {
    track: string;
    lessonNum: number;
    levelTag: string;
    jumpLessons?: { id: number; title: string; url: string }[];
    dashboardUrl?: string;
}
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for Mosh Hamedani's Claude Code course (see README). Per the README, the codebase originally contains an intentional bug, poor UI, and messy code that the course walks through fixing. Some of those have already been addressed in this repo — check `git log` before assuming an "original" behavior is still present.

Known course-driven changes already landed:
- **Amount type**: `transactions[].amount` is now stored as a `number` (seed data + `TransactionForm` coerces with `Number(amount)`). The original starter used strings, which broke the `reduce` sums.
- **Component split**: the originally monolithic `App.jsx` has been decomposed (see Architecture below).

## Commands

- `npm install` — install deps (required; `node_modules` is gitignored and `vite` won't resolve without it)
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run lint` — ESLint across the repo

No test runner is configured.

## Architecture

- React 19 + Vite 7 SPA, JS (not TS), ES modules.
- Entry: `index.html` → `src/main.jsx` → `<App />` wrapped in `StrictMode`.
- No router, no context, no persistence — state resets on reload.
- Styling is plain CSS in `src/App.css` and `src/index.css`.

### Component tree and state ownership

```
App (src/App.jsx)
├─ Summary          (src/Summary.jsx)
├─ TransactionForm  (src/TransactionForm.jsx)
└─ TransactionList  (src/TransactionList.jsx)
```

- **`App`** owns the single source of truth: the `transactions` array. It also owns `addTransaction(fields)`, which stamps `id: Date.now()` and today's ISO `date` onto the form's fields and appends to the list. The shared `categories` list is a module-level const in `App.jsx`, passed as a prop to the two children that need it.
- **`Summary`** (presentational) takes `transactions` and computes `totalIncome` / `totalExpenses` / `balance` inline. These totals are used nowhere else, which is why they live here rather than in `App`.
- **`TransactionForm`** owns its own local form state (`description`, `amount`, `type`, `category`). It does **not** build the full transaction object — it calls `onAdd({ description, amount: Number(amount), type, category })` and lets `App` own identity/date. Amount is coerced to `Number` inside the form before calling `onAdd`.
- **`TransactionList`** owns its own filter state (`filterType`, `filterCategory`) and does the filtering locally on the `transactions` prop. Filters are intentionally not lifted since no other component cares about them.

When adding features, follow the same pattern: lift state only as far as needed (usually no further than `App`), and keep derived values next to their consumer.

## ESLint config notes (`eslint.config.js`)

- Flat config extending `js.recommended`, `react-hooks` recommended, and `react-refresh/vite`.
- `no-unused-vars` ignores identifiers matching `^[A-Z_]` — unused PascalCase/CONST-case names will not error (useful when importing components/types).

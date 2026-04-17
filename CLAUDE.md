# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for Mosh Hamedani's Claude Code course (see README). Per the README, the codebase **intentionally** contains a bug, poor UI, and messy code — these are the teaching material, not defects to silently clean up. Do not refactor broadly or "fix" style/structure unless the user asks.

A notable intentional bug: `transactions[].amount` is stored as a string (see seed data in `src/App.jsx`), so the `reduce((sum, t) => sum + t.amount, 0)` calls for `totalIncome` / `totalExpenses` concatenate instead of summing.

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
- Everything lives in `src/App.jsx`: seed transactions, all `useState` hooks (form fields, filters), derived totals, filter logic, submit handler, and the full JSX. There are no child components, no context, no router, no persistence — state resets on reload.
- Styling is plain CSS in `src/App.css` and `src/index.css`.

## ESLint config notes (`eslint.config.js`)

- Flat config extending `js.recommended`, `react-hooks` recommended, and `react-refresh/vite`.
- `no-unused-vars` ignores identifiers matching `^[A-Z_]` — unused PascalCase/CONST-case names will not error (useful when importing components/types).

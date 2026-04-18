---
name: Project Conventions
description: Key architectural patterns, stack details, and known data issues in the expense-tracker-starter
type: project
---

React 19 + Vite 7 SPA, plain JS (no TypeScript), no tests, no router, no persistence. State resets on reload.

**State ownership rule (from CLAUDE.md):** Lift state only as far as needed. `App` owns `transactions[]`. Derived values live next to their consumer (e.g., totals in `Summary`, filter state in `TransactionList`). `SpendingByCategory` correctly follows this — it derives `totalsByCategory` and `data` locally from the `transactions` prop.

**Amount type:** Stored as `number` (was `string` in original starter — bug was fixed). `TransactionForm` coerces with `Number(amount)` before calling `onAdd`.

**Known seed data bug (as of commit 5b8e341):** Transaction id=4 ("Freelance Work") is marked `type: "income"` in description but `type: "expense"` in the data — it is classified as an expense in the `salary` category. This is a pre-existing bug, not introduced by the redesign, but worth noting.

**CSS split:** Global tokens and resets in `src/index.css`; component/layout styles in `src/App.css`. The redesign added CSS custom properties (design tokens) to `:root` in `index.css`.

**Why:** Useful context for future reviews so conventions don't get questioned unnecessarily.

**How to apply:** When reviewing new components, check that derived values are local, not lifted into App. When reviewing amounts, verify number coercion is present.

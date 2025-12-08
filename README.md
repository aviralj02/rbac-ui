# 🛡️ rbac-ui

### Resource-Based Access Control for Modern Frontend Apps

A lightweight, tree-based, zero-dependency RBAC framework for frontend applications — with:

- **Fast tree-based permission evaluation**
- **Intuitive permission grammar** (`ui:dashboard:checklist`)
- **Nested hierarchical permissions**
- **Negation rules** (`!ui:settings`)
- **React bindings** (`AccessProvider`, `useAccess`, `AccessGate`, `useGuard`, etc.)
- **Backend-agnostic design**

Built for frontend teams who want **predictable**, **explicit**, and **flexible** access control.

---

## 🚀 Features

### 🔹 Smart Permission Grammar

- `ui:dashboard` → grants access
- `ui:dashboard:reports` → nested access
- `!ui:dashboard:checklist` → deny child
- `"*"` → wildcard top-level access

### 🔹 Tree-Based Permission Engine

- Permissions compile into a **static permission tree**
- No repeated looping over role strings
- Ultra-fast access checks (`O(depth)`)

---

## 💠 React Integration

- `<AccessProvider />` — context + RBAC instance
- `useAccess()` — low-level RBAC hook
- `useHasAccess()` — direct boolean helper
- `useAccessList()` — batch permission evaluation
- `useGuard()` — protect actions & handlers
- `<AccessGate />` — conditional UI
- `withAccess()` — HOC for component-level access

## 📦 Installation

```bash
npm install @rbac-ui/react
# or
yarn add @rbac-ui/react
# or
pnpm add @rbac-ui/react
```

---

## ⚒️ Best Practices

Always validate permissions on the backend too.

Use enums/constants in your frontend:

```typescript
export const PERMS = {
  DASHBOARD: "ui:dashboard",
  CHECKLIST: "ui:dashboard:checklist",
};
```

Store roles however you want (DB, JWT, API).

The framework only needs a `Array<string>`.

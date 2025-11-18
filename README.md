# 🛡️ RBAC Framework

### Resource-Based Access Control for Modern Frontend Apps

A lightweight, tree-based, zero-dependency RBAC framework for React applications — with:

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

### 🔹 React Integration

- `<AccessProvider />` — context + RBAC instance
- `useAccess()` — low-level RBAC hook
- `useHasAccess()` — direct boolean helper
- `useAccessList()` — batch permission evaluation
- `useGuard()` — protect actions & handlers
- `<AccessGate />` — conditional UI
- `withAccess()` — HOC for component-level access

---

# 📦 Installation

```bash
npm install @rbac/react
# or
yarn add @rbac/react
# or
pnpm add @rbac/react
```

## @rbac-ui/react

This package provides **React bindings** on top of the RBAC core engine and lets you control:

- UI visibility
- Feature access
- Action execution
- Component-level permissions

### 📦 Installation

```bash
npm install @rbac-ui/react
# or
yarn add @rbac-ui/react
# or
pnpm add @rbac-ui/react
```

### 🚀 Quick Start

1️⃣ Wrap your app with `<AccessProvider />`

```tsx
import { AccessProvider } from "@rbac-ui/react";

const roles = ["ui:dashboard", "!ui:dashboard:checklist", "ui:settings"];

export function App() {
  return (
    <AccessProvider roles={roles}>
      <YourApp />
    </AccessProvider>
  );
}
```

2️⃣ Use permissions anywhere

```tsx
import { useAccess } from "@rbac-ui/react";

const Dashboard = () => {
  const { hasAccess } = useAccess();

  return (
    <>
      {hasAccess("ui:dashboard") && <DashboardUI />}
      {hasAccess("ui:dashboard:checklist") && <Checklist />}
    </>
  );
};
```

### 🧩 API Reference

#### ✅ `<AccessProvider />`

Creates and provides the RBAC instance to your React app.

```tsx
<AccessProvider roles={Array<string>}>{children}</AccessProvider>
```

| Prop       | Type            | Required |
| ---------- | --------------- | -------- |
| `roles`    | `Array<string>` | ✅       |
| `children` | `ReactNode`     | ✅       |

<br />

#### ✅ `useAccess()`

Low-level hook that exposes the RBAC engine

```tsx
const { hasAccess } = useAccess();
```

```tsx
hasAccess(resource: string): boolean
```

<br />

#### ✅ `useHasAccess(resource)`

Optimized helper that returns a boolean directly.

```tsx
const allowed = useHasAccess("ui:dashboard");
```

<br />

#### ✅ `useAccessList(resources, mode)`

Batch permission checker.

```tsx
const allowed = useAccessList(["ui:dashboard", "ui:settings"], "all");
```

Modes:

- "any" → at least one must pass

- "all" → all must pass

<br />

#### ✅ `<AccessGate />`

Declarative UI gating component.

```tsx
<AccessGate resource="ui:dashboard" fallback={<NoAccess />}>
  <Dashboard />
</AccessGate>
```

Multiple resources:

```tsx
<AccessGate resource={["post:edit", "post:delete"]} mode="any">
  <ActionButtons />
</AccessGate>
```

| Prop       | Type        |                |
| ---------- | ----------- | -------------- |
| `resource` | `string     | Array<string>` |
| `mode`     | `"any"      | "all"`         |
| `fallback` | `ReactNode` |                |
| `children` | `ReactNode` |                |

- If resource is an array → mode is required
- If resource is a string → mode is optional

#### ✅ `withAccess(Component, resource, config?)`

Higher Order Component for access-protected components.

```tsx
function Dashboard(props: {}) {
  return <div>Dashboard</div>;
}

export default withAccess(Dashboard, "ui:dashboard:view");

// With custom fallback
export const ProtectedDashboard = withAccess(Dashboard, "ui:dashboard:view", {
  fallback: <p>You do not have access to the dashboard.</p>,
});
```

Multiple permissions:

```tsx
function AdminPanel() {
  return <div>Admin Panel</div>;
}

export default withAccess(AdminPanel, ["ui:admin:view", "ui:admin:edit"], {
  mode: "all",
  fallback: <p>Admins only.</p>,
});
```

#### ✅ `useGuard(resource(s), fn, config?)`

Protects functions and handlers, not just UI.

```tsx
const guard = useGuard();

const deleteUser = guard("user:delete", async (id) => api.deleteUser(id), {
  onAllow: () => console.log("Allowed"),
  onDeny: () => toast.error("Not allowed"),
});
```

| Parameter  | Type                      | Description                                |
| ---------- | ------------------------- | ------------------------------------------ |
| `resource` | `string \| Array<string>` | Permission(s) required to run the function |
| `fn`       | `(...args: any[]) => any` | Function to protect                        |
| `config`   | `GuardConfig`             | Optional behavior configuration            |

##### ⚙️ `GuardConfig` Options:

| Property  | Type             | Default     | Description                                     |
| --------- | ---------------- | ----------- | ----------------------------------------------- |
| `mode`    | `"any" \| "all"` | `"any"`     | How multiple resources are evaluated            |
| `onAllow` | `() => void`     | `undefined` | Runs **before** the protected function executes |
| `onDeny`  | `() => void`     | `undefined` | Runs when access is denied                      |

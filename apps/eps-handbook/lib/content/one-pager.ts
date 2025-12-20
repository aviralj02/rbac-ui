import type { DocSection } from "@/lib/content/types";
import { bullets, codeBlock, paragraphs } from "@/lib/content/types";

export const onePagerSections: DocSection[] = [
  {
    title: "rbac-ui",
    blocks: [
      paragraphs(
        "Resource-Based Access Control for modern frontend apps.",
        "A lightweight, tree-based, zero-dependency RBAC framework for frontend applications: predictable, explicit, and flexible access control."
      ),
      bullets(
        "Fast tree-based permission evaluation.",
        "Intuitive permission grammar like `ui:dashboard:checklist`.",
        "Nested hierarchical permissions.",
        "Negation rules like `!ui:settings`.",
        "React bindings: `AccessProvider`, `useAccess`, `AccessGate`, `useGuard`, and more.",
        "Backend-agnostic design."
      ),
    ],
  },
  {
    title: "Features",
    blocks: [
      bullets(
        "Smart permission grammar.",
        "Tree-based permission engine with `O(depth)` checks.",
        "React integration primitives (provider, hooks, gates, and guards)."
      ),
    ],
  },
  {
    title: "Smart Permission Grammar",
    blocks: [
      bullets(
        "`ui:dashboard` grants access.",
        "`ui:dashboard:reports` grants nested access.",
        "`!ui:dashboard:checklist` denies a child path.",
        "`*` can represent wildcard top-level access (if you enable it)."
      ),
    ],
  },
  {
    title: "Tree-Based Permission Engine",
    blocks: [
      bullets(
        "Permissions compile into a static permission tree.",
        "No repeated looping over role strings.",
        "Ultra-fast access checks with complexity proportional to depth (`O(depth)`)."
      ),
    ],
  },
  {
    title: "React Integration",
    blocks: [
      bullets(
        "`<AccessProvider />` provides context and an RBAC instance.",
        "`useAccess()` is the low-level RBAC hook.",
        "`useHasAccess()` is a direct boolean helper.",
        "`useAccessList()` batch evaluates permissions.",
        "`useGuard()` protects actions and handlers.",
        "`<AccessGate />` conditionally renders UI.",
        "`withAccess()` is an HOC for component-level access."
      ),
    ],
  },
  {
    title: "@rbac-ui/react",
    blocks: [
      paragraphs(
        "This package provides React bindings on top of the RBAC core engine and lets you control UI visibility, feature access, action execution, and component-level permissions."
      ),
    ],
  },
  {
    title: "Installation",
    blocks: [
      codeBlock(
        [
          "npm install @rbac-ui/react",
          "# or",
          "yarn add @rbac-ui/react",
          "# or",
          "pnpm add @rbac-ui/react",
        ].join("\n")
      ),
    ],
  },
  {
    title: "Quick Start",
    blocks: [
      paragraphs("1) Wrap your app with `<AccessProvider />`:"),
      codeBlock(
        [
          'import { AccessProvider } from "@rbac-ui/react";',
          "",
          'const roles = ["ui:dashboard", "!ui:dashboard:checklist", "ui:settings"];',
          "",
          "export function App() {",
          "  return (",
          "    <AccessProvider roles={roles}>",
          "      <YourApp />",
          "    </AccessProvider>",
          "  );",
          "}",
        ].join("\n")
      ),
      paragraphs("2) Use permissions anywhere:"),
      codeBlock(
        [
          'import { useAccess } from "@rbac-ui/react";',
          "",
          "const Dashboard = () => {",
          "  const { hasAccess } = useAccess();",
          "",
          "  return (",
          "    <>",
          '      {hasAccess("ui:dashboard") && <DashboardUI />}',
          '      {hasAccess("ui:dashboard:checklist") && <Checklist />}',
          "    </>",
          "  );",
          "};",
        ].join("\n")
      ),
    ],
  },
  {
    title: "API Reference",
    blocks: [
      paragraphs("`<AccessProvider />`"),
      paragraphs("Creates and provides the RBAC instance to your React app."),
      codeBlock(
        [
          "<AccessProvider roles={Array<string>}>{children}</AccessProvider>",
        ].join("\n")
      ),
      bullets(
        "Props: `roles: Array<string>` (required).",
        "Props: `children: ReactNode` (required)."
      ),
      paragraphs("`useAccess()`"),
      paragraphs("Low-level hook that exposes the RBAC engine."),
      codeBlock(
        [
          "const { hasAccess } = useAccess();",
          "",
          "hasAccess(resource: string): boolean",
        ].join("\n")
      ),
      paragraphs("`useHasAccess(resource)`"),
      paragraphs("Optimized helper that returns a boolean directly."),
      codeBlock(['const allowed = useHasAccess("ui:dashboard");'].join("\n")),
      paragraphs("`useAccessList(resources, mode)`"),
      paragraphs("Batch permission checker."),
      codeBlock(
        [
          'const allowed = useAccessList(["ui:dashboard", "ui:settings"], "all");',
        ].join("\n")
      ),
      bullets(
        'Modes: `"any"` → at least one must pass.',
        'Modes: `"all"` → all must pass.'
      ),
      paragraphs("`<AccessGate />`"),
      paragraphs("Declarative UI gating component."),
      codeBlock(
        [
          '<AccessGate resource="ui:dashboard" fallback={<NoAccess />}>',
          "  <Dashboard />",
          "</AccessGate>",
          "",
          '<AccessGate resource={["post:edit", "post:delete"]} mode="any">',
          "  <ActionButtons />",
          "</AccessGate>",
        ].join("\n")
      ),
      bullets(
        "Props: `resource: string | Array<string>`.",
        'Props: `mode: "any" | "all"` (required when `resource` is an array).',
        "Props: `fallback: ReactNode` (optional).",
        "Props: `children: ReactNode`."
      ),
      paragraphs("`withAccess(Component, resource, config?)`"),
      paragraphs("Higher Order Component for access-protected components."),
      codeBlock(
        [
          "function Dashboard(props: {}) {",
          "  return <div>Dashboard</div>;",
          "}",
          "",
          'export default withAccess(Dashboard, "ui:dashboard:view");',
          "",
          "// With custom fallback",
          'export const ProtectedDashboard = withAccess(Dashboard, "ui:dashboard:view", {',
          "  fallback: <p>You do not have access to the dashboard.</p>,",
          "});",
          "",
          "function AdminPanel() {",
          "  return <div>Admin Panel</div>;",
          "}",
          "",
          'export default withAccess(AdminPanel, ["ui:admin:view", "ui:admin:edit"], {',
          '  mode: "all",',
          "  fallback: <p>Admins only.</p>,",
          "});",
        ].join("\n")
      ),
      paragraphs("`useGuard(resource(s), fn, config?)`"),
      paragraphs("Protects functions and handlers, not just UI."),
      codeBlock(
        [
          "const guard = useGuard();",
          "",
          'const deleteUser = guard("user:delete", async (id) => api.deleteUser(id), {',
          '  onAllow: () => console.log("Allowed"),',
          '  onDeny: () => toast.error("Not allowed"),',
          "});",
        ].join("\n")
      ),
      bullets(
        "Parameters: `resource: string | Array<string>` (permissions required).",
        "Parameters: `fn: (...args: any[]) => any` (function to protect).",
        "Parameters: `config?: GuardConfig` (optional behavior configuration).",
        'GuardConfig: `mode: "any" | "all"` (default: `"any"`).',
        "GuardConfig: `onAllow?: () => void` (runs before fn).",
        "GuardConfig: `onDeny?: () => void` (runs when denied)."
      ),
    ],
  },
  {
    title: "Best Practices",
    blocks: [
      bullets("Always validate permissions on the backend too."),
      paragraphs("Use enums/constants in your frontend:"),
      codeBlock(
        [
          "export const PERMS = {",
          '  DASHBOARD: "ui:dashboard",',
          '  CHECKLIST: "ui:dashboard:checklist",',
          "};",
        ].join("\n")
      ),
      paragraphs(
        "Store roles however you want (DB, JWT, API). The framework only needs an `Array<string>`."
      ),
    ],
  },
  {
    title: "Introduction",
    blocks: [
      bullets(
        "Treat the server as the source of truth for authorization and the client as a guide for visibility.",
        "Prefer capability permissions over role names in every interface decision.",
        "Use a single readable token language for both UI visibility and API enforcement.",
        "Adopt a compact signed Effective Permission Set (EPS) per user and context.",
        "Keep the vocabulary human-readable, documented, and guessable.",
        "Favor small primitives composed well over complex policy tools."
      ),
    ],
  },
  {
    title: "Product Managers Managing Access via Dashboard",
    blocks: [
      paragraphs(
        "This is one of the most valuable real-world use cases: PMs/Ops/Support manage access in a dashboard while devs implement the permission model once and reuse it forever."
      ),
      paragraphs("Why this is powerful:"),
      bullets(
        "PMs/Ops/Support can grant access instantly, revoke features without deployments, and run experiments (feature flags via RBAC).",
        "Developers don’t get interrupted for every access change and only implement the system once."
      ),
      paragraphs(
        "Your RBAC grammar maps directly to checkboxes and toggles in an admin UI:"
      ),
      codeBlock(
        ["ui:dashboard", "ui:billing", "!ui:billing:refund"].join("\n"),
        "Example tokens"
      ),
      bullets("Dashboard: on", "Billing: on", "Refund: off"),
      paragraphs(
        "This evolves naturally into RBAC as a feature management system: feature gating, audience control, gradual rollouts, permissions, and admin overrides."
      ),
    ],
  },
  {
    title: "Permission Language",
    blocks: [
      paragraphs(
        "Use permission tokens as the contract between product intent (what a user can do) and implementation (what the UI shows and what the server allows)."
      ),
      codeBlock(
        [
          "namespace:resource[:segment...][#action]",
          "",
          "ui:dashboard",
          "ui:billing:refunds",
          "api:invoice#export",
          "data:customer:ssn#read",
        ].join("\n"),
        "Token grammar"
      ),
      bullets(
        "Use namespaces like `ui` (visibility), `api` (server actions), and optional `data` (sensitive fields).",
        "Use hierarchy with intent; keep depth reasonable for clarity.",
        "Use actions like `#read` `#create` `#update` `#delete` `#export` when useful.",
        "Use wildcards carefully: single-level `*` and optional deep `**` (if you allow it).",
        "Use negation for surgical pruning such as `!ui:billing:refunds`."
      ),
    ],
  },
  {
    title: "Naming Guidance",
    blocks: [
      bullets(
        "Prefer intent-based names such as `ui:invoice:toolbar:export` over implementation labels.",
        "Keep segments lowercase and use kebab-case where needed.",
        "Limit token depth to a practical range that matches the product shape."
      ),
    ],
  },
  {
    title: "Deterministic Matching",
    blocks: [
      bullets(
        "Build separate allow and deny sets and evaluate deterministically.",
        "Choose the best match using: exact match → single wildcard → deep wildcard (if enabled).",
        "Let specificity outrank generic matches for predictable outcomes.",
        "Let deny override allow for safety under conflict.",
        "Provide boolean helpers such as `allOf` `anyOf` and `not` for clarity."
      ),
    ],
  },
  {
    title: "Effective Permission Set (EPS)",
    blocks: [
      paragraphs(
        "EPS is the signed, compact snapshot of permissions a subject has right now in a given context (tenant, environment, etc). The client can use it for visibility; the server must still enforce on every request."
      ),
      codeBlock(
        [
          "{",
          '  "subject": "user_123",',
          '  "tenant": "acme",',
          '  "perm_version": 12,',
          '  "allows": ["ui:dashboard", "api:invoice#export"],',
          '  "denies": ["ui:billing:refunds"],',
          '  "issued_at": 1730000000,',
          '  "ttl": 900,',
          '  "sig": "..."',
          "}",
        ].join("\n"),
        "Example EPS shape"
      ),
      bullets(
        "Transport EPS via signed session claims or a dedicated endpoint like `/me/permissions`.",
        "Revalidate freshness using `perm_version`, ETags, and short TTL values.",
        "Keep EPS small to avoid unnecessary payload weight."
      ),
    ],
  },
  {
    title: "Central Registry & Rendering Contract",
    blocks: [
      paragraphs(
        "The core developer experience goal: define permissions and documentation once in a central registry, and make every consumer (UI visibility, API guards, admin dashboards, docs, and generators) derive from it.",
        "In this repo, the one-pager itself is registry-driven so you can add/edit/reorder content without touching UI components."
      ),
      bullets(
        "Keep the registry as data (strings/arrays), not JSX, so editing stays fast and low-friction.",
        "Treat the registry as the canonical catalog for tokens and descriptions.",
        "Map registry entries directly to UI sections (no hand-wiring new sections)."
      ),
    ],
  },
  {
    title: "Admin / PM Dashboard Workflow",
    blocks: [
      paragraphs(
        "At runtime the system can stay simple: permissions are just strings stored in a DB, managed by a dashboard, and issued to clients as a signed EPS."
      ),
      codeBlock(
        [
          "ui:dashboard",
          "ui:billing",
          "!ui:billing:refund",
          "api:invoice#export",
        ].join("\n"),
        "How it looks in storage"
      ),
      bullets(
        "Represent tokens as a catalog-driven tree (so the UI is generated, not hardcoded).",
        "Persist changes as token lists (or diffs) in the database.",
        "Mint a fresh EPS at login (and on tenant switch) and ship it to the client.",
        "Server actions always re-check `api:*` regardless of what the UI shows (UI gates are not security)."
      ),
    ],
  },
  {
    title: "Developer Experience (Enums / Typed Tokens)",
    blocks: [
      paragraphs(
        "From a developer-experience standpoint, raw strings are risky: typos become silent access bugs. Enums/typed tokens give autocomplete, refactor safety, and eliminate a whole class of mistakes."
      ),
      codeBlock(
        [
          'hasAccess("ui:dashbord"); // typo -> silent bug',
          "",
          "export enum UIResources {",
          '  Dashboard = "ui:dashboard",',
          '  DashboardChecklist = "ui:dashboard:checklist",',
          '  Settings = "ui:settings",',
          "}",
          "",
          "hasAccess(UIResources.DashboardChecklist);",
        ].join("\n"),
        "Enums instead of raw strings"
      ),
      bullets(
        "Typed tokens are best for application code and internal tools.",
        "Runtime payloads (DB/EPS) can remain strings; types are a build-time safety layer."
      ),
    ],
  },
  {
    title: "Support BOTH (Runtime Strings + Typed Tokens)",
    blocks: [
      paragraphs(
        "The same RBAC engine can support both admin-managed strings and developer-friendly types, because at runtime everything is still a `string[]`."
      ),
      bullets(
        "For admins/PMs: store and edit plain strings in a DB; ship strings in EPS.",
        "For developers: use generated enums/constants for autocomplete and safe refactors.",
        "Both feed the same matcher because the runtime engine operates on tokens (strings)."
      ),
    ],
  },
  {
    title: "Enum Generation",
    blocks: [
      paragraphs(
        "To prevent duplication and drift, auto-generate enums/constants from the canonical catalog. This can be sourced from your registry or from the dashboard-managed catalog."
      ),
      codeBlock(
        [
          "ui:dashboard",
          "ui:dashboard:checklist",
          "ui:billing",
          "",
          "export enum Resources {",
          '  Dashboard = "ui:dashboard",',
          '  DashboardChecklist = "ui:dashboard:checklist",',
          '  Billing = "ui:billing",',
          "}",
        ].join("\n"),
        "Auto-generate enums from a catalog"
      ),
      bullets(
        "Generate as part of CI so token changes are reviewed like code.",
        "Fail builds on unknown namespaces, malformed tokens, or catalog mismatches."
      ),
    ],
  },
  {
    title: "Strategic Takeaway",
    blocks: [
      paragraphs(
        "This is not just a frontend RBAC library. It becomes an engine layer for access control, feature flags, permission management, no-code access configuration, and product experimentation."
      ),
      bullets(
        "Tree-based matching, wildcards, and negation make the language expressive.",
        "Hooks and guards make it ergonomic in React apps.",
        "Admin dashboard management makes access self-serve without deployments.",
        "Enum DX makes it safe and scalable for large teams."
      ),
    ],
  },
  {
    title: "UI Rendering",
    blocks: [
      bullets(
        "Build menus from `ui:*` tokens and prune with denies for coherence.",
        "Gate routes with `ui:*` tokens and show a gentle “not available” state for deep links.",
        "Buttons, tabs, and rows should each have a clear token.",
        "Keep checks close to the elements they guard (buttons, tabs, rows).",
        "Do not fetch privileged data for hidden sections; require matching `api:*`/`data:*` tokens for access.",
        "Prefer explainable states and brief reasons when elements are hidden or disabled."
      ),
    ],
  },
  {
    title: "API Enforcement",
    blocks: [
      bullets(
        "Always enforce `api:*` permissions on the server; UI gates are not security.",
        "Mirror UI and API tokens where it aids mental mapping (e.g. `ui:invoice:toolbar:export` with `api:invoice#export`).",
        "Avoid leaking restricted information via counts, previews, filenames, and metadata.",
        "Return clear, consistent errors for denied server actions."
      ),
    ],
  },
  {
    title: "Multi-Tenant Context",
    blocks: [
      bullets(
        "Include tenant context in EPS for multi-tenant products.",
        "Switching tenants refetches EPS; avoid stale grants.",
        "Roles may differ per tenant; prefer per-tenant assignments."
      ),
    ],
  },
  {
    title: "Deny Semantics",
    blocks: [
      bullets(
        "Treat deny as removal of a node and its descendants unless a more specific allow exists.",
        "Reserve deep wildcards and broad denies for administrative bundles and audits."
      ),
    ],
  },
  {
    title: "Catalog, Linting & Conventions",
    blocks: [
      bullets(
        "Maintain a permission catalog in both markdown and JSON for teams and tools.",
        "Describe each token with one sentence stating what it unlocks and where.",
        "Generate diffs for role changes and review them like code changes.",
        "Enforce naming lint rules in CI to prevent mistakes.",
        "Disallow deep wildcard by default; allow only when explicitly configured.",
        "Resolve aliases to canonical tokens at build time for consistency.",
        "Fail builds on unknown namespaces, malformed tokens, and invalid catalog entries."
      ),
    ],
  },
  {
    title: "UX, Accessibility & Performance",
    blocks: [
      bullets(
        "Prefer soft denial states that show context and a path forward over hard dead ends.",
        "Group controls that always travel together behind a single interface token.",
        "Use `allOf` when both UI and API permission are required to render an action.",
        "Remove denied content from the accessibility tree and prevent focus.",
        "Preserve keyboard navigation order after pruning interface sections.",
        "Use a trie or hashed segments so checks run in time proportional to depth.",
        "Memoize permission checks per render tree to avoid repeated string scanning."
      ),
    ],
  },
  {
    title: "Testing & Observability",
    blocks: [
      bullets(
        "Unit test precedence: specific vs wildcard, deny over allow, and deep paths.",
        "Snapshot test menus/navigation generated from tokens to catch regressions.",
        "Test tenant switching by diffing EPS before and after the switch.",
        "Add negative tests to verify hidden elements never fetch privileged data.",
        "Provide an inspector that shows candidate token, best allow, best deny, and final decision.",
        "Log administrative changes to roles/tokens with actor, timestamp, and diff for audits."
      ),
    ],
  },
  {
    title: "Migration & Anti-Patterns",
    blocks: [
      bullets(
        "Plan migration by mapping current checks to explicit tokens with clear intent.",
        "Enforce server-side `api:*` permissions first, then ship EPS, then gate the UI.",
        "Start with page-level tokens, then refine to sections, then controls.",
        "Avoid relying on role string comparisons inside UI components.",
        "Avoid shipping raw role lists to the client for inference.",
        "Avoid using feature flags as permissions and avoid using permissions as feature flags.",
        "Avoid prefetching restricted data and hiding the container afterward."
      ),
    ],
  },
  {
    title: "Directory Structure",
    blocks: [
      paragraphs(
        "Keep the package’s public surface small and stable. In consumer apps, isolate token definitions and EPS wiring in one place so the UI only consumes `hasAccess(token)`-style checks."
      ),
      codeBlock(
        [
          ".",
          "├─ app/",
          "│  ├─ layout.tsx",
          "│  ├─ page.tsx",
          "│  ├─ (admin)/permissions/page.tsx",
          "│  └─ (app)/billing/page.tsx",
          "├─ lib/",
          "│  ├─ permissions/",
          "│  │  ├─ tokens.ts            # optional typed tokens/enums",
          "│  │  └─ catalog.ts           # your canonical token catalog",
          "│  ├─ eps/",
          "│  │  ├─ get-eps.ts           # fetch/mint EPS (client/server)",
          "│  │  └─ has-access.ts        # matcher helpers",
          "│  └─ rbac/",
          "│     ├─ provider.tsx         # React provider for EPS",
          "│     └─ guards.tsx           # UI guard components (optional)",
          "└─ server/",
          "   ├─ auth/",
          "   └─ permissions/",
          "      ├─ mint-eps.ts          # mint/sign EPS",
          "      └─ enforce-api.ts       # server-side enforcement",
        ].join("\n"),
        "Consumer integration"
      ),
      codeBlock(
        [
          ".",
          "├─ src/",
          "│  ├─ index.ts",
          "│  ├─ catalog/",
          "│  │  ├─ types.ts              # token + catalog types",
          "│  │  ├─ validate.ts           # lint/validation for tokens",
          "│  │  └─ generate.ts           # enum/constants generator",
          "│  ├─ eps/",
          "│  │  ├─ types.ts              # EPS types",
          "│  │  ├─ sign.ts               # signing helpers",
          "│  │  └─ verify.ts             # verification helpers",
          "│  ├─ match/",
          "│  │  ├─ matcher.ts            # deterministic allow/deny matcher",
          "│  │  └─ trie.ts               # optional trie index",
          "│  ├─ react/",
          "│  │  ├─ provider.tsx          # EPS provider",
          "│  │  ├─ hooks.ts              # useHasAccess(), etc.",
          "│  │  └─ components.tsx        # <Can/>, <Gate/>, etc.",
          "│  └─ admin/",
          "│     ├─ tree.ts               # token tree builder for dashboards",
          "│     └─ diff.ts               # diffs for audits/reviews",
          "└─ README.md",
        ].join("\n"),
        "Package layout"
      ),
    ],
  },
];

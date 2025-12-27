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
        "Backend-agnostic design.",
        "Framework-agnostic core with optional framework bindings."
      ),
    ],
  },
  {
    title: "The Problem We're Solving",
    blocks: [
      paragraphs(
        "Frontend applications need to control what users can see and do, but traditional approaches have limitations:"
      ),
      bullets(
        "Role-based checks scattered throughout code become hard to maintain.",
        "String comparisons and role lists don't scale as features grow.",
        "No clear way to represent hierarchical permissions (e.g., 'dashboard' but not 'dashboard:checklist').",
        "Difficult to let non-developers manage access without code changes.",
        "No standard way to express 'deny this specific thing' while allowing the parent."
      ),
      paragraphs(
        "This framework solves UI role access by providing a tree-based permission system that's fast, explicit, and manageable."
      ),
    ],
  },
  {
    title: "Why Use This Approach",
    blocks: [
      bullets(
        "Tree-based evaluation means O(depth) complexity—fast even with thousands of permissions.",
        "Explicit permission tokens make it clear what each UI element requires.",
        "Hierarchical structure matches how products are organized (pages → sections → controls).",
        "Negation rules let you grant broad access and surgically remove specific features.",
        "Simple string-based tokens work with any backend—just pass an array of strings.",
        "Admin dashboards can manage permissions without developer intervention."
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
    title: "Framework Use Cases",
    level: 1,
    blocks: [],
  },
  {
    title: "Product Managers Managing Access via Dashboard",
    level: 2,
    blocks: [
      paragraphs(
        "This is one of the most valuable real-world use cases: PMs/Ops/Support manage access in a dashboard while devs implement the permission model once and reuse it forever."
      ),
      paragraphs("Why this is powerful:"),
      bullets(
        "PMs/Ops/Support can grant access instantly, revoke features without deployments, and run experiments (feature flags via RBAC).",
        "Developers don't get interrupted for every access change and only implement the system once."
      ),
      paragraphs(
        "Your RBAC grammar maps directly to checkboxes and toggles in an admin UI:"
      ),
      codeBlock(
        [
          "ui:dashboard",
          "ui:billing",
          "!ui:billing:refund"
        ].join("\n"),
        "Example tokens"
      ),
      bullets(
        "`ui:dashboard` grants access to all dashboard features (reports, analytics, widgets, etc.).",
        "`ui:billing` grants access to all billing features.",
        "`!ui:billing:refund` denies the refund feature specifically, while keeping other billing features accessible."
      ),
      paragraphs(
        "This evolves naturally into RBAC as a feature management system: feature gating, audience control, gradual rollouts, permissions, and admin overrides."
      ),
    ],
  },
  {
    title: "Feature Flags & Experimentation",
    level: 2,
    blocks: [
      paragraphs(
        "RBAC tokens can double as feature flags, enabling product teams to control feature visibility and access without code deployments."
      ),
      bullets(
        "Use permission tokens to gate new features during development and testing.",
        "Gradually roll out features to specific user segments using permission assignments.",
        "Run A/B tests by granting different permission sets to different user groups.",
        "Quickly disable features by revoking permissions without code changes."
      ),
    ],
  },
  {
    title: "Framework Features",
    level: 1,
    blocks: [],
  },
  {
    title: "Smart Permission Grammar",
    level: 2,
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
    level: 2,
    blocks: [
      bullets(
        "Permissions compile into a static permission tree.",
        "No repeated looping over role strings.",
        "Ultra-fast access checks with complexity proportional to depth (`O(depth)`)."
      ),
    ],
  },
  {
    title: "Deny Semantics",
    level: 2,
    blocks: [
      bullets(
        "Treat deny as removal of a node and its descendants unless a more specific allow exists.",
        "Reserve deep wildcards and broad denies for administrative bundles and audits."
      ),
    ],
  },
  {
    title: "Framework Usage",
    level: 1,
    blocks: [],
  },
  {
    title: "Permission Language",
    level: 2,
    blocks: [
      paragraphs(
        "Use permission tokens as the contract between product intent (what a user can see and do) and implementation (what the UI shows)."
      ),
      codeBlock(
        [
          "namespace:resource[:segment...][:action]",
          "",
          "ui:dashboard",
          "ui:billing:refunds",
          "ui:invoice:toolbar:export",
          "ui:settings:profile:edit",
        ].join("\n"),
        "Token grammar"
      ),
      bullets(
        "Use the `ui` namespace for UI visibility and feature access.",
        "Use hierarchy with intent; keep depth reasonable for clarity.",
        "Granting a parent permission (e.g., `ui:dashboard`) gives access to all child paths (e.g., `ui:dashboard:reports`, `ui:dashboard:analytics`) until a specific child is denied.",
        "Use negation for surgical pruning: deny specific children while keeping parent access (e.g., `ui:dashboard` with `!ui:dashboard:checklist` grants all dashboard features except the checklist).",
        "Use wildcards carefully: single-level `*`."
      ),
    ],
  },
  {
    title: "Naming Guidance",
    level: 2,
    blocks: [
      bullets(
        "Prefer intent-based names such as `ui:invoice:toolbar:export` over implementation labels.",
        "Keep segments lowercase and use kebab-case where needed.",
        "Limit token depth to a practical range that matches the product shape."
      ),
    ],
  },
  {
    title: "Admin / PM Dashboard Workflow",
    level: 2,
    blocks: [
      paragraphs(
        "At runtime the system can stay simple: permissions are just strings stored in a DB, managed by a dashboard, and issued to clients as a signed EPS."
      ),
      codeBlock(
        [
          "ui:dashboard",
          "ui:billing",
          "!ui:billing:refund",
          "ui:invoice:export",
        ].join("\n"),
        "How it looks in storage"
      ),
      bullets(
        "Represent tokens as a catalog-driven tree (so the UI is generated, not hardcoded).",
        "Persist changes as token lists (or diffs) in the database.",
        "Mint a fresh EPS at login (and on tenant switch) and ship it to the client.",
        "Always validate permissions on the server; UI gates are for visibility, not security."
      ),
    ],
  },
  {
    title: "Developer Experience (Enums / Typed Tokens)",
    level: 2,
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
    level: 2,
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
    title: "Catalog, Linting & Conventions",
    level: 2,
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
    title: "Strategic Takeaway",
    blocks: [
      paragraphs(
        "This is not just a frontend RBAC library. It becomes an engine layer for access control, feature flags, permission management, no-code access configuration, and product experimentation."
      ),
      bullets(
        "Tree-based matching, wildcards, and negation make the language expressive.",
        "Framework-agnostic design means it works with any frontend stack.",
        "Admin dashboard management makes access self-serve without deployments.",
        "Type-safe tokens make it safe and scalable for large teams.",
        "Simple string-based API means easy integration with any backend system."
      ),
    ],
  },
];

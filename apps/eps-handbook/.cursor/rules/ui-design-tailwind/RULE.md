---
description: Tailwind-first docs UI conventions (typography, spacing, code blocks, icons, motion) for this repo.
globs:
  - app/**/*.{ts,tsx,css}
  - lib/content/**/*.ts
alwaysApply: false
---

## UI / Design Rules (Tailwind-first, docs UI)

These rules are **design-specific**. Optimize for consistent typography, spacing, and interaction polish in a light-themed docs UI.

### File & naming conventions

- Use **kebab-case** for new filenames and directories (e.g. `one-pager-renderer.tsx`, `copy-icon.tsx`).
- Keep UI components in `app/components/**` and icons in `app/components/ui/icons/**`.

### Tailwind usage (preferred)

- Prefer **Tailwind utilities** over global CSS for layout/typography.
- Avoid arbitrary values like `text-[13px]`, `leading-[1.65]`, `top-[0.82em]`.
  - Use nearest Tailwind scale: `text-xs/sm`, `leading-5/6/7`, `p-3/4`, `gap-2/3/4`, `rounded-sm`.
- Prefer `size-*` for square elements instead of `w-*` + `h-*`:
  - Good: `className="size-7"`
  - Avoid: `className="w-7 h-7"`
- Prefer semantic theme tokens when available (`text-foreground`, `text-muted-foreground`, `border-border`, `bg-background`) over hard-coded hex.\n+

### Typography & spacing (docs feel)

- Keep paragraphs **flush-left**; avoid negative margins for alignment hacks.
- Only indent list items (bullets) — do not indent paragraph blocks.
- Use consistent vertical rhythm:
  - Section spacing: `mb-6 md:mb-8`
  - Block spacing: `space-y-3` (or `space-y-2` for tighter sub-blocks)
- Keep headings subtle and scannable:
  - Section title: `text-sm`
  - Anchor hash (`#`) should appear on hover without shifting layout (use `absolute` positioning).

### Lists (bullets)

- Use custom bullets with `before:*` utilities for consistent alignment.
- Keep list spacing tight: `space-y-1`.
- Bullet marker should use `currentColor` with muted text, so it tracks theme automatically.

### Inline code (backticks)

- Inline code should be readable but not loud:
  - `font-mono text-xs rounded-sm bg-zinc-100 text-foreground whitespace-nowrap`
- Avoid borders unless it materially improves legibility.

### Code blocks (docs-grade)

- Code blocks must:
  - Use `rounded-sm` (not `rounded-md/lg`).
  - Use subtle light background and clean border (solid preferred over dashed unless explicitly requested).
  - Keep font: `font-mono text-xs leading-6`.
- Copy button:
  - Must be inside the code block container (top-right overlay).
  - Use subtle hover states; avoid high-contrast chrome.
  - Provide immediate feedback (copy → check) and reset after a short delay.

### Motion & interaction polish

- Use motion sparingly and purposefully:
  - Tap feedback: `whileTap={{ scale: 0.97 }}` for icon buttons.
  - Icon swap feedback: subtle blur/opacity transition (respect reduced motion where possible).
- Always include visible focus states (`focus-visible:*`) for interactive elements.

### Light theme contrast (niche but important)

- Ensure **muted text remains readable** on light background.
- Keep borders light but visible (`border-zinc-200` / `border-border`) and avoid stacking too many borders in small areas.

### Anchor navigation (docs UX)

- When using hash anchors, apply `scroll-mt-*` so the fixed header doesn’t cover the target.
- Anchor links should not change layout when the hash marker appears (no reflow).

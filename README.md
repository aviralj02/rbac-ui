## rbac/react

a framework for modern role management

## what we define

: → hierarchical access

! → deny override

`*` → wildcard

prefix keyword (ui, pages, feature, etc.)

tree-based inheritance rules

access cascade rules

## todos

- Add TypeScript types for nested roles (hierarchy tree).
- Add a can() alias for for ergonomic use.
- withAccess(Component, resourcehasAccess() ) HOC

## rbac/react

a framework for modern role management

## todos

- Add TypeScript types for nested roles (hierarchy tree).
- Add a can() alias for hasAccess() for ergonomic use.
- Implement AccessGate component:

```typescript
<AccessGate resource="ui:dashboard:checklist">
  <ChecklistComponent />
</AccessGate>
```

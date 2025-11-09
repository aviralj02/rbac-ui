export type RoleString = string;

export class RBAC {
  constructor(private roles: Array<RoleString> = []) {}

  hasAccess(resource: string): boolean {
    let allowed = false;

    for (const role of this.roles) {
      const isNeg = role.startsWith("!");
      const norm = isNeg ? role.slice(1) : role;
      if (
        resource === norm ||
        resource.startsWith(norm + ":") ||
        norm === "*"
      ) {
        if (isNeg) return false;
        allowed = true;
      }
    }
    return allowed;
  }
}

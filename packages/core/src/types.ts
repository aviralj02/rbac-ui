export type RoleString = string;

export interface ParsedRole {
  raw: string;
  isNeg: boolean;
  base: string;
}

export interface PermissionNode {
  allow: boolean;
  deny: boolean;
  children: Record<string, PermissionNode>;
}

import { PermissionNode } from "../types";

export function buildTree(roles: string[]): PermissionNode {
  const root: PermissionNode = {
    allow: false,
    deny: false,
    children: {},
  };

  for (const role of roles) {
    const isNeg = role.startsWith("!");
    const clean = isNeg ? role.slice(1) : role;

    const parts = clean.split(":");
    let node = root;

    for (const part of parts) {
      if (!node.children[part]) {
        node.children[part] = {
          allow: false,
          deny: false,
          children: {},
        };
      }

      node = node.children[part];
    }

    if (isNeg) node.deny = true;
    else node.allow = true;
  }

  return root;
}

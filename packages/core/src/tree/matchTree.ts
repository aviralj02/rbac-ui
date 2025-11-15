import { PermissionNode } from "../types";

export function matchTree(root: PermissionNode, resource: string): boolean {
  const parts = resource.split(":");
  let node: PermissionNode | undefined = root;
  let allowed = false;

  for (const part of parts) {
    if (!node) break;

    if (node.deny) return false;
    if (node.allow) allowed = true;

    node = node.children[part];
  }

  if (node) {
    if (node.deny) return false;
    if (node.allow) allowed = true;
  }

  return allowed;
}

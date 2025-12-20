import { buildTree } from "./tree/buildTree";
import { matchTree } from "./tree/matchTree";
import { PermissionNode } from "./types";

export class RBAC {
  private tree: PermissionNode;

  constructor(private roles: Array<string> = []) {
    this.tree = buildTree(roles);
  }

  hasAccess(resource: string): boolean {
    return matchTree(this.tree, resource);
  }
}

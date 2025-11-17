"use client";

import { useAccess } from "./useAccess";

/**
 * useAccessList
 *
 * Batch-check multiple permission strings.
 *
 * Returns:
 * {
 *   allow: string[];   // permissions the user DOES have
 *   deny: string[];    // permissions the user DOES NOT have
 * }
 *
 * @example
 * const { allow, deny } = useAccessList([
 *   "post:create",
 *   "post:edit",
 *   "post:delete"
 * ]);
 *
 * @example
 * allow.includes("post:edit") && ...
 */
export function useAccessList(resources: Array<string>) {
  const { hasAccess } = useAccess();

  const allow: string[] = [];
  const deny: string[] = [];

  for (const res of resources) {
    if (hasAccess(res)) allow.push(res);
    else deny.push(res);
  }

  return { allow, deny };
}

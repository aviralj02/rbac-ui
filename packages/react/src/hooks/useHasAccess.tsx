"use client";

import { useAccess } from "./useAccess";

/**
 * useHasAccess
 *
 * Returns a simple boolean indicating whether the user has access.
 *
 * @example
 * const canEdit = useHasAccess("post:edit");
 *
 * @example
 * const canEditOrDelete = useHasAccess(["post:edit", "post:delete"], "any");
 *
 * @example
 * const canFullyAdmin = useHasAccess(["settings:read", "settings:write"], "all");
 */
export function useHasAccess(
  resource: string | Array<string>,
  mode: "any" | "all" = "any"
) {
  const { hasAccess } = useAccess();

  const resources = Array.isArray(resource) ? resource : [resource];

  return mode === "any"
    ? resources.some((r) => hasAccess(r))
    : resources.every((r) => hasAccess(r));
}

"use client";

import { useAccess } from "./useAccess";

export type GuardConfig = {
  mode?: "any" | "all";
  onAllow?: () => void;
  onDeny?: () => void;
};

/**
 * useGuard
 *
 * Wraps an action and runs it ONLY if the user has RBAC permission.
 * Allows optional callbacks for allow / deny events.
 *
 * Very flexible: the caller decides what to do inside onAllow/onDeny.
 *
 * @example
 * const guard = useGuard();
 *
 * // Basic usage
 * const safeDelete = guard("post:delete", deletePost);
 *
 * // Custom deny behavior
 * const safeApprove = guard("order:approve", approveOrder, {
 *   onDeny: () => toast.error("You can’t approve this order")
 * });
 *
 * // Allow hook
 * const safeAction = guard("user:create", createUser, {
 *   // Runs before the createUser fn execution
 *   onAllow: () => console.log("Creating user…")
 * });
 */
export function useGuard() {
  const { hasAccess } = useAccess();

  return function guard<T extends (...args: any[]) => any>(
    resource: string | string[],
    fn: T,
    config: GuardConfig = {}
  ) {
    const { mode = "any", onAllow, onDeny } = config;

    return (...args: Parameters<T>): ReturnType<T> | undefined => {
      const resources = Array.isArray(resource) ? resource : [resource];

      const allowed =
        mode === "any"
          ? resources.some((r) => hasAccess(r))
          : resources.every((r) => hasAccess(r));

      if (allowed) {
        onAllow?.();
        return fn(...args);
      }

      onDeny?.();
      return undefined;
    };
  };
}

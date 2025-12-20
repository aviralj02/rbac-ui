"use client";

import React from "react";
import { useAccess } from "../../hooks/useAccess";

interface WithAccessBaseConfig {
  fallback?: React.ReactNode;
}

interface WithAccessSingleConfig extends WithAccessBaseConfig {
  /**
   * - "any": render if the user has at least one of the provided resources.
   * - "all": render only if the user has every provided resource.
   */
  mode?: "any" | "all";
}

interface WithAccessMultiConfig extends WithAccessBaseConfig {
  /**
   * - "any": render if the user has at least one of the provided resources.
   * - "all": render only if the user has every provided resource.
   */
  mode: "any" | "all";
}

type WithAccessConfig = WithAccessSingleConfig | WithAccessMultiConfig;

type SingleResource = string;
type MultiResource = Array<string>;

export function withAccess<P>(
  Component: React.ComponentType<P>,
  resource: SingleResource,
  config?: WithAccessSingleConfig
): React.FC<P>;

export function withAccess<P>(
  Component: React.ComponentType<P>,
  resource: MultiResource,
  config: WithAccessMultiConfig
): React.FC<P>;

export function withAccess<P>(
  Component: React.ComponentType<P>,
  resource: string | Array<string>,
  config: WithAccessConfig = {}
): React.FC<P> {
  const isArray = Array.isArray(resource);

  const mode: "any" | "all" = isArray ? config.mode : (config.mode ?? "any");

  const fallback = config.fallback ?? null;

  const Wrapped: React.FC<P> = (props) => {
    const { hasAccess } = useAccess();

    const resources = isArray ? resource : [resource];

    const allowed =
      mode === "any"
        ? resources.some((r) => hasAccess(r))
        : resources.every((r) => hasAccess(r));

    if (!allowed) return <>{fallback}</>;

    return <Component {...props} />;
  };

  Wrapped.displayName = `withAccess(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
}

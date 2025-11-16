"use client";

import React from "react";
import { useAccess } from "../hooks/useAccess";

type AccessGateBaseProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type AccessGateSingle = {
  resource: string;

  /**
   * - "any": render if the user has at least one of the provided resources.
   * - "all": render only if the user has every provided resource.
   */
  mode?: "any" | "all";
} & AccessGateBaseProps;

type AccessGateMulti = {
  resource: Array<string>;

  /**
   * - "any": render if the user has at least one of the provided resources.
   * - "all": render only if the user has every provided resource.
   */
  mode: "any" | "all";
} & AccessGateBaseProps;

export type AccessGateProps = AccessGateSingle | AccessGateMulti;

export const AccessGate: React.FC<AccessGateProps> = (props) => {
  const { hasAccess } = useAccess();

  const { children, fallback = null } = props as AccessGateBaseProps;

  const resource = (props as any).resource as string | string[];

  const resources = Array.isArray(resource) ? resource : [resource];

  const mode: "any" | "all" = Array.isArray(resource)
    ? (props as AccessGateMulti).mode
    : ((props as AccessGateSingle).mode ?? "any");

  const allowed =
    mode === "any"
      ? resources.some((r) => hasAccess(r))
      : resources.every((r) => hasAccess(r));

  return allowed ? <>{children}</> : <>{fallback}</>;
};

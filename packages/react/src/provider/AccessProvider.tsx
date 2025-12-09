"use client";

import React, { useMemo } from "react";
import { RBAC } from "@rbac-ui/core";
import { AccessContext } from "../context/AccessContext";

interface AccessProviderProps {
  roles: Array<string>;
  children: React.ReactNode;
}

export const AccessProvider: React.FC<AccessProviderProps> = ({
  roles,
  children,
}) => {
  const rbac = useMemo(() => new RBAC(roles), [roles]);

  const ctxValue = useMemo(
    () => ({
      hasAccess: (resource: string) => rbac.hasAccess(resource),
    }),
    [rbac]
  );

  return (
    <AccessContext.Provider value={ctxValue}>{children}</AccessContext.Provider>
  );
};

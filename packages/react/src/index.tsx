import React, { createContext, useContext, useMemo } from "react";
import { RBAC } from "@rbac/core";

type AccessContextType = {
  hasAccess: (resource: string) => boolean;
};

const AccessContext = createContext<AccessContextType | null>(null);

interface AccessProviderProps {
  roles: Array<string>;
  children: React.ReactNode;
}

export const AccessProvider: React.FC<AccessProviderProps> = ({
  roles,
  children,
}) => {
  const rbac = useMemo(() => new RBAC(roles), [roles]);

  const value = useMemo(
    () => ({
      hasAccess: (resource: string) => rbac.hasAccess(resource),
    }),
    [rbac]
  );

  return (
    <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
  );
};

export const useAccess = () => {
  const ctx = useContext(AccessContext);

  if (!ctx)
    throw new Error("useAccess must be used within an <AccessProvider>");
  return ctx;
};

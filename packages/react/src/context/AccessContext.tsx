import { createContext } from "react";

export type AccessContextType = {
  hasAccess: (resource: string) => boolean;
};

export const AccessContext = createContext<AccessContextType | null>(null);

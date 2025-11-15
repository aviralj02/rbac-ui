import { ParsedRole } from "./types";

export function parseRole(role: string): ParsedRole {
  const isNeg = role.startsWith("!");
  return {
    raw: role,
    isNeg,
    base: isNeg ? role.slice(1) : role,
  };
}

"use client";

import { useContext } from "react";
import { AccessContext } from "../context/AccessContext";

export const useAccess = () => {
  const ctx = useContext(AccessContext);
  if (!ctx) {
    throw new Error("useAccess must be used inside <AccessProvider>");
  }
  return ctx;
};

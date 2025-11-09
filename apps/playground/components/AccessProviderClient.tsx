"use client";

import { AccessProvider } from "@rbac/react";

type Props = { children: React.ReactNode };

const AccessProviderClient = ({ children }: Props) => {
  return (
    <AccessProvider
      roles={[
        "ui:dashboard:checklist",
        "ui:dashboard:reports",
        "!ui:dashboard",
      ]}
    >
      {children}
    </AccessProvider>
  );
};

export default AccessProviderClient;

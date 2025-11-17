"use client";

import { AccessProvider } from "@rbac/react";

type Props = { children: React.ReactNode };

const AccessProviderClient = ({ children }: Props) => {
  return (
    <AccessProvider
      roles={[
        "ui:dashboard:view1",
        "!ui:dashboard:view2",
        "ui:dashboard",
        "ui:dashboard:special",
        "ui:dashboard:hoc",
        "ui:dashboard:post",
        "ui:dashboard:post:create",
        "ui:dashboard:post:edit",
        "ui:dashboard:post:delete",
      ]}
    >
      {children}
    </AccessProvider>
  );
};

export default AccessProviderClient;

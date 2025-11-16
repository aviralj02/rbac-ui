"use client";

import { AccessGate, useAccess } from "@rbac/react";

type Props = {};

const DashboardClient = (props: Props) => {
  const { hasAccess } = useAccess();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>View1 access: {hasAccess("ui:dashboard:view1") ? "✅" : "❌"}</p>
      <p>View2 access: {hasAccess("ui:dashboard:view2") ? "✅" : "❌"}</p>

      <AccessGate resource={"ui:dashboard:special"}>Special Access</AccessGate>
    </div>
  );
};

export default DashboardClient;

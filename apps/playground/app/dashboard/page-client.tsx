"use client";

import ProtectedComp from "@/components/ProtectedComp";
import { AccessGate, useAccess } from "@rbac-ui/react";

type Props = {};

const DashboardClient = (props: Props) => {
  const { hasAccess } = useAccess();

  return (
    <div className="flex flex-col gap-6">
      <h2>Dashboard</h2>
      <p>View1 access: {hasAccess("ui:dashboard:view1") ? "✅" : "❌"}</p>
      <p>View2 access: {hasAccess("ui:dashboard:view2") ? "✅" : "❌"}</p>

      <AccessGate
        resource={"ui:dashboard:special"}
        fallback={<span>no access</span>}
      >
        Special Access
      </AccessGate>

      <ProtectedComp />
    </div>
  );
};

export default DashboardClient;

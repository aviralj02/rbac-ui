"use client";

import { useAccess } from "@rbac/react";

type Props = {};

const DashboardClient = (props: Props) => {
  const { hasAccess } = useAccess();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Checklist access: {hasAccess("ui:dashboard:checklist") ? "✅" : "❌"}
      </p>
      <p>Reports access: {hasAccess("ui:dashboard:reports") ? "✅" : "❌"}</p>
    </div>
  );
};

export default DashboardClient;

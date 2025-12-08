import { withAccess } from "@rbac-ui/react";

const ProtectedComp = () => {
  return <div>HOC Protected Component</div>;
};

export default withAccess(
  ProtectedComp,
  ["ui:dashboard:hoc", "ui:dashboard:special"],
  {
    mode: "all",
  }
);

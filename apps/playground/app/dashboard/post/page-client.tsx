"use client";

import { useAccessList, useGuard, useHasAccess, withAccess } from "@rbac/react";

const PostPageClient = () => {
  const canFullyAdmin = useHasAccess(
    [
      "ui:dashboard:post:create",
      "ui:dashboard:post:edit",
      "ui:dashboard:post:delete",
    ],
    "all"
  );

  const { allow, deny } = useAccessList([
    "ui:dashboard:post:create",
    "ui:dashboard:post:edit",
    "ui:dashboard:post:delete",
  ]);

  const guard = useGuard();

  const terminateAccount = () => alert("Account Terminated");

  const safelyTerminateAccount = guard(
    "ui:dashboard:post:terminate",
    terminateAccount,
    {
      onDeny: () => alert("Cannot Terminate Account ❌"),
    }
  );

  return (
    <main className="w-full h-screen flex flex-col mx-auto max-w-3xl">
      <div className="flex flex-col gap-2 my-6">
        <h1>Dashboard &rarr; Post Page </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
          perspiciatis voluptates ratione repellendus sint quidem qui inventore
          est omnis. Cupiditate debitis laudantium quos eligendi molestiae
          reprehenderit eum exercitationem iusto iste.
        </p>
      </div>

      <div className="flex items-center justify-around my-6">
        {allow.includes("ui:dashboard:post:create") && (
          <button className="btn">Create</button>
        )}
        {allow.includes("ui:dashboard:post:edit") && (
          <button className="btn">Edit</button>
        )}
        {allow.includes("ui:dashboard:post:delete") && (
          <button className="btn bg-red-500!">Delete</button>
        )}
      </div>

      <div className="my-4 flex justify-center">
        {canFullyAdmin && (
          <button
            className="btn bg-amber-600!"
            onClick={safelyTerminateAccount}
          >
            Terminate Account
          </button>
        )}
      </div>
    </main>
  );
};

export default withAccess(PostPageClient, "ui:dashboard:post", {
  fallback: (
    <div className="flex flex-col mx-auto max-w-3xl w-full text-center my-12">
      Oops! You dont have access here
    </div>
  ),
});

import { getRepoUpdateInfo, formatTimeAgo } from "@/lib/github";
import { onePagerSections } from "@/lib/content/one-pager";
import { OnePagerRenderer } from "@/app/components/one-pager-renderer";
import { InstallPill } from "@/app/components/install-pill";

export default async function Home() {
  const info = await getRepoUpdateInfo("SanyamPunia", "eps-guide").catch(
    () => null
  );

  const lastUpdated = info?.pushed_at
    ? formatTimeAgo(info.pushed_at)
    : "unknown";

  return (
    <main className="relative flex flex-col min-h-screen mx-auto max-w-4xl px-6 pt-28 bg-background text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-20 md:pt-24">
        <div className="mx-auto max-w-4xl md:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex flex-col items-center px-4 md:px-6 py-3 border border-dashed border-sky-300/60 bg-sky-400/10">
              <h1 className="text-5xl md:text-7xl leading-none font-bold tracking-tight">
                <span className="text-sky-600">rbac-ui</span>
              </h1>
              <p className="mt-3 inline-flex items-center rounded-sm border border-sky-200/60 bg-white/70 px-2 py-1 text-xs md:text-sm font-medium tracking-tight text-sky-700/90">
                Role-Driven UI & EPS Framework
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              A lightweight, tree-based RBAC framework for predictable,
              explicit, and
              <br />
              flexible access control in frontend applications.
            </p>
            <div className="mt-4">
              <InstallPill command="npm install @rbac-ui/react" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-64 md:mt-80">
        <div className="relative mx-auto max-w-4xl border border-zinc-100 bg-white shadow-xl py-6 px-4 md:p-8">
          <div className="one-pager">
            <OnePagerRenderer sections={onePagerSections} />
          </div>

          <div className="mt-16 py-8 border-t border-border">
            <p className="text-sm leading-7 text-muted-foreground">
              <a
                href="https://github.com/SanyamPunia/eps-guide"
                className="underline hover:text-foreground transition-colors inline-flex items-center gap-0.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="verticalFade"
        data-side="bottom"
        style={{
          position: "fixed",
          bottom: 0,
          height: "100px",
          width: "100%",
          left: 0,
          zIndex: 100,
          pointerEvents: "none",
          userSelect: "none",
          backdropFilter: "blur(1px)",
          willChange: "transform",
          background: "linear-gradient(to bottom, transparent, var(--gray1))",
          maskImage: "linear-gradient(to top, var(--gray1) 25%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to top, var(--gray1) 25%, transparent)",
        }}
      />
    </main>
  );
}

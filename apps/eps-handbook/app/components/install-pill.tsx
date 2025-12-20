"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon } from "@/app/components/ui/icons/check";
import { CopyIcon } from "@/app/components/ui/icons/copy";

export function InstallPill({
  command = "npm install @rbac-ui/react",
}: {
  command?: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const iconMotion = useMemo(
    () => ({
      initial: { opacity: 0, filter: "blur(6px)", scale: 0.98 },
      animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      exit: { opacity: 0, filter: "blur(6px)", scale: 0.98 },
      transition: {
        duration: 0.16,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
    []
  );

  return (
    <motion.button
      type="button"
      className="cursor-pointer group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm shadow-zinc-100 hover:bg-white hover:text-zinc-900"
      aria-label={copied ? "Copied install command" : "Copy install command"}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 900, damping: 45 }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          if (resetTimerRef.current !== null) {
            window.clearTimeout(resetTimerRef.current);
          }
          resetTimerRef.current = window.setTimeout(() => {
            setCopied(false);
          }, 2000);
        } catch {
          // no-op
        }
      }}
    >
      <span className="font-mono text-[11px] text-zinc-800">{command}</span>
      <span className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/70 p-1 text-zinc-600 group-hover:text-zinc-800">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="check" {...iconMotion} className="inline-flex">
              <CheckIcon className="size-3.5" />
            </motion.span>
          ) : (
            <motion.span key="copy" {...iconMotion} className="inline-flex">
              <CopyIcon className="size-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

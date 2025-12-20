"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DocSection } from "@/lib/content/types";
import { highlight } from "sugar-high";
import { CheckIcon } from "@/app/components/ui/icons/check";
import { CopyIcon } from "@/app/components/ui/icons/copy";

function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          const code = part.slice(1, -1);
          return (
            <code
              key={i}
              className="font-mono text-xs px-1.5 py-0.5 rounded-sm bg-zinc-100 text-foreground whitespace-nowrap"
            >
              {code}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function OnePagerRenderer({ sections }: { sections: DocSection[] }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const slugCounts = new Map<string, number>();
  const slugify = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const getSectionId = (title: string) => {
    const base = slugify(title) || "section";
    const current = slugCounts.get(base) ?? 0;
    slugCounts.set(base, current + 1);
    return current === 0 ? base : `${base}-${current + 1}`;
  };

  const copyIconMotion = useMemo(
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
    <>
      {sections.map((section) => {
        const id = getSectionId(section.title);
        return (
          <section key={id} className="mb-6 md:mb-8">
            <h2
              id={id}
              className="text-sm font-normal mb-2 text-foreground scroll-mt-8"
            >
              <a
                href={`#${id}`}
                className="group relative inline-block"
                aria-label={`Link to ${section.title}`}
              >
                <span className="absolute -left-4 top-0 text-muted-foreground opacity-0 group-hover:opacity-100">
                  #
                </span>
                <span className="underline-offset-4 decoration-black/20 hover:underline font-medium">
                  {section.title}
                </span>
              </a>
            </h2>
            <div className="space-y-3">
              {section.blocks.map((block, blockIdx) => {
                if (block.kind === "bullets") {
                  return (
                    <ul key={blockIdx} className="m-0 p-0 space-y-1">
                      {block.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="relative pl-4 text-sm leading-7 text-muted-foreground before:content-[''] before:absolute before:left-1 before:top-3.5 before:h-1 before:w-1 before:bg-current before:opacity-90 before:rounded-none"
                        >
                          {renderInlineCode(item)}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.kind === "paragraphs") {
                  return (
                    <div key={blockIdx} className="space-y-2">
                      {block.items.map((item, itemIdx) => (
                        <p
                          key={itemIdx}
                          className="m-0 text-sm leading-7 text-muted-foreground"
                        >
                          {renderInlineCode(item)}
                        </p>
                      ))}
                    </div>
                  );
                }

                if (block.kind === "code") {
                  const html = highlight(block.code);
                  const key = `${id}::code::${blockIdx}`;
                  const isCopied = copiedKey === key;

                  return (
                    <div key={blockIdx} className="space-y-2">
                      {block.title ? (
                        <p className="m-0 text-xs text-muted-foreground">
                          {block.title}
                        </p>
                      ) : null}
                      <pre className="m-0 overflow-x-auto rounded-sm border border-zinc-200 border-dashed bg-zinc-50 px-4 py-3">
                        <motion.button
                          type="button"
                          className="cursor-pointer sticky float-right -mr-2 -mt-2 inline-flex size-7 items-center justify-center rounded-sm border border-border bg-zinc-50 text-muted-foreground hover:text-foreground"
                          aria-label={isCopied ? "Copied" : "Copy code"}
                          whileTap={{ scale: 0.97 }}
                          transition={{
                            type: "spring",
                            stiffness: 900,
                            damping: 45,
                          }}
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(block.code);
                              setCopiedKey(key);
                              if (resetTimerRef.current !== null) {
                                window.clearTimeout(resetTimerRef.current);
                              }
                              resetTimerRef.current = window.setTimeout(() => {
                                setCopiedKey(null);
                              }, 2000);
                            } catch {
                              // no-op
                            }
                          }}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {isCopied ? (
                              <motion.span
                                key="check"
                                {...copyIconMotion}
                                className="inline-flex"
                              >
                                <CheckIcon className="size-3.5" />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                {...copyIconMotion}
                                className="inline-flex"
                              >
                                <CopyIcon className="size-3" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                        <code
                          className="block font-mono text-xs leading-5 text-foreground whitespace-pre"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </pre>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}

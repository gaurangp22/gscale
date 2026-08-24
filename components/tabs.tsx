"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type SectionTab = {
  key: string;
  label: string;
  sub?: string;
  count?: number;
  /** URL hashes that should activate this tab (deep links), plus its key. */
  hashes?: string[];
  content: ReactNode;
};

export function SectionTabs({
  items,
  ariaLabel,
}: {
  items: SectionTab[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState(items[0].key);

  const keySig = useMemo(
    () => items.map((item) => [item.key, ...(item.hashes ?? [])].join("|")).join(","),
    [items]
  );

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const match = items.find((item) =>
        [item.key, ...(item.hashes ?? [])].some((key) => hash.startsWith(key))
      );
      if (!match) return;
      setActive(match.key);

      /* The target section only mounts once its tab is active, so the
         browser's own hash scroll has already failed by now. Scroll it in
         ourselves on the next frame, after React has committed the pane. */
      requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      });
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySig]);

  const current = items.find((item) => item.key === active) ?? items[0];

  /* Mirror the selection into the URL so refresh, back/forward, and shared
     links restore it — replaceState avoids a scroll jump. */
  const select = (key: string) => {
    setActive(key);
    if (typeof window === "undefined") return;

    const item = items.find((entry) => entry.key === key);
    const anchor =
      item?.hashes?.find(
        (hash) =>
          !["inbound", "outbound", "featured-events", "featured-visits"].includes(hash)
      ) ?? key;

    window.history.replaceState(null, "", `#${anchor}`);
  };

  return (
    <div>
      <div
        className="sticky top-[var(--nav-h)] z-30 -mx-5 border-b border-ink/15 bg-paper/92 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20"
        role="tablist"
        aria-label={ariaLabel}
      >
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((tab, index) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(tab.key)}
                className={cn(
                  "group relative shrink-0 border-0 bg-transparent py-6 pr-12 text-left",
                  "transition-colors duration-300"
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "font-mono text-[11px] tabular-nums tracking-[0.14em] transition-colors duration-300",
                      isActive ? "text-crimson" : "text-stone"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[19px] font-medium tracking-[-0.03em] transition-colors duration-300",
                      isActive ? "text-ink" : "text-stone group-hover:text-ink"
                    )}
                  >
                    {tab.label}
                  </span>
                  {tab.count !== undefined && (
                    <span
                      className={cn(
                        "font-mono text-[11px] tabular-nums transition-colors duration-300",
                        isActive ? "text-crimson" : "text-stone"
                      )}
                    >
                      ({tab.count})
                    </span>
                  )}
                </span>

                {tab.sub && (
                  <span
                    className={cn(
                      "mt-1.5 block text-[12.5px] transition-colors duration-300",
                      isActive ? "text-soot" : "text-stone"
                    )}
                  >
                    {tab.sub}
                  </span>
                )}

                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-crimson transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "w-[calc(100%-3rem)]" : "w-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" className="mt-16">
        {current.content}
      </div>
    </div>
  );
}

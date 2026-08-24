"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type RailItem = { id: string; label: string };

/**
 * Sticky numbered index that tracks which section is in view.
 * Used only on the partnerships dossier — it is that page's
 * navigational metaphor, not a site-wide component.
 */
export function SectionRail({ items }: { items: readonly RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        /* Pick the entry nearest the top of the reading area. */
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sections" className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
      <ol className="border-t border-ink/15">
        {items.map((item, index) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="border-b border-ink/12">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-baseline gap-4 py-4"
              >
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
                    "text-[13.5px] font-medium leading-[1.4] transition-colors duration-300",
                    isActive ? "text-ink" : "text-stone group-hover:text-ink"
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto h-px self-center bg-crimson transition-all duration-500",
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

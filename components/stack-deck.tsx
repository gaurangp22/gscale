"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* ═══ Stack deck ══════════════════════════════════════════════════════════
   Cards that file on top of each other as the page scrolls. The stacking
   itself is plain `position: sticky` — each card pins a little lower than
   the one before it, so the deck's top edge shows a stepped series of edges
   and tabs, like sheets left in a tray.

   The JavaScript only carries the polish: as the next card travels up, the
   card being covered eases back in scale and dims, which is what makes the
   pile read as depth rather than overlap; and a small HUD — frame counter
   plus dots — tracks which sheet is on top. One scroll listener, one rAF,
   transforms only. Without JS the deck still stacks; it just doesn't
   breathe. */

export function StackDeck({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const dotRefs = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>(":scope > .stack-card"),
    );
    if (cards.length < 2) return;

    const count = cards.length;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;

      for (let i = 0; i < count - 1; i++) {
        const card = cards[i];
        const cardTop = card.getBoundingClientRect().top;
        const nextTop = cards[i + 1].getBoundingClientRect().top;
        const travel = vh - cardTop;
        const progress = travel > 1 ? (vh - nextTop) / travel : 0;
        card.style.setProperty(
          "--p",
          Math.min(1, Math.max(0, progress)).toFixed(3),
        );
      }

      /* Deck-level progress drives the HUD. */
      const rect = el.getBoundingClientRect();
      const total = rect.height - vh;
      const deckProgress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const step = Math.min(count - 1, Math.floor(deckProgress * count));
      if (countRef.current) {
        countRef.current.textContent = String(step + 1).padStart(2, "0");
      }
      dotRefs.current.forEach((dot, i) => {
        if (dot) dot.dataset.on = i <= step ? "true" : "false";
      });
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);

    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={cn("stack-deck", className)}>
      <div className="stack-hud" aria-hidden>
        <span className="stack-dots">
          {items.map((_, i) => (
            <i
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              data-on={i === 0 ? "true" : "false"}
            />
          ))}
        </span>
        <span className="stack-counter">
          <em ref={countRef}>01</em> / {String(items.length).padStart(2, "0")}
        </span>
      </div>
      {items}
    </div>
  );
}

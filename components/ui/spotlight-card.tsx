"use client";

/**
 * Spotlight Card — adapted from Aceternity UI's Card Spotlight / Glowing Effect.
 * Reworked for this project: a crimson radial that tracks the cursor across a
 * sharp-cornered panel, plus a hairline border that lights up on approach.
 * No colour outside the brand palette, and it degrades to a plain panel when
 * the pointer is coarse or motion is reduced.
 */

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
  tone = "light",
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  /** "light" = paper ground. "dark" = midnight ground. */
  tone?: "light" | "dark";
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  const dark = tone === "dark";
  const glow = dark ? "rgb(189 22 34 / 0.20)" : "rgb(189 22 34 / 0.10)";

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      className={cn(
        "group relative isolate overflow-hidden border transition-colors duration-500",
        dark
          ? "border-white/12 bg-coal hover:border-white/25"
          : "border-ink/12 bg-white hover:border-ink/30",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 motion-reduce:hidden"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

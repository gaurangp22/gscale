"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   The film's grammar.

   A Scene is a tall section with a pinned, full-screen stage. Its scroll
   progress (0 → 1) is the camera: every layer, colour grade and caption
   in the scene is a function of that one number. Nothing loops on a
   timer except the few things that live on their own — a kite, a flame.

   Progress is derived through a plain function so motion keeps it on the
   JS path; hardware scroll timelines drop their values outside the range.
   ───────────────────────────────────────────────────────────────────────── */

export type P = MotionValue<number>;

export function Scene({
  id,
  length = 260,
  className,
  label,
  children,
}: {
  id: string;
  /** Scroll length in vh; the stage itself is always one screen. */
  length?: number;
  className?: string;
  label: string;
  children: (p: P) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));

  // Ambient loops (stars, kites, flames) only run while the scene is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.live = e.isIntersecting ? "true" : "false";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("scene", className)}
      style={{ height: `${length}svh` } as CSSProperties}
      aria-label={label}
      data-chapter={id}
    >
      <div className="stage">{children(p)}</div>
    </section>
  );
}

/**
 * One painted layer. Every layer shares a 1600 × 1000 canvas whose
 * horizon sits low and whose subject sits in the middle third, so that
 * `slice` cropping keeps the monument on a phone held upright.
 */
export function Layer({
  children,
  style,
  className,
  origin = "50% 76%",
  fit = "xMidYMax slice",
  viewBox = "0 0 1600 1000",
}: {
  children: ReactNode;
  style?: Record<string, unknown>;
  className?: string;
  origin?: string;
  fit?: string;
  viewBox?: string;
}) {
  return (
    <motion.div className={cn("layer", className)} style={{ transformOrigin: origin, ...style }}>
      <svg viewBox={viewBox} preserveAspectRatio={fit} aria-hidden>
        {children}
      </svg>
    </motion.div>
  );
}

/** A caption block that fades up inside [from, to] and out after `out`. */
export function Caption({
  p,
  at,
  out = 1.1,
  className,
  children,
}: {
  p: P;
  at: [number, number];
  out?: number;
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(p, [at[0], at[1], out - 0.08, out], [0, 1, 1, out > 1 ? 1 : 0]);
  const y = useTransform(p, [at[0], at[1]], [28, 0]);
  return (
    <motion.div className={cn("caption", className)} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

/** Deterministic pseudo-random, rounded so server and client agree. */
export function seeded(i: number, n: number) {
  const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
  return Math.round((v - Math.floor(v)) * 1000) / 1000;
}

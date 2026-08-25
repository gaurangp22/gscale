"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "fade" | "left" | "right" | "scale" | "wipe";

/**
 * Scroll-triggered entrance. `variant` picks the motion; `wipe` unveils
 * headline type with a clip-path rather than fading it, which reads far
 * better at display sizes.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* If the observer is unavailable, show the content rather than
       leaving it stranded at opacity 0. */
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      /* Threshold 0 rather than a ratio: a section taller than the viewport can
         never reach a high ratio, and a fast scroll can skip past a low one
         before the callback lands — both leave a screen of blank paper. */
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-variant={variant}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Animates its direct children in sequence from a single observer —
 * cheaper and better synchronised than one Reveal per child.
 */
export function Stagger({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* If the observer is unavailable, show the content rather than
       leaving it stranded at opacity 0. */
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={cn("stagger", className)}>
      {children}
    </Tag>
  );
}

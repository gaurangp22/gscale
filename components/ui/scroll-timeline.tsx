"use client";

/**
 * Scroll Timeline — adapted from Aceternity UI's Timeline component.
 * Changes for this project: the progress rail is a crimson hairline rather
 * than a purple/blue gradient, the sticky date column uses mono metadata,
 * and each node scales as it becomes active instead of staying inert.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  /** Short mono label — a date or period. */
  label: string;
  /** Secondary mono line, e.g. the category. */
  meta?: string;
  accent?: boolean;
  content: ReactNode;
};

export function ScrollTimeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={railRef} className="relative">
        {/* Static rail. */}
        <div
          aria-hidden
          className="absolute left-[7px] top-0 hidden w-px bg-ink/12 md:left-[187px] md:block"
          style={{ height }}
        />
        {/* Scroll-linked fill. */}
        <motion.div
          aria-hidden
          style={{ height: fillHeight, opacity: fillOpacity }}
          className="absolute left-[7px] top-0 hidden w-px bg-crimson md:left-[187px] md:block"
        />

        {items.map((item, index) => (
          <TimelineRow key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Defer so the flag is set from outside the effect body.
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group relative grid gap-6 border-b border-ink/12 py-14 md:grid-cols-[188px_1fr] md:gap-16"
    >
      <div className="md:sticky md:top-32 md:self-start md:pr-14 md:text-right">
        <p
          className={cn(
            "font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-500",
            item.accent ? "text-crimson" : "text-ink"
          )}
        >
          {item.label}
        </p>
        {item.meta && (
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-stone">
            {item.meta}
          </p>
        )}
      </div>

      {/* Node sitting on the rail. */}
      <span
        aria-hidden
        className={cn(
          "absolute left-[3px] top-[4.1rem] hidden h-2 w-2 transition-all duration-700 md:left-[183px] md:block",
          seen ? "scale-100 bg-crimson" : "scale-50 bg-ink/25"
        )}
        style={{ transitionDelay: `${index * 40}ms` }}
      />

      <div
        className={cn(
          "min-w-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}
      >
        {item.content}
      </div>
    </article>
  );
}

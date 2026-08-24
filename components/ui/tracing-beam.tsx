"use client";

/**
 * Tracing Beam — adapted from Aceternity UI (ui.aceternity.com/components/tracing-beam).
 * Rewritten for this project: brand palette only (crimson over an ink hairline),
 * a straight rule instead of the original stepped path, and it re-measures on
 * resize so the beam still spans the column after a reflow.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.85], [0, height]), {
    stiffness: 420,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, height - 180]), {
    stiffness: 420,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn("relative w-full", className)}>
      <div className="absolute -left-4 top-0 hidden md:block">
        <svg
          viewBox={`0 0 8 ${height}`}
          width="8"
          height={height}
          className="block"
          aria-hidden
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2={height}
            stroke="rgb(17 17 17 / 0.14)"
            strokeWidth="1"
          />
          <motion.line
            x1="4"
            y1="0"
            x2="4"
            y2={height}
            stroke="url(#beam)"
            strokeWidth="2"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="beam"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#bd1622" stopOpacity="0" />
              <stop stopColor="#bd1622" />
              <stop offset="0.7" stopColor="#920c16" />
              <stop offset="1" stopColor="#920c16" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

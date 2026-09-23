"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Sets `data-in="true"` the first time the block scrolls into view. The
 * programme notes animate once, off this flag, and then hold still.
 */
export function InView({
  as: Tag = "div",
  className,
  style,
  children,
  threshold = 0.25,
  ...rest
}: {
  as?: "div" | "section" | "ol" | "dl" | "header";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  threshold?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  const T = Tag as "div";
  return (
    <T ref={ref as React.Ref<HTMLDivElement>} className={className} style={style} {...rest}>
      {children}
    </T>
  );
}

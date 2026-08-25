"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Adds `data-inview="true"` the first time the element crosses into view.
 * Everything in this file drives its animation off that one attribute, so
 * a section costs exactly one observer no matter how much is moving.
 */
export function useInView<T extends HTMLElement>(threshold = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.inview = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.inview = "true";
          io.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

/* ═══ Kinetic type ════════════════════════════════════════════════════════
   Display headlines rise word by word out of their own baseline rather
   than fading. Each word gets a clipping box, so the motion reads as type
   being set rather than as an element sliding around. */

export function SplitText({
  text,
  accent,
  as: Tag = "span",
  className,
  delay = 0,
  step = 52,
}: {
  text: string;
  /** Substring rendered in crimson — the one word carrying the claim. */
  accent?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Milliseconds between consecutive words. */
  step?: number;
}) {
  const ref = useInView<HTMLElement>();

  const accentWords = accent ? accent.trim().split(/\s+/) : [];
  const words = text.split(/\s+/);

  /* Match the accent as a contiguous run so a repeated word elsewhere in
     the headline is not highlighted by accident. */
  let accentStart = -1;
  if (accentWords.length) {
    for (let i = 0; i + accentWords.length <= words.length; i++) {
      if (accentWords.every((word, j) => words[i + j] === word)) {
        accentStart = i;
        break;
      }
    }
  }

  return (
    <Tag ref={ref} className={cn("split", className)} data-inview="false">
      {/* One accessible copy of the line; the animated pieces are hidden. */}
      <span className="split-sr">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => {
          const marked =
            accentStart >= 0 &&
            index >= accentStart &&
            index < accentStart + accentWords.length;
          return (
            <span className="split-word" key={`${word}-${index}`}>
              <span
                className={cn("split-inner", marked && "split-accent")}
                style={{ "--i": index, "--split-delay": `${delay}ms`, "--split-step": `${step}ms` } as Vars}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

/* ═══ Magnetic ════════════════════════════════════════════════════════════
   Pulls toward the cursor as it approaches. Only for fine pointers — on
   touch there is no hover state to reward, and the transform would just
   fight the tap. */

export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let frame = 0;
    let settled = true;

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.16;
      eased.y += (target.y - eased.y) * 0.16;
      el.style.transform = `translate3d(${eased.x.toFixed(2)}px, ${eased.y.toFixed(2)}px, 0)`;

      const done =
        Math.abs(target.x - eased.x) < 0.05 && Math.abs(target.y - eased.y) < 0.05;
      if (done && settled) {
        el.style.transform = "";
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      settled = false;
      wake();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      settled = true;
      wake();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [strength, reduced]);

  return (
    <span ref={ref} className={cn("magnetic", className)}>
      {children}
    </span>
  );
}

/* ═══ Parallax ════════════════════════════════════════════════════════════
   Scroll-linked drift. Positive speed lags the scroll, negative leads it.
   Driven from one shared rAF pass so a page full of these still only
   writes transforms once per frame. */

const parallaxNodes = new Set<{ el: HTMLElement; speed: number }>();
let parallaxFrame = 0;
let parallaxListening = false;

function runParallax() {
  parallaxFrame = 0;
  const viewport = window.innerHeight;
  for (const node of parallaxNodes) {
    const rect = node.el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > viewport + 200) continue;
    // 0 at the viewport center, ±1 at the edges.
    const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
    const shift = progress * node.speed * -100;
    node.el.style.setProperty("--parallax", `${shift.toFixed(2)}px`);
  }
}

function scheduleParallax() {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(runParallax);
}

export function Parallax({
  children,
  speed = 0.12,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const node = { el, speed };
    parallaxNodes.add(node);

    if (!parallaxListening) {
      parallaxListening = true;
      window.addEventListener("scroll", scheduleParallax, { passive: true });
      window.addEventListener("resize", scheduleParallax, { passive: true });
    }
    scheduleParallax();

    return () => {
      parallaxNodes.delete(node);
      el.style.removeProperty("--parallax");
      if (parallaxNodes.size === 0 && parallaxListening) {
        parallaxListening = false;
        window.removeEventListener("scroll", scheduleParallax);
        window.removeEventListener("resize", scheduleParallax);
        if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
        parallaxFrame = 0;
      }
    };
  }, [speed, reduced]);

  return (
    <Tag ref={ref} className={cn("parallax", className)}>
      {children}
    </Tag>
  );
}

/* ═══ Spotlight ═══════════════════════════════════════════════════════════
   Writes pointer position into custom properties so a panel can carry a
   soft crimson wash under the cursor. Pure CSS from there. */

export function Spotlight({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /* Callers key styling off data attributes (data-direction, for one), so
     anything extra has to reach the rendered element rather than be eaten
     by the wrapper. */
  [key: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const write = () => {
      frame = 0;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width) * 100;
      y = ((event.clientY - rect.top) / rect.height) * 100;
      if (!frame) frame = requestAnimationFrame(write);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Tag ref={ref} className={cn("spotlight", className)} {...rest}>
      {children}
    </Tag>
  );
}

/* ═══ Scroll progress ═════════════════════════════════════════════════════ */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden />;
}

/* ═══ Counter ═════════════════════════════════════════════════════════════
   Counts up once, when it first arrives on screen. */

export function Counter({
  to,
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useInView<HTMLSpanElement>(0.5);
  const valueRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = ref.current;
    const value = valueRef.current;
    if (!host || !value) return;

    if (reduced) {
      value.textContent = String(to);
      return;
    }

    let frame = 0;
    let started = 0;

    const tick = (now: number) => {
      if (!started) started = now;
      const t = Math.min(1, (now - started) / duration);
      // Ease-out quint: fast off the mark, long settle.
      const eased = 1 - Math.pow(1 - t, 5);
      value.textContent = String(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new MutationObserver(() => {
      if (host.dataset.inview === "true" && !frame) {
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      }
    });

    if (host.dataset.inview === "true") frame = requestAnimationFrame(tick);
    else observer.observe(host, { attributes: true, attributeFilter: ["data-inview"] });

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration, reduced, ref]);

  return (
    <span ref={ref} className={cn("counter", className)} data-inview="false">
      <span ref={valueRef}>0</span>
      {suffix}
    </span>
  );
}

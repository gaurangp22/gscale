"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Window furniture: the pointer ring and the page rail.

   Both are decoration with a job. The ring gives the cursor some weight
   over interactive elements; the rail turns the empty right margin into a
   position indicator for the page. Neither is load-bearing — both are off
   for coarse pointers, narrow viewports, and reduced motion.
   ───────────────────────────────────────────────────────────────────────── */

/**
 * A ring that trails the cursor and swells over anything clickable. The
 * native cursor is left alone: this rides alongside it rather than
 * replacing it, so nothing about pointing at the page gets worse.
 */
export function CursorRing() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let frame = 0;
    let visible = false;

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.17;
      eased.y += (target.y - eased.y) * 0.17;
      ring.style.transform = `translate3d(${eased.x.toFixed(1)}px, ${eased.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    const INTERACTIVE = "a, button, summary, input, select, textarea, [role='tab'], .magnetic";

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        ring.dataset.visible = "true";
      }
      const over = (event.target as Element | null)?.closest?.(INTERACTIVE);
      ring.dataset.active = over ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      ring.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      ring.remove();
    };
  }, [reduced]);

  return null;
}

type RailSection = { id: string; label: string };

/** Trims a heading down to something that fits a 200px tooltip. */
function shorten(text: string, max = 34) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/**
 * The page rail. Reads whatever sections the current page rendered, labels
 * each from its eyebrow or heading, and tracks which one is on screen —
 * so it stays correct without any page having to declare anything.
 */
export function PageRail() {
  const pathname = usePathname();
  const [sections, setSections] = useState<RailSection[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    let io: IntersectionObserver | undefined;

    /* Read the page one frame after paint. The rail is derived from whatever
       the route rendered, so it has to wait for that render to land — and
       deferring keeps this out of the synchronous effect body. */
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(main.children).filter(
        (node): node is HTMLElement =>
          node instanceof HTMLElement && node.tagName === "SECTION",
      );

      const found: RailSection[] = [];
      nodes.forEach((node, index) => {
        const eyebrow = node.querySelector(".eyebrow")?.textContent;
        const heading = node.querySelector("h1, h2")?.textContent;
        const label = shorten(eyebrow || heading || `Section ${index + 1}`);
        if (!node.id) node.id = `rail-${index}`;
        found.push({ id: node.id, label });
      });

      setSections(found);
      setActive(0);

      /* The section occupying the upper third of the viewport is the one
         being read. Simple, and it never flickers between two sections that
         are both technically intersecting. */
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = nodes.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        },
        { rootMargin: "-33% 0px -60% 0px" },
      );

      nodes.forEach((node) => io?.observe(node));
    });

    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [pathname]);

  if (sections.length < 3) return null;

  return (
    <nav className="page-rail" aria-label="Page sections">
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-active={index === active ? "true" : "false"}
              aria-current={index === active ? "true" : undefined}
            >
              <span className="page-rail-label">{section.label}</span>
              <i aria-hidden />
              <span className="sr-only">{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

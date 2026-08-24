import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";
import { Reveal } from "./reveal";

/* ── Eyebrow ────────────────────────────────────────────────────
   Mono metadata line. `tick` prefixes a crimson rule; `index` turns
   it into a numbered editorial marker.                            */

export function Eyebrow({
  children,
  index,
  tick = false,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  index?: number;
  tick?: boolean;
  tone?: "dark" | "light" | "crimson";
  className?: string;
}) {
  return (
    <p
      className={cn(
        tone === "light" ? "eyebrow-light" : tone === "crimson" ? "eyebrow-crimson" : "eyebrow",
        tick && "eyebrow-tick",
        className
      )}
    >
      {index !== undefined && (
        <span className="mr-3 text-crimson">{String(index).padStart(2, "0")}</span>
      )}
      {children}
    </p>
  );
}

/* ── Section head ───────────────────────────────────────────────
   Shared type rhythm for section openings. Layout deliberately
   varies per page via `align`, so the same component never
   produces the same-looking section twice.                       */

export function SectionHead({
  eyebrow,
  title,
  accent,
  lede,
  tone = "dark",
  align = "left",
  size = "headline",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  lede?: string;
  tone?: "dark" | "light";
  align?: "left" | "center" | "split";
  size?: "headline" | "display";
  action?: ReactNode;
  className?: string;
}) {
  const light = tone === "light";

  const heading = (
    <h2
      className={cn(
        "font-display font-medium text-balance",
        size === "display" ? "text-display" : "text-headline",
        light ? "text-white" : "text-ink"
      )}
    >
      {title}
      {accent && <span className="text-crimson">{accent}</span>}
    </h2>
  );

  const body = lede && (
    <p
      className={cn(
        "mt-6 text-[16.5px] leading-[1.65] text-pretty",
        light ? "text-white/65" : "text-soot",
        align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
      )}
    >
      {lede}
    </p>
  );

  if (align === "split") {
    return (
      <Reveal
        className={cn(
          "grid gap-8 border-b pb-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16",
          light ? "border-white/18" : "border-ink/15",
          className
        )}
      >
        <div>
          {eyebrow && (
            <Eyebrow tick tone={light ? "light" : "dark"} className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}
          {heading}
        </div>
        <div className="lg:pb-1">
          {lede && (
            <p
              className={cn(
                "text-[16.5px] leading-[1.65] text-pretty",
                light ? "text-white/65" : "text-soot"
              )}
            >
              {lede}
            </p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <Eyebrow
          tick={align !== "center"}
          tone={light ? "light" : "dark"}
          className={cn("mb-6", align === "center" && "justify-center")}
        >
          {eyebrow}
        </Eyebrow>
      )}
      {heading}
      {body}
      {action && <div className={cn("mt-8", align === "center" && "flex justify-center")}>{action}</div>}
    </Reveal>
  );
}

/* ── CTA band ───────────────────────────────────────────────────
   One component for every "get in touch" prompt on the site.
   Previously this markup was pasted in five places.               */

export function CtaBand({
  text,
  label,
  href = "/contact",
  external = false,
  className,
}: {
  text: string;
  label: string;
  href?: string;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </>
  );

  return (
    <Reveal
      className={cn(
        "panel-accent hatch flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-8",
        className
      )}
    >
      <p className="max-w-2xl text-[15px] leading-[1.65] text-soot text-pretty">{text}</p>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className="btn-primary btn-sm shrink-0">
          {inner}
        </a>
      ) : (
        <Link href={href} className="btn-primary btn-sm shrink-0">
          {inner}
        </Link>
      )}
    </Reveal>
  );
}

/* ── Chip ───────────────────────────────────────────────────────
   Mono metadata tag with a crimson leading rule.                  */

export function Chip({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.13em]",
        tone === "light" ? "text-white/60" : "text-stone"
      )}
    >
      <span aria-hidden className="h-px w-4 bg-crimson" />
      {children}
    </span>
  );
}

/* ── Spec table ─────────────────────────────────────────────────
   Label/value pairs as a ruled ledger rather than boxed cards.    */

export function SpecTable({
  rows,
  tone = "dark",
  className,
}: {
  rows: readonly { label: string; value: string }[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <dl className={cn("border-t", light ? "border-white/18" : "border-ink/15", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className={cn(
            "grid gap-1 border-b py-4 sm:grid-cols-[minmax(150px,0.4fr)_1fr] sm:gap-8",
            light ? "border-white/12" : "border-ink/10"
          )}
        >
          <dt
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.14em]",
              light ? "text-white/60" : "text-stone"
            )}
          >
            {row.label}
          </dt>
          <dd className={cn("text-[15px] leading-[1.6]", light ? "text-white/85" : "text-ink")}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Tick list ──────────────────────────────────────────────────
   Crimson hairline bullets. Shared by every page.                 */

export function TickList({
  items,
  tone = "dark",
  className,
}: {
  items: readonly string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "tick-list space-y-3 text-[15px]",
        tone === "light" ? "text-white/70" : "text-soot",
        className
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* ── Numbered steps ─────────────────────────────────────────────*/

export function StepList({
  steps,
  tone = "dark",
  className,
}: {
  steps: readonly string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <ol className={cn("border-t", light ? "border-white/18" : "border-ink/15", className)}>
      {steps.map((step, index) => (
        <li
          key={step}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-5 border-b py-5",
            light ? "border-white/12" : "border-ink/10"
          )}
        >
          <span className="numeral pt-1">{String(index + 1).padStart(2, "0")}</span>
          <p className={cn("text-[15px] leading-[1.65]", light ? "text-white/70" : "text-soot")}>
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ── Background video ───────────────────────────────────────────
   Muted, decorative, and swapped for a still under reduced motion. */

export function BackgroundVideo({
  objectPosition = "center",
  className,
}: {
  objectPosition?: string;
  className?: string;
}) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/campus-bg.jpg"
        aria-hidden
        className={cn("media-cover pointer-events-none motion-reduce:hidden", className)}
        style={{ objectPosition }}
      >
        <source src="/parisamuad-3.0.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        style={{ backgroundPosition: objectPosition }}
        className="absolute inset-0 hidden bg-[url('/campus-bg.jpg')] bg-cover motion-reduce:block"
      />
    </>
  );
}

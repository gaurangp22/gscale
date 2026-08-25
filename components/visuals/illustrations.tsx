"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   G-SCALE illustration family.

   One drawing language across the whole site: hairline ink linework on
   paper, crimson reserved for the single element that carries the meaning,
   and blueprint furniture (dashed guides, tick marks, node dots) holding
   the composition together. No hue outside the brand pair.

   Every stroke marked `.il-draw` carries `pathLength={1}`, so the draw-in
   animation is expressed in normalised 0–1 space and one CSS rule can
   animate paths of wildly different real lengths in step. The `--i` custom
   property sequences them; the stylesheet turns it into a delay.

   Motion is opt-out, not opt-in: the reduced-motion block in site.css
   lands every illustration in its finished state immediately.
   ───────────────────────────────────────────────────────────────────────── */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* Math.cos and Math.sin are allowed to differ by an ulp between engines, so
   raw trig output can render one string on the server and another in the
   browser — a hydration mismatch. Every derived coordinate goes through
   this first. Two decimals is far finer than a 200-unit viewBox can show. */
const at = (value: number) => Math.round(value * 100) / 100;

/** Stroke that draws itself in, sequenced by `i`. */
const draw = (i = 0) => ({
  pathLength: 1,
  className: "il-draw",
  style: { "--i": i } as Vars,
});

/** Crimson stroke that draws itself in. */
const accent = (i = 0) => ({
  pathLength: 1,
  className: "il-draw il-accent",
  style: { "--i": i } as Vars,
});

/** Node or dot that scales up from nothing. */
const pop = (i = 0) => ({
  className: "il-pop",
  style: { "--i": i } as Vars,
});

const popAccent = (i = 0) => ({
  className: "il-pop il-accent-fill",
  style: { "--i": i } as Vars,
});

/** Shape whose fill fades in. */
const fade = (i = 0) => ({
  className: "il-fade",
  style: { "--i": i } as Vars,
});

/** Crimson shape that fades in. Used where the element is already placed
    by a transform attribute, which a CSS scale would otherwise override. */
const fadeAccent = (i = 0) => ({
  className: "il-fade il-accent-fill",
  style: { "--i": i } as Vars,
});

/**
 * Illustration shell. Holds the dotted blueprint ground, the accessible
 * label, and the in-view trigger that releases every draw-in inside it.
 */
export function Figure({
  label,
  children,
  className,
  viewBox = "0 0 200 160",
  bare = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  viewBox?: string;
  /** Drops the framed paper ground — for illustrations placed on their own. */
  bare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Without an observer, show the finished drawing rather than stranding
       it at dashoffset 1. */
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.drawn = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.drawn = "true";
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("illus", bare && "illus-bare", className)}
      data-drawn="false"
      role="img"
      aria-label={label}
    >
      <svg viewBox={viewBox} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

/* ═══ Auditorium — quality education ══════════════════════════════════════
   An amphitheatre in section. Tiered arcs read as an audience without
   drawing a single face, and the crimson lectern is the only saturated
   thing on the page. */

const SEAT_ROWS = [
  { r: 34, i: 3 },
  { r: 50, i: 4 },
  { r: 66, i: 5 },
] as const;

function seatDots(r: number) {
  // Five evenly spaced seats per tier, measured off the arc's own center.
  return [30, 60, 90, 120, 150].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: at(100 + r * Math.cos(rad)), y: at(134 - r * Math.sin(rad)) };
  });
}

export function AuditoriumIllustration({ className }: { className?: string }) {
  return (
    <Figure label="An amphitheatre in section, tiered seating facing a lectern" className={className}>
      <path {...draw(0)} d="M18 134H182" />

      {SEAT_ROWS.map(({ r, i }) => (
        <path key={r} {...draw(i)} d={`M${100 - r} 134A${r} ${r} 0 0 1 ${100 + r} 134`} />
      ))}

      {SEAT_ROWS.flatMap(({ r }, row) =>
        seatDots(r).map((seat, index) => (
          <circle
            key={`${r}-${index}`}
            {...pop(6 + row * 2 + index * 0.4)}
            cx={seat.x}
            cy={seat.y}
            r={2.4}
          />
        )),
      )}

      {/* Knowledge leaving the lectern — dashed so it reads as projection. */}
      <path {...accent(9)} className="il-draw il-accent il-dashed" d="M100 114 70 62" />
      <path {...accent(10)} className="il-draw il-accent il-dashed" d="M100 112V44" />
      <path {...accent(11)} className="il-draw il-accent il-dashed" d="M100 114l30-52" />

      <rect {...fade(2)} className="il-fade il-accent-fill" x={93} y={116} width={14} height={18} />
      <path {...accent(2)} d="M88 116h24" />
    </Figure>
  );
}

/* ═══ Trail — purposeful learning ═════════════════════════════════════════
   A route crossing terrain, waypoints marked, a crimson flag where it
   arrives. The dashes march while the illustration is on screen. */

export function TrailIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A marked route crossing terrain toward a flag" className={className}>
      <path {...draw(2)} className="il-draw il-faint" d="M14 128q38-36 74 0" />
      <path {...draw(3)} className="il-draw il-faint" d="M72 128q48-52 96 0" />
      <path {...draw(0)} d="M14 132h172" />

      <path
        {...accent(4)}
        className="il-draw il-accent il-dashed il-march"
        d="M26 138c34-6 38-32 72-38s42-34 80-42"
      />

      <g {...pop(7)}>
        <path className="il-node" d="M26 132l6 6-6 6-6-6z" />
      </g>
      <g {...pop(8)}>
        <path className="il-node" d="M98 94l6 6-6 6-6-6z" />
      </g>

      <path {...accent(9)} d="M178 58V30" />
      <path {...popAccent(10)} d="M178 32l20 8-20 8z" />
      <circle {...pop(6)} className="il-pop il-accent-fill" cx={178} cy={58} r={3.4} />
    </Figure>
  );
}

/* ═══ Filament — innovation and entrepreneurship ══════════════════════════ */

export function FilamentIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A lightbulb with a crimson filament, circled by orbit rings" className={className}>
      <g className="il-orbit">
        <ellipse {...draw(6)} className="il-draw il-faint" cx={100} cy={78} rx={74} ry={26} transform="rotate(-24 100 78)" />
        <ellipse {...draw(7)} className="il-draw il-faint" cx={100} cy={78} rx={74} ry={26} transform="rotate(28 100 78)" />
      </g>

      <path
        {...draw(0)}
        d="M100 30c22 0 40 17 40 39 0 15-9 24-15 32-4 6-6 10-6 15H81c0-5-2-9-6-15-6-8-15-17-15-32 0-22 18-39 40-39Z"
      />
      <path {...draw(2)} d="M82 124h36" />
      <path {...draw(3)} d="M85 132h30" />
      <path {...draw(4)} d="M90 140h20" />

      <path {...accent(5)} d="M86 96l7-22 7 15 7-15 7 22" />

      <path {...accent(8)} d="M100 12v10" />
      <path {...accent(9)} d="M52 30l7 7" />
      <path {...accent(10)} d="M148 30l-7 7" />

      <circle {...popAccent(11)} cx={168} cy={62} r={3} />
      <circle {...pop(12)} cx={34} cy={96} r={2.6} />
    </Figure>
  );
}

/* ═══ Departure — outbound mobility ═══════════════════════════════════════ */

export function DepartureIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A route arcing up and away from a departure gate" className={className}>
      <path {...draw(0)} d="M10 140h180" />

      <path {...draw(1)} d="M24 140v-34a18 18 0 0 1 36 0v34" />
      <path {...draw(2)} className="il-draw il-faint" d="M32 140v-26h20v26" />
      <path {...draw(3)} className="il-draw il-faint" d="M42 114v26" />

      <path
        {...accent(4)}
        className="il-draw il-accent il-dashed il-march"
        d="M50 128c40-2 62-16 84-64"
      />

      <g className="il-lift">
        <path {...fadeAccent(7)} d="M0 0l30 11-14 4-4 13z" transform="translate(126 46) rotate(-24)" />
      </g>

      {/* Passport stamp, set at an angle the way a real one lands. */}
      <g transform="rotate(-12 158 116)">
        <rect {...draw(8)} className="il-draw il-accent il-dashed" x={136} y={98} width={44} height={36} />
        <circle {...draw(9)} className="il-draw il-accent" cx={150} cy={116} r={8} />
        <path {...accent(10)} d="M164 111h12" />
        <path {...accent(11)} d="M164 120h8" />
      </g>

      <path {...draw(5)} className="il-draw il-faint" d="M76 140h18" />
      <path {...draw(6)} className="il-draw il-faint" d="M104 140h14" />
    </Figure>
  );
}

/* ═══ Arrival — inbound mobility ══════════════════════════════════════════ */

export function ArrivalIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A route descending toward a campus arch, marked with a pin" className={className}>
      <path {...draw(0)} d="M10 140h180" />

      <path {...draw(1)} d="M68 140v-34a32 32 0 0 1 64 0v34" />
      <path {...draw(2)} className="il-draw il-faint" d="M82 140v-30a18 18 0 0 1 36 0v30" />
      <path {...draw(3)} className="il-draw il-faint" d="M100 110v30" />

      <path
        {...accent(4)}
        className="il-draw il-accent il-dashed il-march"
        d="M186 34c-30 6-48 20-58 44"
      />

      <g className="il-lift">
        <path {...fadeAccent(7)} d="M0 0l30 11-14 4-4 13z" transform="translate(148 30) rotate(28)" />
      </g>

      <g className="il-pin">
        <path
          {...popAccent(8)}
          d="M100 62c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14Z"
        />
        <circle className="il-paper-fill" cx={100} cy={76} r={5} />
      </g>
      <circle {...draw(9)} className="il-draw il-accent il-ring" cx={100} cy={104} r={18} />

      <path {...draw(5)} className="il-draw il-faint" d="M22 140h26" />
      <path {...draw(6)} className="il-draw il-faint" d="M152 140h22" />
    </Figure>
  );
}

/* ═══ Bridge — institutional partnership ══════════════════════════════════
   Two institutions, one span, a crimson keystone at the join. The whole
   partnerships argument in one drawing. */

const WINDOW_ROWS = [86, 102, 118];
const WINDOW_COLS = [0, 16, 32];

export function BridgeIllustration({ className }: { className?: string }) {
  return (
    <Figure label="Two buildings joined by a bridge with a crimson keystone" className={className}>
      <path {...draw(0)} d="M6 140h188" />

      <path {...draw(1)} d="M18 140V74h48v66" />
      <path {...draw(2)} d="M134 140V74h48v66" />
      <path {...draw(3)} d="M14 74l28-18 28 18" />
      <path {...draw(4)} d="M130 74l28-18 28 18" />

      {WINDOW_ROWS.flatMap((y, row) =>
        WINDOW_COLS.flatMap((dx, col) => [
          <rect key={`l-${row}-${col}`} {...fade(6 + row + col * 0.3)} className="il-fade il-faint-fill" x={24 + dx} y={y} width={9} height={10} />,
          <rect key={`r-${row}-${col}`} {...fade(6 + row + col * 0.3)} className="il-fade il-faint-fill" x={140 + dx} y={y} width={9} height={10} />,
        ]),
      )}

      <path {...draw(5)} d="M66 100h68" />
      <path {...draw(8)} d="M66 100q34-30 68 0" />
      <path {...draw(9)} className="il-draw il-faint" d="M80 89v11" />
      <path {...draw(9)} className="il-draw il-faint" d="M100 84v16" />
      <path {...draw(9)} className="il-draw il-faint" d="M120 89v11" />

      <path {...popAccent(11)} d="M100 92l9 8-9 8-9-8z" />
    </Figure>
  );
}

/* ═══ Delegation — visiting academic delegations ══════════════════════════ */

const DELEGATES = [
  { x: 44, i: 4 },
  { x: 76, i: 5 },
  { x: 108, i: 6 },
  { x: 140, i: 7 },
] as const;

export function DelegationIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A delegation walking beneath a ceremonial arch" className={className}>
      <path {...draw(1)} className="il-draw il-faint il-dashed" d="M20 46q80-30 160 0" />
      <path {...draw(0)} d="M12 142h176" />

      {DELEGATES.map(({ x, i }, index) => {
        const lead = index === 2;
        return (
          <g key={x} className={lead ? "il-accent" : undefined}>
            <circle {...(lead ? popAccent(i) : pop(i))} cx={x} cy={92} r={7.5} />
            <path
              {...(lead ? accent(i + 1) : draw(i + 1))}
              d={`M${x - 12} 142c0-22 1-30 12-30s12 8 12 30`}
            />
          </g>
        );
      })}

      <path {...draw(9)} d="M172 142V56" />
      <path {...popAccent(10)} d="M172 58l22 8-22 8z" />

      <circle {...pop(2)} className="il-pop il-faint-fill" cx={26} cy={128} r={3} />
      <circle {...pop(3)} className="il-pop il-faint-fill" cx={186} cy={132} r={2.4} />
    </Figure>
  );
}

/* ═══ Round table — forums and events ═════════════════════════════════════ */

const SEATS = [18, 62, 106, 150, 198, 242, 286, 330] as const;

export function RoundTableIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A round table set for a forum, one place marked in crimson" className={className}>
      {SEATS.map((deg, index) => {
        const rad = (deg * Math.PI) / 180;
        const x = at(100 + 76 * Math.cos(rad));
        const y = at(92 + 46 * Math.sin(rad));
        const marked = index === 5;
        return (
          <rect
            key={deg}
            {...(marked ? { ...pop(6 + index), className: "il-pop il-accent-fill" } : pop(6 + index))}
            x={x - 9}
            y={y - 6}
            width={18}
            height={12}
            rx={3}
          />
        );
      })}

      <ellipse {...draw(0)} cx={100} cy={92} rx={62} ry={34} />
      <ellipse {...draw(2)} className="il-draw il-faint il-dashed" cx={100} cy={92} rx={44} ry={22} />
      <path {...draw(1)} d="M38 92v10a62 34 0 0 0 124 0V92" />

      <rect {...fade(14)} className="il-fade il-faint-fill" x={72} y={84} width={20} height={13} rx={1} />
      <rect {...fade(15)} className="il-fade il-accent-fill" x={108} y={88} width={20} height={13} rx={1} />
    </Figure>
  );
}

/* ═══ Orbit — research and academic exchange ══════════════════════════════ */

const ORBITS = [
  { rotate: 0, i: 2 },
  { rotate: 60, i: 3 },
  { rotate: 120, i: 4 },
] as const;

export function OrbitIllustration({ className }: { className?: string }) {
  return (
    <Figure label="Three orbits of research nodes circling a shared center" className={className}>
      <g className="il-orbit">
        {ORBITS.map(({ rotate, i }) => (
          <ellipse
            key={rotate}
            {...draw(i)}
            cx={100}
            cy={82}
            rx={72}
            ry={26}
            transform={`rotate(${rotate} 100 82)`}
          />
        ))}
      </g>

      {ORBITS.map(({ rotate }, index) => {
        const rad = (rotate * Math.PI) / 180;
        const dx = at(72 * Math.cos(rad));
        const dy = at(72 * Math.sin(rad));
        return (
          <g key={rotate}>
            <circle {...pop(7 + index)} cx={100 + dx} cy={82 + dy} r={4.6} />
            <circle {...pop(8 + index)} cx={100 - dx} cy={82 - dy} r={4.6} />
          </g>
        );
      })}

      <path {...draw(10)} className="il-draw il-faint il-dashed" d="M172 82 64 145" />
      <path {...draw(11)} className="il-draw il-faint il-dashed" d="M28 82l108 63" />

      <circle {...popAccent(12)} cx={100} cy={82} r={9} />
      <circle {...draw(13)} className="il-draw il-accent il-ring" cx={100} cy={82} r={20} />
    </Figure>
  );
}

/* ═══ Lattice — curriculum and coordination ═══════════════════════════════ */

const COLS = [38, 78, 122, 162];
const ROWS = [44, 88, 132];

export function LatticeIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A grid of departments with one crimson path routed through it" className={className}>
      {ROWS.map((y, row) => (
        <path key={`h-${y}`} {...draw(row)} className="il-draw il-faint" d={`M38 ${y}h124`} />
      ))}
      {COLS.map((x, col) => (
        <path key={`v-${x}`} {...draw(col)} className="il-draw il-faint" d={`M${x} 44v88`} />
      ))}

      {ROWS.flatMap((y, row) =>
        COLS.map((x, col) => (
          <circle key={`${x}-${y}`} {...pop(5 + row + col * 0.4)} className="il-pop il-faint-fill" cx={x} cy={y} r={3} />
        )),
      )}

      <path {...accent(9)} d="M38 132h40V88h44V44h40" />

      <circle {...popAccent(10)} cx={38} cy={132} r={5} />
      <circle {...popAccent(11)} cx={78} cy={88} r={5} />
      <circle {...popAccent(12)} cx={122} cy={88} r={5} />
      <circle {...popAccent(13)} cx={162} cy={44} r={5} />
    </Figure>
  );
}

/* ═══ Empty calendar — nothing open right now ═════════════════════════════
   Empty states get an illustration too. A blank month with one cell held
   open reads as "not yet" rather than "nothing here". */

export function EmptyCalendarIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A blank calendar month with one date held open" className={className}>
      <path {...draw(0)} d="M62 26v18" />
      <path {...draw(0)} d="M138 26v18" />
      <rect {...draw(1)} x={30} y={36} width={140} height={108} rx={2} />
      <path {...draw(2)} d="M30 62h140" />

      {[58, 86, 114, 142].map((x, index) => (
        <path key={x} {...draw(3 + index * 0.3)} className="il-draw il-faint" d={`M${x} 62v82`} />
      ))}
      {[89, 116].map((y, index) => (
        <path key={y} {...draw(4 + index * 0.3)} className="il-draw il-faint" d={`M30 ${y}h140`} />
      ))}

      <rect {...draw(6)} className="il-draw il-accent il-dashed il-march" x={87} y={90} width={26} height={25} />
      <circle {...popAccent(8)} cx={100} cy={102} r={3.4} />
    </Figure>
  );
}

/* ═══ Campus plan — where the office is ═══════════════════════════════════ */

export function CampusPlanIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A campus plan with the international office marked" className={className}>
      <rect {...draw(0)} className="il-draw il-faint il-dashed" x={14} y={22} width={172} height={124} />

      <path {...draw(1)} className="il-draw il-faint" d="M14 86h172" />
      <path {...draw(2)} className="il-draw il-faint" d="M86 22v124" />

      <rect {...draw(3)} x={30} y={42} width={44} height={32} />
      <rect {...draw(4)} x={102} y={38} width={52} height={28} />
      <rect {...draw(5)} x={110} y={96} width={56} height={38} />
      <rect {...draw(6)} x={32} y={100} width={40} height={34} />

      <rect {...fade(8)} className="il-fade il-faint-fill" x={30} y={42} width={44} height={32} />

      <circle {...pop(9)} className="il-pop il-faint-fill" cx={92} cy={30} r={4} />
      <circle {...pop(10)} className="il-pop il-faint-fill" cx={178} cy={80} r={4} />
      <circle {...pop(11)} className="il-pop il-faint-fill" cx={22} cy={92} r={4} />

      <g className="il-pin">
        <path
          {...popAccent(12)}
          d="M52 34c-8 0-15 7-15 15 0 11 15 26 15 26s15-15 15-26c0-8-7-15-15-15Z"
        />
        <circle className="il-paper-fill" cx={52} cy={49} r={5.4} />
      </g>
      <circle {...draw(13)} className="il-draw il-accent il-ring" cx={52} cy={58} r={22} />
    </Figure>
  );
}

/* ═══ Compass — orientation, the About opening ════════════════════════════ */

const TICKS = Array.from({ length: 16 }, (_, index) => index * 22.5);

export function CompassIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A compass rose with the needle pointing north" className={className}>
      <circle {...draw(0)} cx={100} cy={80} r={68} />
      <circle {...draw(1)} className="il-draw il-faint il-dashed" cx={100} cy={80} r={54} />

      <g className="il-orbit-slow">
        {TICKS.map((deg, index) => {
          const rad = (deg * Math.PI) / 180;
          const long = index % 4 === 0;
          const outer = 68;
          const inner = long ? 56 : 62;
          return (
            <path
              key={deg}
              {...draw(2 + index * 0.15)}
              className={cn("il-draw", !long && "il-faint")}
              d={`M${at(100 + inner * Math.cos(rad))} ${at(80 + inner * Math.sin(rad))}L${at(100 + outer * Math.cos(rad))} ${at(80 + outer * Math.sin(rad))}`}
            />
          );
        })}
      </g>

      <path {...draw(6)} d="M100 24l10 46 46 10-46 10-10 46-10-46-46-10 46-10z" />
      <path {...popAccent(8)} d="M100 24l10 46-10 10-10-10z" />

      <circle {...pop(9)} className="il-pop il-paper-fill" cx={100} cy={80} r={5} />
      <circle {...draw(10)} className="il-draw il-accent" cx={100} cy={80} r={5} />
    </Figure>
  );
}

/* ═══ Ledger — the archive ════════════════════════════════════════════════ */

export function LedgerIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A stack of program records with the newest on top" className={className}>
      <rect {...draw(0)} className="il-draw il-faint" x={44} y={30} width={112} height={82} rx={2} transform="rotate(-6 100 71)" />
      <rect {...draw(1)} className="il-draw il-faint" x={44} y={34} width={112} height={82} rx={2} transform="rotate(4 100 75)" />

      <rect {...fade(2)} className="il-fade il-paper-fill" x={40} y={44} width={120} height={92} rx={2} />
      <rect {...draw(3)} x={40} y={44} width={120} height={92} rx={2} />

      <path {...draw(5)} className="il-draw il-faint" d="M56 70h72" />
      <path {...draw(6)} className="il-draw il-faint" d="M56 86h88" />
      <path {...draw(7)} className="il-draw il-faint" d="M56 102h60" />
      <path {...draw(8)} className="il-draw il-faint" d="M56 118h80" />

      <rect {...fade(9)} className="il-fade il-accent-fill" x={40} y={44} width={5} height={92} />
      <circle {...popAccent(10)} cx={144} cy={62} r={4.5} />
    </Figure>
  );
}

/* ═══ Checklist — the things to settle before applying ═══════════════════
   Three done, one still open. The open one is the point of the drawing. */

const CHECK_ROWS = [58, 84, 110, 136] as const;

export function ChecklistIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A clipboard with three items ticked and a fourth still open" className={className}>
      <rect {...draw(0)} x={38} y={28} width={124} height={122} rx={3} />
      <path {...draw(1)} d="M84 28v-6a16 8 0 0 1 32 0v6" />
      <rect {...fade(1)} className="il-fade il-faint-fill" x={84} y={16} width={32} height={14} rx={3} />

      {CHECK_ROWS.map((y, index) => {
        const open = index === CHECK_ROWS.length - 1;
        return (
          <g key={y}>
            <rect
              {...(open
                ? { ...draw(3 + index), className: "il-draw il-accent il-dashed il-march" }
                : draw(3 + index))}
              x={54}
              y={y - 8}
              width={16}
              height={16}
              rx={2}
            />
            {!open && <path {...accent(4 + index)} d={`M58 ${y} l4 4 l8 -9`} />}
            <path {...draw(4 + index)} className="il-draw il-faint" d={`M80 ${y - 3}h64`} />
            <path {...draw(4 + index)} className="il-draw il-faint" d={`M80 ${y + 4}h${open ? 30 : 44}`} />
          </g>
        );
      })}
    </Figure>
  );
}

/* ═══ Signpost — proposing an event ══════════════════════════════════════ */

export function SignpostIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A signpost with three arms, one pointing the chosen way" className={className}>
      <path {...draw(0)} className="il-draw il-faint il-dashed" d="M22 32q78-14 156 0" />
      <path {...draw(1)} d="M14 140h172" />
      <path {...draw(2)} d="M100 140V40" />

      <path {...draw(4)} d="M96 48H54l-13 9 13 9h42z" />
      <path {...draw(5)} className="il-draw il-faint" d="M60 57h28" />

      <path {...accent(6)} d="M104 78h50l13 9-13 9h-50z" />
      <path {...accent(7)} className="il-draw il-accent" d="M112 87h32" />

      <path {...draw(8)} d="M96 108H62l-13 9 13 9h34z" />
      <path {...draw(9)} className="il-draw il-faint" d="M68 117h20" />

      <path {...draw(3)} d="M86 140q14-9 28 0" />
      <circle {...pop(10)} className="il-pop il-faint-fill" cx={32} cy={132} r={4} />
      <circle {...pop(11)} className="il-pop il-faint-fill" cx={172} cy={128} r={3} />
    </Figure>
  );
}

/* ═══ Drafting board — how the office works ══════════════════════════════
   The commitments section is about designing before signing, so the
   drawing is a board with a plan on it and no paperwork in sight. */

export function DraftingIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A drafting board carrying a drawn plan and a set square" className={className}>
      <path {...draw(0)} d="M18 40h164" />
      <rect {...draw(1)} x={28} y={40} width={144} height={92} rx={2} />
      <rect {...fade(2)} className="il-fade il-paper-fill" x={46} y={54} width={108} height={66} />
      <rect {...draw(3)} x={46} y={54} width={108} height={66} />

      <path {...accent(5)} d="M56 108l28-32 26 22 34-32" />
      <circle {...popAccent(7)} cx={56} cy={108} r={3.4} />
      <circle {...popAccent(8)} cx={144} cy={66} r={3.4} />

      <path {...draw(6)} className="il-draw il-faint" d="M46 86h108" />
      <path {...draw(6)} className="il-draw il-faint" d="M100 54v66" />

      <path {...draw(9)} d="M118 120h44V82z" />

      <path {...draw(4)} d="M42 132 30 152M158 132l12 20" />
      <path {...draw(4)} className="il-draw il-faint" d="M36 144h128" />
    </Figure>
  );
}

/* ═══ Relay — what happens to a message ══════════════════════════════════ */

export function RelayIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A message traveling along a route to the person who answers it" className={className}>
      <path {...draw(0)} d="M12 138h176" />

      <rect {...draw(1)} x={18} y={62} width={46} height={32} rx={2} />
      <path {...draw(2)} d="M18 64l23 17 23-17" />

      <path
        {...accent(4)}
        className="il-draw il-accent il-dashed il-march"
        d="M68 80c24 0 30 14 54 14s34-16 22-30"
      />

      <circle {...pop(6)} cx={96} cy={86} r={4.4} />
      <circle {...pop(7)} cx={126} cy={93} r={4.4} />

      <circle {...pop(8)} cx={162} cy={72} r={9} />
      <path {...draw(9)} d="M142 138c0-24 3-32 20-32s20 8 20 32" />

      <path {...accent(10)} d="M150 48l5 6 11-13" />
      <circle {...draw(11)} className="il-draw il-accent il-ring" cx={158} cy={50} r={16} />
    </Figure>
  );
}

/* ═══ Pipeline — an idea becoming a program ════════════════════════════
   Four stations, each a little higher than the last, with the material
   changing shape as it moves along. */

const STATIONS = [
  { x: 34, y: 116, i: 3 },
  { x: 80, y: 102, i: 4 },
  { x: 126, y: 88, i: 5 },
  { x: 172, y: 62, i: 6 },
] as const;

export function PipelineIllustration({ className }: { className?: string }) {
  return (
    <Figure label="Four stages rising in sequence, the material changing shape at each" className={className}>
      <path {...draw(0)} d="M16 142h168" />

      {STATIONS.map(({ x, y, i }) => (
        <path key={x} {...draw(i)} className="il-draw il-faint" d={`M${x} ${y}V142`} />
      ))}

      <path
        {...accent(2)}
        className="il-draw il-accent il-dashed il-march"
        d="M34 116h46l46-14 46-26"
      />

      <circle {...pop(7)} cx={34} cy={116} r={6} />
      <rect {...pop(8)} x={72} y={94} width={16} height={16} />
      <circle {...draw(9)} cx={126} cy={88} r={9} />
      <circle {...pop(10)} className="il-pop il-faint-fill" cx={126} cy={88} r={3} />

      <path {...accent(11)} d="M172 62V34" />
      <path {...popAccent(12)} d="M172 36l20 8-20 8z" />

      <path {...draw(1)} className="il-draw il-faint" d="M16 148h168" />
    </Figure>
  );
}

/* ═══ Atlas frame — hero furniture around the globe ═══════════════════════
   Not a standalone drawing: concentric guides, bearing ticks and corner
   crosshairs that surround the canvas globe and give the hero the same
   drafted character as the rest of the illustration set. */

const BEARINGS = Array.from({ length: 36 }, (_, index) => index * 10);

export function AtlasFrame({ className }: { className?: string }) {
  return (
    <div className={cn("atlas-frame", className)} aria-hidden>
      <svg viewBox="0 0 400 400" fill="none" strokeLinecap="round">
        <circle className="af-ring" cx={200} cy={200} r={186} />
        <circle className="af-ring af-dashed af-spin" cx={200} cy={200} r={166} />
        <circle className="af-ring af-faint" cx={200} cy={200} r={132} />

        <g className="af-spin-reverse">
          {BEARINGS.map((deg, index) => {
            const rad = (deg * Math.PI) / 180;
            const long = index % 9 === 0;
            const outer = 186;
            const inner = long ? 170 : 179;
            return (
              <path
                key={deg}
                className={cn("af-tick", !long && "af-faint")}
                d={`M${at(200 + inner * Math.cos(rad))} ${at(200 + inner * Math.sin(rad))}L${at(200 + outer * Math.cos(rad))} ${at(200 + outer * Math.sin(rad))}`}
              />
            );
          })}
        </g>

        <path className="af-cross" d="M200 6v22M200 372v22M6 200h22M372 200h22" />
      </svg>
    </div>
  );
}

/* ═══ Passport — how participation works ═════════════════════════
   An open document with the stamps a completed program leaves behind.
   The last frame is still empty, which is the honest state of the page it
   sits on. */

const STAMPS = [
  { x: 110, y: 62, rotate: -9, i: 6 },
  { x: 148, y: 92, rotate: 7, i: 7 },
  { x: 112, y: 116, rotate: -4, i: 8 },
] as const;

export function PassportIllustration({ className }: { className?: string }) {
  return (
    <Figure label="An open travel document carrying three stamps and one empty frame" className={className}>
      <path {...draw(0)} d="M22 34h156a4 4 0 0 1 4 4v88a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V38a4 4 0 0 1 4-4Z" />
      <path {...draw(1)} d="M100 34v96" />
      <path {...draw(2)} className="il-draw il-faint" d="M18 140h164" />
      <path {...draw(2)} className="il-draw il-faint" d="M24 146h152" />

      <path {...draw(3)} className="il-draw il-faint" d="M34 56h50" />
      <path {...draw(4)} className="il-draw il-faint" d="M34 70h50" />
      <path {...draw(4)} className="il-draw il-faint" d="M34 84h38" />
      <path {...draw(5)} className="il-draw il-faint" d="M34 104h50" />
      <path {...draw(5)} className="il-draw il-faint" d="M34 118h30" />

      {STAMPS.map(({ x, y, rotate, i }) => (
        <g key={i} transform={`rotate(${rotate} ${x} ${y})`}>
          <rect {...draw(i)} className="il-draw il-accent il-dashed" x={x - 22} y={y - 13} width={44} height={26} />
          <circle {...draw(i)} className="il-draw il-accent" cx={x} cy={y} r={7} />
        </g>
      ))}

      {/* The next stamp has not been earned yet. */}
      <rect {...draw(10)} className="il-draw il-faint il-dashed il-march" x={128} y={112} width={40} height={24} />
    </Figure>
  );
}

/* ═══ Timeline — the events archive ═════════════════════════════ */

const MARKS = [
  { x: 40, h: 26, i: 3 },
  { x: 78, h: 40, i: 4 },
  { x: 116, h: 30, i: 5 },
  { x: 154, h: 52, i: 6 },
] as const;

export function TimelineIllustration({ className }: { className?: string }) {
  return (
    <Figure label="A timeline of recorded activity, the most recent entry marked" className={className}>
      <path {...draw(0)} d="M20 110h160" />
      <path {...draw(1)} className="il-draw il-faint" d="M20 110v10M180 110v10" />

      {MARKS.map(({ x, h, i }, index) => {
        const live = index === MARKS.length - 1;
        return (
          <g key={x}>
            <path
              {...(live ? accent(i) : draw(i))}
              d={`M${x} 110V${110 - h}`}
            />
            <rect
              {...(live ? { ...pop(i + 2), className: "il-pop il-accent-fill" } : pop(i + 2))}
              x={x - 9}
              y={110 - h - 12}
              width={18}
              height={12}
              rx={2}
            />
            <path {...draw(i)} className="il-draw il-faint" d={`M${x} 110v8`} />
          </g>
        );
      })}

      <path {...draw(9)} className="il-draw il-faint il-dashed il-march" d="M20 132h160" />
      <circle {...draw(10)} className="il-draw il-accent il-ring" cx={154} cy={46} r={20} />
    </Figure>
  );
}
/* ═══ Footer stamps — the sign-off ═══════════════════════════════════════
   A sheet of postage stamps, one per documented corridor. Deliberately not
   another globe: the hero already carries one, and a stamp sheet says
   something the globe cannot — that each of these is a record, franked
   after the fact rather than a line drawn on a map in advance.

   Perforations are a dashed stroke with round caps rather than a hundred
   little circles, which keeps the whole sheet at a few dozen nodes. */

const STAMP_W = 176;
const STAMP_H = 132;
const STAMP_TILT = [-3.5, 2, -1.5, 2.8, -2.4, 1.4] as const;

export function FooterStamps({
  places,
}: {
  places: readonly { name: string; country: string }[];
}) {
  const sheet = places.slice(0, 6);

  return (
    <div className="footer-stamps" aria-hidden>
      <svg viewBox="0 0 620 336" fill="none">
        {sheet.map((place, index) => {
          const column = index % 3;
          const row = Math.floor(index / 3);
          const x = 16 + column * 198;
          const y = 18 + row * 158;
          const tilt = STAMP_TILT[index] ?? 0;
          const franked = index === 1;

          return (
            <g
              key={place.name}
              className="fs-stamp"
              transform={`rotate(${tilt} ${x + STAMP_W / 2} ${y + STAMP_H / 2})`}
              style={{ "--i": index } as Vars}
            >
              {franked && (
                <rect className="fs-wash" x={x} y={y} width={STAMP_W} height={STAMP_H} rx={3} />
              )}

              <rect className="fs-perf" x={x} y={y} width={STAMP_W} height={STAMP_H} rx={3} />
              <rect
                className="fs-edge"
                x={x + 11}
                y={y + 11}
                width={STAMP_W - 22}
                height={STAMP_H - 22}
              />

              {/* A miniature corridor inside each frame. */}
              <path
                className="fs-arc"
                d={`M${x + 30} ${y + 74}q${STAMP_W / 2 - 30} -46 ${STAMP_W - 60} 0`}
              />
              <circle className="fs-dot" cx={x + 30} cy={y + 74} r={3} />
              <circle className="fs-dot" cx={x + STAMP_W - 30} cy={y + 74} r={3} />

              <text className="fs-city" x={x + 22} y={y + 104}>
                {place.name}
              </text>
              {/* City-states print their own name twice; skip the second. */}
              {place.country !== place.name && (
                <text className="fs-country" x={x + 22} y={y + 118}>
                  {place.country.toUpperCase()}
                </text>
              )}

              {franked && (
                <g className="fs-mark">
                  <circle cx={x + STAMP_W - 34} cy={y + 34} r={19} />
                  <circle cx={x + STAMP_W - 34} cy={y + 34} r={13} />
                  <path d={`M${x + STAMP_W - 53} ${y + 34}h38`} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

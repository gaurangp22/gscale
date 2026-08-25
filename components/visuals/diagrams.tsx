/**
 * Page illustrations. Each page gets its own diagram so no two openings
 * share a visual device. All of them are plain SVG — no media, no library —
 * drawn only in the brand palette, with motion handled by keyframes in
 * globals.css so `prefers-reduced-motion` disables them for free.
 */

import { cn } from "@/lib/utils";

const CRIMSON = "#bd1622";

/* ═══════════════════════════════════════════════════════════════
   ABOUT — Mandate orbit
   A hub-and-orbit schematic: the office at the center, its six
   mandates on the ring, drift rings turning slowly behind them.
   ═══════════════════════════════════════════════════════════════ */

export function MandateOrbit({
  labels,
  className,
}: {
  labels: readonly string[];
  className?: string;
}) {
  const CX = 300;
  const CY = 300;
  const R = 190;

  const nodes = labels.slice(0, 6).map((label, i) => {
    // Start at 12 o'clock and step clockwise.
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / 6;
    return {
      label,
      index: i,
      x: CX + Math.cos(angle) * R,
      y: CY + Math.sin(angle) * R,
      angle,
    };
  });

  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Diagram: the International Office at the center of its six mandates"
    >
      <defs>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={CRIMSON} stopOpacity="0.18" />
          <stop offset="100%" stopColor={CRIMSON} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Drift rings. */}
      <g className="orbit-slow" style={{ transformOrigin: "300px 300px" }}>
        <circle cx={CX} cy={CY} r={R + 58} fill="none" stroke="rgb(17 17 17 / 0.07)" strokeWidth="1" strokeDasharray="2 9" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgb(17 17 17 / 0.10)" strokeWidth="1" />
      </g>
      <g className="orbit-slow-reverse" style={{ transformOrigin: "300px 300px" }}>
        <circle cx={CX} cy={CY} r={R - 62} fill="none" stroke="rgb(17 17 17 / 0.07)" strokeWidth="1" strokeDasharray="3 12" />
      </g>

      {/* Spokes. */}
      {nodes.map((node) => (
        <line
          key={`spoke-${node.index}`}
          x1={CX}
          y1={CY}
          x2={node.x}
          y2={node.y}
          stroke="rgb(17 17 17 / 0.14)"
          strokeWidth="1"
        />
      ))}

      {/* Core. */}
      <circle cx={CX} cy={CY} r="86" fill="url(#orbit-core)" />
      <circle cx={CX} cy={CY} r="34" fill="none" stroke={CRIMSON} strokeOpacity="0.35" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="7" fill={CRIMSON} />
      <text
        x={CX}
        y={CY + 58}
        textAnchor="middle"
        className="fill-ink font-mono"
        style={{ fontSize: 11, letterSpacing: "0.18em" }}
      >
        THE OFFICE
      </text>

      {/* Mandate nodes. */}
      {nodes.map((node) => {
        const outward = node.x >= CX - 1;
        return (
          <g key={node.index}>
            <circle
              cx={node.x}
              cy={node.y}
              r="16"
              className="node-pulse"
              style={{ animationDelay: `${node.index * 0.45}s`, transformOrigin: `${node.x}px ${node.y}px` }}
              fill="none"
              stroke={CRIMSON}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <rect
              x={node.x - 5}
              y={node.y - 5}
              width="10"
              height="10"
              fill={CRIMSON}
            />
            <text
              x={node.x + (outward ? 26 : -26)}
              y={node.y - 6}
              textAnchor={outward ? "start" : "end"}
              className="fill-crimson font-mono"
              style={{ fontSize: 10, letterSpacing: "0.16em" }}
            >
              {String(node.index + 1).padStart(2, "0")}
            </text>
            <text
              x={node.x + (outward ? 26 : -26)}
              y={node.y + 11}
              textAnchor={outward ? "start" : "end"}
              className="fill-soot"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARTNERSHIPS — Chord diagram
   Every partner sits on the ring; chords cross the interior to show
   that the collaborations connect to each other, not just to GU.
   ═══════════════════════════════════════════════════════════════ */

export function ChordDiagram({
  nodes,
  className,
}: {
  nodes: readonly string[];
  className?: string;
}) {
  const CX = 300;
  const CY = 300;
  const R = 216;
  const count = Math.min(nodes.length, 12);

  const points = nodes.slice(0, count).map((label, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / count;
    return {
      label,
      index: i,
      angle,
      x: CX + Math.cos(angle) * R,
      y: CY + Math.sin(angle) * R,
    };
  });

  // Connect each node to two others, producing an even weave rather than
  // a star — the point is a network, not a hub.
  const chords: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    chords.push([i, (i + 3) % count]);
    chords.push([i, (i + 5) % count]);
  }
  const seen = new Set<string>();
  const unique = chords.filter(([a, b]) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Diagram: a network of institutional and industry partners"
    >
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R - 26} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" strokeDasharray="2 10" />

      {unique.map(([a, b], i) => {
        const p = points[a];
        const q = points[b];
        // Pull the control point toward the center: longer chords bow more.
        const pull = 0.22;
        return (
          <path
            key={`chord-${i}`}
            d={`M ${p.x} ${p.y} Q ${CX + (CX - (p.x + q.x) / 2) * -pull} ${
              CY + (CY - (p.y + q.y) / 2) * -pull
            } ${q.x} ${q.y}`}
            fill="none"
            stroke={CRIMSON}
            strokeOpacity={0.3}
            strokeWidth="1"
            className="chord-draw"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        );
      })}

      {points.map((point) => {
        const right = Math.cos(point.angle) >= -0.01;
        const lx = CX + Math.cos(point.angle) * (R + 18);
        const ly = CY + Math.sin(point.angle) * (R + 18);
        return (
          <g key={point.index}>
            <circle cx={point.x} cy={point.y} r="3.5" fill={CRIMSON} />
            <text
              x={lx}
              y={ly}
              textAnchor={right ? "start" : "end"}
              dominantBaseline="middle"
              className="font-mono"
              fill="rgb(255 255 255 / 0.62)"
              style={{ fontSize: 10, letterSpacing: "0.12em" }}
            >
              {point.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRAMS — Flow schematic
   Inbound routes fold in from the left, outbound fan out to the
   right, campus in the middle. Reads like a departures diagram.
   ═══════════════════════════════════════════════════════════════ */

export function ProgramFlow({
  inbound,
  outbound,
  className,
}: {
  inbound: readonly string[];
  outbound: readonly string[];
  className?: string;
}) {
  const W = 760;
  const H = 460;
  const CX = W / 2;
  const CY = H / 2;

  const spread = (n: number, i: number, span: number) =>
    n === 1 ? CY : CY - span / 2 + (i * span) / (n - 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Diagram: inbound programs arriving at Galgotias University and outbound programs departing"
    >
      <defs>
        <marker id="flow-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={CRIMSON} />
        </marker>
      </defs>

      {/* Inbound. */}
      {inbound.map((label, i) => {
        const y = spread(inbound.length, i, 190);
        const x = 96;
        return (
          <g key={`in-${label}`}>
            <path
              d={`M ${x} ${y} C ${x + 130} ${y} ${CX - 130} ${CY} ${CX - 58} ${CY}`}
              fill="none"
              stroke={CRIMSON}
              strokeOpacity="0.55"
              strokeWidth="1.2"
              markerEnd="url(#flow-arrow)"
              className="flow-dash"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <circle cx={x} cy={y} r="3.5" fill={CRIMSON} />
            <text
              x={x - 14}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-soot"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Outbound. */}
      {outbound.map((label, i) => {
        const y = spread(outbound.length, i, 300);
        const x = W - 96;
        return (
          <g key={`out-${label}`}>
            <path
              d={`M ${CX + 58} ${CY} C ${CX + 130} ${CY} ${x - 130} ${y} ${x - 10} ${y}`}
              fill="none"
              stroke={CRIMSON}
              strokeOpacity="0.55"
              strokeWidth="1.2"
              markerEnd="url(#flow-arrow)"
              className="flow-dash"
              style={{ animationDelay: `${0.25 + i * 0.4}s` }}
            />
            <circle cx={x} cy={y} r="3.5" fill={CRIMSON} />
            <text
              x={x + 14}
              y={y}
              dominantBaseline="middle"
              className="fill-soot"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Campus hub. */}
      <circle cx={CX} cy={CY} r="74" fill="none" stroke="rgb(17 17 17 / 0.10)" strokeWidth="1" strokeDasharray="3 10" />
      <circle cx={CX} cy={CY} r="52" fill="none" stroke={CRIMSON} strokeOpacity="0.3" strokeWidth="1" />
      <rect x={CX - 26} y={CY - 26} width="52" height="52" fill={CRIMSON} />
      <text
        x={CX}
        y={CY + 5}
        textAnchor="middle"
        className="font-mono"
        fill="#fff"
        style={{ fontSize: 15, letterSpacing: "0.06em", fontWeight: 600 }}
      >
        GU
      </text>
      <text
        x={CX}
        y={CY + 100}
        textAnchor="middle"
        className="fill-stone font-mono"
        style={{ fontSize: 10, letterSpacing: "0.18em" }}
      >
        GREATER NOIDA
      </text>

      <text x={96} y={44} textAnchor="middle" className="fill-crimson font-mono" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
        INBOUND
      </text>
      <text x={W - 96} y={44} textAnchor="middle" className="fill-crimson font-mono" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
        OUTBOUND
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT — Campus block
   An axonometric of A-Block with the third floor called out, so
   "3rd floor, A Block" becomes something you can actually see.
   ═══════════════════════════════════════════════════════════════ */

export function CampusBlock({ className }: { className?: string }) {
  const floors = [0, 1, 2, 3, 4];
  const slabH = 26;
  const baseY = 330;
  const w = 190;
  const d = 82;
  const originX = 170;

  return (
    <svg
      viewBox="0 0 520 420"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Axonometric drawing of A Block with the third floor highlighted"
    >
      {floors.map((f) => {
        const y = baseY - f * (slabH + 12);
        const active = f === 3;
        const stroke = active ? CRIMSON : "rgb(255 255 255 / 0.28)";
        const fill = active ? "rgb(189 22 34 / 0.22)" : "rgb(255 255 255 / 0.04)";

        return (
          <g key={f} className={active ? "block-lift" : undefined}>
            {/* top face */}
            <path
              d={`M ${originX} ${y} l ${w} 0 l ${d} -${d * 0.5} l -${w} 0 Z`}
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />
            {/* front face */}
            <path
              d={`M ${originX} ${y} l ${w} 0 l 0 ${slabH} l -${w} 0 Z`}
              fill={active ? "rgb(189 22 34 / 0.30)" : "rgb(255 255 255 / 0.03)"}
              stroke={stroke}
              strokeWidth="1"
            />
            {/* side face */}
            <path
              d={`M ${originX + w} ${y} l ${d} -${d * 0.5} l 0 ${slabH} l -${d} ${d * 0.5} Z`}
              fill={active ? "rgb(189 22 34 / 0.18)" : "rgb(255 255 255 / 0.02)"}
              stroke={stroke}
              strokeWidth="1"
            />

            <text
              x={originX - 16}
              y={y + slabH - 8}
              textAnchor="end"
              className="font-mono"
              fill={active ? "#fff" : "rgb(255 255 255 / 0.62)"}
              style={{ fontSize: 10, letterSpacing: "0.14em" }}
            >
              {f === 0 ? "G" : `0${f}`}
            </text>
          </g>
        );
      })}

      {/* Callout to the third floor. */}
      <g>
        <line
          x1={originX + w + d + 8}
          y1={baseY - 3 * (slabH + 12) - 12}
          x2={430}
          y2={130}
          stroke={CRIMSON}
          strokeWidth="1"
        />
        <circle cx={430} cy={130} r="3" fill={CRIMSON} />
        <text x={430} y={112} textAnchor="middle" className="font-mono" fill="#fff" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
          YOU ARE HERE
        </text>
        <text x={430} y={96} textAnchor="middle" className="font-mono" fill="rgb(255 255 255 / 0.7)" style={{ fontSize: 9, letterSpacing: "0.16em" }}>
          A-BLOCK · 3RD FLOOR
        </text>
      </g>

      {/* Ground line. */}
      <path
        d={`M ${originX - 40} ${baseY + slabH} l ${w + 100} 0 l ${d} -${d * 0.5}`}
        fill="none"
        stroke="rgb(255 255 255 / 0.14)"
        strokeWidth="1"
      />
    </svg>
  );
}

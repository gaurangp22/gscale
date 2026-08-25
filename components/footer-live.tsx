"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "@/components/motion";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* Math.cos and friends are kept out of render entirely — every coordinate
   below is a literal or derived from whole-number arithmetic, so the server
   and the browser draw the identical scene. */
const at = (value: number) => Math.round(value * 100) / 100;

/* ═══ Office clock ════════════════════════════════════════════════════════
   The office answers inquiries from one place, so the footer carries that
   one place's clock. IST is a fixed +05:30 — no DST — which lets the whole
   thing be plain arithmetic off UTC and keeps the server render
   deterministic ("--:--" until mounted, then live). */

const IST_OFFSET_MIN = 330;
/* Mon–Fri, 09:00–17:30 at the desk. */
const OPEN_DAYS = [1, 2, 3, 4, 5];
const OPEN_FROM = 9 * 60;
const OPEN_TO = 17 * 60 + 30;
/* Daylight over campus, 06:00–18:00 — the sky furniture swaps on it. */
const DAYLIGHT_FROM = 6 * 60;
const DAYLIGHT_TO = 18 * 60;

function istParts(date: Date) {
  const shifted = new Date(
    date.getTime() + (IST_OFFSET_MIN + date.getTimezoneOffset()) * 60_000,
  );
  return {
    minutes: shifted.getHours() * 60 + shifted.getMinutes(),
    day: shifted.getDay(),
    label: `${String(shifted.getHours()).padStart(2, "0")}:${String(shifted.getMinutes()).padStart(2, "0")}`,
  };
}

function useISTClock(intervalMs: number) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    /* First reading lands on a task rather than synchronously in the
       effect body — the render stays single-pass on mount. */
    const update = () => setNow(new Date());
    const first = window.setTimeout(update, 0);
    const interval = window.setInterval(update, intervalMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [intervalMs]);

  const parts = now ? istParts(now) : null;
  return {
    ready: parts !== null,
    label: parts ? parts.label : "--:--",
    open: parts
      ? OPEN_DAYS.includes(parts.day) &&
        parts.minutes >= OPEN_FROM &&
        parts.minutes < OPEN_TO
      : false,
    day: parts ? parts.minutes >= DAYLIGHT_FROM && parts.minutes < DAYLIGHT_TO : false,
  };
}

export function OfficeClock() {
  const { ready, label, open } = useISTClock(15_000);

  return (
    <p className="footer-clock">
      <span className="footer-clock-dot" data-open={ready && open ? "true" : "false"} aria-hidden />
      <span className="split-sr">Local office time in Greater Noida. </span>
      <span className="footer-clock-time" aria-hidden>{label}<i>IST</i></span>
      <span className="footer-clock-status">
        {ready ? (open ? "Office open" : "Office closed") : "Greater Noida"}
      </span>
    </p>
  );
}

/* ═══ Campus sky — the sign-off illustration ══════════════════════════════
   An elevation of the campus, drawn in the site's hairline language on the
   crimson ground. It carries one piece of information the rest of the page
   cannot: whether the office is actually at its desk right now. The window
   marked A Block glows amber while the clock says open and goes dark when
   it does not — the pill in the directory and this window tell the same
   truth in two registers.

   The sky keeps IST hours too: stars, a shooting star and the moon stand
   in after dark; between 06:00 and 18:00 the sun takes the moon's post and
   the stars stand down.

   The toy: windows catch the cursor like a passing torch. Each pane warms
   as the pointer nears and cools as it leaves; on touch the campus simply
   rests, a few panes flickering on their own. */

const GROUND = 206;

type Block = {
  x: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  dome?: boolean;
};

const BLOCKS: Block[] = [
  { x: 42, w: 108, h: 66, cols: 4, rows: 2 },
  { x: 172, w: 88, h: 98, cols: 3, rows: 3 },
  { x: 292, w: 128, h: 116, cols: 4, rows: 3, dome: true },
  { x: 452, w: 78, h: 58, cols: 3, rows: 2 },
  { x: 562, w: 138, h: 128, cols: 4, rows: 3 },
  { x: 742, w: 98, h: 88, cols: 3, rows: 3 },
  { x: 872, w: 68, h: 54, cols: 2, rows: 2 },
  { x: 972, w: 88, h: 138, cols: 3, rows: 4 },
  { x: 1092, w: 76, h: 72, cols: 3, rows: 2 },
];
const OFFICE_INDEX = 4;
const OFFICE_CX = BLOCKS[OFFICE_INDEX].x + BLOCKS[OFFICE_INDEX].w / 2;
const OFFICE_TOP = GROUND - BLOCKS[OFFICE_INDEX].h;

const PAD_X = 13;
const PAD_T = 15;
const PAD_B = 13;
const GAP = 8;

type Pane = { cx: number; cy: number; x: number; y: number; w: number; h: number; i: number };

const WINDOWS: Pane[] = BLOCKS.flatMap((block, bi) => {
  const ww = (block.w - PAD_X * 2 - (block.cols - 1) * GAP) / block.cols;
  const wh = (block.h - PAD_T - PAD_B - (block.rows - 1) * GAP) / block.rows;
  const top = GROUND - block.h;
  const panes: Pane[] = [];
  for (let r = 0; r < block.rows; r++) {
    for (let c = 0; c < block.cols; c++) {
      /* The office's desk window is drawn by hand, not gridded. */
      if (bi === OFFICE_INDEX && r === 1 && c === 1) continue;
      const x = block.x + PAD_X + c * (ww + GAP);
      const y = top + PAD_T + r * (wh + GAP);
      panes.push({
        cx: at(x + ww / 2),
        cy: at(y + wh / 2),
        x: at(x),
        y: at(y),
        w: at(ww),
        h: at(wh),
        i: panes.length + bi * 4,
      });
    }
  }
  return panes;
});

/* The desk window: one row down, second column of the office block. */
const DESK = (() => {
  const block = BLOCKS[OFFICE_INDEX];
  const ww = (block.w - PAD_X * 2 - (block.cols - 1) * GAP) / block.cols;
  const wh = (block.h - PAD_T - PAD_B - (block.rows - 1) * GAP) / block.rows;
  const x = block.x + PAD_X + 1 * (ww + GAP);
  const y = GROUND - block.h + PAD_T + 1 * (wh + GAP);
  return { x: at(x - 2), y: at(y - 2), w: at(ww + 4), h: at(wh + 4) };
})();

const STARS = Array.from({ length: 18 }, (_, i) => ({
  x: at(((i * 163 + 47) % 1160) + 20),
  y: at(12 + ((i * 97) % 50)),
  r: i % 3 === 0 ? 1.6 : 1.1,
  i,
})).filter(
  (s) =>
    /* Keep the sky clear of the dome's apex and the tower flag. */
    !(s.y > 52 && s.x > 288 && s.x < 424) && !(s.y > 34 && s.x > 1004 && s.x < 1048),
);

const TREES = [158, 436, 724, 948, 1078] as const;

const GRASS = Array.from({ length: 22 }, (_, i) => ({
  x: at(26 + i * 53 + (i % 4) * 5),
  i,
}));

export function CampusNight() {
  const sceneRef = useInView<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const paneRefs = useRef<(SVGRectElement | null)[]>([]);
  const { ready, open, day } = useISTClock(60_000);

  useEffect(() => {
    const scene = sceneRef.current;
    const svg = svgRef.current;
    if (!scene || !svg) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let cx = -1;
    let cy = -1;

    const paint = () => {
      frame = 0;
      let vx = 0;
      let vy = 0;
      if (cx >= 0) {
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const point = new DOMPoint(cx, cy).matrixTransform(ctm.inverse());
        vx = point.x;
        vy = point.y;
      }
      for (let i = 0; i < WINDOWS.length; i++) {
        const node = paneRefs.current[i];
        if (!node) continue;
        if (cx < 0) {
          node.style.opacity = "";
          continue;
        }
        const pane = WINDOWS[i];
        const d = Math.hypot(pane.cx - vx, pane.cy - vy);
        const t = Math.max(0, 1 - d / 240);
        const eased = t * t * (3 - 2 * t);
        node.style.opacity = (0.16 + 0.74 * eased).toFixed(3);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      cx = event.clientX;
      cy = event.clientY;
      wake();
    };

    const onLeave = () => {
      cx = -1;
      wake();
    };

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);

    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sceneRef]);

  return (
    <div
      ref={sceneRef}
      className="footer-scene"
      data-inview="false"
      data-open={ready ? (open ? "true" : "false") : "unknown"}
      data-day={ready ? (day ? "true" : "false") : "unknown"}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 236"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
      >
        {/* Sky */}
        {STARS.map((star) => (
          <circle
            key={`star-${star.i}`}
            className="fc-star"
            style={{ "--i": star.i } as Vars}
            cx={star.x}
            cy={star.y}
            r={star.r}
          />
        ))}

        <path className="fc-shoot" d="M690 16L872 42" />

        <path
          className="fc-fade fc-moon"
          style={{ "--i": 15, "--fade-base": 0.9 } as Vars}
          d="M1108 22a15 15 0 1 0 12.6 25.4 12.2 12.2 0 1 1-12.6-25.4Z"
        />

        {/* The sun holds the same post in daylight — one disc, eight rays. */}
        <g
          className="fc-fade fc-sun"
          style={{ "--i": 15, "--fade-base": 1 } as Vars}
        >
          <circle className="fc-sun-core" cx={1115} cy={39} r={12} />
          <path
            className="fc-sun-rays"
            d="M1131.5 39H1136M1126.67 50.67L1129.85 53.85M1115 55.5V60M1103.33 50.67L1100.15 53.85M1098.5 39H1094M1103.33 27.33L1100.15 24.15M1115 22.5V18M1126.67 27.33L1129.85 24.15"
          />
        </g>

        {/* Ground */}
        <path className="fc-draw" style={{ "--i": 0 } as Vars} pathLength={1} d={`M14 ${GROUND}h1172`} />
        {GRASS.map((tick) => (
          <path
            key={`grass-${tick.i}`}
            className="fc-draw fc-faint"
            style={{ "--i": 12 } as Vars}
            pathLength={1}
            d={`M${tick.x} ${GROUND}l-5 -7`}
          />
        ))}

        {/* Blocks */}
        {BLOCKS.map((block, bi) => (
          <path
            key={`block-${bi}`}
            className="fc-draw"
            style={{ "--i": 1 + bi } as Vars}
            pathLength={1}
            d={`M${block.x} ${GROUND}v-${block.h}h${block.w}v${block.h}`}
          />
        ))}

        {/* Dome on the library block */}
        <path
          className="fc-draw"
          style={{ "--i": 10 } as Vars}
          pathLength={1}
          d={`M${BLOCKS[2].x} ${GROUND - BLOCKS[2].h}a64 26 0 0 1 ${BLOCKS[2].w} 0`}
        />
        <path className="fc-draw fc-faint" style={{ "--i": 10 } as Vars} pathLength={1} d="M356 62v-8" />

        {/* Trees */}
        {TREES.map((x) => (
          <g key={`tree-${x}`} className="fc-fade" style={{ "--i": 11, "--fade-base": 0.7 } as Vars}>
            <path className="fc-faint" d={`M${x} ${GROUND}v-13`} />
            <circle className="fc-faint" cx={x} cy={at(GROUND - 20)} r={7.5} />
          </g>
        ))}

        {/* Windows — the part that answers the cursor */}
        {WINDOWS.map((pane, i) => (
          <rect
            key={`pane-${pane.i}`}
            ref={(node) => {
              paneRefs.current[i] = node;
            }}
            className="fc-win"
            style={{ "--i": pane.i } as Vars}
            x={pane.x}
            y={pane.y}
            width={pane.w}
            height={pane.h}
            rx={1}
          />
        ))}

        {/* The office window — lit only while the desk is manned */}
        <rect
          className="fc-desk-halo"
          x={DESK.x - 7}
          y={DESK.y - 7}
          width={DESK.w + 14}
          height={DESK.h + 14}
          rx={4}
        />
        <rect className="fc-desk" x={DESK.x} y={DESK.y} width={DESK.w} height={DESK.h} rx={1} />

        {/* Antenna, beacon, flag */}
        <path className="fc-draw" style={{ "--i": 13 } as Vars} pathLength={1} d={`M${OFFICE_CX} ${OFFICE_TOP}v-20`} />
        <circle className="fc-beacon" cx={OFFICE_CX} cy={OFFICE_TOP - 22} r={2.4} />
        <path className="fc-draw" style={{ "--i": 14 } as Vars} pathLength={1} d="M1016 68V44" />
        <path className="fc-flag fc-fade" style={{ "--i": 14, "--fade-base": 0.9 } as Vars} d="M1016 44l20 6-20 6z" />

        {/* The pin — this is where the office is */}
        <circle className="fc-ring" cx={OFFICE_CX} cy={OFFICE_TOP - 22} r={7} />
        <g className="fc-pin">
          <path
            className="fc-fade"
            style={{ "--i": 16, "--fade-base": 1 } as Vars}
            d={`M${OFFICE_CX} 26c-7 0-12 5-12 12 0 9 12 20 12 20s12-11 12-20c0-7-5-12-12-12Z`}
          />
          <circle className="fc-pin-eye" cx={OFFICE_CX} cy={38} r={4} />
        </g>

        <text className="fc-label fc-fade" style={{ "--i": 17, "--fade-base": 0.6 } as Vars} x={OFFICE_CX} y={224} textAnchor="middle">
          A BLOCK · INTERNATIONAL OFFICE
        </text>
      </svg>
    </div>
  );
}

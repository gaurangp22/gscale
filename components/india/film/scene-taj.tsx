"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Caption, Layer, Scene, seeded, type P } from "./stage";
import { CypressTree, Taj } from "./monuments";
import { EDITION } from "../content";

/* ─────────────────────────────────────────────────────────────────────────
   Opening. Agra, before dawn.

   The first sight of the Taj Mahal is through the great gate, the
   Darwaza-i-Rauza: red sandstone, a band of calligraphy in marble around
   the arch, flowers inlaid in the spandrels, a brass lantern hanging from
   the apex. Scrolling walks you through the arch while the sky grades
   from indigo to rose and the marble takes the first light.

   Every surface exists twice — once in night grade, once in dawn grade —
   and the dawn copy fades in over the night one.
   ───────────────────────────────────────────────────────────────────────── */

type Grade = {
  stone: string;
  shade: string;
  deep: string;
  inlay: string;
  ink: string;
  flower: string;
  leaf: string;
  brass: string;
};

const NIGHT_GATE: Grade = {
  stone: "#2b1723",
  shade: "#20101a",
  deep: "#150a11",
  inlay: "#5a475a",
  ink: "#24121c",
  flower: "#5b3446",
  leaf: "#34433f",
  brass: "#6b5a55",
};
const DAWN_GATE: Grade = {
  stone: "#8c3e2d",
  shade: "#6c2d21",
  deep: "#3a1611",
  inlay: "#f0dfca",
  ink: "#3b1d16",
  flower: "#b8513c",
  leaf: "#5d7a51",
  brass: "#c99a4b",
};

const NIGHT_TAJ = { body: "#3b4172", shade: "#2e345f", deep: "#1b1f46", trim: "#4d5390", hi: "#4a5186" };
const DAWN_TAJ = { body: "#f7e4d8", shade: "#e3c1b5", deep: "#b3808a", trim: "#d6a39c", hi: "#fff5ec" };

type Geo = { x0: number; x1: number; yb: number; apex: number; c1y: number; c2x: number; c2y: number; rect: [number, number, number] };
const GEO: Record<"wide" | "narrow", Geo> = {
  wide: { x0: 556, x1: 1044, yb: 438, apex: 178, c1y: 338, c2x: 636, c2y: 262, rect: [466, 92, 668] },
  narrow: { x0: 636, x1: 964, yb: 640, apex: 462, c1y: 572, c2x: 694, c2y: 520, rect: [586, 404, 428] },
};

/** The arch outline, grown outward by `o`. */
function arch(g: Geo, o: number) {
  return `M${g.x0 - o} 1000 V${g.yb} C${g.x0 - o} ${g.c1y - o} ${g.c2x - o * 0.6} ${g.c2y - o} 800 ${g.apex - o} C${1600 - g.c2x + o * 0.6} ${g.c2y - o} ${g.x1 + o} ${g.c1y - o} ${g.x1 + o} ${g.yb} V1000 Z`;
}

function Flower({ x, y, s, c }: { x: number; y: number; s: number; c: Grade }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path fill={c.leaf} d="M0 4 C-10 8 -16 16 -18 24 C-8 22 -2 14 0 4 Z M0 4 C10 8 16 16 18 24 C8 22 2 14 0 4 Z" />
      <path fill={c.leaf} d="M-0.8 4 H0.8 V26 H-0.8 Z" />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} fill={c.flower} cx="0" cy="-7" rx="3.6" ry="7" transform={`rotate(${i * 60})`} />
      ))}
      <circle fill={c.inlay} r="3" />
    </g>
  );
}

function Gate({ variant, c }: { variant: "wide" | "narrow"; c: Grade }) {
  const g = GEO[variant];
  const [rx, ry, rw] = g.rect;
  const band = 24;
  // calligraphy: a rhythm of tall strokes, bowls and dots along the band
  const glyphs = (x0: number, y0: number, len: number, vertical: boolean, seed: number) =>
    Array.from({ length: Math.floor(len / 9) }, (_, i) => {
      const r = seeded(i, seed);
      const h = r < 0.3 ? 12 : r < 0.7 ? 6 : 3;
      const along = i * 9 + 4;
      return vertical ? (
        <rect key={i} x={x0 + (band - h) / 2} y={y0 + along} width={h} height="2.4" rx="1" fill={c.ink} />
      ) : (
        <rect key={i} x={x0 + along} y={y0 + (band - h) / 2} width="2.4" height={h} rx="1" fill={c.ink} />
      );
    });
  const flowers =
    variant === "wide"
      ? [
          [520, 158, 0.8], [566, 138, 0.66], [520, 222, 0.72], [616, 132, 0.52],
          [1080, 158, 0.8], [1034, 138, 0.66], [1080, 222, 0.72], [984, 132, 0.52],
        ]
      : [
          [630, 460, 0.55], [630, 510, 0.5], [970, 460, 0.55], [970, 510, 0.5],
        ];
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden className={`frame-${variant}`}>
      {/* the wall, with the arch cut through it */}
      <path fillRule="evenodd" fill={c.stone} d={`M-500 -500 H2100 V1000 H-500 Z ${arch(g, 0)}`} />
      {/* the depth of the arch: its soffit, then two marble mouldings */}
      <path fillRule="evenodd" fill={c.shade} d={`${arch(g, 16)} ${arch(g, 0)}`} />
      <path fillRule="evenodd" fill={c.inlay} d={`${arch(g, 20)} ${arch(g, 16)}`} />
      <path fillRule="evenodd" fill={c.inlay} d={`${arch(g, 38)} ${arch(g, 35)}`} />
      {/* the pishtaq frame: a marble band carrying calligraphy */}
      <path
        fillRule="evenodd"
        fill={c.inlay}
        d={`M${rx} 1000 V${ry} H${rx + rw} V1000 Z M${rx + band} 1000 V${ry + band} H${rx + rw - band} V1000 Z`}
      />
      {glyphs(rx + band, ry, rw - band * 2, false, 3)}
      {glyphs(rx, ry + band, 1000 - ry - band, true, 5)}
      {glyphs(rx + rw - band, ry + band, 1000 - ry - band, true, 7)}
      <path fill="none" stroke={c.inlay} strokeWidth="1.4" d={`M${rx - 14} 1000 V${ry - 14} H${rx + rw + 14} V1000`} />
      {flowers.map(([x, y, s], i) => (
        <Flower key={i} x={x} y={y} s={s} c={c} />
      ))}
      {/* niches in the flanking walls */}
      {variant === "wide" &&
        [
          [150, 180, 240, 330],
          [150, 560, 240, 400],
          [1210, 180, 240, 330],
          [1210, 560, 240, 400],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect fill="none" stroke={c.inlay} strokeWidth="1.4" x={x} y={y} width={w} height={h} opacity="0.8" />
            <path
              fill={c.deep}
              d={`M${x + 28} ${y + h} V${y + h * 0.4} C${x + 28} ${y + h * 0.26} ${x + w * 0.36} ${y + h * 0.16} ${x + w / 2} ${y + 24} C${x + w * 0.64} ${y + h * 0.16} ${x + w - 28} ${y + h * 0.26} ${x + w - 28} ${y + h * 0.4} V${y + h} Z`}
            />
          </g>
        ))}
      {/* the threshold */}
      <rect fill={c.deep} x="-500" y="962" width="2600" height="40" />
      <rect fill={c.inlay} x="-500" y="962" width="2600" height="2" opacity="0.35" />
    </svg>
  );
}

function Lantern({ variant, c }: { variant: "wide" | "narrow"; c: Grade }) {
  const g = GEO[variant];
  const top = g.apex - 20;
  const y = g.apex + (variant === "wide" ? 120 : 70);
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden className={`frame-${variant}`}>
      <g className="lamp" style={{ transformOrigin: `800px ${top}px` }}>
        <path stroke={c.brass} strokeWidth="1.6" d={`M800 ${top} V${y - 30}`} />
        <radialGradient id={`lamp-glow-${variant}`}>
          <stop offset="0" stopColor="#ffcf7d" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffcf7d" stopOpacity="0" />
        </radialGradient>
        <circle cx="800" cy={y} r="70" fill={`url(#lamp-glow-${variant})`} />
        <path fill={c.brass} d={`M786 ${y - 30} H814 L822 ${y - 18} H778 Z`} />
        <path fill={c.brass} d={`M780 ${y - 18} H820 L814 ${y + 16} H786 Z`} />
        <path fill="#ffd690" opacity="0.85" d={`M788 ${y - 14} H812 L808 ${y + 12} H792 Z`} />
        <path fill={c.brass} d={`M786 ${y + 16} H814 L800 ${y + 30} Z`} />
      </g>
    </svg>
  );
}

/* ── the garden and the pool ─────────────────────────────────────── */

const POOL = "M772 792 H828 L1010 1000 H590 Z";
const WALK_L = "M742 792 H772 L590 1000 H470 Z";
const WALK_R = "M828 792 H858 L1130 1000 H1010 Z";
const LAWN_L = "M-200 792 H742 L470 1000 H-200 Z";
const LAWN_R = "M858 792 H1800 V1000 H1130 Z";

function Garden({ dawn }: { dawn: MotionValue<number> }) {
  const reflection = useTransform(dawn, [0, 1], [0.1, 0.34]);
  const rows = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const e = t * t;
    return { y: 800 + e * 200, h: 34 + e * 230, dx: 70 + e * 330 };
  });
  const jets = Array.from({ length: 8 }, (_, i) => {
    const t = (i + 1) / 9;
    const e = t * t;
    return { y: 796 + e * 200, h: 4 + e * 26 };
  });
  return (
    <>
      <path fill="#22403c" d={LAWN_L} />
      <path fill="#22403c" d={LAWN_R} />
      <path fill="#433e69" d={WALK_L} />
      <path fill="#433e69" d={WALK_R} />
      <motion.g style={{ opacity: dawn }}>
        <path fill="#dcb3a4" d={WALK_L} />
        <path fill="#dcb3a4" d={WALK_R} />
        <path fill="#44705e" d={LAWN_L} opacity="0.6" />
        <path fill="#44705e" d={LAWN_R} opacity="0.6" />
      </motion.g>
      {rows.map((r, i) => (
        <g key={i}>
          <CypressTree x={800 - r.dx - 16} y={r.y} h={r.h} fill="#1f3b37" shade="#16302d" />
          <CypressTree x={800 + r.dx + 16} y={r.y} h={r.h} fill="#1f3b37" shade="#16302d" />
        </g>
      ))}
      <path fill="#1c2150" d={POOL} />
      <motion.path style={{ opacity: dawn }} fill="#cf9ea6" d={POOL} />
      <clipPath id="pool-clip">
        <path d={POOL} />
      </clipPath>
      <motion.g clipPath="url(#pool-clip)" style={{ opacity: reflection }}>
        <g transform="translate(0 1584) scale(1 -1)">
          <Taj x={800} y={792} s={1.34} tone={{ body: "#fbe9df", shade: "#ead0c6", deep: "#c4959c", trim: "#e0b8b0" }} />
        </g>
      </motion.g>
      <motion.g style={{ opacity: dawn }}>
        {jets.map((j, i) => (
          <g key={i}>
            <path stroke="#fff7ec" strokeWidth={0.8 + i * 0.25} strokeLinecap="round" d={`M800 ${j.y} V${j.y - j.h}`} opacity="0.85" />
            <circle cx="800" cy={j.y - j.h} r={1 + i * 0.4} fill="#fff7ec" opacity="0.7" />
          </g>
        ))}
      </motion.g>
      <rect x="560" y="788" width="480" height="6" fill="#8a84b4" />
    </>
  );
}

const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: Math.round(seeded(i, 1) * 1600),
  y: Math.round(seeded(i, 2) * 600),
  r: Math.round((0.5 + seeded(i, 3) * 1.6) * 10) / 10,
  d: Math.round(seeded(i, 4) * 50) / 10,
}));

const FLOCK = Array.from({ length: 7 }, (_, i) => ({
  x: Math.round(seeded(i, 41) * 220),
  y: Math.round(300 + seeded(i, 42) * 90),
  s: Math.round((0.6 + seeded(i, 43) * 0.6) * 100) / 100,
}));

/** A small diamond, the ornament either side of the presenter line. */
function Ornament() {
  return (
    <svg viewBox="-8 -8 16 16" className="tc-lotus" aria-hidden>
      <path d="M0 -6 L6 0 L0 6 L-6 0 Z" />
      <circle r="1.6" fill="#1b1320" />
    </svg>
  );
}

function TajScene({ p }: { p: P }) {
  const dawn = useTransform(p, [0.1, 0.7], [0, 1]);
  const stars = useTransform(dawn, [0, 0.7], [1, 0]);
  const sunY = useTransform(p, [0.08, 0.9], [0, -440]);
  const frameScale = useTransform(p, [0.05, 0.62], [1, 3.3]);
  const frameOpacity = useTransform(p, [0.36, 0.6], [1, 0]);
  const tajScale = useTransform(p, [0, 1], [1, 1.12]);
  const gardenScale = useTransform(p, [0, 1], [1, 1.2]);
  const flockX = useTransform(p, [0.3, 1], [-300, 1200]);
  const mistX = useTransform(p, [0, 1], [-60, 60]);
  // the lamp is lit as the title card leaves the sky
  const lamp = useTransform(p, [0.16, 0.28], [0, 1]);

  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#0a0d26 0%, #1a1f4a 48%, #3a3363 100%)" }} />
      <motion.div className="sky" style={{ opacity: dawn, background: "linear-gradient(#34427c 0%, #9d7aa4 34%, #eaa597 62%, #fcd2a2 88%, #ffe3b4 100%)" }} />

      <Layer>
        <motion.g style={{ opacity: stars }}>
          {STARS.map((s, i) => (
            <circle key={i} className="twinkle" cx={s.x} cy={s.y} r={s.r} fill="#fff4dc" style={{ animationDelay: `${s.d}s` }} />
          ))}
        </motion.g>
        <radialGradient id="dawn-sun">
          <stop offset="0" stopColor="#fff0c8" />
          <stop offset="0.35" stopColor="#ffd9a0" />
          <stop offset="1" stopColor="#ffb98a" stopOpacity="0" />
        </radialGradient>
        <motion.g style={{ y: sunY }}>
          <circle cx="800" cy="1070" r="330" fill="url(#dawn-sun)" />
          <circle cx="800" cy="1070" r="120" fill="#fff0cf" />
        </motion.g>
        <motion.g style={{ opacity: dawn }} fill="#f6bca9">
          <path d="M120 366 C221.2 349.2 442 346.8 580 363.6 C451.2 373.2 258 374.4 120 366 Z" opacity="0.8"/>
          <path d="M220 390 C281.6 378.8 416 377.2 500 388.4 C421.6 394.8 304 395.6 220 390 Z" opacity="0.6"/>
          <path d="M1040 335.5 C1132.4 320.1 1334 317.9 1460 333.3 C1342.4 342.1 1166 343.2 1040 335.5 Z" opacity="0.7" fill="#d9a3bd"/>
          <path d="M1120 357.5 C1172.8 347.7 1288 346.3 1360 356.1 C1292.8 361.7 1192 362.4 1120 357.5 Z" opacity="0.6"/>
          <path d="M640 253 C706 244.6 850 243.4 940 251.8 C856 256.6 730 257.2 640 253 Z" opacity="0.4" fill="#d9a3bd"/>
        </motion.g>
        <motion.g style={{ x: flockX, opacity: dawn }}>
          {FLOCK.map((b, i) => (
            <path key={i} fill="none" stroke="#4b3350" strokeWidth="1.8" strokeLinecap="round" d={`M${b.x} ${b.y} q${6 * b.s} ${-6 * b.s} ${12 * b.s} 0 q${6 * b.s} ${-6 * b.s} ${12 * b.s} 0`} />
          ))}
        </motion.g>
        {/* the far bank of the Yamuna */}
        <path fill="#2d2f5e" d="M-200 792 C200 776 400 784 560 780 C700 776 900 776 1040 780 C1200 784 1400 774 1800 786 V800 H-200 Z" />
        <motion.path style={{ opacity: dawn }} fill="#c68c9a" d="M-200 792 C200 776 400 784 560 780 C700 776 900 776 1040 780 C1200 784 1400 774 1800 786 V800 H-200 Z" />
      </Layer>

      <Layer style={{ scale: tajScale }}>
        <Taj x={800} y={792} s={1.34} tone={NIGHT_TAJ} />
        <motion.g style={{ opacity: dawn }}>
          <Taj x={800} y={792} s={1.34} tone={DAWN_TAJ} />
        </motion.g>
        {/* morning mist lying over the garden */}
        <motion.g style={{ opacity: dawn, x: mistX }} fill="#fbe6dc">
          <path d="M200 778 C354 755.6 690 752.4 900 774.8 C704 787.6 410 789.2 200 778 Z" opacity="0.35"/>
          <path d="M760 788 C896.4 771.2 1194 768.8 1380 785.6 C1206.4 795.2 946 796.4 760 788 Z" opacity="0.3"/>
        </motion.g>
      </Layer>

      <Layer style={{ scale: gardenScale }} origin="50% 79%">
        <Garden dawn={dawn} />
      </Layer>

      <motion.div className="layer gate" style={{ scale: frameScale, opacity: frameOpacity, transformOrigin: "50% 62%" }}>
        <Gate variant="wide" c={NIGHT_GATE} />
        <Gate variant="narrow" c={NIGHT_GATE} />
        <motion.div className="layer" style={{ opacity: dawn }}>
          <Gate variant="wide" c={DAWN_GATE} />
          <Gate variant="narrow" c={DAWN_GATE} />
        </motion.div>
        <motion.div className="layer" style={{ opacity: lamp }}>
          <Lantern variant="wide" c={NIGHT_GATE} />
          <Lantern variant="narrow" c={NIGHT_GATE} />
        </motion.div>
      </motion.div>
      <div className="vignette" aria-hidden />

      {/* the title card, set in the night sky inside the arch */}
      <Caption p={p} at={[-0.1, 0]} out={0.26} className="titlecard">
        <p className="tc-presents">
          <i className="tc-rule" aria-hidden />
          <Ornament />
          <span>Galgotias University</span>
          <Ornament />
          <i className="tc-rule" aria-hidden />
        </p>
        <h1 className="tc-title">
          <span className="tc-l1">Learn in India</span>
          <span className="tc-l2">Build for the world</span>
        </h1>
        <p className="tc-sub">International Short-Term Programmes</p>
      </Caption>

      {/* and the billing block, as on a film poster */}
      <Caption p={p} at={[-0.1, 0]} out={0.2} className="billing">
        <p className="b1">
          <span>
            Four <br className="br" />
            programmes
          </span>
          <span>
            Three with <br className="br" />
            Larsen &amp; Toubro
          </span>
          <span>
            Galgotias University, <br className="br" />
            Greater Noida
          </span>
        </p>
        <p className="b2">{EDITION.dates}</p>
        <p className="b3">
          <span>In collaboration with</span>
          <Image src="/logos/lt-white.png" width={86} height={16} alt="Larsen &amp; Toubro" />
        </p>
        <span className="scrollcue" aria-hidden />
      </Caption>

      <Caption p={p} at={[0.5, 0.62]} className="location">
        <span>Taj Mahal · Agra</span>
      </Caption>
    </>
  );
}

export function SceneTaj() {
  return (
    <Scene id="dawn" length={300} label="Opening: the Taj Mahal at dawn, seen through the great gate" className="s-taj">
      {(p) => <TajScene p={p} />}
    </Scene>
  );
}

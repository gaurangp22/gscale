"use client";

import Link from "next/link";
import { motion, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Caption, Layer, Scene, seeded, type P } from "./stage";
import { FORM_HREF } from "./scene-programmes";

/* ─────────────────────────────────────────────────────────────────────────
   04 · Share & graduate. The main gate, at night.

   Galgotias University's gateway — two sandstone piers under a long
   lintel carrying the university's name — lit for graduation night, hung
   with strings of lights, the campus glowing beyond it and searchlights
   sweeping the sky, the audience in silhouette. As you scroll, graduation
   caps go up, lanterns rise and a few fireworks open. Then the frame dims and the
   invitation takes the screen on its own.
   ───────────────────────────────────────────────────────────────────────── */

const LANTERNS = Array.from({ length: 18 }, (_, i) => ({
  x: Math.round(160 + seeded(i, 7) * 1280),
  y0: Math.round(860 + seeded(i, 8) * 100),
  rise: Math.round(700 + seeded(i, 9) * 700),
  s: Math.round((0.5 + seeded(i, 10) * 0.6) * 100) / 100,
  start: Math.round(seeded(i, 11) * 30) / 100,
  sway: Math.round(seeded(i, 12) * 40) / 10,
}));

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: Math.round(seeded(i, 21) * 1600),
  y: Math.round(seeded(i, 22) * 400),
  r: Math.round((0.5 + seeded(i, 23) * 1.4) * 10) / 10,
}));

const CAPS = Array.from({ length: 9 }, (_, i) => ({
  x: Math.round(420 + seeded(i, 61) * 760),
  rise: Math.round(260 + seeded(i, 62) * 260),
  r: Math.round(-40 + seeded(i, 63) * 80),
  at: Math.round((0.12 + seeded(i, 64) * 0.2) * 100) / 100,
}));

function Lantern({ p, l }: { p: P; l: (typeof LANTERNS)[number] }) {
  const k = useTransform(p, [l.start, Math.min(1, l.start + 0.7)], [0, 1]);
  const y = useTransform(k, [0, 1], [0, -l.rise]);
  const o = useTransform(k, [0, 0.06, 0.85, 1], [0, 1, 1, 0.4]);
  return (
    <motion.g style={{ y, opacity: o }}>
      <g className="sway" style={{ animationDelay: `${-l.sway}s`, transformOrigin: `${l.x}px ${l.y0}px` }}>
        <g transform={`translate(${l.x} ${l.y0}) scale(${l.s})`}>
          <circle cx="0" cy="-10" r="34" fill="url(#warm-glow)" />
          <path fill="#f6a445" d="M-15 -34 Q0 -40 15 -34 L12 8 Q0 12 -12 8 Z" />
          <path fill="#ffd28a" d="M-7 -30 Q0 -33 7 -30 L6 4 Q0 6 -6 4 Z" />
        </g>
      </g>
    </motion.g>
  );
}

function Cap({ p, c }: { p: P; c: (typeof CAPS)[number] }) {
  const k = useTransform(p, [c.at, c.at + 0.22], [0, 1]);
  const y = useTransform(k, [0, 0.6, 1], [0, -c.rise, -c.rise * 0.85]);
  const rotate = useTransform(k, [0, 1], [0, c.r * 4]);
  const opacity = useTransform(k, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  return (
    <motion.g style={{ y, opacity }}>
      <motion.g style={{ rotate, transformBox: "fill-box", transformOrigin: "center" }}>
        <path fill="#15101f" d={`M${c.x - 22} 800 L${c.x} 790 L${c.x + 22} 800 L${c.x} 810 Z`} />
        <path fill="#15101f" d={`M${c.x - 12} 804 V812 C${c.x - 6} 816 ${c.x + 6} 816 ${c.x + 12} 812 V804 Z`} />
        <path stroke="#f2b441" strokeWidth="1.6" fill="none" d={`M${c.x} 800 L${c.x + 14} 806 V816`} />
      </motion.g>
    </motion.g>
  );
}

function Burst({ p, at, x, y, r, color }: { p: P; at: number; x: number; y: number; r: number; color: string }) {
  const k = useTransform(p, [at, at + 0.12], [0, 1]);
  const scale = useTransform(k, [0, 1], [0.2, 1]);
  const opacity = useTransform(k, [0, 0.15, 0.7, 1], [0, 1, 0.8, 0]);
  const f = (n: number) => n.toFixed(1);
  return (
    <motion.g style={{ scale, opacity, transformBox: "fill-box", transformOrigin: "center" }}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <path key={i} stroke={color} strokeWidth="2.4" strokeLinecap="round"
            d={`M${f(x + Math.cos(a) * r * 0.3)} ${f(y + Math.sin(a) * r * 0.3)} L${f(x + Math.cos(a) * r)} ${f(y + Math.sin(a) * r)}`} />
        );
      })}
    </motion.g>
  );
}

/** A string of lights, hung between two points. */
function Lights({ x1, y1, x2, y2, sag, n }: { x1: number; y1: number; x2: number; y2: number; sag: number; n: number }) {
  const f = (v: number) => v.toFixed(1);
  const pt = (t: number) => ({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t + sag * 4 * t * (1 - t) });
  const mid = pt(0.5);
  return (
    <g>
      <path fill="none" stroke="#3b2a3a" strokeWidth="1.4" d={`M${x1} ${y1} Q${f(mid.x)} ${f(2 * mid.y - (y1 + y2) / 2)} ${x2} ${y2}`} />
      {Array.from({ length: n }, (_, i) => {
        const q = pt((i + 0.5) / n);
        return (
          <g key={i}>
            <circle cx={f(q.x)} cy={f(q.y + 5)} r="9" fill="url(#warm-glow)" />
            <circle className="bulb" style={{ animationDelay: `${(i % 5) * 0.4}s` }} cx={f(q.x)} cy={f(q.y + 5)} r="3.2" fill="#ffd89a" />
          </g>
        );
      })}
    </g>
  );
}

/* The campus beyond the gate, as it looks at night: long academic blocks
   in red sandstone and pale stone, warm window grids between vertical
   fins, a lit strip along every roofline, and uplit palms lining the
   walkways. */
type Block = { x: number; w: number; h: number; tone: "red" | "stone"; atrium?: boolean };

const BLOCKS: Block[] = [
  { x: 40, w: 460, h: 250, tone: "red" },
  { x: 560, w: 480, h: 320, tone: "stone", atrium: true },
  { x: 1100, w: 460, h: 270, tone: "red" },
];

function CampusBlock({ b }: { b: Block }) {
  const H = 800;
  const top = H - b.h;
  const face = b.tone === "red" ? "#6e3226" : "#7d756c";
  const shade = b.tone === "red" ? "#56261d" : "#625b54";
  const fin = b.tone === "red" ? "#8a4a3a" : "#a39a8f";
  const rows = Math.floor((b.h - 50) / 26);
  const bays = Math.floor(b.w / 22);
  return (
    <g>
      <rect x={b.x} y={top} width={b.w} height={b.h} fill={face} />
      <rect x={b.x + b.w - 30} y={top} width="30" height={b.h} fill={shade} />
      {/* window strips, lit unevenly, as an occupied building is at night */}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: bays }, (_, c) => {
          const lit = seeded(r * 97 + c + b.x, 91) > 0.28;
          return (
            <rect
              key={`${r}-${c}`}
              x={b.x + 8 + c * 22}
              y={top + 30 + r * 26}
              width="16"
              height="15"
              fill={lit ? "#ffd08a" : "#2c2227"}
              opacity={lit ? 0.55 + seeded(r + c, 92) * 0.4 : 1}
            />
          );
        }),
      )}
      {/* vertical fins */}
      {Array.from({ length: Math.floor(bays / 3) }, (_, i) => (
        <rect key={i} x={b.x + 4 + i * 66} y={top + 22} width="4" height={b.h - 40} fill={fin} />
      ))}
      {b.atrium && (
        <g>
          <rect x={b.x + b.w * 0.38} y={top - 30} width={b.w * 0.24} height={b.h + 30} fill="#2c4a66" />
          {Array.from({ length: 11 }, (_, i) => (
            <rect key={i} x={b.x + b.w * 0.38 + 6} y={top - 20 + i * 30} width={b.w * 0.24 - 12} height="18" fill="#ffd9a0" opacity={0.35 + (i % 3) * 0.18} />
          ))}
          <rect x={b.x + b.w * 0.38} y={top - 32} width={b.w * 0.24} height="3" fill="#fff0cf" />
        </g>
      )}
      {/* the lit roofline */}
      <rect x={b.x} y={top - 2} width={b.w} height="3" fill="#fff0cf" opacity="0.9" />
      <rect x={b.x} y={top - 10} width={b.w} height="16" fill="url(#roof-glow)" />
      {/* wide steps up to the entrance */}
      <rect x={b.x + b.w * 0.3} y={H - 16} width={b.w * 0.4} height="16" fill={shade} />
    </g>
  );
}

function Palm({ x, h, lean }: { x: number; h: number; lean: number }) {
  const y = 860;
  const topX = x + lean;
  const topY = y - h;
  const fronds = [
    [-58, 10], [-44, -22], [-14, -36], [18, -34], [46, -18], [60, 12], [-30, 26], [32, 28],
  ];
  return (
    <g>
      <ellipse cx={x} cy={y} rx="26" ry="6" fill="#ffcf86" opacity="0.25" />
      <path fill="none" stroke="#3a2a22" strokeWidth="7" strokeLinecap="round" d={`M${x} ${y} Q${x + lean * 0.2} ${y - h * 0.6} ${topX} ${topY}`} />
      <path fill="none" stroke="#ffcf86" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" d={`M${x - 2} ${y} Q${x + lean * 0.2 - 2} ${y - h * 0.6} ${topX - 2} ${topY}`} />
      {fronds.map(([dx, dy], i) => (
        <path key={i} fill="#1f3326" d={`M${topX} ${topY} Q${topX + dx * 0.5} ${topY + dy - 18} ${topX + dx} ${topY + dy} Q${topX + dx * 0.55} ${topY + dy - 6} ${topX} ${topY + 3} Z`} />
      ))}
    </g>
  );
}

function CampusBeyond() {
  const palms = [
    { x: 170, h: 180, lean: -14 },
    { x: 300, h: 210, lean: 10 },
    { x: 420, h: 170, lean: -8 },
    { x: 1180, h: 175, lean: 8 },
    { x: 1300, h: 215, lean: -10 },
    { x: 1430, h: 185, lean: 12 },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="roof-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcf86" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffcf86" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffcf86" stopOpacity="0" />
        </linearGradient>
      </defs>
      {BLOCKS.map((b) => (
        <CampusBlock key={b.x} b={b} />
      ))}
      {/* the paved walk, and its lamps */}
      <path fill="#2a2230" d="M0 800 H1600 V1000 H0 Z" />
      <path fill="#3a2f3a" d="M0 800 H1600 V812 H0 Z" />
      {[90, 520, 1080, 1510].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="730" width="4" height="120" fill="#1a1420" />
          <circle cx={x} cy="728" r="6" fill="#fff0cf" />
          <circle cx={x} cy="728" r="26" fill="url(#warm-glow)" />
        </g>
      ))}
      {palms.map((pl) => (
        <Palm key={pl.x} {...pl} />
      ))}
    </g>
  );
}

/* The main gateway: two sandstone piers under a long lintel that runs
   past them on either side, the university's name across its face. */
function Gateway() {
  const S = "#c79c73";
  const SHADE = "#a47a58";
  const DEEP = "#6e4e3a";
  const LIT = "#e2bb8e";
  const pier = (x: number) => (
    <g key={x}>
      <rect x={x} y={-300} width="120" height="300" fill={S} />
      <rect x={x + 84} y={-300} width="36" height="300" fill={SHADE} />
      <rect x={x} y={-300} width="12" height="300" fill={LIT} />
      {[30, 54].map((dx) => (
        <rect key={dx} x={x + dx} y={-280} width="5" height="260" fill={DEEP} opacity="0.45" />
      ))}
      <rect x={x - 6} y={-18} width="132" height="18" fill={SHADE} />
    </g>
  );
  return (
    <g transform="translate(800 880) scale(0.8)">
      {pier(-310)}
      {pier(190)}
      {/* the lintel */}
      <rect x={-420} y={-300} width="840" height="18" fill={SHADE} />
      <rect x={-440} y={-392} width="880" height="92" fill={S} />
      <rect x={-440} y={-392} width="880" height="10" fill={LIT} />
      <rect x={-440} y={-312} width="880" height="12" fill={SHADE} />
      <rect x={380} y={-392} width="60" height="92" fill={SHADE} opacity="0.6" />
      <text
        x="-20"
        y="-332"
        textAnchor="middle"
        fontFamily="var(--lii-display), Georgia, serif"
        fontSize="42"
        fontWeight="600"
        letterSpacing="9"
        fill={DEEP}
      >
        GALGOTIAS UNIVERSITY
      </text>
      {/* uplight washing the face */}
      <rect x={-440} y={-392} width="880" height="92" fill="url(#uplight)" />
      <rect x={-310} y={-300} width="120" height="300" fill="url(#uplight)" />
      <rect x={190} y={-300} width="120" height="300" fill="url(#uplight)" />
      {/* banners either side */}
      {[-470, 470].map((x) => (
        <g key={x}>
          <rect x={x - 2} y={-380} width="4" height="380" fill="#2a2024" />
          <path fill="#b3262e" d={`M${x + 2} -370 H${x + 34} V-250 L${x + 18} -262 L${x + 2} -250 Z`} />
        </g>
      ))}
    </g>
  );
}

function Audience() {
  return (
    <g>
      <path fill="#0f0b18" d="M0 900 H1600 V1000 H0 Z" />
      {Array.from({ length: 26 }, (_, i) => {
        const x = 20 + i * 62 + (i % 3) * 8;
        const s = 0.8 + ((i * 37) % 10) / 30;
        return (
          <g key={i} fill="#0b0812" transform={`translate(${x} 1000) scale(${s.toFixed(2)})`}>
            <circle cx="0" cy="-118" r="22" />
            <path d="M-50 0 C-50 -56 -32 -88 0 -88 C32 -88 50 -56 50 0 Z" />
          </g>
        );
      })}
    </g>
  );
}

/** Two searchlights sweeping the sky from behind the campus. */
function Searchlights() {
  return (
    <g>
      <g className="beam" style={{ transformOrigin: "420px 800px" }}>
        <path fill="url(#beam)" d="M410 800 L430 800 L560 60 L300 60 Z" />
      </g>
      <g className="beam b2" style={{ transformOrigin: "1180px 800px" }}>
        <path fill="url(#beam)" d="M1170 800 L1190 800 L1320 60 L1060 60 Z" />
      </g>
    </g>
  );
}

function FinaleScene({ p }: { p: P }) {
  const push = useTransform(p, [0, 1], [1.06, 1]);
  // at the end the frame dims, and the invitation has the screen to itself
  const dim = useTransform(p, [0.5, 0.64], [0, 0.78]);
  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#0d0b22 0%, #1c1636 55%, #3a2140 100%)" }} />
      <Layer>
        <defs>
          <radialGradient id="warm-glow">
            <stop offset="0" stopColor="#ffc877" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffc877" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#fff1cf" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff1cf" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="uplight" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffc877" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffc877" stopOpacity="0" />
          </linearGradient>
        </defs>
        {STARS.map((s, i) => (
          <circle key={i} className="twinkle" cx={s.x} cy={s.y} r={s.r} fill="#fff1d8" style={{ animationDelay: `${(i % 7) * 0.6}s` }} />
        ))}
        <circle cx="1330" cy="150" r="40" fill="#f7ecd6" />
        <circle cx="1346" cy="141" r="37" fill="#171230" />
        <Burst p={p} at={0.22} x={330} y={230} r={90} color="#f2b441" />
        <Burst p={p} at={0.32} x={1250} y={280} r={70} color="#f29a86" />
        <Burst p={p} at={0.42} x={560} y={140} r={56} color="#9fd8c6" />
      </Layer>
      <Layer style={{ scale: push }} origin="50% 86%">
        <Searchlights />
        <CampusBeyond />
        <Gateway />
        {/* strings of lights hung under the lintel for the night */}
        <Lights x1={470} y1={646} x2={800} y2={646} sag={40} n={10} />
        <Lights x1={800} y1={646} x2={1130} y2={646} sag={40} n={10} />
        <Lights x1={-40} y1={520} x2={424} y2={580} sag={50} n={12} />
        <Lights x1={1176} y1={580} x2={1640} y2={520} sag={50} n={12} />
        <Audience />
        {CAPS.map((c, i) => (
          <Cap key={i} p={p} c={c} />
        ))}
      </Layer>
      <Layer>
        {LANTERNS.map((l, i) => (
          <Lantern key={i} p={p} l={l} />
        ))}
      </Layer>
      <motion.div className="dim" style={{ opacity: dim }} aria-hidden />

      <Caption p={p} at={[0.04, 0.14]} out={0.46} className="cap-card cap-left dark">
        <p className="slate">
          <b>04</b> Share &amp; graduate
        </p>
        <h2>The best teams meet in the final.</h2>
        <p>
          The strongest teams from all four programmes present in the Grand Challenge Finals. The
          programme closes with graduation and awards.
        </p>
      </Caption>

      <Caption p={p} at={[0.6, 0.72]} className="cap-final dark">
        <p className="slate">International Short-Term Programmes · 7–20 December 2026</p>
        <h2>Express interest.</h2>
        <p className="final-sub">
          Share a few details and Galgotias University&rsquo;s international office will get back
          to you.
        </p>
        <div className="final-actions">
          <Link href={FORM_HREF} className="film-btn film-btn-sun">
            Express interest <ArrowRight size={16} weight="bold" />
          </Link>
          <a href="#notes" className="film-btn film-btn-ghost">
            Read the programme notes
          </a>
        </div>
      </Caption>
    </>
  );
}

export function SceneFinale() {
  return (
    <Scene id="graduate" length={260} label="Share and graduate: graduation night on the Galgotias University campus" className="s-finale">
      {(p) => <FinaleScene p={p} />}
    </Scene>
  );
}

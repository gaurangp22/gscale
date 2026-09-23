"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Scene, type P } from "./stage";
import { PROGRAMMES, type Programme } from "../content";

export const FORM_HREF = "/learn-in-india/express-interest";

/* ─────────────────────────────────────────────────────────────────────────
   The four programmes: four shots, each in its own colour world, seen
   through a jharokha — the arched balcony window of Mughal and Rajput
   architecture. Each window holds a small animated film of the work
   itself, driven by the scroll.
   ───────────────────────────────────────────────────────────────────────── */

type LP = MotionValue<number>;

const WORLD: Record<Programme["id"], { bg: string; ink: string; a: string; b: string; soft: string }> = {
  A: { bg: "#1d2a4c", ink: "#f6efe3", a: "#8fb6e8", b: "#f2b441", soft: "#2c3d6c" },
  B: { bg: "#35264f", ink: "#f6efe3", a: "#c9b3f0", b: "#f2b441", soft: "#4a3870" },
  C: { bg: "#113a2d", ink: "#f6efe3", a: "#94dcb2", b: "#f2b441", soft: "#1d5442" },
  D: { bg: "#58241a", ink: "#f6efe3", a: "#f39a6b", b: "#7ccdc2", soft: "#763526" },
};

/* ── A · Digital Futures: an app assembling itself ──────────────────── */
function FilmA({ lp }: { lp: LP }) {
  const w = WORLD.A;
  const tiles = Array.from({ length: 12 }, (_, i) => ({
    gx: 222 + (i % 3) * 54,
    gy: 214 + Math.floor(i / 3) * 62,
    sx: [60, 520, 90, 480, 40, 540, 120, 460, 70, 510, 150, 430][i],
    sy: [120, 160, 600, 640, 380, 330, 90, 90, 520, 500, 660, 680][i],
    c: [w.a, w.b, w.ink, w.a, w.ink, w.b, w.a, w.ink, w.b, w.a, w.b, w.ink][i],
  }));
  const bubble = useTransform(lp, [0.7, 0.82], [0, 1]);
  return (
    <>
      <rect width="600" height="700" fill={w.bg} />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 600} cy={(i * 173) % 700} r={i % 5 ? 1.2 : 2} fill={w.a} opacity="0.35" />
      ))}
      <rect x="190" y="150" width="220" height="440" rx="34" fill={w.ink} />
      <rect x="202" y="176" width="196" height="388" rx="20" fill={w.soft} />
      <rect x="270" y="160" width="60" height="8" rx="4" fill={w.bg} />
      {tiles.map((t, i) => (
        <Tile key={i} lp={lp} i={i} t={t} />
      ))}
      {[
        { x: 90, y: 250, d: "M-14 -10 H14 V12 H-14 Z M0 -10 V12", label: "learning" },
        { x: 510, y: 230, d: "M0 12 C-22 -4 -14 -18 0 -8 C14 -18 22 -4 0 12 Z", label: "health" },
        { x: 100, y: 520, d: "M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", label: "ai" },
        { x: 500, y: 500, d: "M-10 -6 a6 6 0 1 0 0.1 0 Z M10 -6 a6 6 0 1 0 0.1 0 Z M-20 14 q10 -12 20 0 q10 -12 20 0", label: "people" },
      ].map((ic, i) => (
        <Icon key={ic.label} lp={lp} i={i} x={ic.x} y={ic.y} d={ic.d} fill={i % 2 ? w.b : w.a} />
      ))}
      <motion.g style={{ opacity: bubble, y: useTransform(bubble, [0, 1], [16, 0]) }}>
        <rect x="236" y="96" width="228" height="44" rx="22" fill={w.b} />
        <circle cx="260" cy="118" r="9" fill={w.bg} />
        <text x="280" y="124" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="600" fill={w.bg}>
          MVP · validated
        </text>
      </motion.g>
    </>
  );
}

function Tile({ lp, i, t }: { lp: LP; i: number; t: { gx: number; gy: number; sx: number; sy: number; c: string } }) {
  const s = 0.05 + i * 0.045;
  const k = useTransform(lp, [s, s + 0.2], [0, 1]);
  const x = useTransform(k, [0, 1], [t.sx - t.gx, 0]);
  const y = useTransform(k, [0, 1], [t.sy - t.gy, 0]);
  const r = useTransform(k, [0, 1], [(i % 2 ? 1 : -1) * 30, 0]);
  return (
    <motion.rect
      x={t.gx - 20}
      y={t.gy - 20}
      width="40"
      height="40"
      rx="11"
      fill={t.c}
      style={{ x, y, rotate: r, transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

function Icon({ lp, i, x, y, d, fill }: { lp: LP; i: number; x: number; y: number; d: string; fill: string }) {
  const o = useTransform(lp, [0.45 + i * 0.06, 0.55 + i * 0.06], [0, 1]);
  return (
    <motion.g style={{ opacity: o }}>
      <g className="bob" style={{ animationDelay: `${i * -0.8}s` }}>
        <circle cx={x} cy={y} r="34" fill="none" stroke={fill} strokeOpacity="0.5" strokeDasharray="3 5" />
        <path transform={`translate(${x} ${y})`} d={d} fill={i === 3 ? "none" : fill} stroke={fill} strokeWidth="2.4" strokeLinejoin="round" />
      </g>
    </motion.g>
  );
}

/* ── B · Digital Product Engineering & AI: code becomes product ─────── */
function FilmB({ lp }: { lp: LP }) {
  const w = WORLD.B;
  const lines = [70, 130, 96, 150, 60, 120, 84, 110];
  const sparkT = useTransform(lp, [0.35, 0.65], [0, 1]);
  const sx = useTransform(sparkT, (t) => (1 - t) * (1 - t) * 300 + 2 * (1 - t) * t * 470 + t * t * 400);
  const sy = useTransform(sparkT, (t) => (1 - t) * (1 - t) * 330 + 2 * (1 - t) * t * 300 + t * t * 400);
  return (
    <>
      <rect width="600" height="700" fill={w.bg} />
      {/* editor */}
      <rect x="50" y="130" width="300" height="250" rx="12" fill={w.soft} />
      <rect x="50" y="130" width="300" height="30" rx="12" fill="#2a1e40" />
      {[72, 90, 108].map((x, i) => (
        <circle key={x} cx={x} cy="145" r="5" fill={[w.a, w.b, "#8fd3b8"][i]} />
      ))}
      {lines.map((len, i) => (
        <Line key={i} lp={lp} i={i} x={74 + (i % 3 === 1 ? 20 : 0)} y={180 + i * 23} len={len} c={i % 3 === 0 ? w.b : w.a} />
      ))}
      <path d="M300 330 Q470 300 400 400" fill="none" stroke={w.a} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 6" />
      <motion.g style={{ x: useTransform(sx, (v) => v - 300), y: useTransform(sy, (v) => v - 330) }}>
        <path transform="translate(300 330)" fill={w.b} d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z" />
      </motion.g>
      {/* product */}
      <rect x="250" y="380" width="300" height="230" rx="12" fill={w.ink} />
      <rect x="250" y="380" width="300" height="34" rx="12" fill="#e7def3" />
      <rect x="268" y="392" width="80" height="10" rx="5" fill={w.bg} opacity="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} lp={lp} i={i} x={280 + i * 34} />
      ))}
      <Card lp={lp} i={0} x={450} y={440} c={w.a} />
      <Card lp={lp} i={1} x={450} y={500} c={w.b} />
      <Card lp={lp} i={2} x={450} y={560} c="#8fd3b8" />
      {/* the squad */}
      {["PO", "B", "D", "S"].map((t, i) => (
        <g key={t} transform={`translate(${90 + i * 50} 652)`}>
          <circle r="22" fill={[w.a, w.b, "#8fd3b8", "#f29a86"][i]} />
          <text y="5" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill={w.bg}>
            {t}
          </text>
        </g>
      ))}
    </>
  );
}

function Line({ lp, i, x, y, len, c }: { lp: LP; i: number; x: number; y: number; len: number; c: string }) {
  const s = 0.04 + i * 0.05;
  const sc = useTransform(lp, [s, s + 0.08], [0, 1]);
  return <motion.rect x={x} y={y} width={len} height="9" rx="4.5" fill={c} style={{ scaleX: sc, transformBox: "fill-box", transformOrigin: "0% 50%" }} />;
}
function Bar({ lp, i, x }: { lp: LP; i: number; x: number }) {
  const h = [60, 96, 74, 130, 112][i];
  const sc = useTransform(lp, [0.55 + i * 0.05, 0.7 + i * 0.05], [0, 1]);
  return (
    <motion.rect x={x} y={590 - h} width="22" height={h} rx="4" fill={i === 3 ? "#35264f" : "#b9a6dd"} style={{ scaleY: sc, transformBox: "fill-box", transformOrigin: "50% 100%" }} />
  );
}
function Card({ lp, i, x, y, c }: { lp: LP; i: number; x: number; y: number; c: string }) {
  const o = useTransform(lp, [0.66 + i * 0.07, 0.74 + i * 0.07], [0, 1]);
  return (
    <motion.g style={{ opacity: o }}>
      <rect x={x} y={y} width="82" height="44" rx="8" fill={c} />
      <rect x={x + 10} y={y + 12} width="40" height="6" rx="3" fill="#35264f" opacity="0.5" />
      <rect x={x + 10} y={y + 24} width="56" height="6" rx="3" fill="#35264f" opacity="0.3" />
    </motion.g>
  );
}

/* ── C · E-Mobility Futures: an EV under a solar canopy ─────────────── */
function FilmC({ lp }: { lp: LP }) {
  const w = WORLD.C;
  const carX = useTransform(lp, [0.05, 0.5], [-420, 0]);
  const plug = useTransform(lp, [0.5, 0.6], [0, 1]);
  const charge = useTransform(lp, [0.6, 0.95], [0.08, 1]);
  return (
    <>
      <rect width="600" height="700" fill={w.bg} />
      <g className="spin-slow" style={{ transformOrigin: "480px 130px" }}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const f = (n: number) => n.toFixed(1);
          return <path key={i} stroke={w.b} strokeWidth="4" strokeLinecap="round" d={`M${f(480 + Math.cos(a) * 58)} ${f(130 + Math.sin(a) * 58)} L${f(480 + Math.cos(a) * 74)} ${f(130 + Math.sin(a) * 74)}`} />;
        })}
      </g>
      <circle cx="480" cy="130" r="44" fill={w.b} />
      {/* pylon and lines: vehicle-to-grid */}
      <path fill="none" stroke="#6fa892" strokeWidth="4" d="M70 560 L100 250 L130 560 M84 400 H116 M78 460 H122 M60 290 H140" />
      <path className="flow" fill="none" stroke={w.a} strokeWidth="3" strokeDasharray="8 10" d="M140 290 C260 300 330 330 360 340" />
      <path className="flow reverse" fill="none" stroke={w.b} strokeWidth="3" strokeDasharray="8 10" d="M140 310 C250 330 320 360 356 368" />
      {/* the canopy */}
      <path fill="#26496b" d="M230 330 L560 290 L560 318 L230 358 Z" />
      <path stroke="#4f7aa3" strokeWidth="1.5" d="M300 322 L300 350 M370 313 L370 341 M440 305 L440 333 M510 297 L510 325 M230 344 L560 304" />
      <rect x="250" y="355" width="8" height="220" fill="#8db6a4" />
      <rect x="532" y="316" width="8" height="259" fill="#8db6a4" />
      {/* charger */}
      <rect x="470" y="470" width="40" height="105" rx="6" fill={w.ink} />
      <rect x="478" y="482" width="24" height="30" rx="3" fill={w.soft} />
      <motion.path style={{ pathLength: plug }} fill="none" stroke={w.ink} strokeWidth="5" strokeLinecap="round" d="M490 530 C490 580 430 590 400 540" />
      {/* road */}
      <rect x="0" y="575" width="600" height="125" fill="#0c2b21" />
      <path className="road-dash" stroke="#3f7560" strokeWidth="5" strokeDasharray="30 26" d="M0 640 H600" />
      {/* the car */}
      <motion.g style={{ x: carX }}>
        <path fill={w.a} d="M150 570 V536 C150 526 158 520 168 518 L220 486 C230 478 244 476 258 476 H330 C348 476 362 486 372 500 L386 516 C400 520 410 530 410 546 V570 Z" />
        <path fill={w.bg} opacity="0.55" d="M232 516 L262 492 H300 V516 Z M312 492 H330 C342 492 352 500 360 516 H312 Z" />
        <circle cx="206" cy="572" r="24" fill="#0a1f18" />
        <circle cx="206" cy="572" r="10" fill={w.ink} />
        <circle cx="354" cy="572" r="24" fill="#0a1f18" />
        <circle cx="354" cy="572" r="10" fill={w.ink} />
      </motion.g>
      {/* the battery */}
      <g transform="translate(200 410)">
        <rect x="0" y="0" width="120" height="48" rx="8" fill="none" stroke={w.ink} strokeWidth="4" />
        <rect x="120" y="14" width="10" height="20" rx="3" fill={w.ink} />
        <motion.rect x="8" y="8" width="104" height="32" rx="4" fill={w.a} style={{ scaleX: charge, transformBox: "fill-box", transformOrigin: "0% 50%" }} />
        <path fill={w.b} d="M62 4 L46 26 H58 L52 44 L72 20 H60 L66 4 Z" />
      </g>
    </>
  );
}

/* ── D · Smart City Engineering: the map comes alive ────────────────── */
function FilmD({ lp }: { lp: LP }) {
  const w = WORLD.D;
  const flood = useTransform(lp, [0.3, 0.7], [1, 0.25]);
  const route = useTransform(lp, [0.2, 0.6], [0, 1]);
  const scanX = useTransform(lp, [0, 0.4], [-120, 90]);
  const blocks: Array<[number, number, number, number]> = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 4; c++) blocks.push([70 + c * 120 + (r % 2) * 14, 110 + r * 92, 96, 70]);
  return (
    <>
      <rect width="600" height="700" fill={w.bg} />
      <rect x="40" y="90" width="520" height="480" rx="10" fill={w.soft} />
      {blocks.map(([x, y, bw, bh], i) => (
        <rect key={i} x={x} y={y} width={bw} height={bh} rx="6" fill={i === 9 ? "#8fbf8a" : "#f3e1cf"} opacity={i === 9 ? 1 : 0.92} />
      ))}
      {/* standing water in the low corner, draining away */}
      <motion.ellipse cx="170" cy="470" rx="150" ry="100" fill="#5fb7c9" opacity="0.55" style={{ scale: flood, transformBox: "fill-box", transformOrigin: "center" }} />
      {/* a walkable route */}
      <motion.path
        style={{ pathLength: route }}
        fill="none"
        stroke={w.b}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1 14"
        d="M60 196 H176 V288 H296 V380 H420 V472 H540"
      />
      {/* AI vision viewfinder, scanning a block */}
      <motion.g style={{ x: scanX }}>
        <path fill="none" stroke="#fff" strokeWidth="4" d="M230 190 v-20 h20 M330 170 h20 v20 M350 250 v20 h-20 M250 270 h-20 v-20" />
      </motion.g>
      {[
        { x: 236, y: 250, s: 0.25 },
        { x: 408, y: 150, s: 0.38 },
        { x: 470, y: 440, s: 0.5 },
      ].map((pin, i) => (
        <Pin key={i} lp={lp} {...pin} fill={i === 1 ? w.b : w.a} />
      ))}
      {/* the plan: a Gantt chart */}
      <rect x="40" y="592" width="520" height="84" rx="10" fill={w.ink} />
      {[
        [60, 110, 604],
        [150, 160, 626],
        [290, 150, 648],
      ].map(([x, len, y], i) => (
        <Gantt key={i} lp={lp} i={i} x={x} y={y} len={len} c={[w.a, w.b, "#e0b25a"][i]} />
      ))}
    </>
  );
}

function Pin({ lp, x, y, s, fill }: { lp: LP; x: number; y: number; s: number; fill: string }) {
  const k = useTransform(lp, [s, s + 0.1], [0, 1]);
  const dy = useTransform(k, [0, 1], [-80, 0]);
  return (
    <motion.g style={{ opacity: k, y: dy }}>
      <path fill={fill} d={`M${x} ${y} C${x - 22} ${y - 26} ${x - 22} ${y - 58} ${x} ${y - 58} C${x + 22} ${y - 58} ${x + 22} ${y - 26} ${x} ${y} Z`} />
      <circle cx={x} cy={y - 38} r="8" fill="#58241a" />
    </motion.g>
  );
}
function Gantt({ lp, i, x, y, len, c }: { lp: LP; i: number; x: number; y: number; len: number; c: string }) {
  const sc = useTransform(lp, [0.55 + i * 0.1, 0.7 + i * 0.1], [0, 1]);
  return <motion.rect x={x} y={y} width={len} height="14" rx="7" fill={c} style={{ scaleX: sc, transformBox: "fill-box", transformOrigin: "0% 50%" }} />;
}

const FILMS = { A: FilmA, B: FilmB, C: FilmC, D: FilmD };

/* ── The scene ───────────────────────────────────────────────────────── */

function Shot({ p, i, prog }: { p: P; i: number; prog: Programme }) {
  const a = i / 4;
  const b = (i + 1) / 4;
  const first = i === 0;
  const last = i === 3;
  const opacity = useTransform(
    p,
    [a - 0.03, a + 0.02, b - 0.02, b + 0.03],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? "hidden" : "visible"));
  const lp = useTransform(p, [a, b - 0.03], [0, 1]);
  const textY = useTransform(p, [a - 0.03, a + 0.03], [first ? 0 : 36, 0]);
  const Film = FILMS[prog.id];
  const w = WORLD[prog.id];
  return (
    <motion.article
      className="prog-shot"
      style={{ opacity, visibility, "--bg": w.bg, "--a": w.a, "--b": w.b, "--ink": w.ink } as unknown as CSSProperties}
      aria-labelledby={`prog-${prog.id}`}
    >
      <div className="prog-window">
        <svg viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <Film lp={lp} />
        </svg>
      </div>
      <motion.div className="prog-text" style={{ y: textY }}>
        <p className="slate">
          <b>{prog.id}</b> {prog.withLT ? "With Larsen & Toubro" : "At the iOS Development Centre"} · {prog.fee}
        </p>
        <h2 id={`prog-${prog.id}`}>{prog.title}</h2>
        <p className="prog-kicker">{prog.kicker}</p>
        {prog.forStudents && (
          <p className="prog-for">
            <span>For students of</span> {prog.forStudents}
          </p>
        )}
        <ul>
          {prog.doing.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="prog-themes">
          <span>Challenge themes</span> {prog.themes.join(" · ")}
        </p>
        {prog.leaveWith && (
          <p className="prog-themes">
            <span>Students leave with</span> {prog.leaveWith}
          </p>
        )}
        <Link href={`${FORM_HREF}?programme=${prog.id}`} className="film-btn film-btn-light">
          Nominate students <ArrowRight size={15} weight="bold" />
        </Link>
      </motion.div>
    </motion.article>
  );
}

function ProgrammesScene({ p }: { p: P }) {
  const bg = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [WORLD.A.bg, WORLD.B.bg, WORLD.C.bg, WORLD.D.bg, WORLD.D.bg]);
  const dots = [0, 1, 2, 3].map((i) => i);
  return (
    <motion.div className="prog-stage" style={{ background: bg }}>
      <div className="prog-head">
        <p>The four programmes</p>
        <ol aria-hidden>
          {dots.map((i) => (
            <Dot key={i} p={p} i={i} />
          ))}
        </ol>
      </div>
      {PROGRAMMES.map((prog, i) => (
        <Shot key={prog.id} p={p} i={i} prog={prog} />
      ))}
    </motion.div>
  );
}

function Dot({ p, i }: { p: P; i: number }) {
  const w = useTransform(p, [i / 4 - 0.02, i / 4 + 0.02, (i + 1) / 4 - 0.02, (i + 1) / 4 + 0.02], [8, 30, 30, 8]);
  return (
    <motion.li style={{ width: w }}>
      <span>{PROGRAMMES[i].id}</span>
    </motion.li>
  );
}

export function SceneProgrammes() {
  return (
    <Scene id="programmes" length={520} label="The four programmes" className="s-programmes">
      {(p) => <ProgrammesScene p={p} />}
    </Scene>
  );
}

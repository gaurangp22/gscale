"use client";

import { motion, useTransform } from "motion/react";
import { Caption, Scene, seeded, type P } from "./stage";
import { cusped, Taj } from "./monuments";

/* ─────────────────────────────────────────────────────────────────────────
   Beyond the studio. Agra Fort, at dusk.

   The famous view: from the red ramparts of Agra Fort and the white
   marble of the Musamman Burj, across the bend of the Yamuna to the Taj
   Mahal, small and rose-coloured on the far bank. Scrolling pans the
   camera from the fort to the river as the sun goes down.

   Painted in atmospheric depth: every plane further away is lighter,
   cooler and lower in contrast than the one before it.
   ───────────────────────────────────────────────────────────────────────── */

const SAND = "#a8452f";
const SAND_SHADE = "#8a3525";
const SAND_DEEP = "#5c2019";
const SAND_LIT = "#c9603f";
const MARBLE = "#f6e6da";
const MARBLE_SHADE = "#e0c4b8";
const MARBLE_DEEP = "#9a6a6a";
const GILT = "#e9b04f";

const HORIZON = 742;

/** Mughal merlons: rounded, with a pointed crown. */
function merlons(x0: number, x1: number, y: number, w = 22) {
  const n = Math.floor((x1 - x0) / (w + 6));
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + i * (w + 6);
    return `M${x} ${y} V${y - w * 0.6} Q${x} ${y - w * 1.1} ${x + w / 2} ${y - w * 1.4} Q${x + w} ${y - w * 1.1} ${x + w} ${y - w * 0.6} V${y} Z`;
  }).join(" ");
}

function Fort() {
  const bx = 600; // bastion centre
  const wallTop = 690;
  const bastionTop = 600;
  // the round bastion, shaded like a cylinder in vertical bands
  const bands = [
    { x: bx - 120, w: 40, c: SAND_LIT },
    { x: bx - 80, w: 60, c: SAND },
    { x: bx - 20, w: 60, c: SAND },
    { x: bx + 40, w: 44, c: SAND_SHADE },
    { x: bx + 84, w: 36, c: SAND_DEEP },
  ];
  const pav = bastionTop - 18; // pavilion floor
  return (
    <g>
      {/* the long wall, left and right of the bastion */}
      <path fill={SAND_SHADE} d={`M-300 1000 V${wallTop} H${bx - 110} V1000 Z`} />
      <path fill={SAND} d={merlons(-300, bx - 116, wallTop)} />
      <path fill={SAND_DEEP} d={`M${bx + 110} 1000 V${wallTop + 20} H1000 V1000 Z`} />
      <path fill={SAND_SHADE} d={merlons(bx + 116, 1000, wallTop + 20)} />
      {[-240, -100, 40, 180, 320].map((x) => (
        <rect key={x} fill={SAND_DEEP} x={x} y={wallTop + 60} width="6" height="22" opacity="0.7" />
      ))}
      <rect fill={SAND_LIT} x={-300} y={wallTop + 40} width={bx - 190} height="4" opacity="0.6" />
      {/* bastion */}
      {bands.map((b, i) => (
        <rect key={i} fill={b.c} x={b.x} y={bastionTop} width={b.w} height={1000 - bastionTop} />
      ))}
      {[640, 740, 840].map((y) => (
        <rect key={y} fill={SAND_DEEP} x={bx - 120} y={y} width="240" height="3" opacity="0.45" />
      ))}
      <path fill={SAND} d={merlons(bx - 124, bx + 124, bastionTop, 18)} />
      <rect fill={SAND_LIT} x={bx - 124} y={bastionTop - 2} width="248" height="4" />

      {/* the Musamman Burj: an octagonal pavilion of white marble */}
      <g>
        <rect fill={MARBLE_SHADE} x={bx - 104} y={pav} width="208" height="18" />
        {/* three faces of the octagon: left, front, right */}
        <path fill={MARBLE} d={`M${bx - 100} ${pav} V${pav - 96} H${bx - 50} V${pav} Z`} />
        <path fill={MARBLE} d={`M${bx - 50} ${pav} V${pav - 104} H${bx + 50} V${pav} Z`} />
        <path fill={MARBLE_SHADE} d={`M${bx + 50} ${pav} V${pav - 104} H${bx + 100} V${pav - 96} V${pav} Z`} />
        {/* cusped arches with jaali screens */}
        <path fill={MARBLE_DEEP} d={cusped(bx - 75, pav, 32, 66)} />
        <path fill={MARBLE_DEEP} d={cusped(bx, pav, 58, 80)} />
        <path fill={SAND_DEEP} opacity="0.55" d={cusped(bx + 75, pav, 32, 66)} />
        <g stroke={MARBLE} strokeWidth="1.2" opacity="0.7">
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${bx - 26 + i * 10} ${pav} V${pav - 40}`} />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <path key={i} d={`M${bx - 28} ${pav - 8 - i * 10} H${bx + 28}`} />
          ))}
        </g>
        {/* chhajja: the sloping eave */}
        <path fill={MARBLE_SHADE} d={`M${bx - 112} ${pav - 96} L${bx - 100} ${pav - 112} H${bx + 100} L${bx + 112} ${pav - 96} Z`} />
        <rect fill={MARBLE} x={bx - 100} y={pav - 120} width="200" height="8" />
        {/* inlay: a scatter of pietra dura flowers on the front face */}
        {[-38, 38].map((dx) => (
          <g key={dx}>
            <circle cx={bx + dx} cy={pav - 90} r="3.2" fill="#c0563f" />
            <circle cx={bx + dx - 5} cy={pav - 88} r="2" fill="#6f8f5a" />
            <circle cx={bx + dx + 5} cy={pav - 88} r="2" fill="#6f8f5a" />
          </g>
        ))}
        {/* upper storey and dome */}
        <rect fill={MARBLE} x={bx - 44} y={pav - 150} width="88" height="30" />
        <rect fill={MARBLE_SHADE} x={bx + 14} y={pav - 150} width="30" height="30" />
        {[-30, -10, 10, 30].map((dx) => (
          <path key={dx} fill={MARBLE_DEEP} d={cusped(bx + dx, pav - 122, 12, 20)} />
        ))}
        <path fill={MARBLE} d={`M${bx - 42} ${pav - 150} C${bx - 46} ${pav - 186} ${bx - 14} ${pav - 200} ${bx} ${pav - 214} C${bx + 14} ${pav - 200} ${bx + 46} ${pav - 186} ${bx + 42} ${pav - 150} Z`} />
        <path fill={MARBLE_SHADE} d={`M${bx} ${pav - 214} C${bx + 14} ${pav - 200} ${bx + 46} ${pav - 186} ${bx + 42} ${pav - 150} H${bx} Z`} />
        <rect fill={GILT} x={bx - 1.6} y={pav - 238} width="3.2" height="26" />
        <circle fill={GILT} cx={bx} cy={pav - 224} r="4" />
        <circle fill={GILT} cx={bx} cy={pav - 234} r="3" />
      </g>
    </g>
  );
}

const BIRDS = Array.from({ length: 9 }, (_, i) => ({
  x: Math.round(300 + seeded(i, 31) * 700),
  y: Math.round(180 + seeded(i, 32) * 200),
  s: 0.6 + seeded(i, 33) * 0.7,
}));

function AgraScene({ p }: { p: P }) {
  const sunY = useTransform(p, [0, 1], [0, 120]);
  const dusk = useTransform(p, [0.2, 1], [0, 1]);
  const panFar = useTransform(p, [0, 1], [60, -60]);
  const panMid = useTransform(p, [0, 1], [160, -160]);
  const panNear = useTransform(p, [0, 1], [320, -320]);
  const birdsX = useTransform(p, [0, 1], [-200, 500]);

  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#5a3b6e 0%, #b8637a 36%, #ee9a70 66%, #ffd49a 100%)" }} />
      <motion.div className="sky" style={{ opacity: dusk, background: "linear-gradient(#2c2248 0%, #7a4270 40%, #d9786a 72%, #f7b27f 100%)" }} />
      <div className="layer">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden>
          {/* sun, sinking behind the far bank */}
          <motion.g style={{ y: sunY }}>
            <circle cx="1180" cy="560" r="160" fill="#ffd9a0" opacity="0.25" />
            <circle cx="1180" cy="560" r="92" fill="#ffe2b0" />
          </motion.g>
          {/* long cloud wisps */}
          <g fill="#f7c0a0" opacity="0.55">
            <path d="M120 305 C234.4 291 484 289 640 303 C494.4 311 276 312 120 305 Z"/>
            <path d="M260 327.5 C334.8 317.7 498 316.3 600 326.1 C504.8 331.7 362 332.4 260 327.5 Z"/>
            <path d="M980 254.5 C1081.2 241.9 1302 240.1 1440 252.7 C1311.2 259.9 1118 260.8 980 254.5 Z"/>
            <path d="M1100 275 C1161.6 266.6 1296 265.4 1380 273.8 C1301.6 278.6 1184 279.2 1100 275 Z"/>
          </g>
          <motion.g style={{ x: birdsX }}>
            {BIRDS.map((b, i) => (
              <path
                key={i}
                fill="none"
                stroke="#3a2440"
                strokeWidth={1.8}
                strokeLinecap="round"
                d={`M${b.x - 9 * b.s} ${b.y} q${4.5 * b.s} ${-5 * b.s} ${9 * b.s} 0 q${4.5 * b.s} ${-5 * b.s} ${9 * b.s} 0`}
              />
            ))}
          </motion.g>

          {/* the far bank, and the Taj on it */}
          <motion.g style={{ x: panFar }}>
            <path fill="#c98a95" d={`M0 ${HORIZON} C300 ${HORIZON - 14} 700 ${HORIZON - 8} 1000 ${HORIZON - 12} C1300 ${HORIZON - 16} 1500 ${HORIZON - 6} 1700 ${HORIZON - 10} V${HORIZON + 6} H0 Z`} />
            <Taj x={1180} y={HORIZON} s={0.52} tone={{ body: "#e9b9b4", shade: "#d7a0a2", deep: "#b77f8e", trim: "#cf9aa0", hi: "#f6d2c6" }} />
            {[1000, 1040, 1320, 1360].map((x, i) => (
              <path key={x} fill="#b67a8c" d={`M${x} ${HORIZON} C${x - 7} ${HORIZON - 20} ${x - 6} ${HORIZON - 44} ${x} ${HORIZON - 56 + (i % 2) * 10} C${x + 6} ${HORIZON - 44} ${x + 7} ${HORIZON - 20} ${x} ${HORIZON} Z`} />
            ))}
          </motion.g>

          {/* the Yamuna, holding the sky */}
          <motion.g style={{ x: panMid }}>
            <path fill="#e6997f" d={`M-400 ${HORIZON + 4} H2000 V900 H-400 Z`} />
            <path fill="#c97a7a" d={`M-400 ${HORIZON + 60} H2000 V900 H-400 Z`} opacity="0.55" />
            <g className="glitter">
              {Array.from({ length: 16 }, (_, i) => (
                <rect key={i} x={1110 + ((i * 53) % 150) - 60} y={HORIZON + 14 + i * 7} width={30 + ((i * 37) % 60)} height="2.4" rx="1.2" fill="#ffe6b8" opacity={0.8 - i * 0.04} />
              ))}
            </g>
            <g transform="translate(900 820)">
              <path fill="#3b2233" d="M-46 0 Q0 16 46 0 L36 10 Q0 20 -36 10 Z" />
              <rect x="-2" y="-40" width="3" height="40" fill="#3b2233" />
              <circle cx="0" cy="-6" r="5" fill="#ffd28a" />
              <circle cx="0" cy="-6" r="14" fill="#ffd28a" opacity="0.25" />
            </g>
          </motion.g>

          {/* the fort */}
          <motion.g style={{ x: panNear }}>
            <Fort />
          </motion.g>
        </svg>
      </div>

      <Caption p={p} at={[0.08, 0.2]} className="cap-card cap-left dark">
        <p className="slate">Outside the studio · all four programmes</p>
        <h2>The time away from the brief is planned as carefully.</h2>
        <ul className="beyond-list">
          <li>
            <b>Agra</b> The whole cohort visits Agra and the Taj Mahal.
          </li>
          <li>
            <b>Village Connect</b> Service learning with a nearby community, written up in each student&rsquo;s reflective portfolio.
          </li>
          <li>
            <b>Cultural Night</b> Students present the music, food and traditions of their own countries, after an Indian cooking session and a Bollywood dance class.
          </li>
        </ul>
      </Caption>
      <Caption p={p} at={[0.3, 0.42]} className="location">
        <span>Agra Fort, looking to the Taj Mahal · Agra</span>
      </Caption>
    </>
  );
}

export function SceneAgra() {
  return (
    <Scene id="heritage" length={240} label="Beyond the studio: Agra Fort and the Taj Mahal at dusk" className="s-agra">
      {(p) => <AgraScene p={p} />}
    </Scene>
  );
}

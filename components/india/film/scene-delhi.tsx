"use client";

import { motion, useTransform } from "motion/react";
import { Caption, Layer, Scene, type P } from "./stage";
import { IndiaGate, RoundTree } from "./monuments";

/* ─────────────────────────────────────────────────────────────────────────
   01 · Arrive & orient. New Delhi, morning.

   India Gate at the end of Kartavya Path: lawns, the long canals, rows
   of trees converging on the arch. Paper kites — a Delhi sky in any
   season of festivals — ride the wind above. The camera dollies down
   the avenue as you scroll.
   ───────────────────────────────────────────────────────────────────────── */

const STONE = { body: "#e4b58c", shade: "#c9926c", deep: "#7c4f3c", trim: "#b98262" };
const H = 764; // horizon

const KITES = [
  { x: 330, y: 250, s: 1.1, c: "#d2386c", c2: "#f3a93b", r: -12, anchor: [140, 1000] },
  { x: 560, y: 140, s: 0.8, c: "#f3a93b", c2: "#2d7f8c", r: 8, anchor: [380, 1000] },
  { x: 1080, y: 200, s: 1.25, c: "#2d7f8c", c2: "#f7e6c4", r: 14, anchor: [1300, 1000] },
  { x: 1290, y: 330, s: 0.9, c: "#7a3f8f", c2: "#f3a93b", r: -6, anchor: [1500, 1000] },
  { x: 880, y: 90, s: 0.6, c: "#e06b3a", c2: "#f7e6c4", r: 4, anchor: [980, 1000] },
];

function Kite({ k, i }: { k: (typeof KITES)[number]; i: number }) {
  const [ax, ay] = k.anchor;
  return (
    <g>
      <path
        d={`M${k.x} ${k.y + 34 * k.s} Q${(k.x + ax) / 2 + 60} ${(k.y + ay) / 2 - 40} ${ax} ${ay}`}
        fill="none"
        stroke="#5b4a52"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <g className="kite" style={{ animationDelay: `${i * -1.3}s`, transformOrigin: `${k.x}px ${k.y}px` }}>
        <g transform={`translate(${k.x} ${k.y}) rotate(${k.r}) scale(${k.s})`}>
          <path fill={k.c} d="M0 -38 L30 0 L0 34 L-30 0 Z" />
          <path fill={k.c2} d="M0 -38 L30 0 L0 0 Z" />
          <path stroke="#3b2b30" strokeWidth="1" strokeOpacity="0.5" d="M0 -38 V34 M-30 0 H30" />
          <path fill={k.c2} d="M-6 34 L0 46 L6 34 Z" />
          <path fill="none" stroke={k.c} strokeWidth="2" d="M0 46 q-8 12 0 22 q8 10 0 22" />
        </g>
      </g>
    </g>
  );
}

function Avenue() {
  // rows of trees converging on the gate
  const rows = Array.from({ length: 10 }, (_, i) => {
    const t = i / 9;
    const e = t * t;
    return { y: H + 8 + e * 236, r: 10 + e * 70, dx: 120 + e * 620 };
  });
  return (
    <>
      <path fill="#86ad77" d={`M0 ${H} H1600 V1000 H0 Z`} />
      {/* the canals */}
      <path fill="#6aa3b8" d={`M700 ${H} H716 L380 1000 H300 Z`} />
      <path fill="#6aa3b8" d={`M884 ${H} H900 L1300 1000 H1220 Z`} />
      {/* the avenue */}
      <path fill="#ecd3ad" d={`M772 ${H} H828 L1060 1000 H540 Z`} />
      <path fill="#dcbd93" d={`M798 ${H} H802 L820 1000 H780 Z`} />
      {rows.map((r, i) => (
        <g key={i}>
          <RoundTree x={800 - r.dx} y={r.y} r={r.r} fill="#3f6b55" shade="#325845" trunk="#5b4636" />
          <RoundTree x={800 + r.dx} y={r.y} r={r.r} fill="#3f6b55" shade="#325845" trunk="#5b4636" />
        </g>
      ))}
      {/* lamps along the avenue */}
      {Array.from({ length: 6 }, (_, i) => {
        const t = (i + 1) / 6;
        const e = t * t;
        const y = H + 6 + e * 230;
        const h = 14 + e * 110;
        const dx = 40 + e * 290;
        return (
          <g key={i} fill="#4a3a36">
            <rect x={800 - dx} y={y - h} width={1 + e * 4} height={h} />
            <rect x={800 + dx} y={y - h} width={1 + e * 4} height={h} />
            <circle cx={800 - dx + e * 2} cy={y - h} r={2 + e * 7} fill="#f7e2b0" />
            <circle cx={800 + dx + e * 2} cy={y - h} r={2 + e * 7} fill="#f7e2b0" />
          </g>
        );
      })}
    </>
  );
}

function DelhiScene({ p }: { p: P }) {
  const dolly = useTransform(p, [0, 1], [1, 1.45]);
  const gate = useTransform(p, [0, 1], [1, 1.28]);
  const kitesY = useTransform(p, [0, 1], ["0%", "-8%"]);
  const sunY = useTransform(p, [0, 1], [0, -60]);
  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#9fcfd8 0%, #cfe6e0 45%, #f6e4c6 100%)" }} />
      <Layer>
        <motion.g style={{ y: sunY }}>
          <circle cx="1240" cy="240" r="120" fill="#fff4d6" opacity="0.6" />
          <circle cx="1240" cy="240" r="70" fill="#fff8e6" />
        </motion.g>
        {/* distant city, soft in the haze */}
        <path fill="#b9cfc6" d={`M0 ${H} V742 H90 V712 H150 V736 H260 V700 H300 V728 H420 V744 H520 V726 H560 V${H} Z`} />
        <path fill="#b9cfc6" d={`M1040 ${H} V738 H1120 V716 H1170 V700 H1200 V724 H1300 V706 H1360 V732 H1480 V718 H1600 V${H} Z`} />
        <path fill="#a8c4ba" d={`M0 ${H} C300 748 500 752 700 756 C900 752 1200 746 1600 752 V${H} Z`} />
      </Layer>
      <Layer style={{ scale: gate }}>
        <IndiaGate x={800} y={H} s={1.62} tone={STONE} />
      </Layer>
      <Layer style={{ scale: dolly }}>
        <Avenue />
      </Layer>
      <motion.div className="layer" style={{ y: kitesY }}>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden>
          {KITES.map((k, i) => (
            <Kite key={i} k={k} i={i} />
          ))}
        </svg>
      </motion.div>

      <Caption p={p} at={[0.08, 0.2]} className="cap-card cap-left">
        <p className="slate">
          <b>01</b> Arrive &amp; orient
        </p>
        <h2>Students meet their team first, then the city.</h2>
        <p>
          Every programme opens with orientation at Galgotias University, teams formed across
          countries and disciplines, an introduction to Indian culture, and a day in New Delhi.
        </p>
      </Caption>
      <Caption p={p} at={[0.3, 0.4]} className="location">
        <span>India Gate · New Delhi</span>
      </Caption>
    </>
  );
}

export function SceneDelhi() {
  return (
    <Scene id="arrive" length={240} label="Arrive and orient: India Gate, New Delhi" className="s-delhi">
      {(p) => <DelhiScene p={p} />}
    </Scene>
  );
}

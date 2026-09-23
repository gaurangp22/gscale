"use client";

import { motion, useTransform } from "motion/react";
import { Caption, Layer, Scene, type P } from "./stage";
import { Qutub, RoundTree } from "./monuments";

/* ─────────────────────────────────────────────────────────────────────────
   02 · Learn with industry. Mehrauli, midday.

   The Qutub Minar, begun at the end of the twelfth century — and over it,
   as you scroll, an engineer's elevation draws itself in lapis ink:
   axis, storey lines, the height. Then a modern tower crane rises beside
   it in the same hand. Engineering, then and now.
   ───────────────────────────────────────────────────────────────────────── */

const RED = { body: "#c0634a", shade: "#a24f3a", deep: "#6d2f25" };
const BASE = 812;
const S = 1.42;
const TOP = BASE - 322 * S;
const LAPIS = "#27458a";

function Ruins() {
  // the great arched screen of the mosque court, in ruin
  return (
    <g>
      <path fill="#c77a5c" d={`M430 ${BASE} V520 H700 V${BASE} H640 V640 Q640 560 565 540 Q490 560 490 640 V${BASE} Z`} />
      <path fill="#b0664b" d="M640 812 V640 Q640 575 600 552 L612 520 H700 V812 Z" opacity="0.6" />
      <path fill="#d99a7c" d="M430 520 H700 V536 H430 Z" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={440 + i * 52} y={498 - (i % 2) * 14} width="30" height={22 + (i % 2) * 14} fill="#c77a5c" />
      ))}
      <path fill="none" stroke="#e9b597" strokeWidth="2" d="M470 812 V636 Q470 548 565 520 Q660 548 660 636 V812" />
      {/* the iron pillar */}
      <rect x="742" y={BASE - 96} width="8" height="96" fill="#4e4a55" />
      <rect x="739" y={BASE - 104} width="14" height="10" fill="#4e4a55" />
    </g>
  );
}

function QutubScene({ p }: { p: P }) {
  const draw1 = useTransform(p, [0.18, 0.4], [0, 1]);
  const draw2 = useTransform(p, [0.3, 0.52], [0, 1]);
  const draw3 = useTransform(p, [0.5, 0.78], [0, 1]);
  const label = useTransform(p, [0.38, 0.46], [0, 1]);
  const push = useTransform(p, [0, 1], [1, 1.1]);
  const cloudX = useTransform(p, [0, 1], [0, -120]);

  const storeys = [108, 176, 228, 266].map((y) => BASE - (y - 6) * S);
  const cx = 880;

  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#f3e3c7 0%, #f1d3a8 60%, #eab98a 100%)" }} />
      <Layer>
        <motion.g style={{ x: cloudX }}>
          <path fill="#f9ecd6" d="M200 220 q40 -40 90 -10 q30 -30 70 0 q40 0 40 30 H190 q-20 -20 10 -20 Z" />
          <path fill="#f9ecd6" d="M1180 160 q50 -44 104 -12 q36 -30 80 2 q40 2 40 34 H1160 q-24 -24 20 -24 Z" />
        </motion.g>
        <path fill="#e2b98e" d={`M0 ${BASE - 20} C400 ${BASE - 34} 1100 ${BASE - 30} 1600 ${BASE - 24} V1000 H0 Z`} />
      </Layer>

      <Layer style={{ scale: push }} origin="55% 80%">
        <Ruins />
        <RoundTree x={330} y={BASE} r={54} fill="#5f7c52" shade="#4d6a44" trunk="#5b4636" />
        <RoundTree x={1260} y={BASE} r={64} fill="#5f7c52" shade="#4d6a44" trunk="#5b4636" />
        <Qutub x={cx} y={BASE} s={S} tone={RED} marble="#efe2cf" />
        <path fill="#d9ad84" d={`M0 ${BASE} H1600 V1000 H0 Z`} />
        <path fill="#caa076" d={`M0 ${BASE} H1600 V${BASE + 6} H0 Z`} />

        {/* the elevation, in lapis */}
        <g fill="none" stroke={LAPIS} strokeLinecap="round">
          <motion.path style={{ pathLength: draw1 }} strokeWidth="1.4" strokeDasharray="10 7" d={`M${cx} ${BASE + 40} V${TOP - 60}`} />
          <motion.path style={{ pathLength: draw1 }} strokeWidth="1.6" d={`M${cx + 90} ${BASE} V${TOP}`} />
          <motion.path style={{ pathLength: draw1 }} strokeWidth="1.6" d={`M${cx + 80} ${BASE} H${cx + 100} M${cx + 80} ${TOP} H${cx + 100}`} />
          {storeys.map((y, i) => (
            <motion.path key={i} style={{ pathLength: draw2 }} strokeWidth="1" d={`M${cx - 70} ${y} H${cx + 90}`} />
          ))}
          <motion.path style={{ pathLength: draw2 }} strokeWidth="1" d={`M${cx - 70} ${BASE} H${cx + 90}`} />
          {/* the crane */}
          <motion.path style={{ pathLength: draw3 }} strokeWidth="2" d={`M1180 ${BASE} V330 M1204 ${BASE} V330`} />
          <motion.path
            style={{ pathLength: draw3 }}
            strokeWidth="1.2"
            d={Array.from({ length: 12 }, (_, i) => `M1180 ${BASE - i * 40} L1204 ${BASE - (i + 1) * 40}`).join(" ")}
          />
          <motion.path style={{ pathLength: draw3 }} strokeWidth="2" d="M1040 330 H1460 M1192 330 L1192 280 L1040 330 M1192 280 L1460 330" />
          <motion.path style={{ pathLength: draw3 }} strokeWidth="1.4" d="M1400 330 V470 M1388 470 H1412 L1400 486 Z" />
          <motion.path style={{ pathLength: draw3 }} strokeWidth="2" d="M1040 330 V360 H1090 V330" />
        </g>
        <motion.g style={{ opacity: label }} fill={LAPIS} fontFamily="ui-monospace, monospace" fontSize="15">
          <text x={cx + 104} y={(BASE + TOP) / 2}>72.5 m</text>
          <text x={cx - 70} y={TOP - 18}>QUTUB MINAR · c. 1199</text>
        </motion.g>
      </Layer>

      <Caption p={p} at={[0.06, 0.18]} className="cap-card cap-left">
        <p className="slate">
          <b>02</b> Learn with industry
        </p>
        <h2>Industry teaches part of every programme.</h2>
        <p>
          Three of the programmes are taught with Larsen &amp; Toubro. Digital Futures runs at the
          university&rsquo;s iOS Development Centre, with visits to entrepreneurs and startups.
        </p>
      </Caption>
      <Caption p={p} at={[0.4, 0.5]} className="location">
        <span>Qutub Minar · Mehrauli, New Delhi</span>
      </Caption>
    </>
  );
}

export function SceneQutub() {
  return (
    <Scene id="industry" length={240} label="Learn with industry: the Qutub Minar" className="s-qutub">
      {(p) => <QutubScene p={p} />}
    </Scene>
  );
}

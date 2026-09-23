"use client";

import { motion, useTransform } from "motion/react";
import { Caption, Layer, Scene, type P } from "./stage";
import { RamYantra, RoundTree, SamratYantra } from "./monuments";

/* ─────────────────────────────────────────────────────────────────────────
   03 · Build & challenge. Jantar Mantar, afternoon.

   The Samrat Yantra is a sundial the height of a building. Here, your
   scroll is the clock: the sun crosses the sky and the gnomon's shadow
   sweeps along the graduated quadrant, while the light turns gold.
   ───────────────────────────────────────────────────────────────────────── */

const WALL = { body: "#d9826b", shade: "#c06d58", deep: "#8a4538", trim: "#f6ead8" };
const BASE = 820;
const GX = 800; // gnomon centre
const S = 1.05;

function JantarScene({ p }: { p: P }) {
  const gold = useTransform(p, [0.1, 0.9], [0, 1]);
  // the sun's arc, left to right
  const sunX = useTransform(p, [0, 1], [360, 1240]);
  const sunY = useTransform(p, [0, 0.5, 1], [300, 150, 330]);
  // the shadow's tip along the east quadrant (angle from the horizon)
  const shadow = useTransform(p, (v) => {
    const a = ((80 - v * 70) * Math.PI) / 180;
    const r = 177 * S;
    const ox = GX + 80 * S;
    const tip = [ox + Math.cos(a) * r, BASE - Math.sin(a) * r];
    const tip2 = [ox + Math.cos(a) * (r - 30), BASE - Math.sin(a) * (r - 30)];
    return `M${ox} ${BASE - 380 * S} L${tip[0].toFixed(1)} ${tip[1].toFixed(1)} L${tip2[0].toFixed(1)} ${tip2[1].toFixed(1)} L${ox} ${BASE} Z`;
  });
  const push = useTransform(p, [0, 1], [1, 1.08]);

  return (
    <>
      <div className="sky" style={{ background: "linear-gradient(#f7d9ae 0%, #f5c894 55%, #f1b27f 100%)" }} />
      <motion.div className="sky" style={{ opacity: gold, background: "linear-gradient(#f4b98a 0%, #eea06e 55%, #e58a5c 100%)" }} />
      <Layer>
        <motion.g style={{ x: useTransform(sunX, (v) => v - 800), y: useTransform(sunY, (v) => v - 200) }}>
          <circle cx="800" cy="200" r="90" fill="#fff0cc" opacity="0.45" />
          <circle cx="800" cy="200" r="54" fill="#fff5dc" />
        </motion.g>
        <path fill="#e7ae80" d={`M0 ${BASE - 40} C300 ${BASE - 52} 700 ${BASE - 46} 1000 ${BASE - 50} C1300 ${BASE - 54} 1500 ${BASE - 44} 1600 ${BASE - 46} V1000 H0 Z`} />
      </Layer>
      <Layer style={{ scale: push }} origin="50% 82%">
        <RoundTree x={250} y={BASE} r={70} fill="#6c7d4f" shade="#5a6a41" trunk="#5b4636" />
        <RoundTree x={1420} y={BASE} r={60} fill="#6c7d4f" shade="#5a6a41" trunk="#5b4636" />
        <RamYantra x={1230} y={BASE} s={0.9} tone={WALL} />
        <SamratYantra x={GX} y={BASE} s={S} tone={WALL} />
        <motion.path d={shadow} fill="#6e2f2a" opacity="0.32" />
        <path fill="#e9c9a0" d={`M0 ${BASE} H1600 V1000 H0 Z`} />
        <path fill="#d9b58a" d={`M0 ${BASE} H1600 V${BASE + 8} H0 Z`} />
        {/* the long shadow the whole instrument throws across the courtyard */}
        <motion.path
          fill="#b98a66"
          opacity="0.35"
          d={useTransform(p, (v) => {
            const len = 120 + v * 380;
            return `M${GX - 260 * S} ${BASE + 8} H${GX + 260 * S} L${GX + 260 * S + len} ${BASE + 60} H${GX - 260 * S + len * 0.4} Z`;
          })}
        />
      </Layer>

      <Caption p={p} at={[0.08, 0.2]} className="cap-card cap-left">
        <p className="slate">
          <b>03</b> Build &amp; challenge
        </p>
        <h2>From a brief to a working prototype.</h2>
        <p>
          Studio work with faculty and industry mentors, leading into each programme&rsquo;s
          Innovation Challenge.
        </p>
      </Caption>
      <Caption p={p} at={[0.3, 0.4]} className="location">
        <span>Jantar Mantar · New Delhi</span>
      </Caption>
    </>
  );
}

export function SceneJantar() {
  return (
    <Scene id="build" length={240} label="Build and challenge: the sundial at Jantar Mantar" className="s-jantar">
      {(p) => <JantarScene p={p} />}
    </Scene>
  );
}

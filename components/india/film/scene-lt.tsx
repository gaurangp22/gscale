"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Scene, type P } from "./stage";

/* ─────────────────────────────────────────────────────────────────────────
   The L&T component, in four shots. The camera pans from one to the next
   and holds on each while something happens in it:

     1. a classroom — a load-path diagram draws itself on the board
     2. the yard   — a tower crane lowers a precast segment onto a pier
     3. the studio — laptops glow, the wall fills with ideas
     4. the hall   — a team pitches; the jury listens

   Captions state only what the programme brochure states.
   ───────────────────────────────────────────────────────────────────────── */

const WINDOWS: Array<[number, number]> = [
  [0.02, 0.2],
  [0.27, 0.45],
  [0.52, 0.7],
  [0.77, 0.95],
];

function useLocal(p: P, i: number) {
  return useTransform(p, WINDOWS[i], [0, 1]);
}

function Shot({ children, caption, tone }: { children: ReactNode; caption: ReactNode; tone: "light" | "dark" }) {
  return (
    <div className={`lt-shot ${tone}`}>
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden>
        {children}
      </svg>
      <div className="lt-caption">{caption}</div>
    </div>
  );
}

/* 1 · classroom */
function Classroom({ lp }: { lp: MotionValue<number> }) {
  const truss = useTransform(lp, [0.05, 0.6], [0, 1]);
  const arrows = useTransform(lp, [0.5, 0.8], [0, 1]);
  const bottom = 560;
  const top = 380;
  const xs = Array.from({ length: 7 }, (_, i) => 520 + i * 93);
  const diag = xs
    .slice(0, -1)
    .map((x, i) => (i % 2 ? `M${x} ${top} L${xs[i + 1]} ${bottom}` : `M${x} ${bottom} L${xs[i + 1]} ${top}`))
    .join(" ");
  return (
    <>
      <rect width="1600" height="1000" fill="#eadcc4" />
      <rect x="0" y="0" width="1600" height="160" fill="#e0cfb2" />
      {[260, 620, 980, 1340].map((x) => (
        <rect key={x} x={x - 60} y="40" width="120" height="14" rx="7" fill="#fff6e3" />
      ))}
      <rect x="400" y="250" width="800" height="420" rx="10" fill="#26443d" />
      <rect x="400" y="660" width="800" height="14" fill="#8a6b52" />
      <g fill="none" stroke="#f3ecd8" strokeLinecap="round" strokeLinejoin="round">
        <motion.path style={{ pathLength: truss }} strokeWidth="3" d={`M${xs[0]} ${bottom} H${xs[6]} M${xs[0]} ${bottom} L${xs[1]} ${top} H${xs[5]} L${xs[6]} ${bottom}`} />
        <motion.path style={{ pathLength: truss }} strokeWidth="2" d={diag} />
        <motion.path style={{ pathLength: truss }} strokeWidth="2" d={xs.slice(1, 6).map((x) => `M${x} ${top} V${bottom}`).join(" ")} />
        <motion.path style={{ pathLength: arrows }} stroke="#f2b441" strokeWidth="3" d={`M${xs[3]} 290 V360 M${xs[3] - 10} 348 L${xs[3]} 362 L${xs[3] + 10} 348`} />
        <motion.path style={{ pathLength: arrows }} stroke="#f2b441" strokeWidth="3" d={`M${xs[0]} 640 V580 M${xs[0] - 10} 592 L${xs[0]} 578 L${xs[0] + 10} 592 M${xs[6]} 640 V580 M${xs[6] - 10} 592 L${xs[6]} 578 L${xs[6] + 10} 592`} />
      </g>
      <motion.g style={{ opacity: arrows }} fill="#f3ecd8" fontFamily="ui-monospace, monospace" fontSize="18">
        <text x="440" y="300">LOAD PATH</text>
      </motion.g>
      {/* the room, from the back row */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 150 + i * 165 + (i % 2) * 20;
        const s = 1 + (i % 3) * 0.08;
        return (
          <g key={i} fill="#3b2c2a" transform={`translate(${x} 1000) scale(${s})`}>
            <circle cx="0" cy="-190" r="34" />
            <path d="M-78 0 C-78 -90 -50 -140 0 -140 C50 -140 78 -90 78 0 Z" />
          </g>
        );
      })}
      <rect x="0" y="930" width="1600" height="70" fill="#6b4f3f" />
    </>
  );
}

/* 2 · the yard */
function Yard({ lp }: { lp: MotionValue<number> }) {
  const segY = useTransform(lp, [0.05, 0.75], [-330, 0]);
  const hook = useTransform(lp, [0.05, 0.75], [300, 630]);
  const trolley = useTransform(lp, [0, 0.3], [1140, 1060]);
  return (
    <>
      <rect width="1600" height="1000" fill="#f2c282" />
      <circle cx="1240" cy="360" r="130" fill="#f9dca6" />
      <path fill="#d9a06a" d="M0 760 C300 740 600 748 900 744 C1200 740 1400 748 1600 744 V1000 H0 Z" />
      {/* viaduct: piers and finished spans */}
      {[260, 520, 780, 1040].map((x) => (
        <g key={x}>
          <path fill="#a79f97" d={`M${x - 26} 1000 V700 H${x + 26} V1000 Z`} />
          <path fill="#bdb6ad" d={`M${x - 46} 700 H${x + 46} L${x + 30} 682 H${x - 30} Z`} />
        </g>
      ))}
      <path fill="#cfc8bd" d="M190 682 H830 V650 H190 Z" />
      <path fill="#b3aca2" d="M190 682 H830 V674 H190 Z" />
      {/* the segment being placed, 830 → 1090 */}
      <motion.g style={{ y: segY }}>
        <path fill="#cfc8bd" d="M834 682 H1086 V650 H834 Z" />
        <path fill="#b3aca2" d="M834 682 H1086 V674 H834 Z" />
        <path stroke="#3d3431" strokeWidth="2" fill="none" d="M870 650 L960 600 L1050 650" />
      </motion.g>
      {/* tower crane */}
      <g fill="none" stroke="#3d3431" strokeWidth="3">
        <path d="M1300 1000 V180 M1340 1000 V180" />
        <path strokeWidth="1.6" d={Array.from({ length: 20 }, (_, i) => `M1300 ${1000 - i * 41} L1340 ${1000 - (i + 1) * 41}`).join(" ")} />
        <path d="M900 180 H1500 M1320 180 V110 L900 180 M1320 110 L1500 180" />
      </g>
      <rect x="1440" y="182" width="60" height="40" fill="#3d3431" />
      <rect x="1296" y="150" width="48" height="30" fill="#e9a640" />
      <motion.g style={{ x: useTransform(trolley, (v) => v - 1140) }}>
        <rect x="1128" y="180" width="24" height="10" fill="#3d3431" />
        <motion.path stroke="#3d3431" strokeWidth="2" d={useTransform(hook, (h) => `M1140 190 V${h}`)} />
      </motion.g>
      {/* hard hats on the safety rail, foreground */}
      <path fill="#3d3431" d="M0 900 H1600 V912 H0 Z M60 912 V1000 H72 V912 Z M520 912 V1000 H532 V912 Z M980 912 V1000 H992 V912 Z" />
      {[180, 260, 640, 1120, 1210].map((x, i) => (
        <g key={x} transform={`translate(${x} 900)`}>
          <path fill={i % 2 ? "#f3f0e8" : "#e9a640"} d="M-34 0 C-34 -34 -16 -48 0 -48 C16 -48 34 -34 34 0 Z" />
          <path fill={i % 2 ? "#dcd7cc" : "#d08c2c"} d="M-6 -48 V-4 H6 V-48 Z" />
          <path fill={i % 2 ? "#f3f0e8" : "#e9a640"} d="M-44 0 H44 V7 H-44 Z" />
        </g>
      ))}
    </>
  );
}

/* 3 · the studio */
function Studio({ lp }: { lp: MotionValue<number> }) {
  const notes = Array.from({ length: 18 }, (_, i) => ({
    x: 330 + (i % 6) * 160 + ((i * 37) % 30),
    y: 170 + Math.floor(i / 6) * 120 + ((i * 17) % 20),
    r: ((i * 29) % 12) - 6,
    c: ["#f2c35b", "#f29a86", "#9bd3c0", "#c9b6f2"][i % 4],
  }));
  const ring = useTransform(lp, [0, 1], [0, 1]);
  return (
    <>
      <rect width="1600" height="1000" fill="#1f2446" />
      <rect x="260" y="120" width="1080" height="420" rx="6" fill="#2a3060" />
      {notes.map((n, i) => (
        <Note key={i} lp={lp} i={i} n={n} />
      ))}
      <circle cx="1460" cy="220" r="60" fill="none" stroke="#3a4178" strokeWidth="10" />
      <motion.circle
        cx="1460"
        cy="220"
        r="60"
        fill="none"
        stroke="#f2c35b"
        strokeWidth="10"
        strokeLinecap="round"
        style={{ pathLength: ring, rotate: -90, transformOrigin: "1460px 220px" }}
      />
      {/* the long table */}
      <path fill="#12162e" d="M0 780 H1600 V1000 H0 Z" />
      <path fill="#343a6a" d="M80 700 H1520 L1600 780 H0 Z" />
      {[260, 620, 980, 1340].map((x, i) => (
        <g key={x}>
          <path fill="#a9adc7" d={`M${x - 110} 700 L${x - 96} 560 H${x + 96} L${x + 110} 700 Z`} />
          <path className="screen-glow" style={{ animationDelay: `${i * 0.7}s` }} fill={["#6fd0c0", "#f2c35b", "#c9b6f2", "#f29a86"][i]} d={`M${x - 90} 690 L${x - 80} 574 H${x + 80} L${x + 90} 690 Z`} opacity="0.85" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={x - 64} y={596 + k * 22} width={40 + ((k * 31 + i * 13) % 70)} height="7" rx="3.5" fill="#1f2446" opacity="0.55" />
          ))}
          <path fill="#6a6f92" d={`M${x - 130} 700 H${x + 130} L${x + 140} 712 H${x - 140} Z`} />
        </g>
      ))}
    </>
  );
}

function Note({ lp, i, n }: { lp: MotionValue<number>; i: number; n: { x: number; y: number; r: number; c: string } }) {
  const start = 0.04 + (i / 18) * 0.7;
  const o = useTransform(lp, [start, start + 0.06], [0, 1]);
  const y = useTransform(lp, [start, start + 0.06], [-14, 0]);
  return (
    <motion.g style={{ opacity: o, y }}>
      <g transform={`translate(${n.x} ${n.y}) rotate(${n.r})`}>
        <rect x="-50" y="-44" width="100" height="88" fill={n.c} />
        <rect x="-36" y="-22" width="64" height="6" rx="3" fill="#1f2446" opacity="0.35" />
        <rect x="-36" y="-6" width="48" height="6" rx="3" fill="#1f2446" opacity="0.35" />
        <rect x="-36" y="10" width="56" height="6" rx="3" fill="#1f2446" opacity="0.35" />
      </g>
    </motion.g>
  );
}

/* 4 · the pitch */
function Pitch({ lp }: { lp: MotionValue<number> }) {
  const bars = [0, 1, 2, 3, 4];
  const beam = useTransform(lp, [0, 0.25], [0, 0.5]);
  const clap = useTransform(lp, [0.75, 0.9], [0, 1]);
  return (
    <>
      <rect width="1600" height="1000" fill="#2a1420" />
      {/* the hall */}
      <path fill="#3a1d2b" d="M0 0 H1600 V620 H0 Z" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 180 + 40} y="0" width="10" height="620" fill="#321825" />
      ))}
      <path fill="#4a2535" d="M0 620 H1600 V700 H0 Z" />
      {/* the screen, with the team's slide */}
      <rect x="520" y="130" width="560" height="320" rx="6" fill="#f6ecdd" />
      <rect x="552" y="160" width="220" height="16" rx="8" fill="#b5533c" />
      <rect x="552" y="190" width="150" height="10" rx="5" fill="#c9b8a6" />
      {bars.map((i) => (
        <PitchBar key={i} lp={lp} i={i} />
      ))}
      <path fill="none" stroke="#b5533c" strokeWidth="3" d="M840 400 L900 360 L960 372 L1040 300" />
      {/* spotlights */}
      <motion.path style={{ opacity: beam }} fill="#ffe2b0" d="M360 0 L420 0 L520 640 L300 640 Z" />
      <motion.path style={{ opacity: beam }} fill="#ffe2b0" d="M1180 0 L1240 0 L1300 640 L1080 640 Z" />
      {/* presenter at the lectern */}
      <g fill="#150a10">
        <circle cx="410" cy="470" r="22" />
        <path d="M372 620 C372 540 386 500 410 500 C434 500 448 540 448 620 Z" />
      </g>
      <path fill="#6b3a4a" d="M440 540 H520 L510 640 H450 Z" />
      {/* the jury, from behind */}
      <path fill="#5a2c3c" d="M200 760 H1400 V800 H200 Z" />
      {[480, 800, 1120].map((x, i) => (
        <g key={x}>
          <rect x={x - 60} y="730" width="120" height="30" rx="3" fill="#f6ecdd" />
          <rect x={x - 40} y="741" width={60 + i * 10} height="8" rx="4" fill="#b5533c" opacity="0.7" />
          <g fill="#120810">
            <circle cx={x} cy="820" r="40" />
            <path d={`M${x - 90} 1000 C${x - 90} 900 ${x - 56} 860 ${x} 860 C${x + 56} 860 ${x + 90} 900 ${x + 90} 1000 Z`} />
          </g>
        </g>
      ))}
      {/* applause, when the pitch lands */}
      <motion.g style={{ opacity: clap }} fill="#f2b441">
        {[
          [300, 690], [660, 670], [960, 680], [1300, 690], [1440, 660], [180, 660],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 14} L${x + 4} ${y - 4} L${x + 14} ${y} L${x + 4} ${y + 4} L${x} ${y + 14} L${x - 4} ${y + 4} L${x - 14} ${y} L${x - 4} ${y - 4} Z`} />
        ))}
      </motion.g>
    </>
  );
}

function PitchBar({ lp, i }: { lp: MotionValue<number>; i: number }) {
  const h = [70, 110, 90, 150, 190][i];
  const sc = useTransform(lp, [0.15 + i * 0.08, 0.3 + i * 0.08], [0, 1]);
  return (
    <motion.rect
      x={560 + i * 52}
      y={420 - h}
      width="34"
      height={h}
      rx="4"
      fill={i === 4 ? "#b5533c" : "#d9b8a0"}
      style={{ scaleY: sc, transformBox: "fill-box", transformOrigin: "50% 100%" }}
    />
  );
}

function LTScene({ p }: { p: P }) {
  const x = useTransform(
    p,
    [0, 0.2, 0.27, 0.45, 0.52, 0.7, 0.77, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-300vw", "-300vw"],
  );
  const l0 = useLocal(p, 0);
  const l1 = useLocal(p, 1);
  const l2 = useLocal(p, 2);
  const l3 = useLocal(p, 3);
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <>
      <motion.div className="lt-track" style={{ x }}>
        <Shot
          tone="dark"
          caption={
            <>
              <p className="slate lt-slate"><Image src="/logos/lt-blue.png" width={108} height={20} alt="Larsen &amp; Toubro" className="lt-logo" /> <span>1 of 4</span></p>
              <h3>
                <span className="big">3 days</span> in the classroom
              </h3>
              <p>Facilitated by L&amp;T: industry context, challenge framing and expert mentoring.</p>
            </>
          }
        >
          <Classroom lp={l0} />
        </Shot>
        <Shot
          tone="dark"
          caption={
            <>
              <p className="slate lt-slate"><Image src="/logos/lt-blue.png" width={108} height={20} alt="Larsen &amp; Toubro" className="lt-logo" /> <span>2 of 4</span></p>
              <h3>
                <span className="big">2 days</span> on site
              </h3>
              <p>Immersive learning on site at L&amp;T facilities, seeing engineering delivered in practice.</p>
            </>
          }
        >
          <Yard lp={l1} />
        </Shot>
        <Shot
          tone="light"
          caption={
            <>
              <p className="slate lt-slate"><Image src="/logos/lt-white.png" width={108} height={20} alt="Larsen &amp; Toubro" className="lt-logo" /> <span>3 of 4</span></p>
              <h3>
                <span className="big">Hackathon</span> with industry mentors
              </h3>
              <p>Built into the programme, where teams turn their learning into working solutions with industry mentors.</p>
            </>
          }
        >
          <Studio lp={l2} />
        </Shot>
        <Shot
          tone="light"
          caption={
            <>
              <p className="slate lt-slate"><Image src="/logos/lt-white.png" width={108} height={20} alt="Larsen &amp; Toubro" className="lt-logo" /> <span>4 of 4</span></p>
              <h3>
                <span className="big">2 certificates</span> on completion
              </h3>
              <p>
                An L&amp;T EduTech e-Certificate for the industry component, and a joint Galgotias
                University and L&amp;T EduTech certificate on completion.
              </p>
            </>
          }
        >
          <Pitch lp={l3} />
        </Shot>
      </motion.div>
      <div className="lt-progress" aria-hidden>
        <motion.span style={{ width: bar }} />
      </div>
    </>
  );
}

export function SceneLT() {
  return (
    <Scene id="lt" length={420} label="What Larsen and Toubro brings: classroom, facilities, hackathon, certification" className="s-lt">
      {(p) => <LTScene p={p} />}
    </Scene>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Monuments.

   Each lives in its own frame — centred on x = 0, standing on y = 0 — and
   takes its palette from the scene it is placed in, so the same Taj can
   be blue before dawn and rose at sunrise. Proportions follow the real
   buildings, simplified to what still reads at phone size.
   ───────────────────────────────────────────────────────────────────────── */

type Tone = {
  body: string;
  shade: string;
  deep: string;
  trim?: string;
};

type Place = { x: number; y: number; s: number };
const at = ({ x, y, s }: Place) => `translate(${x} ${y}) scale(${s})`;

/* ── Taj Mahal ───────────────────────────────────────────────────────── */

/**
 * The Taj, with the detail that makes it read as the Taj and not a domed
 * box: the arcaded plinth, the calligraphy frame around the great iwan,
 * the stepped half-dome inside it, inlay bands on the minarets, the
 * lotus crown and finial, and a rim of first light down the left edges.
 */
export function Taj({ tone, ...pl }: Place & { tone: Tone & { hi?: string } }) {
  const { body, shade, deep, trim = shade } = tone;
  const hi = tone.hi ?? body;
  const minaret = (x: number) => (
    <g key={x}>
      <path fill={body} d={`M${x - 7} -14 L${x - 5} -182 H${x + 5} L${x + 7} -14 Z`} />
      <path fill={shade} d={`M${x} -14 V-182 H${x + 5} L${x + 7} -14 Z`} />
      <path fill={hi} d={`M${x - 7} -14 L${x - 5} -182 H${x - 3.6} L${x - 5.4} -14 Z`} />
      {[-40, -96, -150].map((y) => (
        <rect key={y} fill={trim} x={x - 6.5} y={y} width="13" height="1.4" opacity="0.8" />
      ))}
      {[-70, -124, -176].map((y) => (
        <g key={y}>
          <rect fill={body} x={x - 10} y={y - 5} width="20" height="5" />
          <path fill={shade} d={`M${x - 8} ${y} L${x} ${y + 6} L${x + 8} ${y} Z`} />
          {[-7, -3, 1, 5].map((k) => (
            <rect key={k} fill={deep} x={x + k} y={y - 4} width="1.6" height="3" opacity="0.6" />
          ))}
        </g>
      ))}
      <rect fill={body} x={x - 7.5} y={-190} width="15" height="8" />
      {[-5, 0, 5].map((k) => (
        <rect key={k} fill={deep} x={x + k - 1} y={-189} width="2" height="6" opacity="0.7" />
      ))}
      <path fill={body} d={`M${x - 8} -190 C${x - 9} -199 ${x - 2} -203 ${x} -210 C${x + 2} -203 ${x + 9} -199 ${x + 8} -190 Z`} />
      <path fill={shade} d={`M${x} -210 C${x + 2} -203 ${x + 9} -199 ${x + 8} -190 H${x} Z`} />
      <rect fill={trim} x={x - 0.8} y={-218} width="1.6" height="9" />
    </g>
  );
  const chhatri = (x: number) => (
    <g key={x}>
      <rect fill={body} x={x - 13} y={-104} width="26" height="13" />
      {[-9, -3, 3].map((k) => (
        <rect key={k} fill={deep} x={x + k} y={-102} width="4" height="9" />
      ))}
      <rect fill={body} x={x - 15} y={-106} width="30" height="3" />
      <path fill={body} d={`M${x - 14} -106 C${x - 15} -118 ${x - 4} -124 ${x} -133 C${x + 4} -124 ${x + 15} -118 ${x + 14} -106 Z`} />
      <path fill={shade} d={`M${x} -133 C${x + 4} -124 ${x + 15} -118 ${x + 14} -106 H${x} Z`} />
      <path fill={hi} d={`M${x - 14} -106 C${x - 15} -118 ${x - 4} -124 ${x} -133 C${x - 6} -124 ${x - 11} -118 ${x - 11} -106 Z`} />
      <rect fill={trim} x={x - 0.8} y={-141} width="1.6" height="9" />
    </g>
  );
  const bay = (sx: number, y: number) => (
    <g key={`${sx}${y}`}>
      <rect fill="none" stroke={trim} strokeWidth="0.9" x={sx - 12} y={y - 36} width="24" height="36" />
      <path fill={deep} d={`M${sx - 8.5} ${y} V${y - 17} Q${sx - 8.5} ${y - 27} ${sx} ${y - 31} Q${sx + 8.5} ${y - 27} ${sx + 8.5} ${y - 17} V${y} Z`} />
    </g>
  );
  return (
    <g transform={at(pl)}>
      {minaret(-138)}
      {minaret(138)}
      {/* the plinth, with its arcade */}
      <rect fill={body} x={-156} y={-14} width="312" height="14" />
      <rect fill={shade} x={-156} y={-3} width="312" height="3" />
      {Array.from({ length: 25 }, (_, i) => (
        <path key={i} fill={deep} opacity="0.55" d={`M${-148 + i * 12.2} -2 V-8 Q${-148 + i * 12.2 + 3} -12 ${-148 + i * 12.2 + 6} -8 V-2 Z`} />
      ))}
      {/* the main block */}
      <path fill={body} d="M-84 -14 V-88 L-76 -95 H76 L84 -88 V-14 Z" />
      <path fill={shade} d="M36 -14 V-95 H76 L84 -88 V-14 Z" />
      <path fill={hi} d="M-84 -14 V-88 L-80 -91.5 V-14 Z" />
      <rect fill={trim} x={-84} y={-97} width="168" height="2.2" />
      {[-64, -48, 48, 64].map((x) => bay(x, -18))}
      {[-64, -48, 48, 64].map((x) => bay(x, -54))}
      {/* the great iwan */}
      <rect fill={body} x={-36} y={-110} width="72" height="96" />
      <rect fill={shade} x={18} y={-110} width="18" height="96" opacity="0.5" />
      <rect fill="none" stroke={trim} strokeWidth="1.8" x={-32} y={-106} width="64" height="92" />
      <rect fill="none" stroke={trim} strokeWidth="0.8" x={-28.5} y={-102.5} width="57" height="88.5" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} fill={deep} opacity="0.55" x={-26 + i * 3.8} y={-104.6} width="1.6" height={i % 3 ? 1.4 : 2.2} />
      ))}
      <path fill={deep} d="M-22 -14 V-60 Q-22 -84 0 -93 Q22 -84 22 -60 V-14 Z" />
      <path fill={shade} opacity="0.55" d="M-17 -14 V-58 Q-17 -78 0 -86 Q17 -78 17 -58 V-14 Z" />
      <path fill={deep} d="M-12 -14 V-55 Q-12 -71 0 -77 Q12 -71 12 -55 V-14 Z" />
      <path fill={trim} opacity="0.5" d="M-7 -14 V-40 Q-7 -48 0 -51 Q7 -48 7 -40 V-14 Z" />
      {[-28, 28].map((x) => (
        <circle key={x} fill={trim} cx={x * 0.72} cy={-96} r="1.8" />
      ))}
      {/* drum and dome */}
      <rect fill={body} x={-31} y={-128} width="62" height="22" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} fill={deep} opacity="0.45" x={-26 + i * 6.4} y={-124} width="1.4" height="14" />
      ))}
      <rect fill={trim} x={-33} y={-129} width="66" height="2" />
      <path fill={body} d="M-34 -127 C-53 -155 -24 -189 0 -210 C24 -189 53 -155 34 -127 Z" />
      <path fill={shade} d="M0 -210 C24 -189 53 -155 34 -127 H0 Z" />
      <path fill={hi} d="M-34 -127 C-53 -155 -24 -189 0 -210 C-16 -190 -38 -158 -26 -127 Z" />
      {/* the lotus crown and finial */}
      {[-9, -4.5, 0, 4.5, 9].map((x) => (
        <path key={x} fill={trim} d={`M${x - 2.6} -207 Q${x} -213 ${x + 2.6} -207 Z`} />
      ))}
      <rect fill={trim} x={-1.3} y={-236} width="2.6" height="28" />
      <circle fill={trim} cx="0" cy="-219" r="2.6" />
      <circle fill={trim} cx="0" cy="-226" r="2" />
      <path fill={trim} d="M-4.2 -233 Q0 -225 4.2 -233 Q0 -229 -4.2 -233 Z" />
      {chhatri(-58)}
      {chhatri(58)}
    </g>
  );
}

/* ── India Gate ──────────────────────────────────────────────────────── */

export function IndiaGate({ tone, ...pl }: Place & { tone: Tone }) {
  const { body, shade, deep, trim = shade } = tone;
  return (
    <g transform={at(pl)}>
      <rect fill={body} x={-66} y={-10} width="132" height="10" />
      <path fill={body} d="M-58 -10 V-124 H58 V-10 H24 V-70 Q24 -100 0 -104 Q-24 -100 -24 -70 V-10 Z" />
      <path fill={shade} d="M20 -10 V-124 H58 V-10 H24 V-70 Q24 -96 20 -100 Z" />
      <path fill={deep} d="M-24 -10 V-70 Q-24 -100 0 -104 Q24 -100 24 -70 V-10 Z" />
      <rect fill={trim} x={-46} y={-118} width="1.4" height="104" />
      <rect fill={trim} x={44.6} y={-118} width="1.4" height="104" />
      <rect fill={body} x={-65} y={-134} width="130" height="10" />
      <rect fill={shade} x={-65} y={-126} width="130" height="2" />
      <rect fill={body} x={-47} y={-154} width="94" height="20" />
      <text x="0" y="-139.5" textAnchor="middle" fill={deep} fontSize="10" fontFamily="Georgia, serif" letterSpacing="3">
        INDIA
      </text>
      <rect fill={body} x={-32} y={-164} width="64" height="10" />
      <path fill={body} d="M-17 -164 Q0 -181 17 -164 Z" />
      <path fill={shade} d="M0 -176 Q12 -172 17 -164 H0 Z" />
    </g>
  );
}

/* ── Qutub Minar ─────────────────────────────────────────────────────── */

export function Qutub({ tone, marble, ...pl }: Place & { tone: Tone; marble: string }) {
  const { body, shade, deep } = tone;
  const H = 300;
  const w = (y: number) => 26 - 13 * (y / H);
  const tiers = [0, 108, 176, 228, 266, H];
  return (
    <g transform={at(pl)}>
      {tiers.slice(0, -1).map((y0, i) => {
        const y1 = tiers[i + 1] - 6;
        const fill = i >= 3 ? marble : body;
        const flutes = 6;
        return (
          <g key={y0}>
            <path fill={fill} d={`M${-w(y0)} ${-y0} L${-w(y1)} ${-y1} H${w(y1)} L${w(y0)} ${-y0} Z`} />
            {Array.from({ length: flutes }, (_, f) => {
              const t0 = f / flutes;
              const t1 = t0 + 0.5 / flutes;
              const xa0 = -w(y0) + 2 * w(y0) * t0;
              const xa1 = -w(y0) + 2 * w(y0) * t1;
              const xb0 = -w(y1) + 2 * w(y1) * t0;
              const xb1 = -w(y1) + 2 * w(y1) * t1;
              return <path key={f} fill={shade} opacity={f >= flutes / 2 ? 0.9 : 0.35} d={`M${xa0} ${-y0} L${xb0} ${-y1} H${xb1} L${xa1} ${-y0} Z`} />;
            })}
            {i < 4 && (
              <g>
                <path fill={deep} d={`M${-w(y1) - 3} ${-y1} L${-w(y1) + 3} ${-y1 + 6} H${w(y1) - 3} L${w(y1) + 3} ${-y1} Z`} />
                <rect fill={fill} x={-w(y1) - 7} y={-y1 - 5} width={2 * w(y1) + 14} height="5" />
                {Array.from({ length: 7 }, (_, k) => (
                  <rect key={k} fill={fill} x={-w(y1) - 7 + (k * (2 * w(y1) + 12)) / 6} y={-y1 - 11} width="2" height="6" />
                ))}
                <rect fill={fill} x={-w(y1) - 7} y={-y1 - 12} width={2 * w(y1) + 14} height="1.6" />
              </g>
            )}
          </g>
        );
      })}
      <path fill={marble} d={`M-10 ${-H} C-11 ${-H - 12} -3 ${-H - 18} 0 ${-H - 22} C3 ${-H - 18} 11 ${-H - 12} 10 ${-H} Z`} />
    </g>
  );
}

/* ── Jantar Mantar: the Samrat Yantra ────────────────────────────────── */

export function SamratYantra({ tone, ...pl }: Place & { tone: Tone }) {
  const { body, shade, deep, trim = "#f6ead8" } = tone;
  const steps = 14;
  return (
    <g transform={at(pl)}>
      {/* the quadrants either side */}
      <path fill={body} d="M-250 0 A190 190 0 0 1 -80 -176 V-150 A164 164 0 0 0 -224 0 Z" />
      <path fill={body} d="M250 0 A190 190 0 0 0 80 -176 V-150 A164 164 0 0 1 224 0 Z" />
      <path fill={trim} d="M-250 0 A190 190 0 0 1 -80 -176 V-172 A186 186 0 0 0 -246 0 Z" />
      <path fill={trim} d="M250 0 A190 190 0 0 0 80 -176 V-172 A186 186 0 0 1 246 0 Z" />
      {Array.from({ length: 13 }, (_, i) => {
        const a = (Math.PI / 2) * (i / 12);
        const c = Math.cos(a), s = Math.sin(a);
        return (
          <g key={i}>
            <path stroke={trim} strokeWidth="1.2" d={`M${(-80 - 177 * c).toFixed(1)} ${(-177 * s).toFixed(1)} L${(-80 - 167 * c).toFixed(1)} ${(-167 * s).toFixed(1)}`} />
            <path stroke={trim} strokeWidth="1.2" d={`M${(80 + 177 * c).toFixed(1)} ${(-177 * s).toFixed(1)} L${(80 + 167 * c).toFixed(1)} ${(-167 * s).toFixed(1)}`} />
          </g>
        );
      })}
      {/* the gnomon */}
      <path fill={body} d="M-80 0 L64 -380 L80 -380 L80 0 Z" />
      <path fill={shade} d="M40 -300 L64 -380 L80 -380 L80 0 H40 Z" opacity="0.7" />
      <path fill={trim} d="M-80 0 L64 -380 L68 -380 L-76 0 Z" />
      {Array.from({ length: steps }, (_, i) => {
        const t = (i + 0.5) / steps;
        const x = -80 + 144 * t;
        const y = -380 * t;
        return <rect key={i} fill={deep} x={x - 2} y={y - 3} width="10" height="1.8" />;
      })}
      <rect fill={deep} x={-30} y={-30} width="22" height="30" rx="11" />
      <rect fill={trim} x={-260} y={-4} width="520" height="4" />
    </g>
  );
}

/** The Ram Yantra: an open cylinder of pillars. */
export function RamYantra({ tone, ...pl }: Place & { tone: Tone }) {
  const { body, shade, deep, trim = "#f6ead8" } = tone;
  return (
    <g transform={at(pl)}>
      <rect fill={body} x={-90} y={-120} width="180" height="120" />
      <rect fill={shade} x={20} y={-120} width="70" height="120" opacity="0.7" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} fill={deep} d={`M${-78 + i * 22} -10 V-78 Q${-78 + i * 22 + 7} -92 ${-78 + i * 22 + 14} -78 V-10 Z`} />
      ))}
      <rect fill={trim} x={-94} y={-124} width="188" height="5" />
      <rect fill={trim} x={-94} y={-60} width="188" height="2.5" />
      <rect fill={trim} x={-94} y={-4} width="188" height="4" />
    </g>
  );
}

/* ── Red Fort, the Lahori Gate ───────────────────────────────────────── */

export function RedFort({ tone, marble, ...pl }: Place & { tone: Tone; marble: string }) {
  const { body, shade, deep } = tone;
  const tower = (x: number) => (
    <g key={x}>
      <path fill={body} d={`M${x - 20} 0 V-150 H${x + 20} V0 Z`} />
      <rect fill={shade} x={x + 4} y={-150} width="16" height="150" opacity="0.6" />
      <rect fill={marble} x={x - 23} y={-160} width="46" height="10" />
      {[-15, -5, 5, 15].map((c) => (
        <rect key={c} fill={marble} x={x + c - 2} y={-176} width="4" height="16" />
      ))}
      <rect fill={marble} x={x - 22} y={-178} width="44" height="4" />
      <path fill={marble} d={`M${x - 20} -178 C${x - 22} -196 ${x - 6} -202 ${x} -212 C${x + 6} -202 ${x + 22} -196 ${x + 20} -178 Z`} />
      <rect fill={marble} x={x - 1} y={-222} width="2" height="11" />
    </g>
  );
  return (
    <g transform={at(pl)}>
      {/* the long rampart */}
      <path fill={body} d="M-560 0 V-86 H-120 V0 Z M120 0 V-86 H560 V0 Z" />
      {Array.from({ length: 36 }, (_, i) => {
        const x = -556 + i * 12.4;
        return x < -122 ? <path key={i} fill={body} d={`M${x} -86 v-8 q4 -6 8 0 v8 Z`} /> : null;
      })}
      {Array.from({ length: 36 }, (_, i) => {
        const x = 124 + i * 12.4;
        return x < 552 ? <path key={i} fill={body} d={`M${x} -86 v-8 q4 -6 8 0 v8 Z`} /> : null;
      })}
      <rect fill={shade} x={-560} y={-40} width="440" height="3" opacity="0.6" />
      <rect fill={shade} x={120} y={-40} width="440" height="3" opacity="0.6" />
      {/* the gate */}
      <path fill={body} d="M-110 0 V-116 H110 V0 Z" />
      <rect fill={shade} x={40} y={-116} width="70" height="116" opacity="0.5" />
      <path fill={deep} d="M-26 0 V-62 Q-26 -94 0 -100 Q26 -94 26 -62 V0 Z" />
      <rect fill={marble} x={-112} y={-122} width="224" height="6" />
      {[-60, -36, -12, 12, 36, 60].map((x) => (
        <g key={x}>
          <rect fill={marble} x={x - 9} y={-138} width="18" height="16" />
          <path fill={marble} d={`M${x - 10} -138 Q${x} -154 ${x + 10} -138 Z`} />
        </g>
      ))}
      {tower(-90)}
      {tower(90)}
    </g>
  );
}

/* ── Shared details ──────────────────────────────────────────────────── */

export function CypressTree({ x, y, h, fill, shade }: { x: number; y: number; h: number; fill: string; shade: string }) {
  const w = h * 0.12;
  return (
    <g>
      <path fill={fill} d={`M${x} ${y} C${x - w} ${y - h * 0.2} ${x - w * 0.9} ${y - h * 0.75} ${x} ${y - h} C${x + w * 0.9} ${y - h * 0.75} ${x + w} ${y - h * 0.2} ${x} ${y} Z`} />
      <path fill={shade} d={`M${x} ${y} V${y - h} C${x + w * 0.9} ${y - h * 0.75} ${x + w} ${y - h * 0.2} ${x} ${y} Z`} />
    </g>
  );
}

export function RoundTree({ x, y, r, fill, shade, trunk }: { x: number; y: number; r: number; fill: string; shade: string; trunk: string }) {
  return (
    <g>
      <rect fill={trunk} x={x - r * 0.08} y={y - r * 0.9} width={r * 0.16} height={r * 0.9} />
      <circle fill={fill} cx={x} cy={y - r * 1.5} r={r} />
      <path fill={shade} d={`M${x} ${y - r * 2.5} A${r} ${r} 0 0 1 ${x} ${y - r * 0.5} Z`} />
    </g>
  );
}

/** The cusped (multifoil) arch of Shah Jahan's marble pavilions. */
export function cusped(cx: number, base: number, w: number, h: number) {
  const r = w / 6;
  const top = base - h;
  return `M${cx - w / 2} ${base} V${top + r * 2.2}
    Q${cx - w / 2} ${top + r} ${cx - w / 2 + r} ${top + r * 1.1}
    Q${cx - w / 2 + r} ${top} ${cx - r * 0.9} ${top + r * 0.3}
    Q${cx - r * 0.5} ${top - r * 0.9} ${cx} ${top - r * 0.8}
    Q${cx + r * 0.5} ${top - r * 0.9} ${cx + r * 0.9} ${top + r * 0.3}
    Q${cx + w / 2 - r} ${top} ${cx + w / 2 - r} ${top + r * 1.1}
    Q${cx + w / 2} ${top + r} ${cx + w / 2} ${top + r * 2.2} V${base} Z`;
}

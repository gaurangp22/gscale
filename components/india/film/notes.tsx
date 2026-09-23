import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  AirplaneLanding,
  AirplaneTilt,
  ArrowRight,
  Bed,
  Bus,
  ChalkboardTeacher,
  Coffee,
  Compass,
  Factory,
  ForkKnife,
  IdentificationCard,
  Medal,
  MoonStars,
  Taxi,
  Umbrella,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import { EDITION, PROGRAMMES, type ProgrammeId } from "../content";
import { SITE } from "@/lib/site-content";
import { FORM_HREF } from "./scene-programmes";
import { InView } from "./in-view";
import { IndiaGate, Qutub, RedFort, SamratYantra, Taj } from "./monuments";

/* ─────────────────────────────────────────────────────────────────────────
   Programme notes — the printed programme handed out after the film.

   Warm paper, red ink. The monuments of the film return as an engraved
   frieze, and every small drawing on the page inks itself in once as it
   arrives: the figures at a glance, a mark for each programme, a paper
   plane along the nomination route, and a stamp on the envelope.
   ───────────────────────────────────────────────────────────────────────── */

const LINE = { body: "none", shade: "none", deep: "none", trim: "none" };

/** The film's monuments, as an engraving. */
function Frieze() {
  return (
    <InView className="frieze" threshold={0.2}>
      <svg viewBox="0 0 1600 280" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <circle className="ink draw" cx="800" cy="120" r="92" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} className="ink draw" d={`M${690 - i * 30} 262 H${910 + i * 30}`} strokeOpacity={0.35 - i * 0.05} />
        ))}
        <g className="ink draw">
          <Qutub x={290} y={262} s={0.62} tone={LINE} marble="none" />
          <IndiaGate x={500} y={262} s={0.86} tone={LINE} />
          <Taj x={800} y={262} s={0.66} tone={LINE} />
          <SamratYantra x={1080} y={262} s={0.4} tone={{ ...LINE, trim: "none" }} />
          <RedFort x={1380} y={262} s={0.36} tone={LINE} marble="none" />
        </g>
        <path className="ink draw" d="M0 262 H1600" />
        <g className="ink draw birds">
          <path d="M620 70 q7 -7 14 0 q7 -7 14 0" />
          <path d="M660 90 q5 -5 10 0 q5 -5 10 0" />
          <path d="M950 60 q6 -6 12 0 q6 -6 12 0" />
        </g>
      </svg>
    </InView>
  );
}

/* ── ink vignettes for the figures at a glance ───────────────────── */

const GLANCE_ART: Record<string, ReactNode> = {
  window: (
    <>
      <rect className="ink draw" x="10" y="16" width="52" height="46" rx="4" />
      <path className="ink draw" d="M10 28 H62 M22 10 V20 M50 10 V20" />
      <circle className="ink draw" cx="36" cy="46" r="8" />
      <path className="ink draw" d="M36 32 V35 M36 57 V60 M22 46 H25 M47 46 H50" />
    </>
  ),
  days: (
    <>
      <circle className="ink draw" cx="26" cy="38" r="12" />
      <path className="ink draw" d="M26 18 V22 M26 54 V58 M6 38 H10 M42 38 H46 M12 24 L15 27 M40 24 L37 27" />
      <path className="ink draw" d="M60 18 A16 16 0 1 0 66 44 A13 13 0 1 1 60 18 Z" />
    </>
  ),
  fee: (
    <>
      <path className="ink draw" d="M8 22 H64 V32 A6 6 0 0 0 64 44 V54 H8 V44 A6 6 0 0 0 8 32 Z" />
      <path className="ink draw" d="M46 24 V52" strokeDasharray="3 4" />
      <path className="ink draw" d="M18 34 H36 M18 42 H30" />
    </>
  ),
  credits: (
    <>
      <path className="ink draw" d="M36 24 C28 18 16 18 8 22 V58 C16 54 28 54 36 60 C44 54 56 54 64 58 V22 C56 18 44 18 36 24 Z" />
      <path className="ink draw" d="M36 24 V60 M14 32 H28 M14 40 H28 M44 32 H58 M44 40 H58" />
    </>
  ),
};

const GLANCE = [
  { art: "window", big: "7–20 Dec", unit: "2026", note: "Galgotias University, Greater Noida" },
  { art: "days", big: "10–12", unit: "days", note: "Length varies by programme" },
  { art: "fee", big: "1,000–1,200", unit: "USD", note: "Per participant, bundled*" },
  { art: "credits", big: "Up to 3", unit: "credits", note: "Subject to the home institution’s approval" },
];

/* ── a mark for each programme, echoing its film ─────────────────── */

const MARK: Record<ProgrammeId, ReactNode> = {
  A: (
    <>
      <rect x="14" y="6" width="20" height="36" rx="4" />
      <path d="M19 14 H25 M19 20 H29 M19 26 H24" />
    </>
  ),
  B: (
    <>
      <rect x="4" y="9" width="40" height="30" rx="3" />
      <path d="M4 16 H44 M18 22 L13 27 L18 32 M30 22 L35 27 L30 32" />
    </>
  ),
  C: (
    <>
      <rect x="6" y="14" width="30" height="20" rx="3" />
      <path d="M36 20 H40 V28 H36 M22 16 L16 25 H22 L19 32" />
    </>
  ),
  D: (
    <>
      <path d="M24 42 C14 30 12 24 12 19 C12 12 17 7 24 7 C31 7 36 12 36 19 C36 24 34 30 24 42 Z" />
      <circle cx="24" cy="19" r="4.5" />
    </>
  ),
};

const INCLUDED: Array<[ReactNode, string]> = [
  [<ChalkboardTeacher key="i" />, "Programme delivery"],
  [<Bed key="i" />, "Twin-share accommodation"],
  [<Coffee key="i" />, "Daily breakfast, plus lunch or dinner"],
  [<Bus key="i" />, "Official local transport"],
  [<AirplaneLanding key="i" />, "Airport transfers in the arrival and departure windows"],
  [<Compass key="i" />, "Excursions, including Agra and the Taj Mahal"],
  [<Factory key="i" />, "Industry and institutional visits"],
  [<Medal key="i" />, "Awards and certificates"],
];

const EXCLUDED: Array<[ReactNode, string]> = [
  [<AirplaneTilt key="i" />, "Flights"],
  [<IdentificationCard key="i" />, "Visas"],
  [<Umbrella key="i" />, "Travel insurance"],
  [<ForkKnife key="i" />, "Meals not listed opposite"],
  [<Taxi key="i" />, "Transport outside the schedule"],
  [<Wallet key="i" />, "Personal expenses"],
  [<MoonStars key="i" />, "Additional nights of accommodation"],
];

const STEPS = [
  { t: "Express interest", d: "Share a few details through the form. It takes about three minutes." },
  { t: "We get back to you", d: "Galgotias University’s international office gets in touch." },
  { t: "Prepare to travel", d: "Participants arrange flights, visas and insurance, and confirm credit transfer with their home institution before travel." },
];

function Arches() {
  return (
    <svg className="notes-band" viewBox="0 0 480 24" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id="notes-arches" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M3 24 V13 C3 8 7 5 12 2 C17 5 21 8 21 13 V24" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="17" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="480" height="24" fill="url(#notes-arches)" />
    </svg>
  );
}

/** A postage stamp of the Taj, postmarked Greater Noida. */
function Stamp() {
  return (
    <svg viewBox="0 0 200 170" className="stamp" aria-hidden>
      <defs>
        <mask id="stamp-perf">
          <rect x="0" y="0" width="120" height="150" fill="#fff" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} fill="#000">
              <circle cx={5 + i * 10} cy="0" r="3.4" />
              <circle cx={5 + i * 10} cy="150" r="3.4" />
            </g>
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <g key={i} fill="#000">
              <circle cx="0" cy={5 + i * 10} r="3.4" />
              <circle cx="120" cy={5 + i * 10} r="3.4" />
            </g>
          ))}
        </mask>
      </defs>
      <g className="stamp-paper" transform="translate(14 10) rotate(-4 60 75)">
        <rect width="120" height="150" fill="#f4ecdf" mask="url(#stamp-perf)" />
        <rect x="10" y="10" width="100" height="130" fill="#e9b7a3" />
        <circle cx="60" cy="72" r="30" fill="#f6d2a8" />
        <Taj x={60} y={112} s={0.3} tone={{ body: "#fbf1e6", shade: "#ecd2c4", deep: "#b77f8e", trim: "#d6a39c", hi: "#fff8f0" }} />
        <rect x="10" y="112" width="100" height="28" fill="#7a2f33" />
        <text x="60" y="131" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="3" fill="#f4ecdf">
          INDIA
        </text>
      </g>
      <g className="postmark">
        <circle cx="150" cy="96" r="30" />
        <circle cx="150" cy="96" r="24" />
        <path d="M112 72 q10 -6 20 0 t20 0 t20 0 t20 0 M112 84 q10 -6 20 0 t20 0 t20 0 t20 0" />
        <text x="150" y="94" textAnchor="middle" fontSize="7" letterSpacing="1.2">GREATER</text>
        <text x="150" y="103" textAnchor="middle" fontSize="7" letterSpacing="1.2">NOIDA</text>
      </g>
    </svg>
  );
}

export function Notes() {
  return (
    <section id="notes" className="notes" aria-labelledby="notes-title">
      <Arches />
      <Frieze />
      <div className="notes-inner">
        <InView as="header" className="notes-head reveal">
          <p className="slate">Programme notes · December 2026</p>
          <h2 id="notes-title">The details.</h2>
          <Link href={FORM_HREF} className="film-btn film-btn-ink">
            Express interest <ArrowRight size={15} weight="bold" />
          </Link>
        </InView>

        <InView as="dl" className="glance">
          {GLANCE.map((g, i) => (
            <div key={g.note} style={{ "--i": i } as CSSProperties}>
              <svg viewBox="0 0 72 72" className="glance-art" aria-hidden>
                {GLANCE_ART[g.art]}
              </svg>
              <dd>
                {g.big} <span>{g.unit}</span>
              </dd>
              <dt>{g.note}</dt>
            </div>
          ))}
        </InView>

        <InView as="section" className="notes-block reveal" aria-labelledby="compare-title">
          <h3 id="compare-title">Compare the four programmes</h3>
          <div className="compare" role="table" aria-label="The four programmes compared">
            <div className="compare-row compare-labels" role="row">
              <span role="columnheader">Programme</span>
              <span role="columnheader">Taught with</span>
              <span role="columnheader">For students of</span>
              <span role="columnheader">Fee</span>
            </div>
            {PROGRAMMES.map((p, i) => (
              <div key={p.id} className="compare-row" role="row" style={{ "--c": p.hue, "--i": i } as CSSProperties}>
                <span role="cell" className="compare-name">
                  <svg viewBox="0 0 48 48" className="compare-mark" aria-hidden>
                    {MARK[p.id]}
                  </svg>
                  {p.title}
                </span>
                <span role="cell" data-label="Taught with">
                  {p.withLT ? "Larsen & Toubro" : "iOS Development Centre"}
                </span>
                <span role="cell" data-label="For students of">
                  {p.forStudents}
                </span>
                <span role="cell" data-label="Fee">
                  {p.fee}
                </span>
              </div>
            ))}
          </div>
        </InView>

        <InView as="section" className="notes-block reveal" aria-labelledby="fee-title">
          <h3 id="fee-title">What the fee covers</h3>
          <div className="fee-cols">
            <div>
              <p className="fee-cap">Included</p>
              <ul>
                {INCLUDED.map(([icon, x], i) => (
                  <li key={x} style={{ "--i": i } as CSSProperties}>
                    <span className="fee-ico ok">{icon}</span> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="excluded">
              <p className="fee-cap">Arranged by participants</p>
              <ul>
                {EXCLUDED.map(([icon, x], i) => (
                  <li key={x} style={{ "--i": i + 2 } as CSSProperties}>
                    <span className="fee-ico">{icon}</span> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </InView>

        <InView as="section" className="notes-block reveal" aria-labelledby="assess-title">
          <h3 id="assess-title">Assessment and recognition</h3>
          <div className="assess">
            <p>
              Students are assessed on their Innovation Studio project and Innovation Challenge, a
              reflective learning portfolio that includes Village Connect, and peer evaluation with
              faculty and industry panels.
            </p>
            <p>
              Three academic credits are recommended, subject to partner-institution approval.
              Participants should confirm credit transfer with their home institution before
              travel.
            </p>
          </div>
        </InView>

        <InView as="section" className="notes-block route-block reveal" aria-labelledby="steps-title">
          <h3 id="steps-title">How it works</h3>
          <div className="route">
            <span className="route-line" aria-hidden />
            <span className="route-plane" aria-hidden>
              <svg viewBox="-36 -14 40 28">
                <path d="M0 0 L-34 -12 L-24 0 Z" fill="#f4ecdf" />
                <path d="M0 0 L-24 0 L-30 10 Z" fill="#e6d6bf" />
                <path d="M0 0 L-34 -12 L-24 0 L-30 10 Z M-24 0 L0 0" fill="none" stroke="#9b3a2c" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t} style={{ "--i": i } as CSSProperties}>
                  <span className="step-n">{i + 1}</span>
                  <b>{s.t}</b>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </InView>

        <InView as="section" className="contact-card" aria-label="Contact" threshold={0.4}>
          <div>
            <p className="slate">Questions</p>
            <p className="contact-name">International Office, Galgotias University</p>
            <p className="contact-sub">Greater Noida, Uttar Pradesh, India</p>
            <a href={`mailto:${EDITION.email}`} className="contact-mail">
              {EDITION.email}
            </a>
          </div>
          <Stamp />
        </InView>

        <p className="fine">
          *Fees are per participant and bundled. Programme length, itinerary, excursions and visits
          may be adjusted to operational availability. Airport transfers apply only within the
          designated arrival and departure windows. Participants must confirm visa requirements and
          timelines.
        </p>
      </div>

      <footer className="credits" aria-label="Galgotias University">
        <svg className="credits-band" viewBox="0 0 480 24" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="480" height="24" fill="url(#notes-arches)" />
        </svg>
        <div className="credits-inner">
          <div className="credits-top">
            <div className="credits-brands">
              <a href="https://www.galgotiasuniversity.edu.in" className="credits-gu" aria-label="Galgotias University">
                <Image src="/galgotias-lockup-light.png" width={184} height={38} alt="Galgotias University" />
              </a>
              <span className="credits-with">In collaboration with</span>
              <Image src="/logos/lt-white.png" width={141} height={26} alt="Larsen &amp; Toubro" className="credits-lt" />
            </div>
            <Link href={FORM_HREF} className="film-btn film-btn-sun">
              Express interest <ArrowRight size={15} weight="bold" />
            </Link>
          </div>

          <div className="credits-cols">
            <div>
              <p className="credits-h">The programmes</p>
              <ul>
                {PROGRAMMES.map((p) => (
                  <li key={p.id}>
                    <a href="#programmes">
                      <i style={{ background: p.hue }} aria-hidden /> {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="credits-h">On this page</p>
              <ul>
                <li><a href="#arrive">Arrive &amp; orient</a></li>
                <li><a href="#lt">With Larsen &amp; Toubro</a></li>
                <li><a href="#build">Build &amp; challenge</a></li>
                <li><a href="#heritage">Outside the studio</a></li>
                <li><a href="#notes">Programme notes</a></li>
              </ul>
            </div>
            <div>
              <p className="credits-h">International Office</p>
              <address>
                {SITE.address}
                <br />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <br />
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </address>
            </div>
          </div>

          <p className="credits-bottom">© {new Date().getFullYear()} Galgotias University. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { ChordDiagram } from "@/components/visuals/diagrams";
import {
  BUILDING_PARTNERSHIPS,
  GSCALE,
  INDUSTRY_TIEUPS,
  QS_THE_EVENTS,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "International Partnerships",
  description:
    "Institutional collaboration, industry co-creation and international forums at Galgotias University.",
};

const networkNodes = [
  "NTU Singapore",
  "Cambridge",
  "Apple",
  "Infosys",
  "Wipro",
  "Tata Technologies",
  "QS",
  "THE",
  "Ynov Campus",
  "Villa College",
];

export default function PartnershipsPage() {
  const leftPillars = GSCALE.pillars.slice(0, 2);
  const rightPillars = GSCALE.pillars.slice(2);

  return (
    <>
      <section className="partnership-hero">
        <div className="site-shell partnership-hero-grid">
          <div className="motion-rise">
            <h1 className="hero-title">A network, not a directory.</h1>
            <p className="hero-copy">
              The strongest partnerships do more than sit in a list of MoUs.
              They move students, reshape classrooms and give research somewhere to go.
            </p>
            <div className="hero-actions">
              <Link href="#partnerships" className="button-primary">
                Build with us <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="#gscale" className="button-light">
                See the learning system <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="network-stage motion-rise-delay">
            <ChordDiagram nodes={networkNodes} />
          </div>
        </div>
      </section>

      <section className="forum-table section-pad">
        <div className="site-shell forum-layout">
          <header>
            <p className="statement-kicker">Global forums</p>
            <h2 className="section-title">Where the next conversation starts.</h2>
          </header>
          <div className="forum-rows">
            {QS_THE_EVENTS.slice(0, 4).map((event) => (
              <article className="forum-row" key={event.title}>
                <time>{event.lines[0]}</time>
                <strong>{event.title}</strong>
                <span>{event.lines[1] ?? event.badge}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gscale-system section-pad" id="gscale">
        <div className="site-shell system-grid">
          <div>
            <p className="statement-kicker">The shared operating system</p>
            <h2 className="section-title">G-SCALE makes collaboration usable.</h2>
            <p className="section-copy">{GSCALE.intro[0]}</p>
          </div>
          <div className="system-map">
            <div>
              {leftPillars.map((pillar) => (
                <article className="system-node" key={pillar.title}>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
            <div className="system-core">G-SCALE</div>
            <div>
              {rightPillars.map((pillar) => (
                <article className="system-node" key={pillar.title}>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="industry-canvas section-pad">
        <div className="site-shell">
          <header className="section-heading">
            <h2 className="section-title">Partners who enter the classroom.</h2>
            <p className="section-copy">
              These collaborations are measured in centres, curriculum and working student projects.
            </p>
          </header>
          <div className="industry-rail">
            {INDUSTRY_TIEUPS.slice(0, 5).map((partner, index) => (
              <article className="industry-item" key={partner.name}>
                <strong>{partner.name}</strong>
                <span>Connection {String(index + 1).padStart(2, "0")}</span>
                <p>{partner.thing}</p>
                <p>{partner.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" id="partnerships">
        <div className="site-shell possibility-map">
          <div className="possibility-core">What can we build?</div>
          <div className="possibility-list">
            {BUILDING_PARTNERSHIPS.areas.map((area) => {
              const [title, detail] = area.split(" - ");
              return (
                <div className="possibility-row" key={area}>
                  <strong>{title}</strong>
                  <span>{detail ?? "Designed together with the International Office"}</span>
                  <Link href="/contact" aria-label={`Discuss ${title}`}>
                    <ArrowUpRight size={20} weight="bold" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

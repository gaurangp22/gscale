import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Globe } from "@/components/visuals/globe";
import {
  AUDIENCE_ROUTES,
  FEATURED_EVENTS,
  GLOBE_ORIGIN,
  GLOBE_ROUTES,
  STATS,
} from "@/lib/data";

function HomeHero() {
  return (
    <section className="home-hero">
      <span className="coordinate coordinate-a">28.4595° N / 77.4960° E</span>
      <span className="coordinate coordinate-b">Routes from Greater Noida</span>
      <div className="site-shell home-hero-grid">
        <div className="home-hero-copy motion-rise">
          <h1 className="hero-title">
            Greater Noida,
            <br />
            connected <span className="accent">worldwide.</span>
          </h1>
          <p className="hero-copy">
            We build the routes that move students, ideas and institutions
            across borders.
          </p>
          <div className="hero-actions">
            <Link href="/programmes" className="button-primary">
              Explore programmes <ArrowRight size={16} weight="bold" />
            </Link>
            <Link href="/partnerships" className="button-light">
              Partner with us <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        <div className="globe-stage motion-rise-delay">
          <Globe
            origin={GLOBE_ORIGIN}
            destinations={GLOBE_ROUTES}
            tone="light"
          />
          <div className="globe-legend">
            Greater Noida is the hub
            <br />
            {GLOBE_ROUTES.length} documented corridors
          </div>
        </div>
      </div>
    </section>
  );
}

function PositionStatement() {
  return (
    <section className="statement-band">
      <div className="site-shell statement-grid">
        <p className="statement-kicker">The position</p>
        <p className="statement-body">
          Sixth in India for international students is not a slogan. It is the
          visible result of programmes people can join, partnerships that stay
          active and an office that owns the route from first email to arrival.
        </p>
      </div>
    </section>
  );
}

function ProofRail() {
  return (
    <section className="stats-rail" aria-label="Galgotias University highlights">
      <div className="site-shell stats-grid">
        <div className="stat-intro">
          <strong>International by design, not by decoration.</strong>
          <span className="statement-kicker">Measured in real systems</span>
        </div>
        {STATS.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-number">
              {"prefix" in stat ? stat.prefix : ""}
              {stat.value}
              {stat.suffix}
            </span>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AudienceSection() {
  const left = AUDIENCE_ROUTES.slice(0, 2);
  const right = AUDIENCE_ROUTES.slice(2);
  return (
    <section className="audience-section section-pad">
      <div className="site-shell">
        <header className="section-heading">
          <h2 className="section-title">Four ways into the network.</h2>
          <p className="section-copy">
            Choose the route that matches what you are trying to move: your
            studies, your institution, your delegation or your expertise.
          </p>
        </header>

        <div className="audience-map">
          <div className="audience-side">
            {left.map((route) => (
              <Link className="audience-link" href={route.href} key={route.title}>
                <strong>{route.title}</strong>
                <p>{route.text}</p>
                <ArrowRight size={22} weight="bold" />
              </Link>
            ))}
          </div>

          <div className="audience-center">
            <div>
              <strong>Greater Noida</strong>
              <span>A global campus is a working network.</span>
            </div>
          </div>

          <div className="audience-side">
            {right.map((route) => (
              <Link className="audience-link" href={route.href} key={route.title}>
                <strong>{route.title}</strong>
                <p>{route.text}</p>
                <ArrowRight size={22} weight="bold" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobilitySection() {
  return (
    <section className="mobility-map section-pad">
      <div className="site-shell mobility-layout">
        <div>
          <h2 className="section-title">Every route has a reason.</h2>
          <p className="section-copy">
            Short programmes, research challenges and international
            competitions, selected for what students will build and bring home.
          </p>
          <div className="hero-actions">
            <Link href="/programmes" className="button-primary">
              Explore programmes <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        <div className="mobility-visual" aria-label="Illustrated programme destinations">
          <span className="mobility-node" aria-hidden />
          <span className="mobility-line" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/programme-landmarks.png"
            alt="Line illustrations of Singapore, Cambridge, Hong Kong and a global cybersecurity network"
          />
          <div className="mobility-destinations" aria-hidden>
            <span>Singapore</span>
            <span>Cambridge</span>
            <span>Hong Kong</span>
            <span>Global circuit</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const events = FEATURED_EVENTS.slice(0, 3);
  const images = [
    "/images/summit-editorial.png",
    "/campus-bg.jpg",
    "/images/office-table.png",
  ];

  return (
    <section className="editorial-events section-pad">
      <div className="site-shell">
        <div className="event-grid">
          <div className="event-lead">
            <div>
              <h2 className="section-title">Rooms that change the work.</h2>
              <p className="section-copy">
                Summits, delegations and competitions where relationships turn
                into programmes.
              </p>
            </div>
            <Link href="/events" className="button-ghost">
              View the record <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          {events.map((event, index) => (
            <article className="event-tile" key={event.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[index]} alt="" />
              <div className="event-tile-body">
                <span className="event-date">{event.when}</span>
                <h3>{event.title}</h3>
                <p>{event.where}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto">
      <div className="site-shell manifesto-grid">
        <h2 className="manifesto-title">
          G-SCALE
          <br />
          <span className="accent">without</span>
          <br />
          borders
        </h2>
        <div className="manifesto-copy">
          <p>
            International programmes only work when the learning at home is
            worth sharing.
          </p>
          <p>
            G-SCALE turns classrooms into working studios for collaboration,
            applied research and ideas that survive beyond a presentation.
          </p>
          <Link href="/partnerships#gscale" className="button-light">
            See the framework <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PositionStatement />
      <ProofRail />
      <AudienceSection />
      <MobilitySection />
      <EventsSection />
      <Manifesto />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, iconMap } from "@/components/icons";
import {
  CONFERENCES_TEXT,
  CONFERENCE_TYPES,
  FEATURED_EVENTS,
  FEATURED_VISITS,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Events and Visits",
  description:
    "A record of international summits, academic visits, student competitions and delegations coordinated by Galgotias University.",
};

const eventImages = [
  "/images/summit-editorial.png",
  "/campus-bg.jpg",
  "/images/office-table.png",
  "/images/summit-editorial.png",
  "/images/programme-landmarks.png",
];

export default function EventsPage() {
  return (
    <>
      <section className="events-hero">
        <div className="site-shell events-hero-grid">
          <div className="events-hero-photo motion-rise">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/summit-editorial.png"
              alt="Higher education leaders in conversation at an international summit"
            />
          </div>
          <div className="events-hero-copy motion-rise-delay">
            <h1 className="hero-title">The rooms where global work begins.</h1>
            <p className="hero-copy">
              Summits, visiting delegations and international competitions,
              recorded as a working archive rather than a photo gallery.
            </p>
            <div className="hero-actions">
              <Link href="#timeline" className="button-primary">
                Read the record <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
        <div className="site-shell events-tabs" aria-label="Event archive sections">
          <a href="#timeline">Global forums</a>
          <a href="#delegations">Delegations</a>
          <a href="#hosting">Host with us</a>
        </div>
      </section>

      <section className="event-timeline" id="timeline">
        <div className="event-records">
          {FEATURED_EVENTS.slice(0, 5).map((event, index) => (
            <article className="event-record" key={event.title}>
              <time>{event.when}<br />{event.where}</time>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={eventImages[index]} alt="" />
              <div>
                <span className="programme-kind">{event.category}</span>
                <h2>{event.title}</h2>
                <p>{event.text}</p>
                {event.linkHref ? (
                  <a className="button-ghost" href={event.linkHref} target="_blank" rel="noreferrer">
                    Official event <ArrowUpRight size={15} weight="bold" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad" id="delegations">
        <div className="site-shell">
          <header className="section-heading">
            <h2 className="section-title">When the world comes to campus.</h2>
            <p className="section-copy">
              Hosted journeys with academic work, industry exposure and cultural context in one programme.
            </p>
          </header>
          <div className="delegation-rail">
            {FEATURED_VISITS.map((visit, index) => (
              <article className="delegation-card" key={visit.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={index === 0 ? "/images/office-table.png" : "/campus-bg.jpg"} alt="" />
                <strong>{visit.title}</strong>
                <span>{visit.when} / {visit.where}</span>
              </article>
            ))}
            <article className="delegation-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/programme-landmarks.png" alt="" />
              <strong>Planning the next delegation</strong>
              <span>Built around your academic priorities</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad" id="hosting">
        <div className="site-shell hosting-layout">
          <div>
            <p className="statement-kicker">Host with us</p>
            <h2 className="section-title">Bring the conversation here.</h2>
            <p className="section-copy">{CONFERENCES_TEXT[0]}</p>
            <div className="hero-actions">
              <Link href="/contact" className="button-primary">
                Propose an event <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="hosting-types">
            {CONFERENCE_TYPES.map((type) => {
              const Icon = iconMap[type.icon];
              return (
                <article className="hosting-type" key={type.title}>
                  <Icon size={22} color="var(--crimson)" aria-hidden />
                  <strong>{type.title}</strong>
                  <p>{type.text}</p>
                </article>
              );
            })}
          </div>
          <div className="hosting-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/campus-bg.jpg" alt="Galgotias University campus" />
          </div>
        </div>
      </section>
    </>
  );
}

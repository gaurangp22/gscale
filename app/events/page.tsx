import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/photo";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Reveal, Stagger } from "@/components/reveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  DelegationIllustration,
  RoundTableIllustration,
  SignpostIllustration,
  TimelineIllustration,
} from "@/components/visuals/illustrations";
import { PhotoBand } from "@/components/photo";
import { EVENT_PROPOSAL, EVENT_RATIONALE, EVENT_RECORDS } from "@/lib/site-content";
import { PHOTOS } from "@/lib/photography";

export const metadata: Metadata = {
  title: "International Events and Delegations",
  description:
    "Explore the international forums, academic visits and delegations coordinated through G-SCALE.",
};

/* The masthead itinerary, read off the records so it cannot drift. One
   entry per city — Jakarta hosted two of them in the same month. */
const ITINERARY = EVENT_RECORDS.reduce<{ place: string; when: string }[]>(
  (stops, event) => {
    if (stops.some((stop) => stop.place === event.city)) return stops;
    return [...stops, { place: event.city, when: event.date }];
  },
  [],
);

const attended = EVENT_RECORDS.filter((event) => event.type !== "Hosted");

/* Grouped from the records themselves so the counts cannot drift. */
const ARCHIVE_YEARS = Object.entries(
  EVENT_RECORDS.reduce<Record<string, { title: string; href: string }[]>>((years, event) => {
    const year = event.date.match(/\d{4}/)?.[0] ?? "Undated";
    const entry = {
      title: event.title,
      href: event.type === "Hosted" ? "#organize" : "#participate",
    };
    years[year] = years[year] ? [...years[year], entry] : [entry];
    return years;
  }, {}),
)
  .map(([year, records]) => ({ year, records }))
  .sort((a, b) => b.year.localeCompare(a.year));
const hosted = EVENT_RECORDS.filter((event) => event.type === "Hosted");

const attendedPhotos = ["conference", "congress", "conference", "congress", "congress"] as const;

export default function EventsPage() {
  return (
    <>
      {/* Image-led rather than diagram-led: this page is a record of rooms
          the University was actually in, so it opens with one. */}
      <section className="events-masthead">
        <div className="events-masthead-frame">
          <Image
            src={PHOTOS.congress.src}
            alt={PHOTOS.congress.alt}
            fill
            priority
            sizes="100vw"
            className="events-masthead-photo"
          />
          <div className="events-masthead-scrim" aria-hidden />

          <div className="site-shell events-masthead-copy">
            <span className="eyebrow eyebrow-light"><i />Events &amp; delegations</span>
            <SplitText
              as="h1"
              text="Rooms the University was in."
              accent="was in."
            />
            <p>
              Forums, congresses, academic visits and hosted programs: what
              each one was for, who took part, and what came back from it.
            </p>
          </div>

          <ol className="events-itinerary" aria-label="Locations on record">
            {ITINERARY.map((stop) => (
              <li key={stop.place}>
                <strong>{stop.place}</strong>
                <em>{stop.when}</em>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="events-intro section-pad">
        <div className="site-shell events-intro-grid">
          <Reveal>
            <RoundTableIllustration />
            <SplitText as="h2" text="Participation with a defined institutional objective." />
            <p className="lede">
              An event is worth attending when somebody can say, afterwards,
              what changed because of it.
            </p>
            <p>
              G-SCALE takes part in and organizes a small number of forums,
              workshops and visits each year, chosen against that test. Every
              record below states why Galgotias University was involved, what
              took place, and what followed, including where the honest answer
              is that follow-up is still pending.
            </p>
          </Reveal>
          <div className="event-types">
            <a href="#participate">Events we participate in</a>
            <a href="#organize">Events we organize</a>
            <a href="#delegations">Visiting academic delegations</a>
          </div>
        </div>
      </section>

      <PhotoBand name="conference">
        <span className="eyebrow eyebrow-light"><i />Why attend</span>
        <h2>Attendance is not the point. Coming back with something is.</h2>
        <p>
          Four reasons the office puts people on a plane, and the test each
          delegation is measured against afterwards.
        </p>
      </PhotoBand>

      <section className="rationale-section section-pad rule-grid">
        <div className="site-shell">
          <Stagger className="rationale-grid">
            {EVENT_RATIONALE.map((item, index) => (
              <Spotlight as="article" className="rationale-item" key={item.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="event-record-section section-pad" id="participate">
        <div className="site-shell event-ledger-layout">
          <aside className="event-ledger-aside">
            <h2>Events we participate in</h2>
            <p>
              Selected forums and academic gatherings, each tied to a defined
              institutional objective agreed before anyone travels.
            </p>
          </aside>
          <TracingBeam className="event-ledger">
            {attended.map((event, index) => (
              <article className="event-ledger-record" key={event.title}>
                <div className="event-record-head">
                  <div>
                    <span>{event.type}</span>
                    <h3>{event.title}</h3>
                    <p><MapPin size={15} aria-hidden />{event.date} / {event.location}</p>
                  </div>
                  <Photo
                    name={attendedPhotos[index % attendedPhotos.length]}
                    ratio="16 / 10"
                    caption={false}
                    sizes="(max-width: 900px) 100vw, 34vw"
                  />
                </div>
                <dl className="event-facts">
                  <div><dt>Purpose</dt><dd>{event.purpose}</dd></div>
                  <div><dt>Role</dt><dd>{event.role}</dd></div>
                  <div><dt>Participants</dt><dd>{event.participants}</dd></div>
                  <div><dt>Outcome</dt><dd>{event.outcome}</dd></div>
                  <div><dt>Next step</dt><dd>{event.next}</dd></div>
                  <div><dt>Related activity</dt><dd>{event.related}</dd></div>
                </dl>
              </article>
            ))}
          </TracingBeam>
        </div>
      </section>

      <section className="hosted-event-section section-pad" id="organize">
        <div className="site-shell event-ledger-layout">
          <aside className="event-ledger-aside">
            <h2>Events we organize</h2>
            <p>
              Academic workshops, partner meetings and hosted programs built
              around a clear purpose: designed here, delivered with the schools
              and facilities they actually use.
            </p>
            <DelegationIllustration />
          </aside>
          <div className="event-ledger" id="delegations">
            {hosted.map((event) => (
              <article className="event-ledger-record" key={event.title}>
                <div className="event-record-head">
                  <div>
                    <span>{event.type}</span>
                    <h3>{event.title}</h3>
                    <p><MapPin size={15} aria-hidden />{event.date} / {event.location}</p>
                  </div>
                  <Photo
                    name="roundtable"
                    ratio="16 / 10"
                    caption={false}
                    sizes="(max-width: 900px) 100vw, 34vw"
                  />
                </div>
                <dl className="event-facts">
                  <div><dt>Purpose</dt><dd>{event.purpose}</dd></div>
                  <div><dt>Role</dt><dd>{event.role}</dd></div>
                  <div><dt>Participants</dt><dd>{event.participants}</dd></div>
                  <div><dt>Outcome</dt><dd>{event.outcome}</dd></div>
                  <div><dt>Next step</dt><dd>{event.next}</dd></div>
                  <div><dt>Related activity</dt><dd>{event.related}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="event-archive section-pad" id="archive">
        <div className="site-shell event-archive-grid">
          <Reveal>
            <span className="eyebrow"><i />The record</span>
            <h2>Archive</h2>
            <p>
              Every record by year, grouped as events Galgotias took part in
              and events it hosted. Counts come from the records themselves,
              so this list cannot drift out of step with the page above.
            </p>
            <Parallax speed={0.05}>
              <TimelineIllustration />
            </Parallax>
          </Reveal>
          <div className="year-archive">
            {ARCHIVE_YEARS.map((entry, index) => (
              <details key={entry.year} open={index === 0}>
                <summary>
                  {entry.year}
                  <span>{entry.records.length} {entry.records.length === 1 ? "record" : "records"}</span>
                </summary>
                <div>
                  {entry.records.map((record) => (
                    <a href={record.href} key={record.title}>
                      {record.title} <ArrowRight size={16} />
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="proposal-section section-pad rule-grid">
        <div className="site-shell method-layout">
          <Reveal className="method-head">
            <span className="eyebrow"><i />Proposing one</span>
            <SplitText
              as="h2"
              text="How to propose an event or a visit."
              accent="or a visit."
            />
            <p>
              The office would rather receive a rough proposal with these four
              answered than a polished one without them.
            </p>

            <div className="head-aside">
              <strong>Already have a partner institution?</strong>
              <p>
                Say so in the first line. A proposal with a willing academic at
                the other end moves several weeks faster than a cold one.
              </p>
              <Link href="/partnerships">
                See collaboration areas <ArrowRight size={15} weight="bold" />
              </Link>
            </div>

            <Parallax speed={0.05}>
              <SignpostIllustration />
            </Parallax>
          </Reveal>

          <Stagger className="method-list">
            {EVENT_PROPOSAL.map((item, index) => (
              <article className="method-item" key={item.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="events-cta section-pad">
        <div className="site-shell events-cta-row">
          <div>
            <h2>Propose an event or academic visit.</h2>
            <p>
              Send the purpose, the participating institution, a preferred
              window and the outcome you have in mind. A short message with
              those four beats a long one without them.
            </p>
          </div>
          <Magnetic>
            <Link href="/contact" className="button button-primary">Submit an inquiry <ArrowRight size={17} /></Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}

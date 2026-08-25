import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ConnectionScene } from "@/components/visuals/connection-scene";
import {
  AuditoriumIllustration,
  FilamentIllustration,
  TrailIllustration,
} from "@/components/visuals/illustrations";
import { Photo, PhotoBand } from "@/components/photo";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Reveal, Stagger } from "@/components/reveal";
import { StackDeck } from "@/components/stack-deck";
import { RecordMarquee } from "@/components/record-marquee";
import {
  AUDIENCES,
  FLAGSHIP,
  GLOBE_ROUTES,
  PRACTICE,
  PRIORITIES,
} from "@/lib/site-content";
import { PHOTOS, type PhotoKey } from "@/lib/photography";

const priorityIllustrations = [
  AuditoriumIllustration,
  TrailIllustration,
  FilamentIllustration,
];

const recentActivity = [
  {
    type: "Outbound program",
    title: "Cambridge Global Summer Program 2026",
    text: "Two residential weeks at Girton College in venture thinking, frugal AI and public speaking, closing with a London immersion visit.",
    photo: "campus" satisfies PhotoKey,
    href: "/programs#archive",
  },
  {
    type: "Student ventures",
    title: "Global Startup and Development Congress, Jakarta",
    text: "Three Galgotias ventures presented (CarbonSynq Earth, Project TACTO and ReGrub), and two students joined a panel on access to sustainability careers.",
    photo: "congress" satisfies PhotoKey,
    href: "/events#participate",
  },
  {
    type: "Hosted program",
    title: "iOS Student Developer Program 2025",
    text: "The inaugural inbound cohort: students from NTU Singapore and Villa College, Maldives, hosted for a fortnight at the iOS Development Center and pitching to panels at the end of it.",
    photo: "developers" satisfies PhotoKey,
    href: "/events#organize",
  },
] as const;

const practicePhotos = ["cohort", "studyGroup", "workshop", "meetingRoom"] as const;

const practiceTabs = ["Term", "Faculty", "Ventures", "Relationships"] as const;

/* Institutions named in the record — drawn only from documented programs,
   events and prizes elsewhere on this site. Context tags say where. */
const RECORD_NAMES = [
  { name: "University of Cambridge", context: "Girton College · Outbound 2026" },
  { name: "Nanyang Technological University", context: "ASEAN Summer Program · 2025" },
  { name: "Villa College, Maldives", context: "Inbound program · 2025" },
  { name: "Apple", context: "iOS Development Centre" },
  { name: "Infosys", context: "iOS Development Centre" },
  { name: "Drone Destination Pvt. Ltd.", context: "Industry collaboration" },
  { name: "QS", context: "India & China Summits · 2025-26" },
  { name: "Times Higher Education", context: "Impact Rankings reveal · 2026" },
  { name: "Amazon Web Services", context: "Championship Prize · EDVentures 2026" },
  { name: "EDVentures Hong Kong", context: "Innovation competition · 2026" },
  { name: "Global Startup & Development Congress", context: "Jakarta" },
] as const;

const INTRO_FACTS = [
  { term: "Outbound", detail: "Short-term study, research and innovation with partner institutions" },
  { term: "Inbound", detail: "Nominated participants hosted at Greater Noida" },
  { term: "Collaboration", detail: "Joint research, curriculum work, forums and delegations" },
] as const;

const tickerItems = GLOBE_ROUTES.map((route) => `${route.name} · ${route.country}`);

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="site-shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow">
              <i />
              Galgotias University · International Office
            </span>

            <h1>
              <SplitText text="Building Opportunities." />
              <SplitText
                text="Transforming Futures."
                accent="Futures."
                delay={160}
              />
            </h1>

            <p>
              International opportunities for learning and collaboration:
              mobility programs, institutional partnerships, academic forums and
              visiting delegations, coordinated from Greater Noida.
            </p>

            <div className="hero-actions">
              <Magnetic>
                <Link href="/programs" className="button button-primary">
                  Explore programs <ArrowRight size={17} weight="bold" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/partnerships" className="button button-secondary">
                  Partner with G-SCALE <ArrowRight size={17} weight="bold" />
                </Link>
              </Magnetic>
            </div>

            <div className="hero-meta">
              <span>
                <strong>{GLOBE_ROUTES.length}</strong> documented route corridors
              </span>
              <span>
                <strong>Outbound &amp; inbound</strong> short-term mobility
              </span>
            </div>
          </div>

          <ConnectionScene />
        </div>

        <div className="scroll-cue" aria-hidden>
          <span>Scroll</span>
          <i />
        </div>
      </section>

      {/* Where the routes actually go — a ticker of documented corridors. */}
      <div className="route-ticker" aria-hidden>
        <div className="route-ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">
        Documented route corridors: {tickerItems.join(", ")}.
      </span>

      <section className="intro-statement section-pad rule-grid">
        <div className="site-shell intro-statement-grid">
          <Reveal className="intro-statement-head">
            <span className="eyebrow"><i />The work</span>
            <SplitText
              as="h2"
              text="Learning that extends beyond borders."
              accent="beyond borders."
            />
            <dl className="intro-facts">
              {INTRO_FACTS.map((fact) => (
                <div key={fact.term}>
                  <dt>{fact.term}</dt>
                  <dd>{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal variant="fade" delay={120}>
            {/* What this office is *for* is defined once, on the about page.
                Home does the other job: naming where the work actually goes. */}
            <p className="lede">
              G-SCALE is where Galgotias University turns internationalisation
              into academic practice. It connects teaching, research,
              innovation and institutional strategy with partners beyond
              India—through joint academic work, faculty engagement, visiting
              delegations, global forums, competitions and student mobility.
            </p>
            <p>
              The work begins with a real academic need: a partner for a
              research question, a collaborator for a course, an international
              stage for student innovation, or a relationship that can grow
              beyond a single visit. G-SCALE brings the right people together,
              shapes the collaboration and carries it from first conversation
              to measurable outcome.
            </p>
            <p>
              Everything below is part of that wider record: how the University
              builds lasting global relationships and turns them into
              opportunities, knowledge and institutional impact.
            </p>
          </Reveal>
        </div>

        {/* The record, in names — where the work has already run. */}
        <RecordMarquee entries={RECORD_NAMES} />
      </section>

      <section className="priority-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Priorities</span>
            <h2 className="section-title">Three priorities shape the work.</h2>
            <p className="section-lede">
              Everything the office runs has to answer to at least one. Where an
              opportunity answers to none of the three, however prestigious the
              invitation, it is declined, and that happens more often than you
              would expect.
            </p>
          </Reveal>
          <Stagger className="priority-field">
            {PRIORITIES.map((priority, index) => {
              const Illustration = priorityIllustrations[index];
              return (
                <Spotlight
                  as="article"
                  key={priority.title}
                  className="priority-item"
                >
                  <Illustration />
                  <span className="priority-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{priority.title}</h3>
                  <p>{priority.text}</p>
                  <p className="priority-detail">{priority.detail}</p>
                </Spotlight>
              );
            })}
          </Stagger>
        </div>
      </section>

      <PhotoBand name="graduation">
        <span className="eyebrow eyebrow-light"><i />In practice</span>
        <h2>An international education is a set of specific experiences.</h2>
        <p>
          Not a stamp in a passport. Below is what the work looks like when it
          is doing its job.
        </p>
      </PhotoBand>

      {/* The four experiences, filed on top of each other as you scroll —
          each sheet pins under the nav and the next slides over it. */}
      <section className="practice-section section-pad" aria-label="In practice">
        <div className="site-shell">
          <StackDeck>
            {PRACTICE.map((item, index) => (
              <article
                className="stack-card practice-card"
                key={item.title}
                style={{ "--stack-i": index } as CSSProperties}
              >
                <span className="practice-tab" aria-hidden>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {practiceTabs[index]}
                </span>

                <div className="practice-media">
                  <Image
                    src={PHOTOS[practicePhotos[index]].src}
                    alt={PHOTOS[practicePhotos[index]].alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 44vw"
                    className="practice-media-img"
                  />
                  <span className="practice-chip" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <strong className="practice-ghost" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </strong>

                <div className="practice-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </StackDeck>
        </div>
      </section>

      {/* The single strongest piece of evidence the office has. Home tells it
          once, at length; the events page carries it as a dated record. */}
      <section className="flagship-section">
        <div className="site-shell flagship-layout">
          <Reveal className="flagship-copy">
            <span className="eyebrow eyebrow-light"><i />{FLAGSHIP.eyebrow}</span>
            <SplitText as="h2" text={FLAGSHIP.title} accent="Champion." />
            <p>{FLAGSHIP.text}</p>
            <blockquote>
              <p>{FLAGSHIP.quote}</p>
              <cite>{FLAGSHIP.attribution}</cite>
            </blockquote>
            <Magnetic>
              <Link href="/innovation" className="button button-light">
                See the rest of the ventures <ArrowRight size={17} weight="bold" />
              </Link>
            </Magnetic>
          </Reveal>

          <Parallax speed={0.07} className="flagship-figure">
            <Photo name="congress" ratio="4 / 5" caption={false} sizes="(max-width: 900px) 100vw, 32vw" />
          </Parallax>
        </div>
      </section>

      {/* One door-picker, not two. The route index that used to sit above
          this section asked the same question of the same three readers and
          sent them to the same three pages. */}
      <section className="audience-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Start here</span>
            <h2 className="section-title">Find the door that is yours.</h2>
            <p className="section-lede">
              Three ways people arrive at this office, and what each one should
              read first. If none of them fits, the events record is the fourth
              door and the office is the fifth.
            </p>
          </Reveal>
          <Stagger className="audience-grid">
            {AUDIENCES.map((audience) => (
              <Spotlight as="article" className="audience-card" key={audience.label}>
                <span className="audience-label">{audience.label}</span>
                <h3>{audience.title}</h3>
                <ul>
                  {audience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link href={audience.href} className="text-link">
                  {audience.action} <ArrowRight size={16} weight="bold" />
                </Link>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The open-calls board lives on the mobility page, where somebody
          hunting for one will look. Home carries the status, not a second
          copy of the board. */}
      <section className="activity-section section-pad">
        <div className="site-shell">
          <Reveal className="activity-heading">
            <span className="eyebrow"><i />Recent record</span>
            <h2>Recent programs, collaborations and events</h2>
            <p>
              Three of the most recent, each linking to its full record.
              Nothing is open for application this month; confirmed calls
              appear on the{" "}
              <Link href="/programs#current">mobility page</Link> as they are
              settled.
            </p>
          </Reveal>
          <Stagger className="activity-grid">
            {recentActivity.map((activity) => (
              <Spotlight as="article" className="activity-record" key={activity.title}>
                <Link href={activity.href}>
                  <Photo
                    name={activity.photo}
                    ratio="16 / 10"
                    caption={false}
                    sizes="(max-width: 900px) 100vw, 30vw"
                  />
                  <span>{activity.type}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                </Link>
              </Spotlight>
            ))}
          </Stagger>
          <Link href="/events" className="text-link">
            Explore recent activity <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </section>

    </>
  );
}

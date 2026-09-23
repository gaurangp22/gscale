import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ConnectionScene } from "@/components/visuals/connection-scene";
import { Photo, PhotoBand } from "@/components/photo";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Reveal, Stagger } from "@/components/reveal";
import { StackDeck } from "@/components/stack-deck";
import { FilmReel, type ReelFrame } from "@/components/film-reel";
import {
  AUDIENCES,
  COLLABORATION_AREAS,
  FLAGSHIP,
  GLOBE_DESTINATIONS,
  PROGRAM_ASPECTS,
} from "@/lib/site-content";
import { PHOTOS, type PhotoKey } from "@/lib/photography";

/* The three categories the events page files everything under. One record
   each, most recent first, so the reader learns the shape of the archive
   before they open it. */
const recentActivity = [
  {
    type: "Mobility programs",
    title: "Cambridge Global Summer Program 2026",
    text: "Two residential weeks at Girton College in venture thinking, frugal AI and public speaking, closing with a London immersion visit.",
    photo: "campus" satisfies PhotoKey,
    href: "/programs#archive",
  },
  {
    type: "Conferences and seminars",
    title: "Global Sustainable Development Congress, Jakarta",
    text: "Four days on climate and energy transition, sustainable cities, education equality and ESG frameworks, alongside the live reveal of the THE Impact Rankings.",
    photo: "conference" satisfies PhotoKey,
    href: "/events#participate",
  },
  {
    type: "Events and collaborations",
    title: "iOS Student Developer Program 2025",
    text: "The inaugural inbound cohort: students from NTU Singapore and Villa College, Maldives, hosted for a fortnight at the iOS Development Centre with Apple and Infosys.",
    photo: "developers" satisfies PhotoKey,
    href: "/events#organize",
  },
] as const;

const programPhotos = ["workshop", "developers", "cohort"] as const;

/* G-SCALE as it looks on the ground. The captions carry the claim; the
   pictures are stand-ins until the office's own documentary photography
   lands, and swapping them is a one-line edit in lib/photography.ts. */
const REEL_FRAMES: readonly ReelFrame[] = [
  { photo: "teaching", caption: "Active, student-centred teaching across every school" },
  { photo: "workshop", caption: "Innovation workshops where students own the problem" },
  { photo: "studentsLaptops", caption: "Inbound cohorts building alongside Galgotias students" },
  { photo: "cohort", caption: "Cohorts drawn from more than one institution" },
  { photo: "developers", caption: "Applied technical work at the iOS Development Centre" },
  { photo: "congress", caption: "Student ventures presented on international stages" },
  { photo: "studyGroup", caption: "Collaborative work across cohorts and disciplines" },
  { photo: "graduation", caption: "Where a G-SCALE education is meant to arrive" },
];

/* The three commitments underneath "students at the centre". Each carries a
   scannable tag so the rail reads at a glance. */
const LEARNING_PILLARS = [
  { term: "Agency", detail: "Cultivating learner agency and active participation" },
  { term: "Opportunity", detail: "Curating rich and purposeful global opportunities" },
  { term: "Leadership", detail: "Developing future leaders and creators" },
] as const;

const tickerItems = GLOBE_DESTINATIONS.map((route) => `${route.name} · ${route.country}`);

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

            <p className="hero-lede">
              Connecting the world with India&rsquo;s higher education.
            </p>

            <p>
              Join our network of global academic collaborations and
              partnerships.
            </p>

            <div className="hero-actions">
              <Magnetic>
                <Link href="/programs" className="button button-primary">
                  Our Programs <ArrowRight size={17} weight="bold" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/partnerships" className="button button-secondary">
                  Global Partnerships <ArrowRight size={17} weight="bold" />
                </Link>
              </Magnetic>
            </div>
          </div>

          <ConnectionScene />
        </div>

        <div className="scroll-cue" aria-hidden>
          <span>Scroll</span>
          <i />
        </div>
      </section>

      {/* The corridors the globe above is drawing, named. The title is what
          makes the strip mean something rather than scroll past. */}
      <div className="route-ticker">
        <span className="route-ticker-title">Our Global Network</span>
        <div className="route-ticker-viewport" aria-hidden>
          <div className="route-ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={index}>
                {item}
                <i />
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">
        Our global network: {tickerItems.join(", ")}.
      </span>

      <section className="intro-statement section-pad rule-grid">
        <div className="site-shell intro-statement-grid">
          <Reveal className="intro-statement-head">
            <span className="eyebrow"><i />The work</span>
            <SplitText
              as="h2"
              text="Students at the centre of learning @ GU"
              accent="@ GU"
            />
            <dl className="intro-facts">
              {LEARNING_PILLARS.map((pillar) => (
                <div key={pillar.term}>
                  <dt>{pillar.term}</dt>
                  <dd>{pillar.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal variant="fade" delay={120}>
            <p className="lede">
              Galgotias Student Centered Active Learning Ecosystem (G-SCALE) is
              a comprehensive transformation of how teaching and learning is
              carried out at GU. Focused on students and their active
              participation in their own learning, our goal is to create a
              conducive environment where students thrive as a key stakeholder
              in how learning should be experienced and developed.
            </p>
            <p>
              The G-SCALE International Office&rsquo;s role is to connect
              purposeful learning opportunities globally, so students develop
              the skills, capabilities and knowledge to shape a better future.
            </p>
            <p>
              Through key program offerings and initiatives in collaboration
              with global partner institutions, we seek to co-create knowledge
              that adds value to all.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What that transformation looks like on the ground, as a strip of
          film rather than a wall of institution names. */}
      <FilmReel frames={REEL_FRAMES} label="G-SCALE in practice" />

      {/* ═══ Global Partnerships ═══════════════════════════════════════ */}

      <PhotoBand name="roundtable">
        <span className="eyebrow eyebrow-light"><i />Global Partnerships</span>
        <h2>A shared purpose brings us together to mould and shape education futures.</h2>
        <p>
          A network of institutions, expertise and ideas, co-creating
          meaningful learning opportunities for all.
        </p>
      </PhotoBand>

      <section className="partnership-preview section-pad">
        <div className="site-shell">
          <Stagger className="partnership-preview-grid">
            {COLLABORATION_AREAS.map((area, index) => (
              <Spotlight as="article" className="partnership-preview-item" key={area.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{area.title}</h3>
                <p>{area.outcome}</p>
              </Spotlight>
            ))}
          </Stagger>
          <Link href="/partnerships" className="text-link">
            Explore global partnerships <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ═══ Our Programs ══════════════════════════════════════════════ */}

      {/* Three sheets, filed on top of each other as you scroll — one per
          thing a participant actually gets out of a program. */}
      <section className="practice-section section-pad" id="programs">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Our Programs</span>
            <SplitText
              as="h2"
              className="section-title"
              text="Some learning only happens when we take the first steps out."
              accent="the first steps out."
            />
            <p className="section-lede">
              Through our curated programs, meet challenges, peers and
              opportunities that will broaden your outlook on this world.
            </p>
          </Reveal>

          <StackDeck>
            {PROGRAM_ASPECTS.map((item, index) => (
              <article
                className="stack-card practice-card"
                key={item.title}
                style={{ "--stack-i": index } as CSSProperties}
              >
                <span className="practice-tab" aria-hidden>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {item.tab}
                </span>

                <div className="practice-media">
                  <Image
                    src={PHOTOS[programPhotos[index]].src}
                    alt={PHOTOS[programPhotos[index]].alt}
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

          <Link href="/programs" className="text-link deck-link">
            See all mobility programs <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ═══ Innovation @ GU ═══════════════════════════════════════════ */}

      {/* International exposure as a pathway into entrepreneurship, told
          through the single strongest piece of evidence the office has. */}
      <section className="flagship-section">
        <div className="site-shell flagship-layout">
          <Reveal className="flagship-copy">
            <span className="eyebrow eyebrow-light"><i />{FLAGSHIP.eyebrow}</span>
            <p className="flagship-lede">{FLAGSHIP.lede}</p>
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

      {/* ═══ Events & Delegation ═══════════════════════════════════════ */}

      <section className="activity-section section-pad">
        <div className="site-shell">
          <Reveal className="activity-heading">
            <span className="eyebrow"><i />Events &amp; Delegation</span>
            <h2>Recent Events and Delegation</h2>
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

      {/* ═══ Explore Opportunities ═════════════════════════════════════ */}

      {/* The last thing on the page is the door-picker: three ways in,
          named for who is standing in each one. */}
      <section className="audience-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Explore opportunities</span>
            <h2 className="section-title">
              Step in to our G-SCALE International Office.
            </h2>
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
    </>
  );
}

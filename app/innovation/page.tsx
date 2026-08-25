import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Photo } from "@/components/photo";
import { Reveal, Stagger } from "@/components/reveal";
import { FilamentIllustration } from "@/components/visuals/illustrations";
import {
  VENTURES,
  VENTURE_INTRO,
  VENTURE_PLATFORMS,
  VENTURE_ROUTES,
  VENTURE_STAGES,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Innovation and Entrepreneurship",
  description:
    "How student ventures at Galgotias University get built, tested and taken to international competitions, congresses and industry panels through G-SCALE.",
};

export default function InnovationPage() {
  return (
    <>
      {/* Hero: a marquee of the ventures themselves, then the claim. Nothing
          on this page is a diagram — the evidence is the names. */}
      <section className="venture-opening">
        <div className="site-shell venture-opening-inner">
          <span className="eyebrow"><i />{VENTURE_INTRO.eyebrow}</span>

          <h1>
            <SplitText text="Ideas are cheap." />
            <SplitText
              text="Ideas that survived a hostile room are not."
              accent="a hostile room are not."
              delay={160}
            />
          </h1>

          <p className="venture-lede">{VENTURE_INTRO.lede}</p>

          <div className="venture-ledger">
            {VENTURES.map((venture) => (
              <span key={venture.name} data-accent={venture.accent}>
                <strong>{venture.name}</strong>
                <em>{venture.status}</em>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="venture-claim section-pad rule-grid">
        <div className="site-shell venture-claim-grid">
          <Reveal>
            <SplitText as="h2" text={VENTURE_INTRO.title} accent="not an audience for it." />
          </Reveal>
          <Reveal variant="fade" delay={100}>
            <p>{VENTURE_INTRO.body}</p>
            <Parallax speed={0.05}>
              <FilamentIllustration />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* The EDVentures result is told at length once, on the home page.
          Here it is one entry in the ledger below, where it belongs among
          the other four. */}

      <section className="venture-stages section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />How it works</span>
            <h2 className="section-title">Build, test, travel, return.</h2>
            <p className="section-lede">
              Four stages. The office owns the third one and refuses to skip
              straight to it: a venture that has not survived stage two will
              not survive stage three, and the trip is expensive.
            </p>
          </Reveal>

          <Stagger className="stage-track">
            {VENTURE_STAGES.map((stage, index) => (
              <article className="stage-card" key={stage.stage}>
                <span className="stage-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="stage-name">{stage.stage}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="venture-list-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />The ventures</span>
            <SplitText
              as="h2"
              text="What Galgotias students actually took abroad."
              accent="took abroad."
            />
            <p className="section-lede">
              Five ventures, three continents, two competition finals. Each one
              began as coursework or a side project and ended in front of an
              audience that had never heard of it.
            </p>
          </Reveal>

          <Parallax speed={0.05} className="venture-list-figure">
            <Photo
              name="workshop"
              ratio="16 / 9"
              caption={false}
              sizes="(max-width: 900px) 100vw, 74vw"
            />
          </Parallax>

          <Stagger className="venture-grid">
            {VENTURES.map((venture) => (
              <Spotlight
                as="article"
                className="venture-card"
                key={venture.name}
                data-accent={venture.accent}
              >
                <div className="venture-card-head">
                  <h3>{venture.name}</h3>
                  <span className="venture-lead">{venture.lead}</span>
                </div>
                <p>{venture.text}</p>
                <p className="venture-result">{venture.result}</p>
                <span className="venture-status">{venture.status}</span>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="platform-section section-pad rule-grid">
        <div className="site-shell platform-layout">
          <Reveal className="platform-head">
            <span className="eyebrow"><i />Where they went</span>
            <h2>The rooms that do the testing.</h2>
            <p>
              The office chooses a small number of platforms each year and
              prepares the people going to them. A competition nobody prepared
              for is a holiday with a lanyard.
            </p>

            <div className="head-aside">
              <strong>Proposing a platform?</strong>
              <p>
                If you know a competition or congress that would read this work
                harder than we currently do, say so.
              </p>
              <Link href="/contact">
                Tell the office <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </Reveal>

          <Stagger className="platform-list">
            {VENTURE_PLATFORMS.map((platform, index) => (
              <article className="platform-item" key={platform.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <div>
                  <span className="platform-place">{platform.place}</span>
                  <h3>{platform.title}</h3>
                  <p>{platform.text}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="venture-routes section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Start here</span>
            <h2 className="section-title">Wherever you are with it.</h2>
          </Reveal>

          <Stagger className="route-doors">
            {VENTURE_ROUTES.map((route) => (
              <Spotlight as="article" className="route-door" key={route.label}>
                <h3>{route.label}</h3>
                <p>{route.text}</p>
                <Link href={route.href} className="text-link">
                  {route.action} <ArrowUpRight size={16} weight="bold" />
                </Link>
              </Spotlight>
            ))}
          </Stagger>

          <Reveal className="venture-cta" variant="fade">
            <p>
              The office would rather see a rough prototype early than a
              polished deck late.
            </p>
            <Magnetic>
              <Link href="/contact" className="button button-primary">
                Bring us something <ArrowRight size={17} weight="bold" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}

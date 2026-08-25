import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Photo, PhotoBand } from "@/components/photo";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Reveal, Stagger } from "@/components/reveal";
import { PartnershipMatrix } from "@/components/visuals/institutional-diagrams";
import {
  BridgeIllustration,
  LatticeIllustration,
  OrbitIllustration,
} from "@/components/visuals/illustrations";
import {
  COLLABORATION_OUTCOMES,
  COLLABORATION_PROCESS,
  INDUSTRY_PARTNERS,
  PARTNER_SIGNALS,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Partner with G-SCALE",
  description:
    "Develop mobility, research, curriculum, innovation and academic collaborations with G-SCALE at Galgotias University.",
};

const outcomePhotos = ["developers", "cohort", "congress"] as const;

export default function PartnershipsPage() {
  return (
    <>
      <section className="partnership-opening page-opening">
        <div className="site-shell partnership-opening-grid">
          <div className="page-opening-copy">
            <span className="eyebrow"><i />Institutional collaboration</span>
            <SplitText as="h1" text="Partner with G-SCALE." accent="G-SCALE." />
            <p>
              Academic collaborations built around a stated purpose (mobility,
              research, curriculum, innovation) and judged by the activity they
              produce rather than the agreements they generate.
            </p>
            <p className="page-opening-note">
              A first conversation usually takes twenty minutes and ends in a
              decision. That is deliberate.
            </p>
            <Magnetic>
              <Link href="#start" className="button button-primary">
                Start a conversation <ArrowRight size={17} weight="bold" />
              </Link>
            </Magnetic>
          </div>
          <PartnershipMatrix />
        </div>
      </section>

      <section className="partnership-position section-pad">
        <div className="site-shell partnership-position-grid">
          <Reveal>
            <BridgeIllustration />
            <h2>Why partner with G-SCALE</h2>
            <h3>Partnerships designed around shared academic purpose.</h3>
            <p className="lede">
              Because the office would rather run three collaborations that
              produce something than sign thirty that produce a page of logos.
            </p>
            <p>
              G-SCALE works with universities, academic institutions, industry
              and other organizations wherever there is a shared academic
              objective and a defined outcome. Where there is neither, we will
              say so early, which is worth more to you than a polite meeting
              that goes nowhere over eighteen months.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <OrbitIllustration />
            <h2>How partnerships support G-SCALE</h2>
            <h3>Connecting learning with international contexts.</h3>
            <p className="lede">
              Every collaboration is also a stress test of how we teach here.
            </p>
            <p>
              Working across disciplines, cultures and institutional contexts
              shows up the assumptions a single campus cannot see in itself. A
              module that only makes sense to students who already share your
              context is a module with a problem.
            </p>
            <p>
              So a proposal is weighed on what it would change here as much as
              on what it offers you. A collaboration that only benefits one side
              of the table has a short life expectancy, and both sides can
              usually see that coming.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="network-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Industry tie-ups</span>
            <SplitText
              as="h2"
              text="Partners who help design the curriculum, not just sponsor it."
              accent="not just sponsor it."
            />
            <p className="section-lede">
              Five specialist centers run on campus with named industry
              partners. They are what a collaborating institution actually gets
              access to, and what an inbound cohort is taught inside.
            </p>
          </Reveal>

          <Stagger className="network-list">
            {INDUSTRY_PARTNERS.map((entry, index) => (
              <article className="network-item" key={entry.facility}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <div>
                  <span className="network-partner">{entry.partner}</span>
                  <h3>{entry.facility}</h3>
                  <p>{entry.text}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="collaboration-process section-pad">
        <div className="site-shell">
          <div className="process-layout">
            <Reveal className="section-head">
              <span className="eyebrow"><i />Method</span>
              <h2 className="section-title">How collaborations are developed</h2>
            </Reveal>
            <Parallax speed={0.06}>
              <LatticeIllustration />
            </Parallax>
          </div>
          <Stagger className="process-path">
            {COLLABORATION_PROCESS.map((step, index) => (
              <article key={step.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="collaboration-outcomes section-pad">
        <div className="site-shell">
          <Reveal className="outcomes-heading">
            <span className="eyebrow"><i />Documented</span>
            <h2>From agreement to activity.</h2>
            <p>
              Only active and recently documented collaborations appear here.
              An agreement that has not yet produced activity does not get an
              entry, however senior the people who signed it.
            </p>
          </Reveal>
          <Stagger className="outcome-grid">
            {COLLABORATION_OUTCOMES.map((outcome, index) => (
              <Spotlight as="article" key={outcome.title}>
                <Photo
                  name={outcomePhotos[index]}
                  ratio="16 / 10"
                  caption={false}
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
                <span>{outcome.category}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="signals-section section-pad rule-grid">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Before you write</span>
            <SplitText
              as="h2"
              text="What makes an approach easy to answer."
              accent="easy to answer."
            />
            <p className="section-lede">
              The office reads every proposal it receives. These are the things
              that decide whether the reply takes two days or two months.
            </p>
          </Reveal>

          <div className="signals-columns">
            <Reveal className="signals-column signals-strong" variant="fade">
              <h3><span>Moves fast</span> A proposal we can assess</h3>
              <ul>
                {PARTNER_SIGNALS.strong.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="signals-column signals-weak" variant="fade" delay={90}>
              <h3><span>Stalls</span> A proposal we cannot act on</h3>
              <ul>
                {PARTNER_SIGNALS.weak.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoBand name="meetingRoom">
        <span className="eyebrow eyebrow-light"><i />How it starts</span>
        <h2>Most collaborations begin as one honest conversation.</h2>
        <p>
          About what your institution needs, what ours can offer, and whether
          the two are worth the work. Everything else follows from that.
        </p>
      </PhotoBand>

      <section className="partnership-cta section-pad" id="start">
        <div className="site-shell partnership-cta-row">
          <div>
            <h2>Start a conversation with G-SCALE.</h2>
            <p>
              Name your institution, the academic area, a rough window, and what
              you would want to exist at the end of it. Four lines is enough to
              get a real answer.
            </p>
          </div>
          <Magnetic>
            <Link href="/contact" className="button button-primary">
              Partner with G-SCALE <ArrowRight size={17} weight="bold" />
            </Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  EnvelopeSimple,
  Info,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { ContactStudio } from "@/components/contact-studio";
import { Magnetic, Parallax, SplitText } from "@/components/motion";
import { Photo } from "@/components/photo";
import {
  CampusPlanIllustration,
  LedgerIllustration,
  RelayIllustration,
} from "@/components/visuals/illustrations";
import { Reveal, Stagger } from "@/components/reveal";
import { FAQS, RESPONSE_PROCESS, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact G-SCALE",
  description:
    "Contact G-SCALE about mobility programs, institutional collaborations, academic events and visiting delegations.",
};

/* What makes an inquiry answerable in one reply rather than three. */
const BRIEF = [
  {
    label: "Who",
    title: "Your institution or program",
    text: "The organization you are writing on behalf of and, if you are a student, your school and year at Galgotias University.",
  },
  {
    label: "What",
    title: "The activity you have in mind",
    text: "Mobility, research, curriculum, an event, a delegation visit. A rough shape is enough; it does not need to be finished.",
  },
  {
    label: "When",
    title: "Dates or an academic window",
    text: "Even an approximate term or semester lets us tell you straight away whether it is feasible.",
  },
  {
    label: "Why",
    title: "The outcome you want at the end",
    text: "What should exist once the activity is over. This is the part that decides whether a proposal can move forward.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="contact-opening page-opening">
        <div className="site-shell contact-opening-copy">
          <span className="eyebrow"><i />Contact</span>
          <SplitText as="h1" text="Start the right conversation." accent="right conversation." />
          <p>
            Mobility programs, institutional collaborations, academic events
            and visiting delegations: this office handles all four, and will
            tell you plainly when your question belongs somewhere else.
          </p>
          <span>
            Name the institution, the program or the dates you have in mind
            and we can usually answer in one reply instead of three.
          </span>
        </div>
      </section>

      <section className="contact-section section-pad">
        <div className="site-shell">
          <ContactStudio />
        </div>
      </section>

      <section className="brief-section section-pad rule-grid">
        <div className="site-shell brief-layout">
          <Reveal className="brief-head">
            <span className="eyebrow"><i />Write a good brief</span>
            <SplitText
              as="h2"
              text="Four things turn an inquiry into an answer."
              accent="into an answer."
            />
            <p>
              Four lines, honestly answered, beat four paragraphs that leave the
              office guessing. Anything missing becomes a follow-up email, and a
              follow-up email costs everyone a week of calendar time.
            </p>
            <Parallax speed={0.05}>
              <LedgerIllustration />
            </Parallax>
          </Reveal>

          <Stagger className="brief-list">
            {BRIEF.map((item, index) => (
              <article className="brief-item" key={item.label}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <div>
                  <span className="brief-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="scope-section">
        <div className="site-shell scope-notice">
          <Info size={31} weight="thin" aria-hidden />
          <div>
            <h2>Before you write, check this is the right office</h2>
            <p>
              G-SCALE does not manage international admissions, degree
              applications, visas, FRRO registration, accommodation, financial
              aid or student welfare. Those sit with other Galgotias University
              offices, and sending them here adds a step rather than removing
              one.
            </p>
          </div>
        </div>
      </section>

      <section className="response-section section-pad rule-grid">
        <div className="site-shell method-layout">
          <Reveal className="method-head">
            <span className="eyebrow"><i />After you send it</span>
            <SplitText
              as="h2"
              text="What happens to your message."
              accent="to your message."
            />
            <p>
              No ticket numbers, no automated triage. Four steps, and you hear
              back at the end of them either way.
            </p>

            <div className="head-aside">
              <strong>Would rather just email?</strong>
              <p>
                The form routes your message to the right person slightly
                faster, but a direct email with the same four things in it works
                just as well.
              </p>
              <a href={`mailto:${SITE.email}`}>
                {SITE.email} <ArrowRight size={15} weight="bold" />
              </a>
            </div>

            <Parallax speed={0.05}>
              <RelayIllustration />
            </Parallax>
          </Reveal>

          <Stagger className="method-list">
            {RESPONSE_PROCESS.map((item, index) => (
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

      <section className="faq-section section-pad rule-grid">
        <div className="site-shell faq-grid">
          <Reveal className="faq-head">
            <span className="eyebrow"><i />Answered already</span>
            <SplitText
              as="h2"
              text="Questions we are asked most."
              accent="asked most."
            />
            <p>
              Eight things the office fields most weeks. If yours is not here,
              it would rather you asked than guessed.
            </p>
          </Reveal>

          <Stagger className="faq-list">
            {FAQS.map((faq, index) => (
              <details className="faq-item" key={faq.question} open={index === 0}>
                <summary>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {faq.question}
                  <i aria-hidden />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="office-details section-pad">
        <div className="site-shell office-details-grid">
          <div>
            <span className="eyebrow"><i />Find us</span>
            <h2>G-SCALE International Office</h2>
            <p><MapPin size={19} aria-hidden />{SITE.address}</p>
            <a href={`mailto:${SITE.email}`}><EnvelopeSimple size={19} aria-hidden />{SITE.email}</a>
            <a href={SITE.phoneHref}><Phone size={19} aria-hidden />{SITE.phone}</a>
            <Photo name="officeDesk" ratio="16 / 10" className="office-photo" sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
          <CampusPlanIllustration />
        </div>
      </section>

      <section className="page-actions section-pad">
        <div className="site-shell page-actions-row">
          <h2>Or read what has already been published.</h2>
          <div>
            <Magnetic><Link href="/programs">Mobility programs <ArrowRight size={17} /></Link></Magnetic>
            <Magnetic><Link href="/partnerships">Partnership areas <ArrowRight size={17} /></Link></Magnetic>
            <Magnetic><Link href="/events">Events and delegations <ArrowRight size={17} /></Link></Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

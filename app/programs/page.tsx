import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProgramArchive } from "@/components/program-archive";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { PhotoBand } from "@/components/photo";
import { Reveal, Stagger } from "@/components/reveal";
import {
  ArrivalIllustration,
  DepartureIllustration,
  EmptyCalendarIllustration,
  ChecklistIllustration,
  LedgerIllustration,
  PassportIllustration,
} from "@/components/visuals/illustrations";
import {
  COST_NOTES,
  INBOUND_PROGRAMS,
  OUTBOUND_PROGRAMS,
  PARTICIPATION_STEPS,
  READINESS,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "International Mobility Programs",
  description:
    "Explore outbound opportunities for Galgotias University students and inbound short-term programs for partner institutions.",
};

/* The board reads straight off the catalog, so it cannot drift from it. */
const BOARD_ROWS = [
  ...OUTBOUND_PROGRAMS.map((program) => ({
    direction: "Outbound" as const,
    program: program.title,
    host: program.partner,
    length: program.length,
    href: "#catalog",
  })),
  ...INBOUND_PROGRAMS.map((program) => ({
    direction: "Inbound" as const,
    program: program.title,
    host: program.partner,
    length: program.length,
    href: "#catalog",
  })),
];

export default function ProgramsPage() {
  return (
    <>
      {/* A departures board rather than another world map — the home page
          already carries the globe, and a board answers the question a
          prospective applicant actually arrives with. */}
      <section className="board-opening">
        <div className="site-shell">
          <div className="board-head">
            <div>
              <span className="eyebrow"><i />Mobility programs</span>
              <SplitText
                as="h1"
                text="Departures and arrivals."
                accent="and arrivals."
              />
            </div>
            <p>
              Short-term academic and cultural programs. Outbound runs on
              departmental nomination; inbound runs on nomination from a partner
              institution. Both are published with host, dates, eligibility and
              cost before applications open.
            </p>
          </div>

          <div className="board" role="table" aria-label="Mobility programs at a glance">
            <div className="board-row board-labels" role="row">
              <span role="columnheader">Direction</span>
              <span role="columnheader">Program</span>
              <span role="columnheader">Host</span>
              <span role="columnheader">Length</span>
            </div>

            {BOARD_ROWS.map((row, index) => (
              <a
                className="board-row"
                key={row.program}
                href={row.href}
                role="row"
                style={{ "--i": index } as React.CSSProperties}
                data-direction={row.direction}
              >
                <span role="cell" className="board-direction">
                  <i />
                  {row.direction}
                </span>
                <span role="cell" className="board-program">{row.program}</span>
                <span role="cell" className="board-host">{row.host}</span>
                <span role="cell" className="board-length">{row.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mobility-intro section-pad">
        <div className="site-shell mobility-intro-grid">
          <Reveal>
            <SplitText as="h2" text="Learning in a different environment." accent="different environment." />
            <p className="lede">
              Two directions, one office, and the same bar applied to both: a
              program has to be worth the term it costs somebody.
            </p>
            <p>
              So every confirmed program is published with its purpose, academic
              focus, eligibility, dates, selection process and expected outcomes
              before applications open. That detail is there to let you decide
              against a program as easily as for one, which is cheaper for
              everybody than finding out in week three.
            </p>
          </Reveal>
          <div className="mobility-values">
            <span>Global perspective</span>
            <span>Academic enrichment</span>
            <span>Cultural understanding</span>
          </div>
        </div>
      </section>

      <section className="direction-section section-pad">
        <div className="site-shell direction-grid">
          <Reveal as="article" className="direction-panel" id="outbound">
            <DepartureIllustration className="illus-azure" />
            <h2>Outbound programs</h2>
            <p>
              Short-term study, research, innovation and cultural programs
              overseas, open to eligible Galgotias University students. You
              apply here; the host institution decides who it takes.
            </p>
            <p>
              Availability changes term by term and no two hosts want the same
              things from applicants. Every confirmed opportunity is published
              with the full application and nomination requirements attached.
            </p>
            <Magnetic><Link href="#current">View outbound opportunities <ArrowRight size={17} /></Link></Magnetic>
          </Reveal>

          <Reveal as="article" className="direction-panel" id="inbound" delay={90}>
            <ArrivalIllustration className="illus-amber" />
            <h2>Inbound short-term programs</h2>
            <p>
              Structured academic and cultural programs hosted at Greater
              Noida for participants nominated by partner institutions, taught
              by Galgotias faculty alongside industry and cultural components.
            </p>
            <p>
              These are short-term mobility programs, not degree admission
              pathways. That distinction is worth stating plainly, because it
              is the most common misunderstanding the office receives.
            </p>
            <Magnetic><Link href="#current">View inbound programs <ArrowRight size={17} /></Link></Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="participation-section section-pad">
        <div className="site-shell">
          <div className="process-layout">
            <Reveal className="section-head">
              <span className="eyebrow"><i />Nomination</span>
              <h2 className="section-title">How students are selected</h2>
              <p className="section-lede">
                Four stages, the same for every outbound program. The first
                one happens in your department, before this office sees your
                name, which is the part most applicants find out too late.
              </p>
            </Reveal>
            <Parallax speed={0.05}>
              <PassportIllustration />
            </Parallax>
          </div>
          <Stagger className="participation-path">
            {PARTICIPATION_STEPS.map((step, index) => (
              <article key={step.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="step-note">{step.note}</span>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="readiness-section section-pad rule-grid">
        <div className="site-shell readiness-layout">
          <Reveal className="readiness-head">
            <span className="eyebrow"><i />Before you apply</span>
            <SplitText
              as="h2"
              text="Four things to sort out first."
              accent="sort out first."
            />
            <p>
              None of these are the office&apos;s decision to make for you, and
              all four have ended somebody&apos;s application late in the
              process. They are quicker to handle now.
            </p>

            <div className="head-aside">
              <strong>Not sure you are eligible?</strong>
              <p>
                Read the call first: it states the bar exactly. If it is still
                unclear after that, ask before the deadline rather than after.
              </p>
              <Link href="/contact">
                Ask the office <ArrowRight size={15} weight="bold" />
              </Link>
            </div>

            <Parallax speed={0.05}>
              <ChecklistIllustration />
            </Parallax>
          </Reveal>

          <Stagger className="readiness-list">
            {READINESS.map((item, index) => (
              <article className="readiness-item" key={item.title}>
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

      <section className="cost-section section-pad">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Money</span>
            <h2 className="section-title">What a program actually costs.</h2>
            <p className="section-lede">
              It depends on the program, and every confirmed call publishes
              its own figures. What does not change is the shape of the bill:
              plan for these four, and read the call for the fifth.
            </p>
          </Reveal>

          <Stagger className="cost-grid">
            {COST_NOTES.map((note, index) => (
              <Spotlight as="article" className="cost-item" key={note.label}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{note.label}</h3>
                <p>{note.text}</p>
              </Spotlight>
            ))}
          </Stagger>

          <Reveal className="cost-note" variant="fade">
            <p>
              Where funding or partial support exists, the call says so. If a
              call does not mention support, assume there is none rather than
              writing to ask, and factor accommodation in separately, because
              some hosts include it in the fee and some do not.
            </p>
          </Reveal>
        </div>
      </section>

      <PhotoBand name="studentsWalking">
        <span className="eyebrow eyebrow-light"><i />The catalog</span>
        <h2>What actually runs, in both directions.</h2>
        <p>
          Availability is confirmed term by term, but these are the programs
          the office builds around. Read the detail before you decide whether
          the application is worth your week.
        </p>
      </PhotoBand>

      <section className="catalog-section section-pad" id="catalog">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />Outbound</span>
            <h2 className="section-title">Going out</h2>
            <p className="section-lede">
              Open to eligible Galgotias students by departmental nomination.
            </p>
          </Reveal>

          <Stagger className="catalog-list">
            {OUTBOUND_PROGRAMS.map((program) => (
              <Spotlight as="article" className="catalog-item" key={program.title} data-direction="outbound">
                <div className="catalog-head">
                  <h3>{program.title}</h3>
                  <span className="catalog-partner">{program.partner}</span>
                  <span className="catalog-length">{program.length}</span>
                </div>
                <div className="catalog-body">
                  <p>{program.summary}</p>
                  <ul>
                    {program.detail.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <dl className="catalog-facts">
                  {program.facts.map((fact, index) => (
                    <div key={`${fact.term}-${index}`}>
                      <dt>{fact.term}</dt>
                      <dd>{fact.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Spotlight>
            ))}
          </Stagger>

          <Reveal className="section-head catalog-divider">
            <span className="eyebrow"><i />Inbound</span>
            <h2 className="section-title">Coming in</h2>
            <p className="section-lede">
              Open to participants nominated by a partner institution.
            </p>
          </Reveal>

          <Stagger className="catalog-list">
            {INBOUND_PROGRAMS.map((program) => (
              <Spotlight as="article" className="catalog-item" key={program.title} data-direction="inbound">
                <div className="catalog-head">
                  <h3>{program.title}</h3>
                  <span className="catalog-partner">{program.partner}</span>
                  <span className="catalog-length">{program.length}</span>
                </div>
                <div className="catalog-body">
                  <p>{program.summary}</p>
                  <ul>
                    {program.detail.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <dl className="catalog-facts">
                  {program.facts.map((fact, index) => (
                    <div key={`${fact.term}-${index}`}>
                      <dt>{fact.term}</dt>
                      <dd>{fact.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="current-programs section-pad" id="current">
        <div className="site-shell current-programs-grid">
          <Reveal>
            <h2>Current opportunities</h2>
            <p>
              Confirmed calls appear here with complete dates, eligibility,
              costs and application information. When this section is empty it
              is because nothing is settled, not because nothing is happening.
            </p>
          </Reveal>
          <div className="program-empty">
            <EmptyCalendarIllustration className="illus-bare" />
            <strong>There are no open opportunities at present.</strong>
            <span>Please review the previous program archive or contact the office with a specific inquiry.</span>
          </div>
        </div>
      </section>

      <section className="program-archive section-pad" id="archive">
        <div className="site-shell">
          <Reveal className="archive-heading">
            <div>
              <span className="eyebrow"><i />Archive</span>
              <h2>Previous programs</h2>
              <p>
              Completed programs stay published, filterable by year,
              direction, institution and academic focus. This archive is the
              most reliable guide to what is likely to run again.
            </p>
            </div>
            <LedgerIllustration />
          </Reveal>
          <ProgramArchive />
        </div>
      </section>
    </>
  );
}

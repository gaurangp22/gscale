import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  CalendarBlank,
  GlobeHemisphereWest,
  Handshake,
  Lightbulb,
  Path,
} from "@phosphor-icons/react/dist/ssr";
import { Photo, PhotoBand } from "@/components/photo";
import { Magnetic, Parallax, SplitText, Spotlight } from "@/components/motion";
import { Reveal, Stagger } from "@/components/reveal";
import {
  AuditoriumIllustration,
  CompassIllustration,
  DraftingIllustration,
  FilamentIllustration,
  TrailIllustration,
} from "@/components/visuals/illustrations";
import { Roster } from "@/components/roster";
import { getTeamPhoto } from "@/lib/photos";
import {
  GLOSSARY,
  GSCALE_FRAMEWORK,
  OFFICE_COMMITMENTS,
  OFFICE_ROLES,
  PRIORITIES,
  TEAM,
  TEAM_GROUPS,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About G-SCALE International",
  description:
    "Learn how G-SCALE supports internationalization, academic collaboration and global engagement at Galgotias University.",
};

const roleIcons = [Path, Handshake, Buildings, CalendarBlank, Lightbulb, GlobeHemisphereWest];

const priorityIllustrations = [
  AuditoriumIllustration,
  TrailIllustration,
  FilamentIllustration,
];

export default function AboutPage() {
  return (
    <>
      {/* A stacked masthead rather than the copy-plus-diagram split the
          other pages use: the headline runs the full measure, and the facts
          sit beneath it as a rule-divided strip. */}
      <section className="about-masthead">
        <div className="site-shell">
          <span className="eyebrow"><i />About the office</span>

          <h1 className="masthead-title">
            <SplitText text="One office." />
            <SplitText text="Every border the" delay={120} />
            <SplitText text="University crosses." accent="University crosses." delay={240} />
          </h1>

          <div className="masthead-strip">
            <div>
              <dt>What it is</dt>
              <dd>
                The single point of contact for mobility, institutional
                partnerships, academic forums and visiting delegations.
              </dd>
            </div>
            <div>
              <dt>How it works</dt>
              <dd>
                Across the schools, centers and University teams any
                international activity touches, so a participant deals with one
                institution rather than six.
              </dd>
            </div>
            <div>
              <dt>Where it sits</dt>
              <dd>A Block, third floor, Greater Noida.</dd>
            </div>
          </div>
        </div>
      </section>

      <section className="meaning-section section-pad">
        <div className="site-shell meaning-grid">
          <Reveal>
            <SplitText
              as="h2"
              text="Bringing global perspectives into the academic experience."
              accent="academic experience."
            />
            <p className="lede">
              Internationalization is a word that survives on most university
              websites without ever being defined. Here it means something
              narrow and checkable: deliberately building global perspective
              into what students are taught, what faculty research, and how the
              University works with institutions beyond it.
            </p>
            <p>
              Narrow and checkable matters here. Either a syllabus contains work
              designed with somebody outside this University, or it does not.
              Either a research question was answerable in Greater Noida alone,
              or a second institution had to be found for it.
            </p>
            <p>
              So it is not a single program and it is not a department. It is an
              approach, and like any approach it is only visible in what it
              produces.
            </p>
          </Reveal>
          <Photo name="seminarRoom" ratio="4 / 3" sizes="(max-width: 900px) 100vw, 46vw" />
        </div>
      </section>

      <section className="gscale-extension section-pad">
        <div className="site-shell extension-grid">
          <Photo name="teaching" ratio="4 / 3" sizes="(max-width: 900px) 100vw, 46vw" />
          <Reveal>
            <SplitText
              as="h2"
              text="One pillar of the framework belongs to this office."
              accent="belongs to this office."
            />
            <p className="lede">
              Galgotias teaches to a student-centered framework called G-SCALE,
              set out in full in the next section. Of its four pillars, the
              fourth, industry and international exposure, is the one this
              office owns.
            </p>
            <p>
              Owning it means putting the model in front of institutions that
              teach differently. What comes back is a changed reading list, a
              redesigned module, a cohort that has been marked by strangers:
              the things a single campus cannot generate for itself.
            </p>
            <p>
              The office exists to build those encounters and to keep them
              honest.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="framework-section section-pad rule-grid" id="framework">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />The framework</span>
            <SplitText
              as="h2"
              text="G-SCALE stands for something."
              accent="stands for something."
            />
            <p className="framework-expansion">{GSCALE_FRAMEWORK.expansion}</p>
            <p className="section-lede">{GSCALE_FRAMEWORK.summary}</p>
          </Reveal>

          <Stagger className="framework-grid">
            {GSCALE_FRAMEWORK.pillars.map((pillar, index) => (
              <Spotlight as="article" className="framework-item" key={pillar.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Spotlight>
            ))}
          </Stagger>

          <Reveal className="framework-note" variant="fade">
            <p>{GSCALE_FRAMEWORK.premise}</p>
          </Reveal>
        </div>
      </section>

      <section className="priority-section section-pad" id="priorities">
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

      <section className="role-section section-pad" id="role">
        <div className="site-shell">
          <Reveal className="role-heading">
            <div>
              <span className="eyebrow"><i />Six areas of work</span>
              <h2>Our role</h2>
              <p>
                The office coordinates international academic engagement across
                six defined areas. Anything outside them belongs with another
                University office, and we will name it rather than guess on your
                behalf.
              </p>
            </div>
            <Parallax speed={0.05}>
              <CompassIllustration />
            </Parallax>
          </Reveal>
          <Stagger className="role-field">
            {OFFICE_ROLES.map((role, index) => {
              const Icon = roleIcons[index];
              return (
                <Spotlight as="article" key={role.title} className={`role-item role-item-${index + 1}`}>
                  <Icon size={25} weight="thin" aria-hidden />
                  <h3>{role.title}</h3>
                  <p>{role.text}</p>
                </Spotlight>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* The people behind the record. Portraits resolve from public/team
          when present; tiers stack while peers remain level within them. */}
      <section className="people-section section-pad" id="people">
        <div className="site-shell">
          <Reveal className="section-head">
            <span className="eyebrow"><i />The office</span>
            <h2 className="section-title">
              The people behind every global connection.
            </h2>
            <p className="section-lede">
              Leadership, staff and student collaborators working as one team
              across every partnership, program and journey on this site.
            </p>
          </Reveal>
          <Roster
            groups={TEAM_GROUPS}
            members={TEAM.map((member) => ({
              name: member.name,
              role: member.role,
              group: member.group,
              focus: "focus" in member ? member.focus : undefined,
              bio: "bio" in member ? member.bio : undefined,
              photo: getTeamPhoto(member.slug),
            }))}
          />
        </div>
      </section>

      <section className="commitment-section section-pad rule-grid">
        <div className="site-shell method-layout">
          <Reveal className="method-head">
            <span className="eyebrow"><i />How we work</span>
            <SplitText
              as="h2"
              text="Four commitments this office holds itself to."
              accent="holds itself to."
            />
            <p>
              They are the reason some sections of this website are shorter
              than you might expect.
            </p>
            <Parallax speed={0.05}>
              <DraftingIllustration />
            </Parallax>
          </Reveal>

          <Stagger className="method-list">
            {OFFICE_COMMITMENTS.map((item, index) => (
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

      <section className="glossary-section section-pad rule-grid">
        <div className="site-shell glossary-layout">
          <Reveal className="glossary-head">
            <span className="eyebrow"><i />Plain terms</span>
            <h2>The words on this site, defined.</h2>
            <p>
              Higher education runs on vocabulary that everybody uses and few
              people agree on. These are the meanings G-SCALE works to.
            </p>

            <div className="head-aside">
              <strong>Come across a term that is not here?</strong>
              <p>
                Ask. Vocabulary that needs a footnote is usually a sign the
                explanation on this site could be clearer.
              </p>
              <Link href="/contact">
                Tell the office <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </Reveal>

          <Stagger as="dl" className="glossary-list">
            {GLOSSARY.map((entry) => (
              <div className="glossary-item" key={entry.term}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* "Active relationships, not signatures" and "outcomes you can check"
          are commitments 03 and 04 above. The band below closes on the same
          measure without spending a third section on it. */}
      <PhotoBand name="cohort">
        <span className="eyebrow eyebrow-light"><i />The measure</span>
        <h2>A program is judged by what participants can do afterwards.</h2>
        <p>
          Not by how many agreements were signed, or how many photographs were
          taken. Every record published on this site names an outcome.
        </p>
      </PhotoBand>

      <section className="page-actions section-pad">
        <div className="site-shell page-actions-row">
          <h2>See what the office has actually done.</h2>
          <div>
            <Magnetic><Link href="/programs">View mobility programs <ArrowRight size={17} /></Link></Magnetic>
            <Magnetic><Link href="/partnerships">Explore partnerships <ArrowRight size={17} /></Link></Magnetic>
            <Magnetic><Link href="/contact">Contact the office <ArrowRight size={17} /></Link></Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

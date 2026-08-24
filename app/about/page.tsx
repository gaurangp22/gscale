import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, iconMap } from "@/components/icons";
import { OUR_MISSION, ROLES, WHO_WE_ARE } from "@/lib/data";

export const metadata: Metadata = {
  title: "About the International Office",
  description:
    "Meet the office that connects Galgotias University students, faculty and partners with global opportunity.",
};

export default function AboutPage() {
  const leftRoles = ROLES.slice(0, 3);
  const rightRoles = ROLES.slice(3);

  return (
    <>
      <section className="page-hero">
        <div className="site-shell page-hero-grid">
          <div className="motion-rise">
            <h1 className="hero-title">Global ambition needs a working office.</h1>
            <p className="hero-copy">
              We connect the people, paperwork and partnerships that turn an international idea into a route someone can actually take.
            </p>
            <div className="hero-actions">
              <Link href="#mandate" className="button-primary">
                See our mandate <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          <div className="about-hero-art motion-rise-delay">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/office-table.png"
              alt="International Office team planning routes around a working table"
            />
            <span className="desk-thread desk-thread-a" aria-hidden />
            <span className="desk-thread desk-thread-b" aria-hidden />
            <span className="desk-thread desk-thread-c" aria-hidden />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell essay-layout">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="essay-image" src="/campus-bg.jpg" alt="Galgotias University campus" />
          <div>
            <p className="statement-kicker">Who we are</p>
            <p className="essay-copy">{WHO_WE_ARE}</p>
            <p className="essay-copy accent">{OUR_MISSION}</p>
          </div>
        </div>
      </section>

      <section className="section-pad" id="mandate">
        <div className="site-shell">
          <header className="section-heading">
            <h2 className="section-title">Six responsibilities. One connected office.</h2>
            <p className="section-copy">
              The work spans mobility, agreements, rankings, events and the details that make arrival possible.
            </p>
          </header>
          <div className="mandate-map">
            <div className="mandate-column">
              {leftRoles.map((role) => {
                const Icon = iconMap[role.icon];
                return (
                  <article className="mandate-item" key={role.title}>
                    <Icon size={24} color="var(--crimson)" aria-hidden />
                    <strong>{role.title}</strong>
                    <p>{role.text}</p>
                  </article>
                );
              })}
            </div>
            <div className="mandate-core">The<br />Office</div>
            <div className="mandate-column">
              {rightRoles.map((role) => {
                const Icon = iconMap[role.icon];
                return (
                  <article className="mandate-item" key={role.title}>
                    <Icon size={24} color="var(--crimson)" aria-hidden />
                    <strong>{role.title}</strong>
                    <p>{role.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell day-grid">
          <div className="day-copy">
            <p className="statement-kicker">A day at the desk</p>
            <h2 className="section-title">Many moving parts. One clear route.</h2>
            <p className="section-copy">
              From a first enquiry to a visiting delegation on campus, the office keeps the journey legible.
            </p>
          </div>
          <figure className="day-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/office-table.png" alt="Programme planning at the International Office" />
            <span>09:15 / route planning</span>
          </figure>
          <figure className="day-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/summit-editorial.png" alt="International summit conversation" />
            <span>13:30 / partner conversation</span>
          </figure>
          <figure className="day-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/campus-bg.jpg" alt="Galgotias University campus" />
            <span>16:45 / campus arrival</span>
          </figure>
        </div>
      </section>
    </>
  );
}

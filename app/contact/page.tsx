import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "@/components/icons";
import { ContactStudio } from "@/components/contact-studio";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Route an international programme, partnership or student-support enquiry to the Galgotias University International Office.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="site-shell page-hero-grid">
          <div className="motion-rise">
            <h1 className="hero-title">Tell us where you want to go.</h1>
            <p className="hero-copy">
              Programme, partnership, visit or visa question. Start with your direction and we will route the details.
            </p>
            <div className="hero-actions">
              <Link href="#enquiry" className="button-primary">
                Route an enquiry <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="campus-plan-art motion-rise-delay">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/campus-plan.png" alt="Illustrated route to A Block on the Galgotias University campus" />
            <span className="map-label map-label-gate">Main gate<br />start</span>
            <span className="map-label map-label-office">A Block, 3rd floor<br />International Office</span>
          </div>
        </div>
      </section>

      <ContactStudio />

      <section className="section-pad">
        <div className="site-shell">
          <header className="section-heading">
            <h2 className="section-title">Come to the office.</h2>
            <p className="section-copy">A simple route from the campus gate to the team that can help.</p>
          </header>
          <div className="visit-route">
            <article className="visit-step">
              <strong>01 / Enter</strong>
              <p>Use the main Galgotias University entrance in Greater Noida.</p>
              <MapPin size={24} aria-hidden />
            </article>
            <article className="visit-step">
              <strong>02 / Find A Block</strong>
              <p>Follow the campus route to A Block and take the lift to the third floor.</p>
              <ArrowRight size={24} aria-hidden />
            </article>
            <article className="visit-step">
              <strong>03 / Meet us</strong>
              <p>Visit Monday to Friday, 9:00 AM to 5:00 PM IST.</p>
              <ArrowRight size={24} aria-hidden />
            </article>
          </div>
        </div>
      </section>

      <section className="forum-table section-pad">
        <div className="site-shell forum-layout">
          <header>
            <p className="statement-kicker">Direct details</p>
            <h2 className="section-title">Prefer email or phone?</h2>
          </header>
          <div className="forum-rows">
            <a className="forum-row" href={`mailto:${SITE.email}`}>
              <Mail size={22} color="var(--crimson)" aria-hidden />
              <strong>{SITE.email}</strong>
              <span>Email the office</span>
            </a>
            <a className="forum-row" href={SITE.phoneHref}>
              <Phone size={22} color="var(--crimson)" aria-hidden />
              <strong>{SITE.phone}</strong>
              <span>Call during office hours</span>
            </a>
            <div className="forum-row">
              <MapPin size={22} color="var(--crimson)" aria-hidden />
              <strong>Greater Noida, India</strong>
              <span>{SITE.address}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

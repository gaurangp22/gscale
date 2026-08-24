import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import {
  CTF_CHALLENGE,
  EDVENTURES,
  FEATURED_PROGRAMMES,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Mobility Programmes",
  description:
    "Inbound and outbound programmes connecting Galgotias University students with academic and innovation experiences worldwide.",
};

const programmes = [
  ...FEATURED_PROGRAMMES.map((programme) => ({
    ...programme,
    chips:
      programme.slug === "winter-exchange"
        ? ["Project learning", "Industry visits", "Cultural immersion"]
        : programme.slug === "ios-programme"
          ? ["Two weeks", "3 transferable credits", "Residential"]
          : programme.slug === "ntu"
            ? ["Singapore", "Scholarship route", "Short-term"]
            : ["12 to 25 July 2026", "Residential", "London visit"],
  })),
  {
    slug: "ctf-challenge",
    title: "Global Ynov Partners CTF Challenge 2026",
    kind: "Outbound" as const,
    partner: "Ynov Campus and Hack The Box",
    blurb: CTF_CHALLENGE.intro,
    chips: ["Cybersecurity", "Global leaderboard", "Three languages"],
  },
  {
    slug: "edventures",
    title: EDVENTURES.name,
    kind: "Outbound" as const,
    partner: "Hong Kong",
    blurb: EDVENTURES.intro,
    chips: ["Champion", "19 teams", "10 countries"],
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="site-shell page-hero-grid">
          <div className="motion-rise">
            <h1 className="hero-title">
              Your next classroom may be <span className="accent">8,000 km away.</span>
            </h1>
            <p className="hero-copy">
              Inbound studios in Greater Noida. Outbound programmes in Singapore,
              Cambridge and Hong Kong. Every route is built around work worth doing.
            </p>
            <div className="hero-actions">
              <Link href="#programme-ledger" className="button-primary">
                Find your route <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/contact" className="button-ghost">
                Ask the office <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          <div className="programme-hero-art motion-rise-delay">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/programme-landmarks.png"
              alt="Illustrated programme destinations in Singapore, Cambridge, Hong Kong and a global cybersecurity circuit"
            />
            <div className="passport-stamp">Issued by<br />G-SCALE<br />2026</div>
          </div>
        </div>
      </section>

      <nav className="route-switch" aria-label="Programme routes">
        <a href="#inbound">Arrive at GU</a>
        <a href="#outbound">Depart from GU</a>
      </nav>

      <section id="programme-ledger" className="programme-ledger">
        <div className="site-shell">
          {programmes.map((programme, index) => (
            <article
              className="programme-record"
              id={programme.kind === "Inbound" && index === 0 ? "inbound" : programme.kind === "Outbound" && index === 2 ? "outbound" : programme.slug}
              key={programme.slug}
            >
              <div className="programme-meta">
                <span className="programme-kind">
                  Route {String(index + 1).padStart(2, "0")} / {programme.kind}
                </span>
                <h2 className="section-title">{programme.title}</h2>
                <p className="section-copy">{programme.partner}</p>
              </div>

              <div className="programme-detail">
                <p>{programme.blurb}</p>
                <div className="detail-chips">
                  {programme.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
                <div className="hero-actions">
                  <Link href={`/contact?programme=${programme.slug}`} className="button-ghost">
                    Start an enquiry <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

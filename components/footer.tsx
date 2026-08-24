import Link from "next/link";
import { SITE } from "@/lib/data";
import { ArrowRight, Mail, MapPin, Phone } from "./icons";

const explore = [
  { label: "Mobility Programmes", href: "/programmes" },
  { label: "International Partnerships", href: "/partnerships" },
  { label: "Events & Visits", href: "/events" },
  { label: "About Us", href: "/about" },
];

const programmes = [
  { label: "Winter Exchange", href: "/programmes#winter-exchange" },
  { label: "iOS Developer Program", href: "/programmes#ios-programme" },
  { label: "NTU Singapore", href: "/programmes#ntu" },
  { label: "Cambridge Summer", href: "/programmes#cambridge" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-cta">
          <h2>
            Build a route worth <span className="accent">taking.</span>
          </h2>
          <Link href="/contact" className="button-primary">
            Enquire <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Galgotias University" />
            <p>
              Global programmes, institutional partnerships and international
              engagement at Galgotias University.
            </p>
          </div>

          <nav aria-label="Explore" className="footer-links">
            <p className="footer-label">Explore</p>
            {explore.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Programmes" className="footer-links">
            <p className="footer-label">Programmes</p>
            {programmes.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-contact">
            <p className="footer-label">Contact</p>
            <p>
              <MapPin size={15} color="var(--crimson)" aria-hidden /> {SITE.address}
            </p>
            <p>
              <a href={SITE.phoneHref}>
                <Phone size={15} color="var(--crimson)" aria-hidden /> {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`}>
                <Mail size={15} color="var(--crimson)" aria-hidden /> {SITE.email}
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}, {SITE.university}</span>
          <span>Monday to Friday, 9:00 AM to 5:00 PM IST</span>
        </div>
      </div>
    </footer>
  );
}

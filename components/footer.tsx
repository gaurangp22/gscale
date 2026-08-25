import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { CampusNight, OfficeClock } from "@/components/footer-live";
import { SITE } from "@/lib/site-content";

/* Deep links rather than a mirror of the primary nav — a footer earns its
   height by getting somebody one level further in than the header can. */
const COLUMNS = [
  {
    index: "01",
    heading: "Mobility",
    links: [
      { label: "Outbound programs", href: "/programs#outbound" },
      { label: "Inbound programs", href: "/programs#inbound" },
      { label: "The full catalog", href: "/programs#catalog" },
      { label: "Previous programs", href: "/programs#archive" },
    ],
  },
  {
    index: "02",
    heading: "Partner with us",
    links: [
      { label: "Areas of collaboration", href: "/partnerships" },
      { label: "Industry tie-ups", href: "/partnerships#start" },
      { label: "Events and delegations", href: "/events" },
      { label: "Propose an event", href: "/events#organize" },
    ],
  },
  {
    index: "03",
    heading: "The office",
    links: [
      { label: "What G-SCALE stands for", href: "/about#framework" },
      { label: "Our role", href: "/about#role" },
      { label: "The people who answer", href: "/about#people" },
      { label: "How we answer inquiries", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-mark">
              <Image src="/gscale-logo.png" width={52} height={52} alt="" />
              <span>
                <strong>G-SCALE</strong>
                <em>International Office</em>
              </span>
            </span>
            <div className="footer-contact">
              <address className="footer-address">
                <MapPin size={16} aria-hidden />{SITE.address}
              </address>
              <a href={`mailto:${SITE.email}`}>
                <EnvelopeSimple size={16} aria-hidden />{SITE.email}
              </a>
              <a href={SITE.phoneHref}><Phone size={16} aria-hidden />{SITE.phone}</a>
            </div>
            <OfficeClock />
          </div>

          {COLUMNS.map((column) => (
            <nav className="footer-links" key={column.heading} aria-label={column.heading}>
              <strong>
                <i>{column.index}</i>
                {column.heading}
              </strong>
              {column.links.map((link) => (
                <Link href={link.href} key={link.href}>{link.label}</Link>
              ))}
            </nav>
          ))}
        </div>

        {/* The campus after hours. The office window is lit only while the
            clock says the desk is manned; the rest answer your cursor. */}
        <CampusNight />

        <div className="footer-bottom">
          {/* The office belongs to the University; the parent mark signs off. */}
          <a
            href="https://www.galgotiasuniversity.edu.in"
            className="footer-parent"
            aria-label="Galgotias University"
          >
            <Image
              src="/galgotias-lockup-light.png"
              width={495}
              height={102}
              alt="Galgotias University"
            />
          </a>

          <span>Copyright © {new Date().getFullYear()} Galgotias University. All rights reserved.</span>

          <a href="#main-content" className="footer-top">
            Back to top <ArrowUp size={14} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}

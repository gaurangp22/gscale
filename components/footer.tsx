import Image from "next/image";
import {
  ArrowUp,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { CampusNight, OfficeClock } from "@/components/footer-live";
import { SITE } from "@/lib/site-content";

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

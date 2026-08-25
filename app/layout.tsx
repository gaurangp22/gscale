import type { Metadata } from "next";
import localFont from "next/font/local";
import "./site.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CursorRing, PageRail } from "@/components/chrome";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "G-SCALE International | Galgotias University",
    template: "%s | G-SCALE International",
  },
  description:
    "Explore mobility programs, academic partnerships, events and international collaboration through G-SCALE at Galgotias University.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Every entrance on this site starts hidden and is released by an
            IntersectionObserver. With no JavaScript there is no observer,
            so the page would render as a blank column of headings — this
            lands all of it in its finished state instead. */}
        <noscript>
          <style>{`
            .split-inner { transform: none; }
            .reveal, .stagger > * { opacity: 1; transform: none; }
            .photo-frame { clip-path: none; }
            .photo-media { transform: none; }
            .illus .il-draw { stroke-dashoffset: 0; }
            .illus .il-draw.il-dashed, .illus .il-fade { opacity: 1; }
            .illus .il-pop { opacity: 1; transform: none; }
            .footer-scene .fc-draw { stroke-dashoffset: 0; }
            .footer-scene .fc-fade { opacity: var(--fade-base, 1) !important; }
            .footer-scene .fc-sun { opacity: 0 !important; }
            .footer-scene .fc-win { opacity: 0.16 !important; }
          `}</style>
        </noscript>
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <PageRail />
        <main id="main-content">{children}</main>
        <Footer />
        <CursorRing />
      </body>
    </html>
  );
}

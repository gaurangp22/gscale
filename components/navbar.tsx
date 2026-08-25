"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { Magnetic, ScrollProgress } from "@/components/motion";
import { NAV } from "@/lib/site-content";

/**
 * The header carries the University; the footer carries the office. The
 * lockup is the reversed asset recolored for a paper ground, cropped to
 * the mark and wordmark — the accreditation badge is illegible at this
 * height and belongs on University-level pages, not here.
 */
export function BrandLockup() {
  return (
    <span className="brand-lockup-inner">
      <Image
        src="/galgotias-lockup.png"
        width={495}
        height={102}
        alt="Galgotias University"
        priority
      />
      <span className="brand-office">
        <strong>G-SCALE</strong>
        <span>International Office</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-nav">
        <div className="site-shell nav-inner">
          <Link
            href="/"
            className="brand-home"
            aria-label="G-SCALE International home"
            onClick={() => setOpen(false)}
          >
            <BrandLockup />
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Magnetic strength={0.24}>
              <Link href="/contact" className="nav-action">
                Explore opportunities <ArrowUpRight size={15} weight="bold" />
              </Link>
            </Magnetic>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={23} /> : <List size={23} />}
          </button>
        </div>
        <ScrollProgress />
      </header>

      <div id="mobile-navigation" className="mobile-navigation" data-open={open ? "true" : "false"}>
        <nav aria-label="Mobile navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
          <Link
            href="/contact"
            className="mobile-nav-link mobile-nav-contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Contact <ArrowUpRight size={20} />
          </Link>
        </nav>
      </div>
    </>
  );
}

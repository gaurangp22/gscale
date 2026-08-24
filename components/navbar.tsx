"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";
import { ArrowUpRight, Menu, X } from "./icons";

export const NAV_SENTINEL = "nav-dark-sentinel";

export function BrandLogo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={`brand-mark brand-mark-${tone} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Galgotias University" />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dark = pathname === "/" || pathname.startsWith("/partnerships");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-nav" data-dark={dark ? "true" : "false"}>
        <div className="site-shell nav-inner">
          <Link href="/" className="brand-lockup" aria-label="G-SCALE International Office home">
            <BrandLogo tone={dark ? "light" : "dark"} />
            <strong aria-hidden>
              International
              <br />
              Office
            </strong>
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
            <Link href="/contact" className="nav-cta">
              Enquire <ArrowUpRight size={15} weight="bold" />
            </Link>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className="mobile-panel" data-open={open ? "true" : "false"}>
        <nav aria-label="Mobile navigation">
          {[...NAV, { label: "Contact Us", href: "/contact" }].map((item) => (
            <Link key={item.href} href={item.href} className="mobile-link" tabIndex={open ? 0 : -1}>
              {item.label}
              <ArrowUpRight size={22} color="var(--crimson)" />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

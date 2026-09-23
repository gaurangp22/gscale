"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { FORM_HREF } from "./scene-programmes";

/* The film has no navbar. A lockup, the current chapter, a way in. */

const CHAPTERS: Record<string, string> = {
  dawn: "Prologue · Agra",
  arrive: "01 · Arrive & orient",
  industry: "02 · Learn with industry",
  lt: "02 · With Larsen & Toubro",
  build: "03 · Build & challenge",
  programmes: "The four programmes",
  heritage: "Beyond the studio · Agra",
  graduate: "04 · Share & graduate",
  notes: "Programme notes",
};

export function Hud() {
  const [chapter, setChapter] = useState("dawn");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter], #notes"));
    let frame = 0;
    const read = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          setChapter(n.dataset.chapter ?? n.id);
          return;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <motion.div className="hud-progress" style={{ scaleX: scrollYProgress }} aria-hidden />
      <header className="hud">
        <Link href="/" className="hud-brand" aria-label="Galgotias University — home">
          <Image src="/galgotias-lockup-light.png" width={495} height={102} alt="" priority />
        </Link>
        <Link href={FORM_HREF} className="hud-cta">
          Express interest <ArrowRight size={14} weight="bold" />
        </Link>
      </header>
      <p className="hud-chapter" aria-live="polite" data-hidden={chapter === "dawn" ? "true" : "false"}>
        {CHAPTERS[chapter] ?? ""}
      </p>
    </>
  );
}

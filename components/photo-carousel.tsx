"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Camera } from "@/components/icons";
import { cn } from "@/lib/utils";

export function PhotoCarousel({
  photos,
  label,
  tone = "dark",
  className,
}: {
  photos: string[];
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (photos.length === 0) return null;

  const light = tone === "light";

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.8, 300),
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("mt-8", className)}>
      <div
        className={cn(
          "flex items-center justify-between gap-4 border-b pb-3",
          light ? "border-white/18" : "border-ink/15"
        )}
      >
        <p
          className={cn(
            "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em]",
            light ? "text-white/55" : "text-stone"
          )}
        >
          <Camera className="h-4 w-4 text-crimson" aria-hidden />
          {photos.length} photo{photos.length === 1 ? "" : "s"} · {label}
        </p>

        <div className="flex">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollBy(direction)}
              aria-label={`${direction === -1 ? "Previous" : "Next"} ${label} photo`}
              className={cn(
                "flex h-9 w-9 items-center justify-center border transition-colors duration-300",
                direction === 1 && "-ml-px",
                light
                  ? "border-white/20 text-white/70 hover:border-crimson hover:text-crimson"
                  : "border-ink/15 text-soot hover:border-crimson hover:text-crimson"
              )}
            >
              <ArrowRight className={cn("h-4 w-4", direction === -1 && "rotate-180")} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, index) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group relative block w-[270px] shrink-0 snap-start overflow-hidden border transition-colors duration-300 sm:w-[350px]",
              light ? "border-white/12 hover:border-white/35" : "border-ink/10 hover:border-ink/30"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${label} — photo ${index + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <span
              aria-hidden
              className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center bg-crimson text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

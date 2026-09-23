import Image from "next/image";
import { PHOTOS, type PhotoKey } from "@/lib/photography";
import { cn } from "@/lib/utils";

/* ═══ Film reel ═══════════════════════════════════════════════════════════
   G-SCALE at work, running as a strip of film under the summary above it.
   The band replaced a marquee of institution names, which claimed nothing a
   reader could use — pictures of the teaching, with a caption on each frame,
   say what the section above has just described.

   Pure CSS transport: the strip is written twice and translated -50%, so the
   loop closes without measuring anything. Hover halts it; reduced motion
   leaves it still and scrollable. */

export type ReelFrame = {
  photo: PhotoKey;
  caption: string;
};

export function FilmReel({
  frames,
  label,
  className,
}: {
  frames: readonly ReelFrame[];
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("film-reel", className)}>
      <div className="site-shell film-reel-head">
        <span className="eyebrow">
          <i />
          {label}
        </span>
      </div>

      <div className="film-reel-strip">
        <div className="film-reel-track" aria-hidden>
          {[0, 1].map((copy) => (
            <div className="film-reel-group" key={copy}>
              {frames.map((frame) => {
                const photo = PHOTOS[frame.photo];
                return (
                  <figure className="film-frame" key={`${copy}-${frame.photo}`}>
                    <div className="film-frame-plate">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="340px"
                        className="film-frame-img"
                      />
                    </div>
                    <figcaption>{frame.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="split-sr">
        {label}: {frames.map((frame) => frame.caption).join("; ")}.
      </p>
    </div>
  );
}

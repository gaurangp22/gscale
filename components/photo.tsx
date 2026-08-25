"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/components/motion";
import { PHOTOS, type PhotoKey } from "@/lib/photography";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * A photograph in the site's editorial frame.
 *
 * The frame wipes open from the bottom edge as it arrives, while the image
 * inside settles out of a slight overscale — the two together read as a
 * plate being placed rather than a box fading in. On hover the image
 * creeps closer; the frame itself never moves.
 */
export function Photo({
  name,
  ratio = "4 / 3",
  className,
  priority = false,
  caption = true,
  index,
  sizes = "(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 640px",
}: {
  name: PhotoKey;
  /** CSS aspect-ratio for the frame. */
  ratio?: string;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  /** Optional editorial index printed in the corner, e.g. 1 renders "01". */
  index?: number;
  sizes?: string;
}) {
  const photo = PHOTOS[name];
  const ref = useInView<HTMLDivElement>();

  return (
    <figure className={cn("photo", className)}>
      <div
        ref={ref}
        className="photo-frame"
        data-inview="false"
        style={{ "--ratio": ratio } as Vars}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo-media"
        />
        {index !== undefined && (
          <span className="photo-index">{String(index).padStart(2, "0")}</span>
        )}
      </div>

      {caption && photo.caption && (
        <figcaption className="photo-caption">
          <span>{photo.caption}</span>
          {photo.credit && <em>{photo.credit}</em>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Two photographs offset against each other, the second riding lower. Used
 * to break up column-wide runs of body copy without leaving a hole where a
 * single wide image would sit.
 */
export function PhotoPair({
  first,
  second,
  className,
}: {
  first: PhotoKey;
  second: PhotoKey;
  className?: string;
}) {
  return (
    <div className={cn("photo-pair", className)}>
      <Photo name={first} ratio="3 / 4" caption={false} sizes="(max-width: 900px) 50vw, 320px" />
      <Photo name={second} ratio="3 / 4" caption={false} sizes="(max-width: 900px) 50vw, 320px" />
    </div>
  );
}

/** Panoramic band — a full-width plate used to close or open a section. */
export function PhotoBand({
  name,
  children,
  className,
}: {
  name: PhotoKey;
  children?: React.ReactNode;
  className?: string;
}) {
  const photo = PHOTOS[name];
  const ref = useInView<HTMLDivElement>();

  return (
    <div className={cn("photo-band", className)}>
      <div ref={ref} className="photo-band-frame" data-inview="false">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="photo-media"
        />
        <div className="photo-band-scrim" aria-hidden />
        {children && <div className="photo-band-copy">{children}</div>}
      </div>
    </div>
  );
}

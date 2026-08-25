"use client";

import { Globe } from "./globe";
import { AtlasFrame } from "./illustrations";
import { Parallax } from "@/components/motion";
import { GLOBE_ORIGIN, GLOBE_ROUTES } from "@/lib/site-content";

/**
 * The hero scene: a real coastline globe, set inside drafted atlas
 * furniture — bearing ticks, concentric guides, registration crosshairs.
 * The frame is illustration, the globe is data.
 */
export function ConnectionScene() {
  return (
    <div className="connection-scene">
      <AtlasFrame />

      <Parallax className="connection-globe" speed={0.06}>
        <Globe
          origin={GLOBE_ORIGIN}
          destinations={GLOBE_ROUTES}
          tone="dark"
        />
      </Parallax>

      <div className="connection-caption">
        <strong>Greater Noida</strong>
        <span>Documented engagement routes</span>
      </div>

      <div className="connection-legend" aria-hidden>
        <span><i /> Origin</span>
        <span><i data-route /> Route</span>
      </div>
    </div>
  );
}

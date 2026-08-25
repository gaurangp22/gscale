"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Buildings,
  GlobeHemisphereWest,
  Handshake,
  Lightbulb,
  UsersThree,
} from "@phosphor-icons/react";
import { COLLABORATION_AREAS } from "@/lib/site-content";

export function RelationshipMap() {
  return (
    <div className="relationship-map" aria-label="How G-SCALE connects learning with international experiences">
      <div className="relationship-inputs">
        <span>Mobility</span>
        <span>Collaboration</span>
        <span>Innovation</span>
        <span>Exchange</span>
      </div>
      <div className="relationship-core">
        <div>
          <BookOpenText size={25} aria-hidden />
          <strong>Student-centered learning</strong>
        </div>
        <ArrowRight size={22} aria-hidden />
        <div className="relationship-gscale">G-SCALE</div>
        <ArrowRight size={22} aria-hidden />
        <div>
          <GlobeHemisphereWest size={25} aria-hidden />
          <strong>International experiences</strong>
        </div>
      </div>
      <div className="relationship-outcomes">
        <span>Different academic contexts</span>
        <span>Cross-cultural understanding</span>
        <span>Shared institutional activity</span>
      </div>
    </div>
  );
}

const matrixIcons = [UsersThree, Handshake, BookOpenText, Lightbulb, Buildings, GlobeHemisphereWest];

export function PartnershipMatrix() {
  const [active, setActive] = useState(0);
  const selected = COLLABORATION_AREAS[active];

  return (
    <div className="partnership-matrix">
      <div className="matrix-areas" aria-label="Collaboration areas">
        {COLLABORATION_AREAS.map((area, index) => {
          const Icon = matrixIcons[index];
          return (
            <button
              type="button"
              key={area.title}
              data-active={active === index}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <Icon size={21} aria-hidden />
              <span>{area.title}</span>
            </button>
          );
        })}
      </div>

      <div className="matrix-outcome" aria-live="polite">
        <span>Shared purpose</span>
        <h2>{selected.outcome}</h2>
        <p>{selected.text}</p>
        <div className="matrix-cycle">
          <span>Purpose</span>
          <ArrowRight size={16} aria-hidden />
          <span>Activity</span>
          <ArrowRight size={16} aria-hidden />
          <span>Outcome</span>
        </div>
      </div>
    </div>
  );
}

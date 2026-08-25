"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PREVIOUS_PROGRAMS } from "@/lib/site-content";
import { Photo } from "./photo";

export function ProgramArchive() {
  const [year, setYear] = useState("All years");
  const [direction, setDirection] = useState("All directions");

  const records = useMemo(
    () => PREVIOUS_PROGRAMS.filter((program) =>
      (year === "All years" || program.year === year) &&
      (direction === "All directions" || program.direction === direction)
    ),
    [direction, year],
  );

  return (
    <div className="archive-browser">
      <div className="archive-controls">
        <label>
          Year
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option>All years</option>
            <option>2026</option>
            <option>2025</option>
          </select>
        </label>
        <label>
          Direction
          <select value={direction} onChange={(event) => setDirection(event.target.value)}>
            <option>All directions</option>
            <option>Outbound</option>
            <option>Inbound</option>
          </select>
        </label>
      </div>

      <div className="archive-records" aria-live="polite">
        {records.length ? records.map((program) => (
          <article className="archive-record" key={program.title}>
            <Photo
              name={program.direction === "Inbound" ? "developers" : "campus"}
              ratio="16 / 10"
              caption={false}
              sizes="(max-width: 900px) 100vw, 30vw"
            />
            <div>
              <span className="record-meta" data-direction={program.direction}>
                {program.year} / {program.direction}
              </span>
              <h3>{program.title}</h3>
              <p>{program.institution}</p>
              <p className="record-summary">{program.summary}</p>
              <dl>
                <div><dt>Location</dt><dd>{program.location}</dd></div>
                <div><dt>Academic focus</dt><dd>{program.focus}</dd></div>
              </dl>
              <a href="/contact">Request program information <ArrowRight size={16} /></a>
            </div>
          </article>
        )) : (
          <div className="archive-empty">No previous programs match these filters.</div>
        )}
      </div>
    </div>
  );
}

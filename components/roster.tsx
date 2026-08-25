"use client";

import Image from "next/image";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export type RosterMember = {
  name: string;
  role: string;
  /** Which tier the person belongs to in the roster index. */
  group: string;
  /** One line on the person's remit. Used until a bio is signed off. */
  focus?: string;
  /** Short biography, written for this page. Wins over focus when present. */
  bio?: string;
  /** Resolved portrait path; null falls back to the monogram plate. */
  photo?: string | null;
};

/* First and last name, not the first two words — "Mellissa Callendre
   Tawin" should read MT rather than MC. */
const initials = (name: string) => {
  const parts = name.replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
};

/* The roster is a stable dossier followed by three organizational rails.
   A person changes only when their button is clicked or keyboard-focused;
   pointer hover never steals the biography from the reader. */
export function Roster({
  members,
  groups,
  className,
}: {
  members: readonly RosterMember[];
  groups: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* The authored order is also the visual and keyboard order. */
  const ordered = groups.flatMap((group) =>
    members.filter((member) => member.group === group),
  );

  const [active, setActive] = useState(0);
  const select = useCallback((index: number) => setActive(index), []);

  /* One observer starts the portrait wipe and the top-to-bottom rail reveal. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.inview = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.inview = "true";
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!ordered.length) return null;

  const current = ordered[active];
  const progress = `${((active + 1) / ordered.length) * 100}%`;

  return (
    <div
      ref={ref}
      className={cn("team-dossier", className)}
      data-inview="false"
    >
      <article className="team-dossier-feature" aria-live="polite">
        <div className="team-dossier-media">
          {ordered.map((member, index) => (
            <div
              className="team-dossier-shot"
              data-active={index === active ? "true" : "false"}
              key={member.name}
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={index === active ? member.name : ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="team-dossier-image"
                  priority={index === 0}
                />
              ) : (
                <span className="team-dossier-monogram" aria-hidden>
                  <i>{initials(member.name)}</i>
                  <em>Portrait to follow</em>
                </span>
              )}
            </div>
          ))}
          <span className="team-dossier-wipe" key={`wipe-${active}`} aria-hidden />
        </div>

        <div
          className="team-dossier-copy"
          data-profile={current.bio ? "bio" : "focus"}
          key={current.name}
        >
          <div className="team-dossier-topline">
            <span className="team-dossier-group">{current.group}</span>
            <span className="team-dossier-count" aria-hidden>
              <strong>{String(active + 1).padStart(2, "0")}</strong>
              <i>/</i>
              <em>{String(ordered.length).padStart(2, "0")}</em>
            </span>
          </div>

          <h3>{current.name}</h3>
          <span className="team-dossier-role">{current.role}</span>
          {(current.bio ?? current.focus) && (
            <p>{current.bio ?? current.focus}</p>
          )}

          <span
            className="team-dossier-progress"
            style={{ "--progress": progress } as Vars}
            aria-hidden
          >
            <i />
          </span>
        </div>
      </article>

      <div className="team-rails" aria-label="Select a team member">
        {groups.map((group, groupIndex) => {
          const membersInGroup = ordered.filter(
            (member) => member.group === group,
          );
          if (!membersInGroup.length) return null;

          return (
            <section
              className="team-rail"
              data-count={membersInGroup.length}
              data-active={
                membersInGroup.some((member) => ordered.indexOf(member) === active)
                  ? "true"
                  : "false"
              }
              key={group}
              style={{ "--group-index": groupIndex } as Vars}
            >
              <h3 className="team-rail-label">
                <span>{group}</span>
                <CaretRightIcon size={16} weight="bold" aria-hidden />
              </h3>

              <ul>
                {membersInGroup.map((member) => {
                  const index = ordered.indexOf(member);
                  const isActive = index === active;

                  return (
                    <li key={member.name}>
                      <button
                        type="button"
                        className="team-rail-person"
                        data-active={isActive ? "true" : "false"}
                        aria-pressed={isActive}
                        onClick={() => select(index)}
                        onFocus={() => select(index)}
                      >
                        <span className="team-rail-thumb">
                          {member.photo ? (
                            <Image
                              src={member.photo}
                              alt=""
                              fill
                              sizes="76px"
                              className="team-rail-image"
                            />
                          ) : (
                            <em aria-hidden>{initials(member.name)}</em>
                          )}
                        </span>

                        <span className="team-rail-copy">
                          <span className="team-rail-name">{member.name}</span>
                          <span className="team-rail-role">{member.role}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

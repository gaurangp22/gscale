"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CaretDown, Check, MagnifyingGlass } from "@phosphor-icons/react";
import { COUNTRIES } from "./content";

/* ─────────────────────────────────────────────────────────────────────────
   Country picker.

   A searchable combobox rather than a native <select> with 195 options:
   type a few letters and the list narrows, with names that start with
   what you typed ranked first. Common alternative names find the right
   entry ("USA", "UK", "Turkey", "Ivory Coast", "Burma" …). Arrow keys
   move, Enter picks, Escape closes. Only a real country can be chosen.
   ───────────────────────────────────────────────────────────────────────── */

const ALIASES: Record<string, string> = {
  usa: "United States",
  us: "United States",
  america: "United States",
  "united states of america": "United States",
  uk: "United Kingdom",
  britain: "United Kingdom",
  "great britain": "United Kingdom",
  england: "United Kingdom",
  scotland: "United Kingdom",
  wales: "United Kingdom",
  uae: "United Arab Emirates",
  emirates: "United Arab Emirates",
  korea: "South Korea",
  "republic of korea": "South Korea",
  turkey: "Türkiye",
  "ivory coast": "Côte d’Ivoire",
  "cote d'ivoire": "Côte d’Ivoire",
  "czech republic": "Czechia",
  swaziland: "Eswatini",
  burma: "Myanmar",
  holland: "Netherlands",
  "viet nam": "Vietnam",
  drc: "Democratic Republic of the Congo",
  "dr congo": "Democratic Republic of the Congo",
  "republic of the congo": "Congo",
  "east timor": "Timor-Leste",
  macedonia: "North Macedonia",
  "cape verde": "Cabo Verde",
  persia: "Iran",
  ksa: "Saudi Arabia",
};

/** Lower-case and strip accents, so "turkiye" finds "Türkiye". */
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "'")
    .trim();

function search(q: string): string[] {
  const n = norm(q);
  if (!n) return COUNTRIES;
  const starts: string[] = [];
  const words: string[] = [];
  const contains: string[] = [];
  for (const c of COUNTRIES) {
    const cn = norm(c);
    if (cn.startsWith(n)) starts.push(c);
    else if (cn.split(/[\s-]/).some((w) => w.startsWith(n))) words.push(c);
    else if (cn.includes(n)) contains.push(c);
  }
  const alias = Object.entries(ALIASES)
    .filter(([k]) => k.startsWith(n))
    .map(([, v]) => v);
  return Array.from(new Set([...alias, ...starts, ...words, ...contains]));
}

export function CountrySelect({
  value,
  onChange,
  label = "Country",
  autoFocus,
}: {
  value: string;
  onChange: (country: string) => void;
  label?: string;
  autoFocus?: boolean;
}) {
  const id = useId();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const results = useMemo(() => search(query === value ? "" : query), [query, value]);

  const pick = (c: string) => {
    onChange(c);
    setQuery(c);
    setOpen(false);
  };

  const move = (d: number) => {
    setOpen(true);
    setActive((i) => {
      const next = Math.max(0, Math.min(results.length - 1, i + d));
      listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
      return next;
    });
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter" && open && results[active]) {
      // choose the highlighted country; the form's Enter-to-advance waits
      e.preventDefault();
      e.stopPropagation();
      pick(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="country">
      <label className="eoi-label" htmlFor={id}>
        {label}
      </label>
      <div className="country-field" data-open={open ? "true" : "false"}>
        <MagnifyingGlass size={18} aria-hidden className="country-ico" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open && results[active] ? `${id}-${active}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          data-autofocus={autoFocus ? "" : undefined}
          value={query}
          placeholder="Search for a country"
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
            if (value && e.target.value !== value) onChange("");
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKey}
        />
        <button type="button" className="country-toggle" tabIndex={-1} aria-label="Show countries" onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen((o) => !o)}>
          <CaretDown size={16} weight="bold" />
        </button>
      </div>
      {open && (
        <ul id={`${id}-list`} role="listbox" ref={listRef} className="country-list" aria-label={label}>
          {results.length === 0 && <li className="country-empty">No country matches “{query}”.</li>}
          {results.map((c, i) => (
            <li
              key={c}
              id={`${id}-${i}`}
              role="option"
              aria-selected={c === value}
              data-active={i === active ? "true" : "false"}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(c)}
            >
              <span>{c}</span>
              {c === value && <Check size={16} weight="bold" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

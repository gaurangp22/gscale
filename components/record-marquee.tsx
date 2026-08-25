import { cn } from "@/lib/utils";

/* ═══ Record marquee ══════════════════════════════════════════════════════
   Every institution named in a documented program, event or prize, set as
   two typographic rows drifting in opposite directions. This is a record,
   not a partner wall — the office holds no active institutional MoUs, so
   the band claims exactly what the archive supports: these names appear in
   the record. Pure CSS transport; hover halts both rows. */

export type RecordEntry = {
  name: string;
  context: string;
};

export function RecordMarquee({
  entries,
  className,
}: {
  entries: readonly RecordEntry[];
  className?: string;
}) {
  const half = Math.ceil(entries.length / 2);
  const rows = [entries.slice(0, half), entries.slice(half)];

  return (
    <div className={cn("record-band", className)}>
      <div className="site-shell record-head">
        <span className="eyebrow">
          <i />
          Named in the record
        </span>
        <p>
          Institutions that appear in documented programs, events and prizes.
          It is a record of where the work has already run, not a claim of
          partnership.
        </p>
      </div>

      <div className="record-rows" aria-hidden>
        {rows.map((row, index) => (
          <div
            className={cn("record-row", index === 1 && "record-row-reverse")}
            key={index}
          >
            {[0, 1].map((copy) => (
              <div className="record-group" key={copy}>
                {row.map((entry) => (
                  <span className="record-item" key={entry.name}>
                    <strong>{entry.name}</strong>
                    <small>{entry.context}</small>
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="split-sr">
        Named in the record:{" "}
        {entries.map((entry) => `${entry.name} (${entry.context})`).join("; ")}.
      </p>
    </div>
  );
}

"use client";

import { ArrowRight } from "@/components/icons";

const TASKS = [
  {
    label: "Programme enquiry",
    text: "Inbound or outbound mobility programmes for students.",
    match: (value: string) => value.includes("Programme"),
  },
  {
    label: "Partnership enquiry",
    text: "MoUs, exchanges, joint research, industry tie-ups.",
    match: (value: string) => value.includes("Partnership") || value.includes("Industry"),
  },
  {
    label: "Student support",
    text: "Visa, FRRO, arrival, accommodation, and campus support.",
    match: (value: string) => value.includes("Support"),
  },
];

/**
 * Shortcut buttons that preselect the enquiry type and move focus into
 * the form, so visitors never have to hunt through the select.
 */
export function EnquiryRouter({ options }: { options: readonly string[] }) {
  const route = (match: (value: string) => boolean) => {
    const select = document.getElementById("ct-type") as HTMLSelectElement | null;
    if (select) {
      const found = Array.from(select.options).find(
        (option) => option.value && match(option.value)
      );
      if (found) select.value = found.value;
    }

    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("ct-name")?.focus({ preventScroll: true });
  };

  return (
    <div className="row-list">
      {TASKS.map((task, index) => (
        <button
          key={task.label}
          type="button"
          onClick={() => route(task.match)}
          className="row-item group grid w-full gap-3 py-7 text-left sm:grid-cols-[auto_0.8fr_1fr_auto] sm:items-baseline sm:gap-10"
        >
          <span className="numeral">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-[22px] font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-crimson">
            {task.label}
          </span>
          <span className="text-[14.5px] leading-[1.6] text-stone">{task.text}</span>
          <ArrowRight className="h-4 w-4 self-center text-crimson transition-transform duration-500 group-hover:translate-x-1.5" />
        </button>
      ))}

      {/* Full option list stays in the DOM for no-JS and crawlers. */}
      <datalist id="enquiry-types">
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
}

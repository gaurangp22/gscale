import { cn } from "@/lib/utils";

/**
 * Continuous partner ticker. The list is duplicated once and translated
 * -50%, so the loop is seamless without measuring anything at runtime.
 */
export function Marquee({
  items,
  slow = false,
  tone = "light",
  className,
}: {
  items: readonly string[];
  slow?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const row = [...items, ...items];
  const light = tone === "light";

  return (
    <div className={cn("marquee-mask pause-on-hover overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
        aria-hidden
      >
        {row.map((item, index) => (
          <span key={index} className="flex shrink-0 items-center">
            <span
              className={cn(
                "whitespace-nowrap px-8 font-display text-lg font-medium tracking-[-0.02em] sm:px-10 sm:text-xl",
                light ? "text-white/70" : "text-ink/70"
              )}
            >
              {item}
            </span>
            <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-crimson" />
          </span>
        ))}
      </div>

      {/* Readable equivalent for assistive tech and crawlers. */}
      <span className="sr-only">
        Partners and forums: {items.join(", ")}.
      </span>
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * Text wordmark standing in for the real logo (not designed yet, see §5.1 of
 * the spec) — swap the markup here for an <img>/SVG once it exists, callers
 * don't need to change.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-0.5 font-heading font-extrabold tracking-wide",
        className,
      )}
    >
      CELSIUS
      <span className="text-primary text-[0.5em] font-bold" aria-hidden="true">
        °C
      </span>
    </span>
  );
}

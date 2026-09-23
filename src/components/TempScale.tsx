import { usePageContext } from "vike-react/usePageContext";
import { menu } from "@/content/menu";
import type { Locale } from "@/i18n/locales";

const scalePoints = ["cold-brew", "latte", "espresso"] as const;
const SCALE_MAX = 100;

/**
 * The "temperature" motif from §5.1: a thin scale between the site's three
 * reference degrees (4 °C cold brew, 65 °C latte, 93 °C espresso), each
 * pulled from the real menu data so the numbers never drift out of sync.
 */
export function TempScale() {
  const { locale } = usePageContext();
  const l = locale as Locale;
  const points = scalePoints.map((id) => menu.find((item) => item.id === id)!);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="relative h-px w-full bg-border">
        {points.map((item) => (
          <div
            key={item.id}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2"
            style={{ left: `${((item.tempC ?? 0) / SCALE_MAX) * 100}%` }}
          >
            <span className="-mt-1 h-2 w-px bg-border" aria-hidden="true" />
            <span className="font-heading text-primary text-sm font-bold">{item.tempC} °C</span>
            <span className="text-muted-foreground text-xs">{item.name[l]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

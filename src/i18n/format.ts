import type { Locale } from "./locales";
import type { Dict } from "./dictionaries/fr";

/** `Intl.NumberFormat`-based EUR price, per §7 of the spec ("6,00 € – 9,00 €"). */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
}

/** Applies the dictionary's title template ("%s · CELSIUS") to a page-specific title. */
export function formatTitle(dict: Dict, pageTitle: string): string {
  return dict.meta.titleTemplate.replace("%s", pageTitle);
}

/**
 * Formats a menu/academie item's price per §7: a range renders as
 * "6,00 € – 9,00 €", `null` as `onRequestLabel` (typically
 * `t("common.priceOnRequest")`), and `supplement: true` prefixes a single
 * value with "+" (the plant-based-milk add-on, "+0,50 €").
 */
export function formatPriceValue(
  price: number | [number, number] | null,
  locale: Locale,
  onRequestLabel: string,
  options?: { supplement?: boolean },
): string {
  if (price === null) return onRequestLabel;
  if (Array.isArray(price)) return `${formatPrice(price[0], locale)} – ${formatPrice(price[1], locale)}`;
  return (options?.supplement ? "+" : "") + formatPrice(price, locale);
}

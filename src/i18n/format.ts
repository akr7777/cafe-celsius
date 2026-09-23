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

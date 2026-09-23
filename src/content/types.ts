/** A piece of text translated into all three site locales. */
export type L10n = {
  fr: string;
  en: string;
  hy: string;
};

export type MenuTag = "vegan" | "glutenFree" | "homemade" | "decafAvailable" | "online";

export type MenuCategoryId =
  | "espresso"
  | "degustation"
  | "froid"
  | "signatures"
  | "sans-cafe"
  | "fraicheur"
  | "douceurs"
  | "sale"
  | "formules";

export type MenuItem = {
  /** kebab-case, matches the (future) image file name */
  id: string;
  category: MenuCategoryId;
  name: L10n;
  description: L10n;
  /** null = "sur devis" (see formatPriceValue) */
  price: number | [number, number] | null;
  /** e.g. "pour 2", "250 g" — shown next to the price */
  unit?: L10n;
  /** brewing/serving temperature, shown as a "93 °C"-style badge */
  tempC?: number;
  tags?: MenuTag[];
  /** true = "Café de la semaine" on the Accueil page */
  featured?: boolean;
  /** true = price is an addition ("+0,50 €"), not a standalone item price */
  supplement?: boolean;
};

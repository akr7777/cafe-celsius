import i18next, { type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { fr, type Dict } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { hy } from "./dictionaries/hy";
import { locales, localeDefault, type Locale } from "./locales";

export type { Dict, Locale };
export { locales, localeDefault, localeLabels, isLocale, stripLocaleFromPath, localizePath } from "./locales";
export { formatPrice, formatTitle } from "./format";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  hy: { translation: hy },
};

const instances = new Map<Locale, I18nInstance>();

/**
 * One i18next instance per locale, created once and reused. Each instance is
 * initialized synchronously with its resources bundled in (no backend/HTTP
 * loading), so it's ready immediately for both prerendering and hydration —
 * and since a locale's instance is never mutated after creation, it's safe
 * to share across requests on the server.
 */
export function getI18nInstance(locale: Locale): I18nInstance {
  const cached = instances.get(locale);
  if (cached) return cached;

  const instance = i18next.createInstance();
  void instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: localeDefault,
    supportedLngs: locales as unknown as string[],
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  instances.set(locale, instance);
  return instance;
}

/** Direct (typed) dictionary access, for places that need it outside a React component. */
export function getDictionary(locale: Locale): Dict {
  return resources[locale].translation;
}

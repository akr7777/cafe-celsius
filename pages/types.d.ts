import type { Locale } from "@/i18n/locales";

declare global {
  namespace Vike {
    interface PageContext {
      /** Set by +onBeforeRoute.ts from the URL's locale prefix (or the fr default, see there). */
      locale: Locale;
    }
  }
}

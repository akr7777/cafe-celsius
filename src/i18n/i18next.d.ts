import "i18next";
import type { Dict } from "./dictionaries/fr";

// Makes react-i18next's t() type-safe (autocomplete + compile error on a
// typo'd or missing key) across the whole app.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: Dict;
    };
  }
}

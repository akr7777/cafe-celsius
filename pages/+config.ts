import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages) — https://vike.dev/config
const config: Config = {
  // Fully static: every page is prerendered to HTML at build time and the
  // build is deployable to any static host, no Node server required. See
  // pages/+onBeforeRoute.ts / +onPrerenderStart.ts for how the fr/en/hy
  // locale URLs are generated, and scripts/write-root-redirect.mjs for "/".
  prerender: true,

  // Overridden per-locale by pages/+onBeforeRender.ts and, where a page needs
  // something more specific, by that page's own +data.ts.
  title: "CELSIUS",
  description: "CELSIUS — café de spécialité, Montpellier.",

  extends: [vikeReact],
};

export default config;

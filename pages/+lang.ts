import type { PageContextServer } from "vike/types";

// <html lang>, driven by the locale +onBeforeRoute.ts resolved.
export default (pageContext: PageContextServer) => pageContext.locale;

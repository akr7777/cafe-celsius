#!/usr/bin/env node
// Builds sitemap.xml (with per-URL hreflang alternates) and robots.txt from
// the already-prerendered dist/client tree, so the URL list can never drift
// from what actually got built — run after `vike build`.
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const clientDir = path.join(root, "dist/client");
const locales = ["fr", "en", "hy"];
const localeDefault = "fr";

// Same loader as server/load.ts: fills in from .env without overriding an
// already-set ambient/CI env var.
try {
  process.loadEnvFile(path.join(root, ".env"));
} catch {
  // .env is optional
}

const siteUrl = process.env.PUBLIC_ENV__SITE_URL?.replace(/\/$/, "");
if (!siteUrl) {
  console.warn("PUBLIC_ENV__SITE_URL not set — skipping sitemap.xml/robots.txt.");
  process.exit(0);
}

// route (locale-agnostic, "" for home) -> which locales actually have it prerendered
const routes = new Map();

for (const locale of locales) {
  const localeDir = path.join(clientDir, locale);
  let files;
  try {
    files = readdirSync(localeDir, { recursive: true });
  } catch {
    continue;
  }
  for (const file of files) {
    if (file !== "index.html" && !file.endsWith("/index.html")) continue;
    const route = file === "index.html" ? "" : "/" + file.slice(0, -"/index.html".length);
    if (!routes.has(route)) routes.set(route, new Set());
    routes.get(route).add(locale);
  }
}

function urlFor(locale, route) {
  return `${siteUrl}/${locale}${route}/`;
}

const urlEntries = [];
for (const [route, localesHere] of [...routes.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  for (const locale of locales) {
    if (!localesHere.has(locale)) continue;
    const alternates = locales
      .filter((l) => localesHere.has(l))
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, route)}" />`)
      .join("\n");
    const xDefault = localesHere.has(localeDefault)
      ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(localeDefault, route)}" />\n`
      : "";
    urlEntries.push(`  <url>\n    <loc>${urlFor(locale, route)}</loc>\n${alternates}\n${xDefault}  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>
`;

writeFileSync(path.join(clientDir, "sitemap.xml"), sitemap, "utf8");
console.log(`wrote dist/client/sitemap.xml (${urlEntries.length} URLs)`);

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
writeFileSync(path.join(clientDir, "robots.txt"), robots, "utf8");
console.log("wrote dist/client/robots.txt");

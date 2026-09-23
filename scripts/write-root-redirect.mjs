#!/usr/bin/env node
// §4 of the spec: "/" itself carries no locale and is never one of the
// prerendered pages (see pages/+onPrerenderStart.ts) — no browser-language
// detection, just a static meta-refresh to /fr/. Runs after `vike build`.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../dist/client", import.meta.url));

const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=/fr/" />
    <link rel="canonical" href="/fr/" />
    <title>CELSIUS</title>
  </head>
  <body>
    <p><a href="/fr/">CELSIUS — Continuer / Continue / Շարունակել</a></p>
  </body>
</html>
`;

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "index.html"), html, "utf8");
console.log("wrote dist/client/index.html (static redirect to /fr/)");

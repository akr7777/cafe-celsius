#!/usr/bin/env node
// One-off generator for the favicon PNGs and the OG/Twitter share image (§11
// of the spec) from their SVG sources. Not part of `pnpm build` — run by
// hand (`pnpm generate:images`) whenever a source SVG changes; the PNGs it
// writes to public/ are committed like any other static asset.
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = path.join(root, "public");

async function renderSvg(svgPath, outPath, size) {
  const svg = await readFile(svgPath);
  await sharp(svg, { density: 384 })
    .resize(Array.isArray(size) ? size[0] : size, Array.isArray(size) ? size[1] : size)
    .png()
    .toFile(outPath);
  console.log(`wrote ${path.relative(root, outPath)}`);
}

const faviconSvg = path.join(publicDir, "favicon.svg");
await renderSvg(faviconSvg, path.join(publicDir, "favicon-32.png"), 32);
await renderSvg(faviconSvg, path.join(publicDir, "apple-touch-icon.png"), 180);
await renderSvg(faviconSvg, path.join(publicDir, "favicon-512.png"), 512);

const ogSvg = path.join(root, "scripts/assets/og-image.svg");
await renderSvg(ogSvg, path.join(publicDir, "og-image.png"), [1200, 630]);

// Sanity check: og:image should stay well under the ~5MB most crawlers accept.
const { size: ogBytes } = await stat(path.join(publicDir, "og-image.png"));
if (ogBytes > 1_000_000) {
  console.warn(`og-image.png is ${(ogBytes / 1024).toFixed(0)} KB — consider re-checking compression.`);
}

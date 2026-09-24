#!/usr/bin/env node
// AI generators (Gemini included) sometimes save an image as JPEG/PNG bytes
// under a .webp filename regardless of what was asked for. This walks
// public/images/{menu,pages}/*.webp, and re-encodes to real WebP in place
// (same filename) whenever the file's magic bytes don't say "WEBP" — so
// what's served always matches its extension. Run by hand
// (`pnpm normalize:images`) after dropping in new images; not part of
// `pnpm build`.
import { readdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const dirs = ["public/images/menu", "public/images/pages"];

function isRealWebp(buf) {
  return (
    buf.length >= 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP"
  );
}

let checked = 0;
let fixed = 0;

for (const dir of dirs) {
  const full = path.join(root, dir);
  let files;
  try {
    files = readdirSync(full).filter((f) => f.endsWith(".webp"));
  } catch {
    continue;
  }
  for (const file of files) {
    checked++;
    const filePath = path.join(full, file);
    const buf = readFileSync(filePath);
    if (isRealWebp(buf)) continue;

    const before = buf.length;
    const image = sharp(buf);
    const meta = await image.metadata();
    // Cap at the spec's recommended max for menu photos; never upscale.
    const resized = meta.width && meta.width > 1600 ? image.resize({ width: 1600 }) : image;
    const out = await resized.webp({ quality: 82 }).toBuffer();
    await writeFile(filePath, out);
    fixed++;
    console.log(
      `${path.join(dir, file)}: ${meta.format} ${(before / 1024).toFixed(0)} KB -> webp ${(out.length / 1024).toFixed(0)} KB`,
    );
  }
}

console.log(`\nChecked ${checked} file(s), re-encoded ${fixed}.`);

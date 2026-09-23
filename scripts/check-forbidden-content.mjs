#!/usr/bin/env node
// Grep-based compliance check for the content rules that must never slip
// into the site (contacts, "already open" phrasing, the founder's cities/
// countries, competitor brand names, reviews/awards claims). Scans both the
// source tree and, if present, the built dist/client output. Exits non-zero
// on any hit so it can be wired into CI later.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const patterns = [
  { name: "founder's cities/countries", re: /moscow|moscou|москв|россия|russia|russian/i },
  { name: "competitor brand names", re: /la marzocco|marzocco|pierre herm[eé]|\bkawa\b|oatly/i },
  {
    name: '"already open" phrasing',
    re: /d[ée]j[àa] ouvert|nous sommes ouverts|already open|now open|we('|’)re open|currently open/i,
  },
  { name: "phone numbers", re: /\+33[\s.\d]{8,}|t[ée]l[ée]?phone\s*:/i },
  { name: "street address", re: /\b\d{1,4}\s+(rue|avenue|boulevard|place)\s/i },
  { name: "reviews/ratings/awards claims", re: /\bavis client|note moyenne|award-winning|prix re[cç]u\b/i },
];

const scanDirs = ["src", "pages", "docs", "README.md", "CLAUDE.md"].filter((p) =>
  existsSync(path.join(root, p)),
);
if (existsSync(path.join(root, "dist/client"))) scanDirs.push("dist/client");

const textExtensions = new Set([".ts", ".tsx", ".md", ".css", ".html", ".json", ".txt", ".xml"]);
const skipDirs = new Set(["node_modules", ".git"]);

function walk(dir, files = []) {
  const st = statSync(dir);
  if (st.isFile()) {
    files.push(dir);
    return files;
  }
  for (const entry of readdirSync(dir)) {
    if (skipDirs.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (textExtensions.has(path.extname(entry))) files.push(full);
  }
  return files;
}

let hits = 0;
for (const dir of scanDirs) {
  for (const file of walk(path.join(root, dir))) {
    const content = readFileSync(file, "utf8");
    for (const { name, re } of patterns) {
      const match = content.match(re);
      if (match) {
        hits++;
        console.error(`✗ ${name}: "${match[0]}" in ${path.relative(root, file)}`);
      }
    }
  }
}

if (hits === 0) {
  console.log(`✓ no forbidden content found (scanned ${scanDirs.join(", ")})`);
} else {
  console.error(`\n${hits} match(es) found — see §2 of the spec.`);
  process.exit(1);
}

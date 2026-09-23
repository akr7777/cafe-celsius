#!/usr/bin/env node
// Regenerates docs/image-prompts.md from the actual content files, so the
// prompt list can never drift out of sync with the real ids/names (§8). Not
// part of `pnpm build` — run by hand (`pnpm generate:image-prompts`)
// whenever menu.ts/academie.ts/boutique.ts changes.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { menu } from "../src/content/menu.ts";
import { academiePrograms } from "../src/content/academie.ts";
import { boutiqueItems } from "../src/content/boutique.ts";

const root = fileURLToPath(new URL("..", import.meta.url));

const STYLE =
  "studio food photography, soft natural daylight, cream background (#FAF7F2) with subtle blue accents (#0B2FA6), minimal ceramic tableware, 3/4 angle, 4:3 aspect ratio, shallow depth of field, no text, no logos";
const STYLE_PRODUCT =
  "studio product photography, soft natural daylight, cream background (#FAF7F2) with subtle blue accents (#0B2FA6), 3/4 angle, 4:3 aspect ratio, no text, no logos";

const foodHint = {
  espresso: "served in a plain ceramic espresso cup",
  degustation: "served in specialty pour-over/brewing glassware appropriate to the method",
  froid: "served in a clear glass with ice",
  signatures: "served in branded-neutral glassware",
  "sans-cafe": "served in a plain ceramic cup",
  fraicheur: "served in a clear glass",
  douceurs: "plated on a small ceramic plate",
  sale: "plated on a ceramic plate",
  formules: "plated as a small full spread on ceramic tableware",
};

function menuPrompt(item) {
  const hint = foodHint[item.category] ?? "plated simply";
  return `${item.name.en} — ${item.description.en} ${hint}. ${STYLE}.`;
}

function academiePrompt(program) {
  return `Flat-lay of specialty coffee brewing equipment for "${program.name.en}" (${program.description.en}). ${STYLE_PRODUCT}.`;
}

function boutiquePrompt(item) {
  return `${item.name.en} — ${item.description.en} ${STYLE_PRODUCT}.`;
}

const pageShots = [
  {
    slot: "hero",
    prompt:
      "Wide editorial shot of a minimalist specialty coffee bar counter, cream tones with a single deep blue accent, soft daylight, a barista's hands mid-pour out of focus in the background, no people's faces, no text, no logos, 16:9.",
  },
  {
    slot: "interior",
    prompt:
      "Interior of a minimalist specialty coffee shop, cream walls, blue accent details, warm wood and ceramics, large windows with soft daylight, no people, no text, no logos, 4:3.",
  },
  {
    slot: "bresil",
    prompt:
      "Green coffee beans and a small burlap sample bag evoking Brazil, warm natural light, cream background with a subtle blue accent, 3/4 angle, 4:3, no text, no logos.",
  },
  {
    slot: "ethiopie",
    prompt:
      "Green coffee beans with dried coffee cherries evoking Ethiopia, warm natural light, cream background with a subtle blue accent, 3/4 angle, 4:3, no text, no logos.",
  },
  {
    slot: "vietnam",
    prompt:
      "Green robusta coffee beans with a traditional phin filter evoking Vietnam, warm natural light, cream background with a subtle blue accent, 3/4 angle, 4:3, no text, no logos.",
  },
  {
    slot: "portrait-placeholder",
    prompt:
      "Neutral studio portrait placeholder: a softly lit empty chair and small table with a coffee cup, no person, cream background with a subtle blue accent, 3:4, no text, no logos.",
  },
];

const lines = [];
lines.push("# Prompts d'images (génération IA)");
lines.push("");
lines.push(
  "Générés depuis `src/content/{menu,academie,boutique}.ts` par `pnpm generate:image-prompts` — ne pas éditer les sections tableau à la main, régénérer à la place. Style commun : photographie studio, lumière de jour douce, fond crème (#FAF7F2) avec accents bleus (#0B2FA6) et céramique, cadrage 3/4, ratio 4:3 sauf mention contraire, jamais de texte ni de logo dans l'image.",
);
lines.push("");
lines.push(
  "Une fois une image générée, l'enregistrer en WebP, 1600×1200 pour les visuels de carte/menu, ≤ 250 Ko, sous `public/images/menu/{id}.webp` ou `public/images/pages/{id}.webp` selon la colonne ci-dessous — `<ProductImage>` (`src/components/ProductImage.tsx`) la détecte automatiquement, aucune autre modification n'est nécessaire.",
);
lines.push("");

lines.push("## La Carte — public/images/menu/");
lines.push("");
lines.push("| id | Prompt |");
lines.push("|---|---|");
for (const item of menu) {
  lines.push(`| \`${item.id}\` | ${menuPrompt(item)} |`);
}
lines.push("");

lines.push("## L'Académie — public/images/pages/");
lines.push("");
lines.push("| id | Prompt |");
lines.push("|---|---|");
for (const program of academiePrograms) {
  lines.push(`| \`${program.id}\` | ${academiePrompt(program)} |`);
}
lines.push("");

lines.push("## Boutique — public/images/menu/");
lines.push("");
lines.push("| id | Prompt |");
lines.push("|---|---|");
for (const item of boutiqueItems) {
  lines.push(`| \`${item.id}\` | ${boutiquePrompt(item)} |`);
}
lines.push("");

lines.push("## Pages — public/images/pages/");
lines.push("");
lines.push("| id | Prompt |");
lines.push("|---|---|");
for (const shot of pageShots) {
  lines.push(`| \`${shot.slot}\` | ${shot.prompt} |`);
}
lines.push("");

await writeFile(path.join(root, "docs/image-prompts.md"), lines.join("\n") + "\n", "utf8");
console.log(
  `wrote docs/image-prompts.md (${menu.length + academiePrograms.length + boutiqueItems.length + pageShots.length} prompts)`,
);

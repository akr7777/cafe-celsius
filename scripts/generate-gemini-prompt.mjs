#!/usr/bin/env node
// Generates docs/gemini-image-prompt.md — a single, self-contained prompt
// (style guide + full numbered manifest) meant to be pasted into Gemini /
// Google AI Studio to produce every visual the site needs, image by image,
// in one consistent style. Built from the real content files so it can
// never list an id that doesn't exist — run by hand
// (`pnpm generate:gemini-prompt`) whenever menu.ts/academie.ts/boutique.ts
// changes; not part of `pnpm build`.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { menu } from "../src/content/menu.ts";
import { academiePrograms } from "../src/content/academie.ts";
import { boutiqueItems } from "../src/content/boutique.ts";

const root = fileURLToPath(new URL("..", import.meta.url));

const foodHint = {
  espresso: "in a plain ceramic espresso cup",
  degustation: "in specialty pour-over/brewing glassware suited to the method",
  froid: "in a clear glass with ice",
  signatures: "in neutral branded-style glassware",
  "sans-cafe": "in a plain ceramic cup",
  fraicheur: "in a clear glass",
  douceurs: "plated on a small ceramic plate",
  sale: "plated on a ceramic plate",
  formules: "plated as a small full spread on ceramic tableware",
};

function menuLine(item) {
  const hint = foodHint[item.category] ?? "plated simply";
  return `public/images/menu/${item.id}.webp — ${item.name.en}: ${item.description.en} Shown ${hint}.`;
}

function academieLine(program) {
  return `public/images/pages/${program.id}.webp — Flat-lay of brewing equipment for "${program.name.en}": ${program.description.en}`;
}

function boutiqueLine(item) {
  return `public/images/menu/${item.id}.webp — ${item.name.en}: ${item.description.en}`;
}

const pageShots = [
  {
    file: "public/images/pages/hero.webp",
    ratio: "16:9",
    text: "Wide editorial shot of a minimalist specialty coffee bar counter, a barista's hands mid-pour out of focus in the background, no visible faces.",
  },
  {
    file: "public/images/pages/interior.webp",
    ratio: "4:3",
    text: "Interior of a minimalist specialty coffee shop, warm wood and ceramics, large windows, no people.",
  },
  {
    file: "public/images/pages/bresil.webp",
    ratio: "4:3",
    text: "Green coffee beans with a small burlap sample bag, evoking Brazil.",
  },
  {
    file: "public/images/pages/ethiopie.webp",
    ratio: "4:3",
    text: "Green coffee beans with dried coffee cherries, evoking Ethiopia.",
  },
  {
    file: "public/images/pages/vietnam.webp",
    ratio: "4:3",
    text: "Green robusta beans with a traditional phin filter, evoking Vietnam.",
  },
  {
    file: "public/images/pages/portrait-placeholder.webp",
    ratio: "3:4",
    text: "Neutral placeholder: a softly lit empty chair and small table with a coffee cup, no person.",
  },
];

let n = 0;
const lines = [];
lines.push("# Prompt Gemini — génération des visuels CELSIUS");
lines.push("");
lines.push(
  "Généré depuis `src/content/{menu,academie,boutique}.ts` par `pnpm generate:gemini-prompt` — ne pas éditer la liste numérotée à la main, régénérer à la place.",
);
lines.push("");
lines.push(
  "Un seul prompt ci-dessous, à coller tel quel dans Gemini (app Gemini, ou Google AI Studio avec un modèle de génération d'image type Gemini 2.5 Flash Image). Il décrit le style commun une fois, puis liste chacune des images à produire.",
);
lines.push("");
lines.push(
  "⚠️ **En pratique, Gemini ne renvoie souvent qu'une poignée d'images par réponse**, pas les 72 d'un coup. Si la réponse s'arrête en cours de liste, renvoyer simplement *« continue »* / *« suite »* pour obtenir les images suivantes, ou reprendre une seule ligne numérotée à la fois dans un nouveau message — le prompt reste valable à l'unité. Chaque image générée s'enregistre en WebP, ≤ 250 Ko, sous le chemin indiqué en tête de ligne (1600×1200 pour le format 4:3) ; `<ProductImage>` (`src/components/ProductImage.tsx`) la détecte automatiquement, aucune autre modification n'est nécessaire.",
);
lines.push("");
lines.push("## Prompt à copier");
lines.push("");
lines.push("````text");
lines.push(
  "You are generating the complete, consistent set of photographs for CELSIUS, a specialty coffee shop. Generate ONE separate, standalone image for EACH numbered item below — never combine several items into one collage/grid image.",
);
lines.push("");
lines.push("SHARED VISUAL STYLE — apply identically to every single image:");
lines.push(
  "- Studio food/product photography, soft natural daylight, photorealistic (no illustration, no 3D render, no cartoon style)",
);
lines.push("- Cream background, hex #FAF7F2, with subtle deep-blue accents, hex #0B2FA6");
lines.push(
  "- Minimal plain ceramic tableware and natural materials, no clutter, no props with visible brand logos",
);
lines.push("- 3/4 camera angle, shallow depth of field, unless another angle is noted for a specific item");
lines.push("- Aspect ratio 4:3 unless noted otherwise next to an item");
lines.push("- Absolutely no text, no typography, no logos, no watermarks anywhere in the image");
lines.push("");
lines.push(
  `Generate all ${menu.length + academiePrograms.length + boutiqueItems.length + pageShots.length} images below, in order, one per number:`,
);
lines.push("");

lines.push("— La Carte —");
for (const item of menu) {
  n++;
  lines.push(`${n}. ${menuLine(item)}`);
}
lines.push("");
lines.push("— L'Académie —");
for (const program of academiePrograms) {
  n++;
  lines.push(`${n}. ${academieLine(program)}`);
}
lines.push("");
lines.push("— Boutique —");
for (const item of boutiqueItems) {
  n++;
  lines.push(`${n}. ${boutiqueLine(item)}`);
}
lines.push("");
lines.push("— Pages —");
for (const shot of pageShots) {
  n++;
  lines.push(`${n}. ${shot.file} (aspect ratio ${shot.ratio}) — ${shot.text}`);
}
lines.push("````");
lines.push("");

await writeFile(path.join(root, "docs/gemini-image-prompt.md"), lines.join("\n") + "\n", "utf8");
console.log(`wrote docs/gemini-image-prompt.md (${n} images listed)`);

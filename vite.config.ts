import { readdirSync } from "node:fs";
import vike from "vike/plugin";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Exposes which public/images/{menu,pages}/*.webp files actually exist, as a
 * virtual module consumed by <ProductImage> (see §8 of the spec) — so it can
 * fall back to a placeholder for an id that has no image yet, with no
 * runtime request ever issued for a file that isn't there.
 *
 * A plain `import.meta.glob` can't do this: pointed at public/, Vite treats
 * matches as regular module assets (subject to its normal inlining/hashing),
 * which both defeats the point of public/ (a stable, unprocessed URL) and
 * risks silently duplicating the file. Reading the directory directly avoids
 * that entirely — this only ever produces a list of ids, never touches the
 * files' contents.
 */
function publicImagesManifest(): Plugin {
  const virtualId = "virtual:public-images";
  const resolvedId = "\0" + virtualId;

  function listWebpIds(dir: string): string[] {
    try {
      return readdirSync(new URL(dir, import.meta.url))
        .filter((file) => file.endsWith(".webp"))
        .map((file) => file.slice(0, -".webp".length));
    } catch {
      return [];
    }
  }

  return {
    name: "celsius:public-images-manifest",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const menu = listWebpIds("./public/images/menu");
      const pages = listWebpIds("./public/images/pages");
      return `export const menu = new Set(${JSON.stringify(menu)});\nexport const pages = new Set(${JSON.stringify(pages)});\n`;
    },
  };
}

export default defineConfig({
  plugins: [vike(), react(), tailwindcss(), publicImagesManifest()],
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A brochure/showcase website for a not-yet-opened business (concept, menu, a training programme, a small shop, and a founder bio page). It ships as a fully static, prerendered multilingual (fr/en/hy) site — no backend at runtime.

Content rules that shape a lot of the code (menu data, forms, footer, About page) live in a private spec kept outside the repo (`--spec--/`, gitignored) — ask before assuming a missing piece of copy or a business detail.

## Commands

- `pnpm dev` — dev server (Vite HMR)
- `pnpm build` — `vike build` (prerenders every page in all 3 locales to `dist/client/`) **then** `node scripts/write-root-redirect.mjs`, which writes a plain static `dist/client/index.html` (meta-refresh to `/fr/`) — see below for why that's a separate step
- `pnpm preview` — build, then serve the build through Vike's own server (`vike preview`). This is **not** representative of the real static host: it re-runs the routing/trailing-slash logic below, which a plain static file server does not do. To check how the site will actually behave once deployed, serve `dist/client` with a bare static server (e.g. `python3 -m http.server` from that directory) instead.
- `pnpm lint` / `pnpm typecheck` / `pnpm format` (`format:check` for CI-style checking, no write)
- `pnpm shadcn add <component>` — add a shadcn/ui component (already configured for `new-york` style, see `components.json`)
- `pnpm generate:images` — regenerate the favicon PNGs and `public/og-image.png` from their SVG sources (`public/favicon.svg`, `scripts/assets/og-image.svg`); run by hand after editing a source, not part of `pnpm build`
- `pnpm generate:image-prompts` — regenerate `docs/image-prompts.md` from `src/content/{menu,academie,boutique}.ts`, same "run by hand" deal
- `pnpm prisma:generate` / `pnpm prisma:studio` — present for a future backend, unused by the site itself (see below)

No test framework is configured yet.

## Architecture

**Vike (SSR-capable meta-framework on Vite) + vike-react, but run as pure SSG.** `pages/+config.ts` sets `prerender: true`; the whole site is generated once at build time into static HTML and shipped as files, deployable to any static host (host not chosen yet).

**Everything reusable lives in `src/`** (`components/`, `content/`, `i18n/`, `lib/`, `styles/`), imported via the `@/*` alias (→ `./src/*`, set in both `vite.config.ts` and `tsconfig.json`). `pages/` holds only routes and Vike's `+`-files.

### i18n routing (fr default / en / hy)

This is the part most likely to surprise you, spread across a few files that need to be read together:

- `pages/+onBeforeRoute.ts` + `src/i18n/extractLocale.ts`: strip the locale segment (`/fr/carte` → locale `fr`, route matched against `/carte`) using `vike/modifyUrl`. A URL with no recognized locale prefix defaults to `fr` — that only happens in `vike dev`; see next point.
- `pages/+onPrerenderStart.ts`: triples **every** discovered route into `/fr/...`, `/en/...`, `/hy/...` — unlike Vike's own i18n example, the default locale (`fr`) is prefixed too, on purpose. So a bare `/` is never one of the prerendered pages.
- `scripts/write-root-redirect.mjs`: writes the actual `dist/client/index.html` for bare `/` by hand, after the build — a static meta-refresh to `/fr/`, no JS language detection. This is why `pnpm build` has two steps instead of one.
- **Every internal URL has a trailing slash** (`/fr/carte/`, not `/fr/carte`) via `localizePath()` in `src/i18n/locales.ts`, used by `<Link>`, `<LanguageSwitcher>`, and the hreflang tags in `pages/+Head.tsx`. This matches the prerendered output shape (`dist/client/fr/carte/index.html`) and is what lets a plain static file server resolve the URL without "clean URL" support. Don't build hrefs by hand — use `localizePath`/`<Link>` or a same-locale link will end up one slash off from what actually got built.
- `pageContext.urlOriginal` is what's reliable inside components for "the current URL" — `pageContext.urlPathname` is computed once before `onPrerenderStart` runs and goes stale for the locale-tripled pages (this bit us once; don't reintroduce it).
- Translation strings: `src/i18n/dictionaries/{fr,en,hy}.ts`, wired through `react-i18next` (one `i18next` instance per locale, cached in `src/i18n/index.ts`, provided via `<I18nextProvider>` in `pages/+Layout.tsx`). `fr.ts` is the source of truth — `type Dict = typeof fr` (no `as const`, or every translation would need the exact same string as French) makes a missing or extra key in `en.ts`/`hy.ts` a compile error. `src/i18n/i18next.d.ts` gives `useTranslation()`'s `t()` the same compile-time key checking. `hy.ts` is machine-translated; it's flagged with a `TODO: вычитка носителем языка` comment at the top pending native-speaker review — don't remove that comment when editing the file.
- Menu/academie/boutique content data carries its own `{ fr, en, hy }` per field (`L10n` in `src/content/types.ts`) rather than going through the UI-string dictionaries — see `src/content/{menu,academie,boutique}.ts`. Adding an item there needs no dict change; adding new _interface_ copy does, in all three dictionary files at once (the `Dict` type check forces this).

### Content & forms

- `src/content/menu.ts` (`menu`, `menuCategories`), `academie.ts` (`academiePrograms`), `boutique.ts` (`boutiqueItems`) hold every priced item on the site — the single source `/carte`, `/academie` and `/boutique` render from. `formatPriceValue()`/`formatPrice()` (`src/i18n/format.ts`) are the only place price formatting happens (`Intl.NumberFormat`, a `[min, max]` tuple renders as a range, `null` as an on-request/coming-soon label the caller passes in, `supplement: true` prefixes a lone value with "+").
- `<ProductImage>` (`src/components/ProductImage.tsx`) is the one place that decides photo vs. placeholder icon. It does **not** use `import.meta.glob` on `public/` — that was tried and quietly breaks (Vite inlines/duplicates the asset instead of giving back the stable public URL). Instead, a small Vite plugin in `vite.config.ts` (`publicImagesManifest`) reads `public/images/{menu,pages}/` at build/dev-server start and exposes the id list as the `virtual:public-images` module; `<ProductImage>` only ever checks membership in that set; the actual `<img src>` is always the plain, predictable `/images/{bucket}/{id}.webp`.
- Every form (`NewsletterForm`, `ContactForm`, `AcademieSubscribeDialog`) is react-hook-form + zod (`@hookform/resolvers/zod`) + shadcn `Form`, and submits through `src/lib/forms.ts`'s `submitForm()` — the one stub to eventually point at a real API (`TODO(backend)` comment marks the spot). Success shows a `sonner` toast (`t("forms.toastSuccess")`); nothing is persisted or sent anywhere yet.
- A `t()` call with a key built at runtime (e.g. per menu category) needs an explicit `Record<..., "some.dict.key">` (`as const satisfies Record<...>`) next to its usage — a plain `string`-returning helper (like a naive `camelCase()`) breaks react-i18next's typed keys (`src/i18n/i18next.d.ts`) with a real type error, which is by design; don't work around it by casting to `any`.

### Design tokens

`src/styles/theme.css` is the **only** file allowed to hardcode color values — every component must reference a token (`bg-primary`, `text-muted-foreground`, …). Dark mode has no manual toggle; it's driven purely by `prefers-color-scheme` (the same token values are duplicated under a media query and under `.dark`, the latter kept only so a manual toggle could be wired up later without touching values). Fonts are self-hosted via `@fontsource/*` (`src/styles/fonts.css`): Latin faces (Montserrat/Inter) plus Noto Sans Armenian loaded **only for its Armenian subset**, as a `unicode-range`-scoped fallback in the font stack — Latin locales never download it.

### shadcn/ui

Generated components live in `src/components/ui/`. This shadcn CLI generation imports `cn` from a package literally named `cn` by default — that import gets swapped to `@/lib/utils` by hand after `pnpm shadcn add`, to keep one class-merging implementation instead of two. Do the same after adding a new component. `sonner.tsx` was also hand-edited to drop the `next-themes` dependency it's normally generated with (unused: no theme toggle here, see above) — reapply that trim if `add` regenerates it.

### Accessibility

Card/item titles in `MenuItemCard` and on `/academie` and `/boutique` are deliberately `<p>`, not `<h3>` — those pages have no intervening `<h2>` between the page `<h1>` and the card grid, so making each of the (up to 55) item names a heading would skip a level and turn the outline into heading-soup. If you add a real `<h2>` section heading above a grid, it's fine to promote its cards back to `<h3>`.

### SEO

- `src/i18n/pageMeta.ts` (`getPageMeta(pathWithoutLocale, dict)`) is the single source for a page's `<title>`/description, keyed off `dict.meta.pages`. Both a page's own `+data.ts` (sets the real `<title>`/`<meta description>` via `useConfig()`) and `pages/+Head.tsx` (OG/Twitter tags) call it, so they can never disagree. **Each page needs its own `+data.ts`** calling this — there's no shared/global one: an earlier version had a root `+onBeforeRender.ts` that set a site-wide default for every page, and because it ran _after_ each page's own hook it silently clobbered every per-page title back to the default. Removed; don't recreate that pattern.
- `scripts/write-sitemap.mjs` builds `dist/client/sitemap.xml` (with hreflang alternates) and `robots.txt` by walking the **already-prerendered** `dist/client/` tree (excluding `404.html`), not from a hand-maintained route list — it runs after `vike build` as part of `pnpm build`, so the URL list can't drift from what was actually built.
- JSON-LD is `Organization` only (name + url) — no `CafeOrCoffeeShop`, since there's no address yet (§11 of the spec).

### Backend (not wired up, deliberately kept ready)

`+server.ts`, `server/load.ts`, Express, Prisma and `docker-compose.yml`/`Dockerfile` (Postgres) are present but idle — the site itself needs none of them, since it's fully static. They're kept so a real API (NestJS + Prisma + PostgreSQL is the plan) can be added later without a re-scaffold. `+server.ts`'s middleware array is currently empty; that's where a future API's Universal Middleware handlers would be registered.

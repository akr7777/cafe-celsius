# CELSIUS

Site vitrine de CELSIUS, café de spécialité à Paris (ouverture prochaine) : concept, carte, académie du café et boutique, en français, anglais et arménien.

Le site est **entièrement statique** : à la compilation, chaque page est générée à l'avance dans les trois langues (`dist/client/fr/…`, `/en/…`, `/hy/…`) et le résultat se déploie sur n'importe quel hébergeur de fichiers statiques — aucun serveur n'est nécessaire pour le servir.

## Démarrage

```sh
pnpm install
cp .env.example .env   # à ajuster, voir ci-dessous
pnpm dev                # http://localhost:3000/fr/, /en/, /hy/
```

```sh
pnpm build               # génère dist/client (site statique)
pnpm preview              # build, puis sert dist/client via le serveur Vike
```

`pnpm preview` passe par le serveur Vike, ce qui n'est **pas** représentatif d'un hébergement statique réel (voir la note dans `CLAUDE.md`). Pour vérifier le rendu final tel qu'il sera vraiment servi, lancer un serveur statique basique sur `dist/client`, par exemple :

```sh
cd dist/client && python3 -m http.server 8080
```

### Variables d'environnement

Voir `.env.example`. `PUBLIC_ENV__SITE_URL` est l'adresse absolue du site (sans slash final) : elle sert à générer le `sitemap.xml`, les balises `canonical`/`hreflang`/Open Graph à la compilation. Le domaine n'est pas encore choisi — la valeur par défaut est un placeholder à remplacer avant la mise en ligne.

## Où changer quoi

| Besoin                                                              | Fichier(s)                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Couleurs, thème clair/sombre                                        | `src/styles/theme.css` — seul fichier où une couleur peut être écrite en dur ; tout le reste du code référence les tokens (`bg-primary`, `text-muted-foreground`, …)                                                                                                     |
| Polices                                                             | `src/styles/fonts.css`                                                                                                                                                                                                                                                   |
| Carte, académie, boutique (prix, descriptions, tags)                | `src/content/menu.ts`, `src/content/academie.ts`, `src/content/boutique.ts` — chaque texte a ses trois traductions `{ fr, en, hy }` directement dans l'objet                                                                                                             |
| Textes d'interface (nav, boutons, formulaires, pages légales, etc.) | `src/i18n/dictionaries/{fr,en,hy}.ts` — `fr.ts` fait foi ; le typage (`Dict = typeof fr`) empêche de committer une traduction incomplète                                                                                                                                 |
| Photos des produits/pages                                           | `public/images/menu/{id}.webp` et `public/images/pages/{id}.webp` (id = celui du produit/programme dans `src/content/*.ts`) — tant qu'un fichier n'existe pas, un visuel de remplacement (icône + fond) s'affiche automatiquement, sans jamais générer de requête cassée |
| Prompts pour générer ces photos par IA                              | `docs/image-prompts.md` (régénéré par `pnpm generate:image-prompts` à partir du contenu réel)                                                                                                                                                                            |
| Favicon / image de partage (Open Graph)                             | Sources SVG dans `public/favicon.svg` et `scripts/assets/og-image.svg`, PNG régénérés par `pnpm generate:images`                                                                                                                                                         |
| Formulaires (newsletter, inscription académie, contact)             | `src/lib/forms.ts` — point d'entrée unique, actuellement une maquette qui ne transmet ni ne stocke rien (voir le commentaire `TODO(backend)`)                                                                                                                            |

## Scripts

| Commande                                       | Effet                                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `pnpm dev`                                     | serveur de développement                                                                           |
| `pnpm build`                                   | compile le site statique + `sitemap.xml`/`robots.txt` + la redirection statique de `/` vers `/fr/` |
| `pnpm preview`                                 | build puis aperçu via le serveur Vike (voir note plus haut)                                        |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | qualité de code                                                                                    |
| `pnpm shadcn add <composant>`                  | ajoute un composant shadcn/ui (style _new-york_, voir `components.json`)                           |
| `pnpm generate:images`                         | régénère les PNG du favicon et de l'image Open Graph depuis leurs sources SVG                      |
| `pnpm generate:image-prompts`                  | régénère `docs/image-prompts.md` depuis `src/content/*.ts`                                         |

## Notes

- La traduction arménienne (`src/i18n/dictionaries/hy.ts`) est passée par une IA de traduction et porte un commentaire `TODO: вычитка носителем языка` en tête de fichier : elle doit être relue par une personne de langue maternelle avant la mise en ligne définitive.
- Aucun backend n'est branché pour l'instant (le site est 100 % statique), mais Express/Prisma/Docker restent en place dans le dépôt pour accueillir une future API sans avoir à tout reconfigurer.
- Pour les détails d'architecture plus fins (routage i18n, pièges déjà rencontrés, etc.), voir `CLAUDE.md`.

# Prompt Gemini — génération des visuels CELSIUS

Généré depuis `src/content/{menu,academie,boutique}.ts` par `pnpm generate:gemini-prompt` — ne pas éditer la liste numérotée à la main, régénérer à la place.

Un seul prompt ci-dessous, à coller tel quel dans Gemini (app Gemini, ou Google AI Studio avec un modèle de génération d'image type Gemini 2.5 Flash Image). Il décrit le style commun une fois, puis liste chacune des images à produire.

⚠️ **Dans les faits, Gemini génère une image à la fois, pas les 72 d'un coup** — ce n'est pas un incident, c'est le fonctionnement normal. Envoyer le prompt une première fois (il répond avec l'image n°1), puis relancer juste _« suite »_ / _« continue »_ à chaque tour pour passer à la suivante : Gemini garde la liste numérotée en mémoire dans la conversation, pas besoin de tout recoller. Compter environ un message par image. La liste est ordonnée par priorité (voir plus bas) pour que les premiers tours produisent ce qui compte le plus.

Chaque image générée s'enregistre en WebP, ≤ 250 Ko, sous le chemin indiqué en tête de ligne (1600×1200 pour le format 4:3) ; `<ProductImage>` (`src/components/ProductImage.tsx`) la détecte automatiquement, aucune autre modification n'est nécessaire.

## Prompt à copier

```text
You are generating the complete, consistent set of photographs for CELSIUS, a specialty coffee shop. Generate ONE separate, standalone image for EACH numbered item below — never combine several items into one collage/grid image.

SHARED VISUAL STYLE — apply identically to every single image:
- Studio food/product photography, soft natural daylight, photorealistic (no illustration, no 3D render, no cartoon style)
- Cream background, hex #FAF7F2, with subtle deep-blue accents, hex #0B2FA6
- Minimal plain ceramic tableware and natural materials, no clutter, no props with visible brand logos
- 3/4 camera angle, shallow depth of field, unless another angle is noted for a specific item
- Aspect ratio 4:3 unless noted otherwise next to an item
- Absolutely no text, no typography, no logos, no watermarks anywhere in the image

Generate all 72 images below, in order, one per number. The list is priority-ordered:

— Priority: visible on the homepage right now —
1. public/images/menu/cafe-de-la-semaine.webp — Coffee of the week: A rare or co-fermented lot, in limited release. Shown in specialty pour-over/brewing glassware suited to the method.
2. public/images/pages/bresil.webp (aspect ratio 4:3) — Green coffee beans with a small burlap sample bag, evoking Brazil.
3. public/images/pages/ethiopie.webp (aspect ratio 4:3) — Green coffee beans with dried coffee cherries, evoking Ethiopia.
4. public/images/pages/vietnam.webp (aspect ratio 4:3) — Green robusta beans with a traditional phin filter, evoking Vietnam.

— La Carte —
5. public/images/menu/espresso.webp — Espresso: A pure shot, precisely pulled at 93°C. Shown in a plain ceramic espresso cup.
6. public/images/menu/double-espresso.webp — Double espresso: Two shots, same precision. Shown in a plain ceramic espresso cup.
7. public/images/menu/americano.webp — Americano: Espresso lengthened with hot water, smooth and round. Shown in a plain ceramic espresso cup.
8. public/images/menu/cortado.webp — Cortado: Espresso cut with a splash of warm milk. Shown in a plain ceramic espresso cup.
9. public/images/menu/flat-white.webp — Flat white: Double ristretto, microfoam milk, silky texture. Shown in a plain ceramic espresso cup.
10. public/images/menu/cappuccino.webp — Cappuccino: Espresso, steamed milk and foam in perfect balance. Shown in a plain ceramic espresso cup.
11. public/images/menu/latte.webp — Latte: Espresso at its softest, a generous veil of milk. Shown in a plain ceramic espresso cup.
12. public/images/menu/mocha.webp — Mocha: Espresso, melting chocolate and steamed milk. Shown in a plain ceramic espresso cup.
13. public/images/menu/lait-vegetal.webp — Plant-based milk (oat, almond, soy): Available on any of our milk-based drinks. Shown in a plain ceramic espresso cup.
14. public/images/menu/v60.webp — V60 — single origin of your choice: V60 filter, brewed to order from the origin you pick. Shown in specialty pour-over/brewing glassware suited to the method.
15. public/images/menu/aeropress.webp — AeroPress: Gentle pressure brew, a clean, round cup. Shown in specialty pour-over/brewing glassware suited to the method.
16. public/images/menu/siphon.webp — Siphon: A vacuum-brew show, made tableside. Shown in specialty pour-over/brewing glassware suited to the method.
17. public/images/menu/chemex-duo.webp — Chemex for two: Chemex filter, one carafe made for two. Shown in specialty pour-over/brewing glassware suited to the method.
18. public/images/menu/flight.webp — Tasting flight — 3 origins: Three origins, three profiles, one guided tasting. Shown in specialty pour-over/brewing glassware suited to the method.
19. public/images/menu/cold-brew.webp — Cold brew: Cold-steeped for 16 hours, smooth and round. Shown in a clear glass with ice.
20. public/images/menu/nitro.webp — Nitro cold brew: Cold brew infused with nitrogen, creamy texture. Shown in a clear glass with ice.
21. public/images/menu/iced-latte.webp — Iced latte: Espresso, milk and ice, kept simple. Shown in a clear glass with ice.
22. public/images/menu/espresso-tonic.webp — Espresso tonic: Espresso over iced tonic, bright and fizzy. Shown in a clear glass with ice.
23. public/images/menu/ca-phe-sua-da.webp — Vietnamese iced coffee: Robusta coffee, sweetened condensed milk, ice. Shown in a clear glass with ice.
24. public/images/menu/affogato.webp — Affogato: Vanilla ice cream drowned in a hot espresso shot. Shown in a clear glass with ice.
25. public/images/menu/sig-4.webp — "4 °C" — citrus cold brew: House cold brew brightened with citrus zest. Shown in neutral branded-style glassware.
26. public/images/menu/sig-65.webp — "65 °C" — vanilla cream latte: Velvety latte with vanilla and cream. Shown in neutral branded-style glassware.
27. public/images/menu/sig-93.webp — "93 °C" — espresso of the week: The current origin, served as a straight espresso. Shown in neutral branded-style glassware.
28. public/images/menu/egg-coffee.webp — Vietnamese egg coffee: Whipped egg cream over robusta coffee, Vietnamese recipe. Shown in neutral branded-style glassware.
29. public/images/menu/the.webp — Fine teas: A selection of fine teas, whole leaf. Shown in a plain ceramic cup.
30. public/images/menu/infusion.webp — Organic herbal infusions: Organic herbs and flowers, caffeine-free. Shown in a plain ceramic cup.
31. public/images/menu/matcha-latte.webp — Matcha latte: Whisked ceremonial-grade matcha, steamed milk. Shown in a plain ceramic cup.
32. public/images/menu/golden-latte.webp — Golden latte (turmeric): Golden milk with turmeric and warm spices. Shown in a plain ceramic cup.
33. public/images/menu/chai-latte.webp — Chai latte: Spiced black tea, steamed milk, warm notes. Shown in a plain ceramic cup.
34. public/images/menu/chocolat-chaud.webp — Hot chocolate: Melted chocolate with steamed milk, indulgent texture. Shown in a plain ceramic cup.
35. public/images/menu/citronnade.webp — Homemade lemonade: Fresh-squeezed lemons, fine sugar, sparkling water. Shown in a clear glass.
36. public/images/menu/jus-presse.webp — Fresh-pressed juice: Seasonal fruit and vegetables, pressed to order. Shown in a clear glass.
37. public/images/menu/kombucha.webp — Kombucha: Fermented tea, light and fizzy. Shown in a clear glass.
38. public/images/menu/eau.webp — Mineral water: Still or sparkling. Shown in a clear glass.
39. public/images/menu/croissant.webp — Croissant: All-butter, laminated fresh. Shown plated on a small ceramic plate.
40. public/images/menu/pain-au-chocolat.webp — Pain au chocolat: All-butter pastry, two batons of chocolate. Shown plated on a small ceramic plate.
41. public/images/menu/cruffin.webp — Cruffin: Croissant meets muffin, laminated and filled. Shown plated on a small ceramic plate.
42. public/images/menu/babka.webp — Babka: Braided brioche, marbled with chocolate. Shown plated on a small ceramic plate.
43. public/images/menu/cheesecake.webp — Cheesecake: Creamy, baked, on a shortbread base. Shown plated on a small ceramic plate.
44. public/images/menu/carrot-cake.webp — Carrot cake: Moist carrot cake, cream cheese frosting. Shown plated on a small ceramic plate.
45. public/images/menu/banana-bread.webp — Banana bread: Melting banana, vegan recipe. Shown plated on a small ceramic plate.
46. public/images/menu/cookie.webp — Cookie: Chocolate chips, gooey center. Shown plated on a small ceramic plate.
47. public/images/menu/financier.webp — Financier: Brown butter and almonds, gluten-free. Shown plated on a small ceramic plate.
48. public/images/menu/madeleines.webp — Madeleines: Soft little shells, a hint of lemon zest. Shown plated on a small ceramic plate.
49. public/images/menu/tartine-avocat.webp — Avocado toast, house sourdough: Mashed avocado on house sourdough. Shown plated on a ceramic plate.
50. public/images/menu/tartine-saumon.webp — Salmon toast: Smoked salmon on house sourdough. Shown plated on a ceramic plate.
51. public/images/menu/tartine-houmous.webp — Hummus & vegetable toast: House hummus, seasonal vegetables. Shown plated on a ceramic plate.
52. public/images/menu/focaccia.webp — Filled focaccia: House focaccia, today's topping. Shown plated on a ceramic plate.
53. public/images/menu/quiche.webp — Quiche of the day: House pastry, filling based on the market. Shown plated on a ceramic plate.
54. public/images/menu/soupe.webp — Soup of the day: Today's recipe, seasonal vegetables. Shown plated on a ceramic plate.
55. public/images/menu/bowl.webp — Vegetarian bowl: Grains, vegetables and legumes, seasonal. Shown plated on a ceramic plate.
56. public/images/menu/petit-dej.webp — Breakfast: Hot drink and a pastry of your choice. Shown plated as a small full spread on ceramic tableware.
57. public/images/menu/dejeuner.webp — Lunch: Savoury dish, a drink and something sweet. Shown plated as a small full spread on ceramic tableware.
58. public/images/menu/brunch.webp — Weekend brunch: The full spread, served on weekends. Shown plated as a small full spread on ceramic tableware.

— L'Académie —
59. public/images/pages/cupping.webp — Flat-lay of brewing equipment for "Cupping session": Professional tasting, several origins compared side by side.
60. public/images/pages/methodes-douces.webp — Flat-lay of brewing equipment for "Intro to slow brewing": V60, Chemex, AeroPress: the basics, hands-on.
61. public/images/pages/latte-art.webp — Flat-lay of brewing equipment for "Latte art masterclass": Texturing milk, pouring a heart and a rosetta.
62. public/images/pages/sommelier-online.webp — Flat-lay of brewing equipment for "Online "Coffee Sommelier" course": A full path to refine your palate, coming soon.
63. public/images/pages/team-building.webp — Flat-lay of brewing equipment for "Corporate team-building": A tasting or brewing workshop, tailored to your team.

— Boutique —
64. public/images/menu/grains.webp — Whole beans: Current origins, 250 g bag.
65. public/images/menu/materiel.webp — Slow coffee gear (Hario, Fellow): Hario and Fellow gear for brewing at home.
66. public/images/menu/tasse.webp — CELSIUS cup: CELSIUS-branded ceramic.
67. public/images/menu/tote.webp — CELSIUS tote bag: Heavy cotton, CELSIUS wordmark.
68. public/images/menu/carnet.webp — Tasting notebook: To log tasting notes, cup after cup.
69. public/images/menu/livres.webp — Curated coffee books: A curated selection of specialty coffee books.

— Not used on the site yet, lowest priority —
70. public/images/pages/hero.webp (aspect ratio 16:9) — Wide editorial shot of a minimalist specialty coffee bar counter, a barista's hands mid-pour out of focus in the background, no visible faces. Not wired into any page yet.
71. public/images/pages/interior.webp (aspect ratio 4:3) — Interior of a minimalist specialty coffee shop, warm wood and ceramics, large windows, no people. Not wired into any page yet.
72. public/images/pages/portrait-placeholder.webp (aspect ratio 3:4) — Neutral placeholder: a softly lit empty chair and small table with a coffee cup, no person. Not wired into any page yet — /a-propos currently shows a plain icon instead.
```

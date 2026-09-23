import type { L10n } from "./types";

export type AcademieFormat = "onsite" | "online" | "corporate";

export type AcademieProgram = {
  id: string;
  name: L10n;
  description: L10n;
  /** e.g. "1 h", "2 h" */
  duration?: L10n;
  format: AcademieFormat;
  /** null = "sur devis" / "bientôt", see formatPriceValue */
  price: number | null;
  tags?: "online"[];
};

export const academiePrograms: AcademieProgram[] = [
  {
    id: "cupping",
    name: { fr: "Cupping session", en: "Cupping session", hy: "Cupping նստաշրջան" },
    description: {
      fr: "Dégustation professionnelle, plusieurs origines comparées.",
      en: "Professional tasting, several origins compared side by side.",
      hy: "Մասնագիտական համտես՝ մի քանի ծագումների համեմատությամբ։",
    },
    duration: { fr: "1 h", en: "1 h", hy: "1 ժ" },
    format: "onsite",
    price: 25,
  },
  {
    id: "methodes-douces",
    name: {
      fr: "Initiation aux méthodes douces",
      en: "Intro to slow brewing",
      hy: "Ներածություն մեղմ եփման մեթոդների",
    },
    description: {
      fr: "V60, Chemex, AeroPress : les bases en pratique.",
      en: "V60, Chemex, AeroPress: the basics, hands-on.",
      hy: "V60, Chemex, AeroPress՝ հիմունքները գործնականում։",
    },
    duration: { fr: "2 h", en: "2 h", hy: "2 ժ" },
    format: "onsite",
    price: 60,
  },
  {
    id: "latte-art",
    name: { fr: "Masterclass latte art", en: "Latte art masterclass", hy: "Latte art վարպետաց դաս" },
    description: {
      fr: "Texturer le lait, dessiner cœur et rosetta.",
      en: "Texturing milk, pouring a heart and a rosetta.",
      hy: "Կաթի հյուսվածքավորում, սրտիկ և ռոզետա նկարում։",
    },
    duration: { fr: "3 h", en: "3 h", hy: "3 ժ" },
    format: "onsite",
    price: 80,
  },
  {
    id: "sommelier-online",
    name: {
      fr: "Formation « Sommelier du Café » en ligne",
      en: 'Online "Coffee Sommelier" course',
      hy: "«Սուրճի սոմելիե» առցանց դասընթաց",
    },
    description: {
      fr: "Un parcours complet pour affiner son palais, bientôt disponible.",
      en: "A full path to refine your palate, coming soon.",
      hy: "Ամբողջական դասընթաց՝ քիմքը կատարելագործելու համար, շուտով։",
    },
    format: "online",
    price: null,
    tags: ["online"],
  },
  {
    id: "team-building",
    name: {
      fr: "Team-building entreprises",
      en: "Corporate team-building",
      hy: "Թիմային կառուցում ընկերությունների համար",
    },
    description: {
      fr: "Atelier dégustation ou méthodes douces, sur mesure pour votre équipe.",
      en: "A tasting or brewing workshop, tailored to your team.",
      hy: "Համտեսի կամ եփման արհեստանոց՝ հարմարեցված Ձեր թիմին։",
    },
    format: "corporate",
    price: null,
  },
];

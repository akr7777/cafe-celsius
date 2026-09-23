import type { L10n } from "./types";

export type BoutiqueCategory = "grains" | "materiel" | "merch" | "livres";

export type BoutiqueItem = {
  id: string;
  category: BoutiqueCategory;
  name: L10n;
  description: L10n;
};

export const boutiqueCategories: BoutiqueCategory[] = ["grains", "materiel", "merch", "livres"];

export const boutiqueItems: BoutiqueItem[] = [
  {
    id: "grains",
    category: "grains",
    name: { fr: "Café en grains", en: "Whole beans", hy: "Հատիկավոր սուրճ" },
    description: {
      fr: "Origines du moment, sachet de 250 g.",
      en: "Current origins, 250 g bag.",
      hy: "Ընթացիկ ծագումներ, 250 գ տոպրակ։",
    },
  },
  {
    id: "materiel",
    category: "materiel",
    name: {
      fr: "Matériel slow coffee (Hario, Fellow)",
      en: "Slow coffee gear (Hario, Fellow)",
      hy: "Slow coffee պարագաներ (Hario, Fellow)",
    },
    description: {
      fr: "Matériel Hario et Fellow pour préparer chez soi.",
      en: "Hario and Fellow gear for brewing at home.",
      hy: "Hario և Fellow պարագաներ՝ տանը եփելու համար։",
    },
  },
  {
    id: "tasse",
    category: "merch",
    name: { fr: "Tasse CELSIUS", en: "CELSIUS cup", hy: "CELSIUS բաժակ" },
    description: {
      fr: "Céramique signée CELSIUS.",
      en: "CELSIUS-branded ceramic.",
      hy: "CELSIUS-ի ստորագրությամբ խեցեղեն։",
    },
  },
  {
    id: "tote",
    category: "merch",
    name: { fr: "Tote bag CELSIUS", en: "CELSIUS tote bag", hy: "CELSIUS պայուսակ" },
    description: {
      fr: "Coton épais, wordmark CELSIUS.",
      en: "Heavy cotton, CELSIUS wordmark.",
      hy: "Խիտ բամբակ՝ CELSIUS մակնիշով։",
    },
  },
  {
    id: "carnet",
    category: "merch",
    name: { fr: "Carnet de dégustation", en: "Tasting notebook", hy: "Ճաշակման տետր" },
    description: {
      fr: "Pour noter ses impressions, tasse après tasse.",
      en: "To log tasting notes, cup after cup.",
      hy: "Ճաշակման տպավորությունները գրանցելու համար։",
    },
  },
  {
    id: "livres",
    category: "livres",
    name: {
      fr: "Sélection de livres sur le café",
      en: "Curated coffee books",
      hy: "Սուրճին նվիրված գրքերի ընտրանի",
    },
    description: {
      fr: "Une sélection d'ouvrages sur le café de spécialité.",
      en: "A curated selection of specialty coffee books.",
      hy: "Specialty coffee-ին նվիրված գրքերի ընտրանի։",
    },
  },
];

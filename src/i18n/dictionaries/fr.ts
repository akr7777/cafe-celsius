// Dictionnaire de référence : la forme de cet objet fait foi. en.ts et hy.ts
// sont typés contre lui (`Dict = typeof fr`), donc une clé manquante dans une
// traduction est une erreur TypeScript, pas un oubli silencieux.
export const fr = {
  common: {
    openingSoon: "Ouverture prochaine",
    openingSoonParis: "Ouverture prochaine à Paris",
    skipToContent: "Aller au contenu",
    priceOnRequest: "Sur devis",
    priceDisclaimer: "Prix indicatifs TTC, susceptibles d'évoluer.",
  },
  nav: {
    home: "Accueil",
    carte: "La Carte",
    academie: "L'Académie",
    boutique: "Boutique",
    aPropos: "À propos",
    contact: "Contact",
    clickAndCollect: "Click & Collect",
    menu: "Menu",
  },
  clickAndCollect: {
    title: "Click & Collect",
    description: "Commande en ligne et retrait en boutique — bientôt disponible.",
    close: "Fermer",
  },
  footer: {
    tagline: "Café de spécialité · Paris",
    legalMentions: "Mentions légales",
    privacy: "Confidentialité",
    rights: "© {{year}} EURL CELSIUS",
    social: "Suivez-nous",
    soon: "Bientôt",
  },
  languageSwitcher: {
    label: "Langue",
  },
  notFound: {
    title: "Page introuvable",
    description: "La page que vous cherchez n'existe pas ou plus.",
    backHome: "Retour à l'accueil",
  },
  error: {
    title: "Une erreur est survenue",
    description: "Veuillez réessayer dans un instant.",
  },
  meta: {
    titleTemplate: "%s · CELSIUS",
    defaultTitle: "CELSIUS — Café de spécialité, Paris",
    defaultDescription:
      "CELSIUS, café de spécialité à Paris : carte, académie du café et boutique. Ouverture prochaine.",
  },
  home: {
    heroSubtitle: "Café de spécialité · Paris",
  },
};

export type Dict = typeof fr;

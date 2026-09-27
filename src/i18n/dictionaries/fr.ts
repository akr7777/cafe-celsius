// Dictionnaire de référence : la forme de cet objet fait foi. en.ts et hy.ts
// sont typés contre lui (`Dict = typeof fr`), donc une clé manquante dans une
// traduction est une erreur TypeScript, pas un oubli silencieux.
export const fr = {
  common: {
    openingSoon: "Ouverture prochaine",
    openingSoonCity: "Ouverture prochaine à Montpellier",
    skipToContent: "Aller au contenu",
    priceOnRequest: "Sur devis",
    comingSoon: "Bientôt",
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
    tagline: "Café de spécialité · Montpellier",
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
    defaultTitle: "CELSIUS — Café de spécialité, Montpellier",
    defaultDescription:
      "CELSIUS, café de spécialité à Montpellier : carte, académie du café et boutique. Ouverture prochaine.",
    pages: {
      carte: {
        title: "La Carte",
        description:
          "Découvrez la carte CELSIUS : espresso, dégustation, boissons froides, signatures, douceurs maison et salé. Café de spécialité à Montpellier, ouverture prochaine.",
      },
      academie: {
        title: "L'Académie",
        description:
          "L'Académie CELSIUS : cupping, méthodes douces, latte art et formation en ligne. Dégustations et ateliers pour approfondir sa culture du café à Montpellier.",
      },
      boutique: {
        title: "Boutique",
        description:
          "La boutique CELSIUS : café en grains, matériel Hario et Fellow, merch et livres. Une sélection lifestyle à découvrir à l'ouverture, à Montpellier.",
      },
      aPropos: {
        title: "À propos",
        description:
          "CELSIUS, café de spécialité à Montpellier : notre histoire, notre approche du goût et Victoriia Nikolenko, fondatrice et gérante du projet.",
      },
      contact: {
        title: "Contact",
        description:
          "Contactez CELSIUS, café de spécialité à Montpellier. Adresse communiquée prochainement — ouverture à venir.",
      },
      mentionsLegales: {
        title: "Mentions légales",
        description:
          "Mentions légales du site CELSIUS : éditeur, directrice de publication, hébergement et propriété intellectuelle.",
      },
      confidentialite: {
        title: "Confidentialité",
        description:
          "Politique de confidentialité du site CELSIUS : aucun cookie, aucun traceur, et vos droits sur vos données.",
      },
    },
  },
  forms: {
    toastSuccess: "Merci ! Ce service sera disponible à l'ouverture.",
    requiredField: "Ce champ est requis.",
    invalidEmail: "Adresse email invalide.",
  },
  home: {
    heroCta1: "Découvrir la carte",
    heroCta2: "L'Académie",
    heroSubtitle: "Café de spécialité · Montpellier",
    pillarsTitle: "Une idée en quatre piliers",
    pillars: {
      sommelier: {
        title: "Sommelier du Café & Labo du Goût",
        description: "Une approche exigeante de l'extraction, pensée comme une science du goût.",
      },
      academie: {
        title: "Académie & Club",
        description: "Dégustations, ateliers et un club pour approfondir sa culture du café.",
      },
      innovation: {
        title: "Innovation",
        description: "De nouvelles saveurs chaque semaine, entre méthodes classiques et expérimentales.",
      },
      boutique: {
        title: "Boutique lifestyle",
        description: "Grains, matériel Hario et Fellow, et une sélection pensée pour la maison.",
      },
    },
    thermalPrecisionTitle: "La précision thermique",
    thermalPrecisionText:
      "CELSIUS, c'est la température exacte qu'exige une extraction parfaite. Chaque méthode a son degré : 93 °C pour un espresso, 65 °C pour un lait texturé, 4 °C pour un cold brew.",
    originsTitle: "Nos origines",
    origins: {
      bresil: {
        name: "Brésil",
        description: "Des lots doux et chocolatés, travaillés en process naturel.",
      },
      ethiopie: {
        name: "Éthiopie",
        description: "Des profils floraux et fruités, berceau historique du café.",
      },
      vietnam: {
        name: "Vietnam",
        description: "Du robusta intense, pour les recettes glacées et signatures.",
      },
    },
    cafeOfWeekTitle: "Café de la semaine",
    engagementsTitle: "Nos engagements",
    engagements: {
      homemade: {
        title: "Fait maison",
        description: "Pâtisserie et cuisine préparées sur place, chaque jour.",
      },
      bio: {
        title: "Bio & circuits courts",
        description: "Des produits bio et des fournisseurs locaux, privilégiés autant que possible.",
      },
      veganGlutenFree: {
        title: "Vegan & sans gluten",
        description: "Des options identifiées sur toute la carte.",
      },
      wifi: {
        title: "Wi-Fi & espace de travail",
        description: "Une salle pensée aussi pour travailler, au calme.",
      },
    },
    newsletterTitle: "Soyez informé de l'ouverture",
    newsletterText: "Laissez votre email pour suivre l'avancement du projet.",
    newsletterPlaceholder: "Votre email",
    newsletterCta: "S'inscrire",
  },
  badges: {
    vegan: "Vegan",
    glutenFree: "Sans gluten",
    homemade: "Fait maison",
    decafAvailable: "Déca possible",
    online: "En ligne",
    featured: "Café de la semaine",
  },
  carte: {
    intro: "Une carte pensée comme un laboratoire du goût, entre classiques et créations signatures.",
    legendTitle: "Légende",
    tempNote: "La température de service est indiquée en °C lorsqu'elle est pertinente.",
    allergensNote: "Liste des allergènes disponible sur place.",
    categories: {
      espresso: "Espresso & lait",
      degustation: "Bar à dégustation",
      froid: "Boissons froides",
      signatures: "Signatures CELSIUS",
      sansCafe: "Autour du café",
      fraicheur: "Fraîcheur",
      douceurs: "Douceurs maison",
      sale: "Salé",
      formules: "Formules",
    },
  },
  academie: {
    intro:
      "Le Club des Esthètes du Café : dégustations, ateliers et formations pour approfondir sa culture du café, sur place ou en ligne.",
    durationLabel: "Durée",
    formatLabel: "Format",
    format: {
      onsite: "Sur place",
      online: "En ligne",
      corporate: "Entreprises",
    },
    subscribeCta: "S'inscrire",
    subscribe: {
      title: "S'inscrire — {{program}}",
      name: "Nom",
      email: "Email",
      program: "Programme",
      message: "Message",
      submit: "Envoyer",
    },
    faq: {
      title: "Questions fréquentes",
      q1: "Faut-il un niveau particulier ?",
      a1: "Non, nos ateliers s'adressent aussi bien aux curieux qu'aux passionnés confirmés.",
      q2: "Dans quelle langue sont donnés les cours ?",
      a2: "En français, avec un accompagnement en anglais possible sur demande.",
      q3: "Faut-il apporter quelque chose ?",
      a3: "Non, tout le matériel et les cafés sont fournis sur place.",
      q4: "Proposez-vous des formats pour les entreprises ?",
      a4: "Oui, nos ateliers se déclinent en formats team-building, sur devis.",
    },
  },
  boutique: {
    intro: "Une sélection lifestyle autour du café : grains, matériel et objets pensés pour la maison.",
    availableAtOpening: "Disponible en boutique à l'ouverture",
    categories: {
      grains: "Grains",
      materiel: "Matériel",
      merch: "Merch",
      livres: "Livres",
    },
  },
  aPropos: {
    historyTitle: "Notre histoire",
    historyText:
      "CELSIUS naît d'une conviction simple : le café mérite la même exigence que la haute gastronomie. Entre précision scientifique et plaisir gourmand, le projet réunit un labo du goût, une académie et une boutique lifestyle, pensés comme les facettes d'une même passion.",
    founderTitle: "La fondatrice",
    founder: {
      name: "Victoriia Nikolenko",
      role: "Fondatrice & gérante",
      bullet1: "Ingénieure de formation (Bac+5)",
      bullet2: "Certification en boulangerie artisanale",
      bullet3: "Depuis 2020, propriétaire et gérante de son propre coffee shop",
      bullet4: "Expérience en marketing digital et réseaux sociaux",
    },
  },
  contact: {
    addressSoon: "Adresse communiquée prochainement.",
    formTitle: "Nous écrire",
    name: "Nom",
    email: "Email",
    subject: "Sujet",
    message: "Message",
    submit: "Envoyer",
    socialTitle: "Nous suivre",
  },
  legal: {
    mentions: {
      title: "Mentions légales",
      editorTitle: "Éditeur",
      editor: "EURL CELSIUS (en cours d'immatriculation)",
      directorLabel: "Directrice de la publication",
      director: "Victoriia Nikolenko",
      addressLabel: "Siège social",
      address: "[à compléter]",
      rcsLabel: "RCS",
      rcs: "[à compléter]",
      capitalLabel: "Capital social",
      capital: "[à compléter]",
      hostTitle: "Hébergement",
      host: "[à compléter]",
      ipTitle: "Propriété intellectuelle",
      ipText:
        "L'ensemble des contenus de ce site (textes, visuels, identité de marque) est la propriété d'EURL CELSIUS, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
    },
    privacy: {
      title: "Confidentialité",
      cookiesTitle: "Cookies et traceurs",
      cookiesText:
        "Ce site n'utilise ni cookies ni traceur, et ne fait appel à aucun service tiers de suivi ou de mesure d'audience.",
      formsTitle: "Formulaires",
      formsText:
        "Les formulaires de ce site sont pour l'instant des démonstrations : aucune donnée n'est transmise ni conservée.",
      rgpdTitle: "Vos droits",
      rgpdText:
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute question, contactez-nous à :",
      contact: "[à compléter]",
    },
  },
};

export type Dict = typeof fr;

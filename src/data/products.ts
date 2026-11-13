export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  color: string;
  bgColor: string;
  textColor: string;
  available: boolean;
  capsules: number;
  ingredients: Ingredient[];
  benefits: string[];
  usage: string;
  caption: string;
}

export interface Ingredient {
  name: string;
  dosage: string;
  description: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "focus-30",
    name: "FOCUS",
    slug: "focus",
    tagline: "Des gélules qui boostent ta concentration, sans le crash.",
    description:
      "FOCUS par OMNIS combine L-Théanine et Caféine naturelle de guarana avec des Vitamines B6 et B12 pour une concentration nette, sans nervosité ni crash. 30 gélules végétales, fabriquées en Tunisie.",
    price: 39,
    currency: "TND",
    color: "#E8432A",
    bgColor: "var(--harissa)",
    textColor: "var(--cream)",
    available: true,
    capsules: 30,
    ingredients: [
      {
        name: "L-THÉANINE",
        dosage: "180 MG",
        description:
          "Acide aminé présent naturellement dans le thé vert. Accompagne la caféine pour une énergie plus douce.",
        color: "var(--sun)",
      },
      {
        name: "CAFÉINE",
        dosage: "100 MG",
        description:
          "Caféine naturelle issue d'un extrait de guarana : l'énergie d'un café, dosée avec précision.",
        color: "var(--cream)",
      },
      {
        name: "VITAMINE B6",
        dosage: "1.4 MG",
        description:
          "Contribue au fonctionnement normal du système nerveux et à la réduction de la fatigue.",
        color: "var(--sky)",
      },
      {
        name: "VITAMINE B12",
        dosage: "2.5 µG",
        description:
          "Contribue à un métabolisme énergétique normal et au fonctionnement normal du système nerveux.",
        color: "var(--sky)",
      },
    ],
    benefits: [
      "Concentration améliorée",
      "Zéro crash",
      "Gélule 100% végétale",
      "Fabriqué en Tunisie",
    ],
    usage:
      "Prends 1 gélule par jour avec un verre d'eau, le matin ou avant une session de travail. Ne pas dépasser 2 gélules par jour.",
    caption: "30 GÉLULES · + VITAMINES B6 ET B12 · FABRIQUÉ EN TUNISIE",
  },
  {
    id: "energie-30",
    name: "ÉNERGIE",
    slug: "energie",
    tagline: "L'énergie qui dure, sans le crash.",
    description: "Bientôt disponible.",
    price: 39,
    currency: "TND",
    color: "#FFC83D",
    bgColor: "var(--sun)",
    textColor: "var(--ink)",
    available: false,
    capsules: 30,
    ingredients: [],
    benefits: [],
    usage: "",
    caption: "BIENTÔT DISPONIBLE",
  },
  {
    id: "sommeil-30",
    name: "SOMMEIL",
    slug: "sommeil",
    tagline: "Un sommeil profond, naturellement.",
    description: "Bientôt disponible.",
    price: 39,
    currency: "TND",
    color: "#8CC4FF",
    bgColor: "var(--sky)",
    textColor: "var(--ink)",
    available: false,
    capsules: 30,
    ingredients: [],
    benefits: [],
    usage: "",
    caption: "BIENTÔT DISPONIBLE",
  },
  {
    id: "immunite-30",
    name: "IMMUNITÉ",
    slug: "immunite",
    tagline: "Ton bouclier au quotidien.",
    description: "Bientôt disponible.",
    price: 39,
    currency: "TND",
    color: "#FFF4E3",
    bgColor: "var(--cream)",
    textColor: "var(--ink)",
    available: false,
    capsules: 30,
    ingredients: [],
    benefits: [],
    usage: "",
    caption: "BIENTÔT DISPONIBLE",
  },
];

export const focusProduct = products[0];

export const governorates = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabès",
  "Médenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kébili",
];

export const faqItems = [
  {
    question: "C'est quoi OMNIS exactement ?",
    answer:
      "OMNIS est une marque tunisienne de compléments alimentaires sous forme de gélules végétales. Notre premier produit, FOCUS, combine L-Théanine, Caféine naturelle et Vitamines B6/B12 pour booster ta concentration.",
  },
  {
    question: "C'est fabriqué où ?",
    answer:
      "En Tunisie ! Nous sommes fiers de fabriquer nos produits localement, avec des ingrédients de qualité, dans le respect des normes de sécurité alimentaire.",
  },
  {
    question: "Comment je prends FOCUS ?",
    answer:
      "Prends 1 gélule par jour avec un verre d'eau, le matin ou avant une session de travail. Ne dépasse pas 2 gélules par jour.",
  },
  {
    question: "Il y a des effets secondaires ?",
    answer:
      "FOCUS contient 100 mg de caféine naturelle de guarana par gélule (l'équivalent d'un café). Si tu es sensible à la caféine, demande l'avis d'un professionnel de santé. Déconseillé aux femmes enceintes ou allaitantes et aux enfants.",
  },
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Livraison partout en Tunisie sous 24–48h. Paiement à la livraison. Frais de livraison : 7 TND, offerte dès 2 flacons.",
  },
  {
    question: "Je peux retourner le produit ?",
    answer:
      "Si le produit est défectueux ou endommagé, contacte-nous dans les 48h suivant la réception et nous t'enverrons un remplacement.",
  },
];

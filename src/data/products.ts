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
  pastilles: number;
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
    tagline: "Des pastilles qui boostent ta concentration, sans le crash.",
    description:
      "FOCUS par OMNIS combine L-Théanine et Caféine naturelle avec des Vitamines B6 et B12 pour une concentration nette, sans nervosité ni crash. 30 pastilles au goût pop, fabriquées en Tunisie.",
    price: 39,
    currency: "TND",
    color: "#E8432A",
    bgColor: "var(--harissa)",
    textColor: "var(--cream)",
    available: true,
    pastilles: 30,
    ingredients: [
      {
        name: "L-THÉANINE",
        dosage: "180 MG",
        description:
          "Acide aminé naturellement présent dans le thé vert. Favorise la relaxation sans somnolence et améliore l'attention.",
        color: "var(--sun)",
      },
      {
        name: "CAFÉINE",
        dosage: "80 MG",
        description:
          "Dose équivalente à un espresso. Booste la vigilance et la concentration sans les effets secondaires d'un excès de café.",
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
          "Essentielle pour le métabolisme énergétique et le fonctionnement du système nerveux.",
        color: "var(--sky)",
      },
    ],
    benefits: [
      "Concentration améliorée",
      "Zéro crash",
      "Goût pop fruité",
      "Fabriqué en Tunisie",
    ],
    usage:
      "Prends 1 pastille le matin ou avant une session de travail. Ne pas dépasser 2 pastilles par jour. À croquer ou à laisser fondre.",
    caption: "30 PASTILLES · + VITAMINES B6 ET B12 · FABRIQUÉ EN TUNISIE",
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
    pastilles: 30,
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
    pastilles: 30,
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
    pastilles: 30,
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

export const testimonials = [
  {
    id: 1,
    name: "Sami B.",
    text: "J'ai remplacé mon 3ème café par FOCUS. Résultat : même concentration, zéro crash à 16h.",
    rating: 5,
    location: "Tunis",
  },
  {
    id: 2,
    name: "Yasmine K.",
    text: "Le goût est incroyable. On dirait un bonbon mais ça marche vraiment. Mon nouveau rituel du matin.",
    rating: 5,
    location: "Sousse",
  },
  {
    id: 3,
    name: "Omar T.",
    text: "Enfin un produit tunisien de qualité dans ce domaine. Je recommande à fond !",
    rating: 5,
    location: "Sfax",
  },
  {
    id: 4,
    name: "Ines M.",
    text: "Je prends FOCUS avant mes révisions. La différence est nette. Merci OMNIS !",
    rating: 5,
    location: "Ariana",
  },
];

export const faqItems = [
  {
    question: "C'est quoi OMNIS exactement ?",
    answer:
      "OMNIS est une marque tunisienne de compléments alimentaires sous forme de pastilles à croquer. Notre premier produit, FOCUS, combine L-Théanine, Caféine naturelle et Vitamines B6/B12 pour booster ta concentration.",
  },
  {
    question: "C'est fabriqué où ?",
    answer:
      "En Tunisie ! Nous sommes fiers de fabriquer nos produits localement, avec des ingrédients de qualité, dans le respect des normes de sécurité alimentaire.",
  },
  {
    question: "Comment je prends FOCUS ?",
    answer:
      "Croque 1 pastille le matin ou avant une session de travail. Tu peux aussi la laisser fondre. Ne dépasse pas 2 pastilles par jour.",
  },
  {
    question: "Il y a des effets secondaires ?",
    answer:
      "FOCUS contient 80 mg de caféine (l'équivalent d'un espresso). Si tu es sensible à la caféine, commence par une demi-pastille. Déconseillé aux femmes enceintes et aux enfants.",
  },
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Livraison partout en Tunisie sous 2-5 jours ouvrables. Paiement à la livraison disponible. Frais de livraison : 7 TND.",
  },
  {
    question: "Je peux retourner le produit ?",
    answer:
      "Si le produit est défectueux ou endommagé, contacte-nous dans les 48h suivant la réception et nous t'enverrons un remplacement.",
  },
];

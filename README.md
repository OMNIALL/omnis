# ⚡ OMNIS — Direction C : Pop Énergie

> **Site e-commerce complet et responsive pour "OMNIS"**, la marque jeune et audacieuse de compléments alimentaires fabriqués en Tunisie 🇹🇳.
> Reproduit fidèlement l'identité visuelle du brand board **"Direction C – Pop Énergie"** (loud, young, sticker-style).

---

## 🎨 Identité Visuelle & Design Tokens

### Couleurs de Marque
| Nom | Hex | Rôle |
|---|---|---|
| **Harissa** | `#E8432A` | Rouge primaire énergique & punchy |
| **Sun** | `#FFC83D` | Jaune pop & badges stickers |
| **Ink** | `#14110F` | Noir contours épais & ombres sticker |
| **Cream** | `#FFF4E3` | Fond doux et chaleureux façon papier |
| **Sky** | `#8CC4FF` | Accent bleu ciel |

### Typographie
- **Titres / Accroches** : `Unbounded` (Google Fonts, poids 800–900, tout en majuscules, tracking resserré).
- **Corps & UI** : `DM Sans` (Google Fonts, poids 400 à 700).
- **Labels & Badges** : `DM Sans` uppercase, gras, letter-spacing `0.12em`.

### Langage Graphique "Sticker / Pop"
- **Contours noirs épais** (`2-3px solid #14110F`).
- **Ombres portées dures "sticker"** (noir franc sans flou : `6px 6px 0 #14110F`).
- **Coins très arrondis** (`24px` à `32px`) et badges en forme de pilules (`rounded-full`).
- **Cercles superposés** avec anneau intérieur fin (effet pastille / comprimé).
- **Couleurs 100% à plat** (pas de dégradés mous ni de glassmorphism).
- **Micro-animations & wiggles** au survol.

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ ou 20+
- npm ou yarn

### Lancer le serveur de développement

```bash
# Avec npm :
npm run dev

# Ou avec yarn :
yarn dev
```

Ouvrez ensuite votre navigateur sur **[http://localhost:3000](http://localhost:3000)**.

---

## 📦 Structure du Projet

```text
omnis/
├── public/
│   ├── favicon.svg          # Favicon sticker rond jaune OMNIS
│   └── omnis-sticker.svg    # Asset SVG sticker
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout racine, fonts Google, métadonnées SEO & CartProvider
│   │   ├── globals.css      # Design system CSS, tokens & ombres sticker
│   │   ├── page.tsx         # Page d'accueil complète (11 sections)
│   │   ├── checkout/
│   │   │   └── page.tsx     # Page de commande avec formulaire 24 gouvernorats & COD
│   │   └── products/
│   │       └── [slug]/
│   │           └── page.tsx # Page produit FOCUS (galerie stickers, onglets, FAQ)
│   ├── components/
│   │   ├── AnnouncementBar.tsx # Barre défilante marquee Tunisie
│   │   ├── Navbar.tsx          # Navigation sticky + bouton panier pill
│   │   ├── Hero.tsx            # Hero Harissa avec cercles flottants
│   │   ├── ProductCard.tsx     # Carte produit style packaging
│   │   ├── ProductShowcase.tsx # Grille des 4 produits
│   │   ├── WhyOmnis.tsx        # Section Ink "Tout-en-un. Zéro blabla"
│   │   ├── IngredientsSection.tsx # Cercles ingrédients interactifs
│   │   ├── BrandStory.tsx      # Histoire OMNIS (OMNI = tout, S = supplément)
│   │   ├── SocialProof.tsx     # Témoignages bulles + Grille Instagram
│   │   ├── FAQ.tsx             # Accordéon avec icône plus/moins
│   │   ├── Newsletter.tsx      # Club OMNIS fond jaune
│   │   ├── Footer.tsx          # Pied de page Ink avec mentions légales
│   │   ├── CartDrawer.tsx      # Tiroir panier animé avec calcul en TND
│   │   ├── StickerCircle.tsx   # Composant sticker cercle réutilisable
│   │   ├── IngredientPill.tsx  # Badge pilule ingrédient
│   │   ├── OmnisLogo.tsx       # Logo OMNI + S badge
│   │   ├── OmnisLoader.tsx     # Loader sticker jaune animé
│   │   └── CustomCursor.tsx    # Curseur personnalisé sticker jaune
│   ├── context/
│   │   └── CartContext.tsx     # Gestion globale du panier (TND, quantités)
│   ├── data/
│   │   └── products.ts         # Données produits, gouvernorats & FAQ
│   └── tokens/
│       └── design-tokens.ts    # Tokens typographiques, couleurs, ombres & bordures
```

---

## ✨ Fonctionnalités Incluses

1. **Panier fonctionnel complet** : Tiroir latéral depuis la droite, ajustement des quantités, suppression, calcul dynamique des frais de livraison (7 TND) et du total en Dinars Tunisiens (TND).
2. **Page de commande (`/checkout`)** : Formulaire adapté au marché tunisien avec les 24 gouvernorats, paiement à la livraison (Cash on Delivery) par défaut et écran de confirmation sticker.
3. **Page détail produit FOCUS (`/products/focus`)** : Composition packaging en stickers, sélecteur de quantité, onglets ingrédients/utilisation/FAQ et réassurances locales.
4. **Curseur personnalisé interactif** : Pastille sticker jaune suivant le pointeur sur desktop avec expansion au survol des éléments cliquables.
5. **SEO & Internationalisation ready** : Métadonnées OpenGraph, balises sémantiques HTML5 et structure prête pour le multilingue (FR/EN/AR).

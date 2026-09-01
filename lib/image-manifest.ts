/**
 * Généré par scripts/prepare-images.mjs — ne pas éditer à la main.
 * Relance `npm run prepare-images` après avoir remplacé les fichiers
 * dans assets-source/ pour régénérer ce fichier.
 */

export const heroImage = {
  src: "/combo-hero.webp",
  width: 1200,
  height: 1500,
  alt: "Combo Table Thérapeutique : sandwich, yaourt et mignardises à 2 000 FCFA",
  blurDataURL: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAABQAwCdASoQABQAPu1kqU2ppaOiMAgBMB2JZACdMoRwAEPsAAD+Ijg9b8CXFI8mJ+tUQOu3j+4LmQoQT8ei4wVZLg6W83ugGri4AAAA",
  isPlaceholder: true,
} as const;

export const cardImages = {
  sandwich: {
    src: "/carte-sandwich.webp",
    width: 800,
    height: 800,
    alt: "Sandwich gourmand Table Thérapeutique, coupé en deux, garni de viande, cheddar et crudités",
    isPlaceholder: false,
  },
  yaourt: {
    src: "/carte-yaourt.webp",
    width: 800,
    height: 800,
    alt: "Bouteille de yaourt frais Table Thérapeutique tenue à la main",
    isPlaceholder: false,
  },
  mignardises: {
    src: "/carte-mignardises.webp",
    width: 800,
    height: 800,
    alt: "Mignardises Table Thérapeutique emballées individuellement, prêtes à emporter",
    isPlaceholder: false,
  },
} as const;

export const ogImage = {
  src: "/og.webp",
  width: 1200,
  height: 630,
  alt: "Sandwich gourmand Table Thérapeutique",
  isPlaceholder: false,
} as const;

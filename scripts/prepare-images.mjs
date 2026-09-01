#!/usr/bin/env node
/**
 * Génère les images publiques du site à partir de ./assets-source/.
 * Relançable : remplace les fichiers sources et relance
 * `npm run prepare-images` pour tout régénérer.
 *
 * Rôles :
 *  - hero        : photo qui montre le combo complet (sandwich + yaourt +
 *                  mignardises ensemble). Aucune photo de ce type n'était
 *                  disponible dans assets-source au moment de la génération
 *                  → un aplat de couleur du thème est utilisé à la place
 *                  (voir buildHeroPlaceholder). Dès qu'une vraie photo du
 *                  combo complet existe, ajoute-la sous SOURCES.hero et
 *                  relance ce script : le SVG de secours disparaît de
 *                  lui-même.
 *  - sandwich, yaourt, mignardises : une photo par produit pour les cartes
 *    « Ce qui est inclus ».
 *  - chef        : photo portrait pour la section « Le mot du chef ».
 *  - og          : image de partage WhatsApp/réseaux sociaux (1200x630),
 *                  doit rester lisible en miniature dans une conversation.
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { colors } from "../lib/theme.ts";
import { OFFER } from "../lib/offer.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "assets-source");
const PUBLIC_DIR = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "lib", "image-manifest.ts");

/**
 * Fichiers sources choisis après inspection visuelle de assets-source/.
 * hero: null volontairement (voir commentaire d'en-tête).
 */
const SOURCES = {
  hero: null,
  sandwich: "WhatsApp Image 2026-09-01 at 16.08.02.jpeg",
  yaourt: "WhatsApp Image 2026-09-01 at 16.08.07.jpeg",
  mignardises: "WhatsApp Image 2026-09-01 at 16.08.08.jpeg",
  chef: "WhatsApp Image 2026-09-01 at 16.08.13.jpeg",
  og: "WhatsApp Image 2026-09-01 at 16.08.02.jpeg",
};

const CARD_SIZE = 800;
const HERO_WIDTH = 1200;
const HERO_HEIGHT = 1500; // ratio 4/5
const CHEF_WIDTH = 900;
const CHEF_HEIGHT = 1125; // ratio 4/5
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const QUALITY = 78;

const missingSources = [];

async function buildHeroPlaceholder() {
  const svg = `
    <svg width="${HERO_WIDTH}" height="${HERO_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="warmth" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stop-color="${colors.mandarine}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${colors.encre}" stop-opacity="0.35"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="${colors.mandarine}"/>
      <rect width="100%" height="100%" fill="url(#warmth)"/>
      <text x="50%" y="46%" text-anchor="middle" font-family="sans-serif" font-weight="800"
            font-size="72" fill="${colors.creme}">Combo</text>
      <text x="50%" y="56%" text-anchor="middle" font-family="sans-serif" font-weight="800"
            font-size="72" fill="${colors.creme}">Table Thérapeutique</text>
      <text x="50%" y="66%" text-anchor="middle" font-family="sans-serif" font-weight="500"
            font-size="34" fill="${colors.creme}" opacity="0.9">Sandwich + Yaourt + Mignardises</text>
      <text x="50%" y="72%" text-anchor="middle" font-family="sans-serif" font-weight="500"
            font-size="30" fill="${colors.creme}" opacity="0.75">Photo à venir</text>
    </svg>
  `;

  missingSources.push("hero");

  return sharp(Buffer.from(svg)).webp({ quality: QUALITY });
}

async function buildCard(role, filename, width = CARD_SIZE, height = CARD_SIZE) {
  const sourcePath = path.join(SOURCE_DIR, filename ?? "");
  if (!filename || !existsSync(sourcePath)) {
    missingSources.push(role);
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${colors.mandarine}"/>
        <text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-weight="800"
              font-size="48" fill="${colors.creme}">${role}</text>
      </svg>
    `;
    return sharp(Buffer.from(svg)).webp({ quality: QUALITY });
  }

  return sharp(sourcePath)
    .resize({
      width,
      height,
      fit: "cover",
      position: sharp.strategy.attention,
    })
    .webp({ quality: QUALITY });
}

async function buildOg(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  if (!existsSync(sourcePath)) {
    missingSources.push("og");
    const svg = `
      <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${colors.encre}"/>
        <text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-weight="800"
              font-size="56" fill="${colors.mandarine}">${OFFER.PRIX} FCFA</text>
      </svg>
    `;
    return sharp(Buffer.from(svg)).webp({ quality: QUALITY });
  }

  return sharp(sourcePath)
    .resize({
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fit: "cover",
      position: sharp.strategy.attention,
    })
    .webp({ quality: QUALITY });
}

async function toBlurDataUrl(pipeline) {
  const buffer = await pipeline.clone().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });

  const heroPipeline = await buildHeroPlaceholder();
  const heroBuffer = await heroPipeline.clone().toBuffer();
  await writeFile(path.join(PUBLIC_DIR, "combo-hero.webp"), heroBuffer);
  const heroBlurDataUrl = await toBlurDataUrl(heroPipeline);

  const sandwichPipeline = await buildCard("sandwich", SOURCES.sandwich);
  await sandwichPipeline.toFile(path.join(PUBLIC_DIR, "carte-sandwich.webp"));

  const yaourtPipeline = await buildCard("yaourt", SOURCES.yaourt);
  await yaourtPipeline.toFile(path.join(PUBLIC_DIR, "carte-yaourt.webp"));

  const mignardisesPipeline = await buildCard("mignardises", SOURCES.mignardises);
  await mignardisesPipeline.toFile(path.join(PUBLIC_DIR, "carte-mignardises.webp"));

  const chefPipeline = await buildCard("chef", SOURCES.chef, CHEF_WIDTH, CHEF_HEIGHT);
  await chefPipeline.toFile(path.join(PUBLIC_DIR, "chef.webp"));

  const ogPipeline = await buildOg(SOURCES.og);
  await ogPipeline.toFile(path.join(PUBLIC_DIR, "og.webp"));

  const manifest = `/**
 * Généré par scripts/prepare-images.mjs — ne pas éditer à la main.
 * Relance \`npm run prepare-images\` après avoir remplacé les fichiers
 * dans assets-source/ pour régénérer ce fichier.
 */

export const heroImage = {
  src: "/combo-hero.webp",
  width: ${HERO_WIDTH},
  height: ${HERO_HEIGHT},
  alt: "Combo Table Thérapeutique : sandwich, yaourt et mignardises à 2 000 FCFA",
  blurDataURL: "${heroBlurDataUrl}",
  isPlaceholder: ${missingSources.includes("hero")},
} as const;

export const cardImages = {
  sandwich: {
    src: "/carte-sandwich.webp",
    width: ${CARD_SIZE},
    height: ${CARD_SIZE},
    alt: "Sandwich gourmand Table Thérapeutique, coupé en deux, garni de viande, cheddar et crudités",
    isPlaceholder: ${missingSources.includes("sandwich")},
  },
  yaourt: {
    src: "/carte-yaourt.webp",
    width: ${CARD_SIZE},
    height: ${CARD_SIZE},
    alt: "Bouteille de yaourt frais Table Thérapeutique tenue à la main",
    isPlaceholder: ${missingSources.includes("yaourt")},
  },
  mignardises: {
    src: "/carte-mignardises.webp",
    width: ${CARD_SIZE},
    height: ${CARD_SIZE},
    alt: "Mignardises Table Thérapeutique emballées individuellement, prêtes à emporter",
    isPlaceholder: ${missingSources.includes("mignardises")},
  },
} as const;

export const chefImage = {
  src: "/chef.webp",
  width: ${CHEF_WIDTH},
  height: ${CHEF_HEIGHT},
  alt: "Préparation des mignardises Table Thérapeutique le matin même à Fidjrossè",
  isPlaceholder: ${missingSources.includes("chef")},
} as const;

export const ogImage = {
  src: "/og.webp",
  width: ${OG_WIDTH},
  height: ${OG_HEIGHT},
  alt: "Sandwich gourmand Table Thérapeutique",
  isPlaceholder: ${missingSources.includes("og")},
} as const;
`;

  await writeFile(MANIFEST_PATH, manifest, "utf-8");

  console.log("Images générées dans public/ :");
  console.log("  - combo-hero.webp" + (missingSources.includes("hero") ? "  (placeholder — aucune photo du combo complet trouvée)" : ""));
  console.log("  - carte-sandwich.webp");
  console.log("  - carte-yaourt.webp");
  console.log("  - carte-mignardises.webp");
  console.log("  - chef.webp");
  console.log("  - og.webp");
  if (missingSources.length > 0) {
    console.log("\nRôles sans photo source (aplat de couleur utilisé) :", missingSources.join(", "));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

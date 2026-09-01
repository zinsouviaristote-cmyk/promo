/**
 * Réglages du wordmark "Table Thérapeutique". Trois variantes comparées
 * sur /logo ; celle utilisée sur le site (header, footer) est pilotée par
 * ACTIVE_LOGO_VARIANT ci-dessous — change juste ce nombre pour basculer.
 */

export type LogoVariant = {
  label: string;
  description: string;
  tableWeight: number;
  theraWeight: number;
  soft: number;
};

export const LOGO_VARIANTS: Record<1 | 2 | 3, LogoVariant> = {
  1: {
    label: "Fraunces 600 / 800",
    description: "La référence.",
    tableWeight: 600,
    theraWeight: 800,
    soft: 60,
  },
  2: {
    label: "Fraunces 700 / 900",
    description: "Plus de présence, si la référence paraît timide dans le header.",
    tableWeight: 700,
    theraWeight: 900,
    soft: 60,
  },
  3: {
    label: "Fraunces 600 / 800 — SOFT 100",
    description: "Empattements encore plus arrondis, rendu plus doux.",
    tableWeight: 600,
    theraWeight: 800,
    soft: 100,
  },
};

/** Variante utilisée sur le site. Change ce nombre (1, 2 ou 3) pour basculer. */
export const ACTIVE_LOGO_VARIANT: 1 | 2 | 3 = 1;

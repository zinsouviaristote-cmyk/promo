/**
 * Pictogrammes de cuisine en trait fin pour la constellation d'ustensiles
 * du fond animé (voir Backdrop.tsx). Dessinés à la main en SVG, viewBox
 * 24x24, aucune librairie d'icônes ici — ce sont des motifs de fond, pas
 * des icônes fonctionnelles.
 */

export type UtensilName =
  | "fork"
  | "spoon"
  | "knife"
  | "wheat"
  | "mint"
  | "coffeeBean"
  | "croissant"
  | "cup"
  | "steam"
  | "bowl";

export const UTENSIL_PATHS: Record<UtensilName, string> = {
  fork: "M6 2v6M9 2v6M12 2v6M6 8h6M9 8v14",
  spoon: "M9 10v12M9 10a4 5 0 1 0 0-10a4 5 0 0 0 0 10Z",
  knife: "M5 2h11q2 0 2 6v2H8L5 2ZM8 10v12",
  wheat: "M12 2v20M12 4l-4-2M12 4l4-2M12 7.5l-4-2M12 7.5l4-2M12 11l-4-2M12 11l4-2M12 14.5l-4-2M12 14.5l4-2",
  mint: "M12 2C6 6 6 14 12 22C18 14 18 6 12 2ZM12 4v16",
  coffeeBean: "M12 12m-9 -6a10 6 0 1 0 18 0a10 6 0 1 0 -18 0M12 12m-9 6a10 6 0 1 0 18 0a10 6 0 1 0 -18 0M7 9q3 3 0 6",
  croissant: "M4 15a10 9 0 0 0 15 5a12 12 0 0 1 -8-20a10 9 0 0 0 -7 15Z",
  cup: "M4 8h12v8a6 6 0 0 1-12 0V8ZM16 10a4 4 0 0 1 0 8M4 8h12",
  steam: "M8 2c2.5 2 -2.5 4 0 6c2.5 2 -2.5 4 0 6M14 2c2.5 2 -2.5 4 0 6c2.5 2 -2.5 4 0 6",
  bowl: "M3 12a9 4.5 0 0 0 18 0ZM2.5 12h19",
};

export type UtensilSpec = {
  icon: UtensilName;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
};

/**
 * Positions écrites en dur : jamais de Math.random() ici, ça casse
 * l'hydratation Next (mismatch serveur/client) et ferait bouger les
 * ustensiles à chaque rechargement.
 *
 * Tous les pictos sont volontairement collés aux bords gauche/droit
 * (marge de page), jamais au centre : ils encadrent le contenu au lieu
 * de passer derrière.
 */
export const UTENSIL_LAYOUT: UtensilSpec[] = [
  // Colonne de gauche
  { icon: "fork", top: "8%", left: "3%", size: 28, rotate: -12, duration: 18, delay: 0 },
  { icon: "coffeeBean", top: "30%", left: "2%", size: 18, rotate: 30, duration: 16, delay: 6.4 },
  { icon: "spoon", top: "52%", left: "5%", size: 22, rotate: 18, duration: 22, delay: 2.2 },
  { icon: "knife", top: "74%", left: "4%", size: 32, rotate: -20, duration: 21, delay: 9.4 },
  { icon: "steam", top: "92%", left: "6%", size: 24, rotate: 0, duration: 17, delay: 7.3 },
  // Colonne de droite
  { icon: "wheat", top: "12%", left: "92%", size: 34, rotate: 8, duration: 20, delay: 4.1 },
  { icon: "croissant", top: "34%", left: "88%", size: 40, rotate: -15, duration: 26, delay: 3.2 },
  { icon: "mint", top: "56%", left: "95%", size: 20, rotate: -6, duration: 24, delay: 1.3 },
  { icon: "bowl", top: "78%", left: "90%", size: 30, rotate: 10, duration: 23, delay: 8.2 },
  { icon: "cup", top: "94%", left: "93%", size: 26, rotate: 5, duration: 19, delay: 5.1 },
];

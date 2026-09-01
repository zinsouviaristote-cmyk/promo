/**
 * Source unique des tokens de couleur. tailwind.config.ts lit ce fichier
 * pour générer les classes utilitaires (bg-creme, text-mandarine, ...).
 * Aucune couleur ne doit être écrite en dur ailleurs dans le projet.
 *
 * Pour changer d'ambiance, modifie uniquement ACTIVE_PRESET.
 */

export const PRESETS = {
  "comptoir-frais": {
    creme: "#FCFAF5",
    encre: "#171310",
    mandarine: "#F2600C",
    basilic: "#1F5C46",
    sable: "#E9E0D2",
  },
  "braise-du-soir": {
    creme: "#FBF6EE",
    encre: "#12100E",
    mandarine: "#F2600C",
    basilic: "#2F6B4F",
    sable: "#2A2521",
  },
  "affiche-marche": {
    creme: "#FFFFFF",
    encre: "#171310",
    mandarine: "#F2600C",
    basilic: "#1F5C46",
    sable: "#FFC53D",
  },
} as const;

export type PresetName = keyof typeof PRESETS;

export const ACTIVE_PRESET: PresetName = "comptoir-frais";

export const colors = PRESETS[ACTIVE_PRESET];

/**
 * Couleur du second mot du wordmark ("Thérapeutique") sur fond clair.
 * La mandarine pure (#F2600C) tombe à 3,2:1 de contraste sur le crème et
 * devient molle à la taille du logo — cette teinte plus sombre corrige ça.
 * Sur fond sombre, `colors.mandarine` reste utilisée telle quelle.
 */
export const logoAccentOnLight = "#D4520A";
/** Léger éclaircissement au survol du second mot du wordmark, rien de plus. */
export const logoAccentOnLightHover = "#E36A1F";
export const logoAccentOnDarkHover = "#FF7A2E";

export const radii = {
  card: "1.75rem",
  banner: "2rem",
  footer: "2.5rem",
};

/** Convertit un hex "#RRGGBB" en rgba(...) pour les motifs de fond en CSS pur. */
export function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

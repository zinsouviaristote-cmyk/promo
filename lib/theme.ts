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

export const radii = {
  card: "1.75rem",
  banner: "2rem",
  footer: "2.5rem",
};

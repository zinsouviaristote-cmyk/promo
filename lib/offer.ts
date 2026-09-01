/**
 * Constantes de l'offre. Pour changer le prix, la date ou le numéro
 * WhatsApp, modifie uniquement ce fichier.
 */

export const OFFER = {
  PRIX: 2000,
  /**
   * Si renseigné (ex. 2500), un prix barré s'affiche automatiquement
   * à côté du prix promo. Laisser `null` tant qu'aucun prix habituel
   * n'a été communiqué par le client.
   */
  PRIX_HABITUEL: null as number | null,
  DEVISE: "FCFA",
  DATE_EVENEMENT_ISO: "2026-09-12T09:00:00+01:00",
  DATE_EVENEMENT_LABEL: "Samedi 12 septembre 2026",
  LIEU: "Fidjrossè, Cotonou",
  WHATSAPP_NUMERO_E164: "2290159488518",
  WHATSAPP_NUMERO_AFFICHAGE: "+229 01 59 48 85 18",
  WHATSAPP_PREFIXE: "229",
} as const;

/** Espace fine insécable (U+202F) : séparateur de milliers garanti, quel
 * que soit le moteur Intl/ICU du navigateur ou du serveur. */
const NARROW_NBSP = " ";

/**
 * Formate un montant en FCFA avec une espace fine insécable entre les
 * groupes de milliers (ex. "2 000 FCFA"). À utiliser partout où un prix
 * est affiché : le séparateur ne doit jamais dépendre du formatage
 * `toLocaleString` du runtime, qui peut varier d'un environnement à l'autre.
 */
export function formatPrix(montant: number): string {
  const chiffres = Math.round(montant)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NARROW_NBSP);
  return `${chiffres}${NARROW_NBSP}FCFA`;
}

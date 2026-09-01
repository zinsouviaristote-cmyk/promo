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

export function formatFCFA(montant: number): string {
  return `${montant.toLocaleString("fr-FR")} FCFA`;
}

import { OFFER, formatFCFA } from "@/lib/offer";

export function buildReservationMessage(params: {
  nom: string;
  telephone: string;
  quantite: number;
  total: number;
}): string {
  const { nom, telephone, quantite, total } = params;
  return `Bonjour Table Thérapeutique 👋
Je souhaite réserver mon combo :

- Nom : ${nom}
- Combos : ${quantite}
- Total : ${formatFCFA(total)}
- Mon numéro : +${OFFER.WHATSAPP_PREFIXE} ${telephone}

Pour le ${OFFER.DATE_EVENEMENT_LABEL.toLowerCase()} — ${OFFER.LIEU}.`;
}

export function buildWhatsAppUrl(message: string, numero: string = OFFER.WHATSAPP_NUMERO_E164): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

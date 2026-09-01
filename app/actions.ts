"use server";

import { reservationSchema } from "@/lib/validations";
import { buildReservationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { OFFER } from "@/lib/offer";

export type ReservationResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; errors: Record<string, string> };

export async function reserveCombo(
  _prevState: ReservationResult | null,
  formData: FormData
): Promise<ReservationResult> {
  const parsed = reservationSchema.safeParse({
    nom: formData.get("nom"),
    telephone: formData.get("telephone"),
    quantite: formData.get("quantite"),
    contactWhatsApp: formData.get("contactWhatsApp") === "on",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  const { nom, telephone, quantite } = parsed.data;
  const total = quantite * OFFER.PRIX;
  const whatsappUrl = buildWhatsAppUrl(
    buildReservationMessage({ nom, telephone, quantite, total })
  );

  if (process.env.ORDER_WEBHOOK_URL) {
    try {
      await fetch(process.env.ORDER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          telephone: `+${OFFER.WHATSAPP_PREFIXE}${telephone}`,
          quantite,
          total,
          horodatage: new Date().toISOString(),
        }),
      });
    } catch {
      // Le webhook est une notification annexe : son échec ne doit
      // jamais empêcher la réservation d'aboutir pour le visiteur.
    }
  }

  return { ok: true, whatsappUrl };
}

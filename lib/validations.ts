import { z } from "zod";

export const reservationSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Entrez votre nom et prénom (2 caractères minimum)."),
  telephone: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine(
      (value) => /^01\d{8}$/.test(value),
      "Entrez un numéro béninois à 10 chiffres, par exemple 01 59 48 85 18."
    ),
  quantite: z.coerce
    .number()
    .int()
    .min(1, "Choisissez au moins 1 combo.")
    .max(10, "Le maximum est de 10 combos par réservation."),
  contactWhatsApp: z.boolean().default(true),
});

export type ReservationInput = z.input<typeof reservationSchema>;
export type ReservationData = z.output<typeof reservationSchema>;

export type ReservationFieldErrors = Partial<
  Record<keyof ReservationInput, string>
>;

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Minus, Plus } from "lucide-react";
import { reserveCombo, type ReservationResult } from "@/app/actions";
import { reservationSchema } from "@/lib/validations";
import { OFFER, formatPrix } from "@/lib/offer";

type FieldErrors = Partial<Record<"nom" | "telephone" | "quantite", string>>;

function validateField(
  field: "nom" | "telephone",
  values: { nom: string; telephone: string; quantite: number }
): string | undefined {
  const parsed = reservationSchema.safeParse({ ...values, contactWhatsApp: true });
  if (parsed.success) return undefined;
  const issue = parsed.error.issues.find((i) => i.path[0] === field);
  return issue?.message;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Envoi…
        </>
      ) : (
        "Confirmer ma réservation"
      )}
    </button>
  );
}

export default function ReservationForm({
  autoFocusNom = false,
}: {
  autoFocusNom?: boolean;
}) {
  const [state, formAction] = useActionState<ReservationResult | null, FormData>(
    reserveCombo,
    null
  );
  const [dismissed, setDismissed] = useState(false);
  const [quantite, setQuantite] = useState(1);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const nomRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDismissed(false);
  }, [state]);

  useEffect(() => {
    if (autoFocusNom) nomRef.current?.focus();
  }, [autoFocusNom]);

  const showSuccess = state?.ok === true && !dismissed;
  const serverErrors = state && !state.ok ? state.errors : undefined;
  const errors: FieldErrors = serverErrors ?? clientErrors;

  function handleBlur(field: "nom" | "telephone") {
    const message = validateField(field, { nom, telephone, quantite });
    setClientErrors((prev) => ({ ...prev, [field]: message }));
  }

  function decrement() {
    setQuantite((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantite((q) => Math.min(10, q + 1));
  }

  function handleReset() {
    formRef.current?.reset();
    setNom("");
    setTelephone("");
    setQuantite(1);
    setClientErrors({});
    setDismissed(true);
  }

  if (showSuccess && state?.ok) {
    return (
      <div role="status" aria-live="polite" className="py-2 text-center">
        <p className="text-2xl font-display font-extrabold text-encre">
          🎉 Votre demande de réservation est enregistrée
        </p>
        <p className="mt-3 text-encre/70">
          Nous vous contactons sur WhatsApp pour confirmer.
        </p>
        <a
          href={state.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          Ouvrir WhatsApp maintenant
        </a>
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 text-sm font-medium text-encre/60 underline underline-offset-4 hover:text-encre"
        >
          Faire une autre réservation
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nom" className="text-sm font-medium text-encre">
          Nom et prénom
        </label>
        <input
          ref={nomRef}
          id="nom"
          name="nom"
          type="text"
          required
          minLength={2}
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          onBlur={() => handleBlur("nom")}
          aria-invalid={Boolean(errors.nom)}
          aria-describedby={errors.nom ? "nom-error" : undefined}
          className="min-h-[44px] rounded-full border border-sable bg-creme px-4 py-3 text-encre outline-none focus-visible:border-mandarine"
        />
        {errors.nom && (
          <p id="nom-error" className="text-sm text-red-700">
            {errors.nom}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="telephone" className="text-sm font-medium text-encre">
          Numéro WhatsApp
        </label>
        <div
          className={`flex items-center overflow-hidden rounded-full border bg-creme ${
            errors.telephone ? "border-red-700" : "border-sable"
          }`}
        >
          <span className="select-none border-r border-sable bg-sable/40 px-4 py-3 font-medium text-encre/70">
            +229
          </span>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            inputMode="numeric"
            required
            placeholder="01 XX XX XX XX"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onBlur={() => handleBlur("telephone")}
            aria-invalid={Boolean(errors.telephone)}
            aria-describedby={errors.telephone ? "telephone-error" : undefined}
            className="min-h-[44px] min-w-0 flex-1 bg-transparent px-4 py-3 text-encre outline-none"
          />
        </div>
        {errors.telephone && (
          <p id="telephone-error" className="text-sm text-red-700">
            {errors.telephone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-encre">Nombre de combos</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={decrement}
            aria-label="Diminuer le nombre de combos"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sable text-encre transition-transform active:scale-90"
          >
            <Minus className="h-5 w-5" aria-hidden />
          </button>
          <span className="w-8 text-center text-xl font-semibold tabular-nums text-encre">
            {quantite}
          </span>
          <button
            type="button"
            onClick={increment}
            aria-label="Augmenter le nombre de combos"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sable text-encre transition-transform active:scale-90"
          >
            <Plus className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <input type="hidden" name="quantite" value={quantite} />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-encre/80">
        <input
          type="checkbox"
          name="contactWhatsApp"
          defaultChecked
          className="h-5 w-5 rounded border-sable text-mandarine focus-visible:outline-mandarine"
        />
        Oui, contactez-moi sur WhatsApp.
      </label>

      <p className="text-lg font-semibold text-encre">
        Total : {formatPrix(quantite * OFFER.PRIX)}
      </p>

      <SubmitButton />
    </form>
  );
}

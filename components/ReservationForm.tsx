"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import { reservationSchema } from "@/lib/validations";
import { OFFER, formatPrix } from "@/lib/offer";

type FieldErrors = Partial<Record<"nom" | "telephone" | "quantite", string>>;

// Remplacez cet ID par celui fourni par Formspree (ex: "xbjnqwe1")
const FORMSPREE_FORM_ID = "mwlkovak";

function validateField(
  field: "nom" | "telephone",
  values: { nom: string; telephone: string; quantite: number }
): string | undefined {
  const parsed = reservationSchema.safeParse({ ...values, contactWhatsApp: true });
  if (parsed.success) return undefined;
  const issue = parsed.error.issues.find((i) => i.path[0] === field);
  return issue?.message;
}

export default function ReservationForm({
  autoFocusNom = false,
}: {
  autoFocusNom?: boolean;
}) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [quantite, setQuantite] = useState(1);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [contactWhatsApp, setContactWhatsApp] = useState(true);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  const formRef = useRef<HTMLFormElement>(null);
  const nomRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocusNom) nomRef.current?.focus();
  }, [autoFocusNom]);

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
    setContactWhatsApp(true);
    setClientErrors({});
    setIsSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Validation côté client avant envoi
    const parsed = reservationSchema.safeParse({
      nom,
      telephone,
      quantite,
      contactWhatsApp,
    });

    if (!parsed.success) {
      const errorsObj: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FieldErrors;
        if (path) errorsObj[path] = issue.message;
      });
      setClientErrors(errorsObj);
      return;
    }

    setIsPending(true);

    const totalPrix = formatPrix(quantite * OFFER.PRIX);
    const numeroComplet = `+229${telephone}`;

    // 2. Envoi des données vers Formspree
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nom,
          telephone: numeroComplet,
          quantite,
          total: totalPrix,
          contactWhatsApp: contactWhatsApp ? "Oui" : "Non",
        }),
      });

      if (response.ok) {
        // 3. Génération du lien WhatsApp
        const textMessage = encodeURIComponent(
          `Bonjour, je souhaite réserver ${quantite} combo(s) pour un total de ${totalPrix}. Mon nom est ${nom}.`
        );
        const waUrl = `https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}?text=${textMessage}`;

        setWhatsappUrl(waUrl);
        setIsSuccess(true);
      } else {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      alert("Problème de connexion. Veuillez vérifier votre réseau.");
    } finally {
      setIsPending(false);
    }
  }

  if (isSuccess) {
    return (
      <div role="status" aria-live="polite" className="py-2 text-center">
        <p className="font-display text-2xl font-extrabold text-encre">
          🎉 Votre demande de réservation est enregistrée
        </p>
        <p className="mt-3 text-encre/70">
          Un e-mail nous a été transmis. Nous vous contactons également sur WhatsApp pour confirmer.
        </p>
        <a
          href={whatsappUrl}
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
      onSubmit={handleSubmit}
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
          aria-invalid={Boolean(clientErrors.nom)}
          aria-describedby={clientErrors.nom ? "nom-error" : undefined}
          className="min-h-[44px] rounded-full border border-sable bg-creme px-4 py-3 text-encre outline-none focus-visible:border-mandarine"
        />
        {clientErrors.nom && (
          <p id="nom-error" className="text-sm text-red-700">
            {clientErrors.nom}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="telephone" className="text-sm font-medium text-encre">
          Numéro WhatsApp
        </label>
        <div
          className={`flex items-center overflow-hidden rounded-full border bg-creme ${
            clientErrors.telephone ? "border-red-700" : "border-sable"
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
            aria-invalid={Boolean(clientErrors.telephone)}
            aria-describedby={clientErrors.telephone ? "telephone-error" : undefined}
            className="min-h-[44px] min-w-0 flex-1 bg-transparent px-4 py-3 text-encre outline-none"
          />
        </div>
        {clientErrors.telephone && (
          <p id="telephone-error" className="text-sm text-red-700">
            {clientErrors.telephone}
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
      </div>

      <label className="flex items-center gap-2.5 text-sm text-encre/80">
        <input
          type="checkbox"
          name="contactWhatsApp"
          checked={contactWhatsApp}
          onChange={(e) => setContactWhatsApp(e.target.checked)}
          className="h-5 w-5 rounded border-sable text-mandarine focus-visible:outline-mandarine"
        />
        Oui, contactez-moi sur WhatsApp.
      </label>

      <p className="text-lg font-semibold text-encre">
        Total : {formatPrix(quantite * OFFER.PRIX)}
      </p>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Envoi…
          </>
        ) : (
          "Confirmer ma réservation"
        )}
      </button>
    </form>
  );
}
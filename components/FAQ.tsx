import { ChevronDown } from "lucide-react";
import Backdrop from "@/components/Backdrop";

const questions = [
  {
    q: "Quand aura lieu la promotion ?",
    a: "Le samedi 12 septembre 2026.",
  },
  {
    q: "Où puis-je récupérer ma commande ?",
    a: "À Fidjrossè, Cotonou. Nous vous envoyons le point de retrait exact sur WhatsApp.",
  },
  {
    q: "Comment réserver ?",
    a: "Cliquez sur « Réserver », remplissez le formulaire qui s'ouvre, ou écrivez-nous directement sur WhatsApp.",
  },
];

export default function FAQ() {
  return (
    <section
      id="questions"
      className="relative scroll-mt-14 overflow-hidden px-6 py-16 md:scroll-mt-16 md:px-12"
    >
      <Backdrop variant="paper" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl font-extrabold text-encre sm:text-4xl">
          Questions fréquentes
        </h2>

        <div className="mt-8 flex flex-col gap-3">
          {questions.map(({ q, a }, index) => (
            <details
              key={q}
              name="faq"
              open={index === 0}
              className="group rounded-card border border-sable bg-creme p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-encre">
                {q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-encre/50 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-encre/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

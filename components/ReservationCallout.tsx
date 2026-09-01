import Backdrop from "@/components/Backdrop";
import ReserveButton from "@/components/ReserveButton";

export default function ReservationCallout() {
  return (
    <section
      id="reserver"
      className="relative scroll-mt-14 overflow-hidden px-6 py-20 md:scroll-mt-16 md:px-12"
    >
      <Backdrop variant="paper" />
      <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center gap-5 text-center">
        <h2 className="font-display text-3xl font-extrabold text-encre sm:text-4xl">
          Réservez votre combo
        </h2>
        <p className="text-encre/70">
          Deux champs, dix secondes. On confirme sur WhatsApp.
        </p>
        <ReserveButton className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
          Réserver mon combo
        </ReserveButton>
        <p className="text-sm text-encre/50">
          Aucun paiement en ligne. Vous payez au retrait.
        </p>
      </div>
    </section>
  );
}

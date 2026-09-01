import { OFFER } from "@/lib/offer";
import Countdown from "@/components/Countdown";
import PromoPrice from "@/components/PromoPrice";
import Backdrop from "@/components/Backdrop";
import ReserveButton from "@/components/ReserveButton";

export default function PromoBanner() {
  return (
    <section className="px-4 py-4 md:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-banner bg-encre px-6 py-12 text-center sm:px-12 md:py-9">
        <Backdrop variant="dark" />
        <div className="relative z-10">
          <PromoPrice />

          <div className="mt-4 flex flex-col gap-1 text-creme/80">
            <p>{OFFER.DATE_EVENEMENT_LABEL}</p>
            <p>{OFFER.LIEU}</p>
            <p>1 combo = 1 personne</p>
          </div>

          <div className="mt-8 flex justify-center">
            <Countdown />
          </div>

          <ReserveButton className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Je réserve
          </ReserveButton>
        </div>
      </div>
    </section>
  );
}

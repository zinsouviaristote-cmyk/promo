import { OFFER } from "@/lib/offer";
import Countdown from "@/components/Countdown";
import PromoPrice from "@/components/PromoPrice";

export default function PromoBanner() {
  return (
    <section className="px-4 py-4 md:px-8">
      <div className="mx-auto max-w-4xl rounded-banner bg-encre px-6 py-12 text-center sm:px-12">
        <PromoPrice />

        <div className="mt-4 flex flex-col gap-1 text-creme/80">
          <p>{OFFER.DATE_EVENEMENT_LABEL}</p>
          <p>{OFFER.LIEU}</p>
          <p>1 combo = 1 personne</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Countdown />
        </div>

        <a
          href="#reserver"
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Je réserve
        </a>
      </div>
    </section>
  );
}

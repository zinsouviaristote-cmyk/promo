import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { OFFER, formatFCFA } from "@/lib/offer";
import { heroImage } from "@/lib/image-manifest";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center gap-10 px-6 pb-16 pt-10 md:grid md:min-h-[90svh] md:grid-cols-2 md:items-center md:gap-12 md:px-12 lg:px-20">
      <div className="order-1 md:order-2">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card shadow-[0_20px_50px_-15px_rgba(23,19,16,0.35)] md:max-w-md">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            placeholder="blur"
            blurDataURL={heroImage.blurDataURL}
            sizes="(min-width: 768px) 420px, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="order-2 flex flex-col items-start gap-6 md:order-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-basilic/10 px-4 py-1.5 text-sm font-medium text-basilic">
          🎉 Promotion spéciale
        </span>

        <h1 className="font-display text-4xl font-extrabold leading-tight text-encre sm:text-5xl md:text-6xl">
          Un combo gourmand à {formatFCFA(OFFER.PRIX)}
        </h1>

        <p className="text-lg text-encre/80 md:text-xl">
          Sandwich + Yaourt + Mignardises
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-basilic">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {OFFER.DATE_EVENEMENT_LABEL}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            {OFFER.LIEU}
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#reserver"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-mandarine px-8 py-3.5 text-base font-semibold text-creme transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Réserver mon combo
          </a>
          <a
            href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-encre/20 px-8 py-3.5 text-base font-semibold text-encre transition-colors hover:bg-encre/5"
          >
            Écrire sur WhatsApp
          </a>
        </div>

        <p className="text-sm text-encre/60">
          Quantités limitées — réservez dès maintenant.
        </p>
      </div>

      <div id="hero-sentinel" aria-hidden className="pointer-events-none absolute bottom-0 h-px w-full" />
    </section>
  );
}

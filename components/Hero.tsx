"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, MapPin } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { OFFER, formatFCFA } from "@/lib/offer";
import { heroImage } from "@/lib/image-manifest";

const STAGGER = 0.08;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center gap-4 px-6 pb-6 pt-6 md:grid md:min-h-[90svh] md:grid-cols-2 md:items-center md:gap-12 md:px-12 md:pb-16 md:pt-10 lg:px-20">
      <div className="order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/5] max-h-[30svh] w-full max-w-sm overflow-hidden rounded-card shadow-[0_20px_50px_-15px_rgba(23,19,16,0.35)] md:max-h-none md:max-w-md"
        >
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
        </motion.div>
      </div>

      <div className="order-2 flex flex-col items-start gap-3 md:order-1 md:gap-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full bg-basilic/10 px-4 py-1.5 text-sm font-medium text-basilic"
        >
          🎉 Promotion spéciale
        </motion.span>

        <TextEffect
          as="h1"
          per="word"
          preset="fade-in-blur"
          delay={STAGGER}
          className="font-display text-3xl font-extrabold leading-tight text-encre sm:text-5xl md:text-6xl"
        >
          {`Un combo gourmand à ${formatFCFA(OFFER.PRIX)}`}
        </TextEffect>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: "easeOut", delay: STAGGER * 2 }}
          className="flex flex-col items-start gap-2"
        >
          <p className="text-base text-encre/80 md:text-xl">
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
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: "easeOut", delay: STAGGER * 3 }}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
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
        </motion.div>

        <p className="pr-14 text-sm text-encre/60 md:pr-0">
          Quantités limitées — réservez dès maintenant.
        </p>
      </div>

      <div id="hero-sentinel" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}

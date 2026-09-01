"use client";

import { motion } from "motion/react";
import Backdrop from "@/components/Backdrop";

const STEPS = [
  {
    n: 1,
    title: "Réservez en 30 secondes",
    text: "Nom, numéro, nombre de combos.",
  },
  {
    n: 2,
    title: "On vous confirme sur WhatsApp",
    text: "Un message pour valider votre commande et vous donner le point de retrait exact.",
  },
  {
    n: 3,
    title: "Vous récupérez samedi",
    text: "À Fidjrossè, et vous payez sur place.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-12 md:py-12">
      <Backdrop variant="paper" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-extrabold text-encre sm:text-4xl">
          Comment ça marche
        </h2>

        <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute left-6 top-0 hidden h-full w-px bg-sable md:left-0 md:top-6 md:h-px md:w-full"
          />

          {STEPS.map(({ n, title, text }, index) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.12 }}
              className="relative flex gap-4 md:flex-col md:gap-4"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-encre font-display text-lg font-extrabold text-creme">
                {n}
              </span>
              <div className="flex flex-col gap-1.5 pt-1 md:pt-0">
                <p className="font-display text-lg font-extrabold text-encre">
                  {title}
                </p>
                <p className="text-sm text-encre/70">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

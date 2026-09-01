"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { InView } from "@/components/motion-primitives/in-view";
import { OFFER, formatFCFA } from "@/lib/offer";

export default function PromoPrice() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <InView
      viewOptions={{ once: true, amount: 0.6 }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-end justify-center gap-3">
        <p
          ref={ref}
          className="font-display text-6xl font-extrabold text-mandarine sm:text-7xl"
        >
          <AnimatedNumber
            value={inView ? OFFER.PRIX : 0}
            format={(n) => formatFCFA(n)}
            springOptions={{ bounce: 0, duration: 1200 }}
          />
        </p>
        {OFFER.PRIX_HABITUEL && (
          <p className="pb-2 font-display text-2xl font-medium text-creme/50 line-through">
            {formatFCFA(OFFER.PRIX_HABITUEL)}
          </p>
        )}
      </div>
    </InView>
  );
}

"use client";

import { useEffect, useState } from "react";
import { OFFER, formatFCFA } from "@/lib/offer";

export default function StickyBar() {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sable bg-creme/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        heroVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <span className="font-display text-lg font-extrabold text-encre">
          {formatFCFA(OFFER.PRIX)}
          <span className="ml-1 font-sans text-sm font-normal text-encre/60">
            / combo
          </span>
        </span>
        <a
          href="#reserver"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-mandarine px-6 py-2.5 text-sm font-semibold text-creme transition-transform active:scale-95"
        >
          Réserver
        </a>
      </div>
    </div>
  );
}

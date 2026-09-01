"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { OFFER } from "@/lib/offer";

export default function WhatsAppFloatButton() {
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
    <a
      href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire sur WhatsApp"
      className={`fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-basilic text-creme shadow-lg transition-[bottom] duration-300 md:bottom-6 ${
        heroVisible ? "bottom-6" : "bottom-[5.5rem]"
      }`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}

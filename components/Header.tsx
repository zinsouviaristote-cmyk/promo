"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import ReserveButton from "@/components/ReserveButton";
import { OFFER, formatFCFA } from "@/lib/offer";

const LINKS = [
  { id: "combo", label: "Le combo" },
  { id: "infos", label: "Infos" },
  { id: "questions", label: "Questions" },
];

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const { id } of LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className={`fixed inset-x-0 top-0 z-40 h-14 transition-colors duration-300 md:h-16 ${
        scrolled
          ? "border-b border-sable bg-creme/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-encre text-xs font-bold text-creme">
            TT
          </span>
          <span className="hidden font-display text-sm font-extrabold text-encre md:inline">
            Table Thérapeutique
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative py-2 text-sm font-medium text-encre/70 transition-colors hover:text-encre"
            >
              {label}
              {activeId === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-mandarine"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-basilic/10 px-3 py-1 text-xs font-semibold text-basilic md:inline">
            {formatFCFA(OFFER.PRIX)}
          </span>
          <ReserveButton className="inline-flex h-9 min-h-[36px] items-center justify-center rounded-full bg-mandarine px-4 text-sm font-semibold text-creme transition-transform hover:scale-[1.02] active:scale-[0.98] md:h-10 md:min-h-[40px] md:px-6">
            Réserver
          </ReserveButton>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-mandarine"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}

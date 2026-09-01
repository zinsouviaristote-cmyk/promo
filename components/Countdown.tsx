"use client";

import { useEffect, useState } from "react";
import { OFFER } from "@/lib/offer";

type TimeLeft = { jours: number; heures: number; minutes: number } | null;

function computeTimeLeft(): TimeLeft {
  const diff = new Date(OFFER.DATE_EVENEMENT_ISO).getTime() - Date.now();
  if (diff <= 0) return null;

  const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
  const heures = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { jours, heures, minutes };
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(computeTimeLeft());
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <div className="h-[3.25rem]" aria-hidden />;
  }

  if (timeLeft === null) {
    return (
      <p className="text-creme/80">
        L&rsquo;événement a eu lieu — écrivez-nous pour la prochaine date.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4 font-display text-2xl font-extrabold tabular-nums text-creme sm:text-3xl">
      <span>{timeLeft.jours}j</span>
      <span>{timeLeft.heures}h</span>
      <span>{timeLeft.minutes}min</span>
    </div>
  );
}

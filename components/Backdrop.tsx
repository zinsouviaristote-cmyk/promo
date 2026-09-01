"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { colors, withAlpha } from "@/lib/theme";
import { UTENSIL_LAYOUT, UTENSIL_PATHS, type UtensilSpec } from "@/components/backdrop-icons";

type BackdropVariant = "paper" | "dark" | "halo";

function BreathingHalos() {
  const reducedMotion = useReducedMotion();
  const breathe = reducedMotion
    ? undefined
    : { scale: [1, 1.06, 1], opacity: [0.85, 1.15, 0.85] };

  return (
    <>
      <motion.div
        className="absolute -right-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(colors.mandarine, 0.08)}, transparent)`,
          filter: "blur(90px)",
        }}
        animate={breathe}
        transition={{ duration: 14, delay: 0, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 h-[55vw] w-[55vw] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(colors.basilic, 0.06)}, transparent)`,
          filter: "blur(90px)",
        }}
        animate={breathe}
        transition={{ duration: 14, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function UtensilIcon({
  spec,
  scrollYProgress,
  reducedMotion,
}: {
  spec: UtensilSpec;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const amplitude = Math.min(40, (spec.size / 40) * 40);
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : amplitude]);

  return (
    <motion.div
      className="absolute"
      style={{ top: spec.top, left: spec.left, y }}
    >
      <motion.svg
        width={spec.size}
        height={spec.size}
        viewBox="0 0 24 24"
        initial={{ rotate: spec.rotate }}
        animate={
          reducedMotion
            ? undefined
            : { y: [-10, 10, -10], rotate: [spec.rotate - 4, spec.rotate + 4, spec.rotate - 4] }
        }
        transition={{ duration: spec.duration, delay: spec.delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d={UTENSIL_PATHS[spec.icon]}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

function UtensilsLayer({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0.05, color }}
    >
      {UTENSIL_LAYOUT.map((spec, i) => (
        <UtensilIcon
          key={i}
          spec={spec}
          scrollYProgress={scrollYProgress}
          reducedMotion={Boolean(reducedMotion)}
        />
      ))}
    </div>
  );
}

export default function Backdrop({ variant }: { variant: BackdropVariant }) {
  if (variant === "paper") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${withAlpha(colors.sable, 0.05)} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",
        }}
      />
    );
  }

  if (variant === "dark") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              `radial-gradient(ellipse at 50% 0%, ${withAlpha(colors.mandarine, 0.1)}, transparent 60%)`,
              `radial-gradient(circle, ${withAlpha(colors.mandarine, 0.06)} 1px, transparent 1px)`,
            ].join(", "),
            backgroundSize: "auto, 28px 28px",
          }}
        />
        <BreathingHalos />
        <UtensilsLayer color={colors.mandarine} />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <BreathingHalos />
      <UtensilsLayer color={colors.encre} />
    </div>
  );
}

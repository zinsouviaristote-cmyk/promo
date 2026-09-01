"use client";

import { useState } from "react";
import {
  colors,
  logoAccentOnDarkHover,
  logoAccentOnLight,
  logoAccentOnLightHover,
} from "@/lib/theme";
import { ACTIVE_LOGO_VARIANT, LOGO_VARIANTS, type LogoVariant } from "@/lib/logo";

type Props = {
  variant?: LogoVariant;
  onDark?: boolean;
  mode?: "inline" | "footer";
  className?: string;
  /** Désactive le repli "Table T." sous 480px (utilisé sur la route /logo). */
  noShorten?: boolean;
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Logo({
  variant,
  onDark = false,
  mode = "inline",
  className,
  noShorten = false,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const v = variant ?? LOGO_VARIANTS[ACTIVE_LOGO_VARIANT];

  const tableColor = onDark ? colors.creme : colors.encre;
  const accentColor = onDark
    ? hovered
      ? logoAccentOnDarkHover
      : colors.mandarine
    : hovered
      ? logoAccentOnLightHover
      : logoAccentOnLight;

  const fontVariationSettings = `"SOFT" ${v.soft}, "WONK" 1`;

  const tableStyle = {
    fontFamily: "var(--font-logo)",
    fontWeight: v.tableWeight,
    fontVariationSettings,
    color: tableColor,
  };

  const accentStyle = {
    fontFamily: "var(--font-logo)",
    fontWeight: v.theraWeight,
    fontVariationSettings,
    color: accentColor,
    transition: "color 200ms ease",
  };

  if (mode === "footer") {
    return (
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          scrollToTop();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Table Thérapeutique — retour en haut"
        className={`inline-flex flex-col items-center text-center leading-[1.1] ${className ?? ""}`}
        style={{ letterSpacing: "-0.015em" }}
      >
        <span style={tableStyle}>Table</span>
        <span style={accentStyle}>Thérapeutique</span>
      </a>
    );
  }

  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        scrollToTop();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Table Thérapeutique — retour en haut"
      className={`inline-flex items-baseline leading-snug ${className ?? ""}`}
      style={{ letterSpacing: "-0.015em" }}
    >
      <span style={tableStyle}>Table&nbsp;</span>
      {noShorten ? (
        <span style={accentStyle}>Thérapeutique</span>
      ) : (
        <>
          <span style={accentStyle} className="hidden min-[480px]:inline">
            Thérapeutique
          </span>
          <span style={accentStyle} className="inline min-[480px]:hidden">
            T.
          </span>
        </>
      )}
    </a>
  );
}

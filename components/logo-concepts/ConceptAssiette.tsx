type Props = {
  variant?: "filled" | "outline";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Concept 1 — Assiette vue de dessus.
 * Un cercle épais, fourchette et cuillère en négatif (filled) ou en trait
 * (outline) de part et d'autre.
 */
export function AssietteMark({ variant = "filled", className, style }: Props) {
  if (variant === "outline") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden>
        <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="3" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M14 15v8M17 15v8M20 15v8M14 15h6" />
          <path d="M17 23v10" />
          <path d="M31 23c-2.5-1-2.5-9 0-8s2.5 7 0 8Z" />
          <path d="M31 23v10" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <defs>
        <mask id="assiette-mask">
          <rect width="48" height="48" fill="white" />
          <g fill="black">
            <rect x="14" y="14" width="2.4" height="10" />
            <rect x="17.3" y="14" width="2.4" height="10" />
            <rect x="20.6" y="14" width="2.4" height="10" />
            <rect x="14" y="14" width="9" height="2.4" />
            <rect x="16.8" y="22" width="2.4" height="12" />
            <ellipse cx="31" cy="19" rx="3.4" ry="5.2" />
            <rect x="29.8" y="23" width="2.4" height="11" />
          </g>
        </mask>
      </defs>
      <circle cx="24" cy="24" r="19" fill="currentColor" mask="url(#assiette-mask)" />
    </svg>
  );
}

export function AssietteLockup({ variant = "filled", className }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <AssietteMark variant={variant} className="h-8 w-8 shrink-0" />
      <span className="font-display text-base font-extrabold leading-none">
        Table Thérapeutique
      </span>
    </div>
  );
}

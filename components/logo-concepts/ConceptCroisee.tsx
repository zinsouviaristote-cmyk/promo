type Props = {
  variant?: "filled" | "outline";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Concept 2 — Fourchette et cuillère croisées en X, arc de cloche au-dessus.
 */
export function CroiseeMark({ variant = "filled", className, style }: Props) {
  const strokeWidth = variant === "filled" ? 3.4 : 2.6;

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M11 15a13 10 0 0 1 26 0"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 16v5M18 16v5M21 16v5M15 16h6M18 21L34 37" />
        <path d="M33 16c-3 0-3 6 0 7c3-1 3-7 0-7Z" />
        <path d="M33 22L14 37" />
      </g>
    </svg>
  );
}

export function CroiseeLockup({ variant = "filled", className }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <CroiseeMark variant={variant} className="h-8 w-8 shrink-0" />
      <span className="font-display text-base font-extrabold leading-none">
        Table Thérapeutique
      </span>
    </div>
  );
}

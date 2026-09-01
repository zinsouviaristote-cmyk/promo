type Props = {
  variant?: "filled" | "outline";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Concept 3 — "T" dont la barre verticale est un manche de cuillère et la
 * barre horizontale porte trois dents de fourchette.
 */
export function TMark({ variant = "filled", className, style }: Props) {
  const strokeWidth = variant === "filled" ? 4 : 3;

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M10 10h28" />
        <path d="M17 10v-4M24 10v-4M31 10v-4" />
        <path d="M24 10v20" />
      </g>
      {variant === "filled" ? (
        <ellipse cx="24" cy="37" rx="6" ry="8" fill="currentColor" />
      ) : (
        <ellipse cx="24" cy="37" rx="6" ry="8" stroke="currentColor" strokeWidth={strokeWidth} />
      )}
    </svg>
  );
}

export function TLockup({ variant = "filled", className }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <TMark variant={variant} className="h-8 w-8 shrink-0" />
      <span className="font-display text-base font-extrabold leading-none">
        Table Thérapeutique
      </span>
    </div>
  );
}

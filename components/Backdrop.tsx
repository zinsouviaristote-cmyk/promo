import { colors, withAlpha } from "@/lib/theme";

type BackdropVariant = "paper" | "dark" | "halo";

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            `radial-gradient(ellipse at 50% 0%, ${withAlpha(colors.mandarine, 0.1)}, transparent 60%)`,
            `radial-gradient(circle, ${withAlpha(colors.mandarine, 0.06)} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "auto, 28px 28px",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute -right-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(colors.mandarine, 0.08)}, transparent)`,
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-1/4 -left-1/4 h-[55vw] w-[55vw] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(colors.basilic, 0.06)}, transparent)`,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

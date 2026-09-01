import Logo from "@/components/Logo";
import { LOGO_VARIANTS } from "@/lib/logo";

export const metadata = {
  title: "Choix du logo — Table Thérapeutique",
  robots: { index: false, follow: false },
};

const SIZES = [17, 24, 56] as const;
const BACKGROUNDS = [
  { key: "creme", label: "Fond crème", bg: "bg-creme", onDark: false },
  { key: "encre", label: "Fond encre", bg: "bg-encre", onDark: true },
] as const;

export default function LogoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-12">
      <h1 className="font-display text-3xl font-extrabold text-encre sm:text-4xl">
        Choix du logo
      </h1>
      <p className="mt-2 max-w-2xl text-encre/70">
        Wordmark typographique pur, trois réglages de Fraunces à comparer, à
        17px / 24px / 56px, sur fond crème et fond encre. Route temporaire —
        à retirer une fois la variante choisie.
      </p>

      <div className="mt-12 flex flex-col gap-16">
        {(Object.entries(LOGO_VARIANTS) as [string, (typeof LOGO_VARIANTS)[1]][]).map(
          ([key, variant]) => (
            <section key={key} className="flex flex-col gap-6">
              <div>
                <h2 className="font-display text-xl font-extrabold text-encre">
                  Variante {key} — {variant.label}
                </h2>
                <p className="text-sm text-encre/60">{variant.description}</p>
              </div>

              <div className="flex flex-col gap-6">
                {BACKGROUNDS.map(({ key: bgKey, label, bg, onDark }) => (
                  <div key={bgKey} className="flex flex-col gap-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-encre/50">
                      {label}
                    </p>
                    <div className="flex flex-col gap-3">
                      {SIZES.map((size) => (
                        <div
                          key={size}
                          className={`flex items-center gap-4 rounded-card border border-sable px-6 py-5 ${bg}`}
                        >
                          <span
                            className={`w-12 shrink-0 text-xs ${onDark ? "text-creme/40" : "text-encre/40"}`}
                          >
                            {size}px
                          </span>
                          <div style={{ fontSize: size }}>
                            <Logo variant={variant} onDark={onDark} noShorten />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </main>
  );
}

import { AssietteMark, AssietteLockup } from "@/components/logo-concepts/ConceptAssiette";
import { CroiseeMark, CroiseeLockup } from "@/components/logo-concepts/ConceptCroisee";
import { TMark, TLockup } from "@/components/logo-concepts/ConceptT";

export const metadata = {
  title: "Choix du logo — Table Thérapeutique",
  robots: { index: false, follow: false },
};

const SIZES = [24, 48, 200] as const;
const BACKGROUNDS = [
  { key: "creme", label: "Fond crème", bg: "bg-creme", fg: "text-encre" },
  { key: "encre", label: "Fond encre", bg: "bg-encre", fg: "text-creme" },
] as const;
const VARIANTS = ["filled", "outline"] as const;

const CONCEPTS = [
  {
    id: 1,
    name: "Concept 1 — Assiette vue de dessus",
    description:
      "Cercle épais, fourchette et cuillère en négatif dans le disque.",
    Mark: AssietteMark,
    Lockup: AssietteLockup,
  },
  {
    id: 2,
    name: "Concept 2 — Fourchette et cuillère croisées",
    description: "Un X formé par les deux couverts, arc de cloche au-dessus.",
    Mark: CroiseeMark,
    Lockup: CroiseeLockup,
  },
  {
    id: 3,
    name: "Concept 3 — Le « T » couvert",
    description:
      "Barre verticale = manche de cuillère, barre horizontale = dents de fourchette.",
    Mark: TMark,
    Lockup: TLockup,
  },
] as const;

export default function LogoPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-12">
      <h1 className="font-display text-3xl font-extrabold text-encre sm:text-4xl">
        Choix du logo
      </h1>
      <p className="mt-2 max-w-2xl text-encre/70">
        Trois concepts, chacun en 24px / 48px / 200px, sur fond crème et fond
        encre, en version pleine et en version contour. Route temporaire — à
        retirer une fois le concept choisi.
      </p>

      <div className="mt-12 flex flex-col gap-16">
        {CONCEPTS.map(({ id, name, description, Mark, Lockup }) => (
          <section key={id} className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-xl font-extrabold text-encre">
                {name}
              </h2>
              <p className="text-sm text-encre/60">{description}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-3">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium uppercase tracking-wide text-encre/50">
                      Fond / version
                    </th>
                    {SIZES.map((size) => (
                      <th
                        key={size}
                        className="text-left text-xs font-medium uppercase tracking-wide text-encre/50"
                      >
                        {size}px
                      </th>
                    ))}
                    <th className="text-left text-xs font-medium uppercase tracking-wide text-encre/50">
                      Lockup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BACKGROUNDS.map(({ key: bgKey, label, bg, fg }) =>
                    VARIANTS.map((variant) => (
                      <tr key={`${bgKey}-${variant}`}>
                        <td className="whitespace-nowrap text-sm text-encre/70">
                          {label} · {variant === "filled" ? "pleine" : "contour"}
                        </td>
                        {SIZES.map((size) => (
                          <td key={size}>
                            <div
                              className={`flex items-center justify-center rounded-card border border-sable ${bg} ${fg}`}
                              style={{ width: size + 32, height: size + 32 }}
                            >
                              <Mark variant={variant} style={{ width: size, height: size }} />
                            </div>
                          </td>
                        ))}
                        <td>
                          <div
                            className={`flex items-center rounded-card border border-sable px-4 py-3 ${bg} ${fg}`}
                          >
                            <Lockup variant={variant} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

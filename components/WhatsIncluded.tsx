import Image from "next/image";
import { Cookie, Milk, Sandwich as SandwichIcon } from "lucide-react";
import { cardImages } from "@/lib/image-manifest";
import { OFFER, formatFCFA } from "@/lib/offer";

const items = [
  {
    key: "sandwich",
    icon: SandwichIcon,
    nom: "Sandwich",
    description: "Un sandwich gourmand préparé avec soin.",
    image: cardImages.sandwich,
  },
  {
    key: "yaourt",
    icon: Milk,
    nom: "Yaourt",
    description: "Un yaourt frais pour accompagner votre repas.",
    image: cardImages.yaourt,
  },
  {
    key: "mignardises",
    icon: Cookie,
    nom: "Mignardises",
    description: "Une sélection de petites douceurs.",
    image: cardImages.mignardises,
  },
] as const;

export default function WhatsIncluded() {
  return (
    <section className="px-6 py-16 md:px-12">
      <h2 className="text-center font-display text-3xl font-extrabold text-encre sm:text-4xl">
        Votre combo à {formatFCFA(OFFER.PRIX)}
      </h2>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {items.map(({ key, icon: Icon, nom, description, image }) => (
          <div
            key={key}
            className="overflow-hidden rounded-card border border-sable bg-creme"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <Icon className="h-6 w-6 text-mandarine" aria-hidden />
              <p className="font-display text-lg font-extrabold text-encre">
                {nom}
              </p>
              <p className="text-sm text-encre/70">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

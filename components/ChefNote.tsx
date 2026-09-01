import Image from "next/image";
import { Clock, PackageCheck, Timer } from "lucide-react";
import Backdrop from "@/components/Backdrop";
import { chefImage } from "@/lib/image-manifest";

const POINTS = [
  { icon: Clock, label: "Préparé le jour même" },
  { icon: PackageCheck, label: "Quantité limitée" },
  { icon: Timer, label: "Retrait rapide" },
];

export default function ChefNote() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-12 md:py-12">
      <Backdrop variant="paper" />
      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card md:max-w-none">
          <Image
            src={chefImage.src}
            alt={chefImage.alt}
            fill
            sizes="(min-width: 768px) 480px, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-3xl font-extrabold text-encre sm:text-4xl">
            Fait le matin même, à Fidjrossè
          </h2>
          <p className="text-encre/70">
            Chaque combo est préparé le jour de la vente. Le sandwich est
            monté à la commande, le yaourt sort du frais, les mignardises
            sortent du four le matin.
          </p>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            {POINTS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-sm font-medium text-basilic"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

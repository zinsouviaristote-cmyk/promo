import { CalendarDays, MapPin, Phone, Wallet } from "lucide-react";
import { OFFER, formatFCFA } from "@/lib/offer";

const items = [
  { icon: MapPin, label: "Où ?", value: OFFER.LIEU },
  { icon: CalendarDays, label: "Quand ?", value: OFFER.DATE_EVENEMENT_LABEL },
  { icon: Wallet, label: "Prix", value: `${formatFCFA(OFFER.PRIX)} / combo` },
  {
    icon: Phone,
    label: "Contact",
    value: OFFER.WHATSAPP_NUMERO_AFFICHAGE,
    href: `tel:+${OFFER.WHATSAPP_NUMERO_E164}`,
  },
];

export default function PracticalInfo() {
  const message = encodeURIComponent(
    "Bonjour, je souhaite réserver un combo à 2 000 FCFA pour le 12 septembre."
  );

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {items.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <>
              <Icon className="h-6 w-6 text-basilic" aria-hidden />
              <p className="text-sm font-medium text-encre/60">{label}</p>
              <p className="font-medium text-encre">{value}</p>
            </>
          );

          return href ? (
            <a
              key={label}
              href={href}
              className="flex flex-col items-start gap-1.5 rounded-card border border-sable bg-creme p-5"
            >
              {content}
            </a>
          ) : (
            <div
              key={label}
              className="flex flex-col items-start gap-1.5 rounded-card border border-sable bg-creme p-5"
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-6 max-w-4xl">
        <a
          href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] w-full items-center justify-center rounded-full border border-encre/20 px-8 py-3.5 text-base font-semibold text-encre transition-colors hover:bg-encre/5"
        >
          Nous contacter sur WhatsApp
        </a>
      </div>
    </section>
  );
}

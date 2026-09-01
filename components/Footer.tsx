import { OFFER } from "@/lib/offer";

export default function Footer() {
  return (
    <footer className="rounded-t-footer bg-encre px-6 py-12 text-center text-creme md:px-12">
      <p className="font-display text-xl font-extrabold">Table Thérapeutique</p>
      <p className="mt-3 text-creme/80">📍 Cotonou, Fidjrossè</p>
      <a
        href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-creme/80 underline-offset-4 hover:underline"
      >
        📱 {OFFER.WHATSAPP_NUMERO_AFFICHAGE}
      </a>
      <p className="mt-6 text-sm text-creme/50">© 2026 Table Thérapeutique</p>
    </footer>
  );
}

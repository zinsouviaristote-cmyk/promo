import { MapPin, Phone } from "lucide-react";
import Backdrop from "@/components/Backdrop";
import Logo from "@/components/Logo";
import { OFFER } from "@/lib/offer";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-footer bg-encre px-6 py-12 text-center text-creme md:px-12">
      <Backdrop variant="dark" />
      <div className="relative z-10">
        <Logo mode="footer" onDark className="text-2xl" />
        <p className="mt-3 inline-flex items-center gap-2 text-creme/80">
          <MapPin className="h-4 w-4" aria-hidden />
          Cotonou, Fidjrossè
        </p>
        <a
          href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 text-creme/80 underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {OFFER.WHATSAPP_NUMERO_AFFICHAGE}
        </a>
        <p className="mt-6 text-sm text-creme/50">© 2026 Table Thérapeutique</p>
      </div>
    </footer>
  );
}

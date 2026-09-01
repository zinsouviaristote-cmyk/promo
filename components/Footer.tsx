import { MapPin, Phone } from "lucide-react";
import Backdrop from "@/components/Backdrop";
import Logo from "@/components/Logo";
import { OFFER } from "@/lib/offer";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-footer bg-encre px-6 py-10 text-creme md:px-12 md:py-12">
      <Backdrop variant="dark" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Layout Mobile (colonne) / Ordinateur (ligne distribuée) */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
          
          {/* Bloc 1 : Logo */}
          <div className="mb-6 md:mb-0">
            <Logo mode="footer" onDark className="text-2xl" />
          </div>

          {/* Bloc 2 : Coordonnées (Adresse + Téléphone) */}
          <div className="flex flex-col items-center gap-3 text-sm text-creme/80 sm:flex-row sm:gap-6 md:items-start md:gap-8">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-creme/60" aria-hidden />
              <span>Cotonou, Fidjrossè</span>
            </p>

            <a
              href={`https://wa.me/${OFFER.WHATSAPP_NUMERO_E164}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-creme/60" aria-hidden />
              <span>{OFFER.WHATSAPP_NUMERO_AFFICHAGE}</span>
            </a>
          </div>

          {/* Bloc 3 : Copyright */}
          <p className="mt-8 text-xs text-creme/50 md:mt-0">
            © 2026 Table Thérapeutique
          </p>
        </div>
      </div>
    </footer>
  );
}
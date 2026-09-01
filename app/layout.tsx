import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { OFFER } from "@/lib/offer";
import { ogImage } from "@/lib/image-manifest";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Combo gourmand à 2 000 FCFA — 12 septembre, Fidjrossè";
const DESCRIPTION =
  "Sandwich + Yaourt + Mignardises à 2 000 FCFA. Réservez votre combo pour le samedi 12 septembre 2026 à Fidjrossè, Cotonou.";

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Combo Table Thérapeutique : Sandwich + Yaourt + Mignardises",
  price: OFFER.PRIX,
  priceCurrency: "XOF",
  availability: "https://schema.org/LimitedAvailability",
  validThrough: OFFER.DATE_EVENEMENT_ISO,
  url: SITE_URL,
  areaServed: OFFER.LIEU,
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Table Thérapeutique",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [ogImage.src],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171310",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

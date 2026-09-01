import Hero from "@/components/Hero";
import WhatsIncluded from "@/components/WhatsIncluded";
import PromoBanner from "@/components/PromoBanner";
import ReservationForm from "@/components/ReservationForm";
import PracticalInfo from "@/components/PracticalInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatsIncluded />
      <PromoBanner />

      <section id="reserver" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="font-display text-3xl font-extrabold text-encre sm:text-4xl">
            Réservez votre combo
          </h2>
          <p className="mt-3 text-encre/70">
            Deux champs, dix secondes. On confirme sur WhatsApp.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-[560px]">
          <ReservationForm />
        </div>
      </section>

      <PracticalInfo />
      <FAQ />
      <Footer />
    </main>
  );
}

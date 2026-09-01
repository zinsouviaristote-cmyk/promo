import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsIncluded from "@/components/WhatsIncluded";
import ChefNote from "@/components/ChefNote";
import PromoBanner from "@/components/PromoBanner";
import HowItWorks from "@/components/HowItWorks";
import ReservationCallout from "@/components/ReservationCallout";
import PracticalInfo from "@/components/PracticalInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <WhatsIncluded />
        <ChefNote />
        <PromoBanner />
        <HowItWorks />
        <ReservationCallout />
        <PracticalInfo />
        <FAQ />
        <Footer />
      </main>

      <WhatsAppFloatButton />
      <StickyBar />
    </>
  );
}

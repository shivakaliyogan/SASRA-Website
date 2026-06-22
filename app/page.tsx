import AboutSection from "@/components/AboutSection";
import AdminLink from "@/components/AdminLink";
import BooksSection from "@/components/BooksSection";
import ContactSection from "@/components/ContactSection";
import DailyPanchangam from "@/components/DailyPanchangam";
import Donations from "@/components/Donations";
import Festivals from "@/components/Festivals";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import LiveSpiritual from "@/components/LiveSpiritual";
import PoojaBooking from "@/components/PoojaBooking";
import SearchSection from "@/components/SearchSection";
import SpiritualKnowledge from "@/components/SpiritualKnowledge";
import TempleCards from "@/components/TempleCards";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <SearchSection />
      <AboutSection />
      <TempleCards />
      <PoojaBooking />
      <DailyPanchangam />
      <LiveSpiritual />
      <Donations />
      <BooksSection />
      <Festivals />
      <SpiritualKnowledge />
      <Gallery />
      <ContactSection />
      <AdminLink />
      <Footer />
    </main>
  );
}

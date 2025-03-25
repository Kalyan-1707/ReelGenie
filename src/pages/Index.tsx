
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import BrandLogos from "@/components/BrandLogos";
import CtaSection from "@/components/CtaSection";

/**
 * The Index component serves as the main entry point for the homepage layout.
 * It renders the primary sections of the page including the Hero, Features,
 * Testimonials, BrandLogos, and CtaSection components, encapsulated within
 * a main HTML element. The component ensures the content is displayed
 * with an overflow-hidden style for a clean layout.
 */
const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <Testimonials />
      <BrandLogos />
      <CtaSection />
    </main>
  );
};

export default Index;

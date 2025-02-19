
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import BrandLogos from "@/components/BrandLogos";
import CtaSection from "@/components/CtaSection";

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

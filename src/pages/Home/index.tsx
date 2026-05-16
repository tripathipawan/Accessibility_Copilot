import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scrollUtils";
import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ScoresSection from "@/components/home/ScoreSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      scrollToSection(id);
    }
  }, [location.hash]);

  return (
    <div>
      <HeroSection />
      <TrustedBy />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <ScoresSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
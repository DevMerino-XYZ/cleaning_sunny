import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ServicePlans from "@/components/sections/ServicePlans";
import FocusSection from "@/components/sections/FocusSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ServicePlans />
      <FocusSection />
      <FinalCTA />
    </main>
  );
}
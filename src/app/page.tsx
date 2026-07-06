import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ArchitectureSection from '@/components/sections/ArchitectureSection';
import AgentsSection from '@/components/sections/AgentsSection';
import DashboardPreview from '@/components/sections/DashboardPreview';
import ComputerVisionSection from '@/components/sections/ComputerVisionSection';
import AccessibilitySection from '@/components/sections/AccessibilitySection';
import SustainabilitySection from '@/components/sections/SustainabilitySection';
import TechStackSection from '@/components/sections/TechStackSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PricingSection from '@/components/sections/PricingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <ArchitectureSection />
        <AgentsSection />
        <DashboardPreview />
        <ComputerVisionSection />
        <AccessibilitySection />
        <SustainabilitySection />
        <TechStackSection />
        <TimelineSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

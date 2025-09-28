
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useExitIntent } from '@/hooks/useExitIntent';

// Import our landing page components
import HeroSection from '@/components/landing/HeroSection';
import PainPointsSection from '@/components/landing/PainPointsSection';
import SolutionOverview from '@/components/landing/SolutionOverview';
import FeatureBreakdown from '@/components/landing/FeatureBreakdown';
import ComparisonTable from '@/components/landing/ComparisonTable';
import HowItWorks from '@/components/landing/HowItWorks';
import OrganizationTips from '@/components/landing/OrganizationTips';
import TargetAudience from '@/components/landing/TargetAudience';
import PricingSection from '@/components/landing/PricingSection';
import FaqSection from '@/components/landing/FaqSection';
import FinalCta from '@/components/landing/FinalCta';
import ExitIntentCta from '@/components/landing/ExitIntentCta';

const Index = () => {
  // Refs for scroll navigation
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  // Exit intent with custom configuration
  const { showExitIntent, closeExitIntent } = useExitIntent({
    sensitivity: 50,          // Higher sensitivity (less trigger-happy)
    speedThreshold: 20,       // Require faster mouse movement
    showOnce: true,           // Only show once per session
    cookieDuration: 7,        // Remember for 7 days
    delayPeriod: 30000,       // Wait 30 seconds before enabling
    pageViewThreshold: 2      // Require at least 2 page views
  });
  
  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>PLR Organizer Pro | Ultimate PLR Content Management System</title>
        <meta name="description" content="Organize, manage and track your PLR content library. Our PLR content management software helps digital marketers maximize their PLR investments. Try free for 7 days." />
        <meta name="keywords" content="PLR organizer, PLR content management, PLR library, private label rights, content organization, PLR tools, batch editor, HTML editor, content spinner" />
        <meta property="og:title" content="PLR Organizer Pro | Ultimate PLR Content Management System" />
        <meta property="og:description" content="Organize, manage and track your PLR content library. Our PLR content management software helps digital marketers maximize their PLR investments." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plrorganizerpro.com" />
        <meta property="og:image" content="https://plrorganizerpro.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://plrorganizerpro.com" />
      </Helmet>

      {/* Header */}
      <Header showAuthButtons={true} />

      {/* Hero Section */}
      <HeroSection />

      {/* Pain Points Section */}
      <PainPointsSection />

      {/* Solution Overview */}
      <SolutionOverview featuresRef={featuresRef} />

      {/* Feature Breakdown */}
      <FeatureBreakdown />

      {/* How PLR Organizer Pro Compares */}
      <ComparisonTable />

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorks howItWorksRef={howItWorksRef} />
      </div>

      {/* PLR Organization Tips */}
      <OrganizationTips />

      {/* Target Audience - combined section */}
      <TargetAudience />

      {/* Pricing Section */}
      <PricingSection pricingRef={pricingRef} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA Section */}
      <FinalCta />

      {/* Footer */}
      <Footer />
      
      {/* Exit Intent CTA */}
      <ExitIntentCta show={showExitIntent} onClose={closeExitIntent} />
    </div>
  );
};

export default Index;

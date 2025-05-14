
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import our new landing page components
import HeroSection from '@/components/landing/HeroSection';
import PainPointsSection from '@/components/landing/PainPointsSection';
import SolutionOverview from '@/components/landing/SolutionOverview';
import FeatureBreakdown from '@/components/landing/FeatureBreakdown';
import ComparisonTable from '@/components/landing/ComparisonTable';
import HowItWorks from '@/components/landing/HowItWorks';
import OrganizationTips from '@/components/landing/OrganizationTips';
import TargetAudience from '@/components/landing/TargetAudience';
import UseCases from '@/components/landing/UseCases';
import PricingSection from '@/components/landing/PricingSection';
import FaqSection from '@/components/landing/FaqSection';
import FinalCta from '@/components/landing/FinalCta';
import ExitIntentCta from '@/components/landing/ExitIntentCta';
import QuickNavigation from '@/components/landing/QuickNavigation';

const Landing = () => {
  // Refs for scroll navigation
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const howItWorksRef = React.useRef<HTMLDivElement>(null);
  const pricingRef = React.useRef<HTMLDivElement>(null);
  
  // State for exit intent CTA
  const [showExitIntent, setShowExitIntent] = React.useState(false);
  
  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/WebPage">
      {/* Header */}
      <Header showAuthButtons={true} />
      
      {/* Breadcrumb for SEO */}
      <nav aria-label="Breadcrumb" className="container px-4 py-2">
        <ol className="flex text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/" className="text-primary" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
        </ol>
      </nav>

      {/* Quick Navigation */}
      <QuickNavigation 
        scrollToSection={scrollToSection}
        featuresRef={featuresRef}
        howItWorksRef={howItWorksRef}
        pricingRef={pricingRef}
      />

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
      <HowItWorks howItWorksRef={howItWorksRef} />

      {/* PLR Organization Tips */}
      <OrganizationTips />

      {/* Who This Is For */}
      <TargetAudience />

      {/* Use Cases Section */}
      <UseCases />

      {/* Pricing Section */}
      <PricingSection pricingRef={pricingRef} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA Section */}
      <FinalCta />

      {/* Footer */}
      <Footer />
      
      {/* Exit Intent CTA */}
      <ExitIntentCta show={showExitIntent} onClose={() => setShowExitIntent(false)} />
    </div>
  );
};

export default Landing;

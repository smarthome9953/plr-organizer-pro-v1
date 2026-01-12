import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingHeader from '@/components/landing-v2/LandingHeader';
import LandingFooter from '@/components/landing-v2/LandingFooter';
import HeroSection from '@/components/landing-v2/HeroSection';
import PainPointsSection from '@/components/landing-v2/PainPointsSection';
import SolutionSection from '@/components/landing-v2/SolutionSection';
import HowItWorksSection from '@/components/landing-v2/HowItWorksSection';
import TargetAudienceSection from '@/components/landing-v2/TargetAudienceSection';
import ComparisonSection from '@/components/landing-v2/ComparisonSection';

const LandingHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PLR Organizer Pro - Organize Your PLR Content Automatically</title>
        <meta name="description" content="The #1 desktop app for organizing PLR content. Scan, organize by niche, track licenses, and eliminate duplicate purchases. Get started today!" />
        <meta property="og:title" content="PLR Organizer Pro - Organize Your PLR Content Automatically" />
        <meta property="og:description" content="Stop drowning in disorganized PLR content. Start profiting with automatic organization." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://plrorganizerpro.com" />
      </Helmet>
      
      <LandingHeader />
      
      <main className="flex-1">
        <HeroSection />
        <PainPointsSection />
        <SolutionSection />
        <HowItWorksSection />
        <TargetAudienceSection />
        <ComparisonSection />
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default LandingHome;

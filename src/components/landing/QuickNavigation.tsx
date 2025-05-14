
import React from 'react';
import { Link } from 'react-router-dom';

interface QuickNavigationProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  featuresRef: React.RefObject<HTMLDivElement>;
  howItWorksRef: React.RefObject<HTMLDivElement>;
  pricingRef: React.RefObject<HTMLDivElement>;
}

const QuickNavigation = ({ scrollToSection, featuresRef, howItWorksRef, pricingRef }: QuickNavigationProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-2 hidden md:block">
      <div className="container px-4 flex justify-center space-x-6">
        <button 
          onClick={() => scrollToSection(featuresRef)} 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection(howItWorksRef)} 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          How It Works
        </button>
        <button 
          onClick={() => scrollToSection(pricingRef)} 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Pricing
        </button>
        <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
        <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
      </div>
    </div>
  );
};

export default QuickNavigation;

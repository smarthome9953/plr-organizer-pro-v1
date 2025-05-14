
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check } from 'lucide-react';

const FeatureBreakdown = () => {
  const features = [
    {
      title: "Intelligent Auto-Categorization System",
      description: "Our AI-powered PLR organization system automatically sorts your content by topic, type, quality, and potential use cases, saving you hours of manual organization.",
      image: "plr-organizer-auto-categorization.webp",
      features: [
        "Content type detection (eBooks, articles, videos, graphics, audios)",
        "Niche and topic classification with sub-category suggestions",
        "Quality scoring system based on content completeness and originality",
        "Custom tagging capabilities for your unique organizational needs"
      ]
    },
    {
      title: "Comprehensive Rights Management Tracker",
      description: "Never question what you can and can't do with your private label rights content. Our PLR tracking software monitors all license details and usage restrictions for every piece in your library.",
      image: "plr-organizer-rights-management.webp",
      features: [
        "License type identification and categorization",
        "Usage restriction alerts when planning content deployment",
        "Expiration date tracking for time-limited PLR content",
        "Distribution limitation warnings to prevent usage violations"
      ]
    },
    {
      title: "Usage History & Deployment Tracking",
      description: "Know exactly where and when you've used each piece of PLR content across your business with our digital content organizer to prevent duplication and maximize asset utilization.",
      image: "plr-organizer-usage-tracking.webp",
      features: [
        "Publication history log with timestamps and platforms",
        "Website/platform tracking across all your digital properties",
        "Modification records showing how content was adapted",
        "Audience exposure metrics to prevent content fatigue"
      ]
    },
    {
      title: "Advanced Search Across All PLR Content",
      description: "Find exactly what you need in seconds with our powerful PLR content management search engine that indexes the full text of all your private label rights assets.",
      image: "plr-organizer-advanced-search.webp",
      features: [
        "Full-text content search with semantic understanding",
        "Filter by multiple parameters (type, topic, license, usage)",
        "Keyword and phrase matching with relevance scoring",
        "Similar content suggestions to maximize your library"
      ]
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Master Your PLR Library</h2>
        
        <div className="grid gap-12">
          {features.map((feature, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg shadow-sm p-4">
                <AspectRatio ratio={4 / 3}>
                  <img 
                    src="/placeholder.svg" 
                    alt={`PLR Organizer Pro ${feature.title} - Streamline your PLR content management workflow`}
                    className="h-full w-full object-cover rounded-md"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBreakdown;

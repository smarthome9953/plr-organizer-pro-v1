
import React from 'react';
import { Search, Shield, FileText, Folder, Clock, TrendingUp } from 'lucide-react';

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: <Search className="h-8 w-8 text-purple-600" />,
      title: "Lost in the Shuffle",
      description: "Hours wasted searching for specific PLR assets buried in disorganized folders. Our digital content organizer's intelligent search indexes the full text of all your content for instant retrieval."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Usage Rights Confusion",
      description: "Unclear PLR usage rights and limitations leading to potential legal issues. Our PLR tracking software automatically extracts and monitors license details for every asset in your library."
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Content Duplication",
      description: "Accidentally purchasing duplicate PLR products or publishing the same content multiple times. Our system identifies duplicates and tracks where you've already deployed each piece across all your platforms."
    },
    {
      icon: <Folder className="h-8 w-8 text-purple-600" />,
      title: "Multi-Device Chaos",
      description: "Disorganized folders spread across multiple devices with no central system. Our PLR content management solution synchronizes your entire library across desktop and web interfaces for seamless access."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Deployment Amnesia",
      description: "Forgetting where you've already used specific PLR content in your business. Our deployment tracker creates a complete history for each piece, preventing accidental reuse across your projects."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "ROI Mystery",
      description: "Unable to track which PLR investments are actually paying off. Our analytics feature calculates return on investment for each PLR purchase based on your actual usage and revenue data."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Struggling With Your Growing PLR Collection?</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Managing private label rights content becomes increasingly challenging as your library grows. Here's why content creators and digital marketers choose PLR Organizer Pro to solve their biggest content management headaches.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

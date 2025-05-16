
import React from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Database, Tag, Settings, Cloud } from 'lucide-react';

const SolutionOverview = ({ featuresRef }: { featuresRef: React.RefObject<HTMLDivElement> }) => {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Centralized Library",
      description: "All your PLR content in one searchable database that automatically organizes by topic, format, and quality rating"
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "License Tracking",
      description: "Complete monitoring of PLR usage rights, restrictions, and expiration dates to ensure legal compliance across all your projects"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Auto-Categorization",
      description: "AI-powered sorting by topic, type, and quality with custom tagging capabilities for your unique organizational needs"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cross-Device Access",
      description: "Seamless sync between desktop and web interfaces with mobile optimization for managing your PLR library from anywhere"
    }
  ];

  return (
    <section className="py-16 md:py-24" ref={featuresRef}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Introducing the Complete PLR Content Management System</h2>
          <p className="text-muted-foreground max-w-[800px] mb-12">
            The only software specifically designed to help digital marketers, content creators, and PLR users organize, track, and maximize their private label rights investments. Now with 10+ integrated tools including Batch Editor, HTML Editor, Content Spinner, and more!
          </p>
          
          <div className="w-full max-w-4xl mb-16"> {/* Increased bottom margin */}
            <AspectRatio ratio={16 / 9} className="bg-muted relative">
              <div className="rounded-lg border bg-card shadow-lg overflow-hidden h-full">
                <div className="h-full w-full flex items-center justify-center bg-muted/70 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                  </div>
                  <video 
                    className="h-full w-full object-cover opacity-0" 
                    poster="/placeholder.svg" 
                    controls
                    preload="none"
                  >
                    <source src="https://example.com/plr-organizer-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 w-full mt-8 pt-4"> {/* Reduced top padding */}
            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">{item.icon}</div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <Button className="mt-12" size="lg" asChild>
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;

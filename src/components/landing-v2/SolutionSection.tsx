import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scan, FolderOpen, Shield, Layers, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Scan,
    title: "Smart PLR Detection",
    description: "Automatically finds all PLR content on your computer, even in compressed archives"
  },
  {
    icon: FolderOpen,
    title: "Auto-Organization",
    description: "Sorts content by niche and sub-niche using AI-powered categorization"
  },
  {
    icon: Shield,
    title: "License Tracking",
    description: "Track usage rights so you never violate license terms"
  },
  {
    icon: Layers,
    title: "Virtual Views",
    description: "See your content different ways without moving any files"
  },
  {
    icon: Wrench,
    title: "Built-in Tools",
    description: "Spin, edit, analyze, and rebrand content right inside the app"
  }
];

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One App to Organize Your Entire PLR Empire
          </h2>
          <p className="text-lg text-muted-foreground">
            PLR Organizer Pro transforms your chaotic content library into a well-organized, 
            searchable, and profitable asset.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/features">
              See All Features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Copy, AlertTriangle, Clock, FileQuestion } from 'lucide-react';

const painPoints = [
  {
    icon: Search,
    title: "Hours Wasted Searching",
    description: "Digging through folders trying to find that one PLR product you know you have somewhere..."
  },
  {
    icon: Copy,
    title: "Duplicate Purchases",
    description: "Buying the same PLR twice because you couldn't remember what you already own"
  },
  {
    icon: AlertTriangle,
    title: "License Confusion",
    description: "Unsure what rights you have, risking legal issues with improper content use"
  },
  {
    icon: Clock,
    title: "Wasted Content",
    description: "Great PLR sitting unused because it's buried in your disorganized library"
  },
  {
    icon: FileQuestion,
    title: "Publishing Duplicates",
    description: "Accidentally publishing the same content across multiple sites, hurting SEO"
  }
];

const PainPointsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Are You Drowning in PLR Chaos?
          </h2>
          <p className="text-lg text-muted-foreground">
            If any of these sound familiar, you're not alone. Most PLR buyers struggle with organization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <Card key={index} className="border-destructive/20 bg-card hover:border-destructive/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <point.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

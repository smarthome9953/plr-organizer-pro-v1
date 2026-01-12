import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, ShoppingBag, GraduationCap, PenTool } from 'lucide-react';

const audiences = [
  {
    icon: BookOpen,
    title: "Digital Product Creators",
    description: "Create courses, ebooks, and digital products from your PLR library efficiently."
  },
  {
    icon: Target,
    title: "Content Marketers",
    description: "Manage content campaigns across platforms without duplicate content issues."
  },
  {
    icon: ShoppingBag,
    title: "PLR Resellers",
    description: "Track inventory, licenses, and ROI for your reselling business."
  },
  {
    icon: GraduationCap,
    title: "Coaches & Consultants",
    description: "Use PLR for client materials while staying legally compliant."
  },
  {
    icon: PenTool,
    title: "Bloggers & Publishers",
    description: "Maintain editorial calendars and ensure content quality."
  }
];

const TargetAudienceSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Is PLR Organizer Pro For?
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for anyone who uses PLR content and wants to maximize their investment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <Card key={index} className="border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                  <audience.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{audience.title}</h3>
                <p className="text-muted-foreground text-sm">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;

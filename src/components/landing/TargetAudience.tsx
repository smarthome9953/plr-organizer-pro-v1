
import React from 'react';

const TargetAudience = () => {
  const audiences = [
    {
      title: "Content Marketers & Bloggers",
      description: "Manage your PLR article library for consistent blog publishing and content marketing campaigns across multiple niches without duplication or quality concerns."
    },
    {
      title: "Digital Product Creators",
      description: "Organize PLR content you use as components in your larger digital products, tracking modifications and ensuring compliance with license terms."
    },
    {
      title: "Course Creators & Coaches",
      description: "Keep track of educational PLR content used in your courses, workshops, and coaching programs across different topics and modules."
    },
    {
      title: "Niche Website Owners",
      description: "Manage PLR content deployed across multiple niche websites, tracking what's been published where to maintain unique content across properties."
    },
    {
      title: "Virtual Assistants & Agencies",
      description: "Organize PLR assets used for multiple clients, ensuring proper license usage and preventing accidental content duplication between clients."
    },
    {
      title: "Information Product Resellers",
      description: "Track your PLR product inventory, modifications, and deployment channels to maximize revenue from your PLR investments."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Who The PLR Organizer Pro Is For</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
          Our PLR content management software serves professionals across all niches who need to efficiently organize and maximize their private label rights investments.
        </p>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Whether you're in health, finance, business, self-development, or any other field using PLR content, our system adapts to your specific needs.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-card border rounded-lg shadow-sm p-6 hover:border-primary/20 transition-colors">
              <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

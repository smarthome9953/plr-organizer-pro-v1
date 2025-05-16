
import React from 'react';
import { Award, TrendingUp, Users, Settings, Database, FileText } from 'lucide-react';

const TargetAudience = () => {
  const niches = [
    {
      title: "Content Marketers & Bloggers",
      niche: "Health & Wellness",
      description: "Organize your health PLR by specific topics like weight loss, nutrition, fitness, mental health, and more. Our digital content organizer helps bloggers manage PLR article libraries for consistent publishing without duplication.",
      icon: <Award className="h-8 w-8 text-primary" />
    },
    {
      title: "Digital Product Creators",
      niche: "Business & Marketing",
      description: "Keep your business PLR organized by sub-niches like social media, SEO, email marketing, or entrepreneurship. Track PLR content used as components in your larger digital products, ensuring compliance with license terms.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    },
    {
      title: "Course Creators & Coaches",
      niche: "Personal Development",
      description: "Categorize personal growth PLR by topics like productivity, mindset, goal setting, and relationships. Keep track of educational PLR content used in your courses, workshops, and coaching programs.",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      title: "Niche Website Owners",
      niche: "Technology & Software",
      description: "Manage tech-focused PLR including tutorials, reviews, and guides. Track what's been published where to maintain unique content across multiple websites and prevent duplicate content penalties.",
      icon: <Settings className="h-8 w-8 text-primary" />
    },
    {
      title: "Virtual Assistants & Agencies",
      niche: "Finance & Investing",
      description: "Organize financial PLR by investment types, saving strategies, debt management, and more. Help multiple clients maintain compliance with usage restrictions for regulated finance topics, protecting their businesses.",
      icon: <Database className="h-8 w-8 text-primary" />
    },
    {
      title: "Information Product Resellers",
      niche: "Education & Courses",
      description: "Structure educational PLR content into course modules, worksheets, and assessments. Track your PLR product inventory, modifications, and deployment channels to maximize revenue from your PLR investments.",
      icon: <FileText className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Perfect PLR Organization For Every User & Niche</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Our PLR content management software serves professionals across all niches who need to efficiently organize and maximize their private label rights investments.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((item, index) => (
            <div key={index} className="bg-card border rounded-lg shadow-sm p-6 hover:border-primary/20 transition-colors">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">
                <span className="text-primary">{item.title}</span>
                <span className="text-sm font-medium block text-muted-foreground mt-1">{item.niche}</span>
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

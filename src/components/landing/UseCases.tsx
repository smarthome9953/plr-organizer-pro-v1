
import React from 'react';
import { Award, TrendingUp, Users, Settings, Database, FileText } from 'lucide-react';

const UseCases = () => {
  const niches = [
    {
      niche: "Health & Wellness",
      description: "Organize your health PLR by specific topics like weight loss, nutrition, fitness, mental health, and more. Our digital content organizer ensures you never publish duplicate health content, maintaining your credibility in this sensitive niche.",
      icon: <Award className="h-8 w-8 text-primary" />
    },
    {
      niche: "Business & Marketing",
      description: "Keep your business PLR organized by sub-niches like social media, SEO, email marketing, or entrepreneurship. Our PLR library management system helps you easily find the perfect content for your next marketing campaign or business training.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    },
    {
      niche: "Personal Development",
      description: "Categorize personal growth PLR by topics like productivity, mindset, goal setting, and relationships. Our PLR content management solution helps you access the right self-improvement content whenever inspiration strikes.",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      niche: "Technology & Software",
      description: "Manage tech-focused PLR including tutorials, reviews, and guides with our comprehensive PLR tracking software. Keep track of when content becomes outdated and needs updating or replacement to maintain relevance.",
      icon: <Settings className="h-8 w-8 text-primary" />
    },
    {
      niche: "Finance & Investing",
      description: "Organize financial PLR by investment types, saving strategies, debt management, and more. Our PLR organization system ensures compliance with usage restrictions for regulated finance topics, protecting your business.",
      icon: <Database className="h-8 w-8 text-primary" />
    },
    {
      niche: "Education & Courses",
      description: "Structure educational PLR content into course modules, worksheets, and assessments with our digital content organizer. Track where each component has been used across your educational products and platforms.",
      icon: <FileText className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Perfect for PLR Content Across Every Niche</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((item, index) => (
            <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.niche}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

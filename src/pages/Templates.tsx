
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Scale, Instagram } from 'lucide-react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface TemplateCategory {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: React.ReactNode;
}

export default function Templates() {
  const categories: TemplateCategory[] = [
    {
      title: "Blog Templates",
      description: "SEO-optimized layouts for different types of blog content",
      image: "/templates/blogs/preview.jpg",
      link: "/resources/templates/blogs",
      icon: <FileText className="h-8 w-8 mb-2" />
    },
    {
      title: "Email Templates",
      description: "High-converting email sequences for different marketing goals",
      image: "/templates/emails/preview.jpg",
      link: "/resources/templates/emails",
      icon: <Mail className="h-8 w-8 mb-2" />
    },
    {
      title: "Legal Templates",
      description: "Essential legal documents for your online business",
      image: "/templates/legal/preview.jpg",
      link: "/resources/templates/legal",
      icon: <Scale className="h-8 w-8 mb-2" />
    },
    {
      title: "Social Media Templates",
      description: "Engagement-focused templates for various social platforms",
      image: "/templates/social-media/preview.jpg",
      link: "/resources/templates/social-media",
      icon: <Instagram className="h-8 w-8 mb-2" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PLR Templates | Ready-to-Use Content Templates | PLR Organizer Pro</title>
        <meta name="description" content="Access our library of ready-to-use PLR templates for blogs, emails, legal documents, and social media content. Download and customize for your business." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "PLR Templates Library",
              "description": "Collection of customizable PLR templates for various content needs",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">PLR Template Library</h1>
        <p className="text-xl text-muted-foreground mb-8">Download ready-to-use templates to speed up your content creation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="bg-muted flex items-center justify-center p-6">
                {category.icon}
              </div>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link to={category.link}>Browse Templates</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Premium Templates</h2>
            <p className="text-muted-foreground">Unlock 500+ premium templates with our PRO subscription</p>
          </div>
          <Button size="lg">
            Upgrade to PRO
          </Button>
        </div>
      </main>
    </div>
  );
}

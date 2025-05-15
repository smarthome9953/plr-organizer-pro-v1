
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { Helmet } from "react-helmet-async";

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
}

// This would typically come from an API or database
const getTemplates = (category: string): Template[] => {
  // Sample templates for each category
  const templates: Record<string, Template[]> = {
    blogs: [
      {
        id: "list-style",
        title: "List-Style Blog Template",
        description: "Perfect for creating engaging listicles and rankings",
        thumbnail: "/templates/blogs/list-style/preview.jpg",
        category: "blogs"
      },
      {
        id: "product-reviews",
        title: "Product Review Template",
        description: "Structured format for comprehensive product reviews",
        thumbnail: "/templates/blogs/product-reviews/preview.jpg",
        category: "blogs"
      },
      {
        id: "case-studies",
        title: "Case Study Template",
        description: "Demonstrate results with this case study format",
        thumbnail: "/templates/blogs/case-studies/preview.jpg",
        category: "blogs"
      }
    ],
    emails: [
      {
        id: "product-launch",
        title: "Product Launch Sequence",
        description: "5-part email sequence for launching your product",
        thumbnail: "/templates/emails/product-launch/preview.jpg",
        category: "emails"
      },
      {
        id: "abandoned-cart",
        title: "Abandoned Cart Recovery",
        description: "Win back customers who didn't complete checkout",
        thumbnail: "/templates/emails/abandoned-cart/preview.jpg",
        category: "emails"
      }
    ],
    legal: [
      {
        id: "privacy-policy",
        title: "Privacy Policy Template",
        description: "GDPR-compliant privacy policy for your website",
        thumbnail: "/templates/legal/privacy-policy/preview.jpg",
        category: "legal"
      }
    ],
    "social-media": [
      {
        id: "carousel-posts",
        title: "Carousel Post Templates",
        description: "Swipeable multi-image post templates for Instagram",
        thumbnail: "/templates/social-media/carousel-posts/preview.jpg", 
        category: "social-media"
      }
    ]
  };

  return templates[category] || [];
};

const getCategoryTitle = (slug: string): string => {
  const titles: Record<string, string> = {
    blogs: "Blog Templates",
    emails: "Email Templates",
    legal: "Legal Templates",
    "social-media": "Social Media Templates"
  };
  
  return titles[slug] || "Templates";
};

export default function TemplateCategory() {
  const { category } = useParams<{ category: string }>();
  const templates = category ? getTemplates(category) : [];
  const categoryTitle = category ? getCategoryTitle(category) : "Templates";
  
  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{categoryTitle} | PLR Organizer Pro</title>
        <meta name="description" content={`Download ready-to-use ${categoryTitle.toLowerCase()} for your content marketing needs.`} />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/resources/templates">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">{categoryTitle}</h1>
        
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link to={`/resources/templates/${category}/${template.id}`}>
                      View Template
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No templates found</h2>
            <p className="text-muted-foreground">We're working on adding templates to this category</p>
          </div>
        )}
      </main>
    </div>
  );
}

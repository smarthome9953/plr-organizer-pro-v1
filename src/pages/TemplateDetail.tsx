
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Copy, CheckCircle2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';

interface TemplateMetadata {
  title: string;
  keywords: string[];
  placeholders: {
    name: string;
    example?: string;
    description?: string;
  }[];
}

interface TemplateDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  htmlContent: string;
  docxPath: string;
  htmlPath: string;
  metadata: TemplateMetadata;
}

const getTemplate = (category: string, templateId: string): TemplateDetail | null => {
  // This would typically come from an API or database
  // For now, we'll just return mock data
  
  const templates: Record<string, Record<string, TemplateDetail>> = {
    blogs: {
      "list-style": {
        id: "list-style",
        title: "List-Style Blog Template",
        description: "Perfect for creating engaging listicles and rankings",
        category: "blogs",
        htmlContent: `
          <h1>[HEADLINE]</h1>
          <p class="intro">[INTRO_PARAGRAPH]</p>
          <h2>1. [FIRST_POINT]</h2>
          <p>[FIRST_POINT_CONTENT]</p>
          <h2>2. [SECOND_POINT]</h2>
          <p>[SECOND_POINT_CONTENT]</p>
          <h2>3. [THIRD_POINT]</h2>
          <p>[THIRD_POINT_CONTENT]</p>
          <p class="conclusion">[CONCLUSION]</p>
          <p class="call-to-action">Learn more at <a href="[CTA_LINK]">[CTA_TEXT]</a></p>
        `,
        docxPath: "/templates/blogs/list-style/template.docx",
        htmlPath: "/templates/blogs/list-style/template.html",
        metadata: {
          title: "List-Style Blog Template",
          keywords: ["PLR", "listicle", "SEO"],
          placeholders: [
            {
              name: "HEADLINE",
              example: "7 Ways to Monetize PLR Content"
            },
            {
              name: "INTRO_PARAGRAPH",
              description: "Write an engaging introduction that explains the value of the list"
            },
            {
              name: "CTA_LINK",
              description: "Your affiliate link or relevant page"
            }
          ]
        }
      }
    }
  };

  return templates[category]?.[templateId] || null;
};

export default function TemplateDetail() {
  const { category, templateId } = useParams<{ category: string; templateId: string }>();
  const [copied, setCopied] = useState(false);
  
  if (!category || !templateId) {
    return <div>Template not found</div>;
  }
  
  const template = getTemplate(category, templateId);
  
  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to={`/resources/templates/${category}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Link>
          </Button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
            <p className="text-muted-foreground">The template you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    );
  }

  const copyHtml = () => {
    navigator.clipboard.writeText(template.htmlContent);
    setCopied(true);
    toast({
      title: "HTML Copied",
      description: "Template HTML has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadFile = (fileType: 'docx' | 'html') => {
    const path = fileType === 'docx' ? template.docxPath : template.htmlPath;
    
    // In a real app, this would trigger an actual download
    // For demo purposes, we'll just show a toast
    toast({
      title: `${fileType.toUpperCase()} Download Started`,
      description: `Your ${fileType.toUpperCase()} file is being downloaded`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{template.title} Template | PLR Organizer Pro</title>
        <meta name="description" content={`Download our ${template.title} to create engaging content faster.`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to use this PLR template",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Download",
                  "text": "Download the template in your preferred format"
                },
                {
                  "@type": "HowToStep",
                  "name": "Replace placeholders",
                  "text": "Fill in all placeholder text with your own content"
                },
                {
                  "@type": "HowToStep",
                  "name": "Publish",
                  "text": "Publish the completed content to your website or platform"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <Link to={`/resources/templates/${category}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {getCategoryTitle(category)}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{template.title}</h1>
            <p className="text-muted-foreground mb-6">{template.description}</p>
            
            <Tabs defaultValue="preview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="p-6 border rounded-md bg-card">
                <div dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
              </TabsContent>
              
              <TabsContent value="html" className="relative">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={copyHtml} 
                  className="absolute top-2 right-2 z-10"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <pre className="p-6 border rounded-md bg-card overflow-x-auto">
                  <code>{template.htmlContent}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="placeholders">
                <div className="p-6 border rounded-md bg-card">
                  <h3 className="text-lg font-bold mb-4">Template Placeholders</h3>
                  {template.metadata.placeholders.map((placeholder, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                      <h4 className="font-semibold">[{placeholder.name}]</h4>
                      {placeholder.description && <p className="text-sm text-muted-foreground">{placeholder.description}</p>}
                      {placeholder.example && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Example: </span>
                          <span className="text-sm italic">{placeholder.example}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Download Template</CardTitle>
                <CardDescription>Choose your preferred format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full flex items-center justify-center" 
                  onClick={() => downloadFile('docx')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download DOCX
                </Button>
                <Button 
                  className="w-full flex items-center justify-center" 
                  variant="outline"
                  onClick={() => downloadFile('html')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML
                </Button>
              </CardContent>
              <CardFooter>
                <Alert>
                  <AlertTitle className="text-sm font-medium">Remember</AlertTitle>
                  <AlertDescription className="text-xs">
                    Customize this template to make it unique before publishing to avoid duplicate content issues.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.metadata.keywords.map((keyword, index) => (
                    <div key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
                      {keyword}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper function duplicated from TemplateCategory for simplicity
function getCategoryTitle(slug: string): string {
  const titles: Record<string, string> = {
    blogs: "Blog Templates",
    emails: "Email Templates",
    legal: "Legal Templates",
    "social-media": "Social Media Templates"
  };
  
  return titles[slug] || "Templates";
}

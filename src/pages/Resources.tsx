
import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">PLR Resources</h1>
        
        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started Guide</CardTitle>
                  <CardDescription>Everything you need to know to get started with PLR</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Learn the fundamentals of PLR content and how to use it effectively in your business.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>PLR Organization Strategies</CardTitle>
                  <CardDescription>Best practices for organizing your PLR content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Discover proven strategies to keep your PLR content organized and easily accessible.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Templates</CardTitle>
                  <CardDescription>SEO-optimized layouts for different types of blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access ready-to-use templates for various blog formats including list posts, how-to guides, and product reviews.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/resources/templates/blogs">
                      <FileText className="mr-2 h-4 w-4" />
                      View Templates
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>High-converting email sequences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Get templates for welcome sequences, promotional campaigns, and follow-up emails to engage your audience.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/resources/templates/emails">
                      <FileText className="mr-2 h-4 w-4" />
                      View Templates
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Legal Templates</CardTitle>
                  <CardDescription>Essential legal documents for your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Download customizable templates for privacy policies, terms of service, and other legal requirements.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/resources/templates/legal">
                      <FileText className="mr-2 h-4 w-4" />
                      View Templates
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Templates</CardTitle>
                  <CardDescription>Content formats for maximum engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Templates for carousel posts, quotes, tips, and other popular social media content formats.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/resources/templates/social-media">
                      <FileText className="mr-2 h-4 w-4" />
                      View Templates
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Browse All Templates</CardTitle>
                  <CardDescription>Explore our complete template library</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access our full collection of PLR templates organized by content type and use case.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild size="lg">
                    <Link to="/resources/templates">
                      Browse Template Library
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">What is PLR content?</h3>
                    <p>Private Label Rights (PLR) content is pre-created content that you can purchase and use as your own. You can modify, rebrand, and publish it under your own name.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">What can I do with PLR content?</h3>
                    <p>Depending on the specific license, you can typically edit it, put your name on it, use it on your website, in your products, for email marketing, and more.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">What's the difference between PLR, MRR, and RR?</h3>
                    <p>PLR (Private Label Rights) lets you modify and put your name on content. MRR (Master Resell Rights) lets you sell the content but not modify it. RR (Resell Rights) only lets you resell the content as is.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support Center</CardTitle>
                <CardDescription>Get help with PLR Organizer Pro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Contact Support</h3>
                    <p>Our support team is available Monday-Friday, 9am-5pm EST.</p>
                    <p className="mt-2">Email: support@plrorganizerpro.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Knowledge Base</h3>
                    <p>Browse our collection of tutorials, guides, and troubleshooting articles.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Video Tutorials</h3>
                    <p>Watch step-by-step video guides on how to use PLR Organizer Pro.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

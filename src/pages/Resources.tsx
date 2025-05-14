
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>Plan your content strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A template to help you plan and schedule your PLR content publication.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>PLR Tracking Sheet</CardTitle>
                  <CardDescription>Track your PLR usage and rights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Keep track of where you've used your PLR content and what rights you have for each piece.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>PLR Customization Checklist</CardTitle>
                  <CardDescription>Ensure your PLR is fully customized</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A step-by-step checklist for customizing PLR content to make it unique to your brand.</p>
                </CardContent>
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

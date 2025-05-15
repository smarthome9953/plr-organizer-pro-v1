
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Code, Image, LayoutTemplate, Smartphone, Sparkles, FileCode } from "lucide-react";

export default function HtmlEditor() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>HTML Editor | Easy Website Content Creation & Formatting | PLR Organizer Pro</title>
        <meta name="description" content="Create and format your website content with our user-friendly HTML Editor. Perfect for PLR content customization with drag-and-drop simplicity. Try free today." />
      </Helmet>
      
      <Header showAuthButtons />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6">HTML Editor: Create & Format Website Content Without Coding Skills</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your PLR content into professional website material with our intuitive HTML Editor. 
            Designed for marketers and content creators without coding expertise, this tool makes customizing 
            and publishing your PLR content simple and efficient. Focus on your message while we handle the technical details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/tools/html-editor">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Go to HTML Editor
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">WYSIWYG Editing for PLR Content Customization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Our What-You-See-Is-What-You-Get editor makes formatting PLR content as simple as using a word processor. 
                Apply styling, format text, and add media elements with just a few clicks.
              </p>
              <h3 className="text-xl font-semibold mb-3">One-Click HTML Tag Insertion</h3>
              <p>
                Add headings, lists, tables, and other HTML elements without typing a single tag. 
                Our toolbar provides instant access to the formatting elements you need most.
              </p>
            </div>
            <Card className="overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="WYSIWYG Editor Interface" 
                className="w-full h-64 object-cover object-top"
              />
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Drag-and-Drop Elements for Quick Web Content Creation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:flex-row-reverse">
            <div>
              <p className="mb-4">
                Simplify content creation with our intuitive drag-and-drop interface. Easily add images, videos, buttons, 
                and other media elements to your PLR content without dealing with complex code.
              </p>
              <h3 className="text-xl font-semibold mb-3">Image Optimization & Responsive Formatting</h3>
              <p>
                Images you add are automatically optimized for web and set to be responsive across all devices. 
                Resize, crop, and position media directly in the editor with real-time preview.
              </p>
            </div>
            <Card className="overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Drag and Drop Interface" 
                className="w-full h-64 object-cover object-top"
              />
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Built-in SEO Tools for Optimized HTML Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Create SEO-friendly content with our built-in optimization tools. Check keyword density, readability scores, 
                and get suggestions for improving your content's search engine visibility.
              </p>
              <h3 className="text-xl font-semibold mb-3">Custom CSS Editor Integration</h3>
              <p>
                Advanced users can access the CSS editor to apply custom styling to their content. 
                Preview changes in real-time and save custom styles for future use.
              </p>
            </div>
            <Card className="overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="SEO Tools Interface" 
                className="w-full h-64 object-cover object-top"
              />
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Mobile-Friendly Content Preview & Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:flex-row-reverse">
            <div>
              <p className="mb-4">
                Test how your content appears on different devices with our mobile-friendly preview mode. 
                Ensure your PLR content looks perfect on smartphones, tablets, and desktops.
              </p>
              <h3 className="text-xl font-semibold mb-3">Content Template Library</h3>
              <p>
                Start with professionally designed templates specifically created for PLR content. 
                Choose from a variety of layouts optimized for different content types and purposes.
              </p>
            </div>
            <Card className="overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Mobile Preview Interface" 
                className="w-full h-64 object-cover object-top"
              />
            </Card>
          </div>
        </div>
        
        <div className="bg-muted p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6">How Our HTML Editor Helps with PLR Content</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="mr-2 h-5 w-5 text-primary" />
                  Code-Free Editing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Modify your PLR content without touching a single line of HTML code. Focus on your message and branding.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutTemplate className="mr-2 h-5 w-5 text-primary" />
                  Custom Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Save your branded layouts as templates to quickly format future PLR content with consistent styling.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  SEO Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Automatically check and improve your PLR content's SEO friendliness with built-in tools.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-primary" />
                  Responsive Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ensure your PLR content looks great on all devices with responsive design tools and previews.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="mr-2 h-5 w-5 text-primary" />
                  Media Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Easily add and optimize images, videos, and other media to make your PLR content more engaging.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  Clean Code Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Generate clean, optimized HTML code that's ready to use on any website or content management system.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-muted p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to know HTML code to use this editor?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No, our HTML Editor is designed for users with no coding knowledge. The visual interface lets you create and format content just like in a word processor, while we generate clean HTML code behind the scenes.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I save my customized templates for future PLR content?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, you can save your custom layouts and styling as templates. This makes it easy to maintain consistent branding across all your PLR content and saves time when formatting new material.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does the editor help with SEO optimization?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our HTML Editor includes built-in SEO tools that analyze your content, suggest keyword improvements, check readability scores, and ensure proper HTML semantic structure. It also helps with meta descriptions, image alt tags, and other SEO elements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6">PLR Content Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>How to format PLR articles with custom branding elements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Learn how to transform generic PLR articles into branded content that matches your website's look and feel:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Add your logo and brand colors</li>
                  <li>Insert custom headers and footers</li>
                  <li>Format text to match your brand style guide</li>
                  <li>Include branded call-to-action buttons</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Example</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Creating mobile-responsive sales pages from PLR templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">See how to convert PLR sales page templates into high-converting, mobile-friendly content:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Test responsive design across device sizes</li>
                  <li>Optimize media for faster loading</li>
                  <li>Adjust layout for better mobile UX</li>
                  <li>Create mobile-friendly CTAs</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Example</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="bg-primary text-primary-foreground p-8 rounded-lg">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your PLR Content?</h2>
            <p className="mb-6">Join thousands of marketers who are creating professional web content without coding skills.</p>
            <Link to="/auth">
              <Button variant="secondary" size="lg">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

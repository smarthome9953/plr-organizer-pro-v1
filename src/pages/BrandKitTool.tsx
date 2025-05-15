
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Palette, Type, Image, FileText, Layers, Clock } from "lucide-react";
import { Link } from 'react-router-dom';

export default function BrandKitTool() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Brand Kit Tool for PLR Content | Create Consistent Brand Identity | PLR Organizer Pro</title>
        <meta name="description" content="Discover how our Brand Kit Tool solves inconsistent branding for PLR users. Save logos, colors, and fonts for one-click PLR customization. Try free today." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Brand Kit Tool: Create a Consistent Brand Identity for All Your PLR Content
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tired of spending hours making each PLR product match your brand? Our Brand Kit Tool helps you create a consistent, professional look across all your PLR content in just one click. Used by successful info product creators to transform generic PLR into branded assets that build customer loyalty and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools/brand-kit">
                <Button size="lg" className="font-medium px-8">
                  Try Brand Kit Tool Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="font-medium px-6">
                  See Key Features
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Problem/Solution Section */}
        <section className="py-12 md:py-20 bg-muted/30 rounded-lg my-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              Why PLR Content Often Looks Inconsistent (And How to Fix It)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-background rounded-lg p-6 shadow">
                <h3 className="text-xl font-semibold mb-4">Common PLR Branding Problems</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span>Mismatched colors across different products</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span>Inconsistent font pairings causing visual disconnect</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span>Logo placement varies across different formats</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span>Hours spent manually applying brand elements</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow">
                <h3 className="text-xl font-semibold mb-4">Brand Kit Tool Solution</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Unified color palette applied consistently</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Smart font pairings optimized for your industry</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Automatic logo placement with intelligent positioning</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>One-click branding for multiple files at once</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/tools/brand-kit">
                <Button size="lg" className="font-medium">
                  Fix Your PLR Branding Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Setup Process */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              How to Set Up Your PLR Branding in 3 Minutes
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Assets</h3>
                  <p className="text-muted-foreground">
                    Add your logo, brand colors, and preferred fonts to create your brand profile.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Choose Templates</h3>
                  <p className="text-muted-foreground">
                    Select header, footer, and watermark templates that match your style.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Apply Branding</h3>
                  <p className="text-muted-foreground">
                    Select your PLR files and apply your brand with one click.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/20 p-6 rounded-lg border border-border text-center">
              <p className="font-medium mb-4">
                "I saved 5 hours per week once I set up my brand kit profiles. Now each PLR pack gets branded in minutes instead of hours."
              </p>
              <p className="text-muted-foreground">
                — Sarah M., Digital Product Creator
              </p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              One-Click Branding: Apply Your Identity Across Multiple PLR Files
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Save hours of manual work with our comprehensive branding tools designed specifically for PLR content.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Color Palette Storage</h3>
                <p className="text-muted-foreground mb-4">
                  Store your brand colors with our accessibility checker to ensure they work well together. Apply colors across headings, text, backgrounds, and accents.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Logo Bank with Smart Placement</h3>
                <p className="text-muted-foreground mb-4">
                  Upload multiple logo variations (light, dark, horizontal, square) and our tool will automatically select and place the right version based on the content.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Type className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Font Pairing Made Simple</h3>
                <p className="text-muted-foreground mb-4">
                  Choose from designer-curated font pairings or save your own combinations. Our tool handles the technical details of font embedding and consistency.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Footer Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Create professional footers for your PLR ebooks and PDFs with your contact information, copyright details, and disclaimers automatically inserted.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/tools/brand-kit">
                <Button size="lg" className="font-medium">
                  Start Using Brand Kit Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Advanced Features */}
        <section className="py-12 md:py-16 bg-muted/30 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              Advanced Branding Features for Professional PLR Users
            </h2>
            
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Store Multiple Brand Profiles
                </h3>
                <p className="text-muted-foreground">
                  Running multiple brands or niches? Create and store separate brand profiles for each business or content category, making it easy to switch between them.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Save Time with Automatic Logo Placement
                </h3>
                <p className="text-muted-foreground">
                  Our intelligent algorithm determines the optimal logo placement based on the content type and layout, saving you time on manual adjustments.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Type className="mr-2 h-5 w-5 text-primary" />
                  Font Pairing Made Simple for Non-Designers
                </h3>
                <p className="text-muted-foreground">
                  Not a designer? Our tool recommends complementary font pairings based on your industry and content type, ensuring professional-looking results every time.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Custom Footer Generator for PLR eBooks
                </h3>
                <p className="text-muted-foreground">
                  Create professional, legally-compliant footers for your PLR ebooks with customizable templates for copyright notices, disclaimers, and contact information.
                </p>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Ready to transform your PLR content?</h3>
              <p className="mb-6">
                Join thousands of content creators who save hours every week with our Brand Kit Tool.
              </p>
              <Link to="/tools/brand-kit">
                <Button size="lg" className="font-medium">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Case Studies */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              PLR-Specific Examples
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">How to brand a PLR ebook collection for a cohesive course</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how successful course creators use Brand Kit Tool to transform generic PLR ebooks into professional-looking course materials with consistent branding.
                  </p>
                  <Link to="/tools/brand-kit" className="text-primary hover:underline font-medium inline-flex items-center">
                    Read the case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Creating branded PLR email sequences that match your website</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover how marketers ensure their PLR email sequences maintain brand consistency with their websites for higher engagement and conversion rates.
                  </p>
                  <Link to="/tools/brand-kit" className="text-primary hover:underline font-medium inline-flex items-center">
                    Read the case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Can I store multiple brand profiles for different niches?</h3>
                <p className="text-muted-foreground">
                  Yes! Our Brand Kit Tool allows you to create and save multiple brand profiles. This is perfect if you manage different brands or create content for various niches, each with its own visual identity.
                </p>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Will this work with all PLR file formats?</h3>
                <p className="text-muted-foreground">
                  The Brand Kit Tool works with most common PLR formats including Word documents, PDFs, PowerPoint presentations, and image files. For specialized formats, we provide custom templates and guidance to ensure consistent branding.
                </p>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">How can I maintain consistent branding across PLR videos?</h3>
                <p className="text-muted-foreground">
                  Our tool includes video intro and outro templates that you can customize with your branding. You can also export your color palettes and visual assets to use in your preferred video editing software.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <section className="py-12 md:py-16 border-t">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Tools You Might Like
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Content Spinner</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create unique versions of your PLR content with our AI-powered content spinner.
                  </p>
                  <Link to="/tools" className="text-primary hover:underline text-sm">
                    Learn more
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Template Library</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access hundreds of professionally designed templates for all your PLR needs.
                  </p>
                  <Link to="/tools" className="text-primary hover:underline text-sm">
                    Learn more
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Batch Editor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Edit multiple PLR files at once with our powerful batch editing tools.
                  </p>
                  <Link to="/tools" className="text-primary hover:underline text-sm">
                    Learn more
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Transform Your PLR Content?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of content creators who save hours every week with our powerful Brand Kit Tool.
            </p>
            <Link to="/tools/brand-kit">
              <Button size="lg" className="font-medium px-8">
                Start Using Brand Kit Tool Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

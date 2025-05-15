
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette, Wrench, FileText, RefreshCw, ArrowRight, FileSearch, Shield } from "lucide-react";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function Tools() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Tools Suite | PLR Organizer Pro</title>
        <meta name="description" content="Explore our suite of tools designed specifically for PLR content management, customization, and optimization." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6">PLR Tools Suite</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Our specialized tools help you manage, customize, and optimize your PLR content for maximum results. From branding to uniqueness, these tools streamline your workflow.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Brand Kit Tool</CardTitle>
              </div>
              <CardDescription>Create a consistent brand identity across all your PLR content</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Store logos, colors, fonts and apply them with one click to maintain consistent branding across all your PLR content.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Logo bank with placement suggestions</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Color palette storage</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Font pairing recommendations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/brand-kit-tool">
                <Button variant="outline">Learn More</Button>
              </Link>
              <Link to="/tools/brand-kit">
                <Button>
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Content Spinner</CardTitle>
              </div>
              <CardDescription>Transform generic PLR into 100% unique content</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Use AI to make your PLR content unique and SEO-friendly in seconds, avoiding duplicate content penalties.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Adjustable uniqueness levels</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Brand voice preservation</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Bulk processing capability</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/content-spinner">
                <Button variant="outline">Learn More</Button>
              </Link>
              <Link to="/tools/content-spinner">
                <Button>
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <FileSearch className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>SEO Analyzer</CardTitle>
              </div>
              <CardDescription>Optimize your PLR content for search engines</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Get tailored SEO recommendations to help your PLR content rank higher in search results.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">PLR-specific SEO scoring system</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Keyword optimization suggestions</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Readability assessment</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/seo-analyzer">
                <Button variant="outline">Learn More</Button>
              </Link>
              <Link to="/tools/seo-analyzer">
                <Button>
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>License Tracker</CardTitle>
              </div>
              <CardDescription>Never risk copyright issues with your PLR content</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Track usage rights, restrictions, and expiration dates for all your PLR content licenses.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">License expiration alerts</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">Usage rights visualization</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span className="text-sm">License violation risk assessment</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/license-tracker">
                <Button variant="outline">Learn More</Button>
              </Link>
              <Link to="/tools/license-tracker">
                <Button>
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-muted p-2 rounded-full mr-2">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle>PLR Editor</CardTitle>
              </div>
              <CardDescription>Edit and customize your PLR content</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Our built-in editor helps you quickly customize PLR content to match your brand voice and style.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-muted p-2 rounded-full mr-2">
                  <Wrench className="h-5 w-5" />
                </div>
                <CardTitle>Format Converter</CardTitle>
              </div>
              <CardDescription>Convert PLR content between different formats</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Easily convert your PLR content between different formats like PDF, DOCX, HTML, and more.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

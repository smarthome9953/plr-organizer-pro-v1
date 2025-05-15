
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileCheck, ArrowRight, Clock, FileText, AlertTriangle, Shield } from "lucide-react";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function LicenseTracker() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR License Tracker | Never Risk Copyright Issues Again | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Discover how our License Tracker solves usage rights confusion for PLR users. Track allowed uses, restrictions, and expiration dates for all your PLR content. Try free today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6">PLR License Tracker: Never Risk Copyright Issues or Usage Right Violations Again</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Confused about what you can and can't do with your PLR content? Our License Tracker helps track usage rights, 
          restrictions, and expiration dates for all your PLR assets. Used by careful content marketers to avoid costly 
          copyright violations while maximizing their PLR investments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Why PLR Sellers Lose Money Without License Tracking</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Without proper license tracking, PLR users risk:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 p-1 rounded-full mr-2 mt-1">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span>Unintentionally violating usage restrictions leading to legal issues</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 p-1 rounded-full mr-2 mt-1">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span>Using expired licenses that are no longer valid</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 p-1 rounded-full mr-2 mt-1">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span>Missing opportunities to fully leverage content they've already paid for</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 p-1 rounded-full mr-2 mt-1">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span>Potential damage to their reputation with license violation claims</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>How to Check PLR Usage Rights in 30 Seconds</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Our License Tracker makes it simple to understand exactly what you can do with your content:
              </p>
              <ol className="list-decimal ml-5 space-y-3">
                <li>Select the PLR content from your library</li>
                <li>View the comprehensive rights dashboard showing allowed and restricted uses</li>
                <li>Check expiration dates and special conditions at a glance</li>
                <li>Get clear yes/no answers to common usage questions</li>
                <li>Receive alerts about potential license violations before publishing</li>
              </ol>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Track Expiration Dates and Special Conditions Automatically</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Never worry about using expired PLR content again. Our system:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Automatically tracks license expiration dates</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Sends alerts before licenses expire</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Records special conditions and usage limitations</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Provides renewal reminders for valuable content</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Organize PLR by License Type for Safer Content Deployment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Quickly find the right PLR content based on what you need to do with it:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Filter by commercial usage rights</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Sort by resell permission status</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Identify content with attribution requirements</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Group by modification permissions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>License Template Library for Major PLR Providers</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Our system comes pre-loaded with license templates from top PLR providers, making it easy to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Select your provider from our database</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Automatically apply common license terms</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Customize specific terms when needed</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Save time on manual license entry</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>PLR Portfolio Risk Assessment Tool</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Evaluate your entire PLR library to identify potential risks:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Get a comprehensive risk score for your portfolio</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Identify high-risk content requiring immediate attention</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Receive actionable recommendations to reduce risk</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">✓</span>
                  <span>Generate compliance reports for your records</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-primary/10 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Can I use this PLR in my course?</h4>
              <p className="text-muted-foreground">
                Our License Tracker will immediately tell you if your PLR content can be used in courses, 
                with clear indicators and explanations of any restrictions that might apply.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">How do I know if I can edit or rebrand PLR content?</h4>
              <p className="text-muted-foreground">
                Each PLR entry in our system shows specific modification rights, from 
                "no changes allowed" to "complete rebranding permitted," so you'll never have to guess.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What happens if a PLR license expires?</h4>
              <p className="text-muted-foreground">
                Our system alerts you before expiration so you can take appropriate action like renewing, 
                archiving published content, or removing it from distribution channels.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 bg-accent rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Stop Guessing About Your PLR Rights</h2>
          <div className="flex gap-4">
            <Link to="/tools/license-tracker">
              <Button size="lg" className="gap-2">
                Start Tracking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/scan">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

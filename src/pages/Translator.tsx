
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Languages, ArrowRight, Check, BarChart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Translator() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Translator | Convert English Content to 27 Languages</title>
        <meta name="description" content="Transform your PLR content into 27 different languages with our AI-powered translator. Expand your reach without hiring professional translators." />
      </Helmet>
      
      <Header showAuthButtons />
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Expand Your Market Without Hiring Translators</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Reach global audiences by translating your PLR content into 27 languages with our AI-powered translation tool.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Translating <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Why Google Penalizes Similar PLR Content Across Websites</h2>
              <p className="text-lg mb-4">
                Generic PLR content used across multiple websites can trigger Google's duplicate content penalties, 
                reducing your visibility and authority.
              </p>
              <p className="text-lg mb-4">
                Our translator tool helps you expand to international markets while avoiding content duplication issues.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8 shadow-lg">
              <div className="bg-background p-6 rounded-md shadow-sm mb-4">
                <h3 className="font-medium mb-2">Original English:</h3>
                <p className="text-sm text-muted-foreground italic">
                  "Are you ready to transform your online business? Our proven strategies have helped thousands of entrepreneurs just like you..."
                </p>
              </div>
              <div className="bg-background p-6 rounded-md shadow-sm mb-4">
                <h3 className="font-medium mb-2">Spanish Translation:</h3>
                <p className="text-sm text-muted-foreground italic">
                  "¿Estás listo para transformar tu negocio online? Nuestras estrategias probadas han ayudado a miles de emprendedores como tú..."
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">96% NLP confidence</span>
                </div>
              </div>
            </div>
          </div>
          
          <div id="features" className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Translation Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>27 Languages Supported</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Translate your PLR content into major world languages including Spanish, French, German, Chinese, Japanese, Russian and more.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Context-Aware Translations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our AI understands marketing context, preserving your persuasive language and call-to-actions across all languages.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Formatting Preserved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Keep all your HTML, markdown, and text formatting intact during translation for ready-to-publish content.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <CardTitle>Upload Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Paste your PLR text or upload files to translate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <CardTitle>Select Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Choose from 27 target languages for translation</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <CardTitle>AI Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our AI processes your content with context awareness</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <CardTitle>Download & Publish</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get your translated content ready to use globally</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="my-16 bg-muted rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">How accurate are the translations?</h3>
                <p>Our AI-powered translations typically achieve 94-99% accuracy for most marketing and business content. Each translation includes a confidence score to help you identify areas that might need human review.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Can I translate entire PLR products at once?</h3>
                <p>Yes, our tool supports bulk translation of multiple files and complete PLR products up to 100,000 words per batch.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Do I need to edit the translations afterward?</h3>
                <p>For most business content, our translations are ready to use without editing. For specialized content or critical marketing materials, we recommend a quick review of key messaging.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center my-16">
            <h2 className="text-3xl font-bold mb-6">Start Expanding Your Global Reach Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of marketers using our translation tool to reach new markets with their PLR content.
            </p>
            <Link to="/auth">
              <Button size="lg">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowRight, Users, Clock, Star, Shield, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-purple-50 dark:from-background dark:to-purple-900/10" itemProp="mainContentOfPage">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-purple-600/10 px-3 py-1 text-sm">
              <h1 className="text-lg font-semibold m-0 text-purple-700 dark:text-purple-300" itemProp="headline">#1 PLR Content Organizer</h1>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Ultimate PLR Organizer Pro: Effortlessly Manage & Track Your Private Label Rights Content
            </h2>
            
            {/* SEO-optimized introduction paragraph */}
            <div itemProp="description" className="mt-4">
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Private Label Rights (PLR) content represents a valuable investment for digital marketers, content creators, and online business owners—but only when properly organized and utilized. PLR Organizer Pro is the definitive PLR content management system designed specifically for tracking, categorizing, and maximizing your entire PLR library.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button size="lg" className="font-medium bg-purple-600 hover:bg-purple-700" asChild>
                <Link to="/auth?action=signup">
                  Start Organizing Your PLR Library - Free 7-Day Trial
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group border-purple-200 dark:border-purple-700" asChild>
                <a href="#how-it-works">
                  See How PLR Organizer Saves You 5 Hours Weekly
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm flex-wrap mt-2">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-purple-600" />
                <span><strong>10,000+</strong> Users</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span><strong>Save 5+</strong> Hours/Week</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-purple-600" />
                <span><strong>4.8/5</strong> Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-purple-600" />
                <span><strong>GDPR</strong> Compliant</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <AspectRatio ratio={16 / 9} className="bg-muted mb-4">
              <div className="rounded-lg border bg-card shadow-lg overflow-hidden ring-1 ring-purple-200 dark:ring-purple-800">
                {/* Using placeholder with dimensions 1280x720px */}
                <img 
                  src="/lovable-uploads/7d36ae97-d3ab-4473-861f-1003616e3414.png"
                  alt="PLR Organizer Pro Dashboard - Comprehensive PLR content management interface showing content library and analytics"
                  className="h-full w-full object-cover"
                  loading="eager"
                  itemProp="image"
                />
              </div>
            </AspectRatio>
            
            {/* Trust badges */}
            <div className="mt-4 flex justify-center space-x-6 items-center">
              <div className="bg-background/80 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                {/* Trust badges should be 200x80px */}
                <img src="/placeholder.svg" alt="GDPR Compliance Badge" className="h-8 w-auto" />
              </div>
              <div className="bg-background/80 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                <img src="/placeholder.svg" alt="Secure Payment Badge" className="h-8 w-auto" />
              </div>
              <div className="bg-background/80 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                <img src="/placeholder.svg" alt="7-Day Money Back Guarantee" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick scroll indicator */}
        <div className="flex justify-center mt-12 animate-bounce">
          <ChevronDown className="h-6 w-6 text-purple-600" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

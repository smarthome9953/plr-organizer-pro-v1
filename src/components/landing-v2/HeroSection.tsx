import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CheckCircle, Star, Clock, Users, Shield, Play } from 'lucide-react';

const WARRIOR_PLUS_URL = "https://warriorplus.com/plr-organizer-pro-placeholder";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              #1 PLR Content Organizer
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Stop Drowning in Disorganized PLR Content.{' '}
              <span className="text-primary">Start Profiting.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              The only desktop app that scans your entire computer, automatically organizes PLR by niche, tracks licenses, and eliminates duplicate purchases forever.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-3 mb-8">
              {[
                "Find any PLR content in under 30 seconds",
                "Never accidentally buy duplicates again",
                "Stay compliant with license tracking"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-status-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <a href={WARRIOR_PLUS_URL} target="_blank" rel="noopener noreferrer">
                  Get PLR Organizer Pro
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg gap-2">
                <Play className="h-5 w-5" />
                Watch Demo Video
              </Button>
            </div>
            
            {/* Social Proof Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">10,000+</span>
                <span className="text-muted-foreground">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold">5+ Hours</span>
                <span className="text-muted-foreground">Saved/Week</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">4.8/5</span>
                <span className="text-muted-foreground">Rating</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Dashboard Screenshot */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden border shadow-2xl bg-card">
              <AspectRatio ratio={16 / 10}>
                <img
                  src="/lovable-uploads/15d49077-c574-4f13-b973-630f3850e5ca.png"
                  alt="PLR Organizer Pro Dashboard - Organize your PLR content automatically"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            
            {/* Floating Trust Badges */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="flex items-center gap-2 bg-card border rounded-full px-4 py-2 shadow-lg">
                <Shield className="h-4 w-4 text-status-success" />
                <span className="text-sm font-medium">Secure & Private</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-card border rounded-full px-4 py-2 shadow-lg">
                <CheckCircle className="h-4 w-4 text-status-success" />
                <span className="text-sm font-medium">7-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default HeroSection;

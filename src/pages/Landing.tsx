
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Check,
  Star,
  Clock,
  Search,
  Shield,
  Award,
  Users,
  TrendingUp,
  FileText,
  Folder,
  Settings,
  Tag,
  Database,
  Cloud,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const Landing = () => {
  // Refs for scroll navigation
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const howItWorksRef = React.useRef<HTMLDivElement>(null);
  const pricingRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/WebPage">
      {/* Header */}
      <Header showAuthButtons={true} />
      
      {/* Breadcrumb for SEO */}
      <nav aria-label="Breadcrumb" className="container px-4 py-2">
        <ol className="flex text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/" className="text-primary" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
        </ol>
      </nav>

      {/* Quick Navigation */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-2 hidden md:block">
        <div className="container px-4 flex justify-center space-x-6">
          <button onClick={() => scrollToSection(featuresRef)} className="text-sm font-medium hover:text-primary transition-colors">Features</button>
          <button onClick={() => scrollToSection(howItWorksRef)} className="text-sm font-medium hover:text-primary transition-colors">How It Works</button>
          <button onClick={() => scrollToSection(pricingRef)} className="text-sm font-medium hover:text-primary transition-colors">Pricing</button>
          <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted" itemProp="mainContentOfPage">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <h1 className="text-lg font-semibold m-0" itemProp="headline">#1 PLR Content Organizer</h1>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Ultimate PLR Organizer Pro: Effortlessly Manage & Track Your Private Label Rights Content
              </h2>
              
              {/* New SEO-optimized introduction paragraph */}
              <div itemProp="description">
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Private Label Rights (PLR) content represents a valuable investment for digital marketers, content creators, and online business owners—but only when properly organized and utilized. PLR Organizer Pro is the definitive PLR content management system designed specifically for tracking, categorizing, and maximizing your entire PLR library. Our intelligent software automatically organizes your private label rights assets across all content types, monitors usage rights, prevents duplicate publishing, and provides comprehensive analytics on your PLR investment performance. With users reporting over 5 hours saved weekly and a 37% increase in PLR content utilization, PLR Organizer Pro transforms chaotic content collections into strategic business assets.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="font-medium">
                  Start Organizing Your PLR Library - Free 14-Day Trial
                </Button>
                <Button variant="outline" size="lg" className="group">
                  See How PLR Organizer Saves You 5 Hours Weekly
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span><strong>10,000+</strong> Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span><strong>Save 5+</strong> Hours/Week</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span><strong>4.8/5</strong> Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span><strong>GDPR</strong> Compliant</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg"
                    alt="PLR Organizer Pro Dashboard - Comprehensive PLR content management interface showing content library and analytics"
                    className="h-full w-full object-cover"
                    loading="eager"
                    itemProp="image"
                  />
                </div>
              </AspectRatio>
              
              {/* Trust badges */}
              <div className="mt-4 flex justify-center space-x-6 items-center">
                <div className="bg-background/80 p-2 rounded-md">
                  <img src="/placeholder.svg" alt="GDPR Compliance Badge" className="h-8 w-auto" />
                </div>
                <div className="bg-background/80 p-2 rounded-md">
                  <img src="/placeholder.svg" alt="Secure Payment Badge" className="h-8 w-auto" />
                </div>
                <div className="bg-background/80 p-2 rounded-md">
                  <img src="/placeholder.svg" alt="14-Day Money Back Guarantee" className="h-8 w-auto" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick scroll indicator */}
          <div className="flex justify-center mt-12 animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Struggling With Your Growing PLR Collection?</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Managing private label rights content becomes increasingly challenging as your library grows. Here's why content creators and digital marketers choose PLR Organizer Pro to solve their biggest content management headaches.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-primary" />,
                title: "Lost in the Shuffle",
                description: "Hours wasted searching for specific PLR assets buried in disorganized folders. Our digital content organizer's intelligent search indexes the full text of all your content for instant retrieval."
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Usage Rights Confusion",
                description: "Unclear PLR usage rights and limitations leading to potential legal issues. Our PLR tracking software automatically extracts and monitors license details for every asset in your library."
              },
              {
                icon: <FileText className="h-8 w-8 text-primary" />,
                title: "Content Duplication",
                description: "Accidentally purchasing duplicate PLR products or publishing the same content multiple times. Our system identifies duplicates and tracks where you've already deployed each piece across all your platforms."
              },
              {
                icon: <Folder className="h-8 w-8 text-primary" />,
                title: "Multi-Device Chaos",
                description: "Disorganized folders spread across multiple devices with no central system. Our PLR content management solution synchronizes your entire library across desktop and web interfaces for seamless access."
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Deployment Amnesia",
                description: "Forgetting where you've already used specific PLR content in your business. Our deployment tracker creates a complete history for each piece, preventing accidental reuse across your projects."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-primary" />,
                title: "ROI Mystery",
                description: "Unable to track which PLR investments are actually paying off. Our analytics feature calculates return on investment for each PLR purchase based on your actual usage and revenue data."
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-16 md:py-24" ref={featuresRef}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6">Introducing the Complete PLR Content Management System</h2>
            <p className="text-muted-foreground max-w-[800px] mb-8">
              The only software specifically designed to help digital marketers, content creators, and PLR users organize, track, and maximize their private label rights investments.
            </p>
            
            <div className="w-full max-w-4xl mb-12">
              <AspectRatio ratio={16 / 9}>
                <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
                  <video 
                    className="h-full w-full object-cover" 
                    poster="/placeholder.svg" 
                    controls
                    preload="none"
                  >
                    <source src="https://example.com/plr-organizer-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </AspectRatio>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 w-full">
              {[
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Centralized Library",
                  description: "All your PLR content in one searchable database that automatically organizes by topic, format, and quality rating"
                },
                {
                  icon: <Tag className="h-6 w-6" />,
                  title: "License Tracking",
                  description: "Complete monitoring of PLR usage rights, restrictions, and expiration dates to ensure legal compliance across all your projects"
                },
                {
                  icon: <Settings className="h-6 w-6" />,
                  title: "Auto-Categorization",
                  description: "AI-powered sorting by topic, type, and quality with custom tagging capabilities for your unique organizational needs"
                },
                {
                  icon: <Cloud className="h-6 w-6" />,
                  title: "Cross-Device Access",
                  description: "Seamless sync between desktop and web interfaces with mobile optimization for managing your PLR library from anywhere"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{item.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Button className="mt-12" size="lg">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Master Your PLR Library</h2>
          
          <div className="grid gap-12">
            {[
              {
                title: "Intelligent Auto-Categorization System",
                description: "Our AI-powered PLR organization system automatically sorts your content by topic, type, quality, and potential use cases, saving you hours of manual organization.",
                image: "plr-organizer-auto-categorization.webp",
                features: [
                  "Content type detection (eBooks, articles, videos, graphics, audios)",
                  "Niche and topic classification with sub-category suggestions",
                  "Quality scoring system based on content completeness and originality",
                  "Custom tagging capabilities for your unique organizational needs"
                ]
              },
              {
                title: "Comprehensive Rights Management Tracker",
                description: "Never question what you can and can't do with your private label rights content. Our PLR tracking software monitors all license details and usage restrictions for every piece in your library.",
                image: "plr-organizer-rights-management.webp",
                features: [
                  "License type identification and categorization",
                  "Usage restriction alerts when planning content deployment",
                  "Expiration date tracking for time-limited PLR content",
                  "Distribution limitation warnings to prevent usage violations"
                ]
              },
              {
                title: "Usage History & Deployment Tracking",
                description: "Know exactly where and when you've used each piece of PLR content across your business with our digital content organizer to prevent duplication and maximize asset utilization.",
                image: "plr-organizer-usage-tracking.webp",
                features: [
                  "Publication history log with timestamps and platforms",
                  "Website/platform tracking across all your digital properties",
                  "Modification records showing how content was adapted",
                  "Audience exposure metrics to prevent content fatigue"
                ]
              },
              {
                title: "Advanced Search Across All PLR Content",
                description: "Find exactly what you need in seconds with our powerful PLR content management search engine that indexes the full text of all your private label rights assets.",
                image: "plr-organizer-advanced-search.webp",
                features: [
                  "Full-text content search with semantic understanding",
                  "Filter by multiple parameters (type, topic, license, usage)",
                  "Keyword and phrase matching with relevance scoring",
                  "Similar content suggestions to maximize your library"
                ]
              }
            ].map((feature, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border rounded-lg shadow-sm p-4">
                  <AspectRatio ratio={4 / 3}>
                    <img 
                      src="/placeholder.svg" 
                      alt={`PLR Organizer Pro ${feature.title} - Streamline your PLR content management workflow`}
                      className="h-full w-full object-cover rounded-md"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How PLR Organizer Pro Compares */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">How PLR Organizer Pro Compares</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            See why dedicated PLR content management software outperforms traditional organization methods and generic solutions not designed for private label rights content.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-4 text-left">Features</th>
                  <th className="p-4 text-center">PLR Organizer Pro</th>
                  <th className="p-4 text-center">Manual File Management</th>
                  <th className="p-4 text-center">General Document Systems</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">Auto-Categorization</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center">✕</td>
                  <td className="p-4 text-center">Partial</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">PLR License Tracking</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center">✕</td>
                  <td className="p-4 text-center">✕</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Content Usage History</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center">✕</td>
                  <td className="p-4 text-center">Partial</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">ROI Analytics</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center">✕</td>
                  <td className="p-4 text-center">✕</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Duplicate Detection</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center">✕</td>
                  <td className="p-4 text-center">Partial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24" ref={howItWorksRef}>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How Ultimate PLR Organizer Pro Works in 3 Simple Steps</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Import Your Content",
                description: "Easily import your PLR content via bulk upload, folder scanning, or individual files. Supports all content types including eBooks, articles, videos, graphics, templates, and more.",
                image: "plr-organizer-import.webp"
              },
              {
                step: 2,
                title: "Auto-Organize Library",
                description: "Our intelligent system automatically categorizes your content by topic, type, and quality while extracting license details and usage rights for complete PLR organization.",
                image: "plr-organizer-organize.webp"
              },
              {
                step: 3,
                title: "Deploy With Confidence",
                description: "Search, access, and track your PLR content deployments across all your projects and platforms. Our PLR tracking software ensures you never reuse content accidentally again.",
                image: "plr-organizer-deploy.webp"
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                <div className="w-full bg-card border rounded-lg shadow-sm p-4">
                  <AspectRatio ratio={3 / 2}>
                    <img 
                      src="/placeholder.svg"
                      alt={`PLR Organizer Pro Step ${step.step}: ${step.title} - PLR content management workflow`}
                      className="h-full w-full object-cover rounded-md"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced testimonials with schema markup */}
          <div className="mt-16 space-y-6" itemScope itemType="https://schema.org/Review">
            <div className="p-6 bg-card border rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0" itemProp="image"></div>
                <div>
                  <div className="flex items-center mb-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                    <meta itemProp="ratingValue" content="5" />
                  </div>
                  <p className="italic mb-2" itemProp="reviewBody">"This software has transformed how I manage my PLR content library. I've saved at least 5 hours every week and never accidentally reuse content anymore. The ROI tracking alone has helped me make much better purchasing decisions, increasing my content utilization by 37% in just two months."</p>
                  <p className="font-semibold" itemProp="author">Sarah Johnson, Digital Product Creator</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-card border rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0"></div>
                <div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic mb-2">"As someone with over 5,000 PLR items across multiple niches, finding anything was a nightmare before. PLR Organizer Pro categorized everything automatically and now I can find exactly what I need in seconds. My content production has increased by 25% while spending less time searching through my library."</p>
                  <p className="font-semibold">Michael Roberts, Content Marketing Agency Owner</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-card border rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0"></div>
                <div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic mb-2">"The license tracking feature alone is worth the investment. I used to constantly worry about violating PLR terms, but now the system alerts me to any restrictions. This saved me from a potential legal issue when I was about to use restricted content for a client project. This software is essential for anyone serious about PLR content."</p>
                  <p className="font-semibold">Jennifer Lewis, Digital Marketing Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLR Organization Tips */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">PLR Organization Tips</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Maximize the value of your private label rights content with these expert PLR organization strategies, even before implementing our comprehensive PLR library management system.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Create Content Categories",
                description: "Establish a clear categorization system for your PLR content based on topics, formats, and potential use cases. Group similar content together to quickly find what you need for specific projects."
              },
              {
                title: "Track License Details",
                description: "Always save the license details that came with your PLR content in an easily accessible location. Document any usage restrictions, attribution requirements, or modification rules."
              },
              {
                title: "Log Content Usage",
                description: "Maintain a deployment log that records when and where you've used each PLR item. Include the date, platform, any modifications made, and results generated."
              },
              {
                title: "Implement Version Control",
                description: "For PLR content you modify, establish a version control system to track different iterations and uses. This prevents confusion when you repurpose the same base content."
              },
              {
                title: "Regular Content Audits",
                description: "Conduct quarterly reviews of your PLR library to identify unused assets, outdated content that needs refreshing, and gaps in your content collection that need filling."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Download Our Free PLR Organization Checklist
            </Button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Who The PLR Organizer Pro Is For</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our PLR content management software is specifically designed for these user groups who need to efficiently organize and maximize their private label rights investments.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Content Marketers & Bloggers",
                description: "Manage your PLR article library for consistent blog publishing and content marketing campaigns without duplication or quality concerns."
              },
              {
                title: "Digital Product Creators",
                description: "Organize PLR content you use as components in your larger digital products, tracking modifications and ensuring compliance with license terms."
              },
              {
                title: "Course Creators & Coaches",
                description: "Keep track of educational PLR content used in your courses, workshops, and coaching programs across different topics and modules."
              },
              {
                title: "Niche Website Owners",
                description: "Manage PLR content deployed across multiple niche websites, tracking what's been published where to maintain unique content across properties."
              },
              {
                title: "Virtual Assistants & Agencies",
                description: "Organize PLR assets used for multiple clients, ensuring proper license usage and preventing accidental content duplication between clients."
              },
              {
                title: "Information Product Resellers",
                description: "Track your PLR product inventory, modifications, and deployment channels to maximize revenue from your PLR investments."
              }
            ].map((user, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-2">{user.title}</h3>
                <p className="text-muted-foreground">{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect for PLR Content Across Every Niche</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                niche: "Health & Wellness",
                description: "Organize your health PLR by specific topics like weight loss, nutrition, fitness, mental health, and more. Our digital content organizer ensures you never publish duplicate health content, maintaining your credibility in this sensitive niche.",
                icon: <Award className="h-8 w-8 text-primary" />
              },
              {
                niche: "Business & Marketing",
                description: "Keep your business PLR organized by sub-niches like social media, SEO, email marketing, or entrepreneurship. Our PLR library management system helps you easily find the perfect content for your next marketing campaign or business training.",
                icon: <TrendingUp className="h-8 w-8 text-primary" />
              },
              {
                niche: "Personal Development",
                description: "Categorize personal growth PLR by topics like productivity, mindset, goal setting, and relationships. Our PLR content management solution helps you access the right self-improvement content whenever inspiration strikes.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                niche: "Technology & Software",
                description: "Manage tech-focused PLR including tutorials, reviews, and guides with our comprehensive PLR tracking software. Keep track of when content becomes outdated and needs updating or replacement to maintain relevance.",
                icon: <Settings className="h-8 w-8 text-primary" />
              },
              {
                niche: "Finance & Investing",
                description: "Organize financial PLR by investment types, saving strategies, debt management, and more. Our PLR organization system ensures compliance with usage restrictions for regulated finance topics, protecting your business.",
                icon: <Database className="h-8 w-8 text-primary" />
              },
              {
                niche: "Education & Courses",
                description: "Structure educational PLR content into course modules, worksheets, and assessments with our digital content organizer. Track where each component has been used across your educational products and platforms.",
                icon: <FileText className="h-8 w-8 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.niche}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24" ref={pricingRef} itemScope itemType="https://schema.org/ProductCollection">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your PLR Organization Plan</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-[800px] mx-auto">
            Select the plan that best fits your PLR content volume and management needs. All plans include our core PLR organization features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$19",
                description: "Perfect for beginners with a small PLR content library to organize",
                features: [
                  "Up to 250 PLR items",
                  "Basic categorization",
                  "License tracking",
                  "Desktop app only",
                  "Email support"
                ],
                button: "Start Your Free Trial",
                itemProp: "itemListElement"
              },
              {
                name: "Professional",
                price: "$39",
                description: "Ideal for growing PLR marketers and content creators",
                features: [
                  "Up to 2,500 PLR items",
                  "Advanced AI categorization",
                  "Full usage tracking",
                  "Desktop + Web access",
                  "Priority support",
                  "ROI analytics"
                ],
                button: "Start Free 14-Day Trial",
                highlighted: true,
                itemProp: "itemListElement"
              },
              {
                name: "Agency",
                price: "$79",
                description: "For businesses with extensive PLR content libraries",
                features: [
                  "Unlimited PLR items",
                  "Team collaboration",
                  "Client management",
                  "White label reports",
                  "API access",
                  "Dedicated support",
                  "Custom integrations"
                ],
                button: "Contact Sales",
                itemProp: "itemListElement"
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`flex flex-col bg-card border rounded-lg shadow-sm overflow-hidden ${
                  plan.highlighted ? 'border-primary ring-2 ring-primary' : ''
                }`}
                itemScope
                itemType="https://schema.org/Product"
                itemProp={plan.itemProp}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground py-1 text-center text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2" itemProp="name">{plan.name}</h3>
                  <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span className="text-3xl font-bold" itemProp="price">{plan.price}</span>
                    <span className="text-muted-foreground" itemProp="priceCurrency" content="USD">/month</span>
                  </div>
                  <p className="text-muted-foreground mb-6" itemProp="description">{plan.description}</p>
                  <Button 
                    className="w-full mb-6" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.button}
                  </Button>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-2">All plans include a 14-day money-back guarantee</p>
            <p className="text-sm text-muted-foreground">Prices shown are monthly when billed annually. Monthly billing available.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions About PLR Organization</h2>
          
          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            {[
              {
                question: "How does the PLR license tracking feature work?",
                answer: "Our system scans your PLR content for license information, extracts key details, and maintains a database of usage rights. When you're about to use content, the system alerts you to any restrictions, expiration dates, or special requirements specified in the license."
              },
              {
                question: "Can I organize PLR ebooks and videos in different categories?",
                answer: "Absolutely! Ultimate PLR Organizer Pro handles all content types including ebooks, videos, audio files, graphics, templates, and more. You can organize content by type, topic, or create your own custom categorization system."
              },
              {
                question: "Does Ultimate PLR Organizer Pro work with all types of PLR content?",
                answer: "Yes, our PLR content management system is designed to work with all PLR content regardless of format or niche. Whether you have health PLR, business content, WordPress themes, or educational materials, our system can organize and track it all."
              },
              {
                question: "How does the software help me track where I've used my PLR content?",
                answer: "When you deploy PLR content, you can log the usage within the system, including where it was published, when, what modifications were made, and more. This creates a complete history for each piece of content, preventing accidental duplication."
              },
              {
                question: "Is there a way to track the profitability of my PLR investments?",
                answer: "Yes! Our ROI tracking feature allows you to record the purchase price of PLR content and track revenue generated from its use. The system calculates ROI automatically, helping you make better purchasing decisions in the future."
              },
              {
                question: "Can I use the software on both my desktop and mobile devices?",
                answer: "The Professional and Agency plans include both our desktop application and web access, which is optimized for mobile devices. This allows you to manage your PLR content from anywhere, on any device."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6" itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <h3 className="text-xl font-bold mb-2" itemProp="name">{faq.question}</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-muted-foreground" itemProp="text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Organizing Your PLR Content Library Today</h2>
          <p className="mb-6 max-w-[600px] mx-auto opacity-90">
            Join thousands of successful PLR users who have transformed their content management and maximized their private label rights investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" variant="secondary">
              Start Your Free 14-Day Trial
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground">
              Schedule a Demo
            </Button>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2" />
              <span className="text-sm">14-Day Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2" />
              <span className="text-sm">Quick Setup</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 mb-2" />
              <span className="text-sm">Free Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Resources Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h3 className="text-xl font-bold mb-6">Popular PLR Resources</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/blog/organization" className="text-primary hover:underline">PLR Organization Best Practices</Link>
            <Link to="/blog/rights-licensing" className="text-primary hover:underline">Understanding PLR Licenses</Link>
            <Link to="/resources/templates" className="text-primary hover:underline">Free PLR Organization Templates</Link>
            <Link to="/resources/faq" className="text-primary hover:underline">PLR Content Management FAQ</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Exit Intent CTA - This would be implemented with JavaScript */}
      <div className="hidden">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Wait! Don't Miss This...</h3>
            <p className="mb-4">Get our free PLR Organization Checklist and start organizing your content today, even before trying our software.</p>
            <Button className="w-full mb-2">Get Free PLR Checklist</Button>
            <button className="text-sm text-muted-foreground w-full">No thanks, I'll continue browsing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

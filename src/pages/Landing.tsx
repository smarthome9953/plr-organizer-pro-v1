
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
  Cloud
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ultimate PLR Organizer Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                #1 PLR Content Organizer
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Ultimate PLR Organizer Pro: Effortlessly Manage & Track Your Private Label Rights Content
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The All-in-One Software That Automatically Categorizes, Tracks, and Maximizes Your PLR Content Library
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="font-medium">
                  Start Organizing Your PLR Library Now
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>10,000+ Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Save 5+ Hours/Week</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg text-muted-foreground">
                    Dashboard Preview
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Struggling With Your Growing PLR Collection?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-primary" />,
                title: "Lost in the Shuffle",
                description: "Hours wasted searching for specific PLR assets buried in disorganized folders"
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Usage Rights Confusion",
                description: "Unclear PLR usage rights and limitations leading to potential legal issues"
              },
              {
                icon: <FileText className="h-8 w-8 text-primary" />,
                title: "Content Duplication",
                description: "Accidentally purchasing duplicate PLR products or publishing the same content"
              },
              {
                icon: <Folder className="h-8 w-8 text-primary" />,
                title: "Multi-Device Chaos",
                description: "Disorganized folders spread across multiple devices with no central system"
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Deployment Amnesia",
                description: "Forgetting where you've already used specific PLR content in your business"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-primary" />,
                title: "ROI Mystery",
                description: "Unable to track which PLR investments are actually paying off for your business"
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
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6">Introducing the Complete PLR Content Management System</h2>
            <p className="text-muted-foreground max-w-[800px] mb-8">
              The only software specifically designed to help digital marketers, content creators, and PLR users organize, track, and maximize their private label rights investments.
            </p>
            
            <div className="w-full max-w-4xl mb-12">
              <AspectRatio ratio={16 / 9}>
                <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg text-muted-foreground">
                    Video Demo Placeholder
                  </div>
                </div>
              </AspectRatio>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 w-full">
              {[
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Centralized Library",
                  description: "All your PLR content in one searchable database"
                },
                {
                  icon: <Tag className="h-6 w-6" />,
                  title: "License Tracking",
                  description: "Never question usage rights or limitations again"
                },
                {
                  icon: <Settings className="h-6 w-6" />,
                  title: "Auto-Categorization",
                  description: "AI-powered sorting by topic, type, and quality"
                },
                {
                  icon: <Cloud className="h-6 w-6" />,
                  title: "Cross-Device Access",
                  description: "Seamless sync between desktop and web interfaces"
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
                description: "Our AI-powered system automatically sorts your PLR content by topic, type, quality, and potential use cases, saving you hours of manual organization.",
                image: "auto-categorization",
                features: [
                  "Content type detection (eBooks, articles, videos)",
                  "Niche and topic classification",
                  "Quality scoring system",
                  "Custom tagging capabilities"
                ]
              },
              {
                title: "Comprehensive Rights Management Tracker",
                description: "Never question what you can and can't do with your PLR content. Our system tracks all license details and usage restrictions for every piece of content.",
                image: "rights-management",
                features: [
                  "License type identification",
                  "Usage restriction alerts",
                  "Expiration date tracking",
                  "Distribution limitation warnings"
                ]
              },
              {
                title: "Usage History & Deployment Tracking",
                description: "Know exactly where and when you've used each piece of PLR content across your business to prevent duplication and maximize asset utilization.",
                image: "usage-tracking",
                features: [
                  "Publication history log",
                  "Website/platform tracking",
                  "Modification records",
                  "Audience exposure metrics"
                ]
              },
              {
                title: "Advanced Search Across All PLR Content",
                description: "Find exactly what you need in seconds with our powerful search engine that indexes the full text of all your PLR assets.",
                image: "advanced-search",
                features: [
                  "Full-text content search",
                  "Filter by multiple parameters",
                  "Keyword and phrase matching",
                  "Similar content suggestions"
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
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-muted-foreground">
                      {feature.image} feature screenshot
                    </div>
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How Ultimate PLR Organizer Pro Works in 3 Simple Steps</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Import Your Content",
                description: "Easily import your PLR content via bulk upload, folder scanning, or individual files. Supports all content types including eBooks, articles, videos, and more.",
                image: "import"
              },
              {
                step: 2,
                title: "Auto-Organize Library",
                description: "Our intelligent system automatically categorizes your content by topic, type, and quality while extracting license details and usage rights.",
                image: "organize"
              },
              {
                step: 3,
                title: "Deploy With Confidence",
                description: "Search, access, and track your PLR content deployments across all your projects and platforms. Never reuse content accidentally again.",
                image: "deploy"
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
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-muted-foreground">
                      {step.image} step screenshot
                    </div>
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-6 bg-card border rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0"></div>
              <div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic mb-2">"This software has transformed how I manage my PLR content library. I've saved at least 5 hours every week and never accidentally reuse content anymore. The ROI tracking alone has helped me make much better purchasing decisions."</p>
                <p className="font-semibold">Sarah Johnson, Digital Product Creator</p>
              </div>
            </div>
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
                description: "Organize your health PLR by specific topics like weight loss, nutrition, fitness, mental health, and more. Track usage to ensure you never publish duplicate health content.",
                icon: <Award className="h-8 w-8 text-primary" />
              },
              {
                niche: "Business & Marketing",
                description: "Keep your business PLR organized by sub-niches like social media, SEO, email marketing, or entrepreneurship. Easily find the perfect content for your next campaign.",
                icon: <TrendingUp className="h-8 w-8 text-primary" />
              },
              {
                niche: "Personal Development",
                description: "Categorize personal growth PLR by topics like productivity, mindset, goal setting, and relationships. Access the right content when inspiration strikes.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                niche: "Technology & Software",
                description: "Manage tech-focused PLR including tutorials, reviews, and guides. Keep track of when content becomes outdated and needs updating or replacement.",
                icon: <Settings className="h-8 w-8 text-primary" />
              },
              {
                niche: "Finance & Investing",
                description: "Organize financial PLR by investment types, saving strategies, debt management, and more. Ensure compliance with usage restrictions for regulated topics.",
                icon: <Database className="h-8 w-8 text-primary" />
              },
              {
                niche: "Education & Courses",
                description: "Structure educational PLR content into course modules, worksheets, and assessments. Track where each component has been used across your products.",
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
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your PLR Organization Plan</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-[800px] mx-auto">
            Select the plan that best fits your PLR content volume and management needs. All plans include our core organization features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$19",
                description: "Perfect for beginners with a small PLR collection",
                features: [
                  "Up to 250 PLR items",
                  "Basic categorization",
                  "License tracking",
                  "Desktop app only",
                  "Email support"
                ],
                button: "Get Started"
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
                button: "Best Value",
                highlighted: true
              },
              {
                name: "Agency",
                price: "$79",
                description: "For businesses with extensive PLR libraries",
                features: [
                  "Unlimited PLR items",
                  "Team collaboration",
                  "Client management",
                  "White label reports",
                  "API access",
                  "Dedicated support",
                  "Custom integrations"
                ],
                button: "Contact Sales"
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`flex flex-col bg-card border rounded-lg shadow-sm overflow-hidden ${
                  plan.highlighted ? 'border-primary ring-2 ring-primary' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground py-1 text-center text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
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
          
          <div className="space-y-6">
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
                answer: "Yes, our system is designed to work with all PLR content regardless of format or niche. Whether you have health PLR, business content, WordPress themes, or educational materials, our system can organize and track it all."
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
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
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
            Join thousands of successful PLR users who have transformed their content management and maximized their PLR investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" variant="secondary">
              Start Your Free Trial
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

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Download</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">PLR Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 Ultimate PLR Organizer Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Menu, X, ChevronDown, Scan, RefreshCw, FileSearch, Shield, PercentSquare, FileCode, Palette, Book, Video, HelpCircle, Users, Download, DollarSign, Headphones } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const WARRIOR_PLUS_URL = "https://warriorplus.com/plr-organizer-pro-placeholder";

const tools = [
  { name: "PLR Scanner", description: "Scan and organize your entire PLR library", icon: Scan, href: "/plr-scanner-tool" },
  { name: "Content Spinner", description: "Make PLR content 100% unique", icon: RefreshCw, href: "/content-spinner-tool" },
  { name: "Uniqueness Meter", description: "Verify content originality", icon: PercentSquare, href: "/uniqueness-meter-tool" },
  { name: "SEO Analyzer", description: "Optimize PLR for search engines", icon: FileSearch, href: "/seo-analyzer-tool" },
  { name: "HTML Editor", description: "Edit sales pages visually", icon: FileCode, href: "/html-editor-tool" },
  { name: "License Tracker", description: "Track usage rights", icon: Shield, href: "/license-tracker-tool" },
  { name: "Rebranding Tool", description: "Customize PLR with your brand", icon: Palette, href: "/rebranding-tool" },
];

const resources = [
  { name: "PLR Organization Guides", description: "Step-by-step guides", icon: Book, href: "/resources/guides" },
  { name: "Video Tutorials", description: "Watch and learn", icon: Video, href: "/resources/tutorials" },
  { name: "Knowledge Base", description: "Help articles", icon: HelpCircle, href: "/resources/knowledge-base" },
  { name: "Community Forum", description: "Coming soon", icon: Users, href: "/resources/community", badge: "Soon" },
];

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
              alt="PLR Organizer Pro" 
              className="h-10 md:h-12" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {resources.map((resource) => (
                        <li key={resource.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={resource.href}
                              className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                            >
                              <resource.icon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {resource.name}
                                  {resource.badge && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                      {resource.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {resource.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {tools.map((tool) => (
                        <li key={tool.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={tool.href}
                              className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                            >
                              <tool.icon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">{tool.name}</div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {tool.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                    Pricing
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/support" className={navigationMenuTriggerStyle()}>
                    Support
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href={WARRIOR_PLUS_URL} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/" 
                    className="text-lg font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium py-2">
                      Resources
                      <ChevronDown className={`h-5 w-5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 mt-2">
                      {resources.map((resource) => (
                        <Link
                          key={resource.name}
                          to={resource.href}
                          className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <resource.icon className="h-4 w-4" />
                          {resource.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium py-2">
                      Tools
                      <ChevronDown className={`h-5 w-5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 mt-2">
                      {tools.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.href}
                          className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <tool.icon className="h-4 w-4" />
                          {tool.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Link 
                    to="/pricing" 
                    className="text-lg font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  
                  <Link 
                    to="/support" 
                    className="text-lg font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Support
                  </Link>
                  
                  <div className="border-t pt-4 mt-4 space-y-3">
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <a href={WARRIOR_PLUS_URL} target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, Palette, Type, Eye, Download, Code, Monitor, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BrandKitGuide = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      toast({
        title: "Copied to clipboard",
        description: `${label} copied successfully`,
      });
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const ColorSwatch = ({ name, hsl, hex, description }: { name: string; hsl: string; hex: string; description: string }) => (
    <div className="border rounded-lg p-4 space-y-3">
      <div 
        className="w-full h-20 rounded-md border" 
        style={{ backgroundColor: hex }}
      ></div>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 justify-start text-xs font-mono"
            onClick={() => copyToClipboard(hsl, `${name} HSL`)}
          >
            {copiedText === `${name} HSL` ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {hsl}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 justify-start text-xs font-mono"
            onClick={() => copyToClipboard(hex, `${name} HEX`)}
          >
            {copiedText === `${name} HEX` ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {hex}
          </Button>
        </div>
      </div>
    </div>
  );

  const TypographyExample = ({ size, className, text }: { size: string; className: string; text: string }) => (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{size}</Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(className, `${size} CSS`)}
        >
          {copiedText === `${size} CSS` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className={className}>{text}</div>
      <code className="text-xs text-muted-foreground bg-muted p-1 rounded">{className}</code>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>PLR Organizer Pro - Brand Identity Guidelines</title>
        <meta name="description" content="Complete brand identity guidelines for PLR Organizer Pro including colors, typography, logos, and usage standards." />
      </Helmet>
      <Header showAuthButtons={true} />
      
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PLR Organizer Pro
              <span className="block text-2xl md:text-3xl text-primary font-normal mt-2">
                Brand Identity Guidelines
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete brand standards and design system for consistent implementation across all touchpoints
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/brand-kit-tool">
                  <Palette className="h-5 w-5 mr-2" />
                  Use Brand Kit Tool
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.print()}>
                <Download className="h-5 w-5 mr-2" />
                Print Guidelines
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Brand Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium">Brand Name</h4>
                      <p className="text-muted-foreground">PLR Organizer Pro</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Tagline</h4>
                      <p className="text-muted-foreground">Ultimate PLR Content Management System</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Mission</h4>
                      <p className="text-muted-foreground">Empowering content creators with efficient PLR organization tools</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Visual Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium">Primary Color</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary border"></div>
                        <span className="text-muted-foreground">Purple #8B5CF6</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Typography</h4>
                      <p className="text-muted-foreground">Inter (Primary), System fonts</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Border Radius</h4>
                      <p className="text-muted-foreground">0.75rem (12px)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="h-5 w-5 mr-2" />
                      Brand Personality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Professional</Badge>
                      <Badge variant="secondary">Efficient</Badge>
                      <Badge variant="secondary">Empowering</Badge>
                      <Badge variant="secondary">Expert</Badge>
                      <Badge variant="secondary">Trustworthy</Badge>
                      <Badge variant="secondary">Modern</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Light Mode Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode Palette
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <ColorSwatch
                        name="Primary"
                        hsl="hsl(262.1, 83.3%, 57.8%)"
                        hex="#8B5CF6"
                        description="Main brand color for buttons, links, and accents"
                      />
                      <ColorSwatch
                        name="Secondary"
                        hsl="hsl(220, 14.3%, 95.9%)"
                        hex="#F1F5F9"
                        description="Secondary backgrounds and subtle elements"
                      />
                      <ColorSwatch
                        name="Background"
                        hsl="hsl(0, 0%, 100%)"
                        hex="#FFFFFF"
                        description="Main page background"
                      />
                      <ColorSwatch
                        name="Foreground"
                        hsl="hsl(240, 10%, 3.9%)"
                        hex="#0F172A"
                        description="Primary text color"
                      />
                      <ColorSwatch
                        name="Success"
                        hsl="hsl(142.1, 76.2%, 36.3%)"
                        hex="#16A34A"
                        description="Success states and positive actions"
                      />
                      <ColorSwatch
                        name="Warning"
                        hsl="hsl(38, 92%, 50%)"
                        hex="#F59E0B"
                        description="Warning states and caution indicators"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Dark Mode Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode Palette
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <ColorSwatch
                        name="Primary"
                        hsl="hsl(263.4, 70%, 60%)"
                        hex="#A855F7"
                        description="Enhanced primary for dark backgrounds"
                      />
                      <ColorSwatch
                        name="Secondary"
                        hsl="hsl(215, 27.9%, 16.9%)"
                        hex="#334155"
                        description="Dark mode secondary elements"
                      />
                      <ColorSwatch
                        name="Background"
                        hsl="hsl(240, 10%, 3.9%)"
                        hex="#0F172A"
                        description="Dark mode page background"
                      />
                      <ColorSwatch
                        name="Foreground"
                        hsl="hsl(0, 0%, 98%)"
                        hex="#FAFAFA"
                        description="Dark mode text color"
                      />
                      <ColorSwatch
                        name="Purple Accent 1"
                        hsl="hsl(263.4, 70%, 75%)"
                        hex="#C084FC"
                        description="Light purple accent for dark mode"
                      />
                      <ColorSwatch
                        name="Purple Accent 2"
                        hsl="hsl(263.4, 70%, 55%)"
                        hex="#9333EA"
                        description="Medium purple accent for dark mode"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TypographyExample
                      size="H1"
                      className="text-4xl md:text-5xl font-bold"
                      text="Main Headlines"
                    />
                    <TypographyExample
                      size="H2"
                      className="text-3xl md:text-4xl font-bold"
                      text="Section Headers"
                    />
                    <TypographyExample
                      size="H3"
                      className="text-2xl md:text-3xl font-semibold"
                      text="Subsection Titles"
                    />
                    <TypographyExample
                      size="H4"
                      className="text-xl font-semibold"
                      text="Card Titles"
                    />
                    <TypographyExample
                      size="Body Large"
                      className="text-lg"
                      text="Important body text and descriptions"
                    />
                    <TypographyExample
                      size="Body"
                      className="text-base"
                      text="Standard body text for content"
                    />
                    <TypographyExample
                      size="Small"
                      className="text-sm text-muted-foreground"
                      text="Secondary information and labels"
                    />
                    <TypographyExample
                      size="Caption"
                      className="text-xs text-muted-foreground"
                      text="Captions and fine print"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logos Tab */}
            <TabsContent value="logos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Logo Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-8 border rounded-lg bg-muted/20">
                    <p className="text-lg text-muted-foreground">
                      Logo assets will be created based on the brand guidelines
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Includes: Horizontal logo, Square logo (500x500), Favicon, and white versions for dark backgrounds
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-medium mb-2">Horizontal Logo</h4>
                      <p className="text-sm text-muted-foreground">For headers and wide layouts</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-medium mb-2">Square Logo</h4>
                      <p className="text-sm text-muted-foreground">For social media and app icons</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-medium mb-2">Favicon</h4>
                      <p className="text-sm text-muted-foreground">For browser tabs and bookmarks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Voice Tab */}
            <TabsContent value="voice" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Voice</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tone of Voice</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Professional yet approachable</li>
                        <li>• Clear and direct communication</li>
                        <li>• Solution-focused messaging</li>
                        <li>• Confident expertise</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Key Messages</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• "Save 5+ Hours/Week"</li>
                        <li>• "Ultimate PLR Organization"</li>
                        <li>• "GDPR Compliant & Secure"</li>
                        <li>• "10,000+ Trusted Users"</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Target Audience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Primary Users</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Digital marketers</li>
                        <li>• Content creators</li>
                        <li>• Online business owners</li>
                        <li>• Affiliate marketers</li>
                        <li>• PLR resellers</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">User Needs</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Efficient content organization</li>
                        <li>• Time-saving automation</li>
                        <li>• Professional presentation</li>
                        <li>• Reliable tools</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Technical Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">CSS Variables (Light Mode)</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 20% 98%;
  --secondary: 220 14.3% 95.9%;
  --secondary-foreground: 220.9 39.3% 11%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  --accent: 220 14.3% 95.9%;
  --accent-foreground: 220.9 39.3% 11%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 20% 98%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 262.1 83.3% 57.8%;
  --radius: 0.75rem;
  --status-success: 142.1 76.2% 36.3%;
  --status-warning: 38 92% 50%;
  --status-error: 0 84.2% 60.2%;
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">CSS Variables (Dark Mode)</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 263.4 70% 60%;
  --primary-foreground: 210 20% 98%;
  --secondary: 215 27.9% 16.9%;
  --secondary-foreground: 210 20% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 263.4 70% 15%;
  --accent-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 263.4 70% 50.4%;
  --purple-accent-1: 263.4 70% 75%;
  --purple-accent-2: 263.4 70% 55%;
  --purple-accent-3: 263.4 70% 25%;
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Animation Standards</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`/* Transitions */
transition-colors: 150ms ease-in-out;
transition-all: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover Effects */
hover:shadow-md
hover:border-primary/20
hover:bg-accent

/* Focus States */
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BrandKitGuide;
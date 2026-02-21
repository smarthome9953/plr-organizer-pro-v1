
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileSearch, FileScan, FolderSearch, Clock, Zap, FolderTree, FolderInput } from 'lucide-react';

const PlrScanner = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>AI-Powered PLR Scanner | Auto-Categorize 1000s of Files | PLR Organizer Pro</title>
        <meta name="description" content="Military-grade detection organizes PLR packages without breaking them. Scan 10,000 files in 5 mins with 95% accuracy." />
        <meta property="og:title" content="AI-Powered PLR Scanner | PLR Organizer Pro" />
        <meta property="og:description" content="Military-grade detection organizes PLR packages without breaking them. Scan 10,000 files in 5 mins with 95% accuracy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plrorganizerpro.com/plr-scanner" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Powered PLR Scanner | PLR Organizer Pro" />
        <meta name="twitter:description" content="Military-grade detection organizes PLR packages without breaking them. Scan 10,000 files in 5 mins with 95% accuracy." />
      </Helmet>
      
      <Header showAuthButtons={true} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  One-Click PLR Organization <span className="text-primary">(Keeps Packages Intact)</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Stop wasting hours manually sorting files. Our AI-powered scanner detects and organizes all your PLR content while keeping related files together - so you can focus on customizing and selling.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" asChild>
                    <Link to="/scan">Start Scanning Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/auth">Try Free for 7 Days</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <img 
                  src="/lovable-uploads/7d36ae97-d3ab-4473-861f-1003616e3414.png" 
                  alt="PLR Scanner Interface showing folder organization"
                  className="rounded-lg shadow-lg border"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The PLR Organization Problem (And Why It Wastes Your Time)</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Without proper organization, your valuable PLR content becomes a digital haystack - impossible to find what you need when you need it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FolderSearch className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lost PLR Files</h3>
                  <p className="text-muted-foreground">
                    Buying PLR content is easy - finding it months later when you need it is nearly impossible without organization.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Clock className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hours Wasted Sorting</h3>
                  <p className="text-muted-foreground">
                    Manual organization can take 5+ hours per week - time better spent customizing and publishing content.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FolderInput className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Broken PLR Packages</h3>
                  <p className="text-muted-foreground">
                    Standard file organization often separates related PLR files, making packages unusable or incomplete.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Military-Grade PLR Detection & Organization</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our scanner uses advanced pattern recognition to identify, categorize, and organize your PLR content without breaking packages.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FileScan className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning-Fast Scanning</h3>
                  <p className="text-muted-foreground">
                    Process 10,000+ files in under 5 minutes - without slowing down your computer.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Categorization</h3>
                  <p className="text-muted-foreground">
                    Automatically detects PLR content types and organizes into appropriate categories with 95% accuracy.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FolderTree className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Keeps Packages Intact</h3>
                  <p className="text-muted-foreground">
                    Recognizes related files and keeps them together - preserving the complete PLR package structure.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FileSearch className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deep Content Analysis</h3>
                  <p className="text-muted-foreground">
                    Scans inside archives and documents to identify PLR content even when buried in folders or ZIP files.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FolderInput className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Virtual Previews</h3>
                  <p className="text-muted-foreground">
                    Preview PLR content without extraction, saving time and keeping your files organized.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <FolderSearch className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dynamic Folder Creation</h3>
                  <p className="text-muted-foreground">
                    Automatically creates intuitive folder structures based on PLR content types and topics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How The PLR Scanner Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Scan, organize, and manage your PLR library in just three simple steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <span className="font-bold text-2xl text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Select Folders to Scan</h3>
                <p className="text-muted-foreground">
                  Choose any folder on your computer that might contain PLR content. The scanner works with any drive or network location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <span className="font-bold text-2xl text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Scanning Process</h3>
                <p className="text-muted-foreground">
                  Watch as the AI rapidly processes files, identifies PLR content, and groups related files together.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <span className="font-bold text-2xl text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Review & Organize Results</h3>
                <p className="text-muted-foreground">
                  Approve AI-suggested categories or customize organization to fit your workflow perfectly.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/scan">Start Scanning Your PLR Content</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to know about our PLR Scanner tool.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="general">General Questions</TabsTrigger>
                  <TabsTrigger value="technical">Technical Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">How accurate is the PLR detection?</h3>
                      <p className="text-muted-foreground">
                        Our scanner has a 95% accuracy rate for identifying PLR content. It uses multiple detection methods including filename patterns, content analysis, and metadata examination to ensure high precision.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">Will the scanner modify my original files?</h3>
                      <p className="text-muted-foreground">
                        No, the scanner is completely non-destructive. It creates a virtual catalog of your content without changing the original files. You can choose to physically reorganize files later if desired.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">How does the package detection work?</h3>
                      <p className="text-muted-foreground">
                        Our AI analyzes file relationships based on naming patterns, creation dates, and content similarity to identify files that belong together in a PLR package, ensuring nothing gets separated.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="technical" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">What file systems are supported?</h3>
                      <p className="text-muted-foreground">
                        The scanner works with NTFS, FAT32, exFAT, and most other common file systems. It can scan local drives, external drives, network locations, and cloud storage that's mapped to your file system.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">How does the virtual preview work?</h3>
                      <p className="text-muted-foreground">
                        Our scanner extracts preview data without fully unpacking archives, allowing you to see what's inside ZIP/RAR files and documents without extracting them or breaking their organization.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">What are the system requirements?</h3>
                      <p className="text-muted-foreground">
                        The scanner is optimized to work on any modern computer. For optimal performance on large libraries (100,000+ files), we recommend at least 8GB RAM and an SSD drive.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Organize Your PLR Content?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of content creators who save hours every week with our PLR Scanner. Start your free trial today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/scan">Start Scanning Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">Try Free for 7 Days</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlrScanner;

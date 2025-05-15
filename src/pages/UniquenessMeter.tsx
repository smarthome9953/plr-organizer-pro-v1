
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, Check, Shield, ArrowRight, FileSearch, AlertTriangle, Globe, BarChart2, PercentSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UniquenessMeter() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Uniqueness Meter | Check Content Originality Before Publishing | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Discover how our Uniqueness Meter solves duplicate content risks for PLR users. Scan the web for similar content before publishing your modified PLR. Try free today." 
        />
      </Helmet>
      
      <Header showAuthButtons={true} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PLR Uniqueness Meter: Verify Your Content is Original Before Publishing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Worried about publishing PLR content that's already widespread online? Our Uniqueness Meter helps verify how original your content is before publishing. Used by SEO-conscious marketers to ensure their modified PLR content won't trigger duplicate content penalties.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tools/uniqueness-meter">
                <Button size="lg" className="w-full sm:w-auto">
                  Try Uniqueness Meter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why Google Penalizes Similar PLR Content */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Why Google Penalizes Similar PLR Content Across Websites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-background">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                      <CardTitle className="text-lg">Duplicate Content Filters</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Google's algorithms automatically detect and filter out duplicate content across the web. When you publish unmodified PLR, your content competes with dozens or hundreds of identical versions.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileSearch className="h-5 w-5 text-destructive mr-2" />
                      <CardTitle className="text-lg">Devalued Rankings</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Similar content published across many domains dilutes search value. Google typically chooses only one version to rank, usually the most authoritative or earliest publisher.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-destructive mr-2" />
                      <CardTitle className="text-lg">Content Quality Signals</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Websites with excessive duplicate content receive negative quality signals. This can affect your entire site's reputation and ranking potential in Google's eyes.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Activity className="h-5 w-5 text-destructive mr-2" />
                      <CardTitle className="text-lg">Reader Experience Impact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Users encountering the same content across different sites have a poor experience. Google prioritizes unique content that adds distinct value to readers.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* How Our Uniqueness Scoring Algorithm Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                How Our Uniqueness Scoring Algorithm Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                      <PercentSquare className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Content Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">Our system compares your content against billions of indexed pages to detect similarities with published content across the web.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                      <BarChart2 className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>AI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">Advanced AI algorithms analyze sentence structure, paragraph composition, and overall content patterns to evaluate uniqueness.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">Get a comprehensive risk score and specific recommendations to improve your content's uniqueness before publishing.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center">
                Complete Uniqueness Analysis for PLR Content
              </h2>
              <p className="text-xl text-muted-foreground mb-8 text-center">
                Our comprehensive tools help you ensure your PLR content stands out from the crowd
              </p>
              
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="analysis">Paragraph Analysis</TabsTrigger>
                  <TabsTrigger value="comparison">Competitor Comparison</TabsTrigger>
                  <TabsTrigger value="suggestions">Improvement Suggestions</TabsTrigger>
                  <TabsTrigger value="reports">Risk Assessment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analysis" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paragraph-by-Paragraph Uniqueness Analysis</CardTitle>
                      <CardDescription>
                        Detailed analysis of each paragraph in your content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Our system breaks down your content by paragraph, analyzing each section individually to identify which parts need the most attention. You'll get:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Uniqueness score for each paragraph</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Highlighted sections that match existing content</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Specific revision suggestions for problematic areas</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="comparison" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Competitive Content Comparison in Your Niche</CardTitle>
                      <CardDescription>
                        See how your content compares to competitors using similar PLR
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Understand how your modified PLR content stacks up against others in your niche:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Identify competitors using the same source material</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Compare your modifications against theirs</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Get insights on how to differentiate your content further</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="suggestions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Uniqueness Improvement Suggestions</CardTitle>
                      <CardDescription>
                        Actionable tips to make your PLR content more original
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Get specific recommendations to increase your content's uniqueness:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>AI-powered rewriting suggestions for low-uniqueness areas</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Structure modifications to stand out from similar content</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Content enhancement ideas based on your target audience</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Plagiarism Risk Assessment Reports</CardTitle>
                      <CardDescription>
                        Comprehensive reports on your content's uniqueness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Get detailed reports you can save and reference:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Overall uniqueness percentage with detailed breakdown</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Exportable PDF reports for record-keeping</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>Before/after comparisons when implementing suggestions</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">What uniqueness percentage is safe for SEO purposes?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Most SEO experts recommend aiming for at least 80-90% uniqueness for your content to avoid duplicate content issues. However, this can vary depending on your specific niche and competition. Our tool helps you achieve the optimal level of uniqueness for your content while maintaining the core value of your PLR materials.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Can this detect PLR content used by my competitors?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Yes. Our Uniqueness Meter can identify content that appears across multiple websites, including competitors who might be using the same PLR sources. This helps you understand how your PLR content compares to what's already published and guides you in making sufficient modifications to stand out.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">How often should I check content uniqueness before publishing?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We recommend checking your content at least twice: once after your initial modifications to the PLR content, and again after implementing our suggested improvements. For high-value content or competitive niches, you may want to perform additional checks as you refine your content further.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make Your PLR Content Unique?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of content marketers who use our tools to ensure their PLR content stands out and ranks well.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/tools/uniqueness-meter">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Try Uniqueness Meter Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Related PLR Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Content Spinner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Transform generic PLR content into unique, engaging material with our AI-powered content spinner.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/content-spinner" className="w-full">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Plagiarism Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Ensure your content is free from plagiarism with our comprehensive checking tool.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analyzer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Optimize your PLR content for search engines with our dedicated SEO analysis tool.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/seo-analyzer" className="w-full">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

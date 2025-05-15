
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, RefreshCw, MessageSquare, FileText, Bot, ArrowRight, LineChart, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";

export default function ContentSpinner() {
  // Sample FAQ data
  const faqs = [
    {
      question: "Can I resell PLR content after using your spinner?",
      answer: "Yes, you can resell PLR content after using our spinner. The Content Spinner transforms your PLR into unique content that complies with most PLR licensing agreements requiring modification before reselling."
    },
    {
      question: "How unique does spun PLR need to be for SEO?",
      answer: "For effective SEO, your content should be at least 70-80% unique compared to the original PLR. Our spinner allows you to adjust uniqueness levels from light (50-60% unique) to aggressive (90%+ unique) depending on your needs."
    },
    {
      question: "Will Google detect that my content was spun from PLR?",
      answer: "Our advanced AI spinner focuses on maintaining natural language patterns and coherence while transforming content. When using the recommended settings, the content appears natural to both readers and search engines."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AI Content Spinner | Make PLR 100% Unique in Seconds | PLR Organizer Pro</title>
        <meta name="description" content="Discover how our AI Content Spinner solves duplicate content issues for PLR users. Transform generic PLR into unique, SEO-friendly content with one click. Try free today." />
      </Helmet>
      
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            AI Content Spinner: Transform Generic PLR into 100% Unique, SEO-Friendly Content
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Struggling with duplicate PLR content hurting your SEO? Our AI Content Spinner helps transform generic PLR into unique, valuable content that ranks in search engines. Used by content marketers and affiliate site owners to quickly create unique variations without losing the original message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/tools/content-spinner">
              <Button size="lg" className="px-8">
                Try Content Spinner Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/scan">
              <Button variant="outline" size="lg">
                Upload PLR Content First
              </Button>
            </Link>
          </div>
        </section>

        {/* Problem-Solution Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">How Duplicate PLR Content Hurts Your Search Rankings</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-destructive/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Search className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Google Penalizes Duplicate Content</h3>
                  <p className="text-muted-foreground">When you publish unmodified PLR, Google may rank identical content lower or exclude it completely from search results.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-destructive/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Readers Recognize Generic Content</h3>
                  <p className="text-muted-foreground">Your audience may have seen the same PLR content elsewhere, diminishing trust and engagement with your brand.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-destructive/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <LineChart className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lower Conversion Rates</h3>
                  <p className="text-muted-foreground">Generic PLR content typically performs worse for conversions compared to personalized, unique content that addresses your specific audience.</p>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">The Solution: AI-Powered Content Spinning</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0" />
                      <span>Transform PLR to 100% unique content in seconds</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0" />
                      <span>Maintain the core message while changing the words</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0" />
                      <span>Improve readability and SEO-friendliness</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0" />
                      <span>Process entire PLR collections in bulk</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0" />
                      <span>Adjust uniqueness to match your requirements</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <Link to="/tools/content-spinner">
                      <Button className="w-full">Start Spinning Your Content</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Technology Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">The AI Technology Behind Our PLR Content Spinner</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced AI Language Model</h3>
                <p className="text-muted-foreground">
                  Our spinner uses the latest neural network technology to understand context and rewrite content intelligently, not just substitute words.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contextual Understanding</h3>
                <p className="text-muted-foreground">
                  The system analyzes the full meaning of each paragraph to ensure spun content maintains the original intent and message.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <RefreshCw className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adjustable Parameters</h3>
                <p className="text-muted-foreground">
                  Fine-tune spinning settings for industry-specific terminology, brand voice preservation, and desired uniqueness level.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">3-Step Process: Spin Entire PLR Products in Minutes</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Line connecting the steps */}
            <div className="absolute left-[42px] top-12 w-0.5 h-[calc(100%-4rem)] bg-border hidden md:block"></div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Upload Your PLR Content</h3>
                  <p className="text-muted-foreground mb-4">
                    Select individual articles or entire PLR packages from your library or upload new content directly into the spinner.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Supports all major text formats (TXT, DOCX, PDF, HTML)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Process up to 100 articles in one batch</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Select Spinning Options</h3>
                  <p className="text-muted-foreground mb-4">
                    Customize how your content will be transformed with our detailed spinning parameters.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Adjust uniqueness levels from light to aggressive</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Set protected terms for industry-specific language</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Enable paragraph restructuring for deeper changes</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Review and Export</h3>
                  <p className="text-muted-foreground mb-4">
                    Examine your transformed content, make any final adjustments, and export for immediate use.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Side-by-side comparison with original PLR</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Uniqueness score verification against web content</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>Export to multiple formats (DOCX, HTML, WordPress)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/tools/content-spinner">
              <Button size="lg">
                Try the Content Spinner Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Advanced Features Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-10 text-center">Maintaining Brand Voice While Creating Unique Content</h2>
          
          <Tabs defaultValue="uniqueness" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="uniqueness">Uniqueness Levels</TabsTrigger>
              <TabsTrigger value="terminology">Terminology Control</TabsTrigger>
              <TabsTrigger value="restructuring">Smart Restructuring</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
            </TabsList>
            <TabsContent value="uniqueness" className="p-6 border rounded-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Adjust Uniqueness Levels (Light vs. Aggressive Spinning)</h3>
              <p className="mb-4">
                Control exactly how different your spun content will be from the original PLR. Choose from:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span><strong>Light (50-60%):</strong> Changes synonyms while maintaining structure</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span><strong>Medium (70-80%):</strong> Rewrites sentences while preserving meaning</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span><strong>Aggressive (90%+):</strong> Complete restructuring for maximum uniqueness</span>
                </li>
              </ul>
              <Link to="/tools/content-spinner">
                <Button>Try Different Spinning Levels</Button>
              </Link>
            </TabsContent>
            
            <TabsContent value="terminology" className="p-6 border rounded-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Synonym Control for Industry-Specific Terminology</h3>
              <p className="mb-4">
                Preserve important industry terms while spinning everything else. Our system allows you to:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Create custom dictionaries of protected terms</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Set synonym preferences for key concepts</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Import industry glossaries for consistent terminology</span>
                </li>
              </ul>
              <Link to="/tools/content-spinner">
                <Button>Control Your Terminology</Button>
              </Link>
            </TabsContent>
            
            <TabsContent value="restructuring" className="p-6 border rounded-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Smart Paragraph Restructuring Without Losing Meaning</h3>
              <p className="mb-4">
                Our AI doesn't just swap words—it can completely rethink how information is presented:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Change paragraph order while maintaining logical flow</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Convert bullet points to paragraphs and vice versa</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Adjust content length while preserving key information</span>
                </li>
              </ul>
              <Link to="/tools/content-spinner">
                <Button>Try Paragraph Restructuring</Button>
              </Link>
            </TabsContent>
            
            <TabsContent value="bulk" className="p-6 border rounded-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Bulk Processing for Large PLR Collections</h3>
              <p className="mb-4">
                Save hours of work by processing multiple PLR items simultaneously:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Process up to 100 articles in a single batch</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Apply different spinning settings to different content types</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Schedule spinning tasks for large collections</span>
                </li>
              </ul>
              <Link to="/tools/content-spinner">
                <Button>Try Bulk Processing</Button>
              </Link>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Examples Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">PLR-Specific Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">How to spin a PLR ebook chapter for affiliate marketing</h3>
                <p className="text-muted-foreground mb-4">
                  Learn how to transform generic PLR ebook content into compelling affiliate marketing material that converts better. Use our Content Spinner to maintain key product details while creating a unique review style.
                </p>
                <Link to="/tools/content-spinner">
                  <Button variant="outline" className="w-full">
                    Try This Example
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Creating 5 unique blog posts from a single PLR article</h3>
                <p className="text-muted-foreground mb-4">
                  Maximize your content marketing efforts by transforming one PLR article into multiple unique blog posts. Our Content Spinner helps you create variations with different angles and focuses from the same source material.
                </p>
                <Link to="/tools/content-spinner">
                  <Button variant="outline" className="w-full">
                    Try This Example
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 border-t">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Related Tools Section */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Uniqueness Meter</h3>
                <p className="text-muted-foreground mb-4">
                  Analyze your PLR content to see how unique it is compared to other content on the web.
                </p>
                <div className="text-sm text-muted-foreground">Coming soon</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Plagiarism Checker</h3>
                <p className="text-muted-foreground mb-4">
                  Ensure your modified PLR content is unique enough to avoid plagiarism concerns.
                </p>
                <div className="text-sm text-muted-foreground">Coming soon</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">SEO Analyzer</h3>
                <p className="text-muted-foreground mb-4">
                  Check if your spun PLR content is optimized for search engines and target keywords.
                </p>
                <div className="text-sm text-muted-foreground">Coming soon</div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 border-t">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Make Your PLR Content Unique?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Try our AI Content Spinner today and transform generic PLR into valuable, unique content that ranks and converts.
            </p>
            <Link to="/tools/content-spinner">
              <Button size="lg">
                Start Using Content Spinner Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

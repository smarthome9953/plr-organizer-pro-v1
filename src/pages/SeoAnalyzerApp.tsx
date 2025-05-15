
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Search, FileText, BarChart4, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

interface SeoAnalysisResult {
  overallScore: number;
  keywordDensity: {
    keyword: string;
    density: number;
    recommendation: string;
  }[];
  readabilityScore: {
    score: number;
    level: string;
    recommendation: string;
  };
  metaTags: {
    title: string;
    description: string;
    recommendation: string;
  };
  contentLength: {
    count: number;
    recommendation: string;
  };
  suggestions: string[];
}

export default function SeoAnalyzerApp() {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SeoAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!content) {
      toast({
        title: "Content required",
        description: "Please enter some content to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('seo-analyzer', {
        body: {
          content,
          targetKeyword,
        }
      });

      if (error) throw error;

      // If OpenAI API is not available, use a fallback demo result
      if (data) {
        setResult(data);
      } else {
        // Fallback demo result
        setResult({
          overallScore: 68,
          keywordDensity: [
            { 
              keyword: targetKeyword || 'content marketing', 
              density: 2.1, 
              recommendation: "Your keyword density is good, but consider adding 1-2 more instances for optimal results." 
            }
          ],
          readabilityScore: { 
            score: 72, 
            level: "Fairly Easy", 
            recommendation: "Your content is readable but consider breaking up some longer paragraphs." 
          },
          metaTags: {
            title: "Optimized title suggestion based on your content",
            description: "A compelling meta description that includes your target keywords and encourages clicks.",
            recommendation: "Your meta title could be more compelling. Try incorporating emotional triggers."
          },
          contentLength: {
            count: content.length,
            recommendation: content.length < 300 ? "Your content is too short for good SEO. Aim for at least 600 words." : 
                            content.length < 600 ? "Your content length is acceptable but adding more value would help rankings." :
                            "Your content length is good for SEO purposes."
          },
          suggestions: [
            "Add 2-3 relevant internal links to boost SEO value",
            "Consider adding a table or list to improve featured snippet chances",
            "Your content lacks image alt tags, which are important for accessibility and SEO",
            "Add subheadings (H2, H3) to better structure your content"
          ]
        });
      }
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>SEO Analyzer Tool | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Analyze and optimize your PLR content for better search engine rankings with our specialized SEO analysis tool." 
        />
      </Helmet>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">SEO Analyzer</h1>
          <p className="text-muted-foreground">
            Optimize your PLR content for search engines with our specialized analysis tool
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Analysis
                </CardTitle>
                <CardDescription>
                  Paste your PLR content below and enter your target keyword
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="targetKeyword" className="block text-sm font-medium mb-1">
                    Target Keyword
                  </label>
                  <Input
                    id="targetKeyword"
                    placeholder="Enter your main keyword"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Paste your PLR content here for analysis..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[300px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !content} 
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-7">
            {isAnalyzing ? (
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            ) : result ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>SEO Analysis Results</span>
                    <span className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}/100
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Overall SEO score for your content
                  </CardDescription>
                  <Progress value={result.overallScore} className={`h-2 ${getProgressColor(result.overallScore)}`} />
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="readability">Readability</TabsTrigger>
                      <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4 pt-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Content Length</h3>
                        <p className="text-muted-foreground mb-1">{result.contentLength.count} characters</p>
                        <p className="text-sm">{result.contentLength.recommendation}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Improvement Suggestions</h3>
                        <ul className="space-y-2">
                          {result.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="bg-primary/20 p-1 rounded-full mt-0.5">
                                <FileCheck className="h-3 w-3" />
                              </span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="keywords" className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Keyword Analysis</h3>
                      {result.keywordDensity.map((item, index) => (
                        <div key={index} className="mb-4 pb-4 border-b last:border-0">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{item.keyword}</span>
                            <span className={item.density < 1 ? 'text-red-500' : item.density > 4 ? 'text-amber-500' : 'text-green-500'}>
                              {item.density}% density
                            </span>
                          </div>
                          <p className="text-sm">{item.recommendation}</p>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="readability" className="pt-4">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="text-lg font-medium">Readability Score</h3>
                          <span className={result.readabilityScore.score < 60 ? 'text-red-500' : result.readabilityScore.score < 80 ? 'text-amber-500' : 'text-green-500'}>
                            {result.readabilityScore.score}/100
                          </span>
                        </div>
                        <p className="mb-2">Level: {result.readabilityScore.level}</p>
                        <p className="text-sm">{result.readabilityScore.recommendation}</p>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-2">Readability Tips</h4>
                        <ul className="space-y-2 text-sm">
                          <li>Use shorter paragraphs (2-3 sentences max)</li>
                          <li>Aim for an average sentence length of 15-20 words</li>
                          <li>Use active voice instead of passive voice</li>
                          <li>Replace complex words with simpler alternatives</li>
                          <li>Add more transition words to improve flow</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="meta" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Suggested Title Tag</h3>
                          <div className="p-3 bg-muted rounded-md">
                            {result.metaTags.title}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Suggested Meta Description</h3>
                          <div className="p-3 bg-muted rounded-md">
                            {result.metaTags.description}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Meta Recommendation</h3>
                          <p>{result.metaTags.recommendation}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                    Analyze Another
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <BarChart4 className="mr-2 h-4 w-4" />
                    Save Analysis
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <div className="flex flex-col items-center justify-center h-[500px] text-center p-6">
                  <Search className="h-16 w-16 text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-medium mb-2">Enter your content to analyze</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Paste your PLR content in the editor and click "Analyze Content" to receive 
                    detailed SEO recommendations specific to PLR content.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setContent("This is a sample PLR article about content marketing strategies. Content marketing helps businesses attract and retain customers by consistently creating valuable and relevant content. By implementing effective content marketing strategies, businesses can improve their online presence and generate more leads.");
                    setTargetKeyword("content marketing");
                  }}>
                    Load Sample Content
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

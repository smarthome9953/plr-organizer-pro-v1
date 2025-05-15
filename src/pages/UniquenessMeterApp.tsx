
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { BarChart2, FileText, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

interface ParagraphAnalysis {
  paragraph: string;
  uniqueness_score: number;
}

interface UniquenessResult {
  uniqueness_score: number;
  paragraph_analysis: ParagraphAnalysis[];
  improvement_suggestions: string[];
  potential_similar_sources: string[];
  risk_assessment: string;
}

export default function UniquenessMeterApp() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<UniquenessResult | null>(null);
  
  const handleContentAnalysis = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content to analyze");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase.functions.invoke('uniqueness-meter', {
        body: { content },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setResult(data);
      toast.success("Content analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing content:", error);
      toast.error("Failed to analyze content. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return "text-green-500";
      case 'medium': return "text-amber-500";
      case 'high': return "text-red-500";
      default: return "text-muted-foreground";
    }
  };
  
  const getRiskBgColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return "bg-green-100 dark:bg-green-900";
      case 'medium': return "bg-amber-100 dark:bg-amber-900";
      case 'high': return "bg-red-100 dark:bg-red-900";
      default: return "bg-muted";
    }
  };
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Uniqueness Meter | PLR Organizer Pro</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Uniqueness Meter</h1>
          <p className="text-muted-foreground">
            Check how unique your PLR content is before publishing
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
              <CardDescription>
                Paste your PLR content below to check its uniqueness score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste your PLR content here..." 
                className="min-h-[200px]" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleContentAnalysis} 
                disabled={isSubmitting || !content.trim()}
              >
                {isSubmitting ? "Analyzing..." : "Analyze Content"}
              </Button>
            </CardFooter>
          </Card>
          
          {isSubmitting && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Analyzing Content...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          )}
          
          {result && !isSubmitting && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Uniqueness Score</span>
                    <span className={getScoreColor(result.uniqueness_score)}>
                      {result.uniqueness_score}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress 
                      value={result.uniqueness_score} 
                      className={getProgressColor(result.uniqueness_score)}
                    />
                    
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <Info className="h-4 w-4 mr-2" />
                        <span className="font-medium">Risk Assessment:</span>
                        <span className={`ml-2 ${getRiskColor(result.risk_assessment)}`}>
                          {result.risk_assessment} Risk
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.risk_assessment === "Low" 
                          ? "Your content appears to be sufficiently unique." 
                          : result.risk_assessment === "Medium"
                            ? "Your content has some similarities with existing content."
                            : "Your content has significant similarities with existing content."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.improvement_suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="paragraphs">
                    <TabsList>
                      <TabsTrigger value="paragraphs">Paragraph Analysis</TabsTrigger>
                      <TabsTrigger value="similar">Similar Sources</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="paragraphs" className="pt-4">
                      <div className="space-y-4">
                        {result.paragraph_analysis.map((item, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Paragraph {index + 1}</span>
                              <div className={`px-2 py-1 rounded-md text-sm ${getRiskBgColor(
                                item.uniqueness_score >= 80 ? 'low' : 
                                item.uniqueness_score >= 60 ? 'medium' : 'high'
                              )}`}>
                                {item.uniqueness_score}% Unique
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{item.paragraph}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="similar" className="pt-4">
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-2">
                          Based on our analysis, similar content might exist on these websites:
                        </p>
                        <ul className="space-y-2">
                          {result.potential_similar_sources.map((source, index) => (
                            <li key={index} className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                              <span>{source}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-muted p-4 rounded-md mt-4">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium">Note:</span>
                          </div>
                          <p className="text-sm">
                            These are potential sources of similar content based on topic and style analysis. 
                            For a more comprehensive plagiarism check, we recommend using our full Plagiarism Checker tool.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> 
                      Export Report
                    </Button>
                    <Button className="w-full" disabled={result.uniqueness_score >= 80}>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Improve Uniqueness
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex flex-col space-y-2 items-start">
                  <p className="text-sm text-muted-foreground">
                    <strong>Pro Tip:</strong> For best SEO results, aim for a uniqueness score of 80% or higher.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Use our <a href="/tools/content-spinner" className="text-primary hover:underline">Content Spinner</a> to 
                    quickly improve the uniqueness of your PLR content.
                  </p>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

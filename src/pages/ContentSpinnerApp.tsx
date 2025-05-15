
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Helmet } from "react-helmet-async";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileText, RefreshCw, Upload, Check, Save, Lock, Bot, Dices } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ContentSpinnerApp() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [uniquenessLevel, setUniquenessLevel] = useState(70);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniquenessScore, setUniquenessScore] = useState<number | null>(null);
  
  // Protected terms
  const [protectedTerms, setProtectedTerms] = useState('PLR, SEO, Google, WordPress');
  
  // Settings
  const [paragraphRestructuring, setParagraphRestructuring] = useState(false);
  const [maintainKeywords, setMaintainKeywords] = useState(true);
  const [enhanceReadability, setEnhanceReadability] = useState(true);
  
  const processContent = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No content to spin",
        description: "Please enter or upload some PLR content first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setOutputText('');
    setUniquenessScore(null);
    
    try {
      // Call the edge function to spin the content
      const { data, error } = await supabase.functions.invoke('content-spinner', {
        body: {
          content: inputText,
          uniquenessLevel,
          protectedTerms,
          paragraphRestructuring,
          maintainKeywords,
          enhanceReadability
        }
      });

      if (error) {
        console.error('Error with content spinner function:', error);
        throw new Error(error.message || 'Failed to spin content');
      }

      // Update the UI with the results
      setOutputText(data.spunContent);
      setUniquenessScore(data.uniquenessScore);
      
      toast({
        title: "Content spinning complete",
        description: `Your content has been spun with ${data.uniquenessScore}% uniqueness.`,
      });
    } catch (error) {
      console.error('Content spinning error:', error);
      toast({
        title: "Error spinning content",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Only accept text files for demo
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a text file (.txt)",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setInputText(event.target.result.toString());
        toast({
          title: "File loaded",
          description: `${file.name} has been loaded for spinning.`,
        });
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>AI Content Spinner Tool | PLR Organizer Pro</title>
      </Helmet>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI Content Spinner</h1>
        <div>
          <Button variant="outline" className="mr-2" disabled={isProcessing}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
          <Button onClick={processContent} disabled={isProcessing || !inputText}>
            {isProcessing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Spin Content
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spinning Settings</CardTitle>
              <CardDescription>Adjust how your content will be transformed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="uniqueness">Uniqueness Level: {uniquenessLevel}%</Label>
                  <span className="text-xs text-muted-foreground">{uniquenessLevel < 40 ? 'Light' : uniquenessLevel < 70 ? 'Medium' : 'Aggressive'}</span>
                </div>
                <Slider 
                  id="uniqueness"
                  value={[uniquenessLevel]} 
                  min={30} 
                  max={95} 
                  step={5}
                  onValueChange={(value) => setUniquenessLevel(value[0])}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="protected-terms">Protected Terms</Label>
                <Textarea
                  id="protected-terms"
                  placeholder="Enter terms to keep unchanged, separated by commas"
                  value={protectedTerms}
                  onChange={(e) => setProtectedTerms(e.target.value)}
                  className="h-20"
                  disabled={isProcessing}
                />
                <p className="text-xs text-muted-foreground">These terms will remain unchanged during spinning</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="paragraph-restructure">Paragraph Restructuring</Label>
                    <p className="text-xs text-muted-foreground">Change paragraph order & structure</p>
                  </div>
                  <Switch 
                    id="paragraph-restructure" 
                    disabled={isProcessing}
                    checked={paragraphRestructuring}
                    onCheckedChange={setParagraphRestructuring}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="maintain-keywords">Maintain Keywords</Label>
                    <p className="text-xs text-muted-foreground">Preserve SEO-relevant keywords</p>
                  </div>
                  <Switch 
                    id="maintain-keywords" 
                    disabled={isProcessing}
                    checked={maintainKeywords}
                    onCheckedChange={setMaintainKeywords}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="readability-check">Enhance Readability</Label>
                    <p className="text-xs text-muted-foreground">Improve sentence flow and clarity</p>
                  </div>
                  <Switch 
                    id="readability-check" 
                    disabled={isProcessing}
                    checked={enhanceReadability}
                    onCheckedChange={setEnhanceReadability}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Advanced options for better results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between opacity-70">
                <div className="flex flex-col space-y-1">
                  <Label>Brand Voice Matching</Label>
                  <p className="text-xs text-muted-foreground">Match your unique brand tone</p>
                </div>
                <Lock className="h-4 w-4" />
              </div>
              
              <div className="flex items-center justify-between opacity-70">
                <div className="flex flex-col space-y-1">
                  <Label>Industry-Specific Terminology</Label>
                  <p className="text-xs text-muted-foreground">Ensure correct industry terms</p>
                </div>
                <Lock className="h-4 w-4" />
              </div>
              
              <div className="flex items-center justify-between opacity-70">
                <div className="flex flex-col space-y-1">
                  <Label>Bulk Spinning (100+ articles)</Label>
                  <p className="text-xs text-muted-foreground">Process large PLR collections</p>
                </div>
                <Lock className="h-4 w-4" />
              </div>
              
              <Button variant="outline" className="w-full mt-2">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle and Right Columns - Content Spinner */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Tabs defaultValue="editor" className="w-full">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Content</CardTitle>
                  <TabsList>
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="library">Library</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <TabsContent value="editor" className="m-0">
                  <Textarea
                    placeholder="Paste your PLR content here to spin..."
                    className="min-h-[300px] font-mono text-sm"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isProcessing}
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="m-0">
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Upload PLR Content</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to upload your PLR files (TXT, DOCX, PDF)
                    </p>
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      onChange={handleFileUpload} 
                      accept=".txt,.docx,.pdf"
                      disabled={isProcessing}
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="mx-auto" disabled={isProcessing} asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Select File
                        </span>
                      </Button>
                    </label>
                  </div>
                </TabsContent>
                
                <TabsContent value="library" className="m-0">
                  <div className="text-center py-8">
                    <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Your PLR Library</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select content from your PLR library to spin
                    </p>
                    <Button variant="outline" disabled={isProcessing}>
                      Browse Library
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          {/* Output Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Spinning Result</CardTitle>
                
                {uniquenessScore !== null && (
                  <div className="flex flex-col items-end">
                    <div className="text-xs mb-1 text-muted-foreground">Uniqueness Score</div>
                    <div className="flex items-center gap-2">
                      <Progress value={uniquenessScore} className="w-24 h-2" />
                      <span className="text-sm font-medium">{uniquenessScore}%</span>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
                    <p>Processing your content...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Analyzing content structure and applying AI transformations
                    </p>
                  </div>
                </div>
              ) : outputText ? (
                <ScrollArea className="min-h-[300px] max-h-[400px] border rounded-md p-4 bg-muted/20">
                  <div className="font-mono text-sm whitespace-pre-wrap">
                    {outputText}
                  </div>
                </ScrollArea>
              ) : (
                <div className="min-h-[300px] border rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <Dices className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Ready to Spin</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your content and click "Spin Content" to generate a unique version
                    </p>
                    <div className="space-x-3">
                      <Button 
                        variant="outline"
                        onClick={() => setInputText("PLR content is a great way to save time and money on content creation. By using PLR, you can quickly customize existing content to make it your own. It's important to modify PLR content before publishing it to ensure uniqueness and avoid duplicate content issues. Good PLR content helps businesses scale their content marketing efforts without starting from scratch every time.")}
                        disabled={isProcessing}
                      >
                        Load Sample
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {outputText && !isProcessing && (
            <div className="flex justify-end space-x-3">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Save to Library
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Export Content
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

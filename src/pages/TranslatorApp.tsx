
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Globe, AlertCircle, Copy, Download, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

export default function TranslatorApp() {
  const [content, setContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [supportedLanguages, setSupportedLanguages] = useState([
    "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", 
    "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi",
    "Bengali", "Turkish", "Vietnamese", "Polish", "Ukrainian", "Swedish",
    "Norwegian", "Danish", "Finnish", "Greek", "Czech", "Romanian",
    "Hungarian", "Thai", "Indonesian"
  ]);

  const loadSampleContent = () => {
    const sampleContent = `Subject: [OPEN NOW] The secret to doubling your results...

Hey there,

I wanted to reach out because I noticed you've been working hard on your online business.

But what if I told you there's a way to DOUBLE your results without working more hours?

It sounds crazy, but it's exactly what our clients have been experiencing with our new system.

Here's what it does:
- Automates your most time-consuming tasks
- Identifies hidden profit opportunities in your business
- Scales your marketing without increasing your workload

The best part? You can implement this entire system in just one weekend.

Click here to see how it works: [Your Link]

To your success,
[Your Name]`;
    
    setContent(sampleContent);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedContent);
    toast({
      title: "Copied to clipboard",
      description: "The translated content has been copied to your clipboard."
    });
  };

  const downloadTranslation = () => {
    const element = document.createElement("a");
    const file = new Blob([translatedContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `translated_content_${targetLanguage.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const translateContent = async () => {
    if (!content || !targetLanguage) {
      toast({
        title: "Missing information",
        description: "Please enter content and select a target language.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('translator', {
        body: { content, targetLanguage }
      });

      if (error) throw error;

      setTranslatedContent(data.translatedContent);
      setConfidence(data.confidence);
      setSupportedLanguages(data.supportedLanguages || supportedLanguages);

      toast({
        title: "Translation complete",
        description: `Your content has been translated to ${targetLanguage} with ${data.confidence}% confidence.`
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation failed",
        description: "There was an error translating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Multi-Language Translator | PLR Organizer Pro</title>
        <meta name="description" content="Translate your PLR content into multiple languages to expand your global reach." />
      </Helmet>

      <div className="container mx-auto pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Globe className="mr-2 h-6 w-6" /> Multi-Language Translator
            </h1>
            <p className="text-muted-foreground">Translate your PLR content into 27 languages to reach global audiences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Original Content</CardTitle>
              <CardDescription>Enter the content you want to translate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map(language => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" onClick={loadSampleContent}>
                  Load Sample
                </Button>
              </div>
              
              <Textarea 
                placeholder="Enter or paste your content here..."
                className="min-h-[400px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {content ? `${content.length} characters` : 'No content'}
              </div>
              <Button 
                onClick={translateContent}
                disabled={!content || !targetLanguage || isTranslating}
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : "Translate"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Translated Content</CardTitle>
              <CardDescription>
                {translatedContent ? `Translated to ${targetLanguage}` : "Translation will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {confidence && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Translation Confidence</span>
                    <span className="font-medium">{confidence}%</span>
                  </div>
                  <Progress value={confidence} className="h-2" />
                </div>
              )}
              
              {!translatedContent && !isTranslating && (
                <div className="bg-muted rounded p-8 text-center h-[400px] flex items-center justify-center">
                  <div className="text-muted-foreground">
                    <Globe className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Enter content, select a language, and click Translate</p>
                  </div>
                </div>
              )}
              
              {isTranslating && (
                <div className="bg-muted rounded p-8 text-center h-[400px] flex items-center justify-center">
                  <div className="text-muted-foreground">
                    <RefreshCw className="mx-auto h-12 w-12 mb-4 opacity-50 animate-spin" />
                    <p>Translating your content...</p>
                  </div>
                </div>
              )}
              
              {translatedContent && !isTranslating && (
                <Textarea 
                  className="min-h-[400px]"
                  value={translatedContent}
                  readOnly
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {translatedContent ? `${translatedContent.length} characters` : ''}
              </div>
              <div className="flex gap-2">
                {translatedContent && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadTranslation}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>

        {translatedContent && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                  <span>Review key marketing messaging and calls-to-action to ensure they maintain impact</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                  <span>Add hreflang tags to your website for proper SEO of multilingual content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                  <span>Consider cultural nuances when repurposing content for different markets</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

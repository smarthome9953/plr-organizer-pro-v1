
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, ArrowRight, FileScan, Clock, Loader2, CheckCircle, Table, Image, FileImage, ScanText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

export default function OcrToolApp() {
  const [selectedTab, setSelectedTab] = useState("single");
  const [fileToProcess, setFileToProcess] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedFormat, setSelectedFormat] = useState("docx");
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preserveLayout, setPreserveLayout] = useState(true);
  const [detectTables, setDetectTables] = useState(true);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToProcess(e.target.files[0]);
    }
  };
  
  const handleBatchFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would handle multiple files
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "Files selected",
        description: `${e.target.files.length} files selected for OCR processing.`,
      });
    }
  };
  
  const handleExtract = () => {
    if (!fileToProcess) return;
    
    setIsProcessing(true);
    setExtractionProgress(0);
    
    // Simulate OCR process
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            toast({
              title: "OCR Processing Complete",
              description: "Your text has been extracted successfully.",
            });
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  const handleBatchExtract = () => {
    setIsProcessing(true);
    setExtractionProgress(0);
    
    // Simulate OCR process
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            toast({
              title: "Batch OCR Complete",
              description: "All files have been processed successfully.",
            });
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 350);
  };
  
  const recentExtractions = [
    { name: "product-review.pdf", date: "Today, 1:45 PM", pages: 3, language: "English" },
    { name: "plr-infographic.png", date: "Yesterday, 10:30 AM", pages: 1, language: "English" },
    { name: "spanish-ebook.pdf", date: "Sep 14, 2023", pages: 24, language: "Spanish" }
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>OCR Tool | PLR Organizer Pro</title>
        <meta name="description" content="Extract text from images and PDFs with our high-accuracy OCR tool." />
      </Helmet>
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">OCR Text Extraction</h1>
            <p className="text-muted-foreground">Extract editable text from any image or PDF</p>
          </div>
          <Button asChild variant="outline">
            <a href="/ocr-tool" target="_blank">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Extract Text with OCR</CardTitle>
              <CardDescription>
                Extract text from scanned PDFs, images, and other visual content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="single">Single File</TabsTrigger>
                  <TabsTrigger value="batch">Batch Processing</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced OCR</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single">
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="file">Select File (PDF or Image)</Label>
                      <Input type="file" id="file" 
                        accept=".pdf,image/*" 
                        onChange={handleFileChange} 
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported formats: PDF, JPG, PNG, TIFF, BMP
                      </p>
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="language">OCR Language</Label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="format">Output Format</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="docx">DOCX (Word Document)</SelectItem>
                          <SelectItem value="pdf">PDF (Searchable)</SelectItem>
                          <SelectItem value="html">HTML (Web Page)</SelectItem>
                          <SelectItem value="txt">TXT (Plain Text)</SelectItem>
                          <SelectItem value="markdown">MD (Markdown)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>OCR Processing</span>
                          <span>{extractionProgress}%</span>
                        </div>
                        <Progress value={extractionProgress} className="h-2" />
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={handleExtract} 
                      disabled={!fileToProcess || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Extracting Text...
                        </>
                      ) : (
                        <>
                          <ScanText className="mr-2 h-4 w-4" />
                          Extract Text
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="batch">
                  <div className="space-y-4">
                    <Alert>
                      <AlertTitle>Batch Processing</AlertTitle>
                      <AlertDescription>
                        You can process up to 100 files simultaneously. Supported formats include PDF, JPG, PNG, TIFF, and more.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="batch-files">Select Multiple Files</Label>
                      <Input type="file" id="batch-files" multiple onChange={handleBatchFilesChange} />
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="batch-language">Primary Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="batch-language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="auto">Auto-detect (slower)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="batch-format">Output Format</Label>
                      <Select defaultValue="docx">
                        <SelectTrigger id="batch-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="docx">DOCX (Word Document)</SelectItem>
                          <SelectItem value="pdf">PDF (Searchable)</SelectItem>
                          <SelectItem value="html">HTML (Web Page)</SelectItem>
                          <SelectItem value="txt">TXT (Plain Text)</SelectItem>
                          <SelectItem value="markdown">MD (Markdown)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Batch OCR Processing</span>
                          <span>{extractionProgress}%</span>
                        </div>
                        <Progress value={extractionProgress} className="h-2" />
                      </div>
                    )}
                    
                    <Button className="w-full" onClick={handleBatchExtract} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Batch...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Start Batch OCR
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced">
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="adv-file">Select File (PDF or Image)</Label>
                      <Input type="file" id="adv-file" accept=".pdf,image/*" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accuracy" className="mb-2 block">OCR Accuracy Level</Label>
                        <Select defaultValue="high">
                          <SelectTrigger id="accuracy">
                            <SelectValue placeholder="Select accuracy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fastest">Fastest (Lower Accuracy)</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="high">High Accuracy (Slower)</SelectItem>
                            <SelectItem value="max">Maximum Accuracy (Slowest)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="preprocessingOptions" className="mb-2 block">Image Preprocessing</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger id="preprocessingOptions">
                            <SelectValue placeholder="Select preprocessing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Automatic Enhancement</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="contrast">Enhance Contrast</SelectItem>
                            <SelectItem value="grayscale">Convert to Grayscale</SelectItem>
                            <SelectItem value="despeckle">Despeckle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="preserveLayout" className="cursor-pointer">Preserve Layout & Formatting</Label>
                        <input
                          type="checkbox"
                          id="preserveLayout"
                          checked={preserveLayout}
                          onChange={(e) => setPreserveLayout(e.target.checked)}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="detectTables" className="cursor-pointer">Detect Tables</Label>
                        <input
                          type="checkbox"
                          id="detectTables"
                          checked={detectTables}
                          onChange={(e) => setDetectTables(e.target.checked)}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Advanced Processing...
                        </>
                      ) : (
                        <>
                          <FileScan className="mr-2 h-4 w-4" />
                          Start Advanced OCR
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Extractions</CardTitle>
              <CardDescription>
                Your recent OCR extraction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExtractions.map((extraction, index) => (
                  <div key={index} className="flex items-start justify-between pb-4 border-b last:pb-0 last:border-0">
                    <div>
                      <p className="font-medium">{extraction.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {extraction.pages} {extraction.pages === 1 ? 'page' : 'pages'} • {extraction.language}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">{extraction.date}</div>
                  </div>
                ))}
                {recentExtractions.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No recent extractions</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Extractions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

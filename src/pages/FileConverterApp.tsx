
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileType, Upload, ArrowRight, FilePlus, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

export default function FileConverterApp() {
  const [selectedTab, setSelectedTab] = useState("single");
  const [fileToConvert, setFileToConvert] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState("docx");
  const [isConverting, setIsConverting] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToConvert(e.target.files[0]);
    }
  };
  
  const handleBatchFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would handle multiple files
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "Files selected",
        description: `${e.target.files.length} files selected for conversion.`,
      });
    }
  };
  
  const handleConvert = () => {
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      toast({
        title: "Conversion Complete",
        description: "Your file has been converted successfully.",
      });
    }, 2000);
  };
  
  const handleBatchConvert = () => {
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      toast({
        title: "Batch Conversion Complete",
        description: "All files have been converted successfully.",
      });
    }, 3000);
  };
  
  const recentConversions = [
    { name: "ebook-plr.pdf", convertedTo: "DOCX", date: "Today, 2:30 PM" },
    { name: "report-bundle.zip", convertedTo: "HTML", date: "Yesterday, 11:15 AM" },
    { name: "social-posts.docx", convertedTo: "PDF", date: "Sep 12, 2023" }
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>File Converter Tool | PLR Organizer Pro</title>
        <meta name="description" content="Convert your PLR files between different formats with our easy-to-use tool." />
      </Helmet>
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">File Converter</h1>
            <p className="text-muted-foreground">Transform any PLR format to editable content in seconds</p>
          </div>
          <Button asChild variant="outline">
            <a href="/file-converter" target="_blank">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Convert Your Files</CardTitle>
              <CardDescription>
                Convert between DOCX, PDF, HTML, TXT, and other formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="single">Single File</TabsTrigger>
                  <TabsTrigger value="batch">Batch Convert</TabsTrigger>
                  <TabsTrigger value="ocr">OCR (Text Extraction)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single">
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="file">Select File</Label>
                      <Input type="file" id="file" onChange={handleFileChange} />
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="format">Output Format</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="docx">DOCX (Word Document)</SelectItem>
                          <SelectItem value="pdf">PDF (Portable Document Format)</SelectItem>
                          <SelectItem value="html">HTML (Web Page)</SelectItem>
                          <SelectItem value="txt">TXT (Plain Text)</SelectItem>
                          <SelectItem value="markdown">MD (Markdown)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="options">Conversion Options</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue placeholder="Select options" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (Preserve Formatting)</SelectItem>
                          <SelectItem value="clean">Clean (Remove Extra Formatting)</SelectItem>
                          <SelectItem value="wordpress">WordPress Ready</SelectItem>
                          <SelectItem value="social">Social Media Optimized</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full" onClick={handleConvert} disabled={!fileToConvert || isConverting}>
                      {isConverting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <FileType className="mr-2 h-4 w-4" />
                          Convert File
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
                        You can convert up to 100 files simultaneously. Supported formats include DOCX, PDF, HTML, TXT, and more.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="batch-files">Select Multiple Files or ZIP Archive</Label>
                      <Input type="file" id="batch-files" multiple onChange={handleBatchFilesChange} />
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="batch-format">Output Format</Label>
                      <Select defaultValue="docx">
                        <SelectTrigger id="batch-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="docx">DOCX (Word Document)</SelectItem>
                          <SelectItem value="pdf">PDF (Portable Document Format)</SelectItem>
                          <SelectItem value="html">HTML (Web Page)</SelectItem>
                          <SelectItem value="txt">TXT (Plain Text)</SelectItem>
                          <SelectItem value="markdown">MD (Markdown)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full" onClick={handleBatchConvert} disabled={isConverting}>
                      {isConverting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Processing Batch...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Start Batch Conversion
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="ocr">
                  <div className="space-y-4">
                    <Alert>
                      <AlertTitle>OCR Processing</AlertTitle>
                      <AlertDescription>
                        Extract text from scanned PDFs, images, and other visual content. Our OCR engine supports 30+ languages.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="ocr-file">Select File or Image</Label>
                      <Input type="file" id="ocr-file" accept=".pdf,image/*" />
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="language">OCR Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full" disabled={isConverting}>
                      {isConverting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Extracting Text...
                        </>
                      ) : (
                        <>
                          <FilePlus className="mr-2 h-4 w-4" />
                          Extract Text with OCR
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
              <CardTitle>Recent Conversions</CardTitle>
              <CardDescription>
                Your recent file conversion history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConversions.map((conversion, index) => (
                  <div key={index} className="flex items-start justify-between pb-4 border-b last:pb-0 last:border-0">
                    <div>
                      <p className="font-medium">{conversion.name}</p>
                      <p className="text-sm text-muted-foreground">Converted to {conversion.convertedTo}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{conversion.date}</div>
                  </div>
                ))}
                {recentConversions.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No recent conversions</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Conversions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

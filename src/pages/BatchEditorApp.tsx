
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Upload, Edit, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

export default function BatchEditorApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upload");
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: `${newFiles.length} files added`,
        description: "Files ready for batch editing"
      });
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const processFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload files to process",
        variant: "destructive"
      });
      return;
    }
    
    if (!findText) {
      toast({
        title: "Search text missing",
        description: "Please enter text to find",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedTab("preview");
      toast({
        title: "Batch edit complete",
        description: `Edited ${files.length} files successfully`
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `${files.length} edited files will download shortly`
    });
  };
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Batch Editor Tool | PLR Organizer Pro</title>
      </Helmet>
      
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Batch Editor</h1>
            <p className="text-muted-foreground mt-1">Edit multiple PLR files simultaneously</p>
          </div>
          <Button variant="outline" asChild className="mt-2 md:mt-0">
            <a href="/batch-editor" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload">1. Upload Files</TabsTrigger>
            <TabsTrigger value="edit">2. Define Changes</TabsTrigger>
            <TabsTrigger value="preview">3. Preview & Download</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload your PLR files</CardTitle>
                <CardDescription>
                  Select the files you want to batch edit. You can upload up to 100 files at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="mb-2 text-lg font-medium">Drag and drop files here</p>
                  <p className="text-muted-foreground mb-4">Or click the button below</p>
                  <div className="flex justify-center">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".docx,.pdf,.txt,.html,.rtf,.md"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload">
                        <FileText className="mr-2 h-4 w-4" />
                        Browse Files
                      </label>
                    </Button>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Uploaded Files ({files.length})</h3>
                      <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
                        Clear All
                      </Button>
                    </div>
                    <div className="max-h-60 overflow-y-auto border rounded-lg">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-6">
                  <Button disabled={files.length === 0} onClick={() => setSelectedTab("edit")}>
                    Continue to Editing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Define your batch changes</CardTitle>
                <CardDescription>
                  Set up what you want to find and replace across all files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="findText">Find Text</Label>
                      <Textarea 
                        id="findText" 
                        placeholder="Text to find..."
                        value={findText}
                        onChange={(e) => setFindText(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="replaceText">Replace With</Label>
                      <Textarea 
                        id="replaceText" 
                        placeholder="Replacement text..."
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Options</h3>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="regex" 
                          checked={useRegex}
                          onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                        />
                        <Label htmlFor="regex">Use Regular Expression</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="caseSensitive" 
                          checked={caseSensitive}
                          onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                        />
                        <Label htmlFor="caseSensitive">Case Sensitive</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Limit to</h3>
                      
                      <div className="space-y-3">
                        <Label htmlFor="section">Document Section</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="section">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Entire document</SelectItem>
                            <SelectItem value="headers">Headers only</SelectItem>
                            <SelectItem value="body">Body content only</SelectItem>
                            <SelectItem value="footers">Footers only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setSelectedTab("upload")}>
                    Back
                  </Button>
                  <Button onClick={processFiles} disabled={!findText || files.length === 0 || isProcessing}>
                    {isProcessing ? 'Processing...' : 'Process Files'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Preview Changes</CardTitle>
                <CardDescription>
                  Review your changes before downloading the edited files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/40 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Summary of Changes</h3>
                    <p>Find: <span className="font-mono bg-muted p-1 rounded">{findText}</span></p>
                    <p>Replace: <span className="font-mono bg-muted p-1 rounded">{replaceText}</span></p>
                    <p className="mt-2">Options: {caseSensitive ? 'Case sensitive' : 'Case insensitive'}{useRegex ? ', Regular expression' : ''}</p>
                    <p className="mt-2">{files.length} files processed</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Preview (First 3 Files)</h3>
                    <div className="space-y-3">
                      {files.slice(0, 3).map((file, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-medium">{file.name}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {files.length > 3 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        + {files.length - 3} more files not shown
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setSelectedTab("edit")}>
                    Back to Edit
                  </Button>
                  <Button onClick={handleDownload}>
                    Download Edited Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

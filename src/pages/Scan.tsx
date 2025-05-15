
import React, { useState } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, File, AlertCircle, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

export default function Scan() {
  const [selectedPath, setSelectedPath] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('folder');
  const [stats, setStats] = useState({
    filesScanned: 0,
    foldersProcessed: 0,
    totalSize: 0,
    duplicatesFound: 0,
    timeElapsed: '00:00:00',
  });
  const [scanOptions, setScanOptions] = useState({
    includeSubfolders: true,
    extractMetadata: true,
    generatePreviews: true,
    detectDuplicates: true,
  });

  const handleBrowseFolder = async () => {
    setScanError(null);
    try {
      // Check if File System Access API is supported
      if (!window.showDirectoryPicker) {
        setScanError("Your browser doesn't support folder selection. Please use Chrome or Edge, or select individual files instead.");
        toast({
          title: "Browser Not Supported",
          description: "Your browser doesn't support folder selection. Please use Chrome or Edge, or select individual files instead.",
        });
        return;
      }

      try {
        const dirHandle = await window.showDirectoryPicker();
        setSelectedPath(dirHandle.name);
        toast({
          title: "Folder Selected",
          description: `Selected folder: ${dirHandle.name}`,
        });
      } catch (err: any) {
        console.error("Error during folder selection:", err);
        if (err.name === 'SecurityError') {
          setScanError("Security restrictions prevented folder selection. This may happen when using the app in certain environments like iframes or sandboxed previews. Try the deployed version of the application instead.");
        } else {
          setScanError(err.message || "Failed to select folder");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setScanError("An unexpected error occurred");
    }
  };

  const handleFileSelect = () => {
    // File selection logic would go here
    toast({
      title: "Feature Coming Soon",
      description: "File selection is not yet implemented.",
    });
  };

  const startScan = () => {
    if (!selectedPath) {
      toast({
        title: "No Folder Selected",
        description: "Please select a folder to scan first.",
      });
      return;
    }

    setScanning(true);
    setScanProgress(0);
    setScanError(null);

    // Start timer for scan duration
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
      const seconds = Math.floor(elapsed % 60).toString().padStart(2, '0');
      setStats(prev => ({
        ...prev,
        timeElapsed: `${hours}:${minutes}:${seconds}`
      }));
    }, 1000);

    // Simulate scan progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        clearInterval(timer);
        setScanning(false);
        
        // Update mock stats upon completion
        setStats({
          filesScanned: Math.floor(Math.random() * 100) + 50,
          foldersProcessed: Math.floor(Math.random() * 20) + 5,
          totalSize: Math.floor(Math.random() * 100000000),
          duplicatesFound: Math.floor(Math.random() * 10),
          timeElapsed: stats.timeElapsed
        });
        
        toast({
          title: "Scan Complete",
          description: "Your folder has been successfully scanned.",
        });
      }
      setScanProgress(Math.min(100, Math.floor(progress)));
    }, 200);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Scan & Organize PLR Content</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="folder" className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        Select Folder
                      </TabsTrigger>
                      <TabsTrigger value="files" className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        Select Files
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="folder" className="pt-4">
                      <div className="text-center p-8 border-2 border-dashed rounded-md">
                        <FolderOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="font-medium mb-2">Select a folder with PLR content</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose a folder containing your PLR files to scan and organize
                        </p>
                        <Button 
                          onClick={handleBrowseFolder}
                          disabled={scanning}
                          className="mx-auto"
                        >
                          Browse Folders
                        </Button>
                        
                        {selectedPath && (
                          <div className="mt-4 p-2 bg-muted rounded text-sm">
                            Selected: <span className="font-medium">{selectedPath}</span>
                          </div>
                        )}
                        
                        {scanError && (
                          <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{scanError}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="files" className="pt-4">
                      <div className="text-center p-8 border-2 border-dashed rounded-md">
                        <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="font-medium mb-2">Select PLR files</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose individual PLR files to add to your library
                        </p>
                        <Button onClick={handleFileSelect} disabled={scanning}>
                          Select Files
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Scan Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-subfolders" 
                          className="mr-2" 
                          checked={scanOptions.includeSubfolders} 
                          onChange={(e) => setScanOptions({...scanOptions, includeSubfolders: e.target.checked})}
                        />
                        <label htmlFor="scan-subfolders">Include subfolders</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-metadata" 
                          className="mr-2" 
                          checked={scanOptions.extractMetadata}
                          onChange={(e) => setScanOptions({...scanOptions, extractMetadata: e.target.checked})}
                        />
                        <label htmlFor="scan-metadata">Extract metadata</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-preview" 
                          className="mr-2" 
                          checked={scanOptions.generatePreviews}
                          onChange={(e) => setScanOptions({...scanOptions, generatePreviews: e.target.checked})}
                        />
                        <label htmlFor="scan-preview">Generate previews</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-duplicates" 
                          className="mr-2" 
                          checked={scanOptions.detectDuplicates}
                          onChange={(e) => setScanOptions({...scanOptions, detectDuplicates: e.target.checked})}
                        />
                        <label htmlFor="scan-duplicates">Detect duplicates</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      onClick={startScan} 
                      disabled={!selectedPath || scanning}
                      className={selectedPath ? "" : "opacity-50"}
                    >
                      Start Scanning
                    </Button>
                  </div>
                  
                  {(scanning || scanProgress > 0) && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Scan Progress</span>
                        <span className="text-sm">{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Scan Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Files Scanned:</span>
                    <span className="font-medium">{stats.filesScanned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Folders Processed:</span>
                    <span className="font-medium">{stats.foldersProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Size:</span>
                    <span className="font-medium">{formatBytes(stats.totalSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duplicates Found:</span>
                    <span className="font-medium">{stats.duplicatesFound}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Elapsed:</span>
                    <span className="font-medium">{stats.timeElapsed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Browser Support</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium">Chrome / Edge</h4>
                      <p className="text-sm text-muted-foreground">Full support for folder scanning</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium">Firefox / Safari</h4>
                      <p className="text-sm text-muted-foreground">Use individual file selection instead</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

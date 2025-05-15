
import React, { useState } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Inbox, Upload, RefreshCw } from "lucide-react";

export default function Scan() {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [folderPath, setFolderPath] = useState("");
  const [stats, setStats] = useState({
    files: 0,
    folders: 0,
    totalSize: "0 MB",
    duplicates: 0,
    timeElapsed: "00:00:00"
  });

  const handleBrowse = async () => {
    try {
      // Check if the File System Access API is available
      if ('showDirectoryPicker' in window) {
        try {
          const dirHandle = await window.showDirectoryPicker();
          const path = dirHandle.name;
          setFolderPath(path);
          toast({
            title: "Folder selected",
            description: `Selected folder: ${path}`,
          });
        } catch (err) {
          if (err.name === 'AbortError') {
            // User cancelled the selection
            toast({
              title: "Selection cancelled",
              description: "No folder was selected",
              variant: "destructive"
            });
          } else if (err.name === 'SecurityError') {
            toast({
              title: "Permission denied",
              description: "You need to grant permission to access files",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Error selecting folder",
              description: err.message || "Something went wrong",
              variant: "destructive"
            });
          }
        }
      } else {
        // Fallback for browsers that don't support the File System Access API
        toast({
          title: "Browser not supported",
          description: "Your browser doesn't support folder selection. Please use Chrome, Edge, or another Chromium-based browser.",
          variant: "destructive"
        });
      }
    } catch (error) {
      // This is for any unexpected errors
      toast({
        title: "Unexpected error",
        description: "An unexpected error occurred while accessing the file system",
        variant: "destructive"
      });
      console.error("Folder selection error:", error);
    }
  };

  const startScan = () => {
    if (!folderPath) {
      toast({
        title: "No folder selected",
        description: "Please select a folder to scan first",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Update stats with simulated data
          setStats({
            files: Math.floor(Math.random() * 500) + 100,
            folders: Math.floor(Math.random() * 50) + 10,
            totalSize: `${(Math.random() * 1000).toFixed(2)} MB`,
            duplicates: Math.floor(Math.random() * 20),
            timeElapsed: "00:01:23"
          });
          
          toast({
            title: "Scan complete",
            description: "Your folder has been successfully scanned",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const resetScan = () => {
    setFolderPath("");
    setProgress(0);
    setIsScanning(false);
    setStats({
      files: 0,
      folders: 0,
      totalSize: "0 MB",
      duplicates: 0,
      timeElapsed: "00:00:00"
    });
    toast({
      title: "Scan reset",
      description: "Scan data has been cleared"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Scan & Organize Content</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Scanner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Folder to Scan</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={folderPath} 
                      placeholder="No folder selected" 
                      className="flex-1 p-2 border rounded-md" 
                      readOnly 
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleBrowse}
                      disabled={isScanning}
                    >
                      <Inbox className="mr-2 h-4 w-4" /> Browse
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Scan Options</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="scan-subfolders" className="mr-2" checked readOnly />
                      <label htmlFor="scan-subfolders">Include subfolders</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="scan-metadata" className="mr-2" checked readOnly />
                      <label htmlFor="scan-metadata">Extract metadata</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="scan-preview" className="mr-2" checked readOnly />
                      <label htmlFor="scan-preview">Generate previews</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="scan-duplicates" className="mr-2" checked readOnly />
                      <label htmlFor="scan-duplicates">Detect duplicates</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    onClick={startScan} 
                    disabled={!folderPath || isScanning}
                    className="flex items-center"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Scanning...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Start Scanning
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={resetScan} 
                    disabled={isScanning}
                  >
                    Reset
                  </Button>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Scan Progress</span>
                    <span className="text-sm">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Scan Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Files Scanned:</span>
                  <span className="font-medium">{stats.files}</span>
                </div>
                <div className="flex justify-between">
                  <span>Folders Processed:</span>
                  <span className="font-medium">{stats.folders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Size:</span>
                  <span className="font-medium">{stats.totalSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duplicates Found:</span>
                  <span className="font-medium">{stats.duplicates}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Elapsed:</span>
                  <span className="font-medium">{stats.timeElapsed}</span>
                </div>
              </CardContent>
            </Card>

            {progress === 100 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Your content has been scanned. You can now:
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Export the scan results</li>
                    <li>Review duplicate content</li>
                    <li>Generate content reports</li>
                  </ul>
                  <Button className="w-full mt-4">View Detailed Report</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

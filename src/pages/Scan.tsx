
import React from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Scan() {
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Folder to Scan</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="C:/Users/Documents/PLR Content" className="flex-1 p-2 border rounded-md" disabled />
                      <Button variant="outline">Browse</Button>
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
                  
                  <div className="pt-4">
                    <Button size="lg">Start Scanning</Button>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Scan Progress</span>
                      <span className="text-sm">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
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
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Folders Processed:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Size:</span>
                    <span className="font-medium">0 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duplicates Found:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Elapsed:</span>
                    <span className="font-medium">00:00:00</span>
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


import React, { useState } from 'react';
import { 
  File, 
  FileArchive, 
  FileImage, 
  FileText,
  Check 
} from 'lucide-react';
import { FileSystemNode, useFileExplorer } from '@/context/FileExplorerContext';
import { Card, CardContent } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ResultsDisplay = () => {
  const { scanResults, isScanning } = useFileExplorer();
  const [selectedResult, setSelectedResult] = useState<FileSystemNode | null>(null);
  
  // If no results and not scanning, show empty state
  if (scanResults.length === 0 && !isScanning) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">No PLR Content Found</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          Select folders from the navigation panel on the left and click "Scan Selected Folders" to start looking for PLR content.
        </p>
      </div>
    );
  }

  // Get the file icon based on extension
  const getFileIcon = (node: FileSystemNode) => {
    if (node.type === 'folder') {
      return <Folder className="h-5 w-5 text-primary" />;
    }
    
    const ext = node.extension?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
      case 'docx':
      case 'txt':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };
  
  // Calculate total size of PLR package
  const calculatePackageSize = (node: FileSystemNode): number => {
    let total = node.size || 0;
    
    if (node.children) {
      node.children.forEach(child => {
        total += calculatePackageSize(child);
      });
    }
    
    return total;
  };

  // Render the preview panel
  const renderPreview = () => {
    if (!selectedResult) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <p className="text-muted-foreground">
            Select a PLR package to view details
          </p>
        </div>
      );
    }
    
    // Get file counts by type
    const fileCounts: Record<string, number> = {};
    const countFiles = (node: FileSystemNode) => {
      if (node.type === 'file') {
        const ext = node.extension || 'other';
        fileCounts[ext] = (fileCounts[ext] || 0) + 1;
      }
      
      node.children?.forEach(countFiles);
    };
    
    countFiles(selectedResult);
    
    return (
      <div className="h-full p-4 overflow-y-auto space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{selectedResult.name}</h3>
          <p className="text-sm text-muted-foreground">{selectedResult.path}</p>
        </div>
        
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium">Package Size</div>
                  <div className="text-2xl font-bold">{formatBytes(calculatePackageSize(selectedResult))}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium">PLR Confidence</div>
                  <div className="text-2xl font-bold">{(selectedResult.confidence || 0) * 100}%</div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">File Types</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(fileCounts).map(([ext, count]) => (
                  <Badge key={ext} variant="secondary">
                    {count} {ext} file{count > 1 ? 's' : ''}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Check className="h-4 w-4" />
                Mark as Organized
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="files">
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {selectedResult.children?.map(node => (
                <div key={node.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                  {getFileIcon(node)}
                  <span>{node.name}</span>
                  {node.size && <span className="text-xs text-muted-foreground ml-auto">{formatBytes(node.size)}</span>}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Show scan results
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="flex-1 p-4 overflow-y-auto border-r">
        <h3 className="font-semibold mb-4">PLR Packages Found ({scanResults.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanResults.map(result => (
            <Card 
              key={result.id}
              className={`cursor-pointer transition-colors ${selectedResult?.id === result.id ? 'border-primary' : ''}`}
              onClick={() => setSelectedResult(result)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Folder className="h-10 w-10 text-primary shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{result.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{result.path}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="outline"
                        className={`${result.confidence && result.confidence > 0.9 ? 'border-status-success text-status-success' : 'border-status-warning text-status-warning'}`}
                      >
                        {result.confidence && result.confidence > 0.9 ? 'High Confidence' : 'Medium Confidence'}
                      </Badge>
                      
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatBytes(calculatePackageSize(result))}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-1/3 border-t md:border-t-0">
        {renderPreview()}
      </div>
    </div>
  );
};

// Import Folder and Search here to avoid import errors
import { Folder, Search } from 'lucide-react';

export default ResultsDisplay;

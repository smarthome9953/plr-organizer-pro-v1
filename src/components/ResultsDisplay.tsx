
import React, { useState } from 'react';
import { 
  File, 
  FileArchive, 
  FileImage, 
  FileText,
  Check,
  FolderOpen,
  Download,
  ExternalLink,
  Tag 
} from 'lucide-react';
import { FileSystemNode, useFileExplorer } from '@/context/FileExplorerContext';
import { Card, CardContent } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ResultsDisplay = () => {
  const { scanResults, isScanning } = useFileExplorer();
  const [selectedResult, setSelectedResult] = useState<FileSystemNode | null>(null);
  const [previewFile, setPreviewFile] = useState<FileSystemNode | null>(null);
  
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
      return <FolderOpen className="h-5 w-5 text-primary" />;
    }
    
    const ext = node.extension?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
      case 'docx':
      case 'txt':
      case 'html':
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

  // Render file preview dialog
  const renderFilePreview = () => {
    if (!previewFile) return null;
    
    const ext = previewFile.extension?.toLowerCase();
    
    return (
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon(previewFile)}
              <span>{previewFile.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-auto">
            {ext === 'jpg' || ext === 'png' || ext === 'gif' ? (
              <div className="border rounded-md overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <div className="flex items-center justify-center h-full bg-muted">
                    {/* In a real app, this would be a real image */}
                    <FileImage className="h-16 w-16 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Image Preview</p>
                  </div>
                </AspectRatio>
              </div>
            ) : ext === 'pdf' ? (
              <div className="border rounded-md p-4 bg-muted h-96 flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/50" />
                <p className="text-muted-foreground ml-2">PDF Preview</p>
              </div>
            ) : ext === 'txt' || ext === 'html' ? (
              <div className="border rounded-md p-4 bg-background h-64 overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {/* Mock content */}
                  {`# ${previewFile.name}\n\nThis is sample PLR content that would be displayed in the preview.\n\n## License Terms\n\n- You may edit the content\n- You may put your name on it\n- You may not resell the PLR rights\n\n## Included Files\n\n- Main guide (PDF)\n- Sales page (HTML)\n- Email templates (TXT)\n- Graphics (JPG)\n`}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
                <FileArchive className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">Preview not available for this file type</p>
                <Button className="mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Extract Archive
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              {previewFile.size && <span className="text-sm text-muted-foreground">{formatBytes(previewFile.size)}</span>}
            </div>
            <Button variant="outline" onClick={() => setPreviewFile(null)}>
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
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
            <TabsTrigger value="license">License Info</TabsTrigger>
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
            
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Categories</h4>
              <div className="flex flex-wrap gap-2">
                {selectedResult.name.toLowerCase().includes('keto') && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                    <Tag className="h-3 w-3 mr-1" />
                    Health & Fitness
                  </Badge>
                )}
                {selectedResult.name.toLowerCase().includes('wordpress') && (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
                    <Tag className="h-3 w-3 mr-1" />
                    WordPress
                  </Badge>
                )}
                {selectedResult.name.toLowerCase().includes('plugin') && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Tag className="h-3 w-3 mr-1" />
                    Plugins & Tools
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="pt-2 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Check className="h-4 w-4" />
                Mark as Organized
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Location
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="files">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {selectedResult.children?.map(node => (
                  <div 
                    key={node.id} 
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => node.type === 'file' && setPreviewFile(node)}
                  >
                    {getFileIcon(node)}
                    <span>{node.name}</span>
                    {node.size && <span className="text-xs text-muted-foreground ml-auto">{formatBytes(node.size)}</span>}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="license">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">PLR License Terms</h4>
                <div className="space-y-2 text-sm">
                  <p>Based on typical PLR license terms, you can:</p>
                  
                  <div className="space-y-1 ml-4">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-0.5 mt-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p>Edit and modify the content</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-0.5 mt-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p>Put your name as the author</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-0.5 mt-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p>Use in your own products</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-0.5 mt-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p>Use on your website or blog</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="italic">Note: Always review the specific license terms included with each PLR package as they may vary.</p>
              </div>
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
                        className={`${result.confidence && result.confidence > 0.9 ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20' : 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20'}`}
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
      
      {renderFilePreview()}
    </div>
  );
};

// Import necessary icons that were missing above
import { Folder, Search } from 'lucide-react';

export default ResultsDisplay;

import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { 
  FolderOpen, File, FileText, FilePlus2, 
  AlertCircle, CheckCircle2, Loader2
} from 'lucide-react';
import ScanProgressBar from '@/components/ScanProgressBar';
import { useFileExplorer } from '@/context/FileExplorerContext';

// No need to redefine interfaces here since they're now in vite-env.d.ts

interface FileItem {
  name: string;
  path: string;
  type: string;
  size: number;
  confidence?: number;
  isPLR?: boolean;
}

interface ScanError {
  path: string;
  error: string;
}

const PLRScan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [includeSubfolders, setIncludeSubfolders] = useState<boolean>(true);
  const [extractMetadata, setExtractMetadata] = useState<boolean>(true);
  const [generatePreviews, setGeneratePreviews] = useState<boolean>(true);
  const [detectDuplicates, setDetectDuplicates] = useState<boolean>(true);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanning, setScanning] = useState<boolean>(false);
  const [processingFiles, setProcessingFiles] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('folder');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    isScanning, setIsScanning, 
    scanProgress: contextScanProgress, setScanProgress: setContextScanProgress, 
    currentScannedFolder, setCurrentScannedFolder 
  } = useFileExplorer();

  // Stats for the scanning process
  const [stats, setStats] = useState({
    filesScanned: 0,
    foldersProcessed: 0,
    plrFilesDetected: 0,
    errors: [] as string[],
    totalSize: 0,
    duplicatesFound: 0,
    elapsedTime: '00:00:00',
  });

  const startTimer = useCallback(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const hours = Math.floor(elapsedMs / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsedMs % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsedMs % 60000) / 1000).toString().padStart(2, '0');
      setStats(prev => ({
        ...prev,
        elapsedTime: `${hours}:${minutes}:${seconds}`
      }));
    }, 1000);
    return timer;
  }, []);

  // Function to create a test folder structure
  const createTestFiles = async () => {
    const testFiles = [
      { name: 'sample-plr-ebook.pdf', content: 'PLR Content License: This content can be modified and resold', isPLR: true },
      { name: 'regular-document.txt', content: 'Regular content without PLR license', isPLR: false },
      { name: 'plr-article.docx', content: 'Private Label Rights included with purchase', isPLR: true },
      { name: 'empty-file.txt', content: '', isPLR: false },
    ];

    const files: FileItem[] = testFiles.map(file => ({
      name: file.name,
      path: `/test-folder/${file.name}`,
      type: file.name.split('.').pop() || '',
      size: file.content.length,
      isPLR: file.isPLR,
      confidence: file.isPLR ? 0.95 : 0.1
    }));

    return files;
  };

  const handleTestScan = async () => {
    try {
      setScanning(true);
      setContextScanProgress(0);
      setIsScanning(true);
      setStats(prev => ({ ...prev, errors: [] }));
      
      const timer = startTimer();
      
      // Simulate file scanning
      const testFiles = await createTestFiles();
      
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setContextScanProgress(i);
      }
      
      // Update stats
      setStats(prev => ({
        ...prev,
        filesScanned: testFiles.length,
        foldersProcessed: 1,
        plrFilesDetected: testFiles.filter(f => f.isPLR).length,
        totalSize: testFiles.reduce((acc, f) => acc + f.size, 0)
      }));
      
      setFiles(testFiles);
      
      clearInterval(timer);
      setScanning(false);
      setIsScanning(false);
      setContextScanProgress(100);
      
      toast('Test Scan Complete', {
        description: `Found ${testFiles.filter(f => f.isPLR).length} PLR files in test data`,
      });
      
    } catch (error) {
      handleScanError(error);
    }
  };

  const handleScanError = (error: any) => {
    console.error('Scan error:', error);
    setStats(prev => ({
      ...prev,
      errors: [...prev.errors, error.message || 'Unknown error occurred']
    }));
    toast.error('Scan Error', {
      description: error.message || 'An error occurred during scanning'
    });
    setScanning(false);
    setIsScanning(false);
  };

  const handleFolderSelect = async () => {
    try {
      // Check if File System Access API is supported
      if (!window.showDirectoryPicker) {
        toast("Browser Not Supported", {
          description: "Your browser doesn't support folder selection. Please use Chrome or Edge, or select individual files instead.",
        });
        return;
      }

      setScanning(true);
      setContextScanProgress(0);
      setIsScanning(true);

      // Start timer for elapsed time
      const timer = startTimer();

      try {
        console.log('Starting folder scan...');
        const dirHandle = await window.showDirectoryPicker();
        setCurrentScannedFolder(dirHandle.name);
        console.log(`Selected folder: ${dirHandle.name}`);
        
        // Process folder contents
        const newFiles: FileItem[] = [];
        let folderCount = 0;
        
        // Recursive function to process folders
        const processFolder = async (handle: FileSystemDirectoryHandle, path: string) => {
          folderCount++;
          setStats(prev => ({ ...prev, foldersProcessed: folderCount }));
          
          for await (const entry of handle.values()) {
            if (entry.kind === 'file') {
              try {
                const fileHandle = entry as FileSystemFileHandle;
                const file = await fileHandle.getFile();
                const filePath = path ? `${path}/${file.name}` : file.name;
                
                newFiles.push({
                  name: file.name,
                  path: filePath,
                  type: file.type || getFileExtension(file.name),
                  size: file.size,
                });
                
                setStats(prev => ({
                  ...prev,
                  filesScanned: prev.filesScanned + 1,
                  totalSize: prev.totalSize + file.size
                }));
                
                // Update progress
                setScanProgress(prev => {
                  const newProgress = Math.min(95, prev + 1); // Cap at 95% until final processing
                  setContextScanProgress(newProgress);
                  return newProgress;
                });
              } catch (err) {
                console.error("Error processing file:", err);
              }
            } else if (entry.kind === 'directory' && includeSubfolders) {
              const dirHandle = entry as FileSystemDirectoryHandle;
              setCurrentScannedFolder(`${path}/${dirHandle.name}`.replace(/^\//, ''));
              await processFolder(dirHandle, path ? `${path}/${dirHandle.name}` : dirHandle.name);
            }
          }
        };
        
        await processFolder(dirHandle, '');
        
        // Set files and update progress to 100%
        setFiles(newFiles);
        setScanProgress(100);
        setContextScanProgress(100);
        
        toast("Scan Complete", {
          description: `Successfully scanned ${newFiles.length} files across ${folderCount} folders.`,
        });
      } catch (err) {
        console.error("Error during folder scanning:", err);
        toast("Scan Error", {
          description: "There was an error scanning the folder. Please try again.",
        });
      } finally {
        clearInterval(timer);
        setScanning(false);
        setIsScanning(false);
      }
    } catch (err) {
      console.error("Error selecting folder:", err);
      toast("Selection Error", {
        description: "There was an error selecting the folder. Please try again.",
      });
      setScanning(false);
      setIsScanning(false);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const timer = startTimer();
    
    setScanning(true);
    setScanProgress(0);
    
    // Process selected files
    const newFiles: FileItem[] = [];
    
    Array.from(selectedFiles).forEach((file) => {
      newFiles.push({
        name: file.name,
        path: file.name,
        type: file.type || getFileExtension(file.name),
        size: file.size,
      });
    });
    
    // Update stats
    setStats({
      filesScanned: newFiles.length,
      foldersProcessed: 1,
      plrFilesDetected: 0,
      errors: [],
      totalSize: newFiles.reduce((sum, file) => sum + file.size, 0),
      duplicatesFound: 0,
      elapsedTime: '00:00:00',
    });
    
    // Update files and progress
    setFiles(newFiles);
    setScanProgress(100);
    
    toast("Files Selected", {
      description: `Successfully selected ${newFiles.length} files.`,
    });
    
    clearInterval(timer);
    setScanning(false);
  };

  const getFileExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'doc': case 'docx': return 'application/msword';
      case 'xls': case 'xlsx': return 'application/vnd.ms-excel';
      case 'ppt': case 'pptx': return 'application/vnd.ms-powerpoint';
      case 'txt': return 'text/plain';
      case 'jpg': case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      default: return `application/${ext}`;
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFiles = async () => {
    if (!user || files.length === 0) return;
    
    setProcessingFiles(true);
    
    try {
      // Process files and upload metadata to Supabase
      let processed = 0;
      
      for (const file of files) {
        // Insert file metadata into Supabase
        const { error } = await supabase
          .from('plr_files')
          .insert({
            user_id: user.id,
            file_name: file.name,
            file_path: file.path,
            file_type: file.type,
            file_size: file.size,
            category_id: null,  // Will be categorized later
            tags: [],        // Will be tagged later
          });
          
        if (error) {
          console.error("Error inserting file metadata:", error);
          toast("Processing Error", {
            description: `Error processing ${file.name}. Please try again.`,
          });
        }
        
        processed++;
        setScanProgress(Math.round((processed / files.length) * 100));
      }
      
      toast("Processing Complete", {
        description: `Successfully added ${processed} files to your PLR library.`,
      });
      
      // Navigate to the PLR dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Error processing files:", err);
      toast("Processing Error", {
        description: "There was an error processing your files. Please try again.",
      });
    } finally {
      setProcessingFiles(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Scan & Organize PLR Content</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="folder" className="flex items-center">
                        <FolderOpen className="mr-2 h-4 w-4" /> Select Folder
                      </TabsTrigger>
                      <TabsTrigger value="files" className="flex items-center">
                        <File className="mr-2 h-4 w-4" /> Select Files
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="folder" className="pt-4">
                      <div className="text-center p-4 border-2 border-dashed rounded-md">
                        <FolderOpen className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium mb-1">Select a folder with PLR content</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose a folder containing your PLR files to scan and organize
                        </p>
                        <div className="flex justify-center space-x-4">
                          <Button 
                            onClick={handleFolderSelect}
                            disabled={scanning || processingFiles}
                          >
                            {scanning ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Scanning...
                              </>
                            ) : (
                              <>
                                <FolderOpen className="mr-2 h-4 w-4" />
                                Browse Folders
                              </>
                            )}
                          </Button>
                          <Button 
                            onClick={handleTestScan}
                            disabled={scanning || processingFiles}
                            variant="secondary"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Test Scan
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="files" className="pt-4">
                      <div className="text-center p-4 border-2 border-dashed rounded-md">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium mb-1">Select PLR files</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose individual PLR files to add to your library
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          multiple
                          hidden
                        />
                        <Button 
                          onClick={handleFileSelect}
                          disabled={scanning || processingFiles}
                          className="mx-auto"
                        >
                          {scanning ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Select Files</>
                          )}
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
                          checked={includeSubfolders} 
                          onChange={(e) => setIncludeSubfolders(e.target.checked)}
                        />
                        <label htmlFor="scan-subfolders">Include subfolders</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-metadata" 
                          className="mr-2" 
                          checked={extractMetadata} 
                          onChange={(e) => setExtractMetadata(e.target.checked)}
                        />
                        <label htmlFor="scan-metadata">Extract metadata</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-preview" 
                          className="mr-2" 
                          checked={generatePreviews} 
                          onChange={(e) => setGeneratePreviews(e.target.checked)}
                        />
                        <label htmlFor="scan-preview">Generate previews</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="scan-duplicates" 
                          className="mr-2" 
                          checked={detectDuplicates} 
                          onChange={(e) => setDetectDuplicates(e.target.checked)}
                        />
                        <label htmlFor="scan-duplicates">Detect duplicates</label>
                      </div>
                    </div>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="pt-4">
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Files Found: {files.length}</h3>
                        <span className="text-sm text-muted-foreground">Total Size: {formatBytes(stats.totalSize)}</span>
                      </div>
                      
                      <div className="max-h-40 overflow-y-auto border rounded-md p-2 mb-4">
                        {files.map((file, index) => (
                          <div key={index} className="text-sm flex items-center py-1 border-b last:border-b-0">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="truncate flex-grow">{file.path}</span>
                            <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        size="lg" 
                        onClick={processFiles}
                        disabled={processingFiles || scanning}
                        className="w-full"
                      >
                        {processingFiles ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing Files...
                          </>
                        ) : (
                          <>
                            <FilePlus2 className="mr-2 h-4 w-4" />
                            Add Files to Library
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                  
                  {(scanning || processingFiles) && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Progress</span>
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
              <CardHeader className="pb-3">
                <CardTitle>Scan Statistics</CardTitle>
                <CardDescription>Information about your scan process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Files Found:</span>
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
                  <span className="font-medium">{stats.elapsedTime}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle>Browser Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <p className="text-sm text-muted-foreground">Use individual file selection instead of folder scanning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PLRScan;

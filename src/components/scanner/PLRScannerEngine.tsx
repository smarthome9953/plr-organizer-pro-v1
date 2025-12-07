import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { 
  FolderSearch, Play, Pause, Settings, FolderOutput, 
  CheckCircle2, AlertCircle, Loader2, FileText, Image, Video, Music
} from 'lucide-react';

interface ScanResult {
  file: string;
  isPLR: boolean;
  confidence: number;
  contentType: string;
  niche: string;
  licenseType: string;
  qualityRating: string;
  tags: string[];
  reason: string;
}

interface PLRScannerEngineProps {
  onScanComplete?: (results: ScanResult[]) => void;
}

export default function PLRScannerEngine({ onScanComplete }: PLRScannerEngineProps) {
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [currentFile, setCurrentFile] = useState('');
  const [filesScanned, setFilesScanned] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  
  // Organization settings
  const [organizationMethod, setOrganizationMethod] = useState<'copy' | 'move'>('copy');
  const [baseFolder, setBaseFolder] = useState('Documents/PLR Organizer');
  const [autoOrganize, setAutoOrganize] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const isElectron = typeof window !== 'undefined' && window.electronAPI;

  const handleSelectFolder = useCallback(async () => {
    if (!isElectron) {
      toast({
        title: 'Desktop App Required',
        description: 'Folder scanning requires the desktop app. Please download it from the Download page.',
        variant: 'destructive'
      });
      return null;
    }

    try {
      const result = await window.electronAPI.selectFolder();
      return result;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to select folder',
        variant: 'destructive'
      });
      return null;
    }
  }, [isElectron]);

  const handleScan = useCallback(async () => {
    const folderPath = await handleSelectFolder();
    if (!folderPath) return;

    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    setFilesScanned(0);

    try {
      // Scan directory for files using Electron API
      // The scanDirectory method is defined in electron/preload/index.ts
      const electronApi = window.electronAPI as any;
      if (!electronApi?.scanDirectory) {
        throw new Error('scanDirectory not available');
      }
      
      const files = await electronApi.scanDirectory(folderPath, {
        fileTypes: ['pdf', 'doc', 'docx', 'txt', 'html', 'zip', 'rar', 'mp4', 'mp3', 'png', 'jpg', 'jpeg', 'gif'],
        maxDepth: 10,
        includeSubfolders: true
      });

      setTotalFiles(files.length);
      
      if (files.length === 0) {
        toast({
          title: 'No Files Found',
          description: 'No supported files found in the selected folder.',
        });
        setIsScanning(false);
        return;
      }

      // Process files in batches for AI analysis
      const batchSize = 10;
      const allResults: ScanResult[] = [];

      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        setCurrentFile(batch[0]?.name || '');
        
        // Call PLR analyzer edge function
        const { data, error } = await supabase.functions.invoke('plr-analyzer', {
          body: { files: batch.map((f: any) => ({ name: f.name, path: f.path, size: f.size, type: f.type })) }
        });

        if (error) {
          console.error('Analysis error:', error);
        } else if (data?.results) {
          allResults.push(...data.results);
        }

        setFilesScanned(Math.min(i + batchSize, files.length));
        setScanProgress(Math.round(((i + batchSize) / files.length) * 100));
      }

      setScanResults(allResults);
      
      // Auto-organize if enabled
      if (autoOrganize && isElectron) {
        await organizeFiles(allResults.filter(r => r.isPLR));
      }

      // Save scan history
      if (user) {
        await supabase.from('scan_history').insert({
          user_id: user.id,
          files_found: files.length,
          plr_files_detected: allResults.filter(r => r.isPLR).length,
          folders_scanned: [folderPath],
          scan_options: { autoOrganize, organizationMethod }
        });
      }

      toast({
        title: 'Scan Complete',
        description: `Found ${allResults.filter(r => r.isPLR).length} PLR files out of ${files.length} scanned.`,
      });

      onScanComplete?.(allResults);
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: 'Scan Error',
        description: error instanceof Error ? error.message : 'Failed to complete scan',
        variant: 'destructive'
      });
    } finally {
      setIsScanning(false);
      setCurrentFile('');
    }
  }, [handleSelectFolder, autoOrganize, organizationMethod, user, onScanComplete, isElectron]);

  const organizeFiles = async (plrFiles: ScanResult[]) => {
    if (!isElectron || plrFiles.length === 0) return;

    try {
      const electronApi = window.electronAPI as any;
      if (!electronApi?.organizeFiles) {
        throw new Error('organizeFiles not available');
      }
      
      const filesToOrganize = plrFiles.map(file => ({
        sourcePath: file.file,
        niche: file.niche || 'Uncategorized',
        subNiche: file.contentType || undefined
      }));

      const results = await electronApi.organizeFiles(filesToOrganize, {
        baseFolder,
        action: organizationMethod
      });

      const successCount = results.filter((r: any) => r.success).length;
      
      toast({
        title: 'Organization Complete',
        description: `Organized ${successCount} of ${plrFiles.length} PLR files into niche folders.`,
      });

      // Save organized files to database
      if (user) {
        for (const result of results.filter((r: any) => r.success)) {
          const plrFile = plrFiles.find(f => f.file === result.sourcePath);
          if (plrFile) {
            await supabase.from('plr_files').insert({
              user_id: user.id,
              file_name: result.sourcePath.split('/').pop() || result.sourcePath.split('\\').pop(),
              file_path: result.destinationPath,
              file_type: plrFile.contentType,
              file_size: 0,
              is_plr: true,
              confidence_score: plrFile.confidence,
              license_type: plrFile.licenseType,
              quality_score: plrFile.qualityRating === 'A' ? 100 : plrFile.qualityRating === 'B' ? 75 : plrFile.qualityRating === 'C' ? 50 : 25,
              tags: plrFile.tags
            });
          }
        }
      }
    } catch (error) {
      console.error('Organization error:', error);
      toast({
        title: 'Organization Error',
        description: 'Some files could not be organized',
        variant: 'destructive'
      });
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook':
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'graphic':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderSearch className="h-5 w-5" />
                PLR Scanner Engine
              </CardTitle>
              <CardDescription>
                Scan folders to detect and organize PLR content automatically
              </CardDescription>
            </div>
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Organization Settings</DialogTitle>
                  <DialogDescription>
                    Configure how PLR files are organized after scanning
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-organize">Auto-organize after scan</Label>
                    <Switch 
                      id="auto-organize" 
                      checked={autoOrganize} 
                      onCheckedChange={setAutoOrganize} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization Method</Label>
                    <Select value={organizationMethod} onValueChange={(v: 'copy' | 'move') => setOrganizationMethod(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="copy">Copy files (keep originals)</SelectItem>
                        <SelectItem value="move">Move files (delete originals)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                    <div className="space-y-2">
                    <Label>Base Organization Folder</Label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={baseFolder} 
                        onChange={(e) => setBaseFolder(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                      />
                      <Button variant="outline" onClick={async () => {
                        const electronApi = window.electronAPI as any;
                        if (electronApi?.selectDestinationFolder) {
                          const folder = await electronApi.selectDestinationFolder();
                          if (folder) setBaseFolder(folder);
                        } else if (window.electronAPI?.selectFolder) {
                          const folder = await window.electronAPI.selectFolder();
                          if (folder) setBaseFolder(folder);
                        }
                      }}>
                        <FolderOutput className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setShowSettings(false)}>Save Settings</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={handleScan} 
              disabled={isScanning}
              className="flex-1"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Select Folder & Scan
                </>
              )}
            </Button>
            {isScanning && (
              <Button variant="outline" onClick={() => setIsScanning(false)}>
                <Pause className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning: {currentFile}</span>
                <span>{filesScanned} / {totalFiles} files</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
            <CardDescription>
              Found {scanResults.filter(r => r.isPLR).length} PLR files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {scanResults.filter(r => r.isPLR).map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {getContentTypeIcon(result.contentType)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[300px]">
                        {result.file.split('/').pop() || result.file.split('\\').pop()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {result.niche} • {result.contentType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={result.qualityRating === 'A' ? 'default' : 'secondary'}>
                      {result.qualityRating}
                    </Badge>
                    <Badge variant="outline">
                      {result.confidence}%
                    </Badge>
                    {result.isPLR ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!autoOrganize && scanResults.filter(r => r.isPLR).length > 0 && (
              <Button 
                className="w-full mt-4" 
                onClick={() => organizeFiles(scanResults.filter(r => r.isPLR))}
              >
                <FolderOutput className="mr-2 h-4 w-4" />
                Organize {scanResults.filter(r => r.isPLR).length} PLR Files Now
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {!isElectron && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <FolderSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Desktop App Required</h3>
            <p className="text-muted-foreground mb-4">
              File scanning requires the desktop application for direct file system access.
            </p>
            <Button asChild>
              <a href="/download">Download Desktop App</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

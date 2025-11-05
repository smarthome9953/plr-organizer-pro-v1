
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for our file system
export interface FileSystemNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder' | 'drive';
  size?: number;
  children?: FileSystemNode[];
  expanded?: boolean;
  selected?: boolean;
  usedSpace?: number;
  totalSpace?: number;
  extension?: string;
  isPlr?: boolean;
  confidence?: number;
}

export interface ScanOptions {
  includeSubfolders: boolean;
  scanDepth: string;
  fileTypes: string[];
  scanSpeed: 'quick' | 'deep';
}

export interface ScanProfile {
  id: string;
  name: string;
  options: ScanOptions;
}

interface FileExplorerContextType {
  fileSystem: FileSystemNode[];
  selectedFolders: FileSystemNode[];
  expandFolder: (nodeId: string) => void;
  collapseFolder: (nodeId: string) => void;
  toggleFolderSelection: (node: FileSystemNode) => void;
  addDirectoryToFileSystem: () => Promise<void>;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  scanProgress: number;
  setScanProgress: (progress: number) => void;
  currentScannedFolder: string;
  setCurrentScannedFolder: (folder: string) => void;
  scanResults: FileSystemNode[];
  startScan: () => void;
  cancelScan: () => void;
  scanOptions: ScanOptions;
  updateScanOptions: (options: Partial<ScanOptions>) => void;
  savedScanProfiles: ScanProfile[];
  saveScanProfile: (name: string) => void;
  loadScanProfile: (profileId: string) => void;
  deleteScanProfile: (profileId: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Mock data for initial filesystem
const initialFileSystem: FileSystemNode[] = [
  {
    id: 'c-drive',
    name: 'C:',
    path: 'C:/',
    type: 'drive',
    usedSpace: 50000000000,
    totalSpace: 100000000000,
    expanded: true,
    children: [
      {
        id: 'c-users',
        name: 'Users',
        path: 'C:/Users',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: 'c-users-documents',
            name: 'Documents',
            path: 'C:/Users/Documents',
            type: 'folder',
          },
          {
            id: 'c-users-downloads',
            name: 'Downloads',
            path: 'C:/Users/Downloads',
            type: 'folder',
          },
          {
            id: 'c-users-desktop',
            name: 'Desktop',
            path: 'C:/Users/Desktop',
            type: 'folder',
          }
        ]
      },
      {
        id: 'c-program-files',
        name: 'Program Files',
        path: 'C:/Program Files',
        type: 'folder'
      }
    ]
  },
  {
    id: 'd-drive',
    name: 'D:',
    path: 'D:/',
    type: 'drive',
    usedSpace: 200000000000,
    totalSpace: 500000000000
  }
];

// Mock PLR detection results
const mockPlrFiles: FileSystemNode[] = [
  {
    id: 'plr-1',
    name: 'Keto Diet PLR Bundle',
    path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle',
    type: 'folder',
    isPlr: true,
    confidence: 0.95,
    children: [
      {
        id: 'plr-1-1',
        name: 'Keto Diet eBook.pdf',
        path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle/Keto Diet eBook.pdf',
        type: 'file',
        size: 2500000,
        extension: 'pdf',
        isPlr: true
      },
      {
        id: 'plr-1-2',
        name: 'Keto Diet Images',
        path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle/Keto Diet Images',
        type: 'folder',
        isPlr: true,
        children: [
          {
            id: 'plr-1-2-1',
            name: 'keto-meal-1.jpg',
            path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle/Keto Diet Images/keto-meal-1.jpg',
            type: 'file',
            size: 250000,
            extension: 'jpg',
            isPlr: true
          },
          {
            id: 'plr-1-2-2',
            name: 'keto-meal-2.jpg',
            path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle/Keto Diet Images/keto-meal-2.jpg',
            type: 'file',
            size: 300000,
            extension: 'jpg',
            isPlr: true
          }
        ]
      },
      {
        id: 'plr-1-3',
        name: 'Keto Diet Videos.zip',
        path: 'C:/Users/Documents/PLR/Keto Diet PLR Bundle/Keto Diet Videos.zip',
        type: 'file',
        size: 152000000,
        extension: 'zip',
        isPlr: true
      }
    ]
  },
  {
    id: 'plr-2',
    name: 'WordPress Plugin PLR',
    path: 'C:/Users/Downloads/WordPress Plugin PLR',
    type: 'folder',
    isPlr: true,
    confidence: 0.88,
    children: [
      {
        id: 'plr-2-1',
        name: 'SocialBooster WordPress Plugin.zip',
        path: 'C:/Users/Downloads/WordPress Plugin PLR/SocialBooster WordPress Plugin.zip',
        type: 'file',
        size: 5300000,
        extension: 'zip',
        isPlr: true
      },
      {
        id: 'plr-2-2',
        name: 'Documentation.pdf',
        path: 'C:/Users/Downloads/WordPress Plugin PLR/Documentation.pdf',
        type: 'file',
        size: 1200000,
        extension: 'pdf',
        isPlr: true
      }
    ]
  }
];

// Load saved profiles from localStorage
const loadSavedProfiles = (): ScanProfile[] => {
  try {
    const savedProfiles = localStorage.getItem('plrScanProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  } catch (error) {
    console.error('Error loading saved profiles:', error);
    return [];
  }
};

const FileExplorerContext = createContext<FileExplorerContextType | undefined>(undefined);

export const FileExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<FileSystemNode[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [currentScannedFolder, setCurrentScannedFolder] = useState<string>('');
  const [scanResults, setScanResults] = useState<FileSystemNode[]>([]);
  const [savedScanProfiles, setSavedScanProfiles] = useState<ScanProfile[]>(loadSavedProfiles());
  const [scanCancelled, setScanCancelled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('plrOrganizerTheme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });
  const [scanOptions, setScanOptions] = useState<ScanOptions>({
    includeSubfolders: true,
    scanDepth: 'unlimited',
    fileTypes: ['pdf', 'zip', 'rar', 'docx', 'jpg', 'png', 'html', 'txt'],
    scanSpeed: 'quick'
  });

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plrScanProfiles', JSON.stringify(savedScanProfiles));
  }, [savedScanProfiles]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('plrOrganizerTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Update file system node at any depth
  const updateNodeInTree = (nodes: FileSystemNode[], nodeId: string, updater: (node: FileSystemNode) => FileSystemNode): FileSystemNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return updater(node);
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeInTree(node.children, nodeId, updater)
        };
      }
      return node;
    });
  };

  // Expand a folder in the file system
  const expandFolder = (nodeId: string) => {
    setFileSystem(prevState => 
      updateNodeInTree(prevState, nodeId, node => ({
        ...node,
        expanded: true
      }))
    );
  };

  // Collapse a folder in the file system
  const collapseFolder = (nodeId: string) => {
    setFileSystem(prevState => 
      updateNodeInTree(prevState, nodeId, node => ({
        ...node,
        expanded: false
      }))
    );
  };

  // Add directory to file system
  const addDirectoryToFileSystem = async () => {
    toast.info('Direct folder access is not available. Please use the file upload feature.');
  };

  // Toggle folder selection
  const toggleFolderSelection = (node: FileSystemNode) => {
    const isAlreadySelected = selectedFolders.some(folder => folder.id === node.id);
    
    if (isAlreadySelected) {
      setSelectedFolders(prev => prev.filter(folder => folder.id !== node.id));
    } else {
      setSelectedFolders(prev => [...prev, node]);
    }
  };

  // Start scan with selected folders
  const startScan = async () => {
    if (selectedFolders.length === 0) {
      toast.error('Please select at least one folder to scan');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanCancelled(false);
    setScanResults([]);
    setCurrentScannedFolder(selectedFolders[0].path);
    
    try {
      const selectedPaths = selectedFolders.map(f => f.path);
      const filesToScan: any[] = []; // Web-based scanning not implemented in this context

      if (filesToScan.length === 0) {
        toast.info('No files found matching the selected criteria');
        setIsScanning(false);
        return;
      }

      toast.loading(`Analyzing ${filesToScan.length} files...`, { id: 'scanning' });

      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < filesToScan.length; i += batchSize) {
        batches.push(filesToScan.slice(i, i + batchSize));
      }

      const allResults: any[] = [];
      let processedFiles = 0;

      for (const batch of batches) {
        if (scanCancelled) break;

        const { data, error } = await supabase.functions.invoke('plr-analyzer', {
          body: { files: batch }
        });

        if (error) {
          console.error('Error analyzing batch:', error);
          continue;
        }

        if (data?.results) {
          const plrFiles = data.results.filter((r: any) => r.isPLR);
          allResults.push(...plrFiles);
        }

        processedFiles += batch.length;
        setScanProgress(Math.round((processedFiles / filesToScan.length) * 100));
      }

      if (allResults.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { error: insertError } = await supabase.from('plr_files').insert(
            allResults.map(file => ({
              user_id: user.id,
              file_name: file.file.split('/').pop(),
              file_path: file.file,
              file_size: filesToScan.find((f: any) => f.path === file.file)?.size || 0,
              file_type: file.contentType,
              is_plr: true,
              confidence_score: file.confidence,
              quality_score: file.qualityRating === 'A' ? 90 : file.qualityRating === 'B' ? 70 : file.qualityRating === 'C' ? 50 : 30,
              license_type: file.licenseType,
              tags: file.tags,
              description: `${file.contentType} content in ${file.niche} niche`,
            }))
          );

          if (insertError) {
            console.error('Error saving results:', insertError);
          }
        }
      }

      setScanResults(allResults.map(r => ({
        id: crypto.randomUUID(),
        name: r.file.split('/').pop(),
        path: r.file,
        type: 'file',
        isPlr: true,
        confidence: r.confidence
      })));
      
      if (!scanCancelled) {
        toast.success(`Scan complete! Found ${allResults.length} PLR files.`, { id: 'scanning' });
      } else {
        toast.info('Scan cancelled', { id: 'scanning' });
      }

    } catch (error) {
      console.error('Scan error:', error);
      toast.error('Scan failed: ' + (error as Error).message, { id: 'scanning' });
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  // Cancel ongoing scan
  const cancelScan = () => {
    setScanCancelled(true);
    setIsScanning(false);
    setScanProgress(0);
    setCurrentScannedFolder('');
  };

  // Update scan options
  const updateScanOptions = (options: Partial<ScanOptions>) => {
    setScanOptions(prev => ({
      ...prev,
      ...options
    }));
  };

  // Save scan profile
  const saveScanProfile = (name: string) => {
    const newProfile: ScanProfile = {
      id: `profile-${Date.now()}`,
      name,
      options: {...scanOptions}
    };
    
    setSavedScanProfiles(prev => [...prev, newProfile]);
  };

  // Load scan profile
  const loadScanProfile = (profileId: string) => {
    const profile = savedScanProfiles.find(p => p.id === profileId);
    if (profile) {
      setScanOptions(profile.options);
    }
  };

  // Delete scan profile
  const deleteScanProfile = (profileId: string) => {
    setSavedScanProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <FileExplorerContext.Provider
      value={{
        fileSystem,
        selectedFolders,
        expandFolder,
        collapseFolder,
        toggleFolderSelection,
        addDirectoryToFileSystem,
        isScanning,
        setIsScanning,
        scanProgress,
        setScanProgress,
        currentScannedFolder,
        setCurrentScannedFolder,
        scanResults,
        startScan,
        cancelScan,
        scanOptions,
        updateScanOptions,
        savedScanProfiles,
        saveScanProfile,
        loadScanProfile,
        deleteScanProfile,
        theme,
        toggleTheme
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
};

export const useFileExplorer = () => {
  const context = useContext(FileExplorerContext);
  if (context === undefined) {
    throw new Error('useFileExplorer must be used within a FileExplorerProvider');
  }
  return context;
};

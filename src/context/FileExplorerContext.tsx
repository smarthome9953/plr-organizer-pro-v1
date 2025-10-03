
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileSystemService } from '@/services/fileSystemService';
import { toast } from 'sonner';

// Types for our file system
export type ViewType = 'physical' | 'category' | 'date' | 'license' | 'quality';

export interface VirtualView {
  id: string;
  name: string;
  type: ViewType;
  nodes: FileSystemNode[];
  expanded?: boolean;
}

export interface FileSystemNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder' | 'drive' | 'virtual';
  size?: number;
  children?: FileSystemNode[];
  expanded?: boolean;
  selected?: boolean;
  usedSpace?: number;
  totalSpace?: number;
  extension?: string;
  isPlr?: boolean;
  confidence?: number;
  category?: string;
  licenseType?: string;
  qualityScore?: number;
  metadata?: Record<string, any>;
  lastModified?: Date;
  createdAt?: Date;
}

interface PlrFileRecord {
  id: string;
  user_id: string;
  category?: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  license_type?: string;
  confidence_score?: number;
  tags?: string[];
  quality_score?: number;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
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
  saveToDatabase: (files: FileSystemNode[]) => Promise<{ success: boolean; errors: string[] }>;
  lastScanId: string | null;
  setLastScanId: (id: string | null) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  virtualViews: VirtualView[];
  generateVirtualView: (viewType: ViewType) => void;
  expandVirtualView: (viewId: string) => void;
  collapseVirtualView: (viewId: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  startScan: () => void;
  cancelScan: () => void;
  scanOptions: ScanOptions;
  updateScanOptions: (options: Partial<ScanOptions>) => void;
  savedScanProfiles: ScanProfile[];
  saveScanProfile: (name: string) => void;
  loadScanProfile: (profileId: string) => void;
  deleteScanProfile: (profileId: string) => void;
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
  const [lastScanId, setLastScanId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('physical');
  const [virtualViews, setVirtualViews] = useState<VirtualView[]>([]);

  const saveToDatabase = async (files: FileSystemNode[]): Promise<{ success: boolean; errors: string[] }> => {
    const errors: string[] = [];
    const user = supabase.auth.getUser();
    
    if (!user) {
      return { success: false, errors: ['User not authenticated'] };
    }

    try {
      // First create a scan history entry
      const { data: scanHistory, error: scanError } = await supabase
        .from('scan_history')
        .insert({
          user_id: (await user).data.user?.id,
          total_files: files.length,
          plr_files_found: files.filter(f => f.isPlr).length,
          scan_date: new Date().toISOString()
        })
        .select('id')
        .single();

      if (scanError) {
        console.error('Error creating scan history:', scanError);
        errors.push('Failed to create scan history');
        return { success: false, errors };
      }

      setLastScanId(scanHistory.id);

      // Then insert file records
      for (const file of files) {
        if (file.type === 'file' && file.isPlr) {
          const { error: fileError } = await supabase
            .from('plr_files')
            .insert({
              user_id: (await user).data.user?.id,
              file_name: file.name,
              file_path: file.path,
              file_size: file.size || 0,
              file_type: file.extension || 'unknown',
              content_hash: `${file.path}-${file.size || 0}-${file.lastModified?.getTime() || Date.now()}`,
              license_type: 'PLR',
              confidence_score: file.confidence || 0.0,
            });

          if (fileError) {
            console.error('Error saving file:', file.path, fileError);
            errors.push(`Failed to save ${file.path}: ${fileError.message}`);
          }
        }
      }

      return {
        success: errors.length === 0,
        errors
      };
    } catch (error) {
      console.error('Database operation failed:', error);
      return {
        success: false,
        errors: ['Database operation failed: ' + (error as Error).message]
      };
    }
  };
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
    try {
      if (!FileSystemService.isSupported()) {
        toast.error('File System Access API is not supported in this browser. Please use Chrome, Edge, or Opera.');
        return;
      }

      const dirHandle = await FileSystemService.pickDirectory();
      
      if (!dirHandle) {
        return;
      }

      toast.loading('Reading directory structure...', { id: 'reading-dir' });

      const maxDepth = scanOptions.scanDepth === 'unlimited' ? 10 : parseInt(scanOptions.scanDepth);
      
      const rootNode = await FileSystemService.readDirectory(
        dirHandle,
        (progress) => {
          console.log('Reading:', progress.currentPath);
        },
        maxDepth
      );

      setFileSystem((prev) => {
        const exists = prev.some(node => node.path === rootNode.path);
        if (exists) {
          toast.warning('Directory already added', { id: 'reading-dir' });
          return prev;
        }
        
        toast.success('Directory added successfully', { id: 'reading-dir' });
        return [...prev, rootNode];
      });

    } catch (error) {
      console.error('Error adding directory:', error);
      toast.error('Failed to add directory: ' + (error as Error).message, { id: 'reading-dir' });
    }
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
      const maxDepth = scanOptions.scanDepth === 'unlimited' ? 10 : parseInt(scanOptions.scanDepth);
      
      const filesToScan = await FileSystemService.collectFilesForScanning(
        fileSystem,
        selectedPaths,
        scanOptions.fileTypes,
        maxDepth
      );

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
              content_hash: `${file.file}-${filesToScan.find((f: any) => f.path === file.file)?.size || 0}-${Date.now()}`,
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

  // Generate virtual view based on type
  const generateVirtualView = async (viewType: ViewType) => {
    const { data: plrFiles } = await supabase
      .from('plr_files')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (!plrFiles) return;

    const files = plrFiles as PlrFileRecord[];
    let nodes: FileSystemNode[] = [];
    
    switch (viewType) {
      case 'category':
        const categories = new Map<string, FileSystemNode[]>();
        plrFiles.forEach(file => {
          const category = file.category || 'Uncategorized';
          if (!categories.has(category)) {
            categories.set(category, []);
          }
          categories.get(category)?.push({
            id: file.id,
            name: file.file_name,
            path: file.file_path,
            type: 'file',
            size: file.file_size,
            isPlr: true,
            category: category,
            licenseType: file.license_type,
            qualityScore: file.quality_score
          });
        });
        nodes = Array.from(categories.entries()).map(([category, files]) => ({
          id: `category-${category}`,
          name: category,
          path: `virtual://${category}`,
          type: 'virtual',
          children: files,
          expanded: false
        }));
        break;

      case 'date':
        const dateGroups = new Map<string, FileSystemNode[]>();
        plrFiles.forEach(file => {
          const date = new Date(file.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          if (!dateGroups.has(date)) {
            dateGroups.set(date, []);
          }
          dateGroups.get(date)?.push({
            id: file.id,
            name: file.file_name,
            path: file.file_path,
            type: 'file',
            size: file.file_size,
            isPlr: true,
            category: file.category,
            licenseType: file.license_type,
            qualityScore: file.quality_score
          });
        });
        nodes = Array.from(dateGroups.entries()).map(([date, files]) => ({
          id: `date-${date}`,
          name: date,
          path: `virtual://${date}`,
          type: 'virtual',
          children: files,
          expanded: false
        }));
        break;

      case 'license':
        const licenseGroups = new Map<string, FileSystemNode[]>();
        plrFiles.forEach(file => {
          const license = file.license_type || 'Unknown';
          if (!licenseGroups.has(license)) {
            licenseGroups.set(license, []);
          }
          licenseGroups.get(license)?.push({
            id: file.id,
            name: file.file_name,
            path: file.file_path,
            type: 'file',
            size: file.file_size,
            isPlr: true,
            category: file.category,
            licenseType: file.license_type,
            qualityScore: file.quality_score
          });
        });
        nodes = Array.from(licenseGroups.entries()).map(([license, files]) => ({
          id: `license-${license}`,
          name: license,
          path: `virtual://${license}`,
          type: 'virtual',
          children: files,
          expanded: false
        }));
        break;

      case 'quality':
        const qualityGroups = new Map<string, FileSystemNode[]>();
        const qualityLevels = ['Premium', 'High', 'Medium', 'Basic'];
        plrFiles.forEach(file => {
          const score = file.quality_score || 0;
          let quality = 'Unknown';
          if (score >= 90) quality = 'Premium';
          else if (score >= 70) quality = 'High';
          else if (score >= 50) quality = 'Medium';
          else if (score > 0) quality = 'Basic';
          
          if (!qualityGroups.has(quality)) {
            qualityGroups.set(quality, []);
          }
          qualityGroups.get(quality)?.push({
            id: file.id,
            name: file.file_name,
            path: file.file_path,
            type: 'file',
            size: file.file_size,
            isPlr: true,
            category: file.category,
            licenseType: file.license_type,
            qualityScore: file.quality_score
          });
        });
        
        nodes = qualityLevels.map(quality => ({
          id: `quality-${quality}`,
          name: quality,
          path: `virtual://${quality}`,
          type: 'virtual',
          children: qualityGroups.get(quality) || [],
          expanded: false
        }));
        break;
    }

    const newView: VirtualView = {
      id: `view-${viewType}-${Date.now()}`,
      name: viewType.charAt(0).toUpperCase() + viewType.slice(1),
      type: viewType,
      nodes,
      expanded: false
    };

    setVirtualViews(prev => [...prev.filter(v => v.type !== viewType), newView]);
    setActiveView(viewType);
  };

  // Expand virtual view
  const expandVirtualView = (viewId: string) => {
    setVirtualViews(prev => prev.map(view => 
      view.id === viewId ? { ...view, expanded: true } : view
    ));
  };

  // Collapse virtual view
  const collapseVirtualView = (viewId: string) => {
    setVirtualViews(prev => prev.map(view => 
      view.id === viewId ? { ...view, expanded: false } : view
    ));
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
        saveToDatabase,
        lastScanId,
        setLastScanId,
        activeView,
        setActiveView,
        virtualViews,
        generateVirtualView,
        expandVirtualView,
        collapseVirtualView,
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

import { contextBridge, ipcRenderer } from 'electron';
import type { PLRFile, FileWatchEvent, UpdateInfo, UpdateProgress } from '../shared/types';

/**
 * Preload script - Secure bridge between main and renderer processes
 * Uses contextBridge to expose a limited, secure API to the renderer
 */

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // ============================================
  // File System Operations
  // ============================================

  /**
   * Open native folder picker dialog
   */
  selectFolder: (): Promise<string | null> => {
    return ipcRenderer.invoke('dialog:openFolder');
  },

  /**
   * Open multiple folder picker dialog
   */
  selectMultipleFolders: (): Promise<string[]> => {
    return ipcRenderer.invoke('dialog:openMultipleFolders');
  },

  /**
   * Read file contents
   */
  readFile: (path: string): Promise<{ success: boolean; content?: string; error?: string }> => {
    return ipcRenderer.invoke('file:read', path);
  },

  /**
   * Get file statistics
   */
  getFileStat: (path: string): Promise<{ success: boolean; stats?: any; error?: string }> => {
    return ipcRenderer.invoke('file:stat', path);
  },

  /**
   * Scan a directory for files
   */
  scanDirectory: (dirPath: string, fileTypes: string[], maxDepth: number): Promise<{ 
    success: boolean; 
    files?: Array<{ path: string; name: string; size: number; type: string }>; 
    error?: string 
  }> => {
    return ipcRenderer.invoke('file:scanDirectory', dirPath, fileTypes, maxDepth);
  },

  /**
   * Get folder structure
   */
  getFolderStructure: (dirPath: string, maxDepth: number): Promise<{ success: boolean; structure?: any; error?: string }> => {
    return ipcRenderer.invoke('file:getFolderStructure', dirPath, maxDepth);
  },

  // ============================================
  // File Organization
  // ============================================

  /**
   * Get default organization folder
   */
  getDefaultOrganizationFolder: (): Promise<string> => {
    return ipcRenderer.invoke('organize:getDefaultFolder');
  },

  /**
   * Organize files to niche folders
   */
  organizeFiles: (
    files: Array<{ sourcePath: string; niche: string; subNiche?: string }>,
    config: { baseFolder: string; action: 'copy' | 'move' }
  ): Promise<{ 
    success: boolean; 
    results?: Array<{ success: boolean; sourcePath: string; destinationPath: string; error?: string }>;
    summary?: { successful: number; failed: number; total: number };
    error?: string 
  }> => {
    return ipcRenderer.invoke('organize:files', files, config);
  },

  /**
   * Select organization destination folder
   */
  selectOrganizationDestination: (): Promise<string | null> => {
    return ipcRenderer.invoke('organize:selectDestination');
  },

  /**
   * Listen for organization progress
   */
  onOrganizeProgress: (callback: (data: { current: number; total: number; currentFile: string }) => void): void => {
    ipcRenderer.on('organize:progress', (_, data) => callback(data));
  },

  // ============================================
  // Folder Watching
  // ============================================

  /**
   * Start watching a folder for changes
   */
  watchFolder: (path: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    return ipcRenderer.invoke('folder:watch', path);
  },

  /**
   * Stop watching a folder
   */
  unwatchFolder: (path: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    return ipcRenderer.invoke('folder:unwatch', path);
  },

  /**
   * Listen for file added events
   */
  onFileAdded: (callback: (event: FileWatchEvent) => void): void => {
    ipcRenderer.on('file:event', (_, event: FileWatchEvent) => {
      if (event.type === 'add') {
        callback(event);
      }
    });
  },

  /**
   * Listen for file changed events
   */
  onFileChanged: (callback: (event: FileWatchEvent) => void): void => {
    ipcRenderer.on('file:event', (_, event: FileWatchEvent) => {
      if (event.type === 'change') {
        callback(event);
      }
    });
  },

  /**
   * Listen for file deleted events
   */
  onFileDeleted: (callback: (event: FileWatchEvent) => void): void => {
    ipcRenderer.on('file:event', (_, event: FileWatchEvent) => {
      if (event.type === 'delete') {
        callback(event);
      }
    });
  },

  /**
   * Listen for file watcher errors
   */
  onFileError: (callback: (event: FileWatchEvent) => void): void => {
    ipcRenderer.on('file:event', (_, event: FileWatchEvent) => {
      if (event.type === 'error') {
        callback(event);
      }
    });
  },

  // ============================================
  // Desktop Features
  // ============================================

  /**
   * Show native OS notification
   */
  showNotification: (title: string, body: string): Promise<{ success: boolean; error?: string }> => {
    return ipcRenderer.invoke('notification:show', title, body);
  },

  /**
   * Open file in default application
   */
  openPath: (filePath: string): Promise<{ success: boolean; error?: string }> => {
    return ipcRenderer.invoke('shell:openPath', filePath);
  },

  /**
   * Show file in folder
   */
  showItemInFolder: (filePath: string): Promise<{ success: boolean }> => {
    return ipcRenderer.invoke('shell:showItemInFolder', filePath);
  },

  // ============================================
  // App Management
  // ============================================

  /**
   * Get application version
   */
  getVersion: (): Promise<string> => {
    return ipcRenderer.invoke('app:getVersion');
  },

  /**
   * Restart the application
   */
  restartApp: (): Promise<void> => {
    return ipcRenderer.invoke('app:restart');
  },

  /**
   * Get app data path
   */
  getAppPath: (name: string): Promise<string> => {
    return ipcRenderer.invoke('app:getPath', name);
  },

  // ============================================
  // Local Database (SQLite)
  // ============================================

  /**
   * Sync PLR files to local database
   */
  syncToLocal: (files: PLRFile[]): Promise<{ success: boolean; count?: number; error?: string }> => {
    return ipcRenderer.invoke('db:syncLocal', files);
  },

  /**
   * Get local PLR files for a user
   */
  getLocalData: (userId: string): Promise<{ success: boolean; files?: PLRFile[]; error?: string }> => {
    return ipcRenderer.invoke('db:getLocal', userId);
  },

  /**
   * Delete local PLR file record
   */
  deleteLocalFile: (id: string): Promise<{ success: boolean; deleted?: boolean; error?: string }> => {
    return ipcRenderer.invoke('db:deleteLocal', id);
  },

  /**
   * Save a setting
   */
  saveSetting: (key: string, value: string): Promise<{ success: boolean; error?: string }> => {
    return ipcRenderer.invoke('db:saveSetting', key, value);
  },

  /**
   * Get a setting
   */
  getSetting: (key: string): Promise<{ success: boolean; value?: string | null; error?: string }> => {
    return ipcRenderer.invoke('db:getSetting', key);
  },

  // ============================================
  // Auto-Updates
  // ============================================

  /**
   * Check for application updates
   */
  checkForUpdates: (): Promise<{ success: boolean; updateInfo?: any; error?: string }> => {
    return ipcRenderer.invoke('update:check');
  },

  /**
   * Download available update
   */
  downloadUpdate: (): Promise<{ success: boolean; error?: string }> => {
    return ipcRenderer.invoke('update:download');
  },

  /**
   * Install downloaded update and restart
   */
  installUpdate: (): Promise<{ success: boolean; error?: string }> => {
    return ipcRenderer.invoke('update:install');
  },

  /**
   * Listen for update checking event
   */
  onUpdateChecking: (callback: () => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'checking') {
        callback();
      }
    });
  },

  /**
   * Listen for update available event
   */
  onUpdateAvailable: (callback: (info: UpdateInfo) => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'available' && data.info) {
        callback(data.info);
      }
    });
  },

  /**
   * Listen for update not available event
   */
  onUpdateNotAvailable: (callback: () => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'not-available') {
        callback();
      }
    });
  },

  /**
   * Listen for update download progress
   */
  onUpdateProgress: (callback: (progress: UpdateProgress) => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'downloading' && data.progress) {
        callback(data.progress);
      }
    });
  },

  /**
   * Listen for update downloaded event
   */
  onUpdateDownloaded: (callback: (info: UpdateInfo) => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'downloaded' && data.info) {
        callback(data.info);
      }
    });
  },

  /**
   * Listen for update error event
   */
  onUpdateError: (callback: (error: string) => void): void => {
    ipcRenderer.on('update:status', (_, data) => {
      if (data.type === 'error' && data.error) {
        callback(data.error);
      }
    });
  },

  // ============================================
  // Menu Events
  // ============================================

  /**
   * Listen for Open Folder menu event
   */
  onMenuOpenFolder: (callback: () => void): void => {
    ipcRenderer.on('menu:openFolder', callback);
  },

  /**
   * Listen for Settings menu event
   */
  onMenuSettings: (callback: () => void): void => {
    ipcRenderer.on('menu:settings', callback);
  },

  /**
   * Listen for About menu event
   */
  onMenuAbout: (callback: () => void): void => {
    ipcRenderer.on('menu:about', callback);
  },
});

// Type definitions for TypeScript support
export interface ElectronAPI {
  // File System
  selectFolder: () => Promise<string | null>;
  selectMultipleFolders: () => Promise<string[]>;
  readFile: (path: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  getFileStat: (path: string) => Promise<{ success: boolean; stats?: any; error?: string }>;
  scanDirectory: (dirPath: string, fileTypes: string[], maxDepth: number) => Promise<{ success: boolean; files?: any[]; error?: string }>;
  getFolderStructure: (dirPath: string, maxDepth: number) => Promise<{ success: boolean; structure?: any; error?: string }>;

  // File Organization
  getDefaultOrganizationFolder: () => Promise<string>;
  organizeFiles: (files: any[], config: any) => Promise<any>;
  selectOrganizationDestination: () => Promise<string | null>;
  onOrganizeProgress: (callback: (data: any) => void) => void;

  // Folder Watching
  watchFolder: (path: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  unwatchFolder: (path: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  onFileAdded: (callback: (event: FileWatchEvent) => void) => void;
  onFileChanged: (callback: (event: FileWatchEvent) => void) => void;
  onFileDeleted: (callback: (event: FileWatchEvent) => void) => void;
  onFileError: (callback: (event: FileWatchEvent) => void) => void;

  // Desktop Features
  showNotification: (title: string, body: string) => Promise<{ success: boolean; error?: string }>;
  openPath: (filePath: string) => Promise<{ success: boolean; error?: string }>;
  showItemInFolder: (filePath: string) => Promise<{ success: boolean }>;

  // App Management
  getVersion: () => Promise<string>;
  restartApp: () => Promise<void>;
  getAppPath: (name: string) => Promise<string>;

  // Database
  syncToLocal: (files: PLRFile[]) => Promise<{ success: boolean; count?: number; error?: string }>;
  getLocalData: (userId: string) => Promise<{ success: boolean; files?: PLRFile[]; error?: string }>;
  deleteLocalFile: (id: string) => Promise<{ success: boolean; deleted?: boolean; error?: string }>;
  saveSetting: (key: string, value: string) => Promise<{ success: boolean; error?: string }>;
  getSetting: (key: string) => Promise<{ success: boolean; value?: string | null; error?: string }>;

  // Auto-Updates
  checkForUpdates: () => Promise<{ success: boolean; updateInfo?: any; error?: string }>;
  downloadUpdate: () => Promise<{ success: boolean; error?: string }>;
  installUpdate: () => Promise<{ success: boolean; error?: string }>;
  onUpdateChecking: (callback: () => void) => void;
  onUpdateAvailable: (callback: (info: UpdateInfo) => void) => void;
  onUpdateNotAvailable: (callback: () => void) => void;
  onUpdateProgress: (callback: (progress: UpdateProgress) => void) => void;
  onUpdateDownloaded: (callback: (info: UpdateInfo) => void) => void;
  onUpdateError: (callback: (error: string) => void) => void;

  // Menu Events
  onMenuOpenFolder: (callback: () => void) => void;
  onMenuSettings: (callback: () => void) => void;
  onMenuAbout: (callback: () => void) => void;
}

// Extend Window interface
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

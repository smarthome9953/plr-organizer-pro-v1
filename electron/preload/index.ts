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
  readFile: (path: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  getFileStat: (path: string) => Promise<{ success: boolean; stats?: any; error?: string }>;

  // Folder Watching
  watchFolder: (path: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  unwatchFolder: (path: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  onFileAdded: (callback: (event: FileWatchEvent) => void) => void;
  onFileChanged: (callback: (event: FileWatchEvent) => void) => void;
  onFileDeleted: (callback: (event: FileWatchEvent) => void) => void;
  onFileError: (callback: (event: FileWatchEvent) => void) => void;

  // Desktop Features
  showNotification: (title: string, body: string) => Promise<{ success: boolean; error?: string }>;

  // App Management
  getVersion: () => Promise<string>;
  restartApp: () => Promise<void>;
  getAppPath: (name: string) => Promise<string>;

  // Database
  syncToLocal: (files: PLRFile[]) => Promise<{ success: boolean; count?: number; error?: string }>;
  getLocalData: (userId: string) => Promise<{ success: boolean; files?: PLRFile[]; error?: string }>;
  deleteLocalFile: (id: string) => Promise<{ success: boolean; deleted?: boolean; error?: string }>;

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

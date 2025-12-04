/// <reference path="../types/electron.d.ts" />
import { FileSystemNode } from '@/context/FileExplorerContext';
import type { PLRFile, FileWatchEvent, UpdateInfo, UpdateProgress } from '../../electron/shared/types';

/**
 * File System Service - Handles real file system access using File System Access API
 * with Electron support and fallback for browsers that don't support it
 */

// Using global File System Access API types

export interface ScanProgress {
  current: number;
  total: number;
  currentPath: string;
}

export class FileSystemService {
  /**
   * Check if running in Electron
   */
  static isElectron(): boolean {
    return Boolean(window.electronAPI);
  }

  /**
   * Check if File System Access API is supported
   */
  static isSupported(): boolean {
    return 'showDirectoryPicker' in window;
  }

  /**
   * Pick a directory using Electron or File System Access API
   */
  static async pickDirectory(): Promise<FileSystemDirectoryHandle | string | null> {
    // Use Electron API if available
    if (this.isElectron() && window.electronAPI) {
      try {
        const folderPath = await window.electronAPI.selectFolder();
        return folderPath;
      } catch (error) {
        console.error('Electron folder picker error:', error);
        return null;
      }
    }

    // Fallback to browser File System Access API
    if (!this.isSupported()) {
      throw new Error('File System Access API is not supported in this browser');
    }

    try {
      const dirHandle = await window.showDirectoryPicker!();
      return dirHandle;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // User cancelled the picker
        return null;
      }
      throw error;
    }
  }

  /**
   * Read directory and build file system tree
   */
  static async readDirectory(
    dirHandle: FileSystemDirectoryHandle,
    onProgress?: (progress: ScanProgress) => void,
    maxDepth: number = 5,
    currentDepth: number = 0,
    parentPath: string = ''
  ): Promise<FileSystemNode> {
    const path = parentPath ? `${parentPath}/${dirHandle.name}` : dirHandle.name;
    
    const node: FileSystemNode = {
      id: crypto.randomUUID(),
      name: dirHandle.name,
      type: 'folder',
      path,
      expanded: false,
      selected: false,
      children: [],
    };

    // Don't recurse beyond max depth
    if (currentDepth >= maxDepth) {
      return node;
    }

    try {
      for await (const entry of dirHandle.values()) {
        if (onProgress) {
          onProgress({
            current: 0,
            total: 0,
            currentPath: `${path}/${entry.name}`,
          });
        }

        if (entry.kind === 'directory') {
          const childNode = await this.readDirectory(
            entry as FileSystemDirectoryHandle,
            onProgress,
            maxDepth,
            currentDepth + 1,
            path
          );
          node.children!.push(childNode);
        } else {
          const file = await (entry as FileSystemFileHandle).getFile();
          const fileNode: FileSystemNode = {
            id: crypto.randomUUID(),
            name: entry.name,
            type: 'file',
            path: `${path}/${entry.name}`,
            size: file.size,
            selected: false,
          };
          node.children!.push(fileNode);
        }
      }
    } catch (error) {
      console.error('Error reading directory:', error);
    }

    return node;
  }

  /**
   * Get selected folders from file system tree
   */
  static getSelectedFolders(node: FileSystemNode): string[] {
    const selected: string[] = [];

    if (node.selected && node.type === 'folder') {
      selected.push(node.path);
    }

    if (node.children) {
      for (const child of node.children) {
        selected.push(...this.getSelectedFolders(child));
      }
    }

    return selected;
  }

  /**
   * Extract file info for PLR analysis
   */
  static async extractFileInfo(fileHandle: FileSystemFileHandle): Promise<{
    name: string;
    size: number;
    type: string;
    lastModified: number;
    content?: string;
  }> {
    const file = await fileHandle.getFile();
    
    let content: string | undefined;
    
    // Extract content from text files
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      content = await file.text();
    }

    return {
      name: file.name,
      size: file.size,
      type: file.type || 'unknown',
      lastModified: file.lastModified,
      content,
    };
  }

  /**
   * Collect files for PLR scanning from selected folders
   */
  static async collectFilesForScanning(
    nodes: FileSystemNode[],
    selectedPaths: string[],
    fileTypes: string[],
    maxDepth: number = 5
  ): Promise<{ path: string; name: string; size: number; type: string }[]> {
    const files: { path: string; name: string; size: number; type: string }[] = [];

    const processNode = (node: FileSystemNode, depth: number = 0) => {
      if (depth > maxDepth) return;

      // Check if this node or any parent is selected
      const isInSelectedPath = selectedPaths.some(
        (selectedPath) => node.path === selectedPath || node.path.startsWith(selectedPath + '/')
      );

      if (!isInSelectedPath) return;

      if (node.type === 'file') {
        const fileExt = node.name.split('.').pop()?.toLowerCase() || '';
        
        if (fileTypes.length === 0 || fileTypes.includes(fileExt)) {
          files.push({
            path: node.path,
            name: node.name,
            size: node.size || 0,
            type: fileExt,
          });
        }
      }

      if (node.children) {
        node.children.forEach((child) => processNode(child, depth + 1));
      }
    };

    nodes.forEach((node) => processNode(node));
    return files;
  }

  // ============================================
  // Electron-Specific Methods
  // ============================================

  /**
   * Watch a folder for changes (Electron only)
   */
  static async watchFolder(path: string): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Folder watching is only available in the desktop app');
    }
    
    const result = await window.electronAPI.watchFolder(path);
    if (!result.success) {
      throw new Error(result.error || 'Failed to watch folder');
    }
  }

  /**
   * Stop watching a folder (Electron only)
   */
  static async unwatchFolder(path: string): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Folder watching is only available in the desktop app');
    }
    
    const result = await window.electronAPI.unwatchFolder(path);
    if (!result.success) {
      throw new Error(result.error || 'Failed to stop watching folder');
    }
  }

  /**
   * Sync files to local database (Electron only)
   */
  static async syncToLocal(files: PLRFile[]): Promise<number> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Local sync is only available in the desktop app');
    }
    
    const result = await window.electronAPI.syncToLocal(files);
    if (!result.success) {
      throw new Error(result.error || 'Failed to sync to local database');
    }
    return result.count || 0;
  }

  /**
   * Get local data (Electron only)
   */
  static async getLocalData(userId: string): Promise<PLRFile[]> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Local data is only available in the desktop app');
    }
    
    const result = await window.electronAPI.getLocalData(userId);
    if (!result.success) {
      throw new Error(result.error || 'Failed to get local data');
    }
    return result.files || [];
  }

  /**
   * Show native notification (Electron only)
   */
  static async showNotification(title: string, body: string): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      // Fallback to browser notification API
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body });
      }
      return;
    }
    
    const result = await window.electronAPI.showNotification(title, body);
    if (!result.success) {
      throw new Error(result.error || 'Failed to show notification');
    }
  }

  /**
   * Get app version (Electron only)
   */
  static async getAppVersion(): Promise<string> {
    if (!this.isElectron() || !window.electronAPI) {
      return 'Web';
    }
    
    return await window.electronAPI.getVersion();
  }

  /**
   * Check for updates (Electron only)
   */
  static async checkForUpdates(): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Auto-updates are only available in the desktop app');
    }
    
    const result = await window.electronAPI.checkForUpdates();
    if (!result.success) {
      throw new Error(result.error || 'Failed to check for updates');
    }
  }

  /**
   * Download update (Electron only)
   */
  static async downloadUpdate(): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Auto-updates are only available in the desktop app');
    }
    
    const result = await window.electronAPI.downloadUpdate();
    if (!result.success) {
      throw new Error(result.error || 'Failed to download update');
    }
  }

  /**
   * Install update (Electron only)
   */
  static async installUpdate(): Promise<void> {
    if (!this.isElectron() || !window.electronAPI) {
      throw new Error('Auto-updates are only available in the desktop app');
    }
    
    const result = await window.electronAPI.installUpdate();
    if (!result.success) {
      throw new Error(result.error || 'Failed to install update');
    }
  }

  /**
   * Setup file watch listeners (Electron only)
   */
  static setupFileWatchListeners(callbacks: {
    onAdded?: (event: FileWatchEvent) => void;
    onChanged?: (event: FileWatchEvent) => void;
    onDeleted?: (event: FileWatchEvent) => void;
    onError?: (event: FileWatchEvent) => void;
  }): void {
    if (!this.isElectron() || !window.electronAPI) {
      return;
    }
    
    if (callbacks.onAdded) window.electronAPI.onFileAdded(callbacks.onAdded);
    if (callbacks.onChanged) window.electronAPI.onFileChanged(callbacks.onChanged);
    if (callbacks.onDeleted) window.electronAPI.onFileDeleted(callbacks.onDeleted);
    if (callbacks.onError) window.electronAPI.onFileError(callbacks.onError);
  }

  /**
   * Setup update listeners (Electron only)
   */
  static setupUpdateListeners(callbacks: {
    onChecking?: () => void;
    onAvailable?: (info: UpdateInfo) => void;
    onNotAvailable?: () => void;
    onProgress?: (progress: UpdateProgress) => void;
    onDownloaded?: (info: UpdateInfo) => void;
    onError?: (error: string) => void;
  }): void {
    if (!this.isElectron() || !window.electronAPI) {
      return;
    }
    
    if (callbacks.onChecking) window.electronAPI.onUpdateChecking(callbacks.onChecking);
    if (callbacks.onAvailable) window.electronAPI.onUpdateAvailable(callbacks.onAvailable);
    if (callbacks.onNotAvailable) window.electronAPI.onUpdateNotAvailable(callbacks.onNotAvailable);
    if (callbacks.onProgress) window.electronAPI.onUpdateProgress(callbacks.onProgress);
    if (callbacks.onDownloaded) window.electronAPI.onUpdateDownloaded(callbacks.onDownloaded);
    if (callbacks.onError) window.electronAPI.onUpdateError(callbacks.onError);
  }

  /**
   * Setup menu listeners (Electron only)
   */
  static setupMenuListeners(callbacks: {
    onOpenFolder?: () => void;
    onSettings?: () => void;
    onAbout?: () => void;
  }): void {
    if (!this.isElectron() || !window.electronAPI) {
      return;
    }
    
    if (callbacks.onOpenFolder) window.electronAPI.onMenuOpenFolder(callbacks.onOpenFolder);
    if (callbacks.onSettings) window.electronAPI.onMenuSettings(callbacks.onSettings);
    if (callbacks.onAbout) window.electronAPI.onMenuAbout(callbacks.onAbout);
  }
}

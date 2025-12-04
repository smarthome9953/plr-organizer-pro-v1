/**
 * TypeScript type definitions for Electron API
 * Extends the Window interface to include electronAPI
 */

import type { PLRFile, FileWatchEvent, UpdateInfo, UpdateProgress } from '../../electron/shared/types';

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

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};

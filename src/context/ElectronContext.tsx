/// <reference path="../types/electron.d.ts" />
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UpdateProgress } from '../../electron/shared/types';

interface ElectronContextType {
  // State
  isElectronApp: boolean;
  appVersion: string;
  updateAvailable: boolean;
  updateProgress: UpdateProgress | null;
  fileWatcherActive: boolean;
  updateDownloaded: boolean;
  updateChecking: boolean;

  // Methods
  checkForUpdates: () => Promise<void>;
  downloadUpdate: () => Promise<void>;
  installUpdate: () => Promise<void>;
  startFileWatcher: (path: string) => Promise<void>;
  stopFileWatcher: (path: string) => Promise<void>;
  showNotification: (title: string, body: string) => Promise<void>;
  syncLibraryToLocal: (files: any[]) => Promise<void>;
}

const ElectronContext = createContext<ElectronContextType | undefined>(undefined);

export const useElectron = () => {
  const context = useContext(ElectronContext);
  if (!context) {
    throw new Error('useElectron must be used within an ElectronProvider');
  }
  return context;
};

interface ElectronProviderProps {
  children: ReactNode;
}

export const ElectronProvider: React.FC<ElectronProviderProps> = ({ children }) => {
  const [isElectronApp, setIsElectronApp] = useState(false);
  const [appVersion, setAppVersion] = useState('');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateProgress, setUpdateProgress] = useState<UpdateProgress | null>(null);
  const [fileWatcherActive, setFileWatcherActive] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  const [updateChecking, setUpdateChecking] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    const isElectron = Boolean(window.electronAPI);
    setIsElectronApp(isElectron);

    if (isElectron && window.electronAPI) {
      // Get app version
      window.electronAPI.getVersion().then((version) => {
        setAppVersion(version);
      });

      // Setup update event listeners
      window.electronAPI.onUpdateChecking(() => {
        setUpdateChecking(true);
        setUpdateAvailable(false);
      });

      window.electronAPI.onUpdateAvailable((info) => {
        setUpdateChecking(false);
        setUpdateAvailable(true);
        console.log('Update available:', info.version);
      });

      window.electronAPI.onUpdateNotAvailable(() => {
        setUpdateChecking(false);
        setUpdateAvailable(false);
      });

      window.electronAPI.onUpdateProgress((progress) => {
        setUpdateProgress(progress);
      });

      window.electronAPI.onUpdateDownloaded((info) => {
        setUpdateDownloaded(true);
        setUpdateProgress(null);
        console.log('Update downloaded:', info.version);
      });

      window.electronAPI.onUpdateError((error) => {
        setUpdateChecking(false);
        setUpdateProgress(null);
        console.error('Update error:', error);
      });

      // Setup file watcher event listeners
      window.electronAPI.onFileAdded((event) => {
        console.log('File added:', event.path);
      });

      window.electronAPI.onFileChanged((event) => {
        console.log('File changed:', event.path);
      });

      window.electronAPI.onFileDeleted((event) => {
        console.log('File deleted:', event.path);
      });

      window.electronAPI.onFileError((event) => {
        console.error('File watcher error:', event.path);
      });

      // Setup menu event listeners
      window.electronAPI.onMenuOpenFolder(() => {
        console.log('Menu: Open Folder triggered');
        // Trigger folder selection UI
      });

      window.electronAPI.onMenuSettings(() => {
        console.log('Menu: Settings triggered');
        // Navigate to settings page
        window.location.hash = '/settings';
      });

      window.electronAPI.onMenuAbout(() => {
        console.log('Menu: About triggered');
        // Show about dialog
      });
    }

    return () => {
      // Cleanup listeners if needed
    };
  }, []);

  const checkForUpdates = async () => {
    if (!window.electronAPI) return;
    
    try {
      const result = await window.electronAPI.checkForUpdates();
      if (result.success) {
        console.log('Checked for updates');
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  };

  const downloadUpdate = async () => {
    if (!window.electronAPI) return;
    
    try {
      const result = await window.electronAPI.downloadUpdate();
      if (result.success) {
        console.log('Downloading update...');
      }
    } catch (error) {
      console.error('Failed to download update:', error);
    }
  };

  const installUpdate = async () => {
    if (!window.electronAPI) return;
    
    try {
      await window.electronAPI.installUpdate();
    } catch (error) {
      console.error('Failed to install update:', error);
    }
  };

  const startFileWatcher = async (path: string) => {
    if (!window.electronAPI) return;
    
    try {
      const result = await window.electronAPI.watchFolder(path);
      if (result.success) {
        setFileWatcherActive(true);
        console.log('File watcher started for:', path);
      }
    } catch (error) {
      console.error('Failed to start file watcher:', error);
    }
  };

  const stopFileWatcher = async (path: string) => {
    if (!window.electronAPI) return;
    
    try {
      const result = await window.electronAPI.unwatchFolder(path);
      if (result.success) {
        setFileWatcherActive(false);
        console.log('File watcher stopped for:', path);
      }
    } catch (error) {
      console.error('Failed to stop file watcher:', error);
    }
  };

  const showNotification = async (title: string, body: string) => {
    if (!window.electronAPI) return;
    
    try {
      await window.electronAPI.showNotification(title, body);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  };

  const syncLibraryToLocal = async (files: any[]) => {
    if (!window.electronAPI) return;
    
    try {
      const result = await window.electronAPI.syncToLocal(files);
      if (result.success) {
        console.log(`Synced ${result.count} files to local database`);
      }
    } catch (error) {
      console.error('Failed to sync library to local:', error);
    }
  };

  const value: ElectronContextType = {
    isElectronApp,
    appVersion,
    updateAvailable,
    updateProgress,
    fileWatcherActive,
    updateDownloaded,
    updateChecking,
    checkForUpdates,
    downloadUpdate,
    installUpdate,
    startFileWatcher,
    stopFileWatcher,
    showNotification,
    syncLibraryToLocal,
  };

  return <ElectronContext.Provider value={value}>{children}</ElectronContext.Provider>;
};

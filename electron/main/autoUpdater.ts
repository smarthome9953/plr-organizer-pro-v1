import { ipcMain, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import type { UpdateInfo, UpdateProgress } from '../shared/types';

/**
 * Setup auto-updater functionality
 */
export function setupAutoUpdater(mainWindow: BrowserWindow) {
  // Configure auto-updater
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  // Check for updates on app launch (after 3 seconds)
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch((error) => {
      console.error('Auto-update check failed:', error);
    });
  }, 3000);

  // Event: Checking for update
  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update:status', {
      type: 'checking',
      message: 'Checking for updates...',
    });
    console.log('Checking for updates...');
  });

  // Event: Update available
  autoUpdater.on('update-available', (info: any) => {
    const updateInfo: UpdateInfo = {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: info.releaseNotes,
    };

    mainWindow.webContents.send('update:status', {
      type: 'available',
      message: `Update ${info.version} is available`,
      info: updateInfo,
    });
    console.log('Update available:', info.version);
  });

  // Event: Update not available
  autoUpdater.on('update-not-available', (info: any) => {
    mainWindow.webContents.send('update:status', {
      type: 'not-available',
      message: 'You are running the latest version',
    });
    console.log('No updates available');
  });

  // Event: Download progress
  autoUpdater.on('download-progress', (progressObj: any) => {
    const progress: UpdateProgress = {
      percent: progressObj.percent,
      transferred: progressObj.transferred,
      total: progressObj.total,
    };

    mainWindow.webContents.send('update:status', {
      type: 'downloading',
      message: `Downloading update: ${Math.round(progressObj.percent)}%`,
      progress,
    });
    console.log(`Download progress: ${Math.round(progressObj.percent)}%`);
  });

  // Event: Update downloaded
  autoUpdater.on('update-downloaded', (info: any) => {
    const updateInfo: UpdateInfo = {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: info.releaseNotes,
    };

    mainWindow.webContents.send('update:status', {
      type: 'downloaded',
      message: 'Update downloaded. Restart to install',
      info: updateInfo,
    });
    console.log('Update downloaded');
  });

  // Event: Error
  autoUpdater.on('error', (error: Error) => {
    mainWindow.webContents.send('update:status', {
      type: 'error',
      message: 'Update error occurred',
      error: error.message,
    });
    console.error('Auto-updater error:', error);
  });

  // IPC Handlers

  /**
   * Manual check for updates
   */
  ipcMain.handle('update:check', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return { success: true, updateInfo: result?.updateInfo };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check for updates',
      };
    }
  });

  /**
   * Download update
   */
  ipcMain.handle('update:download', async () => {
    try {
      await autoUpdater.downloadUpdate();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to download update',
      };
    }
  });

  /**
   * Install update and restart
   */
  ipcMain.handle('update:install', async () => {
    try {
      autoUpdater.quitAndInstall(false, true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to install update',
      };
    }
  });
}

import { ipcMain, BrowserWindow } from 'electron';
import * as chokidar from 'chokidar';
import type { FileWatchEvent } from '../shared/types';

// Store active watchers
const watchers = new Map<string, chokidar.FSWatcher>();

/**
 * Setup file watcher functionality
 */
export function setupFileWatcher(mainWindow: BrowserWindow) {
  /**
   * Start watching a folder
   */
  ipcMain.handle('folder:watch', async (event, folderPath: string) => {
    try {
      // Check if already watching this path
      if (watchers.has(folderPath)) {
        return { success: true, message: 'Already watching this folder' };
      }

      // Create new watcher
      const watcher = chokidar.watch(folderPath, {
        persistent: true,
        ignoreInitial: true,
        ignored: /(^|[\/\\])\../, // Ignore dotfiles
        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100,
        },
      });

      // Handle file added
      watcher.on('add', (path: string) => {
        const event: FileWatchEvent = {
          type: 'add',
          path,
          timestamp: new Date(),
        };
        mainWindow.webContents.send('file:event', event);
      });

      // Handle file changed
      watcher.on('change', (path: string) => {
        const event: FileWatchEvent = {
          type: 'change',
          path,
          timestamp: new Date(),
        };
        mainWindow.webContents.send('file:event', event);
      });

      // Handle file deleted
      watcher.on('unlink', (path: string) => {
        const event: FileWatchEvent = {
          type: 'delete',
          path,
          timestamp: new Date(),
        };
        mainWindow.webContents.send('file:event', event);
      });

      // Handle errors
      watcher.on('error', (error: Error) => {
        const event: FileWatchEvent = {
          type: 'error',
          path: folderPath,
          timestamp: new Date(),
        };
        mainWindow.webContents.send('file:event', event);
        console.error('File watcher error:', error);
      });

      // Store watcher
      watchers.set(folderPath, watcher);

      return { success: true, message: 'Folder watching started' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start watching folder',
      };
    }
  });

  /**
   * Stop watching a folder
   */
  ipcMain.handle('folder:unwatch', async (event, folderPath: string) => {
    try {
      const watcher = watchers.get(folderPath);
      
      if (!watcher) {
        return { success: false, error: 'No watcher found for this folder' };
      }

      await watcher.close();
      watchers.delete(folderPath);

      return { success: true, message: 'Folder watching stopped' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to stop watching folder',
      };
    }
  });
}

/**
 * Cleanup all watchers on app quit
 */
export async function closeAllWatchers() {
  const closePromises: Promise<void>[] = [];

  for (const [path, watcher] of watchers.entries()) {
    closePromises.push(watcher.close());
  }

  await Promise.all(closePromises);
  watchers.clear();
}

// Export for cleanup in main process
import { app } from 'electron';
app.on('will-quit', closeAllWatchers);

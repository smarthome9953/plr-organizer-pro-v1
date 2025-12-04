import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { setupIpcHandlers } from './ipcHandlers';
import { setupFileWatcher } from './fileWatcher';
import { setupAutoUpdater } from './autoUpdater';
import { createApplicationMenu } from './menu';

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    show: false,
    backgroundColor: '#0F1419',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:8082');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  // Show window when ready
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Setup IPC handlers
  setupIpcHandlers(mainWindow);

  // Setup file watcher
  setupFileWatcher(mainWindow);

  // Setup auto-updater
  setupAutoUpdater(mainWindow);

  // Create application menu
  createApplicationMenu(mainWindow);

  return mainWindow;
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  // macOS specific: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Allow navigation only to localhost in dev or file protocol in production
    if (isDev) {
      if (parsedUrl.origin !== 'http://localhost:8082') {
        event.preventDefault();
      }
    } else {
      if (parsedUrl.protocol !== 'file:') {
        event.preventDefault();
      }
    }
  });
});

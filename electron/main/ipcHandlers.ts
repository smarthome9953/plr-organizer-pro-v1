import { ipcMain, dialog, app, BrowserWindow, Notification } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import Database from 'better-sqlite3';
import type { PLRFile } from '../shared/types';

let db: Database.Database | null = null;

/**
 * Initialize SQLite database for local PLR file storage
 */
function initializeDatabase() {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'plr-organizer.db');

  db = new Database(dbPath);
  
  // Create plr_files table matching Supabase schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS plr_files (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      license_type TEXT,
      confidence_score REAL,
      tags TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_user_id ON plr_files(user_id);
    CREATE INDEX IF NOT EXISTS idx_file_path ON plr_files(file_path);
  `);

  console.log('Database initialized at:', dbPath);
  return db;
}

/**
 * Setup all IPC handlers
 */
export function setupIpcHandlers(mainWindow: BrowserWindow) {
  // Initialize database
  initializeDatabase();

  // File System Operations
  
  /**
   * Open folder picker dialog
   */
  ipcMain.handle('dialog:openFolder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'createDirectory'],
      title: 'Select Folder to Scan for PLR Content',
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0];
  });

  /**
   * Read file contents
   */
  ipcMain.handle('file:read', async (event, filePath: string) => {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return { success: true, content };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to read file' 
      };
    }
  });

  /**
   * Get file statistics
   */
  ipcMain.handle('file:stat', async (event, filePath: string) => {
    try {
      const stats = await fs.promises.stat(filePath);
      return {
        success: true,
        stats: {
          size: stats.size,
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory(),
          modified: stats.mtime,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get file stats',
      };
    }
  });

  // Local Database Operations

  /**
   * Sync PLR files to local SQLite database
   */
  ipcMain.handle('db:syncLocal', async (event, files: PLRFile[]) => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const insert = db.prepare(`
        INSERT OR REPLACE INTO plr_files 
        (id, user_id, file_name, file_path, file_type, file_size, license_type, confidence_score, tags, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((files: PLRFile[]) => {
        for (const file of files) {
          insert.run(
            file.id,
            file.user_id,
            file.file_name,
            file.file_path,
            file.file_type,
            file.file_size,
            file.license_type || null,
            file.confidence_score || null,
            file.tags ? JSON.stringify(file.tags) : null,
            new Date(file.created_at).toISOString(),
            new Date(file.updated_at).toISOString()
          );
        }
      });

      insertMany(files);
      return { success: true, count: files.length };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync to local database',
      };
    }
  });

  /**
   * Retrieve local PLR files for a user
   */
  ipcMain.handle('db:getLocal', async (event, userId: string) => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const stmt = db.prepare('SELECT * FROM plr_files WHERE user_id = ?');
      const rows = stmt.all(userId) as any[];

      const files: PLRFile[] = rows.map(row => ({
        id: row.id,
        user_id: row.user_id,
        file_name: row.file_name,
        file_path: row.file_path,
        file_type: row.file_type,
        file_size: row.file_size,
        license_type: row.license_type,
        confidence_score: row.confidence_score,
        tags: row.tags ? JSON.parse(row.tags) : undefined,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
      }));

      return { success: true, files };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve local files',
      };
    }
  });

  /**
   * Delete local PLR file record
   */
  ipcMain.handle('db:deleteLocal', async (event, fileId: string) => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const stmt = db.prepare('DELETE FROM plr_files WHERE id = ?');
      const result = stmt.run(fileId);
      return { success: true, deleted: result.changes > 0 };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete file record',
      };
    }
  });

  // Desktop Features

  /**
   * Show native OS notification
   */
  ipcMain.handle('notification:show', async (event, title: string, body: string) => {
    try {
      const notification = new Notification({
        title,
        body,
        icon: path.join(__dirname, '../../build/icon.png'),
      });
      notification.show();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to show notification',
      };
    }
  });

  // App Management

  /**
   * Get app version
   */
  ipcMain.handle('app:getVersion', async () => {
    return app.getVersion();
  });

  /**
   * Restart the application
   */
  ipcMain.handle('app:restart', async () => {
    app.relaunch();
    app.quit();
  });

  /**
   * Get app path
   */
  ipcMain.handle('app:getPath', async (event, name: string) => {
    return app.getPath(name as any);
  });
}

// Cleanup on app quit
app.on('will-quit', () => {
  if (db) {
    db.close();
  }
});

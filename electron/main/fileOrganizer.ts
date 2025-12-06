import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

export interface OrganizationResult {
  success: boolean;
  sourcePath: string;
  destinationPath: string;
  error?: string;
}

export interface OrganizationConfig {
  baseFolder: string;
  action: 'copy' | 'move';
}

/**
 * Get the default organization base folder
 */
export function getDefaultBaseFolder(): string {
  const documentsPath = app.getPath('documents');
  return path.join(documentsPath, 'PLR Organizer');
}

/**
 * Create a folder if it doesn't exist
 */
export async function ensureFolder(folderPath: string): Promise<void> {
  await fs.promises.mkdir(folderPath, { recursive: true });
}

/**
 * Organize a single file to the destination folder
 */
export async function organizeFile(
  sourcePath: string,
  niche: string,
  subNiche: string | undefined,
  config: OrganizationConfig
): Promise<OrganizationResult> {
  try {
    // Build destination path: baseFolder/Niche/SubNiche/filename
    let destFolder = path.join(config.baseFolder, sanitizeFolderName(niche));
    if (subNiche) {
      destFolder = path.join(destFolder, sanitizeFolderName(subNiche));
    }

    // Ensure the destination folder exists
    await ensureFolder(destFolder);

    const fileName = path.basename(sourcePath);
    const destPath = path.join(destFolder, fileName);

    // Check if file already exists at destination
    let finalDestPath = destPath;
    if (fs.existsSync(destPath)) {
      const ext = path.extname(fileName);
      const baseName = path.basename(fileName, ext);
      let counter = 1;
      while (fs.existsSync(finalDestPath)) {
        finalDestPath = path.join(destFolder, `${baseName}_${counter}${ext}`);
        counter++;
      }
    }

    // Copy or move the file
    if (config.action === 'copy') {
      await fs.promises.copyFile(sourcePath, finalDestPath);
    } else {
      await fs.promises.rename(sourcePath, finalDestPath);
    }

    return {
      success: true,
      sourcePath,
      destinationPath: finalDestPath,
    };
  } catch (error) {
    return {
      success: false,
      sourcePath,
      destinationPath: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sanitize folder name to be file system safe
 */
function sanitizeFolderName(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim()
    .substring(0, 100); // Limit length
}

/**
 * Organize multiple files
 */
export async function organizeFiles(
  files: Array<{
    sourcePath: string;
    niche: string;
    subNiche?: string;
  }>,
  config: OrganizationConfig,
  onProgress?: (current: number, total: number, currentFile: string) => void
): Promise<OrganizationResult[]> {
  const results: OrganizationResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (onProgress) {
      onProgress(i + 1, files.length, file.sourcePath);
    }

    const result = await organizeFile(
      file.sourcePath,
      file.niche,
      file.subNiche,
      config
    );
    
    results.push(result);
  }

  return results;
}

/**
 * Scan a directory recursively and return all files
 */
export async function scanDirectory(
  dirPath: string,
  fileTypes: string[] = [],
  maxDepth: number = 10,
  currentDepth: number = 0
): Promise<Array<{ path: string; name: string; size: number; type: string }>> {
  const files: Array<{ path: string; name: string; size: number; type: string }> = [];

  if (currentDepth >= maxDepth) {
    return files;
  }

  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await scanDirectory(fullPath, fileTypes, maxDepth, currentDepth + 1);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase().slice(1);
        
        if (fileTypes.length === 0 || fileTypes.includes(ext)) {
          const stats = await fs.promises.stat(fullPath);
          files.push({
            path: fullPath,
            name: entry.name,
            size: stats.size,
            type: ext,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return files;
}

/**
 * Get folder structure for a path
 */
export async function getFolderStructure(
  dirPath: string,
  maxDepth: number = 3,
  currentDepth: number = 0
): Promise<any> {
  const result: any = {
    name: path.basename(dirPath),
    path: dirPath,
    type: 'folder',
    children: [],
  };

  if (currentDepth >= maxDepth) {
    return result;
  }

  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const child = await getFolderStructure(fullPath, maxDepth, currentDepth + 1);
        result.children.push(child);
      } else {
        const stats = await fs.promises.stat(fullPath);
        result.children.push({
          name: entry.name,
          path: fullPath,
          type: 'file',
          size: stats.size,
        });
      }
    }
  } catch (error) {
    console.error(`Error getting folder structure ${dirPath}:`, error);
  }

  return result;
}

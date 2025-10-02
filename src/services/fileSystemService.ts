import { FileSystemNode } from '@/context/FileExplorerContext';

/**
 * File System Service - Handles real file system access using File System Access API
 * with fallback support for browsers that don't support it
 */

// Using global File System Access API types

export interface ScanProgress {
  current: number;
  total: number;
  currentPath: string;
}

export class FileSystemService {
  /**
   * Check if File System Access API is supported
   */
  static isSupported(): boolean {
    return 'showDirectoryPicker' in window;
  }

  /**
   * Pick a directory using File System Access API
   */
  static async pickDirectory(): Promise<FileSystemDirectoryHandle | null> {
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
}

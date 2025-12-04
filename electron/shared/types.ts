// Shared TypeScript types for Electron app

export interface PLRFile {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  license_type?: string;
  confidence_score?: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface FileWatchEvent {
  type: 'add' | 'change' | 'delete' | 'error';
  path: string;
  timestamp: Date;
}

export interface UpdateInfo {
  version: string;
  releaseDate: string;
  releaseNotes?: string;
}

export interface UpdateProgress {
  percent: number;
  transferred: number;
  total: number;
}

export interface FileStat {
  size: number;
  isFile: boolean;
  isDirectory: boolean;
  modified: Date;
}

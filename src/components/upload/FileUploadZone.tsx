import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, File, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

export interface UploadFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFilesSelected,
  maxFiles = 50,
  acceptedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'application/zip',
  ],
  maxFileSize = 50 * 1024 * 1024, // 50MB default
}) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((rejection) => {
        toast.error(`${rejection.file.name} was rejected`, {
          description: rejection.errors[0]?.message || 'Invalid file',
        });
      });
    }

    if (acceptedFiles.length > 0) {
      const newUploadFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        id: `${Date.now()}-${Math.random()}`,
        status: 'pending',
        progress: 0,
      }));

      setUploadFiles((prev) => [...prev, ...newUploadFiles]);
      onFilesSelected(acceptedFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles,
  });

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-8 h-8" />;
    if (fileType.includes('pdf')) return <FileText className="w-8 h-8" />;
    return <File className="w-8 h-8" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
        {isDragActive ? (
          <p className="text-lg font-semibold text-primary">Drop files here...</p>
        ) : (
          <>
            <p className="text-lg font-semibold mb-2">Drag & drop PLR files here</p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse your computer
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: PDF, DOC, DOCX, TXT, Images, ZIP (up to {formatFileSize(maxFileSize)})
            </p>
          </>
        )}
      </div>

      {uploadFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">
            Selected Files ({uploadFiles.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadFiles.map((uploadFile) => (
              <Card key={uploadFile.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-primary">
                      {getFileIcon(uploadFile.file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {uploadFile.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadFile.file.size)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadFile.status === 'completed' && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {uploadFile.status === 'failed' && (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          {uploadFile.status === 'uploading' && (
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          )}
                          {uploadFile.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(uploadFile.id)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      {uploadFile.status === 'uploading' && (
                        <Progress value={uploadFile.progress} className="mt-2" />
                      )}
                      {uploadFile.error && (
                        <p className="text-xs text-red-500 mt-1">{uploadFile.error}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

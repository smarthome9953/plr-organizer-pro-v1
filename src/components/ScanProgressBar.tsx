
import React from 'react';
import { X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Button } from '@/components/ui/button';

const ScanProgressBar = () => {
  const { isScanning, scanProgress, currentScannedFolder, cancelScan } = useFileExplorer();

  if (!isScanning) {
    return null;
  }

  return (
    <div className="p-4 border-b bg-accent/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-medium">Scanning in progress</h3>
          <p className="text-sm text-muted-foreground truncate">{currentScannedFolder}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={cancelScan} 
          className="ml-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cancel</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        <Progress value={scanProgress} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{scanProgress}% Complete</span>
          <span>Estimated time: {Math.round((100 - scanProgress) / 10)} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ScanProgressBar;

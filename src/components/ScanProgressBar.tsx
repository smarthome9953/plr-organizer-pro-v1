
import React from 'react';
import { X, PauseCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScanProgressBar = () => {
  const { 
    isScanning, 
    scanProgress, 
    currentScannedFolder, 
    cancelScan 
  } = useFileExplorer();

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
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={() => {}}
                >
                  <PauseCircle className="h-4 w-4" />
                  <span className="sr-only">Pause</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pause scanning (Pro feature)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={cancelScan} 
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress value={scanProgress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{scanProgress}% Complete</span>
          <span>Estimated time: {Math.round((100 - scanProgress) / 10)} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ScanProgressBar;

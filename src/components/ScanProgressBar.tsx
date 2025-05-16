
import React from 'react';
import { X, PauseCircle, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScanProgressBar = () => {
  const { 
    isScanning, 
    scanProgress, 
    currentScannedFolder,
    cancelScan,
    setIsScanning,
    setScanProgress,
    setCurrentScannedFolder
  } = useFileExplorer();

  const [isPaused, setIsPaused] = React.useState(false);
  const [previousProgress, setPreviousProgress] = React.useState(0);

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume scan
      setIsPaused(false);
      setIsScanning(true);
      setScanProgress(previousProgress);
      
      // Simulate continuing the scan
      let progress = previousProgress;
      const interval = setInterval(() => {
        progress += 2;
        setScanProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setIsPaused(false);
        }
      }, 100);
      
    } else {
      // Pause scan
      setIsPaused(true);
      setIsScanning(false);
      setPreviousProgress(scanProgress);
    }
  };

  if (!isScanning && !isPaused) {
    return null;
  }

  return (
    <div className="p-4 border-b bg-accent/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-medium">{isPaused ? "Scan paused" : "Scanning in progress"}</h3>
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
                  onClick={handlePauseResume}
                >
                  {isPaused ? 
                    <PlayCircle className="h-4 w-4" /> : 
                    <PauseCircle className="h-4 w-4" />
                  }
                  <span className="sr-only">{isPaused ? "Resume" : "Pause"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPaused ? "Resume scanning" : "Pause scanning"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              cancelScan();
              setIsPaused(false);
              setPreviousProgress(0);
            }} 
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress value={isPaused ? previousProgress : scanProgress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{isPaused ? previousProgress : scanProgress}% Complete</span>
          <span>
            {isPaused ? 
              "Scan paused" : 
              `Estimated time: ${Math.round((100 - scanProgress) / 10)} seconds`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScanProgressBar;

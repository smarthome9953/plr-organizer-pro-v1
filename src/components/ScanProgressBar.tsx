
import React from 'react';
import { X, PauseCircle, PlayCircle, Clock, Folder } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  const [filesScanned, setFilesScanned] = React.useState(0);
  const [filesIdentified, setFilesIdentified] = React.useState(0);
  const [scanDetails, setScanDetails] = React.useState<{
    startTime: Date | null,
    estimatedEndTime: Date | null,
    scanDepth: number,
    includeSubfolders: boolean
  }>({
    startTime: null,
    estimatedEndTime: null,
    scanDepth: 3,
    includeSubfolders: true
  });

  React.useEffect(() => {
    if (isScanning && !isPaused) {
      // Simulate file scanning progress
      const interval = setInterval(() => {
        setFilesScanned(prev => prev + Math.floor(Math.random() * 5) + 1);
        
        if (Math.random() > 0.7) {
          setFilesIdentified(prev => prev + 1);
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isScanning, isPaused]);

  React.useEffect(() => {
    if (isScanning && !isPaused && !scanDetails.startTime) {
      setScanDetails({
        ...scanDetails,
        startTime: new Date(),
        estimatedEndTime: new Date(Date.now() + 1000 * 60 * 2) // 2 minutes from now
      });
    }
  }, [isScanning, isPaused, scanDetails]);

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
          
          // Reset counters for next scan
          setFilesScanned(0);
          setFilesIdentified(0);
          setScanDetails({
            startTime: null,
            estimatedEndTime: null,
            scanDepth: 3,
            includeSubfolders: true
          });
        }
      }, 100);
      
    } else {
      // Pause scan
      setIsPaused(true);
      setIsScanning(false);
      setPreviousProgress(scanProgress);
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '00:00';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isScanning && !isPaused) {
    return null;
  }

  return (
    <div className="p-4 border-b bg-accent/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{isPaused ? "Scan paused" : "Scanning in progress"}</h3>
            <Badge variant="outline" className="bg-primary/10">
              {filesIdentified} PLR packages found
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
            <Folder className="h-3 w-3" /> {currentScannedFolder}
          </p>
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
              setFilesScanned(0);
              setFilesIdentified(0);
              setScanDetails({
                startTime: null,
                estimatedEndTime: null,
                scanDepth: 3,
                includeSubfolders: true
              });
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
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {isPaused ? 
              "Scan paused" : 
              `Estimated time: ${Math.round((100 - scanProgress) / 10)} seconds`
            }
          </span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger className="text-xs py-1 hover:no-underline">
              Scan details
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Files scanned:</p>
                  <p>{filesScanned}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">PLR packages found:</p>
                  <p>{filesIdentified}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Start time:</p>
                  <p>{formatTime(scanDetails.startTime)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Estimated completion:</p>
                  <p>{formatTime(scanDetails.estimatedEndTime)}</p>
                </div>
              </div>
              
              <Alert className="mt-2 py-2">
                <AlertDescription className="text-xs">
                  {scanDetails.includeSubfolders ? 
                    `Scanning with depth level ${scanDetails.scanDepth} and including subfolders` : 
                    'Scanning current directory only'
                  }
                </AlertDescription>
              </Alert>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ScanProgressBar;

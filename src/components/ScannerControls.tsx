
import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScannerControls = () => {
  const { 
    selectedFolders, 
    scanOptions, 
    updateScanOptions, 
    startScan, 
    isScanning 
  } = useFileExplorer();

  const handleScanDepthChange = (value: string) => {
    updateScanOptions({ scanDepth: value });
  };

  const handleScanSpeedChange = (value: 'quick' | 'deep') => {
    updateScanOptions({ scanSpeed: value });
  };

  return (
    <div className="p-4 border-b space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Scanner Controls</h2>
          <p className="text-sm text-muted-foreground">
            {selectedFolders.length === 0 
              ? 'Select folders to scan from the navigation panel' 
              : `${selectedFolders.length} folder${selectedFolders.length > 1 ? 's' : ''} selected`}
          </p>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                disabled={selectedFolders.length === 0 || isScanning}
                onClick={startScan}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Scan Selected Folders
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start scanning the selected folders for PLR content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeSubfolders" 
            checked={scanOptions.includeSubfolders} 
            onCheckedChange={(checked) => 
              updateScanOptions({ includeSubfolders: checked === true })
            }
          />
          <label 
            htmlFor="includeSubfolders" 
            className="text-sm font-medium cursor-pointer"
          >
            Include Subfolders
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Scan Depth</label>
          <Select 
            value={scanOptions.scanDepth} 
            onValueChange={handleScanDepthChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select depth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Level</SelectItem>
              <SelectItem value="2">2 Levels</SelectItem>
              <SelectItem value="3">3 Levels</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Scan Speed</label>
          <Select 
            value={scanOptions.scanSpeed} 
            onValueChange={handleScanSpeedChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select scan speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick">Quick Scan</SelectItem>
              <SelectItem value="deep">Deep Scan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon" className="self-end">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default ScannerControls;

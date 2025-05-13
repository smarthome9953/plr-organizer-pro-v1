
import React, { useState } from 'react';
import { Search, Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const ScannerControls = () => {
  const { 
    selectedFolders, 
    scanOptions, 
    updateScanOptions, 
    startScan, 
    isScanning,
    savedScanProfiles,
    saveScanProfile,
  } = useFileExplorer();
  
  const [profileName, setProfileName] = useState("");

  const handleScanDepthChange = (value: string) => {
    updateScanOptions({ scanDepth: value });
  };

  const handleScanSpeedChange = (value: 'quick' | 'deep') => {
    updateScanOptions({ scanSpeed: value });
  };

  const toggleFileType = (fileType: string) => {
    const updatedFileTypes = scanOptions.fileTypes.includes(fileType)
      ? scanOptions.fileTypes.filter(type => type !== fileType)
      : [...scanOptions.fileTypes, fileType];
    
    updateScanOptions({ fileTypes: updatedFileTypes });
  };

  const handleSaveProfile = () => {
    if (profileName.trim()) {
      saveScanProfile(profileName);
      toast("Profile saved", { description: `Scan profile "${profileName}" saved successfully` });
      setProfileName("");
    } else {
      toast("Error", { description: "Please enter a profile name" });
    }
  };

  const fileTypeOptions = [
    { label: "PDF", value: "pdf" },
    { label: "Word", value: "docx" },
    { label: "Images", value: "jpg" },
    { label: "ZIP", value: "zip" },
    { label: "RAR", value: "rar" },
    { label: "HTML", value: "html" },
    { label: "Text", value: "txt" }
  ];

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

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Scan Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="profileName" className="text-sm font-medium">Profile Name</label>
                  <input 
                    id="profileName" 
                    type="text" 
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="My Scan Profile"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full">Save Profile</Button>
              </div>
            </DialogContent>
          </Dialog>

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

        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="self-end">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Scanner Settings</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <h4 className="mb-3 text-sm font-medium">Saved Profiles</h4>
                {savedScanProfiles.length > 0 ? (
                  <div className="space-y-2">
                    {savedScanProfiles.map(profile => (
                      <div key={profile.id} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{profile.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            updateScanOptions(profile.options);
                            toast("Profile loaded", { description: `Scan profile "${profile.name}" loaded` });
                          }}
                        >
                          Load
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No saved profiles yet</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">File Types to Scan</label>
        <div className="flex flex-wrap gap-2">
          {fileTypeOptions.map((fileType) => (
            <Badge 
              key={fileType.value}
              variant={scanOptions.fileTypes.includes(fileType.value) ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => toggleFileType(fileType.value)}
            >
              {fileType.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScannerControls;

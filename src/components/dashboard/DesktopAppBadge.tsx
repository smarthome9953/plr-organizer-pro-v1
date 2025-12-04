import { useElectron } from '@/context/ElectronContext';
import { Badge } from '@/components/ui/badge';
import { Monitor, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/**
 * Desktop App Badge - Shows when running in Electron with update controls
 */
export const DesktopAppBadge = () => {
  const {
    isElectronApp,
    appVersion,
    updateAvailable,
    updateProgress,
    updateDownloaded,
    updateChecking,
    checkForUpdates,
    downloadUpdate,
    installUpdate,
  } = useElectron();

  if (!isElectronApp) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="cursor-pointer gap-2 px-3 py-1.5 bg-[#F3F1FF] dark:bg-[#252A3A] text-[#6B5CE7] dark:text-[#7C6FE8] border-[#6B5CE7] dark:border-[#7C6FE8] hover:bg-[#E6E3FF] dark:hover:bg-[#2D3548] transition-all"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="font-semibold">Desktop App</span>
          {updateAvailable && (
            <span className="inline-flex w-2 h-2 rounded-full bg-[#00BCD4] dark:bg-[#22D3EE] animate-pulse" />
          )}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white dark:bg-[#1A1F2E] border-[#E2E8F0] dark:border-[#2D3748]">
        <div className="space-y-4">
          {/* App Version */}
          <div>
            <h4 className="font-semibold text-sm text-[#1E3A5F] dark:text-[#F7FAFC] mb-1">
              PLR Organizer Pro
            </h4>
            <p className="text-xs text-[#718096] dark:text-[#A0AEC0]">
              Version {appVersion}
            </p>
          </div>

          {/* Update Status */}
          <div className="space-y-2">
            {updateChecking && (
              <div className="flex items-center gap-2 text-sm text-[#4A5568] dark:text-[#E2E8F0]">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Checking for updates...</span>
              </div>
            )}

            {updateAvailable && !updateDownloaded && !updateProgress && (
              <div className="space-y-2">
                <p className="text-sm text-[#00BCD4] dark:text-[#22D3EE] font-medium">
                  Update available!
                </p>
                <Button
                  size="sm"
                  onClick={downloadUpdate}
                  className="w-full bg-[#6B5CE7] dark:bg-[#7C6FE8] hover:bg-[#5B4CD7] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Update
                </Button>
              </div>
            )}

            {updateProgress && (
              <div className="space-y-2">
                <p className="text-sm text-[#4A5568] dark:text-[#E2E8F0]">
                  Downloading update... {Math.round(updateProgress.percent)}%
                </p>
                <Progress value={updateProgress.percent} className="h-2" />
              </div>
            )}

            {updateDownloaded && (
              <div className="space-y-2">
                <p className="text-sm text-[#10B981] dark:text-[#34D399] font-medium">
                  Update downloaded and ready!
                </p>
                <Button
                  size="sm"
                  onClick={installUpdate}
                  className="w-full bg-[#10B981] dark:bg-[#34D399] hover:bg-[#059669] text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart to Install
                </Button>
              </div>
            )}

            {!updateAvailable && !updateChecking && (
              <div className="space-y-2">
                <p className="text-sm text-[#718096] dark:text-[#A0AEC0]">
                  You're running the latest version
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={checkForUpdates}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check for Updates
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748]">
            <p className="text-xs text-[#718096] dark:text-[#A0AEC0]">
              <strong>Desktop Features:</strong>
            </p>
            <ul className="text-xs text-[#718096] dark:text-[#A0AEC0] mt-1 space-y-1 list-disc list-inside">
              <li>Native file system access</li>
              <li>Offline local database</li>
              <li>Real-time file watching</li>
              <li>Automatic updates</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

import { useElectron } from '@/context/ElectronContext';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

/**
 * Web App Banner - Shows download CTA when accessing from web browser
 */
export const WebAppBanner = () => {
  const { isElectronApp } = useElectron();
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('desktopAppBannerDismissed') === 'true';
  });

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('desktopAppBannerDismissed', 'true');
  };

  // Only show banner in web browser, not in Electron
  if (isElectronApp || dismissed) {
    return null;
  }

  return (
    <Alert className="mb-4 bg-gradient-to-r from-[#6B5CE7]/10 to-[#00BCD4]/10 dark:from-[#7C6FE8]/10 dark:to-[#22D3EE]/10 border-[#6B5CE7] dark:border-[#7C6FE8] relative">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-lg hover:bg-white/50 dark:hover:bg-black/30 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-[#718096] dark:text-[#A0AEC0]" />
      </button>
      
      <Download className="w-5 h-5 text-[#6B5CE7] dark:text-[#7C6FE8]" />
      <AlertDescription className="ml-2 pr-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-[#1E3A5F] dark:text-[#F7FAFC] mb-1">
              Get the Desktop App for Enhanced Features
            </p>
            <p className="text-sm text-[#4A5568] dark:text-[#E2E8F0]">
              Native file system access, offline sync, real-time file watching, and automatic updates
            </p>
          </div>
          <Button
            size="sm"
            className="bg-[#6B5CE7] dark:bg-[#7C6FE8] hover:bg-[#5B4CD7] text-white shrink-0"
            onClick={() => {
              // Navigate to download page (you'll create this later)
              window.location.href = '/download';
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Now
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

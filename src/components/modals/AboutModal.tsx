import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Mail } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [appVersion, setAppVersion] = useState<string>('Loading...');

  useEffect(() => {
    const loadVersion = async () => {
      if (window.electronAPI) {
        try {
          const version = await window.electronAPI.getVersion();
          setAppVersion(version);
        } catch (error) {
          setAppVersion('Unknown');
        }
      } else {
        setAppVersion('Web Version');
      }
    };

    if (isOpen) {
      loadVersion();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img 
              src="/build/icon.png" 
              alt="PLR Organizer Pro" 
              className="w-8 h-8 rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            PLR Organizer Pro
          </DialogTitle>
          <DialogDescription>
            Transform chaotic PLR content libraries into organized, trackable, profitable assets
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Version:</span>
              <span className="font-medium">{appVersion}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform:</span>
              <span className="font-medium">
                {window.electronAPI ? 'Desktop' : 'Web'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">License:</span>
              <span className="font-medium">Proprietary</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-2">Credits</h4>
            <p className="text-xs text-muted-foreground">
              Built with React, TypeScript, Tailwind CSS, and Electron
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © 2025 PLR Organizer Pro. All rights reserved.
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open('https://plrorganizerpro.com', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open('https://github.com/smarthome9953/plr-organizer-pro-v1', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = 'mailto:support@plrorganizerpro.com'}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {window.electronAPI && (
            <div className="border-t pt-4">
              <Button
                variant="secondary"
                className="w-full"
                onClick={async () => {
                  try {
                    await window.electronAPI?.checkForUpdates();
                  } catch (error) {
                    console.error('Error checking for updates:', error);
                  }
                }}
              >
                Check for Updates
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;

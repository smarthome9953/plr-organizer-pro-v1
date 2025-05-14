
import React from 'react';
import { useFileExplorer } from '@/context/FileExplorerContext';

const Footer = () => {
  const { scanResults, selectedFolders } = useFileExplorer();
  
  return (
    <footer className="border-t p-2 text-xs text-muted-foreground flex items-center justify-between">
      <div>
        PLR Organizer Pro v0.1.0
      </div>
      <div>
        {selectedFolders.length > 0 && (
          <span>{selectedFolders.length} folder{selectedFolders.length !== 1 ? 's' : ''} selected</span>
        )}
        {scanResults.length > 0 && (
          <span className="ml-4">{scanResults.length} PLR package{scanResults.length !== 1 ? 's' : ''} found</span>
        )}
      </div>
    </footer>
  );
};

export default Footer;

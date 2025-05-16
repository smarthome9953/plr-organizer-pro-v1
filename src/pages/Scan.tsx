
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileExplorerProvider } from '@/context/FileExplorerContext';
import FolderNavigation from '@/components/FolderNavigation';
import ScannerControls from '@/components/ScannerControls';
import ScanProgressBar from '@/components/ScanProgressBar';
import ResultsDisplay from '@/components/ResultsDisplay';

const Scan = () => {
  return (
    <FileExplorerProvider>
      <Helmet>
        <title>PLR Scanner | PLR Organizer Pro</title>
        <meta name="description" content="Scan your computer for PLR content and organize it efficiently" />
      </Helmet>
      
      <div className="h-screen flex flex-col bg-background">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] overflow-hidden">
          {/* Left sidebar - Folder Navigation */}
          <FolderNavigation />
          
          {/* Right content area */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Scanner controls */}
            <ScannerControls />
            
            {/* Progress bar - conditionally rendered when scanning */}
            <ScanProgressBar />
            
            {/* Results display */}
            <div className="flex-1 overflow-auto">
              <ResultsDisplay />
            </div>
          </div>
        </div>
      </div>
    </FileExplorerProvider>
  );
};

export default Scan;

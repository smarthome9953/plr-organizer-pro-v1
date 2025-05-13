
import React from 'react';
import Header from '@/components/Header';
import FolderNavigation from '@/components/FolderNavigation';
import ScannerControls from '@/components/ScannerControls';
import ScanProgressBar from '@/components/ScanProgressBar';
import ResultsDisplay from '@/components/ResultsDisplay';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { FileExplorerProvider } from '@/context/FileExplorerContext';
import { ThemeToggle } from '@/components/Header';

const Index = () => {
  return (
    <ThemeProvider>
      <FileExplorerProvider>
        <div className="flex flex-col min-h-screen h-screen overflow-hidden">
          <Header />
          <div className="absolute right-4 top-4 z-10">
            <ThemeToggle />
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left sidebar - Folder Navigation */}
            <div className="w-64 hidden md:block overflow-y-auto">
              <FolderNavigation />
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <ScannerControls />
              <ScanProgressBar />
              <div className="flex-1 overflow-auto">
                <ResultsDisplay />
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </FileExplorerProvider>
    </ThemeProvider>
  );
};

export default Index;

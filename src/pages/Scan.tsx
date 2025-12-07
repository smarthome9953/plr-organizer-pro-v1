import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/DashboardLayout';
import PLRScannerEngine from '@/components/scanner/PLRScannerEngine';

const Scan = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>PLR Scanner | PLR Organizer Pro</title>
        <meta name="description" content="Scan your computer for PLR content and organize it efficiently" />
      </Helmet>
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">PLR Scanner</h1>
          <p className="text-muted-foreground">
            Scan folders to detect PLR content, auto-categorize by niche, and organize into folders
          </p>
        </div>
        
        <PLRScannerEngine />
      </div>
    </DashboardLayout>
  );
};

export default Scan;


import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import TopNav from './dashboard/TopNav';
import SideNav from './dashboard/SideNav';
import MobileNav from './dashboard/MobileNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="hidden md:block">
            <SideNav />
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="hidden md:block">
              <TopNav />
            </div>
            
            <MobileNav />
            
            <main className="flex-1 p-4 md:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;

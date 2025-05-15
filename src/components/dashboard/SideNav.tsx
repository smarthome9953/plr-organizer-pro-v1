
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  PieChart,
  Palette,
  FolderIcon,
  Wrench,
  HelpCircle,
  BookOpen,
  RefreshCw,
  FileSearch,
  Shield,
  PercentSquare,
  Globe,
  FileType
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const SideNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center px-2 py-3">
          <img 
            src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
            alt="PLR Organizer Pro" 
            className="h-8" 
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
                  <Link to="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/plr-library">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>PLR Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/analytics">
                    <PieChart className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/projects">
                    <FolderIcon className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools')}>
                  <Link to="/tools">
                    <Wrench className="mr-2 h-4 w-4" />
                    <span>All Tools</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/brand-kit')}>
                  <Link to="/tools/brand-kit">
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Brand Kit Tool</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/content-spinner')}>
                  <Link to="/tools/content-spinner">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>Content Spinner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/seo-analyzer')}>
                  <Link to="/tools/seo-analyzer">
                    <FileSearch className="mr-2 h-4 w-4" />
                    <span>SEO Analyzer</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/license-tracker')}>
                  <Link to="/tools/license-tracker">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>License Tracker</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/uniqueness-meter')}>
                  <Link to="/tools/uniqueness-meter">
                    <PercentSquare className="mr-2 h-4 w-4" />
                    <span>Uniqueness Meter</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/translator')}>
                  <Link to="/tools/translator">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Translator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/tools/file-converter')}>
                  <Link to="/tools/file-converter">
                    <FileType className="mr-2 h-4 w-4" />
                    <span>File Converter</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/resources/guides">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>PLR Guides</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/resources/templates">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/resources/support">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Support Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideNav;

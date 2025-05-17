
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  PieChart,
  Settings,
  Users,
  BookOpen,
  FileScan,
  Palette,
  FolderIcon,
  Wrench,
  HelpCircle,
  Shield,
  Globe,
  Database,
  BarChart
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
                <SidebarMenuButton asChild isActive={isActive('/plr-library')}>
                  <Link to="/plr-library">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>PLR Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/scan')}>
                  <Link to="/scan">
                    <FileScan className="mr-2 h-4 w-4" />
                    <span>PLR Scanner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/blog-management')}>
                  <Link to="/blog-management">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Blog Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/projects')}>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/users')}>
                  <Link to="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    <span>User Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/analytics')}>
                  <Link to="/admin/analytics">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Analytics & Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                  <Link to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>System Settings</span>
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
                <SidebarMenuButton asChild isActive={isActive('/resources/support')}>
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

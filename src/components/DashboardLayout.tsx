
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Library, 
  BarChart3, 
  FolderKanban, 
  Settings, 
  HelpCircle, 
  Store, 
  Bell, 
  Search 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate notification count
  const notificationCount = 3;
  
  // Simulate storage usage
  const storageUsage = 65;
  
  // Simulate content counts
  const totalContent = 128;
  const recentlyAdded = 12;

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" className="border-r border-border">
          <SidebarHeader>
            <div className="p-4">
              <Link to="/" className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
                  alt="PLR Organizer Pro" 
                  className="h-10" 
                />
              </Link>
              
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={user?.avatar_url || ''} />
                  <AvatarFallback>{user?.user_metadata?.name ? getInitials(user.user_metadata.name) : 'U'}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">{user?.user_metadata?.name || 'User'}</h4>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      Pro
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/dashboard')}>
                      <Link to="/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Dashboard
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/plr-library')}>
                      <Link to="/plr-library" className="flex items-center">
                        <Library className="mr-2 h-5 w-5" />
                        PLR Library
                        <Badge className="ml-2 h-5 px-1.5 bg-primary/80">
                          {totalContent}
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/analytics')}>
                      <Link to="/analytics" className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Analytics
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/projects')}>
                      <Link to="/projects" className="flex items-center">
                        <FolderKanban className="mr-2 h-5 w-5" />
                        Projects
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/tools')}>
                      <Link to="/tools" className="flex items-center">
                        <Settings className="mr-2 h-5 w-5" />
                        Tools
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActiveRoute('/marketplace')}>
                      <Link to="/marketplace" className="flex items-center">
                        <Store className="mr-2 h-5 w-5" />
                        Marketplace
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup defaultOpen>
              <SidebarGroupLabel>Library Stats</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-2 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Content</span>
                    <span className="font-medium">{totalContent} items</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recently Added</span>
                    <span className="font-medium">{recentlyAdded} items</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage Usage</span>
                      <span className="font-medium">{storageUsage}%</span>
                    </div>
                    <Progress value={storageUsage} className="h-2" />
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="px-4 py-3 space-y-2">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/help">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 md:px-6">
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <main className="flex-1 overflow-auto">
            <div className="container py-6 space-y-6">
              {children}
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

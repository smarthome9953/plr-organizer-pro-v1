import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from './Header';
import { toast } from '@/hooks/use-toast';
import {
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  Home,
  FileText,
  PieChart,
  Palette,
  FolderIcon,
  Wrench,
  HelpCircle,
  BookOpen,
  Plus,
  Menu,
  X,
  RefreshCw
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const TopNav: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Extract user's first name for the avatar
  const userInitial = user?.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : 'U';
  
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b h-16">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..."
            className="pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url || ''} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const SideNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const isDashboardActive = isActive('/dashboard');
  const isToolsExpanded = location.pathname.startsWith('/tools');
  const isResourcesExpanded = location.pathname.startsWith('/resources');
  
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

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
            alt="PLR Organizer Pro" 
            className="h-8" 
          />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Link to="/dashboard" className="flex items-center p-2 rounded-md hover:bg-muted" onClick={() => setIsOpen(false)}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/plr-library" className="flex items-center p-2 rounded-md hover:bg-muted" onClick={() => setIsOpen(false)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>PLR Library</span>
            </Link>
            <Link to="/analytics" className="flex items-center p-2 rounded-md hover:bg-muted" onClick={() => setIsOpen(false)}>
              <PieChart className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link to="/tools" className="flex items-center p-2 rounded-md hover:bg-muted" onClick={() => setIsOpen(false)}>
              <Wrench className="mr-2 h-4 w-4" />
              <span>Tools</span>
            </Link>
            <Link to="/tools/brand-kit" className="flex items-center p-2 rounded-md hover:bg-muted pl-8" onClick={() => setIsOpen(false)}>
              <Palette className="mr-2 h-4 w-4" />
              <span>Brand Kit Tool</span>
            </Link>
            <Link to="/tools/content-spinner" className="flex items-center p-2 rounded-md hover:bg-muted pl-8" onClick={() => setIsOpen(false)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Content Spinner</span>
            </Link>
          </div>
          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

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

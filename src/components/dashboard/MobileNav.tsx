
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  Home,
  FileText,
  PieChart,
  Palette,
  FolderIcon,
  Wrench,
  RefreshCw,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default MobileNav;

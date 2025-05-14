
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Scan, Home, Tools } from 'lucide-react';

const MainMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center space-x-6">
        <NavigationMenuItem>
          <Link to="/" className="flex items-center gap-1 text-foreground hover:text-primary">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/dashboard" className="flex items-center gap-1 text-foreground hover:text-primary">
            <Scan className="h-4 w-4" />
            <span>Scan & Organize</span>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <div className="flex items-center gap-1 text-foreground hover:text-primary cursor-pointer">
            <Tools className="h-4 w-4" />
            <span>Tools</span>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainMenu;

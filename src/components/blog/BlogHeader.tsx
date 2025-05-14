
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/Header";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export default function BlogHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              PLR Organizer Pro
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/blog" className={navigationMenuTriggerStyle()}>
                    Blog Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      <li>
                        <Link to="/blog/organization" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Organization Strategies
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/rights-licensing" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Rights & Licensing
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/content-enhancement" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Content Enhancement
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/monetization" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Monetization Strategies
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/auth">
              <Button variant="default">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

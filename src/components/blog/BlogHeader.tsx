
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
                  <Link to="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Blog Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      <li>
                        <Link to="/blog/organization" legacyBehavior passHref>
                          <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                            PLR Organization Strategies
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/rights-licensing" legacyBehavior passHref>
                          <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                            PLR Rights & Licensing
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/content-enhancement" legacyBehavior passHref>
                          <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                            PLR Content Enhancement
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/monetization" legacyBehavior passHref>
                          <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                            PLR Monetization Strategies
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Dashboard
                    </NavigationMenuLink>
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

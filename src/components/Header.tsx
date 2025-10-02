
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useWebSocket } from '@/context/WebSocketContext';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Palette, Wrench, RefreshCw, FileSearch, Shield, PercentSquare, Globe, FileText, FileCode, FileScan, Wifi, WifiOff } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simple ConnectionStatus component example
function ConnectionStatus() {
  const { isConnected } = useWebSocket();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            {isConnected ? (
              <Badge variant="default" className="flex items-center gap-1">
                <Wifi className="h-4 w-4" /> Online
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center gap-1">
                <WifiOff className="h-4 w-4" /> Offline
              </Badge>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {isConnected ? "Connected to server" : "Not connected to server"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ThemeToggle() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>;
}
interface HeaderProps {
  showAuthButtons?: boolean;
}
export default function Header({
  showAuthButtons
}: HeaderProps) {
  return <header className="border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" alt="PLR Organizer Pro - Private Label Rights Content Management Software" className="h-12 mr-3" />
            </Link>
            <ConnectionStatus />
          </div>
          
          <div className="flex-1 flex justify-center items-center"> 
            <NavigationMenu>
              <NavigationMenuList className="text-lg"> 
                <NavigationMenuItem>
                  <Link to="/" className={`${navigationMenuTriggerStyle()} text-lg`}>
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/plr-scanner" className={`${navigationMenuTriggerStyle()} text-lg`}>
                    PLR Scanner
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/scan" className={`${navigationMenuTriggerStyle()} text-lg`}>
                    Scan & Organize
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-lg">Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/tools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">All Tools</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore all PLR management tools in one place
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/brand-kit-tool" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <Palette className="mr-2 h-4 w-4" />
                              Brand Tool Kit
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Create consistent branding across your PLR content
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/content-spinner" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Content Spinner
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Make PLR content 100% unique in seconds
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/seo-analyzer" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <FileSearch className="mr-2 h-4 w-4" />
                              SEO Analyzer
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Optimize PLR content for search engines
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/plr-scanner" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <FileScan className="mr-2 h-4 w-4" />
                              PLR Scanner
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Find and organize all your PLR content in minutes
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/license-tracker" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <Shield className="mr-2 h-4 w-4" />
                              License Tracker
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Never risk copyright issues with PLR content
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/uniqueness-meter" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <PercentSquare className="mr-2 h-4 w-4" />
                              Uniqueness Meter
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Verify content originality before publishing
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/translator" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center text-sm font-medium leading-none">
                              <Globe className="mr-2 h-4 w-4" />
                              Translator
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              Convert English PLR to 27 languages
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                       <li>
                         <NavigationMenuLink asChild>
                           <Link to="/html-editor" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                             <div className="flex items-center text-sm font-medium leading-none">
                               <FileCode className="mr-2 h-4 w-4" />
                               HTML Editor
                             </div>
                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                               Create & format website content without coding
                             </p>
                           </Link>
                         </NavigationMenuLink>
                       </li>
                       <li>
                         <NavigationMenuLink asChild>
                           <Link to="/brand-kit-tool" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                             <div className="flex items-center text-sm font-medium leading-none">
                               <Palette className="mr-2 h-4 w-4" />
                               Brand Kit Tool
                             </div>
                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                               Create consistent branding for PLR content
                             </p>
                           </Link>
                         </NavigationMenuLink>
                       </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-lg">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2 text-base">
                      <li>
                        <Link to="/resources/plr-software-guides" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Software Guides
                        </Link>
                      </li>
                      <li>
                        <Link to="/resources/templates" className={`${navigationMenuTriggerStyle()} w-full justify-start flex items-center`}>
                          <FileText className="h-4 w-4 mr-2" />
                          Templates
                        </Link>
                      </li>
                      <li>
                        <Link to="/resources/plr-software-faq" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                          PLR Software FAQs
                        </Link>
                      </li>
                       <li>
                         <Link to="/resources/support" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                           Support Center
                         </Link>
                       </li>
                       <li>
                         <Link to="/brand-guidelines" className={`${navigationMenuTriggerStyle()} w-full justify-start flex items-center`}>
                           <Palette className="h-4 w-4 mr-2" />
                           Brand Guidelines
                         </Link>
                       </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-lg">Blog</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2 text-base">
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
                  
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {showAuthButtons ? <div className="flex items-center gap-4">
                <Link to="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Start Free Trial</Button>
                </Link>
              </div> : <Link to="/auth">
                <Button variant="default">Sign In</Button>
              </Link>}
          </div>
        </div>
      </div>
    </header>;
}

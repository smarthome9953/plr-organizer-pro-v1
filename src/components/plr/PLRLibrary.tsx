
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, FilePlus, FilterIcon, Grid, List, RefreshCcw, FolderOpen, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demonstration
const mockPLRItems = [
  {
    id: '1',
    title: 'Complete Social Media Marketing Guide',
    category: 'Marketing',
    type: 'eBook',
    license: 'Private Label Rights',
    source: 'Premium PLR Hub',
    addedDate: '2023-10-15',
    tags: ['social media', 'marketing', 'guide']
  },
  {
    id: '2',
    title: 'Healthy Keto Recipes Collection',
    category: 'Health & Wellness',
    type: 'Recipe Book',
    license: 'Master Resale Rights',
    source: 'PLR Health Club',
    addedDate: '2023-09-28',
    tags: ['recipes', 'keto', 'health']
  },
  {
    id: '3',
    title: 'Mindfulness Meditation Audio Series',
    category: 'Self-Help',
    type: 'Audio',
    license: 'Private Label Rights',
    source: 'Wellness PLR',
    addedDate: '2023-08-12',
    tags: ['meditation', 'mindfulness', 'audio']
  },
  {
    id: '4',
    title: 'AI for Business - Complete Guide',
    category: 'Technology',
    type: 'Course',
    license: 'Resale Rights',
    source: 'Tech PLR Pro',
    addedDate: '2023-07-30',
    tags: ['AI', 'business', 'technology']
  },
  {
    id: '5',
    title: 'Instagram Growth Strategies',
    category: 'Marketing',
    type: 'Report',
    license: 'Private Label Rights',
    source: 'Social Media PLR',
    addedDate: '2023-11-02',
    tags: ['instagram', 'growth', 'social media']
  }
];

const PLRLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [isWatching, setIsWatching] = useState(false);
  const [watchedFolder, setWatchedFolder] = useState<string | null>(null);
  
  // File watching functionality (Electron only)
  const handleWatchFolder = async () => {
    if (!window.electronAPI) {
      toast.error("Desktop App Required", {
        description: "File watching is only available in the desktop app",
      });
      return;
    }

    try {
      if (isWatching && watchedFolder) {
        // Stop watching
        const result = await window.electronAPI.unwatchFolder(watchedFolder);
        if (result.success) {
          setIsWatching(false);
          setWatchedFolder(null);
          toast.success("Stopped Watching", {
            description: "File watching has been stopped",
          });
        }
      } else {
        // Start watching
        const folderPath = await window.electronAPI.selectFolder();
        if (folderPath) {
          const result = await window.electronAPI.watchFolder(folderPath);
          if (result.success) {
            setIsWatching(true);
            setWatchedFolder(folderPath);
            toast.success("Watching Folder", {
              description: `Monitoring ${folderPath} for changes`,
            });

            // Set up file event listeners
            window.electronAPI.onFileAdded((event) => {
              toast.info("New File Detected", {
                description: `Added: ${event.path}`,
              });
            });

            window.electronAPI.onFileChanged((event) => {
              toast.info("File Changed", {
                description: `Modified: ${event.path}`,
              });
            });

            window.electronAPI.onFileDeleted((event) => {
              toast.info("File Deleted", {
                description: `Removed: ${event.path}`,
              });
            });
          }
        }
      }
    } catch (error) {
      console.error("File watching error:", error);
      toast.error("Error", {
        description: "Failed to toggle file watching",
      });
    }
  };

  // Filter PLR items based on search and filters
  const filteredItems = mockPLRItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesLicense = licenseFilter === 'all' || item.license === licenseFilter;
    
    return matchesSearch && matchesCategory && matchesType && matchesLicense;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PLR Library</h2>
          <p className="text-muted-foreground">
            Manage your PLR content collection
            {isWatching && watchedFolder && (
              <span className="ml-2 text-xs text-primary">
                • Watching: {watchedFolder}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {window.electronAPI && (
            <Button
              variant={isWatching ? "default" : "outline"}
              onClick={handleWatchFolder}
            >
              {isWatching ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Stop Watching
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Watch Folder
                </>
              )}
            </Button>
          )}
          <Button>
            <FilePlus className="h-4 w-4 mr-2" />
            Add PLR Content
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PLR Content</CardTitle>
              <CardDescription>
                Browse and manage all your PLR content items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search PLR content..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                    <SelectItem value="Self-Help">Self-Help</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="eBook">eBook</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Recipe Book">Recipe Book</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                  <SelectTrigger className="w-[180px]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="License" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Licenses</SelectItem>
                    <SelectItem value="Private Label Rights">PLR</SelectItem>
                    <SelectItem value="Master Resale Rights">MRR</SelectItem>
                    <SelectItem value="Resale Rights">RR</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {viewMode === 'list' ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {item.license}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.source}</TableCell>
                          <TableCell>{item.addedDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant="outline">{item.license}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-3">
                          <div>Category: {item.category}</div>
                          <div>Source: {item.source}</div>
                          <div>Added: {item.addedDate}</div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Content</CardTitle>
              <CardDescription>
                Content added in the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar structure to "all" tab but with recent items filter */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Content</CardTitle>
              <CardDescription>
                Your bookmarked PLR items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar structure for favorites */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories Management</CardTitle>
              <CardDescription>
                Create, edit and manage PLR categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Category management UI */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PLRLibrary;

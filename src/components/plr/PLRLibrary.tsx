import React, { useState, useMemo } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  MoreHorizontal, 
  FilePlus, 
  FilterIcon, 
  Grid, 
  List, 
  RefreshCcw, 
  Eye, 
  EyeOff,
  FileText,
  Trash2,
  Edit,
  Download,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { usePLRFiles, type PLRFile } from '@/hooks/usePLRFiles';
import { format } from 'date-fns';

const PLRLibrary = () => {
  const { files, categories, isLoading, error, refetch, deleteFile } = usePLRFiles();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isWatching, setIsWatching] = useState(false);
  const [watchedFolder, setWatchedFolder] = useState<string | null>(null);

  // Get unique file types for filter
  const fileTypes = useMemo(() => {
    const types = new Set(files.map(f => f.file_type));
    return Array.from(types).filter(Boolean);
  }, [files]);

  // Get unique license types for filter
  const licenseTypes = useMemo(() => {
    const types = new Set(files.map(f => f.license_type).filter(Boolean));
    return Array.from(types);
  }, [files]);

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
        const result = await window.electronAPI.unwatchFolder(watchedFolder);
        if (result.success) {
          setIsWatching(false);
          setWatchedFolder(null);
          toast.success("Stopped Watching", {
            description: "File watching has been stopped",
          });
        }
      } else {
        const folderPath = await window.electronAPI.selectFolder();
        if (folderPath) {
          const result = await window.electronAPI.watchFolder(folderPath);
          if (result.success) {
            setIsWatching(true);
            setWatchedFolder(folderPath);
            toast.success("Watching Folder", {
              description: `Monitoring ${folderPath} for changes`,
            });

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
    } catch (err) {
      console.error("File watching error:", err);
      toast.error("Error", {
        description: "Failed to toggle file watching",
      });
    }
  };

  // Filter PLR files based on search and filters
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = 
        file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesCategory = categoryFilter === 'all' || file.category_id === categoryFilter;
      const matchesType = typeFilter === 'all' || file.file_type === typeFilter;
      const matchesLicense = licenseFilter === 'all' || file.license_type === licenseFilter;
      
      return matchesSearch && matchesCategory && matchesType && matchesLicense;
    });
  }, [files, searchTerm, categoryFilter, typeFilter, licenseFilter]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      await deleteFile(id);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getCategoryName = (categoryId: string | null): string => {
    if (!categoryId) return 'Uncategorized';
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || 'Unknown';
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <FileText className="w-16 h-16 text-destructive mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error Loading Library</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PLR Library</h2>
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `${files.length} files in your library`}
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
          <TabsTrigger value="all">All Items ({files.length})</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
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
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {fileTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                  <SelectTrigger className="w-[180px]">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="License" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Licenses</SelectItem>
                    {licenseTypes.map(license => (
                      <SelectItem key={license} value={license || ''}>{license}</SelectItem>
                    ))}
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
                  <Button variant="outline" size="icon" onClick={refetch}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <FolderOpen className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No PLR Content Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    {searchTerm || categoryFilter !== 'all' || typeFilter !== 'all' 
                      ? 'No files match your filters. Try adjusting your search.'
                      : 'Get started by scanning your computer for PLR files or adding content manually.'}
                  </p>
                  <Button>
                    <FilePlus className="h-4 w-4 mr-2" />
                    Add Your First PLR Content
                  </Button>
                </div>
              ) : viewMode === 'list' ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{file.file_name}</span>
                              {file.description && (
                                <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                                  {file.description}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getCategoryName(file.category_id)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{file.file_type}</Badge>
                          </TableCell>
                          <TableCell>
                            {file.license_type ? (
                              <Badge variant="outline">{file.license_type}</Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>{formatFileSize(file.file_size)}</TableCell>
                          <TableCell>
                            {file.created_at 
                              ? format(new Date(file.created_at), 'MMM d, yyyy')
                              : '—'}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Open Location
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleDelete(file.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
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
                  {filteredFiles.map((file) => (
                    <Card key={file.id} className="hover:border-primary transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg truncate">{file.file_name}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">{file.file_type}</Badge>
                          {file.license_type && (
                            <Badge variant="outline">{file.license_type}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-3 space-y-1">
                          <div>Category: {getCategoryName(file.category_id)}</div>
                          <div>Size: {formatFileSize(file.file_size)}</div>
                          <div>Added: {file.created_at 
                            ? format(new Date(file.created_at), 'MMM d, yyyy')
                            : '—'}</div>
                        </div>
                        {file.tags && file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {file.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {file.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{file.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex justify-end mt-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Open Location</DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleDelete(file.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {files.slice(0, 10).map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{file.file_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.created_at 
                            ? format(new Date(file.created_at), 'MMM d, yyyy')
                            : '—'}
                        </p>
                      </div>
                      <Badge variant="secondary">{file.file_type}</Badge>
                    </div>
                  ))}
                  {files.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No recent files found.
                    </p>
                  )}
                </div>
              )}
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
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No categories created yet.</p>
                  <Button>Create First Category</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(cat => {
                    const fileCount = files.filter(f => f.category_id === cat.id).length;
                    return (
                      <Card key={cat.id} className="hover:border-primary transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: cat.color || '#8B5CF6' }}
                            />
                            <CardTitle className="text-lg">{cat.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {cat.description || 'No description'}
                          </p>
                          <p className="text-sm font-medium mt-2">
                            {fileCount} file{fileCount !== 1 ? 's' : ''}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PLRLibrary;

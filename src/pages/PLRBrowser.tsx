
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Search, Filter, Tag, Grid3X3, List, Loader2, 
  Download, Edit, Trash2, Info
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PLRFile {
  id: string;
  title: string;
  file_path: string | null;
  file_type: string | null;
  category: string | null;
  tags: string[] | null;
  created_at: string;
}

const PLRBrowser = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<PLRFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<PLRFile | null>(null);
  const [fileDetailsOpen, setFileDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchFiles();
  }, [user]);

  const fetchFiles = async () => {
    if (!user) return;

    setLoading(true);
    
    try {
      // Fetch files
      const { data: filesData, error: filesError } = await supabase
        .from('plr_files')
        .select('*')
        .eq('user_id', user.id);
        
      if (filesError) {
        throw filesError;
      }
      
      setFiles(filesData || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(filesData?.map(file => file.category).filter(Boolean) as string[]));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching PLR files:', error);
      toast("Failed to load files", {
        description: "There was an error loading your PLR files. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string | null, title: string) => {
    if (!fileType) {
      // Try to determine type from filename
      const extension = title.split('.').pop()?.toLowerCase();
      
      switch (extension) {
        case 'pdf':
          return <FileText className="h-8 w-8 text-red-500" />;
        case 'doc':
        case 'docx':
          return <FileText className="h-8 w-8 text-blue-500" />;
        case 'xls':
        case 'xlsx':
          return <FileText className="h-8 w-8 text-green-500" />;
        case 'ppt':
        case 'pptx':
          return <FileText className="h-8 w-8 text-orange-500" />;
        case 'txt':
          return <FileText className="h-8 w-8 text-gray-500" />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return <FileText className="h-8 w-8 text-purple-500" />;
        default:
          return <FileText className="h-8 w-8 text-gray-500" />;
      }
    } else if (fileType.startsWith('image')) {
      return <FileText className="h-8 w-8 text-purple-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return <FileText className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes('excel') || fileType.includes('sheet')) {
      return <FileText className="h-8 w-8 text-green-500" />;
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return <FileText className="h-8 w-8 text-orange-500" />;
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getFileTypeLabel = (fileType: string | null, title: string) => {
    if (!fileType) {
      const extension = title.split('.').pop()?.toLowerCase();
      return extension?.toUpperCase() || 'Unknown';
    }
    
    if (fileType.includes('pdf')) {
      return 'PDF';
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return 'DOCX';
    } else if (fileType.includes('excel') || fileType.includes('sheet')) {
      return 'XLSX';
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return 'PPTX';
    } else if (fileType.startsWith('image')) {
      return fileType.split('/')[1].toUpperCase();
    } else {
      return fileType.split('/').pop()?.toUpperCase() || 'Unknown';
    }
  };

  const handleFileAction = (action: string, file: PLRFile) => {
    switch (action) {
      case 'details':
        setSelectedFile(file);
        setFileDetailsOpen(true);
        break;
      case 'edit':
        toast("Coming Soon", {
          description: "File editing functionality is coming soon!",
        });
        break;
      case 'delete':
        handleDeleteFile(file.id);
        break;
      default:
        break;
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!user) return;

    try {
      // Delete file from database
      const { error } = await supabase
        .from('plr_files')
        .delete()
        .eq('id', fileId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update UI
      setFiles(files.filter(file => file.id !== fileId));
      
      toast("File Deleted", {
        description: "The file has been removed from your PLR library.",
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast("Delete Failed", {
        description: "There was an error deleting the file. Please try again later.",
      });
    }
  };

  // Filter files based on search and category
  const filteredFiles = files.filter(file => {
    const matchesSearch = searchTerm === '' || 
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.category && file.category.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your PLR files...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">PLR File Browser</h1>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files by name or category"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full lg:w-64">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="">Uncategorized</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {filteredFiles.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      {getFileIcon(file.file_type, file.title)}
                      <span className="text-xs px-2 py-1 bg-muted rounded-md">
                        {getFileTypeLabel(file.file_type, file.title)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium truncate mb-1" title={file.title}>
                      {file.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {file.category || 'Uncategorized'}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('details', file)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('edit', file)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('delete', file)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:bg-accent/50 transition-colors">
                  <div className="p-4 flex items-center">
                    <div className="mr-4">
                      {getFileIcon(file.file_type, file.title)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium" title={file.title}>
                        {file.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">{getFileTypeLabel(file.file_type, file.title)}</span>
                        <span>•</span>
                        <span className="mx-2">{file.category || 'Uncategorized'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('details', file)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('edit', file)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileAction('delete', file)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No PLR Files Found</h3>
              <p className="text-muted-foreground text-center mb-4 max-w-md">
                {searchTerm || selectedCategory !== 'all' 
                  ? "No files match your current filters. Try adjusting your search or category filter." 
                  : "You haven't added any PLR files to your library yet. Start by scanning your PLR content."}
              </p>
              <Button onClick={() => window.location.href = '/scan'}>
                Scan PLR Content
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
      
      {/* File Details Dialog */}
      <Dialog open={fileDetailsOpen} onOpenChange={setFileDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
            <DialogDescription>
              Details for {selectedFile?.title}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-4">
                {getFileIcon(selectedFile.file_type, selectedFile.title)}
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">File Name</p>
                  <p>{selectedFile.title}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">File Type</p>
                  <p>{getFileTypeLabel(selectedFile.file_type, selectedFile.title)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{selectedFile.category || 'Uncategorized'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">File Path</p>
                  <p className="break-words">{selectedFile.file_path}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFile.tags && selectedFile.tags.length > 0 ? (
                      selectedFile.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No tags</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Added on</p>
                  <p>
                    {selectedFile.created_at 
                      ? new Date(selectedFile.created_at).toLocaleDateString() 
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFileDetailsOpen(false)}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setFileDetailsOpen(false);
                toast("Coming Soon", {
                  description: "Download functionality is coming soon!"
                });
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PLRBrowser;

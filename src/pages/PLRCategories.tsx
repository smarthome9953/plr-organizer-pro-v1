
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
import { toast } from '@/components/ui/sonner';
import {
  Loader2, Bookmark, PlusCircle, Save, X, CheckCircle2
} from 'lucide-react';

interface Category {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

const PLRCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [addingCategory, setAddingCategory] = useState<boolean>(false);
  const [popularCategories, setPopularCategories] = useState<string[]>([
    'Make Money Online', 'Health & Wellness', 'Self Improvement',
    'Business', 'Marketing', 'Social Media', 'Weight Loss',
    'Fitness', 'Mindfulness', 'Nutrition', 'Finance', 'Parenting'
  ]);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('plr_categories')
        .select('*')
        .eq('user_id', user?.id);
        
      if (error) {
        throw error;
      }
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast("Failed to load categories", {
        description: "There was an error loading your categories. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!user || !newCategory.trim()) return;
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      toast("Category exists", {
        description: "This category already exists in your library.",
      });
      return;
    }
    
    setAddingCategory(true);
    
    try {
      const { error } = await supabase
        .from('plr_categories')
        .insert({
          user_id: user.id,
          name: newCategory.trim()
        });
        
      if (error) {
        throw error;
      }
      
      // Refresh categories from database
      await fetchCategories();
      
      toast("Category Added", {
        description: `${newCategory.trim()} has been added to your categories.`,
      });
      
      // Reset input
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
      toast("Failed to add category", {
        description: "There was an error adding the category. Please try again.",
      });
    } finally {
      setAddingCategory(false);
    }
  };

  const addPopularCategory = async (categoryName: string) => {
    if (!user) return;
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
      toast("Category exists", {
        description: "This category already exists in your library.",
      });
      return;
    }
    
    setAddingCategory(true);
    
    try {
      const { error } = await supabase
        .from('plr_categories')
        .insert({
          user_id: user.id,
          name: categoryName
        });
        
      if (error) {
        throw error;
      }
      
      // Refresh categories from database
      await fetchCategories();
      
      toast("Category Added", {
        description: `${categoryName} has been added to your categories.`,
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast("Failed to add category", {
        description: "There was an error adding the category. Please try again.",
      });
    } finally {
      setAddingCategory(false);
    }
  };

  const deleteCategory = async (categoryName: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('plr_categories')
        .delete()
        .eq('user_id', user.id)
        .eq('name', categoryName);
        
      if (error) {
        throw error;
      }
      
      // Remove from local state
      setCategories(categories.filter(cat => cat.name !== categoryName));
      
      toast("Category Deleted", {
        description: `${categoryName} has been removed from your categories.`,
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast("Failed to delete category", {
        description: "There was an error deleting the category. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your categories...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage PLR Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Categories</CardTitle>
                <CardDescription>
                  Manage the categories you use to organize your PLR content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <div 
                        key={category.id} 
                        className="flex items-center justify-between bg-accent/50 p-2 rounded"
                      >
                        <div className="flex items-center">
                          <Bookmark className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteCategory(category.name)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="mb-1 font-medium">No Categories Yet</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add categories to organize your PLR content effectively
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter new category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      onClick={addCategory} 
                      disabled={!newCategory.trim() || addingCategory}
                    >
                      {addingCategory ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <PlusCircle className="h-4 w-4 mr-2" />
                      )}
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium">Be consistent</span>
                      <span className="block text-sm text-muted-foreground">
                        Use the same naming convention for all categories
                      </span>
                    </span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium">Be specific</span>
                      <span className="block text-sm text-muted-foreground">
                        Use specific terms that clearly describe the content
                      </span>
                    </span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium">Use niche terms</span>
                      <span className="block text-sm text-muted-foreground">
                        Categories like "Weight Loss" are better than general ones like "Health"
                      </span>
                    </span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium">Consider your workflow</span>
                      <span className="block text-sm text-muted-foreground">
                        Organize categories in a way that matches how you work with PLR content
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>
                  Quick-add common PLR categories to your library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {popularCategories.map((category) => {
                    const isAdded = categories.some(cat => 
                      cat.name.toLowerCase() === category.toLowerCase()
                    );
                    
                    return (
                      <div 
                        key={category} 
                        className="flex items-center justify-between p-2 rounded hover:bg-accent/50"
                      >
                        <span className="text-sm">{category}</span>
                        {isAdded ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20" 
                            disabled
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Added
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs" 
                            onClick={() => addPopularCategory(category)}
                          >
                            <PlusCircle className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>AI Category Suggestions</CardTitle>
                <CardDescription>
                  Let AI suggest categories based on your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <Bookmark className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm mb-4">
                    AI will analyze your PLR content and suggest relevant categories
                  </p>
                  <Button 
                    onClick={() => {
                      toast("Coming Soon", {
                        description: "AI category suggestions will be available in a future update.",
                      });
                    }}
                    className="w-full"
                  >
                    Generate Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PLRCategories;

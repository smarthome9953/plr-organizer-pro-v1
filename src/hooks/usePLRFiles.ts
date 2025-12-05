import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type PLRFile = Tables<'plr_files'>;
export type PLRFileInsert = TablesInsert<'plr_files'>;
export type PLRFileUpdate = TablesUpdate<'plr_files'>;

export type PLRCategory = Tables<'plr_categories'>;

interface UsePLRFilesReturn {
  files: PLRFile[];
  categories: PLRCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addFile: (file: Omit<PLRFileInsert, 'user_id'>) => Promise<PLRFile | null>;
  updateFile: (id: string, updates: PLRFileUpdate) => Promise<boolean>;
  deleteFile: (id: string) => Promise<boolean>;
  addCategory: (name: string, description?: string, color?: string) => Promise<PLRCategory | null>;
}

export const usePLRFiles = (): UsePLRFilesReturn => {
  const { user } = useAuth();
  const [files, setFiles] = useState<PLRFile[]>([]);
  const [categories, setCategories] = useState<PLRCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!user) {
      setFiles([]);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [filesResult, categoriesResult] = await Promise.all([
        supabase
          .from('plr_files')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('plr_categories')
          .select('*')
          .eq('user_id', user.id)
          .order('name', { ascending: true })
      ]);

      if (filesResult.error) throw filesResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setFiles(filesResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch PLR files';
      setError(message);
      console.error('Error fetching PLR files:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const addFile = async (file: Omit<PLRFileInsert, 'user_id'>): Promise<PLRFile | null> => {
    if (!user) {
      toast.error('You must be logged in to add files');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('plr_files')
        .insert({ ...file, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setFiles(prev => [data, ...prev]);
      toast.success('File added successfully');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add file';
      toast.error(message);
      console.error('Error adding PLR file:', err);
      return null;
    }
  };

  const updateFile = async (id: string, updates: PLRFileUpdate): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to update files');
      return false;
    }

    try {
      const { error } = await supabase
        .from('plr_files')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
      toast.success('File updated successfully');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update file';
      toast.error(message);
      console.error('Error updating PLR file:', err);
      return false;
    }
  };

  const deleteFile = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to delete files');
      return false;
    }

    try {
      const { error } = await supabase
        .from('plr_files')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setFiles(prev => prev.filter(f => f.id !== id));
      toast.success('File deleted successfully');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete file';
      toast.error(message);
      console.error('Error deleting PLR file:', err);
      return false;
    }
  };

  const addCategory = async (name: string, description?: string, color?: string): Promise<PLRCategory | null> => {
    if (!user) {
      toast.error('You must be logged in to add categories');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('plr_categories')
        .insert({ 
          user_id: user.id, 
          name, 
          description: description || null,
          color: color || '#8B5CF6'
        })
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      toast.success('Category added successfully');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add category';
      toast.error(message);
      console.error('Error adding category:', err);
      return null;
    }
  };

  return {
    files,
    categories,
    isLoading,
    error,
    refetch: fetchFiles,
    addFile,
    updateFile,
    deleteFile,
    addCategory
  };
};

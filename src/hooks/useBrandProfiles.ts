import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface BrandProfile {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  primary_font: string;
  heading_font: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandProfileInsert {
  name: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  primary_font?: string;
  heading_font?: string;
  logo_url?: string | null;
}

export function useBrandProfiles() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    if (!user) {
      setProfiles([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('brand_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProfiles(data || []);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch brand profiles';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const addProfile = async (profile: BrandProfileInsert) => {
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in', variant: 'destructive' });
      return null;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('brand_profiles')
        .insert({ ...profile, user_id: user.id })
        .select()
        .single();

      if (insertError) throw insertError;

      setProfiles(prev => [data, ...prev]);
      toast({ title: 'Success', description: 'Brand profile created' });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create brand profile';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  };

  const updateProfile = async (id: string, updates: Partial<BrandProfileInsert>) => {
    if (!user) return null;

    try {
      const { data, error: updateError } = await supabase
        .from('brand_profiles')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      toast({ title: 'Success', description: 'Brand profile updated' });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update brand profile';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  };

  const deleteProfile = async (id: string) => {
    if (!user) return false;

    try {
      const { error: deleteError } = await supabase
        .from('brand_profiles')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setProfiles(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Success', description: 'Brand profile deleted' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete brand profile';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    }
  };

  return {
    profiles,
    isLoading,
    error,
    refetch: fetchProfiles,
    addProfile,
    updateProfile,
    deleteProfile,
  };
}

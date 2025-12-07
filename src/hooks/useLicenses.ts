import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface License {
  id: string;
  name: string;
  provider: string;
  type: string;
  acquired_date: string;
  expiration_date: string | null;
  can_sell: boolean;
  can_edit: boolean;
  can_distribute: boolean;
  requires_attribution: boolean;
  usage_limitations: string | null;
  status: 'active' | 'expired' | 'risky';
  notes: string | null;
  associated_content: string[];
  created_at: string;
  updated_at: string;
}

export interface LicenseInsert {
  name: string;
  provider: string;
  type: string;
  acquired_date: string;
  expiration_date?: string | null;
  can_sell?: boolean;
  can_edit?: boolean;
  can_distribute?: boolean;
  requires_attribution?: boolean;
  usage_limitations?: string | null;
  status?: string;
  notes?: string | null;
  associated_content?: string[];
}

export function useLicenses() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLicenses = useCallback(async () => {
    if (!user) {
      setLicenses([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('licenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Calculate status based on expiration date
      const processedLicenses = (data || []).map((license: any) => {
        const today = new Date();
        const expirationDate = license.expiration_date ? new Date(license.expiration_date) : null;
        
        let status: 'active' | 'expired' | 'risky' = 'active';
        if (expirationDate && expirationDate < today) {
          status = 'expired';
        } else if (expirationDate) {
          const daysUntilExpiration = (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
          if (daysUntilExpiration < 30) {
            status = 'risky';
          }
        }

        return { ...license, status };
      });

      setLicenses(processedLicenses);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch licenses';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  const addLicense = async (license: LicenseInsert) => {
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in', variant: 'destructive' });
      return null;
    }

    try {
      // Calculate initial status
      const today = new Date();
      const expirationDate = license.expiration_date ? new Date(license.expiration_date) : null;
      let status = 'active';
      if (expirationDate && expirationDate < today) {
        status = 'expired';
      } else if (expirationDate) {
        const daysUntilExpiration = (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (daysUntilExpiration < 30) {
          status = 'risky';
        }
      }

      const { data, error: insertError } = await supabase
        .from('licenses')
        .insert({ 
          ...license, 
          user_id: user.id,
          status 
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const newLicense: License = {
        ...data,
        status: data.status as 'active' | 'expired' | 'risky'
      };

      setLicenses(prev => [newLicense, ...prev]);
      toast({ title: 'Success', description: 'License added successfully' });
      return newLicense;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add license';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  };

  const updateLicense = async (id: string, updates: Partial<LicenseInsert>) => {
    if (!user) return null;

    try {
      const { data, error: updateError } = await supabase
        .from('licenses')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      const updatedLicense: License = {
        ...data,
        status: data.status as 'active' | 'expired' | 'risky'
      };

      setLicenses(prev => prev.map(l => l.id === id ? updatedLicense : l));
      toast({ title: 'Success', description: 'License updated successfully' });
      return updatedLicense;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update license';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  };

  const deleteLicense = async (id: string) => {
    if (!user) return false;

    try {
      const { error: deleteError } = await supabase
        .from('licenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setLicenses(prev => prev.filter(l => l.id !== id));
      toast({ title: 'Success', description: 'License deleted successfully' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete license';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    }
  };

  return {
    licenses,
    isLoading,
    error,
    refetch: fetchLicenses,
    addLicense,
    updateLicense,
    deleteLicense,
  };
}

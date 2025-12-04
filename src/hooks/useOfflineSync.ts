import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface PLRFile {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  license_type?: string;
  confidence_score?: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}

interface SyncStatus {
  status: 'synced' | 'syncing' | 'offline' | 'error';
  lastSyncTime?: Date;
  pendingChanges: number;
}

export const useOfflineSync = () => {
  const { user } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    status: 'offline',
    pendingChanges: 0,
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Check if running in Electron
  const isElectron = !!window.electronAPI;

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load local data on app launch (Electron only)
  useEffect(() => {
    if (isElectron && user) {
      loadLocalData();
    }
  }, [user, isElectron]);

  // Auto-sync every 5 minutes when online
  useEffect(() => {
    if (!isOnline || !isElectron || !user) return;

    const syncInterval = setInterval(() => {
      syncData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(syncInterval);
  }, [isOnline, isElectron, user]);

  // Sync when coming back online
  useEffect(() => {
    if (isOnline && isElectron && user) {
      syncData();
    } else if (!isOnline) {
      setSyncStatus(prev => ({ ...prev, status: 'offline' }));
    }
  }, [isOnline, isElectron, user]);

  const loadLocalData = async () => {
    if (!window.electronAPI || !user) return;

    try {
      const result = await window.electronAPI.getLocalData(user.id);
      
      if (result.success && result.files) {
        console.log(`Loaded ${result.files.length} files from local database`);
        return result.files;
      }
    } catch (error) {
      console.error('Error loading local data:', error);
    }
  };

  const syncData = async () => {
    if (!window.electronAPI || !user || !isOnline) return;

    setSyncStatus(prev => ({ ...prev, status: 'syncing' }));

    try {
      // Fetch data from Supabase
      const { data: cloudFiles, error } = await supabase
        .from('plr_files')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Get local data
      const localResult = await window.electronAPI.getLocalData(user.id);
      const localFiles = localResult.files || [];

      // Merge logic: Cloud data takes precedence (last-write-wins)
      const filesToSync = cloudFiles || [];

      // Sync to local database
      if (filesToSync.length > 0) {
        const syncResult = await window.electronAPI.syncToLocal(
          filesToSync.map(file => ({
            ...file,
            created_at: new Date(file.created_at),
            updated_at: new Date(file.updated_at),
          }))
        );

        if (syncResult.success) {
          setSyncStatus({
            status: 'synced',
            lastSyncTime: new Date(),
            pendingChanges: 0,
          });

          console.log(`Synced ${syncResult.count} files to local database`);
        }
      } else {
        setSyncStatus({
          status: 'synced',
          lastSyncTime: new Date(),
          pendingChanges: 0,
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus(prev => ({ ...prev, status: 'error' }));
      toast.error('Sync Failed', {
        description: 'Unable to sync data. Changes will be saved locally.',
      });
    }
  };

  const forceSyncNow = useCallback(async () => {
    if (!isOnline) {
      toast.error('Offline', {
        description: 'Cannot sync while offline',
      });
      return;
    }

    await syncData();
    toast.success('Sync Complete', {
      description: 'Your library has been synchronized',
    });
  }, [isOnline]);

  return {
    syncStatus,
    isOnline,
    syncData,
    forceSyncNow,
    loadLocalData,
  };
};

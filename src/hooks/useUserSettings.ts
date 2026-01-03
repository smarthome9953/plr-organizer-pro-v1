import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserSettings {
  plr_folder_path: string | null;
  organization_mode: 'copy' | 'move' | 'niche' | 'type' | 'date' | 'custom';
  auto_organize: boolean;
  create_niche_folders: boolean;
  create_subniche_folders: boolean;
  scan_subfolders: boolean;
  onboarding_completed: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  plr_folder_path: null,
  organization_mode: 'niche',
  auto_organize: false,
  create_niche_folders: true,
  create_subniche_folders: true,
  scan_subfolders: true,
  onboarding_completed: false,
};

const LOCAL_STORAGE_KEY = 'plr_user_settings';

export const useUserSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalStorageKey = useCallback(() => {
    return user ? `${LOCAL_STORAGE_KEY}_${user.id}` : LOCAL_STORAGE_KEY;
  }, [user]);

  // Load settings from database or localStorage
  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user) {
        // Try to load from database first
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading settings from database:', error);
        }

        if (data) {
          const dbSettings: UserSettings = {
            plr_folder_path: data.plr_folder_path,
            organization_mode: data.organization_mode as UserSettings['organization_mode'],
            auto_organize: data.auto_organize,
            create_niche_folders: data.create_niche_folders,
            create_subniche_folders: data.create_subniche_folders,
            scan_subfolders: data.scan_subfolders,
            onboarding_completed: data.onboarding_completed,
          };
          setSettings(dbSettings);
          // Sync to localStorage as backup
          localStorage.setItem(getLocalStorageKey(), JSON.stringify(dbSettings));
          setIsLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      const stored = localStorage.getItem(getLocalStorageKey());
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setSettings(null);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      // Fallback to localStorage on error
      const stored = localStorage.getItem(getLocalStorageKey());
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setSettings(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, getLocalStorageKey]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Save settings to database and localStorage
  const saveSettings = useCallback(async (newSettings: UserSettings): Promise<boolean> => {
    try {
      // Always save to localStorage first
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(newSettings));
      setSettings(newSettings);

      // If user is logged in, save to database
      if (user) {
        const { error } = await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            plr_folder_path: newSettings.plr_folder_path,
            organization_mode: newSettings.organization_mode,
            auto_organize: newSettings.auto_organize,
            create_niche_folders: newSettings.create_niche_folders,
            create_subniche_folders: newSettings.create_subniche_folders,
            scan_subfolders: newSettings.scan_subfolders,
            onboarding_completed: newSettings.onboarding_completed,
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          console.error('Error saving settings to database:', error);
          return false;
        }
      }

      return true;
    } catch (err) {
      console.error('Error saving settings:', err);
      return false;
    }
  }, [user, getLocalStorageKey]);

  const updateSettings = useCallback(async (updates: Partial<UserSettings>): Promise<UserSettings> => {
    const current = settings ?? DEFAULT_SETTINGS;
    const updated = { ...current, ...updates };
    await saveSettings(updated);
    return updated;
  }, [settings, saveSettings]);

  const initializeSettings = useCallback(async (initialSettings?: Partial<UserSettings>): Promise<UserSettings> => {
    const newSettings = { ...DEFAULT_SETTINGS, ...initialSettings };
    await saveSettings(newSettings);
    return newSettings;
  }, [saveSettings]);

  const hasCompletedOnboarding = settings?.onboarding_completed ?? false;
  const hasPLRFolder = !!settings?.plr_folder_path;

  return {
    settings,
    isLoading,
    loadSettings,
    saveSettings,
    updateSettings,
    initializeSettings,
    hasCompletedOnboarding,
    hasPLRFolder,
    defaultSettings: DEFAULT_SETTINGS,
  };
};

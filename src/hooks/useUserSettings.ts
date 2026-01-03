import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface UserSettings {
  plr_folder_path: string | null;
  organization_mode: 'copy' | 'move';
  auto_organize: boolean;
  create_niche_folders: boolean;
  create_subniche_folders: boolean;
  scan_subfolders: boolean;
  onboarding_completed: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  plr_folder_path: null,
  organization_mode: 'copy',
  auto_organize: false,
  create_niche_folders: true,
  create_subniche_folders: true,
  scan_subfolders: true,
  onboarding_completed: false,
};

const STORAGE_KEY = 'plr_user_settings';

export const useUserSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStorageKey = useCallback(() => {
    return user ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;
  }, [user]);

  const loadSettings = useCallback(() => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setSettings(null);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setSettings(null);
    } finally {
      setIsLoading(false);
    }
  }, [getStorageKey]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const saveSettings = useCallback((newSettings: UserSettings) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(newSettings));
      setSettings(newSettings);
      return true;
    } catch (err) {
      console.error('Error saving settings:', err);
      return false;
    }
  }, [getStorageKey]);

  const updateSettings = useCallback((updates: Partial<UserSettings>): UserSettings => {
    const current = settings ?? DEFAULT_SETTINGS;
    const updated = { ...current, ...updates };
    saveSettings(updated);
    return updated;
  }, [settings, saveSettings]);

  const initializeSettings = useCallback((initialSettings?: Partial<UserSettings>): UserSettings => {
    const newSettings = { ...DEFAULT_SETTINGS, ...initialSettings };
    saveSettings(newSettings);
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

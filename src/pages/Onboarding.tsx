import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useElectron } from '@/context/ElectronContext';
import { useUserSettings } from '@/hooks/useUserSettings';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { 
  FolderSearch, FileText, Sparkles, CheckCircle2, 
  ArrowRight, Loader2, HardDrive, FolderOpen, Settings2,
  Copy, Move, RefreshCw
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isElectronApp } = useElectron();
  const { updateSettings, initializeSettings } = useUserSettings();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Setup wizard state
  const [plrFolderPath, setPlrFolderPath] = useState<string | null>(null);
  const [organizationMode, setOrganizationMode] = useState<'copy' | 'move'>('copy');
  const [autoOrganize, setAutoOrganize] = useState(false);
  const [createNicheFolders, setCreateNicheFolders] = useState(true);
  const [createSubnicheFolders, setCreateSubnicheFolders] = useState(true);
  const [scanSubfolders, setScanSubfolders] = useState(true);

  // Steps: 1-Welcome, 2-Connect Folder (desktop only), 3-Organization Preferences, 4-Features, 5-Complete
  const totalSteps = isElectronApp ? 5 : 4;

  useEffect(() => {
    localStorage.setItem('onboarding_started', 'true');
  }, []);

  const handleSelectFolder = async () => {
    if (!isElectronApp || !window.electronAPI) {
      toast.error('Folder selection is only available in the desktop app');
      return;
    }

    try {
      const result = await window.electronAPI.selectFolder();
      if (result) {
        setPlrFolderPath(result);
        toast.success('Folder selected successfully');
      }
    } catch (error) {
      console.error('Error selecting folder:', error);
      toast.error('Failed to select folder');
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Save user settings to database
      await initializeSettings({
        plr_folder_path: plrFolderPath,
        organization_mode: organizationMode,
        auto_organize: autoOrganize,
        create_niche_folders: createNicheFolders,
        create_subniche_folders: createSubnicheFolders,
        scan_subfolders: scanSubfolders,
        onboarding_completed: true,
      });

      // Create default category
      if (user) {
        try {
          await supabase
            .from('plr_categories')
            .insert({
              user_id: user.id,
              name: 'Uncategorized',
              description: 'Default category for new PLR content',
              color: '#8B5CF6',
            });
        } catch (err) {
          // Category might already exist, ignore error
          console.log('Default category may already exist');
        }
      }

      toast.success("Welcome to PLR Organizer Pro!", {
        description: "Your workspace is ready. Let's start organizing your content!",
      });

      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Setup completed with some issues');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  // Determine which content to show based on step and platform
  const getStepContent = () => {
    if (isElectronApp) {
      switch (currentStep) {
        case 1:
          return <WelcomeStep />;
        case 2:
          return (
            <ConnectFolderStep 
              plrFolderPath={plrFolderPath}
              onSelectFolder={handleSelectFolder}
            />
          );
        case 3:
          return (
            <OrganizationPreferencesStep
              organizationMode={organizationMode}
              setOrganizationMode={setOrganizationMode}
              autoOrganize={autoOrganize}
              setAutoOrganize={setAutoOrganize}
              createNicheFolders={createNicheFolders}
              setCreateNicheFolders={setCreateNicheFolders}
              createSubnicheFolders={createSubnicheFolders}
              setCreateSubnicheFolders={setCreateSubnicheFolders}
              scanSubfolders={scanSubfolders}
              setScanSubfolders={setScanSubfolders}
            />
          );
        case 4:
          return <FeaturesStep />;
        case 5:
          return <CompleteStep isDesktop />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <WelcomeStep />;
        case 2:
          return <OrganizeStep />;
        case 3:
          return <FeaturesStep />;
        case 4:
          return <CompleteStep isDesktop={false} />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Welcome | PLR Organizer Pro</title>
        <meta name="description" content="Get started with PLR Organizer Pro" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome to PLR Organizer Pro</h1>
            <p className="text-center text-muted-foreground">
              Let's get you set up in just a few steps
            </p>
            <div className="mt-6">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {getStepContent()}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} disabled={loading}>
                    Back
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} className="ml-auto">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} disabled={loading} className="ml-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting Up...
                      </>
                    ) : (
                      <>
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => navigate('/dashboard')} className="text-muted-foreground text-sm">
              Skip onboarding
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Step Components

const WelcomeStep = () => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="h-20 w-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
        <FolderSearch className="h-10 w-10 text-purple-600 dark:text-purple-400" />
      </div>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>Scan & Organize Your PLR Content</CardTitle>
      <CardDescription>
        PLR Organizer Pro helps you find, organize, and maximize your PLR investments
      </CardDescription>
    </CardHeader>
    <div className="space-y-2 text-left px-4">
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Automatically detect and categorize PLR files</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">AI-powered niche detection and organization</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Track licenses and usage across your library</p>
      </div>
    </div>
  </div>
);

interface ConnectFolderStepProps {
  plrFolderPath: string | null;
  onSelectFolder: () => void;
}

const ConnectFolderStep = ({ plrFolderPath, onSelectFolder }: ConnectFolderStepProps) => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="h-20 w-20 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
        <FolderOpen className="h-10 w-10 text-teal-600 dark:text-teal-400" />
      </div>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>Connect Your PLR Folder</CardTitle>
      <CardDescription>
        Select the main folder where you store your PLR content
      </CardDescription>
    </CardHeader>
    
    <div className="px-4 space-y-4">
      <Button 
        onClick={onSelectFolder} 
        variant="outline" 
        className="w-full h-24 border-dashed border-2 hover:border-primary"
      >
        <div className="flex flex-col items-center">
          <HardDrive className="h-8 w-8 mb-2 text-muted-foreground" />
          <span>{plrFolderPath ? 'Change Folder' : 'Select PLR Folder'}</span>
        </div>
      </Button>
      
      {plrFolderPath && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Folder Connected</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 truncate">{plrFolderPath}</p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        You can change this later in Settings. This folder will be scanned for PLR content.
      </p>
    </div>
  </div>
);

interface OrganizationPreferencesStepProps {
  organizationMode: 'copy' | 'move';
  setOrganizationMode: (mode: 'copy' | 'move') => void;
  autoOrganize: boolean;
  setAutoOrganize: (value: boolean) => void;
  createNicheFolders: boolean;
  setCreateNicheFolders: (value: boolean) => void;
  createSubnicheFolders: boolean;
  setCreateSubnicheFolders: (value: boolean) => void;
  scanSubfolders: boolean;
  setScanSubfolders: (value: boolean) => void;
}

const OrganizationPreferencesStep = ({
  organizationMode,
  setOrganizationMode,
  autoOrganize,
  setAutoOrganize,
  createNicheFolders,
  setCreateNicheFolders,
  createSubnicheFolders,
  setCreateSubnicheFolders,
  scanSubfolders,
  setScanSubfolders,
}: OrganizationPreferencesStepProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <Settings2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>Organization Preferences</CardTitle>
        <CardDescription>
          Configure how your PLR content will be organized
        </CardDescription>
      </CardHeader>
    </div>

    <div className="space-y-6 px-4">
      {/* Organization Mode */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">When organizing files:</Label>
        <RadioGroup 
          value={organizationMode} 
          onValueChange={(v) => setOrganizationMode(v as 'copy' | 'move')}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary">
            <RadioGroupItem value="copy" id="copy" />
            <Label htmlFor="copy" className="flex items-center gap-2 cursor-pointer">
              <Copy className="h-4 w-4" />
              <div>
                <span className="font-medium">Copy files</span>
                <p className="text-xs text-muted-foreground">Keep originals safe</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary">
            <RadioGroupItem value="move" id="move" />
            <Label htmlFor="move" className="flex items-center gap-2 cursor-pointer">
              <Move className="h-4 w-4" />
              <div>
                <span className="font-medium">Move files</span>
                <p className="text-xs text-muted-foreground">Clean up source folder</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-organize" className="font-medium">Auto-organize new files</Label>
            <p className="text-xs text-muted-foreground">Automatically organize when scanning</p>
          </div>
          <Switch 
            id="auto-organize" 
            checked={autoOrganize} 
            onCheckedChange={setAutoOrganize} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="niche-folders" className="font-medium">Create niche folders</Label>
            <p className="text-xs text-muted-foreground">Group by detected niche</p>
          </div>
          <Switch 
            id="niche-folders" 
            checked={createNicheFolders} 
            onCheckedChange={setCreateNicheFolders} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="subniche-folders" className="font-medium">Create sub-niche folders</Label>
            <p className="text-xs text-muted-foreground">Further organize by sub-categories</p>
          </div>
          <Switch 
            id="subniche-folders" 
            checked={createSubnicheFolders} 
            onCheckedChange={setCreateSubnicheFolders} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="scan-subfolders" className="font-medium">Scan subfolders</Label>
            <p className="text-xs text-muted-foreground">Include nested directories</p>
          </div>
          <Switch 
            id="scan-subfolders" 
            checked={scanSubfolders} 
            onCheckedChange={setScanSubfolders} 
          />
        </div>
      </div>
    </div>
  </div>
);

const OrganizeStep = () => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
        <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>Organize Your Content</CardTitle>
      <CardDescription>
        Keep your PLR library organized with categories, tags, and smart search
      </CardDescription>
    </CardHeader>
    <div className="space-y-2 text-left px-4">
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Create custom categories for different niches</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Tag content for easy retrieval</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Search across all your PLR assets instantly</p>
      </div>
    </div>
  </div>
);

const FeaturesStep = () => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="h-20 w-20 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
        <Sparkles className="h-10 w-10 text-pink-600 dark:text-pink-400" />
      </div>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>AI-Powered Tools</CardTitle>
      <CardDescription>
        Transform your PLR content with powerful editing and optimization tools
      </CardDescription>
    </CardHeader>
    <div className="space-y-2 text-left px-4">
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Content spinner for uniqueness</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">SEO analyzer and optimizer</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Multi-language translation</p>
      </div>
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm">Batch editing and file conversion</p>
      </div>
    </div>
  </div>
);

interface CompleteStepProps {
  isDesktop: boolean;
}

const CompleteStep = ({ isDesktop }: CompleteStepProps) => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="h-20 w-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>You're All Set!</CardTitle>
      <CardDescription>
        {isDesktop 
          ? "Your desktop workspace is ready. Enjoy enhanced features!"
          : "Your PLR Organizer Pro workspace is ready to use"
        }
      </CardDescription>
    </CardHeader>
    <div className="space-y-3 px-4">
      <p className="text-sm">Here's what you can do next:</p>
      <div className="space-y-2 text-left">
        <div className="flex items-start">
          <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm">Scan your computer for PLR content</p>
        </div>
        <div className="flex items-start">
          <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm">Organize files into niche categories</p>
        </div>
        <div className="flex items-start">
          <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm">Use AI tools to transform your content</p>
        </div>
        {isDesktop && (
          <div className="flex items-start">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm">Enjoy offline access to your library</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Onboarding;

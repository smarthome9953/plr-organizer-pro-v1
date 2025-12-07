import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Palette, Upload, Plus, Trash2, Save, Eye, Loader2 } from 'lucide-react';
import { useBrandProfiles, BrandProfile, BrandProfileInsert } from '@/hooks/useBrandProfiles';
import { toast } from '@/hooks/use-toast';

export default function BrandKitToolApp() {
  const { profiles, isLoading, addProfile, updateProfile, deleteProfile } = useBrandProfiles();
  const [activeTab, setActiveTab] = useState("brand-profiles");
  const [currentProfile, setCurrentProfile] = useState<BrandProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<BrandProfileInsert>>({});
  
  useEffect(() => {
    if (profiles.length > 0 && !currentProfile) {
      setCurrentProfile(profiles[0]);
      setEditedProfile(profiles[0]);
    }
  }, [profiles, currentProfile]);

  const handleSelectProfile = (profile: BrandProfile) => {
    setCurrentProfile(profile);
    setEditedProfile(profile);
  };

  const handleSaveProfile = async () => {
    if (!currentProfile || !editedProfile.name) return;
    
    await updateProfile(currentProfile.id, editedProfile);
    setCurrentProfile({ ...currentProfile, ...editedProfile } as BrandProfile);
  };
  
  const handleCreateNewProfile = async () => {
    const newProfile = await addProfile({
      name: "New Brand Profile",
      primary_color: "#6366F1",
      secondary_color: "#A5B4FC",
      accent_color: "#4F46E5",
      primary_font: "Inter",
      heading_font: "Poppins"
    });
    
    if (newProfile) {
      setCurrentProfile(newProfile);
      setEditedProfile(newProfile);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    const success = await deleteProfile(id);
    if (success && currentProfile?.id === id) {
      setCurrentProfile(profiles.find(p => p.id !== id) || null);
      setEditedProfile({});
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Brand Kit Tool | PLR Organizer Pro</title>
        <meta name="description" content="Create and manage brand profiles for your PLR content with our Brand Kit Tool." />
      </Helmet>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brand Kit Tool</h1>
          <p className="text-muted-foreground">Create and manage brand profiles for your PLR content</p>
        </div>
        <Button onClick={handleCreateNewProfile}>
          <Plus className="mr-2 h-4 w-4" />
          New Brand Profile
        </Button>
      </div>
      
      <Tabs defaultValue="brand-profiles" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="brand-profiles">Brand Profiles</TabsTrigger>
          <TabsTrigger value="apply-branding">Apply Branding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brand-profiles" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Brand Profiles</CardTitle>
                  <CardDescription>Select a profile to edit or create a new one</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {profiles.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm mb-4">No brand profiles yet</p>
                      <Button variant="outline" onClick={handleCreateNewProfile}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Profile
                      </Button>
                    </div>
                  ) : (
                    profiles.map(profile => (
                      <div key={profile.id} className="flex items-center gap-2">
                        <Button 
                          variant={profile.id === currentProfile?.id ? "secondary" : "ghost"} 
                          className="w-full justify-start flex-1"
                          onClick={() => handleSelectProfile(profile)}
                        >
                          <div className="w-4 h-4 rounded-full mr-3" style={{backgroundColor: profile.primary_color}}></div>
                          {profile.name}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              {currentProfile ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Brand Profile</CardTitle>
                    <CardDescription>Customize the brand elements for "{editedProfile.name || currentProfile.name}"</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Basic Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input 
                          id="brand-name" 
                          value={editedProfile.name || ''} 
                          onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Color Palette</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Primary Color</Label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md border-y border-l" style={{backgroundColor: editedProfile.primary_color || '#6B5CE7'}}></div>
                            <Input 
                              value={editedProfile.primary_color || ''} 
                              onChange={(e) => setEditedProfile({...editedProfile, primary_color: e.target.value})}
                              className="rounded-l-none w-full"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Secondary Color</Label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md border-y border-l" style={{backgroundColor: editedProfile.secondary_color || '#00BCD4'}}></div>
                            <Input 
                              value={editedProfile.secondary_color || ''} 
                              onChange={(e) => setEditedProfile({...editedProfile, secondary_color: e.target.value})}
                              className="rounded-l-none w-full"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Accent Color</Label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md border-y border-l" style={{backgroundColor: editedProfile.accent_color || '#F59E0B'}}></div>
                            <Input 
                              value={editedProfile.accent_color || ''} 
                              onChange={(e) => setEditedProfile({...editedProfile, accent_color: e.target.value})}
                              className="rounded-l-none w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Typography</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Heading Font</Label>
                          <Input 
                            value={editedProfile.heading_font || ''} 
                            onChange={(e) => setEditedProfile({...editedProfile, heading_font: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Body Font</Label>
                          <Input 
                            value={editedProfile.primary_font || ''} 
                            onChange={(e) => setEditedProfile({...editedProfile, primary_font: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Profile Selected</h3>
                    <p className="text-muted-foreground mb-4">Create your first brand profile to get started.</p>
                    <Button onClick={handleCreateNewProfile}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Brand Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="apply-branding">
          <Card>
            <CardHeader>
              <CardTitle>Apply Brand to PLR Content</CardTitle>
              <CardDescription>Select files and apply your brand elements to them</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Select Brand Profile</h3>
                  <select className="border rounded-md py-2 px-4 bg-transparent text-sm">
                    {profiles.map(profile => (
                      <option key={profile.id} value={profile.id}>{profile.name}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Upload PLR Files</h3>
                  <div className="border-2 border-dashed rounded-lg p-10 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports DOCX, PDF, PPTX, JPG, PNG</p>
                    <Button variant="outline" size="sm" className="mt-4">Browse Files</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => toast({ title: "Branding Applied!", description: "Your branding has been applied to the selected files." })}>
                <Palette className="mr-2 h-4 w-4" />
                Apply Branding
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

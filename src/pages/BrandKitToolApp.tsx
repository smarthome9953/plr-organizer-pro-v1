
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { Palette, Upload, Plus, Trash2, Check, Save, Eye } from 'lucide-react';

export default function BrandKitToolApp() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("brand-profiles");
  
  // Sample brand profiles
  const [brandProfiles, setBrandProfiles] = useState([
    {
      id: "1",
      name: "Main Brand",
      primaryColor: "#4285F4",
      secondaryColor: "#34A853",
      accentColor: "#EA4335",
      primaryFont: "Inter",
      headingFont: "Playfair Display",
      logoUrl: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Health Niche",
      primaryColor: "#00A36C",
      secondaryColor: "#7DCFB6",
      accentColor: "#F2D857",
      primaryFont: "Lato",
      headingFont: "Montserrat",
      logoUrl: "/placeholder.svg"
    }
  ]);
  
  // Current edited profile
  const [currentProfile, setCurrentProfile] = useState(brandProfiles[0]);
  
  const handleSaveProfile = () => {
    setBrandProfiles(brandProfiles.map(profile => 
      profile.id === currentProfile.id ? currentProfile : profile
    ));
    
    toast({
      title: "Profile Saved",
      description: `${currentProfile.name} has been updated successfully.`,
    });
  };
  
  const handleCreateNewProfile = () => {
    const newProfile = {
      id: `${brandProfiles.length + 1}`,
      name: "New Brand Profile",
      primaryColor: "#6366F1",
      secondaryColor: "#A5B4FC",
      accentColor: "#4F46E5",
      primaryFont: "Inter",
      headingFont: "Poppins",
      logoUrl: "/placeholder.svg"
    };
    
    setBrandProfiles([...brandProfiles, newProfile]);
    setCurrentProfile(newProfile);
    
    toast({
      title: "New Profile Created",
      description: "Start customizing your new brand profile.",
    });
  };
  
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
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
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
                  {brandProfiles.map(profile => (
                    <Button 
                      key={profile.id}
                      variant={profile.id === currentProfile.id ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentProfile(profile)}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{backgroundColor: profile.primaryColor}}
                      ></div>
                      {profile.name}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mt-2 border border-dashed border-muted-foreground/30"
                    onClick={handleCreateNewProfile}
                  >
                    <Plus className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Create New Profile</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Brand Profile</CardTitle>
                  <CardDescription>
                    Customize the brand elements for "{currentProfile.name}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Basic Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="brand-name">Brand Name</Label>
                      <Input 
                        id="brand-name" 
                        value={currentProfile.name} 
                        onChange={(e) => setCurrentProfile({...currentProfile, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Logo */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Logo</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                        <div className="w-40 h-40">
                          <AspectRatio ratio={1/1}>
                            <img 
                              src={currentProfile.logoUrl} 
                              alt={`${currentProfile.name} logo`}
                              className="object-contain w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Color Palette */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Color Palette</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex">
                          <div 
                            className="w-10 h-10 rounded-l-md border-y border-l" 
                            style={{backgroundColor: currentProfile.primaryColor}}
                          ></div>
                          <Input 
                            id="primary-color" 
                            value={currentProfile.primaryColor} 
                            onChange={(e) => setCurrentProfile({...currentProfile, primaryColor: e.target.value})}
                            className="rounded-l-none w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex">
                          <div 
                            className="w-10 h-10 rounded-l-md border-y border-l" 
                            style={{backgroundColor: currentProfile.secondaryColor}}
                          ></div>
                          <Input 
                            id="secondary-color" 
                            value={currentProfile.secondaryColor} 
                            onChange={(e) => setCurrentProfile({...currentProfile, secondaryColor: e.target.value})}
                            className="rounded-l-none w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex">
                          <div 
                            className="w-10 h-10 rounded-l-md border-y border-l" 
                            style={{backgroundColor: currentProfile.accentColor}}
                          ></div>
                          <Input 
                            id="accent-color" 
                            value={currentProfile.accentColor} 
                            onChange={(e) => setCurrentProfile({...currentProfile, accentColor: e.target.value})}
                            className="rounded-l-none w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Typography */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Typography</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heading-font">Heading Font</Label>
                        <Input 
                          id="heading-font" 
                          value={currentProfile.headingFont} 
                          onChange={(e) => setCurrentProfile({...currentProfile, headingFont: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="body-font">Body Font</Label>
                        <Input 
                          id="body-font" 
                          value={currentProfile.primaryFont} 
                          onChange={(e) => setCurrentProfile({...currentProfile, primaryFont: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <div className="space-x-2">
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="apply-branding">
          <Card>
            <CardHeader>
              <CardTitle>Apply Brand to PLR Content</CardTitle>
              <CardDescription>
                Select files and apply your brand elements to them in one click
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Select Brand Profile</h3>
                  <div>
                    <Label htmlFor="profile-select" className="sr-only">Select Profile</Label>
                    <select 
                      id="profile-select" 
                      className="border rounded-md py-2 px-4 bg-transparent text-sm"
                    >
                      {brandProfiles.map(profile => (
                        <option key={profile.id} value={profile.id}>{profile.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Upload PLR Files</h3>
                  <div className="border-2 border-dashed rounded-lg p-10 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports DOCX, PDF, PPTX, JPG, PNG</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Branding Options</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="apply-colors" className="rounded" defaultChecked />
                      <Label htmlFor="apply-colors">Apply Colors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="apply-fonts" className="rounded" defaultChecked />
                      <Label htmlFor="apply-fonts">Apply Fonts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="apply-logo" className="rounded" defaultChecked />
                      <Label htmlFor="apply-logo">Add Logo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="apply-footer" className="rounded" defaultChecked />
                      <Label htmlFor="apply-footer">Add Footer</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => {
                toast({
                  title: "Branding Applied!",
                  description: "Your branding has been applied to the selected files.",
                });
              }}>
                <Palette className="mr-2 h-4 w-4" />
                Apply Branding
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Branding Templates</CardTitle>
              <CardDescription>Create and manage templates for headers, footers, and watermarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Header Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Add Header Template</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Footer Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Add Footer Template</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Watermark Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Add Watermark Template</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Templates help you apply consistent branded elements across all your PLR content.
                    Create templates for different content types and apply them with one click.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Brand Kit Settings</CardTitle>
              <CardDescription>Configure your branding preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Default Brand Profile</h3>
                  <select className="border rounded-md py-2 px-4 bg-transparent w-full text-sm">
                    {brandProfiles.map(profile => (
                      <option key={profile.id} value={profile.id}>{profile.name}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Auto-Apply Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-apply-upload" className="rounded" />
                      <Label htmlFor="auto-apply-upload">Auto-apply branding on upload</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="ask-before-replace" className="rounded" defaultChecked />
                      <Label htmlFor="ask-before-replace">Ask before replacing existing branding</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">File Handling</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="keep-original" className="rounded" defaultChecked />
                      <Label htmlFor="keep-original">Keep original files</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-organize" className="rounded" defaultChecked />
                      <Label htmlFor="auto-organize">Auto-organize branded files</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Your brand kit settings have been updated.",
                });
              }}>
                <Check className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

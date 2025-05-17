
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Globe, Mail, Shield, Database, Upload, Clock, BellRing } from 'lucide-react';

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  tagline: z.string().optional(),
  adminEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  timeZone: z.string(),
  dateFormat: z.string(),
});

const SystemSettings = () => {
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "PLR Organizer Pro",
      tagline: "Organize and manage your PLR content efficiently",
      adminEmail: "admin@plrorganizer.com",
      timeZone: "UTC",
      dateFormat: "MM/DD/YYYY",
    },
  });

  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    console.log(values);
    // Save to Supabase or state management
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Configure system-wide settings for your PLR Organizer application.</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Storage</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your PLR Organizer application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-8">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="PLR Organizer Pro" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed in the header and browser tab.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input placeholder="Organize and manage your PLR content efficiently" {...field} />
                        </FormControl>
                        <FormDescription>
                          A short description of your application.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="adminEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="admin@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          System notifications will be sent to this email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Zone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                              <SelectItem value="Europe/London">London (GMT)</SelectItem>
                              <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Set the default time zone for the application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                              <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                              <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose how dates will be displayed throughout the application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Put the site in maintenance mode, showing a custom message to visitors.
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div>
                    <FormLabel>Custom Logo</FormLabel>
                    <div className="mt-2 flex items-center gap-4">
                      <img 
                        src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
                        alt="Current logo" 
                        className="h-10" 
                      />
                      <Button variant="outline" type="button">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Logo
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended size: 200x60 pixels. Max file size: 2MB.
                    </p>
                  </div>
                  
                  <Button type="submit">Save General Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email settings for system notifications and user communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel>From Name</FormLabel>
                  <Input placeholder="PLR Organizer Pro" defaultValue="PLR Organizer Pro" />
                  <p className="text-sm text-muted-foreground">
                    Name shown in the From field of emails.
                  </p>
                </div>
                <div className="space-y-2">
                  <FormLabel>From Email</FormLabel>
                  <Input placeholder="no-reply@plrorganizer.com" defaultValue="no-reply@plrorganizer.com" type="email" />
                  <p className="text-sm text-muted-foreground">
                    Email address used for sending emails.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Email Template</FormLabel>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="branded">Branded</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose a template for system emails.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for user registrations, new content uploads, etc.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button>Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts.
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Require email verification for new accounts.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Session Timeout</FormLabel>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Select session timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="6h">6 hours</SelectItem>
                      <SelectItem value="12h">12 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How long users stay logged in before requiring re-authentication.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Policy</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Strong Password Requirements</p>
                    <p className="text-sm text-muted-foreground">
                      Require passwords with minimum length, special characters, numbers, etc.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Minimum Password Length</FormLabel>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="10">10 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                      <SelectItem value="16">16 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>
                Configure storage settings for files and media.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Storage Usage</FormLabel>
                  <Badge variant="outline">
                    2.4 GB / 10 GB
                  </Badge>
                </div>
                <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '24%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  24% of your storage quota used.
                </p>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Default Upload Location</FormLabel>
                <Select defaultValue="plr">
                  <SelectTrigger>
                    <SelectValue placeholder="Select bucket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plr">PLR Content</SelectItem>
                    <SelectItem value="blog">Blog Assets</SelectItem>
                    <SelectItem value="users">User Uploads</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Default storage location for uploaded files.
                </p>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Maximum File Size</FormLabel>
                <Select defaultValue="50">
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 MB</SelectItem>
                    <SelectItem value="25">25 MB</SelectItem>
                    <SelectItem value="50">50 MB</SelectItem>
                    <SelectItem value="100">100 MB</SelectItem>
                    <SelectItem value="250">250 MB</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Maximum file size for uploads.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">File Versioning</p>
                  <p className="text-sm text-muted-foreground">
                    Keep previous versions of files when they are updated.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button>Save Storage Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
              <CardDescription>
                Configure external API integrations for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">OpenAI Integration</h3>
                <div className="space-y-2">
                  <FormLabel>API Key</FormLabel>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="sk-•••••••••••••••••••••••••••••••" className="flex-1" />
                    <Button variant="outline">Reveal</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used for AI-powered content generation.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Enable AI Features</p>
                    <p className="text-sm text-muted-foreground">
                      Use AI for content categorization and tagging.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Gateway</h3>
                <div className="space-y-2">
                  <FormLabel>Stripe Secret Key</FormLabel>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="sk_test_•••••••••••••••••••••••••••••••" className="flex-1" />
                    <Button variant="outline">Reveal</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <FormLabel>Stripe Publishable Key</FormLabel>
                  <Input defaultValue="pk_test_51N3ghdJ02hd93hdHGE92hd038hdh29hdJHH8333s" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Test Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Use test environment for payment processing.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button>Save API Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure notification preferences for the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Notifications</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New User Registrations</p>
                    <p className="text-sm text-muted-foreground">
                      Show notifications when new users register.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Content Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for new PLR content additions.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for system errors and warnings.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">License Expirations</p>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for upcoming PLR license expirations.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Receive daily email summaries of activity.
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Important Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for critical system alerts.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;

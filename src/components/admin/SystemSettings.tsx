
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Save, RefreshCw, ShieldAlert, Mail, Database, Cloud, Server, Key, Globe, Upload, Clock } from 'lucide-react';

const SystemSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved successfully",
        description: "Your system settings have been updated.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Manage your application settings and configuration.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Configure basic information about your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" placeholder="PLR Organizer Pro" defaultValue="PLR Organizer Pro" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" placeholder="Organize your PLR content efficiently" defaultValue="Organize your PLR content efficiently" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email Address</Label>
                <Input id="admin-email" type="email" placeholder="admin@plrorganizer.com" defaultValue="admin@plrorganizer.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded border flex items-center justify-center bg-background">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended size: 200x200px. Max file size: 2MB.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                Enable maintenance mode to prevent users from accessing the application during updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, users will see a maintenance page instead of the application.
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
              
              {maintenanceMode && (
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Maintenance Message</Label>
                  <Textarea
                    id="maintenance-message"
                    placeholder="We're currently performing scheduled maintenance. Please check back in a few hours."
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email sending settings for the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-provider">Email Provider</Label>
                <Select defaultValue="smtp">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="ses">Amazon SES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email Address</Label>
                <Input id="from-email" type="email" placeholder="noreply@plrorganizer.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply-to-email">Reply-To Email Address</Label>
                <Input id="reply-to-email" type="email" placeholder="support@plrorganizer.com" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" placeholder="smtp.example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" placeholder="username" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" placeholder="••••••••••••" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="smtp-secure" defaultChecked />
                <Label htmlFor="smtp-secure">Use Secure Connection (TLS)</Label>
              </div>
              
              <div className="pt-4">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize email templates sent by the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Templates</Label>
                <Select defaultValue="welcome">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="password-reset">Password Reset</SelectItem>
                    <SelectItem value="email-verification">Email Verification</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="template-subject">Email Subject</Label>
                <Input id="template-subject" placeholder="Welcome to PLR Organizer Pro!" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-content">Email Content</Label>
                <Textarea
                  id="template-content"
                  placeholder="Hello {{name}}, Welcome to PLR Organizer Pro..."
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Available variables: <Badge variant="outline">{`{{name}}`}</Badge>, <Badge variant="outline">{`{{email}}`}</Badge>, <Badge variant="outline">{`{{link}}`}</Badge>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                Preview
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Template
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Configure external API connections and services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Key className="mr-2 h-4 w-4 text-primary" />
                    API Keys
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage API keys for connecting to external services.
                  </p>
                </div>
                
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                    <Input id="openai-api-key" type="password" placeholder="••••••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sendgrid-api-key">SendGrid API Key</Label>
                    <Input id="sendgrid-api-key" type="password" placeholder="••••••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                    <Input id="stripe-api-key" type="password" placeholder="••••••••••••" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-primary" />
                    Webhooks
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure webhooks to notify external services of events.
                  </p>
                </div>
                
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://example.com/webhook" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Webhook Events</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-event-user-created" />
                        <Label htmlFor="webhook-event-user-created">User Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-event-user-updated" />
                        <Label htmlFor="webhook-event-user-updated">User Updated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-event-plr-created" />
                        <Label htmlFor="webhook-event-plr-created">PLR Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-event-plr-updated" />
                        <Label htmlFor="webhook-event-plr-updated">PLR Updated</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Configuration</CardTitle>
              <CardDescription>
                Manage storage settings for files and PLR content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Cloud className="mr-2 h-4 w-4 text-primary" />
                    Storage Provider
                  </h4>
                </div>
                
                <div className="space-y-2">
                  <Select defaultValue="supabase">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a storage provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supabase">Supabase Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">File Limits</h4>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allowed-file-types">Allowed File Types</Label>
                  <Input id="allowed-file-types" placeholder="pdf,docx,txt,jpg,png" defaultValue="pdf,docx,txt,jpg,png" />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of file extensions.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Database className="mr-2 h-4 w-4 text-primary" />
                    Storage Buckets
                  </h4>
                </div>
                
                <div className="border rounded-md">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">PLR Files</h5>
                        <p className="text-sm text-muted-foreground">
                          Storage for PLR content files
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">User Uploads</h5>
                        <p className="text-sm text-muted-foreground">
                          Storage for user uploaded files
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">System Files</h5>
                        <p className="text-sm text-muted-foreground">
                          Storage for system files and backups
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">
                  <Cloud className="mr-2 h-4 w-4" />
                  Add New Bucket
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security settings for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Password Policy</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="min-password-length">Minimum Password Length</Label>
                    <Input
                      id="min-password-length"
                      type="number"
                      defaultValue="8"
                      className="w-20"
                      min="6"
                      max="32"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-uppercase" defaultChecked />
                    <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-numbers" defaultChecked />
                    <Label htmlFor="require-numbers">Require Numbers</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-special-chars" defaultChecked />
                    <Label htmlFor="require-special-chars">Require Special Characters</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                </div>
                
                <div className="space-y-2">
                  <Label>2FA Enforcement</Label>
                  <Select defaultValue="optional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select 2FA policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled for All Users</SelectItem>
                      <SelectItem value="optional">Optional for All Users</SelectItem>
                      <SelectItem value="admin-required">Required for Admins Only</SelectItem>
                      <SelectItem value="all-required">Required for All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>2FA Methods</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="2fa-authenticator-app" defaultChecked />
                      <Label htmlFor="2fa-authenticator-app">Authenticator App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="2fa-sms" defaultChecked />
                      <Label htmlFor="2fa-sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="2fa-email" defaultChecked />
                      <Label htmlFor="2fa-email">Email</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Session Settings</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      defaultValue="60"
                      className="w-24"
                      min="5"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="enforce-single-session" />
                    <Label htmlFor="enforce-single-session">Enforce Single Session Per User</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="log-login-attempts" defaultChecked />
                    <Label htmlFor="log-login-attempts">Log Failed Login Attempts</Label>
                  </div>
                </div>
              </div>
              
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/30">
                <AlertDescription className="text-sm">
                  <strong>Security Notice:</strong> Changes to security settings may affect all users and require them to re-authenticate.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;

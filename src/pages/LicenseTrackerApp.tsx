import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Check, FileCheck, FilePlus, Info, Search, Shield, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface License {
  id: string;
  name: string;
  provider: string;
  type: string;
  acquiredDate: string;
  expirationDate: string | null;
  canSell: boolean;
  canEdit: boolean;
  canDistribute: boolean;
  requiresAttribution: boolean;
  usageLimitations: string;
  status: 'active' | 'expired' | 'risky';
  notes: string;
  associatedContent: string[];
}

interface LicenseType {
  id: string;
  name: string;
  defaultRights: {
    canSell: boolean;
    canEdit: boolean;
    canDistribute: boolean;
    requiresAttribution: boolean;
  };
  description: string;
}

interface Provider {
  id: string;
  name: string;
  website: string;
  licenseTypes: string[];
}

const licenseTypes: LicenseType[] = [
  {
    id: '1',
    name: 'Standard PLR',
    defaultRights: {
      canSell: true,
      canEdit: true,
      canDistribute: true,
      requiresAttribution: false
    },
    description: 'Typical PLR license allowing editing and resale with minimal restrictions.'
  },
  {
    id: '2',
    name: 'Limited PLR',
    defaultRights: {
      canSell: true,
      canEdit: true,
      canDistribute: false,
      requiresAttribution: true
    },
    description: 'Limited distribution rights, often restricting the number of uses or requiring attribution.'
  },
  {
    id: '3',
    name: 'MRR (Master Resale Rights)',
    defaultRights: {
      canSell: true,
      canEdit: false,
      canDistribute: true,
      requiresAttribution: false
    },
    description: 'Can be resold as-is, but typically cannot be edited or modified.'
  },
  {
    id: '4',
    name: 'RR (Resale Rights)',
    defaultRights: {
      canSell: true,
      canEdit: false,
      canDistribute: false,
      requiresAttribution: false
    },
    description: 'Can be resold as-is to end users only, not to other resellers.'
  },
  {
    id: '5',
    name: 'Personal Use',
    defaultRights: {
      canSell: false,
      canEdit: true,
      canDistribute: false,
      requiresAttribution: true
    },
    description: 'Can only be used for personal projects, cannot be sold or distributed.'
  }
];

const providers: Provider[] = [
  { id: '1', name: 'PLR.me', website: 'https://plr.me', licenseTypes: ['1', '2'] },
  { id: '2', name: 'IDPLR', website: 'https://idplr.com', licenseTypes: ['1', '3', '4'] },
  { id: '3', name: 'PLR Rights', website: 'https://plrrights.com', licenseTypes: ['1', '2', '5'] },
  { id: '4', name: 'BuyQualityPLR', website: 'https://buyqualityplr.com', licenseTypes: ['1', '3'] },
  { id: '5', name: 'Other/Custom', website: '', licenseTypes: ['1', '2', '3', '4', '5'] }
];

// Sample demo data
const demoLicenses: License[] = [
  {
    id: '1',
    name: 'Health & Wellness PLR Bundle',
    provider: 'PLR.me',
    type: 'Standard PLR',
    acquiredDate: '2023-02-15',
    expirationDate: null,
    canSell: true,
    canEdit: true,
    canDistribute: true,
    requiresAttribution: false,
    usageLimitations: 'Cannot be sold on mass market sites like Fiverr or UpWork',
    status: 'active',
    notes: 'Includes 25 articles and 5 ebooks',
    associatedContent: ['Health Ebook 1', 'Yoga Article Series']
  },
  {
    id: '2',
    name: 'Business Coaching PLR',
    provider: 'IDPLR',
    type: 'Limited PLR',
    acquiredDate: '2023-05-22',
    expirationDate: '2024-05-22',
    canSell: true,
    canEdit: true,
    canDistribute: false,
    requiresAttribution: true,
    usageLimitations: 'Maximum 3 websites, no membership sites',
    status: 'active',
    notes: 'Renew by May 2024',
    associatedContent: ['Business Plan Template', 'Coaching Worksheet']
  },
  {
    id: '3',
    name: 'Recipe Collection',
    provider: 'BuyQualityPLR',
    type: 'MRR (Master Resale Rights)',
    acquiredDate: '2022-11-05',
    expirationDate: null,
    canSell: true,
    canEdit: false,
    canDistribute: true,
    requiresAttribution: false,
    usageLimitations: 'Cannot modify content, must sell at minimum $7',
    status: 'active',
    notes: 'Contains 100+ recipes with images',
    associatedContent: ['Recipe Ebook Volume 1', 'Recipe Ebook Volume 2']
  },
  {
    id: '4',
    name: 'Financial Planning Templates',
    provider: 'PLR Rights',
    type: 'RR (Resale Rights)',
    acquiredDate: '2023-09-10',
    expirationDate: '2023-09-10',
    canSell: true,
    canEdit: false,
    canDistribute: false,
    requiresAttribution: false,
    usageLimitations: 'Can only sell to end users',
    status: 'expired',
    notes: 'Need to renew or stop using',
    associatedContent: ['Budget Planner', 'Investment Tracker']
  },
  {
    id: '5',
    name: 'Social Media Graphics Pack',
    provider: 'Other/Custom',
    type: 'Personal Use',
    acquiredDate: '2024-01-03',
    expirationDate: null,
    canSell: false,
    canEdit: true,
    canDistribute: false,
    requiresAttribution: true,
    usageLimitations: 'For client work only, attribution required',
    status: 'risky',
    notes: 'Need to clarify client usage terms',
    associatedContent: ['Instagram Templates', 'Facebook Cover Images']
  }
];

export default function LicenseTrackerApp() {
  const [licenses, setLicenses] = useState<License[]>(demoLicenses);
  const [isAddingLicense, setIsAddingLicense] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentTab, setCurrentTab] = useState('all');
  
  // New license form state
  const [newLicense, setNewLicense] = useState<Omit<License, 'id' | 'status'>>({
    name: '',
    provider: '',
    type: '',
    acquiredDate: format(new Date(), 'yyyy-MM-dd'),
    expirationDate: null,
    canSell: true,
    canEdit: true,
    canDistribute: true,
    requiresAttribution: false,
    usageLimitations: '',
    notes: '',
    associatedContent: []
  });

  // Handle selected license type change
  const handleLicenseTypeChange = (typeId: string) => {
    const selectedType = licenseTypes.find(type => type.id === typeId);
    if (selectedType) {
      setNewLicense(prev => ({
        ...prev,
        type: selectedType.name,
        canSell: selectedType.defaultRights.canSell,
        canEdit: selectedType.defaultRights.canEdit,
        canDistribute: selectedType.defaultRights.canDistribute,
        requiresAttribution: selectedType.defaultRights.requiresAttribution
      }));
    }
  };

  // Handle provider change
  const handleProviderChange = (providerId: string) => {
    const selectedProvider = providers.find(p => p.id === providerId);
    if (selectedProvider) {
      setNewLicense(prev => ({
        ...prev,
        provider: selectedProvider.name
      }));
    }
  };

  // Add a new license
  const handleAddLicense = async () => {
    if (!newLicense.name || !newLicense.provider || !newLicense.type) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real app, we'd save to the database
      // For demo, we'll just add to the local state
      const today = new Date();
      const expirationDate = newLicense.expirationDate ? new Date(newLicense.expirationDate) : null;
      
      let status: 'active' | 'expired' | 'risky' = 'active';
      if (expirationDate && expirationDate < today) {
        status = 'expired';
      } else if (expirationDate && 
                ((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 30) {
        status = 'risky';
      }

      const license: License = {
        id: Math.random().toString(36).substring(2, 11),
        ...newLicense,
        status
      };

      setLicenses(prev => [license, ...prev]);
      setIsAddingLicense(false);
      
      // Reset form
      setNewLicense({
        name: '',
        provider: '',
        type: '',
        acquiredDate: format(new Date(), 'yyyy-MM-dd'),
        expirationDate: null,
        canSell: true,
        canEdit: true,
        canDistribute: true,
        requiresAttribution: false,
        usageLimitations: '',
        notes: '',
        associatedContent: []
      });

      toast({
        title: "License added",
        description: "The license has been successfully added to your tracker.",
      });
    } catch (error) {
      console.error('Error adding license:', error);
      toast({
        title: "Failed to add license",
        description: "There was an error adding the license. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter licenses based on search term and filter status
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          license.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          license.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'active' && license.status === 'active') return matchesSearch;
    if (currentTab === 'expired' && license.status === 'expired') return matchesSearch;
    if (currentTab === 'risky' && license.status === 'risky') return matchesSearch;
    
    return false;
  });

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'risky':
        return <Badge className="bg-amber-500">Expiring Soon</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>License Tracker Tool | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Track and manage your PLR license details, usage rights, and expiration dates to avoid copyright issues." 
        />
      </Helmet>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">License Tracker</h1>
          <p className="text-muted-foreground">
            Track PLR licenses, usage rights, and expiration dates to avoid copyright issues
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* License Management Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search licenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Dialog open={isAddingLicense} onOpenChange={setIsAddingLicense}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <FilePlus className="h-4 w-4" />
                      Add New License
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New PLR License</DialogTitle>
                      <DialogDescription>
                        Track the usage rights and details of your PLR content
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">License Name *</Label>
                          <Input 
                            id="name" 
                            value={newLicense.name} 
                            onChange={(e) => setNewLicense({...newLicense, name: e.target.value})} 
                            placeholder="e.g., Health PLR Bundle"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider">Provider *</Label>
                          <Select onValueChange={handleProviderChange}>
                            <SelectTrigger id="provider">
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              {providers.map(provider => (
                                <SelectItem key={provider.id} value={provider.id}>
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseType">License Type *</Label>
                          <Select onValueChange={handleLicenseTypeChange}>
                            <SelectTrigger id="licenseType">
                              <SelectValue placeholder="Select license type" />
                            </SelectTrigger>
                            <SelectContent>
                              {licenseTypes.map(type => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="acquiredDate">Date Acquired</Label>
                          <Input 
                            id="acquiredDate" 
                            type="date" 
                            value={newLicense.acquiredDate} 
                            onChange={(e) => setNewLicense({...newLicense, acquiredDate: e.target.value})} 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expirationDate">Expiration Date (if any)</Label>
                          <Input 
                            id="expirationDate" 
                            type="date" 
                            value={newLicense.expirationDate || ''} 
                            onChange={(e) => setNewLicense({...newLicense, expirationDate: e.target.value || null})} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Usage Rights</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="canSell" 
                              checked={newLicense.canSell} 
                              onCheckedChange={(checked) => setNewLicense({...newLicense, canSell: checked === true})} 
                            />
                            <Label htmlFor="canSell" className="text-sm font-normal">Can Sell/Resell</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="canEdit" 
                              checked={newLicense.canEdit} 
                              onCheckedChange={(checked) => setNewLicense({...newLicense, canEdit: checked === true})} 
                            />
                            <Label htmlFor="canEdit" className="text-sm font-normal">Can Edit/Modify</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="canDistribute" 
                              checked={newLicense.canDistribute} 
                              onCheckedChange={(checked) => setNewLicense({...newLicense, canDistribute: checked === true})} 
                            />
                            <Label htmlFor="canDistribute" className="text-sm font-normal">Can Distribute</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="requiresAttribution" 
                              checked={newLicense.requiresAttribution} 
                              onCheckedChange={(checked) => setNewLicense({...newLicense, requiresAttribution: checked === true})} 
                            />
                            <Label htmlFor="requiresAttribution" className="text-sm font-normal">Requires Attribution</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="usageLimitations">Usage Limitations</Label>
                        <Textarea 
                          id="usageLimitations" 
                          placeholder="Any special restrictions or limitations..." 
                          value={newLicense.usageLimitations} 
                          onChange={(e) => setNewLicense({...newLicense, usageLimitations: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Additional notes about this license..." 
                          value={newLicense.notes} 
                          onChange={(e) => setNewLicense({...newLicense, notes: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingLicense(false)}>Cancel</Button>
                      <Button onClick={handleAddLicense}>Save License</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          {/* License List */}
          <Card>
            <CardHeader>
              <CardTitle>Your PLR Licenses</CardTitle>
              <CardDescription>Manage and track all your PLR content licenses</CardDescription>
              
              <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mt-2">
                <TabsList>
                  <TabsTrigger value="all">All Licenses</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="risky">Expiring Soon</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {filteredLicenses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">No licenses found</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Add your first PLR license to start tracking</p>
                  <Button variant="outline" onClick={() => setIsAddingLicense(true)}>Add License</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLicenses.map((license) => (
                    <Card key={license.id} className={`border ${
                      license.status === 'expired' ? 'border-red-300' : 
                      license.status === 'risky' ? 'border-amber-300' : ''
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{license.name}</CardTitle>
                            <CardDescription>{license.provider} • {license.type}</CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(license.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <div>
                            <span className="text-sm font-medium">Acquired:</span> {license.acquiredDate}
                            {license.expirationDate && (
                              <div>
                                <span className="text-sm font-medium">Expires:</span> {license.expirationDate}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                              <div className="flex items-center">
                                {license.canSell ? 
                                  <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-1" />}
                                <span className="text-xs">Can Sell</span>
                              </div>
                              <div className="flex items-center">
                                {license.canEdit ? 
                                  <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-1" />}
                                <span className="text-xs">Can Edit</span>
                              </div>
                              <div className="flex items-center">
                                {license.canDistribute ? 
                                  <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-1" />}
                                <span className="text-xs">Can Distribute</span>
                              </div>
                              <div className="flex items-center">
                                {license.requiresAttribution ? 
                                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" /> : 
                                  <Check className="h-4 w-4 text-green-500 mr-1" />}
                                <span className="text-xs">
                                  {license.requiresAttribution ? 'Attribution Required' : 'No Attribution Needed'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {license.usageLimitations && (
                          <div className="mt-2">
                            <span className="text-sm font-medium">Limitations:</span> {license.usageLimitations}
                          </div>
                        )}
                        
                        {license.associatedContent.length > 0 && (
                          <div className="mt-2">
                            <span className="text-sm font-medium">Associated Content:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {license.associatedContent.map((content, index) => (
                                <Badge key={index} variant="outline" className="text-xs">{content}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end pt-0">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileCheck className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredLicenses.length} of {licenses.length} licenses
              </div>
              <Button variant="outline" size="sm">
                Export License Report
              </Button>
            </CardFooter>
          </Card>
          
          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                License Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>License Risk Summary</AlertTitle>
                <AlertDescription>
                  Based on your current licenses, you have:
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center">
                      <Badge className="bg-red-500 mr-2">{licenses.filter(l => l.status === 'expired').length}</Badge>
                      Expired licenses that need immediate attention
                    </li>
                    <li className="flex items-center">
                      <Badge className="bg-amber-500 mr-2">{licenses.filter(l => l.status === 'risky').length}</Badge>
                      Licenses expiring soon that need review
                    </li>
                    <li className="flex items-center">
                      <Badge className="bg-green-500 mr-2">{licenses.filter(l => l.status === 'active').length}</Badge>
                      Active licenses in good standing
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

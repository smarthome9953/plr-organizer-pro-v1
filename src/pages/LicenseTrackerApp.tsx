import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Check, FileCheck, FilePlus, Info, Search, Shield, X, Loader2, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { useLicenses, License, LicenseInsert } from '@/hooks/useLicenses';

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
    defaultRights: { canSell: true, canEdit: true, canDistribute: true, requiresAttribution: false },
    description: 'Typical PLR license allowing editing and resale with minimal restrictions.'
  },
  {
    id: '2',
    name: 'Limited PLR',
    defaultRights: { canSell: true, canEdit: true, canDistribute: false, requiresAttribution: true },
    description: 'Limited distribution rights, often restricting the number of uses or requiring attribution.'
  },
  {
    id: '3',
    name: 'MRR (Master Resale Rights)',
    defaultRights: { canSell: true, canEdit: false, canDistribute: true, requiresAttribution: false },
    description: 'Can be resold as-is, but typically cannot be edited or modified.'
  },
  {
    id: '4',
    name: 'RR (Resale Rights)',
    defaultRights: { canSell: true, canEdit: false, canDistribute: false, requiresAttribution: false },
    description: 'Can be resold as-is to end users only, not to other resellers.'
  },
  {
    id: '5',
    name: 'Personal Use',
    defaultRights: { canSell: false, canEdit: true, canDistribute: false, requiresAttribution: true },
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

export default function LicenseTrackerApp() {
  const { licenses, isLoading, addLicense, updateLicense, deleteLicense } = useLicenses();
  const [isAddingLicense, setIsAddingLicense] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const [newLicense, setNewLicense] = useState<LicenseInsert>({
    name: '',
    provider: '',
    type: '',
    acquired_date: format(new Date(), 'yyyy-MM-dd'),
    expiration_date: null,
    can_sell: true,
    can_edit: true,
    can_distribute: true,
    requires_attribution: false,
    usage_limitations: '',
    notes: '',
    associated_content: []
  });

  const handleLicenseTypeChange = (typeId: string) => {
    const selectedType = licenseTypes.find(type => type.id === typeId);
    if (selectedType) {
      setNewLicense(prev => ({
        ...prev,
        type: selectedType.name,
        can_sell: selectedType.defaultRights.canSell,
        can_edit: selectedType.defaultRights.canEdit,
        can_distribute: selectedType.defaultRights.canDistribute,
        requires_attribution: selectedType.defaultRights.requiresAttribution
      }));
    }
  };

  const handleProviderChange = (providerId: string) => {
    const selectedProvider = providers.find(p => p.id === providerId);
    if (selectedProvider) {
      setNewLicense(prev => ({ ...prev, provider: selectedProvider.name }));
    }
  };

  const handleAddLicense = async () => {
    if (!newLicense.name || !newLicense.provider || !newLicense.type) return;
    
    const result = await addLicense(newLicense);
    if (result) {
      setIsAddingLicense(false);
      setNewLicense({
        name: '', provider: '', type: '',
        acquired_date: format(new Date(), 'yyyy-MM-dd'),
        expiration_date: null, can_sell: true, can_edit: true,
        can_distribute: true, requires_attribution: false,
        usage_limitations: '', notes: '', associated_content: []
      });
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500">Active</Badge>;
      case 'expired': return <Badge variant="destructive">Expired</Badge>;
      case 'risky': return <Badge className="bg-amber-500">Expiring Soon</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
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
        <title>License Tracker Tool | PLR Organizer Pro</title>
        <meta name="description" content="Track and manage your PLR license details, usage rights, and expiration dates." />
      </Helmet>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">License Tracker</h1>
          <p className="text-muted-foreground">Track PLR licenses, usage rights, and expiration dates</p>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search licenses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <Dialog open={isAddingLicense} onOpenChange={setIsAddingLicense}>
                  <DialogTrigger asChild>
                    <Button className="gap-2"><FilePlus className="h-4 w-4" />Add New License</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New PLR License</DialogTitle>
                      <DialogDescription>Track the usage rights and details of your PLR content</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">License Name *</Label>
                          <Input id="name" value={newLicense.name} onChange={(e) => setNewLicense({...newLicense, name: e.target.value})} placeholder="e.g., Health PLR Bundle" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider">Provider *</Label>
                          <Select onValueChange={handleProviderChange}>
                            <SelectTrigger><SelectValue placeholder="Select provider" /></SelectTrigger>
                            <SelectContent>
                              {providers.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>License Type *</Label>
                          <Select onValueChange={handleLicenseTypeChange}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                              {licenseTypes.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Date Acquired</Label>
                          <Input type="date" value={newLicense.acquired_date} onChange={(e) => setNewLicense({...newLicense, acquired_date: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Expiration Date (if any)</Label>
                        <Input type="date" value={newLicense.expiration_date || ''} onChange={(e) => setNewLicense({...newLicense, expiration_date: e.target.value || null})} />
                      </div>
                      <div>
                        <Label>Usage Rights</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="canSell" checked={newLicense.can_sell} onCheckedChange={(c) => setNewLicense({...newLicense, can_sell: c === true})} />
                            <Label htmlFor="canSell" className="text-sm font-normal">Can Sell/Resell</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="canEdit" checked={newLicense.can_edit} onCheckedChange={(c) => setNewLicense({...newLicense, can_edit: c === true})} />
                            <Label htmlFor="canEdit" className="text-sm font-normal">Can Edit/Modify</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="canDistribute" checked={newLicense.can_distribute} onCheckedChange={(c) => setNewLicense({...newLicense, can_distribute: c === true})} />
                            <Label htmlFor="canDistribute" className="text-sm font-normal">Can Distribute</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="attribution" checked={newLicense.requires_attribution} onCheckedChange={(c) => setNewLicense({...newLicense, requires_attribution: c === true})} />
                            <Label htmlFor="attribution" className="text-sm font-normal">Requires Attribution</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Usage Limitations</Label>
                        <Textarea value={newLicense.usage_limitations || ''} onChange={(e) => setNewLicense({...newLicense, usage_limitations: e.target.value})} placeholder="Any specific restrictions..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea value={newLicense.notes || ''} onChange={(e) => setNewLicense({...newLicense, notes: e.target.value})} placeholder="Additional notes..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingLicense(false)}>Cancel</Button>
                      <Button onClick={handleAddLicense} disabled={!newLicense.name || !newLicense.provider || !newLicense.type}>Add License</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="all">All ({licenses.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({licenses.filter(l => l.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="risky">Expiring Soon ({licenses.filter(l => l.status === 'risky').length})</TabsTrigger>
              <TabsTrigger value="expired">Expired ({licenses.filter(l => l.status === 'expired').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} className="mt-4">
              {filteredLicenses.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Licenses Found</h3>
                    <p className="text-muted-foreground mb-4">Add your first PLR license to start tracking.</p>
                    <Button onClick={() => setIsAddingLicense(true)}><FilePlus className="mr-2 h-4 w-4" />Add License</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredLicenses.map((license) => (
                    <Card key={license.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{license.name}</h3>
                              {getStatusBadge(license.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{license.provider} • {license.type}</p>
                            <div className="flex flex-wrap gap-2">
                              {license.can_sell && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />Can Sell</Badge>}
                              {license.can_edit && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />Can Edit</Badge>}
                              {license.can_distribute && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />Can Distribute</Badge>}
                              {license.requires_attribution && <Badge variant="secondary"><Info className="h-3 w-3 mr-1" />Attribution Required</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right text-sm text-muted-foreground">
                              <p>Acquired: {format(new Date(license.acquired_date), 'MMM d, yyyy')}</p>
                              {license.expiration_date && <p>Expires: {format(new Date(license.expiration_date), 'MMM d, yyyy')}</p>}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteLicense(license.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        {license.usage_limitations && (
                          <Alert className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Usage Limitations</AlertTitle>
                            <AlertDescription>{license.usage_limitations}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

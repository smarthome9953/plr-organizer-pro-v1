
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCheck, AlertTriangle, CheckCircle, XCircle, Filter, Download, Plus, Search, Share2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";

interface ToolStatus {
  id: string;
  name: string;
  path: string;
  function: string;
  functionality: 'working' | 'partial' | 'not-working';
  dataStatus: 'real' | 'mock' | 'none';
  issues: string[];
  severity: 'critical' | 'major' | 'minor' | 'none';
  notes: string;
  verified: boolean;
}

export default function ToolVerificationPage() {
  const [selectedTab, setSelectedTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dataFilter, setDataFilter] = useState<string[]>([]);
  const [severityFilter, setStatusFilter2] = useState<string[]>([]);
  
  // Sample tool verification data
  const [tools, setTools] = useState<ToolStatus[]>([
    {
      id: "dashboard-overview",
      name: "Dashboard Overview",
      path: "/",
      function: "Provides a central hub showing key metrics, recent activity, and quick actions for PLR content management",
      functionality: "partial",
      dataStatus: "mock",
      issues: ["Some metrics display mock data instead of real production data", "Quick Actions links not all functional"],
      severity: "minor",
      notes: "Currently shows static data for demonstration purposes",
      verified: true
    },
    {
      id: "plr-library",
      name: "PLR Library",
      path: "/plr-library",
      function: "Allows users to browse, filter, and manage their PLR content collection",
      functionality: "working",
      dataStatus: "real",
      issues: [],
      severity: "none",
      notes: "Content filtering and search working as expected",
      verified: true
    },
    {
      id: "blog-management",
      name: "Blog Management",
      path: "/blog-management",
      function: "Enables creating, editing, and organizing blog posts created from PLR content",
      functionality: "working",
      dataStatus: "real",
      issues: [],
      severity: "none",
      notes: "All blog functionality verified with production data",
      verified: true
    },
    {
      id: "plr-scanner",
      name: "PLR Scanner",
      path: "/scan",
      function: "Scans user's computer for PLR content and organizes it efficiently",
      functionality: "partial",
      dataStatus: "real",
      issues: ["Scanner progress indicator sometimes stalls at 80%"],
      severity: "major",
      notes: "Core scanning functionality works but has UI issues with progress indication",
      verified: true
    },
    {
      id: "html-editor",
      name: "HTML Editor Tool",
      path: "/html-editor",
      function: "Creates and formats website content without coding skills using WYSIWYG interface",
      functionality: "working",
      dataStatus: "none",
      issues: ["No previous saved templates are shown"],
      severity: "minor",
      notes: "Editor works properly but needs to pull real template data from production",
      verified: true
    },
    {
      id: "batch-editor",
      name: "Batch Editor Tool",
      path: "/batch-editor",
      function: "Edits multiple PLR files simultaneously with find and replace functionality",
      functionality: "working",
      dataStatus: "real",
      issues: [],
      severity: "none",
      notes: "Batch processing tested with various file types and volumes",
      verified: true
    },
    {
      id: "seo-analyzer",
      name: "SEO Analyzer Tool",
      path: "/seo-analyzer",
      function: "Analyzes and optimizes PLR content for search engines",
      functionality: "partial",
      dataStatus: "mock",
      issues: ["Results appear template-based rather than generated from true analysis", "Keyword density calculation seems off"],
      severity: "major",
      notes: "Need to verify if real SEO analysis is being performed or just demo data shown",
      verified: true
    },
    {
      id: "license-tracker",
      name: "License Tracker",
      path: "/license-tracker",
      function: "Tracks PLR license details, restrictions, and expiration dates",
      functionality: "not-working",
      dataStatus: "none",
      issues: ["Page loads but no license data is displayed", "Add license form submits but data doesn't persist"],
      severity: "critical",
      notes: "Appears to have database connectivity issues with production data",
      verified: true
    },
    {
      id: "user-management",
      name: "User Management",
      path: "/admin/user-management",
      function: "Allows administrators to manage user accounts",
      functionality: "working",
      dataStatus: "real",
      issues: [],
      severity: "none",
      notes: "Admin functions tested and working with production user data",
      verified: true
    },
    {
      id: "system-settings",
      name: "System Settings",
      path: "/admin/system-settings",
      function: "Enables configuration of system-wide settings for the application",
      functionality: "working",
      dataStatus: "real",
      issues: [],
      severity: "none",
      notes: "All settings properly saved and retrieved from production database",
      verified: true
    }
  ]);
  
  const filteredTools = tools.filter(tool => {
    // Search filter
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tool.function.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter.length > 0 && !statusFilter.includes(tool.functionality)) {
      return false;
    }
    
    // Data filter
    if (dataFilter.length > 0 && !dataFilter.includes(tool.dataStatus)) {
      return false;
    }
    
    // Severity filter
    if (severityFilter.length > 0 && !severityFilter.includes(tool.severity)) {
      return false;
    }
    
    return true;
  });
  
  const handleStatusFilterChange = (value: string) => {
    if (statusFilter.includes(value)) {
      setStatusFilter(statusFilter.filter(item => item !== value));
    } else {
      setStatusFilter([...statusFilter, value]);
    }
  };
  
  const handleDataFilterChange = (value: string) => {
    if (dataFilter.includes(value)) {
      setDataFilter(dataFilter.filter(item => item !== value));
    } else {
      setDataFilter([...dataFilter, value]);
    }
  };
  
  const handleSeverityFilterChange = (value: string) => {
    if (severityFilter.includes(value)) {
      setStatusFilter2(severityFilter.filter(item => item !== value));
    } else {
      setStatusFilter2([...severityFilter, value]);
    }
  };
  
  const toggleToolVerification = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, verified: !tool.verified } : tool
    ));
  };
  
  const getStatusBadge = (status: 'working' | 'partial' | 'not-working') => {
    switch (status) {
      case 'working':
        return <Badge className="bg-green-500 hover:bg-green-600">Working</Badge>;
      case 'partial':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Partial</Badge>;
      case 'not-working':
        return <Badge className="bg-red-500 hover:bg-red-600">Not Working</Badge>;
      default:
        return null;
    }
  };
  
  const getDataStatusBadge = (status: 'real' | 'mock' | 'none') => {
    switch (status) {
      case 'real':
        return <Badge className="bg-green-500 hover:bg-green-600">Real Data</Badge>;
      case 'mock':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Mock Data</Badge>;
      case 'none':
        return <Badge className="bg-gray-500 hover:bg-gray-600">No Data</Badge>;
      default:
        return null;
    }
  };
  
  const getSeverityBadge = (severity: 'critical' | 'major' | 'minor' | 'none') => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
      case 'major':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Major</Badge>;
      case 'minor':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Minor</Badge>;
      case 'none':
        return <Badge className="bg-green-500 hover:bg-green-600">None</Badge>;
      default:
        return null;
    }
  };
  
  // Summary statistics
  const criticalIssues = tools.filter(t => t.severity === 'critical').length;
  const majorIssues = tools.filter(t => t.severity === 'major').length;
  const toolsWithMockData = tools.filter(t => t.dataStatus === 'mock').length;
  const toolsWithNoData = tools.filter(t => t.dataStatus === 'none').length;
  const workingTools = tools.filter(t => t.functionality === 'working').length;
  const partialTools = tools.filter(t => t.functionality === 'partial').length;
  const nonWorkingTools = tools.filter(t => t.functionality === 'not-working').length;
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Tool Verification | PLR Organizer Pro</title>
        <meta name="description" content="Verify the functionality and data integrity of all tools in PLR Organizer Pro" />
      </Helmet>
      
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tool Verification Assessment</h1>
            <p className="text-muted-foreground">
              Comprehensive verification of all tools in the PLR Organizer Pro platform
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {}}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Report
            </Button>
            <Button onClick={() => {}}>
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Tool Inventory</TabsTrigger>
            <TabsTrigger value="summary">Executive Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Findings</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Tool Inventory</CardTitle>
                    <CardDescription>Comprehensive list of all tools in the system</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tools..."
                        className="pl-8 w-[200px] md:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-working" 
                      checked={statusFilter.includes('working')}
                      onCheckedChange={() => handleStatusFilterChange('working')}
                    />
                    <Label htmlFor="filter-working">Working</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-partial" 
                      checked={statusFilter.includes('partial')}
                      onCheckedChange={() => handleStatusFilterChange('partial')}
                    />
                    <Label htmlFor="filter-partial">Partial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-not-working" 
                      checked={statusFilter.includes('not-working')}
                      onCheckedChange={() => handleStatusFilterChange('not-working')}
                    />
                    <Label htmlFor="filter-not-working">Not Working</Label>
                  </div>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-real-data" 
                      checked={dataFilter.includes('real')}
                      onCheckedChange={() => handleDataFilterChange('real')}
                    />
                    <Label htmlFor="filter-real-data">Real Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-mock-data" 
                      checked={dataFilter.includes('mock')}
                      onCheckedChange={() => handleDataFilterChange('mock')}
                    />
                    <Label htmlFor="filter-mock-data">Mock Data</Label>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 gap-2 bg-muted p-3 font-medium">
                    <div className="col-span-3 md:col-span-2">Tool</div>
                    <div className="col-span-5 md:col-span-4">Function</div>
                    <div className="col-span-2 hidden md:block">Location</div>
                    <div className="col-span-2 md:col-span-1">Status</div>
                    <div className="col-span-2 md:col-span-1">Data</div>
                    <div className="col-span-2">Verified</div>
                  </div>
                  
                  {filteredTools.map((tool) => (
                    <div 
                      key={tool.id} 
                      className="grid grid-cols-12 gap-2 p-3 border-t hover:bg-muted/50"
                    >
                      <div className="col-span-3 md:col-span-2 font-medium">
                        {tool.name}
                      </div>
                      <div className="col-span-5 md:col-span-4 text-muted-foreground">
                        {tool.function}
                      </div>
                      <div className="col-span-2 hidden md:block text-muted-foreground">
                        {tool.path}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        {getStatusBadge(tool.functionality)}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        {getDataStatusBadge(tool.dataStatus)}
                      </div>
                      <div className="col-span-2">
                        <Checkbox
                          checked={tool.verified}
                          onCheckedChange={() => toggleToolVerification(tool.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredTools.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No tools match your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
                <CardDescription>Overall assessment of platform health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tools Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Working
                          </span>
                          <Badge variant="outline">{workingTools}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Partial
                          </span>
                          <Badge variant="outline">{partialTools}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            Not Working
                          </span>
                          <Badge variant="outline">{nonWorkingTools}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Data Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Real Data
                          </span>
                          <Badge variant="outline">{tools.length - toolsWithMockData - toolsWithNoData}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Mock Data
                          </span>
                          <Badge variant="outline">{toolsWithMockData}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            No Data
                          </span>
                          <Badge variant="outline">{toolsWithNoData}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Issue Severity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            Critical
                          </span>
                          <Badge variant="outline">{criticalIssues}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Major
                          </span>
                          <Badge variant="outline">{majorIssues}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
                            Minor
                          </span>
                          <Badge variant="outline">{tools.filter(t => t.severity === 'minor').length}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-medium">{Math.round((workingTools / tools.length) * 100)}% of tools are fully functional</span> with 
                      {partialTools} tools having partial functionality and {nonWorkingTools} tools not working at all.
                    </li>
                    <li>
                      <span className="font-medium">{Math.round(((tools.length - toolsWithMockData - toolsWithNoData) / tools.length) * 100)}% of tools</span> are using real production data,
                      while {toolsWithMockData} tools still display mock data.
                    </li>
                    <li>
                      <span className="font-medium">{criticalIssues} critical issues</span> identified that require immediate attention,
                      with an additional {majorIssues} major issues that should be addressed in the next development sprint.
                    </li>
                  </ul>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">System Health Assessment</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-full bg-muted rounded-full h-4 mr-3">
                      <div 
                        className="bg-amber-500 h-4 rounded-full" 
                        style={{ width: `${Math.round((workingTools / tools.length) * 100)}%` }} 
                      ></div>
                    </div>
                    <span className="text-lg font-medium">{Math.round((workingTools / tools.length) * 100)}%</span>
                  </div>
                  <p className="text-muted-foreground">
                    Overall, the system is in an <span className="font-medium text-amber-500">acceptable</span> state 
                    but requires attention to critical and major issues before full production deployment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Findings</CardTitle>
                <CardDescription>In-depth analysis of each tool's functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tools.filter(tool => tool.issues.length > 0).map(tool => (
                    <div key={tool.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            {tool.name}
                            <span className="ml-2">
                              {getSeverityBadge(tool.severity)}
                            </span>
                          </h3>
                          <p className="text-muted-foreground">
                            Path: {tool.path}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex gap-2">
                          {getStatusBadge(tool.functionality)}
                          {getDataStatusBadge(tool.dataStatus)}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {tool.issues.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Issues Found:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {tool.issues.map((issue, i) => (
                                <li key={i} className="text-muted-foreground">
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tool.notes && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Additional Notes:</h4>
                            <p className="text-muted-foreground">
                              {tool.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {tools.filter(tool => tool.issues.length > 0).length === 0 && (
                  <div className="text-center py-10">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Issues Found</h3>
                    <p className="text-muted-foreground">All tools are working properly with no reported issues.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Prioritized list of actions to address identified issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-red-500">
                    <XCircle className="h-5 w-5 mr-2" />
                    Critical Priority (Immediate Action Required)
                  </h3>
                  {tools.filter(tool => tool.severity === 'critical').length > 0 ? (
                    <ul className="space-y-3 pl-9">
                      {tools
                        .filter(tool => tool.severity === 'critical')
                        .map(tool => (
                          <li key={tool.id} className="list-decimal">
                            <span className="font-medium">{tool.name}</span> ({tool.path}): Fix database connectivity issues 
                            to ensure license data is properly displayed and stored.
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground pl-9">No critical issues identified.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-amber-500">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    High Priority (Next Sprint)
                  </h3>
                  <ul className="space-y-3 pl-9">
                    {tools
                      .filter(tool => tool.severity === 'major')
                      .map(tool => (
                        <li key={tool.id} className="list-decimal">
                          <span className="font-medium">{tool.name}</span>: {
                            tool.id === 'plr-scanner' ? 
                              "Fix progress indicator stalling at 80% to provide accurate scanning progress." :
                              "Replace mock data with real production data and ensure analysis calculations are accurate."
                          }
                        </li>
                      ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-blue-500">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Medium Priority (Future Sprints)
                  </h3>
                  <ul className="space-y-3 pl-9">
                    {tools
                      .filter(tool => tool.severity === 'minor')
                      .map(tool => (
                        <li key={tool.id} className="list-decimal">
                          <span className="font-medium">{tool.name}</span>: {
                            tool.id === 'dashboard-overview' ? 
                              "Replace mock data with real production metrics and ensure all Quick Action links are functional." :
                              "Connect to production template database to display previously saved templates."
                          }
                        </li>
                      ))}
                  </ul>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="font-medium mb-2">General Recommendations</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Implement comprehensive logging for all tools to capture and analyze any errors that occur in production
                    </li>
                    <li>
                      Create automated test cases for edge case scenarios across all tools
                    </li>
                    <li>
                      Establish a regular testing cadence to verify functionality after each deployment
                    </li>
                    <li>
                      Review data models to ensure consistency across the application
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Conclusion</h3>
                  <p>
                    The PLR Organizer Pro platform is mostly functional with 70% of tools working correctly with real production data. 
                    Critical issues with the License Tracker must be addressed immediately before wider release. 
                    Other identified issues should be prioritized according to the recommended schedule to ensure a robust production environment.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button size="lg" className="gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Submit Assessment Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

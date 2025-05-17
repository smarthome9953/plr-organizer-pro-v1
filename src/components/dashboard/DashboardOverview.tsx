
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarIcon, InfoIcon, TrendingUpIcon } from 'lucide-react';
import StatCard from './StatCard';
import ActivityTimeline from './ActivityTimeline';
import ContentTypeChart from './ContentTypeChart';
import RecommendationCard from './RecommendationCard';
import QuickActionPanel from './QuickActionPanel';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total PLR Items',
      value: '248',
      icon: 'FileText',
      description: '+12% from last month',
      trend: { value: 12, positive: true },
    },
    {
      title: 'Active Users',
      value: '1,652',
      icon: 'Users',
      description: '+5% from last month',
      trend: { value: 5, positive: true },
    },
    {
      title: 'Blog Posts',
      value: '32',
      icon: 'BookOpen',
      description: '3 drafts pending',
      trend: { value: 0, positive: true },
    },
    {
      title: 'Pending Scans',
      value: '7',
      icon: 'FileScan',
      description: '4 in progress',
      trend: { value: 0, positive: false },
    }
  ];

  // Mock data for ActivityTimeline
  const timelineItems = [
    {
      id: 1,
      title: 'New PLR package uploaded',
      description: 'Health & Wellness Collection',
      timestamp: '30 minutes ago',
      icon: 'FileUp',
    },
    {
      id: 2,
      title: 'License updated',
      description: 'Digital Marketing PLR Bundle',
      timestamp: '2 hours ago',
      icon: 'FileCheck',
    },
    {
      id: 3,
      title: 'Blog post published',
      description: 'Top 10 Ways to Use PLR Content',
      timestamp: '5 hours ago',
      icon: 'FileText',
    },
    {
      id: 4,
      title: 'New user registered',
      description: 'john.smith@example.com',
      timestamp: '1 day ago',
      icon: 'UserPlus',
    },
  ];

  // Mock data for ContentTypeChart
  const chartData = [
    { name: 'Ebooks', value: 35 },
    { name: 'Articles', value: 25 },
    { name: 'Videos', value: 15 },
    { name: 'Templates', value: 10 },
    { name: 'Graphics', value: 8 },
    { name: 'Audio', value: 7 },
  ];

  // Mock recommendations
  const recommendations = [
    {
      title: 'Update Your PLR Content',
      description: 'You have 5 PLR items that need updating to match current trends.',
      actionLabel: 'View Content',
      actionUrl: '/plr-library?filter=outdated',
    },
    {
      title: 'Complete Your Profile',
      description: 'Add your niche and interests to get more relevant PLR recommendations.',
      actionLabel: 'Edit Profile',
      actionUrl: '/settings/profile',
    },
    {
      title: 'Try Our New AI Writer',
      description: 'Generate unique content from your PLR materials with our new AI tool.',
      actionLabel: 'Try Now',
      actionUrl: '/tools/ai-writer',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your PLR Organizer.</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-2 relative">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 h-auto sm:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityTimeline items={timelineItems} />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Content Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ContentTypeChart data={chartData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      
        <TabsContent value="analytics" className="space-y-4">
          <Alert className="bg-purple-600/10 border-purple-600/20">
            <InfoIcon className="h-4 w-4 text-purple-600" />
            <AlertTitle>Analytics Dashboard</AlertTitle>
            <AlertDescription>
              Detailed analytics are being loaded. Check back in a few moments.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Alert className="bg-purple-600/10 border-purple-600/20">
            <InfoIcon className="h-4 w-4 text-purple-600" />
            <AlertTitle>Report Generation</AlertTitle>
            <AlertDescription>
              Reports can be exported as CSV or PDF. Select a date range to generate custom reports.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionPanel className="lg:col-span-2" />
        <RecommendationCard className="lg:col-span-1" recommendations={recommendations} />
      </div>
    </div>
  );
};

export default DashboardOverview;

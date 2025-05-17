
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <>
      <Helmet>
        <title>Analytics & Reports | PLR Organizer Pro</title>
        <meta name="description" content="Analytics and reports for PLR Organizer Pro" />
      </Helmet>
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
            <p className="text-muted-foreground">View insights and generate reports for your PLR Organizer.</p>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="content">Content Analytics</TabsTrigger>
              <TabsTrigger value="tools">Tool Usage</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    Summary of key metrics across your PLR Organizer system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-600/10 border-purple-600/20">
                    <InfoIcon className="h-4 w-4 text-purple-600" />
                    <AlertTitle>Analytics Dashboard</AlertTitle>
                    <AlertDescription>
                      Comprehensive analytics are being integrated. Check back soon for detailed insights.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>
                    Detailed insights about user activity and growth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-600/10 border-purple-600/20">
                    <InfoIcon className="h-4 w-4 text-purple-600" />
                    <AlertTitle>User Analytics</AlertTitle>
                    <AlertDescription>
                      User analytics tracking is being implemented. Soon you'll see registration trends, active users, and engagement metrics.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Analytics</CardTitle>
                  <CardDescription>
                    Insights about your PLR content library and usage.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-600/10 border-purple-600/20">
                    <InfoIcon className="h-4 w-4 text-purple-600" />
                    <AlertTitle>Content Analytics</AlertTitle>
                    <AlertDescription>
                      Content analytics are being developed. This will include most popular content, category distribution, and content growth trends.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tool Usage Analytics</CardTitle>
                  <CardDescription>
                    See which tools are most popular and how they're being used.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-600/10 border-purple-600/20">
                    <InfoIcon className="h-4 w-4 text-purple-600" />
                    <AlertTitle>Tool Usage Analytics</AlertTitle>
                    <AlertDescription>
                      Tool usage tracking is being established. Soon you'll see which tools are used most frequently and by whom.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Generation</CardTitle>
                  <CardDescription>
                    Generate custom reports for various aspects of your system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-600/10 border-purple-600/20">
                    <InfoIcon className="h-4 w-4 text-purple-600" />
                    <AlertTitle>Report Generation</AlertTitle>
                    <AlertDescription>
                      Custom report generation is coming soon. You'll be able to create and export reports for user activity, content usage, and more.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;

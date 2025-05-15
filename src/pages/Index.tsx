
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ContentTypeChart from '@/components/dashboard/ContentTypeChart';
import QuickActionPanel from '@/components/dashboard/QuickActionPanel';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Boxes, FileText, CheckCircle2, TrendingUp, Repeat, Calendar, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.name ? user.user_metadata.name.split(' ')[0] : 'there';

  // Sample content type data
  const contentTypeData = [
    { name: 'Articles', value: 48, color: '#4285F4' },
    { name: 'eBooks', value: 32, color: '#34A853' },
    { name: 'Videos', value: 12, color: '#FBBC05' },
    { name: 'Templates', value: 36, color: '#EA4335' },
  ];

  // Sample activity data
  const activityData = [
    {
      id: '1',
      title: 'Uploaded new content',
      time: '2 hours ago',
      description: 'Health and wellness PLR bundle (15 articles)',
      type: 'upload' as const
    },
    {
      id: '2',
      title: 'Edited content',
      time: '5 hours ago',
      description: 'Modified "Keto Diet Basics" article',
      type: 'edit' as const
    },
    {
      id: '3',
      title: 'Exported content',
      time: 'Yesterday',
      description: 'Marketing templates to WordPress',
      type: 'export' as const
    },
    {
      id: '4',
      title: 'Viewed content',
      time: '2 days ago',
      description: 'SEO eBook collection',
      type: 'view' as const
    }
  ];

  // Sample recommendations
  const recommendations = [
    {
      id: '1',
      title: 'Content Optimization Opportunity',
      description: 'Your "Social Media Marketing" PLR articles haven't been modified yet. Customize them to improve uniqueness.',
      actionText: 'Start Customizing',
      actionHref: '/plr-library/social-media'
    },
    {
      id: '2',
      title: 'Trending Topic Alert',
      description: 'AI tools content is trending in your niche. We found 5 PLR articles in your library you could update.',
      actionText: 'View Articles',
      actionHref: '/plr-library?tag=ai-tools'
    },
    {
      id: '3',
      title: 'Unused Content',
      description: 'You have 15 health and wellness articles that haven't been published or used yet.',
      actionText: 'Explore Content',
      actionHref: '/plr-library?status=unused&category=health'
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {firstName}!</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Content Calendar
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total PLR Content"
          value="128"
          description="Items in your library"
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Content Health"
          value="76%"
          description="Overall organization quality"
          icon={<CheckCircle2 className="h-5 w-5" />}
          trend={{ value: 4, positive: true }}
        />
        <StatCard
          title="Usage Rate"
          value="38%"
          description="Content utilized vs. stored"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 2, positive: true }}
        />
        <StatCard
          title="Reuse Potential"
          value="42"
          description="Items ready for repurposing"
          icon={<Repeat className="h-5 w-5" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Left Column - 4/7 */}
        <div className="md:col-span-4 grid gap-4">
          <ContentTypeChart data={contentTypeData} />
          
          <ActivityTimeline items={activityData} />
          
          {/* Onboarding Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Getting Started</CardTitle>
              <CardDescription>Complete these steps to organize your PLR content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Setup Progress</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="grid gap-2">
                  <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs">✓</span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Create account</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs">✓</span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Set up categories</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs">✓</span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Upload first PLR content</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary text-primary text-xs">4</span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Customize content</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground text-muted-foreground text-xs">5</span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Track first publication</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - 3/7 */}
        <div className="md:col-span-3 grid gap-4">
          <QuickActionPanel />
          
          <RecommendationCard recommendations={recommendations} />
          
          {/* Call to Action */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                  <h2 className="text-xl font-semibold mb-2">Ready to expand your PLR library?</h2>
                  <p className="text-muted-foreground mb-4">
                    Explore our marketplace for premium PLR content curated for your niche. Find high-quality articles, ebooks, and templates.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/marketplace">
                      <Button className="flex items-center">
                        <Store className="mr-2 h-4 w-4" />
                        Browse Marketplace
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Boxes className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

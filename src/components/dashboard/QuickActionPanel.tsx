
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, FolderPlus, Download, Search, Edit, Palette, Wrench, RefreshCw, Shield, FileSearch, PercentSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface QuickActionPanelProps {
  className?: string;
}

const QuickActionPanel = ({ className }: QuickActionPanelProps) => {
  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Upload Content',
      icon: <Upload className="h-4 w-4 mr-2" />,
      href: '/upload',
      variant: 'default'
    },
    {
      id: '2',
      title: 'Browse Library',
      icon: <FileText className="h-4 w-4 mr-2" />,
      href: '/plr-library',
      variant: 'outline'
    },
    {
      id: '3',
      title: 'New Project',
      icon: <FolderPlus className="h-4 w-4 mr-2" />,
      href: '/projects/new',
      variant: 'outline'
    },
    {
      id: '4',
      title: 'Export Content',
      icon: <Download className="h-4 w-4 mr-2" />,
      href: '/export',
      variant: 'outline'
    },
    {
      id: '5',
      title: 'Advanced Search',
      icon: <Search className="h-4 w-4 mr-2" />,
      href: '/search',
      variant: 'outline'
    },
    {
      id: '6',
      title: 'Brand Kit Tool',
      icon: <Palette className="h-4 w-4 mr-2" />,
      href: '/tools/brand-kit',
      variant: 'outline'
    },
    {
      id: '7',
      title: 'Content Spinner',
      icon: <RefreshCw className="h-4 w-4 mr-2" />,
      href: '/tools/content-spinner',
      variant: 'outline'
    },
    {
      id: '8',
      title: 'SEO Analyzer',
      icon: <FileSearch className="h-4 w-4 mr-2" />,
      href: '/tools/seo-analyzer',
      variant: 'outline'
    },
    {
      id: '9',
      title: 'License Tracker',
      icon: <Shield className="h-4 w-4 mr-2" />,
      href: '/tools/license-tracker',
      variant: 'outline'
    },
    {
      id: '10',
      title: 'Uniqueness Meter',
      icon: <PercentSquare className="h-4 w-4 mr-2" />,
      href: '/tools/uniqueness-meter',
      variant: 'outline'
    }
  ];

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button 
              key={action.id} 
              variant={action.variant || 'outline'} 
              asChild
              className="justify-start h-10"
            >
              <Link to={action.href}>
                {action.icon}
                {action.title}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionPanel;

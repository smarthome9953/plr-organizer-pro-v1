
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, Upload, Edit, Download } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  time: string;
  description: string;
  type: 'upload' | 'edit' | 'export' | 'view';
}

interface ActivityTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const getActivityIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'upload':
      return <Upload className="h-4 w-4" />;
    case 'edit':
      return <Edit className="h-4 w-4" />;
    case 'export':
      return <Download className="h-4 w-4" />;
    case 'view':
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getActivityColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'upload':
      return 'bg-blue-500';
    case 'edit':
      return 'bg-amber-500';
    case 'export':
      return 'bg-green-500';
    case 'view':
      return 'bg-gray-500';
    default:
      return 'bg-primary';
  }
};

const ActivityTimeline = ({ items, className }: ActivityTimelineProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4">
              <div className={cn(
                "mt-1 flex h-8 w-8 items-center justify-center rounded-full", 
                getActivityColor(item.type),
                "text-white"
              )}>
                {getActivityIcon(item.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;

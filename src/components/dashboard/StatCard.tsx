
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  trend 
}: StatCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className={cn(
            "flex items-center mt-2 text-xs",
            trend.positive ? "text-green-500" : "text-red-500"
          )}>
            {trend.positive ? "↑" : "↓"} {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
  className?: string;
}

const RecommendationCard = ({ recommendations, className }: RecommendationCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className="space-y-2 p-3 border rounded-lg bg-muted/20">
            <h4 className="font-medium text-sm">{recommendation.title}</h4>
            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary" 
              asChild
            >
              <a href={recommendation.actionHref}>{recommendation.actionText}</a>
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm">View All Recommendations</Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;

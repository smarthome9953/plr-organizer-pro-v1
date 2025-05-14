
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExitIntentCtaProps {
  show: boolean;
  onClose: () => void;
}

const ExitIntentCta = ({ show, onClose }: ExitIntentCtaProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Wait! Don't Miss This...</h3>
        <p className="mb-4">Get our free PLR Organization Checklist and start organizing your content today, even before trying our software.</p>
        <Button className="w-full mb-2">Get Free PLR Checklist</Button>
        <button className="text-sm text-muted-foreground w-full" onClick={onClose}>
          No thanks, I'll continue browsing
        </button>
      </div>
    </div>
  );
};

export default ExitIntentCta;

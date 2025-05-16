
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExitIntentCtaProps {
  show: boolean;
  onClose: () => void;
}

const ExitIntentCta = ({ show, onClose }: ExitIntentCtaProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto
                bg-card dark:bg-purple-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-4">Wait! Don't Miss This...</h3>
        <p className="text-lg mb-6">Get our free PLR Organization Checklist and start organizing your content today, even before trying our software.</p>
        <Button className="w-full mb-3 text-lg py-6">Get Free PLR Checklist</Button>
        <button className="text-base text-muted-foreground w-full" onClick={onClose}>
          No thanks, I'll continue browsing
        </button>
      </div>
    </div>
  );
};

export default ExitIntentCta;

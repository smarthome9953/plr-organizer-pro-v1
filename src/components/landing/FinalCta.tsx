
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock, Users } from 'lucide-react';

const FinalCta = () => {
  return (
    <section className="py-16 md:py-24 bg-purple-600 text-primary-foreground">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Organizing Your PLR Content Library Today</h2>
        <p className="mb-6 max-w-[600px] mx-auto opacity-90">
          Join thousands of successful PLR users who have transformed their content management and maximized their private label rights investments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/auth?action=signup">
              Start Your Free 7-Day Trial
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground" asChild>
            <Link to="/contact">
              Schedule a Demo
            </Link>
          </Button>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 mb-2 text-white" />
            <span className="text-sm">7-Day Guarantee</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 mb-2 text-white" />
            <span className="text-sm">Quick Setup</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 mb-2 text-white" />
            <span className="text-sm">Free Support</span>
          </div>
        </div>

        <div className="mt-12">
          <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 border-primary-foreground text-white" asChild>
            <Link to="/resources/plr-software-faq">
              Download Our Free PLR Organization Checklist
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;

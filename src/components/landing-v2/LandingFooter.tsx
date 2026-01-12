import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Shield, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const LandingFooter = () => {
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consentChecked) {
      toast.error("Please enter your email and agree to receive updates");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Successfully subscribed! Check your email for confirmation.");
    setEmail('');
    setConsentChecked(false);
    setIsSubmitting(false);
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-card">
      {/* Email Signup Section */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Get PLR Tips & Updates</h3>
            <p className="text-muted-foreground mb-6">
              Join 10,000+ marketers getting weekly PLR organization tips and exclusive updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isSubmitting || !consentChecked}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Checkbox
                id="consent"
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground">
                I agree to receive emails. Unsubscribe anytime.
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" 
                alt="PLR Organizer Pro" 
                className="h-10" 
              />
            </Link>
            <p className="text-muted-foreground mb-4">
              Transform PLR chaos into organized, profitable content. The #1 desktop app for PLR management.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com/c/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/affiliates" className="text-muted-foreground hover:text-primary transition-colors">Affiliates</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="/gdpr-compliance" className="text-muted-foreground hover:text-primary transition-colors">GDPR Compliance</Link></li>
              <li><Link to="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/affiliate-disclosure" className="text-muted-foreground hover:text-primary transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/resources/guides" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/resources/knowledge-base" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
              <li><Link to="/download" className="text-muted-foreground hover:text-primary transition-colors">Download</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PLR Organizer Pro. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-status-success" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 text-status-success" />
              <span>7-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Schema.org Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PLR Organizer Pro",
          "url": "https://plrorganizerpro.com",
          "logo": "https://plrorganizerpro.com/logo.png",
          "sameAs": [
            "https://facebook.com/plrorganizerpro",
            "https://twitter.com/plrorganizerpro",
            "https://linkedin.com/company/plrorganizerpro",
            "https://youtube.com/c/plrorganizerpro"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@plrorganizerpro.com",
            "contactType": "customer service",
            "availableLanguage": "English"
          }
        })
      }} />
    </footer>
  );
};

export default LandingFooter;

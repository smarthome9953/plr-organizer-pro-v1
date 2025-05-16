
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useFileExplorer } from '@/context/FileExplorerContext';

const Footer = () => {
  const {
    scanResults,
    selectedFolders
  } = useFileExplorer();
  
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email, 'Consent:', consentChecked);
    // Reset form after submission
    setEmail('');
    setConsentChecked(false);
  };
  
  const currentYear = new Date().getFullYear();
  
  return <footer className="border-t bg-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top Footer Section with Logo, Newsletter, and Social Icons */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4">
              <Link to="/" className="inline-block">
                <img src="/lovable-uploads/34f6c58f-7ead-48ed-8bf9-bed0734b95c5.png" alt="PLR Organizer Pro" className="h-10 mb-2" />
              </Link>
              <p className="text-sm text-white/80">
                Organize, Track & Maximize Your PLR Content
              </p>
              
              <div className="flex space-x-4 mt-4">
                <a href="https://facebook.com/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/75 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/75 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com/company/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/75 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://youtube.com/c/plrorganizerpro" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/75 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Footer Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Company */}
            <div className="footer-column">
              <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" title="Learn about PLR Organizer Pro's mission and team" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">About Us</Link></li>
                <li><Link to="/careers" title="Join the PLR Organizer Pro team" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Careers</Link></li>
                <li><Link to="/contact" title="Get support or contact our team" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Contact Us</Link></li>
                <li><Link to="/affiliates" title="Earn commissions promoting PLR Organizer Pro" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Affiliate Program</Link></li>
              </ul>
            </div>
            
            {/* Column 2: Legal */}
            <div className="footer-column">
              <h4 className="font-semibold text-lg mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" title="PLR Organizer Pro privacy practices" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" title="PLR Organizer Pro terms and conditions" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" title="How PLR Organizer Pro uses cookies" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Cookie Policy</Link></li>
                <li><Link to="/gdpr-compliance" title="Our commitment to EU data protection" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">GDPR Compliance</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Resources */}
            <div className="footer-column">
              <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/plr-guide" title="Comprehensive guide to PLR content" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">PLR Organization Guide</Link></li>
                <li><Link to="/blog" title="Tips, tutorials, and PLR news" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Blog</Link></li>
                <li><Link to="/documentation" title="Product documentation and help" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">Help Documentation</Link></li>
                <li><Link to="/resources" title="PLR resources and tools" className="text-sm text-white/75 hover:text-white hover:underline transition-colors">PLR Resource Center</Link></li>
              </ul>
            </div>
            
            {/* Column 4: Contact Info & Trust Badges */}
            <div className="footer-column">
              <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/75">
                  <strong>Email:</strong> <a href="mailto:support@plrorganizerpro.com" className="text-white hover:underline">support@plrorganizerpro.com</a>
                </p>
                <p className="text-sm text-white/75">
                  <strong>Support Hours:</strong> Mon-Fri, 9am-5pm EST
                </p>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="inline-flex items-center border border-white/20 rounded-md px-2 py-1 text-xs bg-purple-700/30">
                  
                </div>
                <div className="inline-flex items-center border border-white/20 rounded-md px-2 py-1 text-xs bg-purple-700/30">
                  <span>7-Day Money Back Guarantee</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer Section */}
        <Separator className="mb-6 bg-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-white/75 mb-4 md:mb-0">
            &copy; {currentYear} PLR Organizer Pro. All Rights Reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-white/75">
            {/* Add payment method icons if applicable */}
            <div className="text-xs">
              {selectedFolders.length > 0 && <span>{selectedFolders.length} folder{selectedFolders.length !== 1 ? 's' : ''} selected</span>}
              {scanResults.length > 0 && <span className="ml-4">{scanResults.length} PLR package{scanResults.length !== 1 ? 's' : ''} found</span>}
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
        "sameAs": ["https://facebook.com/plrorganizerpro", "https://twitter.com/plrorganizerpro", "https://linkedin.com/company/plrorganizerpro", "https://youtube.com/c/plrorganizerpro"],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@plrorganizerpro.com",
          "contactType": "customer service",
          "availableLanguage": "English"
        }
      })
    }} />
    </footer>;
};

export default Footer;

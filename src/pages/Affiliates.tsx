
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Affiliates = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much commission will I earn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll earn 40% commission on every sale you refer. For our $39/month plan, that's $15.60 per month per customer for as long as they remain subscribed."
        }
      },
      {
        "@type": "Question",
        "name": "When do I get paid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We process affiliate payments on the 15th of each month for all commissions earned in the previous month, provided you've reached the $50 minimum payout threshold."
        }
      },
      {
        "@type": "Question",
        "name": "What marketing materials will I get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll receive banner ads in multiple sizes, email swipe copy, social media templates, product review guidelines, and promotional content to share with your audience."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the affiliate cookie last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tracking cookie lasts 90 days, giving you plenty of time to earn commission from your referrals who may take time to make a purchasing decision."
        }
      },
      {
        "@type": "Question",
        "name": "Can I promote PLR Organizer Pro on paid ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can promote PLR Organizer Pro through paid advertising, but you cannot bid on our trademarked terms or create ads that may confuse customers about your relationship with us."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>PLR Organizer Pro Affiliate Program | Earn Commission Promoting PLR Tools</title>
        <meta name="description" content="Join the PLR Organizer Pro Affiliate Program and earn generous commissions promoting the ultimate PLR content management solution. Apply today!" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/90 to-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">PLR Organizer Pro Affiliate Program</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Turn your audience into income by promoting the #1 PLR content management solution
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              Apply to Become an Affiliate
            </Button>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Earn Up to 40% Recurring Commission</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <h3 className="text-xl font-semibold mb-4">Commission Rate</h3>
              <p>Earn 40% on all referred sales, both initial and recurring monthly subscriptions</p>
            </Card>
            
            <Card className="p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">90 Days</div>
              <h3 className="text-xl font-semibold mb-4">Cookie Duration</h3>
              <p>Our extended tracking ensures you get credit for your marketing efforts</p>
            </Card>
            
            <Card className="p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">$15.60+</div>
              <h3 className="text-xl font-semibold mb-4">Per Customer/Month</h3>
              <p>For our standard plan at $39/month - a truly passive income stream</p>
            </Card>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="mb-4">
              The PLR Organizer Pro Affiliate Program offers a unique opportunity for content creators, marketers, and PLR vendors to generate substantial recurring income by promoting a tool that genuinely helps their audience manage PLR content more efficiently.
            </p>
            
            <p className="mb-4">
              As a PLR Organizer Pro affiliate, you'll earn a generous 40% commission on all sales you generate, including recurring monthly subscription fees. This means you'll continue earning month after month from a single referral, creating a truly passive income stream.
            </p>
            
            <p className="mb-4">
              With our 90-day cookie duration, you'll receive credit even when customers take time to make their purchasing decision. Our conversion-optimized sales funnel and high-quality product ensure excellent conversion rates for your traffic.
            </p>
            
            <div className="bg-muted p-6 rounded-lg my-8 relative">
              <p className="italic text-lg mb-0">
                "Since joining the PLR Organizer Pro affiliate program last year, I've earned over $12,000 in passive income. The recurring commission model is a game-changer, and my audience loves the product!"
              </p>
              <p className="font-semibold mt-4">— Sarah Johnson, Digital Product Creator</p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How Our Affiliate Program Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Apply</h3>
                <p>Complete our simple application form to join our affiliate program</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
                <p>We'll review your application and provide access to your affiliate dashboard</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Promote</h3>
                <p>Share your unique affiliate link and marketing materials with your audience</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-2">Earn</h3>
                <p>Get paid monthly for all the sales and recurring subscriptions you generate</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg">Start Earning Today</Button>
            </div>
          </div>
        </section>
        
        {/* Marketing Materials */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Marketing Materials Provided</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Banner Ads</strong> - Professional banner ads in multiple sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Email Templates</strong> - Ready-to-use email sequences and swipe copy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Social Media Content</strong> - Graphics and posts for all major platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Review Guidelines</strong> - Templates for creating authentic product reviews</span>
                </li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Product Screenshots</strong> - High-quality images of the platform in action</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Promotional Videos</strong> - Explainer videos and testimonial clips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Landing Page Templates</strong> - Conversion-optimized pages you can use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Content Articles</strong> - PLR organization tips and strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Payment Terms */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Payment Terms & Methods</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Payment Schedule</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Monthly payments on the 15th</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>$50 minimum payout threshold</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>60-day refund consideration period</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Detailed commission reporting</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>PayPal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Stripe</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Bank transfer (for qualifying affiliates)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Cryptocurrency (BTC, ETH)</span>
                    </li>
                  </ul>
                </Card>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                <strong>Note:</strong> All commissions are subject to our affiliate terms and conditions. Payments may be held if fraud is suspected or terms are violated.
              </p>
            </div>
          </div>
        </section>
        
        {/* Success Tips */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Affiliate Success</h2>
          
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">1.</span>
                  <span>Create detailed review content that highlights specific features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">2.</span>
                  <span>Focus on how the tool solves specific PLR management problems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">3.</span>
                  <span>Include comparison content with alternative solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">4.</span>
                  <span>Use video demonstrations to showcase the platform in action</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">5.</span>
                  <span>Create tutorial content showing practical use cases</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Target Audiences</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>PLR content buyers looking to organize their purchases</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Digital marketers using PLR for business content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Course creators who incorporate PLR materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>PLR vendors who can recommend it to their customers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Virtual assistants who manage content for clients</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Earnings Calculator */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Earning Potential</h2>
            
            <div className="max-w-3xl mx-auto">
              <Card className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">5</div>
                    <p className="mb-0">Monthly Referrals</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$78</div>
                    <p className="mb-0">Monthly Commission</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$936</div>
                    <p className="mb-0">Annual Recurring</p>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">20</div>
                    <p className="mb-0">Monthly Referrals</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$312</div>
                    <p className="mb-0">Monthly Commission</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$3,744</div>
                    <p className="mb-0">Annual Recurring</p>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50</div>
                    <p className="mb-0">Monthly Referrals</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$780</div>
                    <p className="mb-0">Monthly Commission</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$9,360</div>
                    <p className="mb-0">Annual Recurring</p>
                  </div>
                </div>
              </Card>
              
              <p className="text-center mt-4 text-sm text-muted-foreground">
                * Estimated earnings based on $39/month plan with 40% commission rate and no customer churn. Actual results may vary.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How much commission will I earn?</AccordionTrigger>
                <AccordionContent>
                  You'll earn 40% commission on every sale you refer. For our $39/month plan, that's $15.60 per month per customer for as long as they remain subscribed.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>When do I get paid?</AccordionTrigger>
                <AccordionContent>
                  We process affiliate payments on the 15th of each month for all commissions earned in the previous month, provided you've reached the $50 minimum payout threshold.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What marketing materials will I get?</AccordionTrigger>
                <AccordionContent>
                  You'll receive banner ads in multiple sizes, email swipe copy, social media templates, product review guidelines, and promotional content to share with your audience.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the affiliate cookie last?</AccordionTrigger>
                <AccordionContent>
                  Our tracking cookie lasts 90 days, giving you plenty of time to earn commission from your referrals who may take time to make a purchasing decision.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I promote PLR Organizer Pro on paid ads?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can promote PLR Organizer Pro through paid advertising, but you cannot bid on our trademarked terms or create ads that may confuse customers about your relationship with us.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Do I need to be a customer to be an affiliate?</AccordionTrigger>
                <AccordionContent>
                  No, you don't need to be a customer to join our affiliate program. However, having firsthand experience with the platform can help you create more authentic promotions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>Is there a cost to join the affiliate program?</AccordionTrigger>
                <AccordionContent>
                  No, joining our affiliate program is completely free. There are no fees or charges at any point.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning Passive Income?</h2>
            <p className="text-xl mb-8">Join the PLR Organizer Pro affiliate program today and turn your audience into a reliable source of recurring revenue.</p>
            <Button size="lg" variant="secondary" className="text-primary font-semibold text-lg px-8">
              Apply Now
            </Button>
            <p className="mt-4 text-sm text-white/80">
              Questions? Contact our affiliate manager at <a href="mailto:affiliates@plrorganizerpro.com" className="underline">affiliates@plrorganizerpro.com</a>
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Affiliates;

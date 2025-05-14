
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star } from 'lucide-react';

const HowItWorks = ({ howItWorksRef }: { howItWorksRef: React.RefObject<HTMLDivElement> }) => {
  const steps = [
    {
      step: 1,
      title: "Import Your Content",
      description: "Easily import your PLR content via bulk upload, folder scanning, or individual files. Supports all content types including eBooks, articles, videos, graphics, templates, and more.",
      image: "plr-organizer-import.webp"
    },
    {
      step: 2,
      title: "Auto-Organize Library",
      description: "Our intelligent system automatically categorizes your content by topic, type, and quality while extracting license details and usage rights for complete PLR organization.",
      image: "plr-organizer-organize.webp"
    },
    {
      step: 3,
      title: "Deploy With Confidence",
      description: "Search, access, and track your PLR content deployments across all your projects and platforms. Our PLR tracking software ensures you never reuse content accidentally again.",
      image: "plr-organizer-deploy.webp"
    }
  ];

  const testimonials = [
    {
      content: "This software has transformed how I manage my PLR content library. I've saved at least 5 hours every week and never accidentally reuse content anymore. The ROI tracking alone has helped me make much better purchasing decisions, increasing my content utilization by 37% in just two months.",
      author: "Sarah Johnson, Digital Product Creator",
      rating: 5
    },
    {
      content: "As someone with over 5,000 PLR items across multiple niches, finding anything was a nightmare before. PLR Organizer Pro categorized everything automatically and now I can find exactly what I need in seconds. My content production has increased by 25% while spending less time searching through my library.",
      author: "Michael Roberts, Content Marketing Agency Owner",
      rating: 5
    },
    {
      content: "The license tracking feature alone is worth the investment. I used to constantly worry about violating PLR terms, but now the system alerts me to any restrictions. This saved me from a potential legal issue when I was about to use restricted content for a client project. This software is essential for anyone serious about PLR content.",
      author: "Jennifer Lewis, Digital Marketing Consultant",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24" ref={howItWorksRef}>
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How Ultimate PLR Organizer Pro Works in 3 Simple Steps</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-6">{step.description}</p>
              <div className="w-full bg-card border rounded-lg shadow-sm p-4">
                <AspectRatio ratio={3 / 2}>
                  <img 
                    src="/placeholder.svg"
                    alt={`PLR Organizer Pro Step ${step.step}: ${step.title} - PLR content management workflow`}
                    className="h-full w-full object-cover rounded-md"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced testimonials with schema markup */}
        <div className="mt-16 space-y-6" itemScope itemType="https://schema.org/Review">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-card border rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0" itemProp="image"></div>
                <div>
                  <div className="flex items-center mb-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                    <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                  </div>
                  <p className="italic mb-2" itemProp="reviewBody">{testimonial.content}</p>
                  <p className="font-semibold" itemProp="author">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

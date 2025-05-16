
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = ({ pricingRef }: { pricingRef: React.RefObject<HTMLDivElement> }) => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for beginners with a small PLR content library to organize",
      features: [
        "Up to 250 PLR items",
        "Basic categorization",
        "License tracking",
        "Desktop app only",
        "Email support"
      ],
      button: "Start Your 7-Day Free Trial",
      itemProp: "itemListElement"
    },
    {
      name: "Professional",
      price: "$39",
      description: "Ideal for growing PLR marketers and content creators",
      features: [
        "Up to 2,500 PLR items",
        "Advanced AI categorization",
        "Full usage tracking",
        "Desktop + Web access",
        "Priority support",
        "ROI analytics"
      ],
      button: "Start Free 7-Day Trial",
      highlighted: true,
      itemProp: "itemListElement"
    },
    {
      name: "Agency",
      price: "$79",
      description: "For businesses with extensive PLR content libraries",
      features: [
        "Unlimited PLR items",
        "Team collaboration",
        "Client management",
        "White label reports",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      button: "Contact Sales",
      itemProp: "itemListElement"
    }
  ];

  return (
    <section className="py-16 md:py-24" ref={pricingRef} itemScope itemType="https://schema.org/ProductCollection">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your PLR Organization Plan</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-[800px] mx-auto">
          Select the plan that best fits your PLR content volume and management needs. All plans include our core PLR organization features.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col bg-card border rounded-lg shadow-sm overflow-hidden ${
                plan.highlighted ? 'border-purple-600 ring-2 ring-purple-600' : ''
              }`}
              itemScope
              itemType="https://schema.org/Product"
              itemProp={plan.itemProp}
            >
              {plan.highlighted && (
                <div className="bg-purple-600 text-primary-foreground py-1 text-center text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" itemProp="name">{plan.name}</h3>
                <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <span className="text-3xl font-bold" itemProp="price">{plan.price}</span>
                  <span className="text-muted-foreground" itemProp="priceCurrency" content="USD">/month</span>
                </div>
                <p className="text-muted-foreground mb-6" itemProp="description">{plan.description}</p>
                <Button 
                  className="w-full mb-6" 
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.button}
                </Button>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">All plans include a 7-day money-back guarantee</p>
          <p className="text-sm text-muted-foreground">Prices shown are monthly when billed annually. Monthly billing available.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

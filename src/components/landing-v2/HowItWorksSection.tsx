import React from 'react';
import { Download, Scan, FolderCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Download,
    number: "1",
    title: "Download & Install",
    description: "Get the app for Windows, Mac, or Linux. Quick 2-minute installation.",
    color: "bg-blue-500"
  },
  {
    icon: Scan,
    number: "2",
    title: "Scan Your Computer",
    description: "Point the scanner to folders or scan your entire computer for PLR content.",
    color: "bg-primary"
  },
  {
    icon: FolderCheck,
    number: "3",
    title: "Auto-Organize",
    description: "Watch as your PLR is automatically sorted by niche and sub-niche.",
    color: "bg-status-success"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get organized in three simple steps. No technical skills required.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-border" />
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-flex mb-6">
                      <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

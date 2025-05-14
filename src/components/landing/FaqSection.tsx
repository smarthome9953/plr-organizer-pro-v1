
import React from 'react';

const FaqSection = () => {
  const faqs = [
    {
      question: "How does the PLR license tracking feature work?",
      answer: "Our system scans your PLR content for license information, extracts key details, and maintains a database of usage rights. When you're about to use content, the system alerts you to any restrictions, expiration dates, or special requirements specified in the license."
    },
    {
      question: "Can I organize PLR ebooks and videos in different categories?",
      answer: "Absolutely! Ultimate PLR Organizer Pro handles all content types including ebooks, videos, audio files, graphics, templates, and more. You can organize content by type, topic, or create your own custom categorization system."
    },
    {
      question: "Does Ultimate PLR Organizer Pro work with all types of PLR content?",
      answer: "Yes, our PLR content management system is designed to work with all PLR content regardless of format or niche. Whether you have health PLR, business content, WordPress themes, or educational materials, our system can organize and track it all."
    },
    {
      question: "How does the software help me track where I've used my PLR content?",
      answer: "When you deploy PLR content, you can log the usage within the system, including where it was published, when, what modifications were made, and more. This creates a complete history for each piece of content, preventing accidental duplication."
    },
    {
      question: "Is there a way to track the profitability of my PLR investments?",
      answer: "Yes! Our ROI tracking feature allows you to record the purchase price of PLR content and track revenue generated from its use. The system calculates ROI automatically, helping you make better purchasing decisions in the future."
    },
    {
      question: "Can I use the software on both my desktop and mobile devices?",
      answer: "The Professional and Agency plans include both our desktop application and web access, which is optimized for mobile devices. This allows you to manage your PLR content from anywhere, on any device."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions About PLR Organization</h2>
        
        <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card border rounded-lg shadow-sm p-6" itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
              <h3 className="text-xl font-bold mb-2" itemProp="name">{faq.question}</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-muted-foreground" itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

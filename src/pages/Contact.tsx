
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Mail, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission state after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  // Schema.org ContactPage structured data
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact PLR Organizer Pro",
    "description": "Contact our support team for assistance with PLR Organizer Pro.",
    "url": window.location.href,
    "publisher": {
      "@type": "Organization",
      "name": "PLR Organizer Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plrorganizerpro.com/logo.png"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@plrorganizerpro.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };
  
  const faqs = [
    {
      question: "What are your support hours?",
      answer: "Our support team is available Monday through Friday from 9 AM to 5 PM EST. During these hours, we typically respond to inquiries within 1-2 hours."
    },
    {
      question: "How quickly can I expect a response?",
      answer: "For general inquiries, we aim to respond within 24 hours. For technical support issues, we prioritize based on urgency with a target response time of 1-2 business days."
    },
    {
      question: "Can I get phone support?",
      answer: "We primarily offer support via email and our help center. For premium subscribers, scheduled phone consultations are available by appointment."
    },
    {
      question: "What information should I include when reporting a technical issue?",
      answer: "Please include your account email, a detailed description of the issue, any error messages you're seeing, and steps to reproduce the problem. Screenshots are always helpful."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee on all new subscriptions. Please refer to our Terms of Service for full details on our refund policy."
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Contact PLR Organizer Pro | Get Support & Information</title>
        <meta 
          name="description" 
          content="Need help with PLR Organizer Pro? Contact our support team at support@plrorganizerpro.com for assistance with your PLR content management needs."
        />
        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 tracking-tight">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                We're here to help with any questions about PLR Organizer Pro. Reach out to our team for support, feedback, or inquiries.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll respond to your inquiry shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name" 
                            required 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your-email@example.com" 
                            required 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is your message regarding?" 
                            required 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Please provide as much detail as possible..." 
                            rows={5}
                            required 
                          />
                        </div>
                        
                        <Button type="submit" className="w-full">Send Message</Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <a href="mailto:support@plrorganizerpro.com" className="text-primary hover:underline">
                          support@plrorganizerpro.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">Monday-Friday: 9 AM - 5 PM EST</p>
                        <p className="text-sm text-muted-foreground">Weekend: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      We strive to respond to all inquiries within 24 hours during business days. Complex technical issues may require additional time.
                    </p>
                    <p className="text-sm font-medium">
                      Average response time: <span className="text-primary">12 hours</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
              <p className="text-muted-foreground mb-6">
                Check out our comprehensive help resources for tutorials, guides, and documentation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="/resources/guides">PLR Guides</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resources/faq">FAQ</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resources/support">Support Center</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

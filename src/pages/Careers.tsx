
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CheckCircle2, Heart, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Careers = () => {
  // Mock job openings - could be replaced with real data from API
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Remote",
      type: "Full-time"
    }
  ];

  // Mock team testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      quote: "Working at PLR Organizer Pro has given me the opportunity to solve real problems for content creators while working with an amazing team that values innovation and work-life balance.",
      years: "2 years at PLR Organizer Pro"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Developer",
      quote: "I love the culture of continuous learning and the flexibility to work remotely. We're building something that genuinely helps people organize their digital assets better.",
      years: "3 years at PLR Organizer Pro"
    }
  ];

  // Schema.org JobPosting structured data
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Frontend Developer",
    "description": "We're looking for a talented Frontend Developer to join our team and help build the future of PLR content management solutions.",
    "datePosted": "2025-05-01",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "PLR Organizer Pro",
      "sameAs": "https://plrorganizerpro.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Remote"
      }
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": 70000,
        "maxValue": 100000,
        "unitText": "YEAR"
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Join Our Team | Careers at PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Explore exciting career opportunities at PLR Organizer Pro. Join our team and help shape the future of PLR content management solutions."
        />
        <script type="application/ld+json">
          {JSON.stringify(jobPostingSchema)}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 tracking-tight">Build Your Career at PLR Organizer Pro</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join our mission to transform how creators organize and leverage their PLR content. We're building the future of digital content management together.
              </p>
              <Button size="lg" className="gap-2">
                <Briefcase className="h-5 w-5" />
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Company Culture & Values</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Collaborative Environment</h3>
                <p className="text-muted-foreground">
                  We believe the best products come from diverse teams working together, sharing ideas, and supporting each other's growth.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  We value flexibility and understand that personal well-being leads to professional excellence and creativity.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Customer-First Approach</h3>
                <p className="text-muted-foreground">
                  Every decision we make is guided by how it will improve the experience for our PLR content creators and users.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Professional Growth</h3>
                <p className="text-muted-foreground">
                  We invest in our team's development through continuous learning opportunities, mentorship, and career advancement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Benefits of Working With Us</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Flexible Remote Work</strong> - Work from anywhere with flexible hours</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Competitive Compensation</strong> - Salary packages designed to attract and retain top talent</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Health & Wellness Benefits</strong> - Comprehensive health insurance and wellness programs</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Professional Development</strong> - Budget for courses, conferences, and learning resources</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Team Retreats</strong> - Annual company gatherings to connect in person</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong>Home Office Stipend</strong> - Funds to create your ideal workspace</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">Current Openings</h2>
            
            {jobOpenings.length > 0 ? (
              <div className="space-y-6">
                {jobOpenings.map(job => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.department} · {job.location} · {job.type}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Learn More</Button>
                      <Button>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-lg mb-4">We don't have any open positions right now, but we're always looking for talented individuals.</p>
                <p className="mb-6">Check back later or send your resume to <a href="mailto:careers@plrorganizerpro.com" className="text-primary hover:underline">careers@plrorganizerpro.com</a></p>
                <Button variant="outline">Join Our Talent Pool</Button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Application Process</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Application Review</h3>
                    <p className="text-muted-foreground">Our team reviews all applications within 5 business days and selects candidates whose skills and experience match our needs.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Initial Interview</h3>
                    <p className="text-muted-foreground">A 30-minute video call with our HR team to discuss your background, experience, and mutual fit.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Technical Assessment</h3>
                    <p className="text-muted-foreground">A practical task or skill assessment related to the role you're applying for, designed to be completed in a reasonable timeframe.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Team Interviews</h3>
                    <p className="text-muted-foreground">Meet with potential team members and managers to discuss the role in depth and ensure cultural fit.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Offer & Onboarding</h3>
                    <p className="text-muted-foreground">Successful candidates receive an offer and begin our comprehensive onboarding process to set them up for success.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="py-16 container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Team</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map(testimonial => (
                  <Card key={testimonial.id} className="bg-card">
                    <CardContent className="pt-6">
                      <blockquote className="italic text-muted-foreground mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex flex-col">
                        <span className="font-semibold">{testimonial.name}</span>
                        <span className="text-sm text-muted-foreground mb-1">{testimonial.role}</span>
                        <span className="text-xs text-muted-foreground">{testimonial.years}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of a company that's revolutionizing how creators manage and leverage their PLR content.
            </p>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary">
              View Open Positions
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;

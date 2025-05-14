
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About PLR Organizer Pro | Your PLR Content Management Solution</title>
        <meta name="description" content="Learn about PLR Organizer Pro, the ultimate solution for managing your PLR content. Discover our story, mission, and how we help content creators succeed." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PLR Organizer Pro",
            "url": "https://plrorganizerpro.com",
            "logo": "https://plrorganizerpro.com/images/logo.png",
            "description": "PLR Organizer Pro is the ultimate solution for managing, organizing, and maximizing PLR content for digital entrepreneurs and content creators.",
            "founder": {
              "@type": "Person",
              "name": "Michael"
            },
            "foundingDate": "2023",
            "sameAs": [
              "https://facebook.com/plrorganizerpro",
              "https://twitter.com/plrorganizerpro",
              "https://instagram.com/plrorganizerpro",
              "https://linkedin.com/company/plrorganizerpro"
            ]
          })}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">About PLR Organizer Pro</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">From Frustration to Innovation: Our Story</h2>
            <p className="mb-4">
              PLR Organizer Pro was born from a real problem I faced every day. After spending over a decade in IT, I found myself drowning in a sea of PLR content scattered across multiple folders, drives, and platforms. Despite my technical background, I struggled to keep track of what I owned, where it was stored, and how I could leverage it effectively.
            </p>
            <p className="mb-4">
              Working late nights after my 9-5 job, I'd find myself purchasing duplicate PLR packages or missing opportunities because I had forgotten about content I already owned. The frustration was real, and I knew I wasn't alone in this struggle.
            </p>
            <p className="mb-4">
              With help from my 12-year-old daughter (who has a natural talent for organization and design), we began creating a solution that would solve this common challenge for content creators, affiliate marketers, and digital entrepreneurs.
            </p>
          </section>
          
          <section className="mb-12 bg-primary/5 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p className="mb-4">
              Our mission is simple yet powerful: to help digital entrepreneurs maximize the value of their PLR investments through superior organization, discovery, and utilization.
            </p>
            <p className="mb-4">
              We believe that when you invest in PLR content, you deserve tools that help you extract its full value – not systems that hide your assets in forgotten digital corners.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">What Makes PLR Organizer Pro Different</h2>
            <p className="mb-4">
              Unlike generic file management systems or basic spreadsheet solutions, PLR Organizer Pro was designed specifically for PLR content by someone who uses PLR content daily. Key differentiators include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Purpose-Built Classification: Our tagging and categorization system is specifically designed for PLR content types</li>
              <li>Content Discovery Engine: Find exactly what you need when you need it with our powerful search and filter tools</li>
              <li>Usage Tracking: Never wonder if you've already used a piece of content for a specific project or client</li>
              <li>Duplication Detection: Automatically identify potential duplicate purchases before you waste money</li>
              <li>Opportunity Alerts: Get notified of content you own that matches your current projects</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">The Team Behind PLR Organizer Pro</h2>
            <p className="mb-4">
              This isn't a venture-backed startup with a team of developers. PLR Organizer Pro is a passion project created by a father-daughter team:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Michael</h3>
                <p>After 10+ years in IT infrastructure and systems management, I bring technical expertise and firsthand experience with the pain points of PLR management.</p>
              </div>
              <div className="border p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Sophia</h3>
                <p>At 12 years old, my daughter contributes fresh perspectives, intuitive design ideas, and keeps me honest about usability. She's the reason our interface is so user-friendly!</p>
              </div>
            </div>
            
            <p className="mt-6">
              This personal connection to the product means we're genuinely invested in your success. We use this tool ourselves every day, constantly refining it based on real-world usage.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">What Our Users Say</h2>
            
            <div className="grid md:grid-cols-1 gap-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="italic mb-4">
                    "I've tried everything from elaborate folder structures to expensive database software, but nothing has worked as seamlessly as PLR Organizer Pro for managing my PLR library. I've actually started using content I forgot I owned!"
                  </p>
                  <p className="font-medium">— Jennifer T., Content Creator</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="italic mb-4">
                    "After finding six duplicate packages in my collection using PLR Organizer Pro, this tool has already paid for itself. The time savings alone makes this essential for anyone serious about PLR."
                  </p>
                  <p className="font-medium">— Marcus L., Affiliate Marketer</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="italic mb-4">
                    "As someone who struggles with organization, this tool has transformed how I approach my PLR investment. It's like having a content librarian working for me 24/7."
                  </p>
                  <p className="font-medium">— Aisha K., Digital Product Creator</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Journey Forward</h2>
            <p className="mb-4">
              What started as a solution to my own frustration has evolved into something much bigger. After being unexpectedly let go from my corporate position, I've committed to developing PLR Organizer Pro full-time, dedicated to helping others overcome the same challenges I faced.
            </p>
            <p className="mb-4">
              Every feature we add and every improvement we make comes from direct user feedback and our own daily use. This isn't just a business for us – it's a mission to solve a real problem that affects thousands of digital entrepreneurs.
            </p>
          </section>
          
          <section className="mb-12 bg-primary/10 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Ready to Transform Your PLR Management?</h2>
            <p className="mb-6">
              Stop losing track of valuable content you've already purchased. End the frustration of disorganized digital assets and start leveraging your PLR investment to its fullest potential.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Try PLR Organizer Pro Free For 14 Days</Link>
            </Button>
            <p className="text-sm mt-3 text-muted-foreground">No credit card required, full access to all features.</p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Still Have Questions?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/tools">Explore our features in detail</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/#pricing">See our pricing plans</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/resources">Check out our step-by-step tutorials</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/blog">Read customer success stories</Link>
              </Button>
            </div>
          </section>
          
          <Separator className="my-8" />
          
          <p className="text-center text-sm text-muted-foreground">
            PLR Organizer Pro is a proud member of the Digital Entrepreneurs Association and Content Creators Alliance.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

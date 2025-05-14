
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  metaDescription: string;
  schemaType?: string;
  schemaData?: Record<string, any>;
}

const LegalPageLayout = ({ 
  children, 
  title, 
  metaDescription,
  schemaType = "WebPage",
  schemaData = {}
}: LegalPageLayoutProps) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": title,
    "description": metaDescription,
    "url": window.location.href,
    "publisher": {
      "@type": "Organization",
      "name": "PLR Organizer Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plrorganizerpro.com/logo.png"
      }
    }
  };

  const schema = { ...baseSchema, ...schemaData };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalPageLayout;

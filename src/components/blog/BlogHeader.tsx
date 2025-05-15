
import React from 'react';
import Header from "@/components/Header";
import { Helmet } from 'react-helmet-async';

export default function BlogHeader() {
  // Add SEO metadata with Helmet
  return (
    <>
      <Helmet>
        <title>PLR Organization Blog | Expert Tips & Strategies</title>
        <meta name="description" content="Discover expert PLR organization strategies, tips, and tutorials to optimize your content management and maximize your digital marketing ROI." />
        <meta name="keywords" content="PLR organization, content management, digital marketing, PLR content, private label rights" />
        <link rel="canonical" href="https://plrorganizerapp.com/blog" />
        <meta property="og:title" content="PLR Organization Blog | Expert Tips & Strategies" />
        <meta property="og:description" content="Discover expert PLR organization strategies, tips, and tutorials to optimize your content management and maximize your digital marketing ROI." />
        <meta property="og:url" content="https://plrorganizerapp.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PLR Organization Blog | Expert Tips & Strategies" />
        <meta name="twitter:description" content="Discover expert PLR organization strategies, tips, and tutorials to optimize your content management and maximize your digital marketing ROI." />
      </Helmet>
      {/* Using the shared Header component with consistent styling */}
      <Header />
    </>
  );
}

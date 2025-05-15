
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileType, File, Clock, Layers, Eye, FileBadge, FileOutput, FileInput, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function FileConverter() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR File Converter | Convert Any PLR Format in Seconds | PLR Organizer Pro</title>
        <meta name="description" content="Discover how our File Converter solves format compatibility issues for PLR users. Batch-convert PLR files between DOCX, PDF, and HTML with OCR capabilities. Try free today." />
      </Helmet>
      
      <Header showAuthButtons />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">PLR File Converter: Transform Any PLR Format to Editable Content in Seconds</h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Frustrated with PLR packages that come in formats you can't easily edit? Our File Converter helps transform any PLR format into editable content you can customize. Used by digital product creators to quickly repurpose PLR content for different platforms without technical headaches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" asChild>
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/tools/file-converter">
                See It In Action
              </Link>
            </Button>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">The PLR Format Problem (And Why It Costs You Hours)</h2>
                <p className="text-muted-foreground mb-6">
                  PLR content often comes in formats that are difficult to edit or incompatible with your preferred platforms. Manually converting files is time-consuming and can result in formatting issues, lost images, and broken layouts.
                </p>
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <p>Save hours of manual reformatting work</p>
                </div>
                <div className="flex items-center mb-3">
                  <Layers className="h-5 w-5 mr-3 text-primary" />
                  <p>Preserve all formatting, images and structure</p>
                </div>
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-3 text-primary" />
                  <p>Preview conversions before finalizing</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Batch Convert Up to 100 PLR Files Simultaneously</h2>
                <p className="text-muted-foreground mb-6">
                  Our powerful batch processing allows you to convert entire PLR packages at once. Simply upload multiple files, select your desired output format, and let our converter do the work for you.
                </p>
                <div className="flex items-center mb-3">
                  <FileType className="h-5 w-5 mr-3 text-primary" />
                  <p>Convert between DOCX, PDF, HTML, TXT & more</p>
                </div>
                <div className="flex items-center mb-3">
                  <FileBadge className="h-5 w-5 mr-3 text-primary" />
                  <p>OCR technology extracts text from any file</p>
                </div>
                <div className="flex items-center">
                  <File className="h-5 w-5 mr-3 text-primary" />
                  <p>Process entire PLR bundles in one go</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">OCR Technology: Extract Text from Locked PDFs and Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-3">Convert Locked PDFs to Fully Editable DOCX Files</h3>
                <p className="text-muted-foreground">
                  Our advanced OCR technology can extract text even from scanned or locked PDFs, giving you fully editable content to work with.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-3">HTML to WordPress-Ready Format in One Click</h3>
                <p className="text-muted-foreground">
                  Convert HTML PLR content directly to WordPress-ready format, complete with proper formatting, headings, and media placement.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-3">Image Extraction and Text Recognition for Visual PLR</h3>
                <p className="text-muted-foreground">
                  Extract text from infographics, charts, and image-based PLR content to create fully customizable versions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Preserve Formatting While Converting Between Formats</h2>
            <div className="bg-card p-6 rounded-lg border mb-6">
              <h3 className="text-xl font-medium mb-3">Custom Output Settings for Different Platforms</h3>
              <p className="text-muted-foreground mb-4">
                Tailor your output settings for different platforms—optimize for WordPress, social media, email marketing, or eBooks with platform-specific adjustments.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <FileInput className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Input</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Cog className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Process</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <FileOutput className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Output</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Layers className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Format</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">PLR-Specific Examples</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <p>"How to convert a PDF PLR cookbook to editable Word format"</p>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <p>"Transforming PLR PowerPoint slides into video scripts"</p>
              </li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-2">Can this converter extract text from scanned PLR PDFs?</h3>
                <p className="text-muted-foreground">
                  Yes, our File Converter uses OCR (Optical Character Recognition) technology to extract text from scanned PDFs, images, and even handwritten content with high accuracy.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-2">Will my PLR formatting stay intact after conversion?</h3>
                <p className="text-muted-foreground">
                  Our converter is designed to preserve formatting as much as possible, including headings, bullet points, tables, images, and other elements. You can also adjust preservation settings if needed.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-2">How do I batch convert an entire PLR product bundle at once?</h3>
                <p className="text-muted-foreground">
                  Simply zip your files, upload the archive, and our system will automatically extract and convert all files while maintaining the folder structure. You can also select multiple files individually for batch processing.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your PLR Content?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Stop wasting time with manual file conversions and start focusing on content customization.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

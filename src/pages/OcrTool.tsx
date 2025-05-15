
import React from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Check, FileScan, FileSearch, Image, File, Table } from "lucide-react";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function OcrTool() {
  const faqItems = [
    {
      question: "Will OCR work on PLR content with poor image quality?",
      answer: "Yes, our advanced OCR technology has been optimized to handle even low-quality images. While the accuracy may vary depending on the quality of the original, our algorithm includes image enhancement preprocessing steps that improve recognition for blurry or low-resolution content. For best results, we recommend using images with at least 300 DPI."
    },
    {
      question: "How accurate is the OCR for complex layouts like tables?",
      answer: "Our OCR tool includes specialized table and chart recognition technology that maintains the structural integrity of tabular data. It can identify rows, columns, and cells with approximately 95% accuracy on well-formatted tables. The system converts these directly into editable table formats in your chosen output file, preserving both the data and its organization."
    },
    {
      question: "Can I extract text from PLR videos or screenshots?",
      answer: "Yes, you can extract text from video screenshots or frames. Simply capture the frame containing text as an image file and upload it to our OCR tool. For videos with multiple text frames, we recommend using our batch processing option to extract text from multiple screenshots at once. This is particularly useful for PLR video courses with text-heavy slides."
    }
  ];

  const testimonials = [
    {
      quote: "This OCR tool saved me countless hours of manual transcription. I had a 120-page PLR eBook that was only available as a scanned PDF, and within minutes I had fully editable text with all the formatting intact.",
      name: "Michael R.",
      title: "Digital Product Creator"
    },
    {
      quote: "The accuracy of this tool blew me away. I've tried many OCR solutions, but this is the only one that correctly handled the complex tables in my PLR health reports without requiring hours of corrections afterward.",
      name: "Sarah T.",
      title: "Health Niche Blogger"
    }
  ];

  const steps = [
    {
      title: "Upload your files",
      description: "Select any PDF or image files containing text you want to extract. Support for JPG, PNG, PDF, TIFF and more.",
      icon: <File className="h-10 w-10 text-primary" />
    },
    {
      title: "Choose your settings",
      description: "Select language, output format, and whether to preserve layout, tables, and formatting elements.",
      icon: <FileScan className="h-10 w-10 text-primary" />
    },
    {
      title: "Get editable content",
      description: "Download your extracted text in your preferred format, ready to edit and customize for your audience.",
      icon: <FileText className="h-10 w-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR OCR Tool | Extract Text from Any PLR Image or PDF | PLR Organizer Pro</title>
        <meta name="description" content="Discover how our OCR Tool solves locked content issues for PLR users. Extract editable text from scanned PDFs and images with 99% accuracy. Try free today." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                PLR OCR Tool: Extract Editable Text from Any Locked PDF or Image-Based PLR
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Frustrated with PLR content trapped in scanned PDFs or images you can't edit? 
                Our OCR Tool helps extract and convert text from any visual PLR content with remarkable accuracy. 
                Used by content repurposers to unlock value from otherwise unusable PLR assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/tools/ocr-tool">
                    Start Extracting Text
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="#how-it-works">
                    See How It Works
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Unlock the Value in Your Image-Based PLR Content
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-3">Common PLR OCR Challenges:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-2 mt-1">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <span>PLR content locked in scanned PDFs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-2 mt-1">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <span>Image-based PLR infographics with valuable data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-2 mt-1">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <span>Hours spent manually retyping content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-2 mt-1">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <span>Poor OCR accuracy with complex tables and layouts</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-3">Our OCR Tool Solution:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>99%+ accuracy on even low-quality scans</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>Extract text from images, screenshots, and infographics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>Process multiple files in minutes, not hours</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>Table and chart recognition that preserves structure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                From Locked PDF to Fully Editable Content in 3 Steps
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Our simple process turns any image or PDF into editable text in minutes
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-background rounded-full p-6 mb-4 shadow-sm">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Advanced OCR Technology with 99% Accuracy for PLR Materials
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileSearch className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Multi-Language OCR Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Extract text from PLR content in over 50 languages, including non-Latin scripts like Chinese, Russian, and Arabic.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Format Preservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Maintain paragraph structures, font styles, headers, and other formatting elements during the extraction process.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Table className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Table Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Intelligently detect and extract tables with their structure intact, preserving rows, columns and data relationships.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Image className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Image Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automatic preprocessing improves text recognition for low-quality images and scans with poor contrast.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Batch Processing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Batch Process Multiple Files in Minutes, Not Hours
              </h2>
              
              <div className="bg-background p-6 rounded-lg mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Process PLR Content in Bulk</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload multiple files at once and let our OCR engine process them simultaneously. 
                      Perfect for PLR packages with numerous PDFs or images that need text extraction.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Process up to 100 files simultaneously</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Download as individual files or combined document</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Apply same settings to all files with one click</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Direct-to-Word Conversion Path</h3>
                    <p className="text-muted-foreground mb-4">
                      Extract text and export directly to fully editable Word documents. 
                      Our smart formatting detection preserves the structure of your content.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Convert to DOCX, PDF, HTML, TXT or Markdown</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Preserve headings, lists, and paragraphs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-primary/20 p-1 rounded-full mr-2">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">Ready for immediate editing and customization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">What PLR Users Are Saying</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((item, i) => (
                  <Card key={i} className="bg-muted/20">
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-yellow-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="italic mb-6">"{item.quote}"</p>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i} className="bg-background p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Start Extracting Text Today</h2>
              <p className="text-lg mb-8">
                Don't let valuable PLR content stay trapped in uneditable formats. 
                Extract the text and start customizing your content now.
              </p>
              <Button size="lg" asChild>
                <Link to="/tools/ocr-tool">
                  Try PLR OCR Tool Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

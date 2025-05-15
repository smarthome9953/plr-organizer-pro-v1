
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Folder, FileText, Tag, BarChart3, Settings, Boxes 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h1 className="text-2xl font-semibold mb-4">Welcome to your PLR Content Dashboard</h1>
          <p className="mb-6">Start organizing your private label rights content today with our comprehensive PLR tracking software. View your content library, manage licenses, and track usage all in one place.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-primary" /> 
                  PLR Library
                </CardTitle>
                <CardDescription>Browse and manage your PLR content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/plr-browser">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" /> Browse Files
                  </Button>
                </Link>
                <Link to="/plr-categories">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Tag className="mr-2 h-4 w-4" /> Manage Categories
                  </Button>
                </Link>
                <Link to="/plr-scan">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Folder className="mr-2 h-4 w-4" /> Scan New Content
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" /> 
                  Analytics
                </CardTitle>
                <CardDescription>Track usage and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" /> Content Usage
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" /> Performance
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" /> ROI Tracking
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" /> 
                  Tools
                </CardTitle>
                <CardDescription>Useful PLR content tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Content Generator
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Bulk Editor
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                    <h2 className="text-xl font-medium mb-2">Ready to organize your PLR content?</h2>
                    <p className="text-muted-foreground mb-4">
                      Start scanning your PLR files to build your content library. Our system will help you organize, categorize, and make the most of your PLR investments.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/plr-scan">
                        <Button className="flex items-center">
                          <Boxes className="mr-2 h-4 w-4" />
                          Get Started with Scanning
                        </Button>
                      </Link>
                      <Link to="/plr-browser">
                        <Button variant="outline" className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Browse Your Library
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Boxes className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

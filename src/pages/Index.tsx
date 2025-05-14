
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h1 className="text-2xl font-semibold mb-4">Welcome to your PLR Content Dashboard</h1>
          <p className="mb-4">Start organizing your private label rights content today with our comprehensive PLR tracking software. View your content library, manage licenses, and track usage all in one place.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Quick Scan</h3>
              <p className="text-sm text-muted-foreground mb-4">Import new PLR content into your library with our intelligent scanner</p>
              <Link to="/scan">
                <Button variant="outline" size="sm">Start Scanning</Button>
              </Link>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">License Manager</h3>
              <p className="text-sm text-muted-foreground mb-4">Review and manage usage rights for all your PLR content</p>
              <Button variant="outline" size="sm">View Licenses</Button>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Content Analytics</h3>
              <p className="text-sm text-muted-foreground mb-4">Track the performance and usage of your PLR investments</p>
              <Button variant="outline" size="sm">View Analytics</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

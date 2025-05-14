
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
          <p>Start organizing your PLR content today.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

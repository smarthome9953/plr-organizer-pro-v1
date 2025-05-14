
import React from 'react';
import { ThemeToggle } from '@/components/Header';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">PLR Organizer Pro</h1>
        <ThemeToggle />
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg border p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
        <p>Start organizing your PLR content today.</p>
      </div>
    </div>
  );
};

export default Index;

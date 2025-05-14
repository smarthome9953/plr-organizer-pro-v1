
import React from 'react';
import { ThemeToggle } from '@/components/Header';
import MainMenu from '@/components/MainMenu';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Logo size="md" showText={false} />
          <MainMenu />
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">PLR Organizer Pro</h1>
        </div>
        
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
          <p>Start organizing your PLR content today.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

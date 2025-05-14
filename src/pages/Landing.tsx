
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <Logo size="lg" showText={true} />
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link to="/auth">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Sign Up</Link>
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-purple-700 dark:text-purple-400 mb-6">
          Organize Your PLR Content Like Never Before
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Our AI-powered platform helps you scan, organize, and maximize the value of your PLR content.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link to="/auth">Get Started Now</Link>
        </Button>
      </main>
    </div>
  );
};

export default Landing;

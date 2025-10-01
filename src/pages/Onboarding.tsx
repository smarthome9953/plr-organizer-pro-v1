import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { 
  FolderSearch, FileText, Sparkles, CheckCircle2, 
  ArrowRight, Loader2 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Create default category
      const { error } = await supabase
        .from('plr_categories')
        .insert({
          user_id: user?.id,
          name: 'Uncategorized',
          description: 'Default category for new PLR content',
          color: '#8B5CF6',
        });

      if (error) throw error;

      toast("Welcome to PLR Organizer Pro!", {
        description: "Your workspace is ready. Let's start organizing your content!",
      });

      setTimeout(() => navigate('/plr-dashboard'), 1000);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Continue anyway
      navigate('/plr-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <>
      <Helmet>
        <title>Welcome | PLR Organizer Pro</title>
        <meta name="description" content="Get started with PLR Organizer Pro" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome to PLR Organizer Pro</h1>
            <p className="text-center text-muted-foreground">
              Let's get you set up in just a few steps
            </p>
            <div className="mt-6">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {currentStep === 1 && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <FolderSearch className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>Scan Your Computer</CardTitle>
                    <CardDescription>
                      PLR Organizer Pro can scan your computer to find all your PLR content in one place
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-2 text-left px-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Automatically detect PLR files across your system</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Identify duplicate content</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Extract license information</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>Organize Your Content</CardTitle>
                    <CardDescription>
                      Keep your PLR library organized with categories, tags, and smart search
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-2 text-left px-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Create custom categories for different niches</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Tag content for easy retrieval</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Search across all your PLR assets instantly</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-pink-600 dark:text-pink-400" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>AI-Powered Tools</CardTitle>
                    <CardDescription>
                      Transform your PLR content with powerful editing and optimization tools
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-2 text-left px-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Content spinner for uniqueness</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">SEO analyzer and optimizer</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">Multi-language translation</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>You're All Set!</CardTitle>
                    <CardDescription>
                      Your PLR Organizer Pro workspace is ready to use
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-3 px-4">
                    <p className="text-sm">Here's what you can do next:</p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <p className="text-sm">Scan your computer for PLR content</p>
                      </div>
                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <p className="text-sm">Upload files manually</p>
                      </div>
                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <p className="text-sm">Explore our PLR tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} disabled={loading}>
                    Back
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} className="ml-auto">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} disabled={loading} className="ml-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting Up...
                      </>
                    ) : (
                      <>
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => navigate('/plr-dashboard')} className="text-muted-foreground text-sm">
              Skip onboarding
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;

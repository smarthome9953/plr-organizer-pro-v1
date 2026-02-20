
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Clock } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      const onboardingCompleted = localStorage.getItem('onboarding_completed');
      const settingsKey = `plr_user_settings_${user.id}`;
      const userSettings = localStorage.getItem(settingsKey);
      const hasCompletedSetup = onboardingCompleted === 'true' || 
        (userSettings && JSON.parse(userSettings).onboarding_completed);
      
      if (!hasCompletedSetup) {
        navigate('/onboarding', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (activeTab === "login") {
        await signIn(values.email, values.password);
      } else {
        await signUp(values.email, values.password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-muted to-secondary/10 dark:from-background dark:to-secondary/20">
      {/* Left side - Welcome content */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
            {activeTab === "login" ? "Welcome Back To PLR Organizer Pro" : "Welcome To PLR Organizer Pro"}
          </h1>
          <p className="text-muted-foreground mb-8">
            Your AI-powered PLR content companion. Organize your files, track usage, and maximize your PLR investments with advanced organization tools.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Instant Organization</h3>
                <p className="text-sm text-muted-foreground">Get your PLR content organized with intelligent categorization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Monitor your PLR usage and see your ROI over time</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Save Hours Every Week</h3>
                <p className="text-sm text-muted-foreground">Users report saving 5+ hours weekly with our automated organization system</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 dark:border-primary/30">
              <p className="text-sm font-medium text-secondary dark:text-primary-foreground">
                "PLR Organizer Pro cut my content management time by 70%. What used to take me hours now happens automatically."
              </p>
              <p className="text-xs text-muted-foreground mt-1">- Sarah T., Digital Marketer</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl bg-card/90 backdrop-blur-sm border border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {activeTab === "login" 
                ? "Sign in using your email address" 
                : "Sign up to start organizing your PLR content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            type="email"
                            autoComplete="email"
                            className="bg-muted/50 border-border focus:border-primary focus:ring-primary"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="******"
                            type="password"
                            autoComplete={activeTab === "login" ? "current-password" : "new-password"}
                            className="bg-muted/50 border-border focus:border-primary focus:ring-primary"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? "Please wait..." 
                      : activeTab === "login" 
                        ? "Sign In" 
                        : "Create Account"}
                  </Button>
                  
                  <p className="text-center text-sm text-primary pt-2">
                    Start saving 5+ hours weekly with your PLR content
                  </p>
                </form>
              </Form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            {activeTab === "login" ? (
              <p>Don't have an account? Click Sign Up above</p>
            ) : (
              <p>Already have an account? Click Login above</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;


import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Logo from '@/components/Logo';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2),
});

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmitLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onSubmitSignup = async (data: z.infer<typeof signupSchema>) => {
    try {
      await signUp(data.email, data.password, data.name);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 flex-col justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            {activeTab === "login" ? "Welcome Back To PLR Organizer Pro" : "Welcome To PLR Organizer Pro"}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Your AI-powered PLR content companion. Organize your files, track usage, and maximize your PLR investments with advanced organization tools.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Save Hours Every Week</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automate your PLR content organization and tracking</p>
              </div>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 italic">
              <p className="text-gray-700 dark:text-gray-300">"PLR Organizer Pro saved me 5+ hours every week managing my content library."</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">— Sarah T., Content Creator</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 flex justify-center items-center p-8">
        <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl">
          <div className="flex justify-center my-6">
            <Logo size="lg" />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <CardContent>
              <TabsContent value="login" className="mt-0">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Login</Button>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Save time by logging in to access your organized PLR content
                    </p>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSubmitSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Sign Up</Button>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Start saving time today with our powerful PLR organization tools
                    </p>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;


import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Update session and user state atomically to prevent flashing
        setSession(session);
        setUser(session?.user ?? null);
        
        // Only show notifications and redirect for intentional sign-in/sign-out events
        // And only after initial loading is complete
        if (initialized) {
          if (event === 'SIGNED_IN') {
            toast("Signed in", {
              description: "You have successfully logged in",
            });
            
            // Only redirect if not already on dashboard
            if (location.pathname === '/auth') {
              // Use replace instead of push to prevent back button issues
              navigate('/dashboard', { replace: true });
            }
          } else if (event === 'SIGNED_OUT') {
            toast("Signed out", {
              description: "You have been logged out",
            });
            
            // Only redirect if on a protected route
            if (location.pathname.startsWith('/dashboard') || 
                location.pathname.startsWith('/plr-')) {
              // Use replace instead of push to prevent back button issues
              navigate('/auth', { replace: true });
            }
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, initialized]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      toast("Sign in failed", {
        description: error.message || "An error occurred during sign in",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      toast("Sign up successful", {
        description: "Please check your email for verification",
      });
    } catch (error: any) {
      toast("Sign up failed", {
        description: error.message || "An error occurred during sign up",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast("Sign out failed", {
        description: error.message || "An error occurred during sign out",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

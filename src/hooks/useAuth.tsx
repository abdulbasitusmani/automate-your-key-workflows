
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { getUserProfile } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  role: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  role: null,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        // Defer fetching user profile to prevent deadlocks
        setTimeout(() => {
          getUserProfile(newSession.user.id)
            .then(profile => setRole(profile?.role || 'user'))
            .catch(error => {
              console.error('Error fetching user role:', error);
              setRole('user');
            });
        }, 0);
      } else {
        setRole(null);
      }
      
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        getUserProfile(data.session.user.id)
          .then(profile => setRole(profile?.role || 'user'))
          .catch(error => {
            console.error('Error fetching user role:', error);
            setRole('user');
          });
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    // Clean up auth state first
    const cleanupAuthState = () => {
      // Remove standard auth tokens
      localStorage.removeItem('supabase.auth.token');
      // Remove all Supabase auth keys from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      // Remove from sessionStorage if in use
      Object.keys(sessionStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    };

    try {
      // Clean up auth state
      cleanupAuthState();
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      setUser(null);
      setSession(null);
      setRole(null);
      // Force page reload for a clean state
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force reload anyway as fallback
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, role, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

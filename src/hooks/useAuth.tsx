
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, signOut as supabaseSignOut } from '@/lib/supabase';
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
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        try {
          const profile = await getUserProfile(data.session.user.id);
          setRole(profile?.role || 'user');
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('user');
        }
      }
      
      setIsLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        getUserProfile(newSession.user.id)
          .then(profile => setRole(profile?.role || 'user'))
          .catch(error => {
            console.error('Error fetching user role:', error);
            setRole('user');
          });
      } else {
        setRole(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabaseSignOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, role, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

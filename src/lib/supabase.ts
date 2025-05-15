import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

// Use the values from the connected Supabase project
const supabaseUrl = "https://wefopufnklbukpbjzfkv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZm9wdWZua2xidWtwYmp6Zmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODAxMzAsImV4cCI6MjA2MjI1NjEzMH0.2rubPd-EjcZtyrAawUMIQUa6jBSCdMFla1T0CivsxyY";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, metadata: { first_name: string; last_name: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

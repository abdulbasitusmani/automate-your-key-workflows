
import { supabase } from '@/integrations/supabase/client';
import { Agent, Subscription, UserProfile } from '@/types';

// Agent functions
export async function getAgents(): Promise<Agent[]> {
  const { data, error } = await supabase
    .from('agents')
    .select('*');

  if (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }

  return data || [];
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching agent ${id}:`, error);
    throw error;
  }

  return data;
}

// Subscription functions
export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      agent:agents(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user subscriptions:', error);
    throw error;
  }

  return (data || []) as Subscription[];
}

export async function subscribeToAgent(agentId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  // Get agent details for promotional pricing logic
  const { data: agent } = await supabase
    .from('agents')
    .select('*')
    .eq('id', agentId)
    .single();
  
  if (!agent) {
    throw new Error('Agent not found');
  }
  
  const now = new Date();
  const promoEndDate = agent.promo_duration
    ? new Date(now.setMonth(now.getMonth() + agent.promo_duration))
    : null;
  
  const { error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      agent_id: agentId,
      status: 'active',
      start_date: new Date().toISOString(),
      promo_end_date: promoEndDate?.toISOString() || null,
    });
  
  if (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

// User functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
  
  return data as UserProfile;
}

export async function createUserProfile(profile: { 
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
}): Promise<void> {
  const { error } = await supabase
    .from('users')
    .insert(profile);
  
  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// Admin functions
export async function getAllUsers(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
  
  return (data || []) as UserProfile[];
}

export async function getAllSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      user:users(*),
      agent:agents(*)
    `);
  
  if (error) {
    console.error('Error fetching all subscriptions:', error);
    throw error;
  }
  
  return (data || []) as Subscription[];
}

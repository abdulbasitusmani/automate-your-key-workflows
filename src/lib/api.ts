import { supabase } from '@/integrations/supabase/client';
import { Agent, Subscription, UserProfile, ContactInfo } from '@/types';

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
    .insert({
      id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      role: profile.role || 'user'
    });
  
  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// Contact Information functions
export async function getContactInfo(): Promise<ContactInfo> {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching contact info:', error);
    throw error;
  }
  
  return data as ContactInfo;
}

export async function updateContactInfo(contactInfo: Omit<ContactInfo, 'id' | 'updated_at'>): Promise<void> {
  const { error } = await supabase
    .from('contact_info')
    .upsert({
      id: 1, // We'll use a single row for contact info
      ...contactInfo,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error updating contact info:', error);
    throw error;
  }
}

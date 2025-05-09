
export interface Agent {
  id: string;
  name: string;
  description: string;
  base_price: number;
  promo_price?: number | null;
  promo_duration?: number | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  agent_id: string;
  status: string;
  start_date: string;
  promo_end_date?: string | null;
  created_at: string;
  agent?: Agent;
  user?: UserProfile;
}

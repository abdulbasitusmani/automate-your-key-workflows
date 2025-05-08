
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          description: string
          base_price: number
          promo_price: number | null
          promo_duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          base_price: number
          promo_price?: number | null
          promo_duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          base_price?: number
          promo_price?: number | null
          promo_duration?: number | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          role?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          status: string
          start_date: string
          promo_end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          status: string
          start_date: string
          promo_end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          status?: string
          start_date?: string
          promo_end_date?: string | null
          created_at?: string
        }
      }
    }
  }
}

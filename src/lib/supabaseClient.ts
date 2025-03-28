import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the main Supabase client with the anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a service role client for admin operations
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Export types
export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          id: string;
          title: string;
          description: string;
          due_date: string;
          subject: string;
          status: 'pending' | 'submitted' | 'graded';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          due_date: string;
          subject: string;
          status?: 'pending' | 'submitted' | 'graded';
        };
        Update: {
          title?: string;
          description?: string;
          due_date?: string;
          subject?: string;
          status?: 'pending' | 'submitted' | 'graded';
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          sender_id: string;
          recipient_id: string;
          content: string;
          read?: boolean;
        };
        Update: {
          content?: string;
          read?: boolean;
          updated_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          name: string;
          grade: string;
          status: 'active' | 'inactive';
          attendance: number;
          performance: number;
          behaviorScore: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          grade: string;
          status?: 'active' | 'inactive';
          attendance?: number;
          performance?: number;
          behaviorScore?: string;
        };
        Update: {
          name?: string;
          grade?: string;
          status?: 'active' | 'inactive';
          attendance?: number;
          performance?: number;
          behaviorScore?: string;
          updated_at?: string;
        };
      };
    };
  };
}; 
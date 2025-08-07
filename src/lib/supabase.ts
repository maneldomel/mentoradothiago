import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  state: string;
  avatar_url: string;
  youtube_url: string;
  caption: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
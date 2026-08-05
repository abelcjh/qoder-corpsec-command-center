import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseEnabled = Boolean(url && key);

export let supabase: SupabaseClient<Database> | null = null;

if (isSupabaseEnabled) {
  supabase = createClient<Database>(url!, key!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

export function getSupabase(): SupabaseClient<Database> | null {
  return supabase;
}

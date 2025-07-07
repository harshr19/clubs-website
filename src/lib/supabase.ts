import { createClient } from '@supabase/supabase-js';
import { getSecret } from './utils';

const supabaseUrl = getSecret('VITE_SUPABASE_URL');
const supabaseAnonKey = getSecret('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export async function signUp(email: string, password: string, meta : {name: string, role: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: meta,
    }
  });
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

export async function updateUserProfile(userId: string, userProfile: any) {
  const { data, error } = await supabase
    .from('users')
    .update(userProfile)
    .eq('id', userId);
  
  return { data, error };
}

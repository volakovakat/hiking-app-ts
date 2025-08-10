import { createClient } from '@supabase/supabase-js';

const supabaseUrl : string = 'https://kngnsssmzxrgvdvygzwv.supabase.co';
const SUPABASE_KEY : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ25zc3NtenhyZ3Zkdnlnend2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwNDE1MzAsImV4cCI6MjAyMjYxNzUzMH0.95dqVVaiSmK7GnA_FpjQ6i6gEx3KkSfX4uWAwoqC2Ts';

export const getSupabase = createClient(supabaseUrl, SUPABASE_KEY);

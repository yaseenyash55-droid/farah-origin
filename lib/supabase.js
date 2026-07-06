import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sjtmkatrldbuiqfvaiyw.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdG1rYXRybGRidWlxZnZhaXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODczOTEsImV4cCI6MjA1Njg2MzM5MX0.sb_publishable_zdNdLRGwnQ199BHWho7wKg_CVqUntHJ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

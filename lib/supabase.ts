import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sjtmkatrldbuiqfvaiyw.supabase.co";
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const hardcodedFullKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdG1rYXRybGRidWlxZnZhaXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzg0NjYsImV4cCI6MjA5ODkxNDQ2Nn0.d0l9IDYfTmH4m5LnkMogqTYSMhiyRYYZwIYngfMl7RQ";

// Ensure the key is a full JWT. If the user accidentally pasted only the last part, use the full key.
if (!supabaseAnonKey.startsWith("eyJ")) {
  supabaseAnonKey = hardcodedFullKey;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

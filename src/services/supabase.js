import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lnzzppddicmecdlmcsul.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuenpwcGRkaWNtZWNkbG1jc3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMzkyNzUsImV4cCI6MjAxMDgxNTI3NX0.OmV-6C7koD629k3WGlAFvL4U5_mWw6F_RX38WlfTCuw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

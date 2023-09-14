import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://doslsychgsgfyfjcjneb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvc2xzeWNoZ3NnZnlmamNqbmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxNDQzMjcsImV4cCI6MjAwOTcyMDMyN30.v66O3PVT_mKYmOpXjA4ndQazp8DP9PhtcajDnDzqmbs";

export const supabase = createClient(supabaseUrl, supabaseKey);

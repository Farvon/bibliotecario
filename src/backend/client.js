import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://doslsychgsgfyfjcjneb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvc2xzeWNoZ3NnZnlmamNqbmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxNDQzMjcsImV4cCI6MjAwOTcyMDMyN30.v66O3PVT_mKYmOpXjA4ndQazp8DP9PhtcajDnDzqmbs"
);

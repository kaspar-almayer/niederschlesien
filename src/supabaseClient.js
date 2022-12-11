import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exwqjdjcxzewandmmsei.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4d3FqZGpjeHpld2FuZG1tc2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMDg0ODksImV4cCI6MTk4Mjc4NDQ4OX0.TcMQS5QL6NR8oVX19AThqYj09zlWjv6fzK1HvQNOaDI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

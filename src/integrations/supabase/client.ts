// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mrlhvesnexodmjloeigx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybGh2ZXNuZXhvZG1qbG9laWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODE5MzEsImV4cCI6MjA1MTg1NzkzMX0.4BnRuTWb6EYbDhRT-mQNtGEgrhhCZMUCtsF4xdJlV9E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
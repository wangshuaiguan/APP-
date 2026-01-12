import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://www.weavefox.cn/api/open/v1/supabase_proxy/107';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzU5MjAyMDMzLCJleHAiOjEzMjY5ODQyMDMzfQ.Y2of3VyRUMoqLuGjuYWki7pnQ2mx6ScbyD2FEt-mpxw';

// Create a single supabase client for interacting with the database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
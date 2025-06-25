import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cozjdbultljamcoiwufc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvempkYnVsdGxqYW1jb2l3dWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTgyNTksImV4cCI6MjA2NTY3NDI1OX0.B3ecedkV-9S0YKo_tfSDn4InbB7LNAjzDfMJpMz0teI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
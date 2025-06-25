// utils/auth.ts
import { supabase } from './supabase/client'

// Sign up new user
export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password })
  return error
}

// Log in
export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return error
}

// Log out
export async function signOut() {
  await supabase.auth.signOut()
}

// app/auth/logout/route.ts

import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/client'

export async function GET() {
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL))
}

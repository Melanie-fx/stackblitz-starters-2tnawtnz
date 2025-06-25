// app/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  await supabase.auth.signOut();

  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return NextResponse.redirect(new URL('/auth/login', redirectUrl));
}

// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types/supabase' // <-- optional, only if you defined your types

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client using the middleware
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if needed
  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: [
    // Add all protected routes here
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/p2p/:path*',
    '/videos/:path*',
    '/news/:path*',
  ],
}

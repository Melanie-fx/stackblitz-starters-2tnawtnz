import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/utils/supabase/server'

// This middleware protects authenticated routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Example: Only allow logged-in users to access /dashboard and /profile
  const protectedRoutes = ['/dashboard', '/profile', '/admin', '/p2p']

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*', '/p2p/:path*'], // Add protected routes here
}

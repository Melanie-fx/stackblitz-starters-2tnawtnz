import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { user } } = await supabase.auth.getUser()

  const protectedRoutes = ['/dashboard', '/admin', '/p2p', '/videos', '/news', '/ai-coach']
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}
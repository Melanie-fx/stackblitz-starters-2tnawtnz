import './globals.css'
import Link from 'next/link'
import { supabase } from '@/utils/supabase/client';
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Tradenova',
  description: 'Smart AI Trading Platform',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient(cookies())
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4">📊 Tradenova</h1>

          <nav className="space-y-2">
            <Link href="/dashboard" className="block hover:text-yellow-400">🏠 Dashboard</Link>
            <Link href="/videos" className="block hover:text-yellow-400">🎥 Videos</Link>
            <Link href="/ai-coach" className="block hover:text-yellow-400">🧠 AI Coach</Link>
            <Link href="/p2p" className="block hover:text-yellow-400">🔁 P2P</Link>
            <Link href="/news" className="block hover:text-yellow-400">🗞️ News</Link>
            <Link href="/admin" className="block hover:text-yellow-400">🛡️ Admin</Link>
            <Link href="/profile" className="block hover:text-yellow-400">👤 Profile</Link>
          </nav>

          <div className="mt-auto text-sm">
            {user ? (
              <>
                <p className="text-gray-300 mt-6">Signed in as:</p>
                <p className="font-medium">{user.email}</p>
                <form action="/auth/logout" method="post" className="mt-2">
                  <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
                </form>
              </>
            ) : (
              <p className="text-gray-400 mt-6">Not logged in</p>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  )
}

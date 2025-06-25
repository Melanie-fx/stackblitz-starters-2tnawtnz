import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r shadow-md p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">📊 Tradenova</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block text-blue-600 hover:underline">Dashboard</Link>
          <Link href="/p2p" className="block text-blue-600 hover:underline">P2P</Link>
          <Link href="/videos" className="block text-blue-600 hover:underline">Videos</Link>
          <Link href="/ai-coach" className="block text-blue-600 hover:underline">AI Coach</Link>
          <Link href="/news" className="block text-blue-600 hover:underline">News</Link>
          <Link href="/admin" className="block text-blue-600 hover:underline">Admin</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
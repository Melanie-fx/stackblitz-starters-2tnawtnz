'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client' // If in a client component

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error('Error fetching user:', error.message)
      } else {
        setUser(user)
      }
    }

    loadUser()
  }, [])

  if (!user) {
    return (
      <main className="p-6">
        <p>Loading profile...</p>
      </main>
    )
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">👤 Your Profile</h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Email Verified:</strong> {user.email_confirmed_at ? '✅ Verified' : '❌ Not Verified'}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleString()}</p>
      </div>

      <form action="/auth/logout" method="post">
        <button
          type="submit"
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </main>
  )
}

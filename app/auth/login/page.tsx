'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Create a Supabase client for the browser
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setMessage('Failed to send login link.')
      console.error(error.message)
    } else {
      setMessage('Check your email for the login link.')
    }

    setLoading(false)
  }

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">🔐 Login to Tradenova</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>

        {message && <p className="text-sm text-center text-gray-600">{message}</p>}
      </form>
    </main>
  )
}

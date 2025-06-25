'use client'

import { useState } from 'react'
import { signUp } from '@/utils/auth'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const err = await signUp(email, password)
    if (err) {
      setError(err.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">🧾 Register for Tradenova</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  )
}

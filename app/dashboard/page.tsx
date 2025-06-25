'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client' // If in a client component

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('users')
        .select('username, bio, avatar_url')
        .eq('id', user.id)
        .single()

      if (data) {
        setUsername(data.username || '')
        setBio(data.bio || '')
        setAvatar(data.avatar_url || '')
      }
    }

    loadProfile()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('users')
      .update({ username, bio, avatar_url: avatar })
      .eq('id', user.id)

    if (error) {
      setMessage('❌ Failed to update profile.')
    } else {
      setMessage('✅ Profile updated successfully!')
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">👤 Update Your Profile</h1>

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded shadow max-w-lg">
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Avatar URL (optional)"
          className="w-full border px-3 py-2 rounded"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <textarea
          placeholder="Short Bio"
          className="w-full border px-3 py-2 rounded"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </main>
  )
}

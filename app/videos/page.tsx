'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

type Video = {
  id: string
  url: string
  caption: string
  created_at: string
}

export default function ShortTradeVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAndLoad() {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) {
        router.push('/auth/login')
        return
      }

      const { data, error } = await supabase
        .from('trade_videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch videos:', error.message)
      } else {
        setVideos(data || [])
      }

      setLoading(false)
    }

    checkAndLoad()
  }, [router])

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎥 Trade Video Feed</h1>

      {videos.length === 0 && (
        <p className="text-gray-600">No videos yet.</p>
      )}

      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded shadow p-4">
          <video controls className="w-full rounded mb-2">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-700">{video.caption}</p>
          <p className="text-xs text-gray-500">
            Uploaded: {new Date(video.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

type NewsItem = {
  id: string
  title: string
  summary: string
  source: string
  published_at: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('news_feed')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch news:', error.message)
      } else {
        setNews(data || [])
      }
    }

    fetchNews()
  }, [])

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🗞️ Market News & Sentiment</h1>

      {news.length === 0 ? (
        <p className="text-gray-600">No news found.</p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded space-y-2">
              <h2 className="text-lg font-semibold text-blue-800">{item.title}</h2>
              <p className="text-gray-700">{item.summary}</p>
              <p className="text-sm text-gray-500">
                Source: {item.source} • {new Date(item.published_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [aiReply, setAiReply] = useState('');
  const [coingecko, setCoingecko] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [deriv, setDeriv] = useState(null);
  const [news, setNews] = useState(null);
  const [twelveData, setTwelveData] = useState(null);
  const [fmp, setFmp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cg, pg, dr, nw, td, fm] = await Promise.all([
          fetch('/api/coingecko').then(res => res.json()),
          fetch('/api/polygon').then(res => res.json()),
          fetch('/api/deriv').then(res => res.json()),
          fetch('/api/news').then(res => res.json()),
          fetch('/api/twelvedata').then(res => res.json()),
          fetch('/api/fmp').then(res => res.json()),
        ]);
        setCoingecko(cg);
        setPolygon(pg);
        setDeriv(dr);
        setNews(nw);
        setTwelveData(td);
        setFmp(fm);
      } catch (err) {
        console.error('Error loading APIs:', err);
      }
    };

    fetchData();
  }, []);

  const askAI = async () => {
    const res = await fetch('/api/ai-coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'What should I trade this week?',
        user_id: 'user-123', // Later replace with real ID from auth
      }),
    });
    const data = await res.json();
    setAiReply(data.reply || 'No response');
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-gray-900 font-sans space-y-8">
      <h1 className="text-3xl font-bold">📊 Tradenova Market Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold">🌐 Crypto Prices (via Coingecko)</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(coingecko, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">📈 Stock Data (via Polygon)</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(polygon, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">💹 Deriv Data</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(deriv, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">📰 Latest News</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(news, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">📊 TwelveData API</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(twelveData, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">📉 FMP Data</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(fmp, null, 2)}
        </pre>
      </section>

      <section className="pt-6 border-t mt-10">
        <h2 className="text-xl font-semibold">🤖 AI Coach</h2>
        <button
          onClick={askAI}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Ask AI Coach
        </button>
        {aiReply && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <strong>Response:</strong>
            <p>{aiReply}</p>
          </div>
        )}
      </section>
    </main>
  );
}
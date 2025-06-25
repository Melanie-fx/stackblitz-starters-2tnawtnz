'use client';

import { useState } from 'react';

export default function DashboardClient({ cryptoData, stockData, derivData, news }: any) {
  function AICoach() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleAsk = () => {
      setResponse(
        question.toLowerCase().includes('aapl')
          ? 'AAPL is trading at $200.30. Consider market trends and your risk tolerance before investing.'
          : 'Ask a specific question about the market for tailored insights!'
      );
    };

    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
        <p className="text-lg font-medium">Ask our AI Coach for market insights!</p>
        <input
          type="text"
          placeholder="e.g., Should I invest in AAPL?"
          className="w-full p-3 mt-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleAsk}
        >
          Ask
        </button>
        {response && (
          <p className="mt-3 text-sm text-gray-300 animate-fade-in">{response}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-900 text-white min-h-screen">
        {/* Left Column */}
        <div className="w-full md:w-[70%] space-y-8">
          {/* Crypto */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Crypto Prices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-lg font-medium">Bitcoin (BTC)</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-lg font-medium">Ethereum (ETH)</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${cryptoData?.ethereum?.usd?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          </section>

          {/* Stocks */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Stock Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stockData?.results?.map((stock: any) => (
                <div key={stock.T} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-lg font-medium">{stock.T}</p>
                  <p className="text-3xl font-bold">${stock.c.toFixed(2)}</p>
                  <p className={`text-sm ${stock.c > stock.o ? 'text-green-400' : 'text-red-400'}`}>
                    Change: {stock.c > stock.o ? '+' : ''}
                    {((stock.c - stock.o) / stock.o * 100).toFixed(2)}%
                  </p>
                </div>
              )) || <p className="text-red-400">Stock data unavailable</p>}
            </div>
          </section>

          {/* Deriv */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Deriv Data</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {derivData?.error ? (
                <p className="text-red-400">{derivData.error}</p>
              ) : (
                <p className="text-lg font-medium">Forex data coming soon</p>
              )}
            </div>
          </section>

          {/* AI Coach */}
          <section className="sticky top-6">
            <h2 className="text-3xl font-bold mb-6">AI Coach</h2>
            <AICoach />
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[30%] space-y-8">
          {/* News */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Latest News</h2>
            <div className="space-y-6">
              {news?.articles?.slice(0, 5).map((article: any, index: number) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">{article.description}</p>
                  <a
                    href={article.url}
                    className="text-blue-400 hover:underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>
              )) || <p className="text-red-400">News unavailable</p>}
            </div>
          </section>

          {/* Alerts */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Alerts</h2>
            <div className="bg-red-800 p-6 rounded-lg shadow-lg">
              <p>{news?.articles?.length ? 'All systems operational' : 'Warning: News API failed'}</p>
              <p>{derivData?.error ? 'Warning: Deriv API failed' : ''}</p>
            </div>
          </section>
        </div>
      </div>

      {/* Fade-in animation */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

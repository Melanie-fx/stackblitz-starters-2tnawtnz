// app/videos/page.tsx
import { fetchCryptoData, fetchStockData, fetchDerivData, fetchNews } from '@/utils/api';
import AICoach from './dashboard-client';

export default async function DashboardPage() {
  const cryptoData = await fetchCryptoData();
  const stockData = await fetchStockData();
  const derivData = await fetchDerivData();
  const news = await fetchNews();

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-900 text-white min-h-screen">
      {/* Left Column (70%) */}
      <div className="w-full md:w-[70%] space-y-8">
        {/* Crypto Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Crypto Prices</h2>
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

        {/* Stock Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Stock Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stockData?.results?.map((stock: any) => (
              <div
                key={stock.T}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <p className="text-lg font-medium">{stock.T}</p>
                <p className="text-3xl font-bold">${stock.c.toFixed(2)}</p>
                <p
                  className={`text-sm ${stock.c > stock.o ? 'text-green-400' : 'text-red-400'}`}
                >
                  Change: {stock.c > stock.o ? '+' : ''}{((stock.c - stock.o) / stock.o * 100).toFixed(2)}%
                </p>
              </div>
            )) || <p className="text-red-400">Stock data unavailable</p>}
          </div>
        </section>

        {/* Deriv Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Deriv Data</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {derivData?.error ? (
              <p className="text-red-400">{derivData.error}</p>
            ) : (
              <p className="text-lg font-medium">Forex data coming soon</p>
            )}
          </div>
        </section>

        {/* AI Coach Box */}
        <section className="sticky top-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">AI Coach</h2>
          <AICoach />
        </section>
      </div>

      {/* Right Column (30%) */}
      <div className="w-full md:w-[30%] space-y-8">
        {/* News Feed Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest News</h2>
          <div className="space-y-6">
            {news?.articles?.slice(0, 5).map((article: any, index: number) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
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

        {/* Error/Alert Boxes */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Alerts</h2>
          <div className="bg-red-800 p-6 rounded-lg shadow-lg">
            <p>{news?.articles?.length ? 'All systems operational' : 'Warning: News API failed'}</p>
            <p>{derivData?.error ? 'Warning: Deriv API failed' : ''}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

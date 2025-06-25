// app/videos/page.tsx
import { fetchCryptoData, fetchStockData, fetchDerivData, fetchNews } from '@/utils/api';
import dynamic from 'next/dynamic';
import AICoach from './dashboard-client';
import { Line } from 'react-chartjs-2';

// Lazy load NewsSection
const NewsSection = dynamic(() => import('./news-section'), { ssr: false });

export default async function DashboardPage() {
  const cryptoData = await fetchCryptoData();
  const stockData = await fetchStockData();
  const derivData = await fetchDerivData();
  const news = await fetchNews();

  // Mock chart data
  const cryptoChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bitcoin (USD)',
        data: [60000, 65000, 70000, 80000, 90000, cryptoData?.bitcoin?.usd || 0],
        borderColor: '#FBBF24',
        fill: false,
      },
    ],
  };

  const stockChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'AAPL (USD)',
        data: [180, 185, 190, 195, 200, stockData?.results?.[0]?.c || 0],
        borderColor: '#3B82F6',
        fill: false,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-900 text-white min-h-screen dark:bg-white dark:text-gray-900">
      {/* Left Column (70%) */}
      <div className="w-full md:w-[70%] space-y-8">
        {/* Crypto Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Crypto Prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-100">
              <p className="text-lg font-medium dark:text-gray-800">Bitcoin (BTC)</p>
              <p className="text-3xl font-bold text-yellow-400 dark:text-yellow-600">
                ${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-100">
              <p className="text-lg font-medium dark:text-gray-800">Ethereum (ETH)</p>
              <p className="text-3xl font-bold text-yellow-400 dark:text-yellow-600">
                ${cryptoData?.ethereum?.usd?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 dark:bg-gray-100">
            <Line data={cryptoChartData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Stock Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Stock Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stockData?.results?.map((stock: any) => (
              <div
                key={stock.T}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-100"
              >
                <p className="text-lg font-medium dark:text-gray-800">{stock.T}</p>
                <p className="text-3xl font-bold dark:text-gray-900">${stock.c.toFixed(2)}</p>
                <p
                  className={`text-sm ${stock.c > stock.o ? 'text-green-400' : 'text-red-400'} dark:${stock.c > stock.o ? 'text-green-600' : 'text-red-600'}`}
                >
                  Change: {stock.c > stock.o ? '+' : ''}{((stock.c - stock.o) / stock.o * 100).toFixed(2)}%
                </p>
              </div>
            )) || <p className="text-red-400 dark:text-red-600">Stock data unavailable</p>}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 dark:bg-gray-100">
            <Line data={stockChartData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Deriv Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Deriv Data</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-100">
            {derivData?.error ? (
              <p className="text-red-400 dark:text-red-600">{derivData.error}</p>
            ) : (
              <p className="text-lg font-medium dark:text-gray-800">Forex data coming soon</p>
            )}
          </div>
        </section>

        {/* AI Coach Box */}
        <section className="sticky top-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">AI Coach</h2>
          <AICoach />
        </section>
      </div>

      {/* Right Column (30%) */}
      <div className="w-full md:w-[30%] space-y-8">
        <NewsSection news={news} />
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Alerts</h2>
          <div className="bg-red-800 p-6 rounded-lg shadow-lg dark:bg-red-100">
            <p className="dark:text-red-800">{news?.articles?.length ? 'All systems operational' : 'Warning: News API failed'}</p>
            <p className="dark:text-red-800">{derivData?.error ? 'Warning: Deriv API failed' : ''}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

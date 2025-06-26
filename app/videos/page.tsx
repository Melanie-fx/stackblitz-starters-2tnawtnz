// app/videos/page.tsx
import { fetchCryptoData, getStockData, fetchDerivData, fetchNews } from '@/utils/api';
import dynamic from 'next/dynamic';
import AICoach from './dashboard-client';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Lazy load NewsSection
const NewsSection = dynamic(() => import('./news-section'), { ssr: false });

export default async function DashboardPage() {
  const cookieStore = cookies(); // Remove await
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select(); // Fetch todos
  const cryptoData = await fetchCryptoData();
  const stockDataAAPL = await getStockData('AAPL');
  const stockDataMSFT = await getStockData('MSFT');
  const derivData = await fetchDerivData();
  const news = await fetchNews();

  // Combine stock data
  const stockData = {
    results: [
      ...(stockDataAAPL.results || []),
      ...(stockDataMSFT.results || []),
    ],
  };

  // Enhanced chart data for AAPL
  const stockChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'AAPL (USD)',
        data: [180, 185, 190, 195, 200, stockDataAAPL?.results?.[0]?.c || 0],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Enhanced chart data for crypto
  const cryptoChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bitcoin (USD)',
        data: [60000, 65000, 70000, 80000, 90000, cryptoData?.bitcoin?.usd || 0],
        borderColor: '#FBBF24',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-900 text-white min-h-screen dark:bg-white dark:text-gray-900">
      {/* Header with Improved Photo Background */}
      <div className="w-full mb-8 relative">
        <Image
          src="https://generated-image-xai.com/tradenova-dashboard-bg-1920x1080.jpg" // Replace with actual high-res URL
          alt="Tradenova Dashboard Background"
          layout="responsive"
          width={1920}
          height={1080}
          quality={90}
          className="rounded-lg object-cover opacity-90 dark:opacity-70 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 dark:from-blue-200/50 dark:to-purple-200/50 rounded-lg flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-900 drop-shadow-lg">
            Tradenova Market Dashboard
          </h1>
        </div>
      </div>

      {/* Left Column (70%) */}
      <div className="w-full md:w-[70%] space-y-8">
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
            <Line
              data={cryptoChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: 'white', font: { size: 14 } } },
                },
                scales: {
                  x: { ticks: { color: 'white' } },
                  y: { ticks: { color: 'white' } },
                },
              }}
            />
          </div>
        </section>

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
            <Line
              data={stockChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: 'white', font: { size: 14 } } },
                },
                scales: {
                  x: { ticks: { color: 'white' } },
                  y: { ticks: { color: 'white' } },
                },
              }}
            />
          </div>
        </section>

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

        <section className="sticky top-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">AI Coach</h2>
          <AICoach />
        </section>

        {/* Supabase Todos Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Todos</h2>
          <ul className="list-disc pl-5">
            {todos?.length ? (
              todos.map((todo: any) => (
                <li key={todo.id} className="text-lg dark:text-gray-800">
                  {todo.task || 'No task description'}
                </li>
              ))
            ) : (
              <li className="text-red-400 dark:text-red-600">No todos available</li>
            )}
          </ul>
        </section>
      </div>

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

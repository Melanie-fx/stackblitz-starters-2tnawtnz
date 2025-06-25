// app/videos/page.tsx
import { fetchCryptoData, fetchStockData, fetchDerivData, fetchNews } from '@/utils/api';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const cryptoData = await fetchCryptoData();
  const stockData = await fetchStockData();
  const derivData = await fetchDerivData();
  const news = await fetchNews();

  return (
    <DashboardClient
      cryptoData={cryptoData}
      stockData={stockData}
      derivData={derivData}
      news={news}
    />
  );
}

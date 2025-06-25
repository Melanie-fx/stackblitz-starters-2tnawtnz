// utils/api.ts
export interface NewsData {
  articles: Array<{
    title: string;
    description: string;
    url: string;
  }>;
}

export async function fetchCryptoData() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd', {
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch crypto data');
    return await res.json();
  } catch (error) {
    console.error('Crypto fetch error:', error);
    return { bitcoin: { usd: 0 }, ethereum: { usd: 0 } };
  }
}

export async function getStockData(symbol: string) {
  try {
    const key = process.env.POLYGON_API_KEY;
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${key}`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error('Failed to fetch stock data');
    return await res.json();
  } catch (error) {
    console.error('Stock fetch error:', error);
    return { results: [{ T: symbol, c: 0, o: 0 }] };
  }
}

export async function fetchDerivData() {
  try {
    const res = await fetch(`https://api.twelvedata.com/forex?apikey=${process.env.TWELVEDATA_API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch from Deriv');
    return await res.json();
  } catch (error) {
    console.error('Deriv fetch error:', error);
    return { error: 'Failed to fetch from Deriv' };
  }
}

export async function fetchNews() {
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.NEWSAPI_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return await res.json();
  } catch (error) {
    console.error('News fetch error:', error);
    return { articles: [] };
  }
}

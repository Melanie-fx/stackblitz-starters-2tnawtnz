// utils/polygon.ts
export async function getStockData(symbol: string) {
  const key = process.env.POLYGON_API_KEY;
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch stock data');
  return res.json();
}
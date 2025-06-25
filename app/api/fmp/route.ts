export async function GET() {
  const apiKey = process.env.FMP_API_KEY;
  const url = `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}
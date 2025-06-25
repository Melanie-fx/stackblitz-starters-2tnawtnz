export async function GET() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  const url = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}